import React from 'react';
import '../styles/Btn1.css';

/**
 * Btn1 Component
 * A simple CTA button. Default-exporting the button component itself.
 */
const Btn1 = ({ text = 'LAUNCH APP' }) => {
  return (
    <button className="btn1-slide">
      <span className="btn1-text-wrap">
        <span className="btn1-text btn1-text--front">{text}</span>
        <span className="btn1-text btn1-text--back" aria-hidden="true">{text}</span>
      </span>
      <span className="btn1-bg-slider" aria-hidden="true"></span>
    </button>
  );
};

export default Btn1;

