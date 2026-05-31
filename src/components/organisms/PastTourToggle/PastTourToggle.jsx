"use client";

import { useState } from "react";
import TourDateList from "@/components/organisms/TourDateList/TourDateList";
import "./PastTourToggle.css";

export default function PastTourToggle({ futureDates = [], pastDates = [] }) {
  const [showPast, setShowPast] = useState(false);

  const dates = showPast ? [...futureDates, ...pastDates] : futureDates;

  return (
    <div className="past-tour-toggle">
      <div className="past-tour-toggle__controls">
        <button
          type="button"
          className={`past-tour-toggle__btn ${!showPast ? "past-tour-toggle__btn--active" : ""}`}
          onClick={() => setShowPast(false)}
        >
          Upcoming
        </button>
        <button
          type="button"
          className={`past-tour-toggle__btn ${showPast ? "past-tour-toggle__btn--active" : ""}`}
          onClick={() => setShowPast(true)}
        >
          Show Past Dates
        </button>
      </div>
      <TourDateList dates={dates} showPastBadge={showPast} />
    </div>
  );
}
