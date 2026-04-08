"use client";

import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';

interface NotesSectionProps {
  currentDate: Date;
}

export default function NotesSection({ currentDate }: NotesSectionProps) {
  const [note, setNote] = useState('');
  const storageKey = `notes-${format(currentDate, 'yyyy-MM')}`;

  // Load note for current month
  useEffect(() => {
    const savedNote = localStorage.getItem(storageKey);
    setNote(savedNote || '');
  }, [storageKey]);

  // Save note on change
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setNote(newValue);
    localStorage.setItem(storageKey, newValue);
  };

  return (
    <div className="notes-section">
      <h2 className="notes-label">Notes</h2>
      <textarea
        className="notes-paper"
        placeholder=""
        value={note}
        onChange={handleChange}
      />
    </div>
  );
}
