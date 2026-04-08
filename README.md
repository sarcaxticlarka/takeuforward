# Wall Calendar — Interactive Calendar Component

This repository contains a responsive, interactive wall-calendar component built with Next.js. It was implemented as part of a frontend engineering challenge / internship exercise.

The component aims to reproduce a physical wall-calendar aesthetic with a prominent hero image, a month grid with a day-range selector, and an integrated notes panel.

## What I implemented

- Wall Calendar aesthetic: a hanging mechanism, a hero image area, a month grid, and a notes section.
- Month-to-hero image mapping: the hero image changes when you navigate between months. The mapping lives in `components/Calendar/index.tsx` (array `monthImages`).
- Day range selection: click to set a start date, click another date to set an end date. Visual states for start, end and in-range days are styled in `components/Calendar/calendar.css`.
- Notes section: a simple notes area is integrated (see `NotesSection.tsx`). Notes are client-side only (no backend). You can extend to use localStorage.
- Responsive layout: desktop uses a spacious layout; mobile collapses into a stacked layout while keeping date selection and notes usable.
- Small animation: page flips/rotates when switching months using Framer Motion.

## Files of interest

- `components/Calendar/index.tsx` — main calendar container, month navigation, and the image-to-month mapping.
- `components/Calendar/HeroSection.tsx` — the hero image and month/year label. Accepts an optional `imageSrc` prop.
- `components/Calendar/MonthGrid.tsx` — calendar grid, weekday header, click handling for date selection.
- `components/Calendar/NotesSection.tsx` — notes UI for the selected month/date range.
- `components/Calendar/calendar.css` — styles for the calendar visuals and responsiveness.
- `public/heroimg/` — hero images used for the months.

## How to run (local)

Prerequisites: Node.js (16+ recommended) and npm, pnpm, or yarn.

1. Install dependencies

```bash
npm install
```

2. Run the dev server

```bash
npm run dev
```

3. Open your browser at http://localhost:3000

The calendar should render on the homepage. Use the left/right nav buttons to change months — the hero image will change with the month.
 