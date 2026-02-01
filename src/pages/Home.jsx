import React, { useState, useEffect, useRef } from 'react'
import Btn1 from '../components/Btn1.jsx'
import Btn2 from '../components/Btn2.jsx'
import HomeCard from '../components/Home-Card.jsx'
import card1 from '../assets/card1.svg'
import MovingS from '../components/MovingS.jsx'
import Globe from '../components/Globe.jsx';
import '../styles/Home.css'

export default function Home({ onSwapClick }) {
  const aboutRef = useRef(null)
  const [aboutInView, setAboutInView] = useState(false)

  const ctaRef = useRef(null)
  const [ctaInView, setCtaInView] = useState(false)

  useEffect(() => {
    if (!aboutRef.current) return
    const el = aboutRef.current
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAboutInView(true)
            obs.disconnect()
          }
        })
      },
      { root: null, rootMargin: '0px 0px -20% 0px', threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!ctaRef.current) return
    const el = ctaRef.current
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCtaInView(true)
            obs.disconnect()
          }
        })
      },
      { root: null, rootMargin: '0px 0px -20% 0px', threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  const products = [
    {
      id: 'swap',
      icon: '⟲',
      title: 'PRIVACY SWAP',
      bannerTitle: 'TRADING WITHOUT A\nTRACE',
      description:
        "APP'S PRIVACY SWAP ROUTES TRANSACTIONS THROUGH CONTINUOUS LIQUIDITY POOLS ACROSS SOLANA, MIXING FLOWS AUTOMATICALLY. USERS CAN SWAP ANY TOKEN, INCLUDING PUMP.FUN AND MIGRATED ASSETS, WHILE REMAINING FULLY ANONYMOUS.",
    },
    {
      id: 'send',
      icon: '✈',
      title: 'PRIVACY SEND',
      bannerTitle: 'SEND PRIVATELY\nAND SECURELY',
      description:
        'TRANSFER FUNDS WITHOUT LINKING WALLETS OR REVEALING ON-CHAIN IDENTITIES.',
    },
    {
      id: 'market',
      icon: '▦',
      title: 'PRIVATE MARKETPLACE',
      bannerTitle: 'PRIVATE MARKETPLACE\nAND EXCHANGES',
      description: 'BUY, SELL, OR TRADE IN TOTAL PRIVACY — NO PUBLIC LISTINGS.',
    },
    {
      id: 'ephemeral',
      icon: '▣',
      title: 'EPHEMERAL WALLETS',
      bannerTitle: 'EASILY CREATE TEMP\nWALLETS',
      description: 'CREATE SHORT-LIVED WALLETS FOR ONE-TIME USES TO PROTECT LONG-TERM PRIVACY.',
    },
    {
      id: 'api',
      icon: '▤',
      title: 'APP API',
      bannerTitle: 'INTEGRATE PRIVACY\nPROGRAMMATICALLY',
      description: 'BUILDERS CAN INTEGRATE PRIVACY FEATURES USING OUR API.',
    },
    {
      id: 'docs',
      icon: '▤',
      title: 'APP DOCS',
      bannerTitle: 'DEVELOPER DOCS &\nGUIDES',
      description: 'DETAILED DOCUMENTATION FOR BUILDING ON APP.',
    },
  ];

  const [selectedProduct, setSelectedProduct] = useState(0);

  const faqs = [
    {
      q: 'HOW DOES APP ENSURE PRIVACY?',
      a:
        'APP uses disposable (ephemeral) wallets and continuous privacy pools to separate every transaction from its source.\nTransactions are routed through pooled liquidity to break address links and avoid persistent on-chain identifiers.',
    },
    {
      q: 'WHAT PRODUCTS DOES APP OFFER?',
      a:
        'Privacy Swap — anonymous token swaps.\nPrivacy Send — transfers without linking wallets.\nEphemeral Wallets — short-lived wallets for one-time use.\nPrivate Marketplace — private listings and trades.\nDeveloper API — programmatic integration of privacy features.',
    },
    {
      q: 'WHO CAN USE APP?',
      a:
        'Anyone seeking stronger on-chain privacy: individuals, builders, and services.\nNo special approvals are required — just a compatible Solana wallet or an ephemeral wallet created in-app.',
    },
    {
      q: 'HOW ARE WE DIFFERENT?',
      a:
        'We design privacy into liquidity and wallet flows rather than relying solely on batching or centralized mixers.\nThe focus is on unlinkability and minimizing on-chain traces.',
    },
    {
      q: 'HOW DO I GET STARTED?',
      a:
        'Connect a Solana wallet or create an ephemeral wallet inside the app.\nFollow the guided on-screen flow for swaps or sends and consult the docs for developer examples.',
    },
  ];

  const [openFaq, setOpenFaq] = useState(-1); // start closed by default

  function toggleFaq(i) {
    // debug: log toggles so it's easy to verify in browser console
    // (remove this log when debugging is complete)
    // eslint-disable-next-line no-console
    console.log('toggleFaq', { index: i, prev: openFaq });
    setOpenFaq((prev) => (prev === i ? -1 : i));
  }

  function selectProduct(index) {
    setSelectedProduct(index);
  }

  return (
    <>
    <section className="home-container-1">
      <div className="hero">
      <div className='hero-1'> 
        <div className="hero-left">
          <div className="headline">
            <h1 className="home-t home-t1"><span className='home-t-sp1'>NO</span><span className='home-t-sp2'>ADDRESSES,</span></h1>
            <h1 className="home-t home-t2"><span className='home-t-sp3'>ONLY</span><span className='home-t-sp4'>PRIVACY.</span></h1>

          </div>

          <p className="hero-sub">
            WE EMPOWER YOU TO TRADE, SEND, AND SWAP PRIVATELY
            <br />
            REDEFINING PRIVACY ON SOLANA.
          </p>

          <div className="hero-ctas">
            <div role="button" tabIndex={0} onClick={onSwapClick} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSwapClick(); } }}>
              <Btn1 text="SWAP" />
            </div>
            <Btn2 onClick={() => { const el = document.querySelector('.home-container-2'); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }} text="ABOUT APP" />
          </div>
        </div>
        <div className="hero-right">
          <Globe />
        </div>
        </div>
      </div>

      <div className="cards-row">
        <HomeCard
          icon={card1}
          title={'PRIVACY SWAP'}
          subtitle={'SWAP ANY SOLANA TOKEN PRIVATELY THROUGH'}
          description={'CONTINUOUS POOLS THAT ERASE YOUR TRACE.'}
        />

        <HomeCard
          icon={card1}
          title={'PRIVACY SEND'}
          subtitle={'TRANSFER FUNDS WITHOUT LINKING WALLETS OR'}
          description={'REVEALING ON-CHAIN IDENTITIES.'}
        />

        <HomeCard
          icon={card1}
          title={'PRIVATE PLACE'}
          subtitle={'BUY, SELL, OR TRADE IN TOTAL PRIVACY'}
          description={'NO PUBLIC LISTINGS, NO EXPOSURE.'}
        />
      </div>

    </section>
    <section className='home-container-2'>
      <div className="About-App">
        <div className="About-left">
         <p className="About-sub">
            /ABOUT APP
          </p>
          <div className={`About-headline ${aboutInView ? 'in-view' : ''}`} ref={aboutRef}>
            <h1 className="About-t About-t1 About-t-all"><span className='About-Words about-w-1'>WE</span><span className='About-Words about-w-2'>PROVIDE</span><span className='About-Words about-w-3'>A</span><span className='About-Words about-w-4'>PRIVACY</span></h1>
            <h1 className="About-t About-t2 About-t-all"><span className='About-Words about-w-5'>LAYER</span><span className='About-Words about-w-6'>THAT</span><span className='About-Words about-w-7'>SECURES</span></h1>
            <h1 className="About-t About-t2 About-t-all"><span className='About-Words about-w-8'>YOUR</span><span className='About-Words about-w-9'>ACTIVITY</span><span className='About-Words about-w-10'>AND</span></h1>
            <h1 className="About-t About-t2 About-t-all"><span className='About-Words about-w-11'>REMOVES</span><span className='About-Words about-w-12'>YOUR</span><span className='About-Words about-w-13'>TRACE</span></h1>
          </div>
        </div>
      </div>

      <div className="About-cards-row">
        <HomeCard
          className="About-Card"
          title={'/ MISSION'}
          subtitle={''}
          description={<>
            OUR VISION IS TO REDEFINE PRIVACY ACROSS SOLANA
            <br />
            BY CREATING A DECENTRALIZED, ADDRESSLESS
            <br />
            ECONOMY WHERE SECURITY AND FREEDOM COEXIST.
          </>}
        />

        <HomeCard
          className="About-Card"
          title={'/ VISION'}
          subtitle={''}
          description={<>
            OUR VISION IS TO REDEFINE PRIVACY ACROSS SOLANA
            <br />
            BY CREATING A DECENTRALIZED, ADDRESSLESS
            <br />
            ECONOMY WHERE SECURITY AND FREEDOM COEXIST.
          </>}
        />
      </div>
    </section>
    <MovingS />

    <section className='home-container-3'>
      <div className="home-section-3">
        <video
          className="bg-video"
          src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
          autoPlay
          muted
          loop
          playsInline
        />

        <div className="video-overlay" />

        <div className="center-plus" aria-hidden="true">
          <span className="plus-vertical" />
          <span className="plus-horizontal" />
        </div>

        <div className="corner top-left" />
        <div className="corner top-right" />
        <div className="corner bottom-left" />
        <div className="corner bottom-right" />

        <div className="section-caption">OUR MISSION IS TO CREATE A PRIVATE DIGITAL LANDSCAPE FOR EVERYONE ON SOLANA.</div>
      </div>
    </section>

    <section className='home-container-4'>
      <div className="home-section-4">
        <div className="grid-bg" aria-hidden="true"></div>

        <div className={`CTA-heading ${ctaInView ? 'in-view' : ''}`} ref={ctaRef}>
          <h1 className="CTA-line"><span className="CTA-word cta-w-1">EXPLORE</span> <span className="CTA-word cta-w-2">THE</span> <span className="CTA-word cta-w-3">FUTURE</span> <span className="CTA-word cta-w-4">OF</span></h1>
          <h1 className="CTA-line"><span className="CTA-word cta-w-5">PRIVACY</span> <span className="CTA-word cta-w-6">ON</span> <span className="CTA-word cta-w-7">SOLANA</span> <span className="CTA-word cta-w-8">AND</span></h1>
          <h1 className="CTA-line"><span className="CTA-word cta-w-9">ACCESS</span> <span className="CTA-word cta-w-10">APP</span> <span className="CTA-word cta-w-11">DOCS</span> <span className="CTA-word cta-w-12">TODAY</span></h1>
        </div>

        <div className="CTA">
          <div className="cta-btn btn1-wrap">
            <Btn1 text="VIEW DOCS" />
          </div>
          <div className="cta-btn btn2-wrap">
            <div onClick={onSwapClick}>
              <Btn2 text="SWAP" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className='home-container-5'>
      <h3 className="products-heading">PRIVACY SOLUTIONS FOR EVERY<br/>USE CASE</h3>
      <div className="products-section">
        <div className="products-left">
          <ul className="products-list">
            {products.map((p, i) => (
              <li
                key={p.id}
                role="button"
                tabIndex={0}
                className={`products-item ${selectedProduct === i ? 'active' : ''}`}
                onClick={() => selectProduct(i)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') selectProduct(i); }}
              >
                <span className="products-icon">{p.icon}</span>
                <span className="products-label">{p.title}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="products-right">
          <div className="products-panel">
            <div className="products-panel-grid" aria-hidden="true"></div>
            <h2 className="products-title">{products[selectedProduct].bannerTitle.split('\n').map((line, idx) => (
              <span key={idx}>{line}<br/></span>
            ))}</h2>
            <p className="products-desc">{products[selectedProduct].description}</p>
          </div>
        </div>
      </div>
    </section>

    <section className='home-container-6'>
      <div className="faq-section">
        <p className="faq-pretitle">/ DOCS &amp; SUPPORT</p>
        <h2 className="faq-heading">YOUR MOST COMMON<br/>QUESTIONS ABOUT APP ANSWERED</h2>

        <div className="faq-list-wrap">
          <ul className="faq-list">
            {faqs.map((f, i) => (
              <li key={i} className={`faq-item ${openFaq === i ? 'open' : ''}`}>
                <button
                  type="button"
                  className="faq-question"
                  onClick={() => toggleFaq(i)}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleFaq(i); } }}
                  aria-expanded={openFaq === i}
                >
                  <span className="faq-qtext">{f.q}</span>
                  <span className="faq-toggle" aria-hidden="true">{openFaq === i ? '×' : '+'}</span>
                </button>

                <div className="faq-body" aria-hidden={openFaq === i ? 'false' : 'true'}>
                  {f.a.split('\n').map((line, idx) => (
                    <p key={idx}>{line}</p>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
    </>
  )
}


