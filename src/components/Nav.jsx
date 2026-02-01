import React, { useState } from 'react'
import Btn2 from './Btn2.jsx'
import Btn1 from './Btn1.jsx'
import '../styles/Nav.css'

export default function Nav({ onSwapClick }){
	const [mobileOpen, setMobileOpen] = useState(false)

	return (
		<nav className={`nav-wrap ${mobileOpen ? 'open' : ''}`}>
			<div className="nav-inner">
				<div className="nav-left">
					<span className="nav-logo-square" aria-hidden="true"/>
					<span className="nav-brand">VeilSwap</span>
				</div>

				<div className="nav-right">
					{/* Hamburger toggle (visible on small screens) */}
					<button
						className="nav-toggle"
						aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
						aria-expanded={mobileOpen}
						onClick={() => setMobileOpen((v) => !v)}
					>
						<span className="hamburger-bar" />
						<span className="hamburger-bar" />
						<span className="hamburger-bar" />
					</button>

					<ul className="nav-links">
						<li onClick={() => { setMobileOpen(false); const el = document.querySelector('.home-container-2'); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}><Btn1 text="ABOUT" /></li>
						<li onClick={() => { setMobileOpen(false); const el = document.querySelector('.home-container-4'); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}><Btn1 text="DOCS" /></li> 
						<li onClick={() => { setMobileOpen(false); const el = document.querySelector('.home-container-5'); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}><Btn1 text="PRODUCTS" /></li>
					</ul> 
 
					<div className="nav-cta">
						<div onClick={() => { setMobileOpen(false); if (onSwapClick) onSwapClick(); }}>
							<Btn2 text="SWAP" />
						</div>
					</div>
				</div>

				{/* Mobile full panel (appears when hamburger is opened) */}
				<div
					className="mobile-panel"
					role="dialog"
					aria-modal="true"
					aria-hidden={!mobileOpen}
				>
					<button className="mobile-close" aria-label="Close menu" onClick={() => setMobileOpen(false)}>×</button>

					<ul className="mobile-links">
						<li onClick={() => { setMobileOpen(false); const el = document.querySelector('.home-container-2'); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}><Btn1 text="ABOUT" /></li>
						<li onClick={() => { setMobileOpen(false); const el = document.querySelector('.home-container-4'); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}><Btn1 text="DOCS" /></li>
						<li onClick={() => { setMobileOpen(false); const el = document.querySelector('.home-container-5'); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}><Btn1 text="PRODUCTS" /></li> 
					</ul>

					<div className="mobile-cta" onClick={() => { setMobileOpen(false); if (onSwapClick) onSwapClick(); }}>
						<Btn2 text="SWAP" />
					</div>
				</div>
			</div>
		</nav>
	)
}

