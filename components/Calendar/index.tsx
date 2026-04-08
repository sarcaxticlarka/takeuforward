"use client";

import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { addMonths, subMonths, isBefore, isSameDay, startOfToday } from 'date-fns';
import SpiralHeader from './SpiralHeader';
import HeroSection from './HeroSection';
import NotesSection from './NotesSection';
import MonthGrid from './MonthGrid';
import './calendar.css';

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2022, 0, 1)); // January 2022
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [direction, setDirection] = useState(0);

  // Mock Holidays for Jan 2022
  const holidays = [
    new Date(2022, 0, 1),  // New Year
    new Date(2022, 0, 17), // MLK Day
    new Date(2022, 0, 26), // Republic Day
  ];

  const handleDateClick = (date: Date) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(null);
    } else if (startDate && !endDate) {
      if (isBefore(date, startDate)) {
        setStartDate(date);
      } else if (isSameDay(date, startDate)) {
        setStartDate(null);
      } else {
        setEndDate(date);
      }
    }
  };

  const nextMonth = useCallback(() => {
    setDirection(1);
    setCurrentDate(d => addMonths(d, 1));
  }, []);

  const prevMonth = useCallback(() => {
    setDirection(-1);
    setCurrentDate(d => subMonths(d, 1));
  }, []);

  const setToday = () => {
    const today = startOfToday();
    setCurrentDate(today);
  };

  const clearSelection = () => {
    setStartDate(null);
    setEndDate(null);
  };

  const variants = useMemo(
    () => ({
      enter: (direction: number) => ({
        rotateX: direction > 0 ? -120 : 120, // Swing from below/above
        opacity: 0,
      }),
      center: {
        rotateX: 0,
        opacity: 1,
      },
      exit: (direction: number) => ({
        rotateX: direction > 0 ? 120 : -120, // Swing away
        opacity: 0,
      }),
    }),
    []
  );

  // Map each month (0 = January, 11 = December) to an image in public/heroimg.
  // There are 12 images in `public/heroimg` (img2..img12 plus hero-climber.png).
  // If you want a different mapping, update the array order here.
  const monthImages = useMemo(
    () => [
      '/heroimg/img2.avif',
      '/heroimg/img3.avif',
      '/heroimg/img4.avif',
      '/heroimg/img5.avif',
      '/heroimg/img6.avif',
      '/heroimg/img7.avif',
      '/heroimg/img8.avif',
      '/heroimg/img9.avif',
      '/heroimg/img10.avif',
      '/heroimg/img11.avif',
      '/heroimg/img12.avif',
      '/hero-climber.png',
    ],
    []
  );

  const currentMonthImage = useMemo(
    () => monthImages[currentDate.getMonth() % monthImages.length],
    [monthImages, currentDate]
  );

  return (
    <div className="calendar-container">
      <div className="hanging-mechanism">
        <div className="nail"></div>
        <div className="thread"></div>
      </div>
      
      <div className="calendar-board">
        <SpiralHeader />
        
        <div className="calendar-controls">
           <div className="nav-group">
              <button onClick={prevMonth} className="nav-btn"><ChevronLeft size={20} /></button>
              <button onClick={nextMonth} className="nav-btn"><ChevronRight size={20} /></button>
           </div>
           <button onClick={setToday} className="action-btn">Today</button>
           <button onClick={clearSelection} className="action-btn">Clear Range</button>
        </div>

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentDate.toString()}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              rotateX: { type: "spring", stiffness: 100, damping: 20 },
              opacity: { duration: 0.3 }
            }}
            style={{ 
              width: '100%', 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column',
              transformOrigin: 'top'
            }}
          >
            <HeroSection currentDate={currentDate} imageSrc={currentMonthImage} />
            
            <div className="main-content">
              <NotesSection currentDate={currentDate} />
              <MonthGrid 
                currentDate={currentDate}
                startDate={startDate}
                endDate={endDate}
                onDateClick={handleDateClick}
                holidays={holidays}
              />
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="calendar-footer"></div>

        <style jsx>{`
          .nav-btn {
            background: rgba(255, 255, 255, 0.85);
            border: 1px solid rgba(0,0,0,0.1);
            border-radius: 50%;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            color: #333;
            box-shadow: 0 2px 6px rgba(0,0,0,0.1);
            transition: all 0.2s;
            backdrop-filter: blur(4px);
          }
          .nav-btn:hover {
            background: white;
            transform: translateY(-1px);
            box-shadow: 0 4px 10px rgba(0,0,0,0.15);
          }
        `}</style>
      </div>
    </div>
  );
}
