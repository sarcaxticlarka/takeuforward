"use client";

import React, { useMemo } from 'react';
import { format } from 'date-fns';

interface HeroSectionProps {
  currentDate: Date;
}

interface HeroSectionProps {
  currentDate: Date;
  imageSrc?: string;
}

function HeroSection({ currentDate, imageSrc }: HeroSectionProps) {
  const src = imageSrc ?? '/hero-climber.png';

  const yearLabel = useMemo(() => format(currentDate, 'yyyy'), [currentDate]);
  const monthLabel = useMemo(() => format(currentDate, 'MMMM'), [currentDate]);

  return (
    <div className="hero-container">
      <div className="hero-blue-bg"></div>
      <img 
        src={src}
        alt="Hero" 
        className="hero-image"
      />
      <div className="hero-overlay">
        <div className="hero-content">
          <span className="hero-year">{yearLabel}</span>
          <h1 className="hero-month">{monthLabel}</h1>
        </div>
      </div>
    </div>
  );
}

export default React.memo(HeroSection);
