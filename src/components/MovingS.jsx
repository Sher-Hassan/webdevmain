import React from "react";

const labels = [
  'DECENTRALIZATION',
  'INTEGRITY',
  'TRANSPARENCY',
  'INNOVATION',
  'VALUES',
  'PRINCIPLES',
  'PRIVACY',
  'FREEDOM',
  'SECURITY',
  'ANONYMITY'
];

const MovingS = () => {
  // duplicate the sequence so the track can scroll continuously
  const items = labels;

  return (
    <div className="moving-strip" aria-hidden="false">
      <div className="strip-content">
        <div className="track">
          {items.map((txt, i) => (
            <div className="strip-item" key={`a-${i}`}>
              <span className="square" aria-hidden="true" />
              <span className="label">{txt}</span>
            </div>
          ))}
        </div>

        {/* duplicate track for seamless infinite scroll */}
        <div className="track" aria-hidden="true">
          {items.map((txt, i) => (
            <div className="strip-item" key={`b-${i}`}>
              <span className="square" aria-hidden="true" />
              <span className="label">{txt}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovingS;