"use client";

import React, { useMemo, useCallback } from 'react';
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  isSameMonth, 
  isSameDay, 
  isWithinInterval,
  isWeekend
  , startOfToday
} from 'date-fns';

interface MonthGridProps {
  currentDate: Date;
  onDateClick: (date: Date) => void;
  startDate: Date | null;
  endDate: Date | null;
  holidays: Date[];
}

function MonthGrid({ currentDate, startDate, endDate, onDateClick, holidays }: MonthGridProps) {
  const monthStart = useMemo(() => startOfMonth(currentDate), [currentDate]);
  const monthEnd = useMemo(() => endOfMonth(monthStart), [monthStart]);

  const startDateInView = useMemo(() => startOfWeek(monthStart, { weekStartsOn: 1 }), [monthStart]);
  const endDateInView = useMemo(() => endOfWeek(monthEnd, { weekStartsOn: 1 }), [monthEnd]);

  const calendarDays = useMemo(() => {
    let days = eachDayOfInterval({ start: startDateInView, end: endDateInView });

    if (days.length < 42) {
      const lastDay = days[days.length - 1];
      const extraDays = eachDayOfInterval({
        start: new Date(lastDay.getTime() + 86400000),
        end: new Date(lastDay.getTime() + (42 - days.length) * 86400000)
      });
      days = [...days, ...extraDays];
    }

    return days;
  }, [startDateInView, endDateInView]);

  const weekDays = useMemo(() => ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'], []);

  const today = useMemo(() => startOfToday(), []);

  const getDayClass = useCallback((day: Date) => {
    let classes = 'day-cell';

    if (!isSameMonth(day, monthStart)) {
      classes += ' dimmed';
    }

    if (isWeekend(day)) {
      classes += ' weekend';
    }

    if (holidays.some(h => isSameDay(h, day))) {
      classes += ' holiday';
    }

    if (startDate && isSameDay(day, startDate)) {
      if (endDate) {
        classes += ' selected-start';
      } else {
        classes += ' selected-single';
      }
    } else if (endDate && isSameDay(day, endDate)) {
      classes += ' selected-end';
    } else if (startDate && endDate && isWithinInterval(day, { start: startDate, end: endDate })) {
      classes += ' selected-range';
    }

    if (isSameDay(day, today)) {
      classes += ' today';
    }

    return classes;
  }, [startDate, endDate, monthStart, holidays, today]);

  return (
    <div className="calendar-grid-container">
      <div className="weekday-header">
        {weekDays.map((day, i) => (
          <div key={day} className={`weekday ${i >= 5 ? 'weekend' : ''}`}>
            {day}
          </div>
        ))}
      </div>
      <div className="days-grid">
        {calendarDays.map((day) => (
          <div 
            key={day.toString()} 
            className={getDayClass(day)}
            onClick={() => isSameMonth(day, monthStart) && onDateClick(day)}
            style={{ cursor: isSameMonth(day, monthStart) ? 'pointer' : 'default' }}
          >
            <span className="day-number">{format(day, 'd')}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default React.memo(MonthGrid);
