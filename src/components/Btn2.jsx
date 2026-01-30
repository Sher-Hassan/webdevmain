import React from 'react';
import '../styles/Btn2.css';

/**
 * Btn2 Component
 * A simple CTA button. Default-exporting the button component itself.
 */
const Btn2 = ({ text = 'About App' }) => {
  return (
    <button className="Btn2-slide">
      <span className="Btn2-text-wrap">
        <span className="Btn2-text Btn2-text--front">{text}</span>
        <span className="Btn2-text Btn2-text--back" aria-hidden="true">{text}</span>
      </span>
      <span className="Btn2-bg-slider" aria-hidden="true"></span>
    </button>
  );
};

export default Btn2;

