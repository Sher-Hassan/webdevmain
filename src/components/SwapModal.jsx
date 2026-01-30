import { useState, useEffect, useRef } from 'react'
import '../styles/SwapModal.css'
import { useWallet } from '@solana/wallet-adapter-react'
import { Connection, Transaction } from '@solana/web3.js'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { useWalletModal } from '@solana/wallet-adapter-react-ui'
import {VersionedTransaction } from '@solana/web3.js';

export default function SwapModal({ onClose }) {
  const wallet = useWallet()
  const { setVisible } = useWalletModal()
  const connection = new Connection("https://api.mainnet-beta.solana.com")

  const [fromAmount, setFromAmount] = useState('')
  const [loading, setLoading] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [pendingSwap, setPendingSwap] = useState(false)
  const didAutoSwap = useRef(false)

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 10)
    return () => clearTimeout(t)
  }, [])

 async function doSwap() {
  if (!wallet.publicKey || !wallet.signTransaction) return alert("Connect wallet");
  if (!fromAmount || isNaN(fromAmount)) return alert("Enter a valid amount");

  setLoading(true);

  try {
    // 1️⃣ Convert SOL to Lamports (1 SOL = 10^9 Lamports)
    const amountInLamports = Math.floor(parseFloat(fromAmount) * 1_000_000_000);

    // 2️⃣ Get Quote from Jupiter
    const quoteResponse = await fetch(
      `https://quote-api.jup.ag/v6/quote?inputMint=So11111111111111111111111111111111111111112` +
      `&outputMint=Es9vMFrzaCER7R8KQ6nGZ6n9yN9jqwzYkGkqP1h9eX` + // USDC
      `&amount=${amountInLamports}&slippageBps=50`
    ).then(res => res.json());

    if (!quoteResponse || quoteResponse.error) {
  throw new Error("No swap route found for this amount.");
}

    // 3️⃣ Get Serialized Transaction
    const { swapTransaction } = await fetch('https://quote-api.jup.ag/v6/swap', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        quoteResponse,
        userPublicKey: wallet.publicKey.toString(),
        wrapAndUnwrapSol: true,
      })
    }).then(res => res.json());

    // 4️⃣ Deserialize Versioned Transaction
    const swapTransactionBuf = Buffer.from(swapTransaction, 'base64');
    const transaction = VersionedTransaction.deserialize(swapTransactionBuf);

    // 5️⃣ Sign and Send
    const signedTx = await wallet.signTransaction(transaction);
    
    // We use raw send because Jupiter transactions are already compiled
    const txid = await connection.sendRawTransaction(signedTx.serialize(), {
      skipPreflight: true,
      maxRetries: 2
    });

    // 6️⃣ Confirm
    const latestBlockHash = await connection.getLatestBlockhash();
    await connection.confirmTransaction({
      blockhash: latestBlockHash.blockhash,
      lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
      signature: txid
    });

    alert(`Swap Successful! TX: ${txid}`);
  } catch (err) {
    console.error("Swap Error:", err);
    alert(`Swap failed: ${err.message}`);
  } finally {
    setLoading(false);
  }
}

// called when user presses the Swap button
async function handleSwapClick() {
  if (loading) return;
  // If wallet not connected, open the wallet modal and wait for the user
  if (!wallet.connected) {
    setPendingSwap(true)
    didAutoSwap.current = true
    try {
      setVisible(true)
    } catch (e) {
      // fallback: try calling connect directly
      try { await wallet.connect() } catch (err) { console.error(err) }
    }
    return
  }

  await doSwap()
}

// If the user connected while we were pending a swap, continue automatically.
useEffect(() => {
  if (pendingSwap && wallet.connected) {
    setPendingSwap(false)
    // Delay slightly to allow the wallet modal to dismiss animation
    setTimeout(() => {
      // Prevent re-entrancy
      if (didAutoSwap.current) {
        didAutoSwap.current = false
        doSwap()
      }
    }, 160)
  }
}, [pendingSwap, wallet.connected])

  return (
    <div className={`swap-overlay ${mounted ? 'open' : ''}`} role="dialog" aria-modal="true">
      <div className="swap-modal" tabIndex={-1}>
        <button className="swap-close" onClick={onClose} aria-label="Close">×</button>

        <header className="swap-header">
          <h2 className="swap-title">Swap</h2>
          <p className="swap-sub">Private, fast swaps on Solana</p>
        </header>

        <div className="swap-body">
          <div className="wallet-row">
            <WalletMultiButton />
          </div>

          <div className="field">
            <label className="field-label">From</label>
            <div className="token-row">
              <div className="token-select">
                <div className="token-icon">◎</div>
                <div className="token-name">SOL</div>
              </div>
              <input
                className="token-input"
                type="number"
                placeholder="Amount"
                value={fromAmount}
                onChange={(e) => setFromAmount(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleSwapClick() }}
                min="0"
                autoFocus
              />
            </div>
          </div>

          <div className="field">
            <label className="field-label">To</label>
            <div className="token-row token-row--static">
              <div className="token-select">
                <div className="token-icon">●</div>
                <div className="token-name">USDC</div>
              </div>
              <div className="token-output">{fromAmount ? `≈ ${(Number(fromAmount) * 20).toFixed(4)} USDC` : '....'}</div>
            </div>
          </div>

          <div className="actions">
            <button className="swap-btn" onClick={handleSwapClick} disabled={loading || !fromAmount}>
              {loading ? (
                <><span className="spinner" aria-hidden="true" /> Swapping…</>
              ) : 'Swap'}
            </button>
            <button className="swap-cancel" onClick={onClose}>Cancel</button>
          </div>

          <p className="swap-foot">Estimated network fees apply. Always confirm details before swapping.</p>
        </div>
      </div>
    </div>
  )
}
