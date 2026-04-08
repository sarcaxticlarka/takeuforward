"use client";

import React from 'react';

export default function SpiralHeader() {
  const rings = Array.from({ length: 47 });

  return (
    <div className="spiral-header">
      <div className="hanger"></div>
      {/* Rod that goes through all spirals */}
      <div className="spiral-rod"></div>
      <div className="spiral-container">
        {rings.map((_, i) => (
          <div key={i} className="spiral-ring">
            <div className="ring-hole"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
