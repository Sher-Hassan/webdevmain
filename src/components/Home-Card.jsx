import React from 'react'
import '../styles/Home-Card.css'

/**
 * HomeCard
 * Props:
 * - icon: URL for the small corner icon (optional)
 * - title: main title (e.g. PRIVACY SWAP)
 * - subtitle: short subtitle line
 * - description: longer descriptive text (can include line breaks)
 */
export default function HomeCard({
  icon = null,
  title = 'PRIVACY SWAP',
  subtitle = 'SWAP ANY SOLANA TOKEN PRIVATELY THROUGH',
  description = 'CONTINUOUS POOLS THAT ERASE YOUR TRACE.'
}) {
  return (
    <article className="HC-card">
      <div className="HC-grid" aria-hidden="true" />

      {icon && (
        <div className="HC-icon">
          <img src={icon} alt="" />
        </div>
      )}

      <div className="HC-content">
        <h3 className="HC-title">{title}</h3>
        <h4 className="HC-sub">{subtitle}</h4>
        <p className="HC-desc">{description}</p>
      </div>
    </article>
  )
}
