import TourDateRow from "@/components/molecules/TourDateRow/TourDateRow";
import "./TourDateList.css";

export default function TourDateList({ dates = [], showPastBadge = false }) {
  if (!dates.length) {
    return <p className="tour-date-list__empty">No shows scheduled.</p>;
  }

  return (
    <div className="tour-date-list">
      {dates.map((date) => (
        <TourDateRow key={date.id} date={date} showPastBadge={showPastBadge} />
      ))}
    </div>
  );
}
