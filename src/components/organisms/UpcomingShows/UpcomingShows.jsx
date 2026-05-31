import Button from "@/components/atoms/Button/Button";
import Heading from "@/components/atoms/Heading/Heading";
import TourDateRow from "@/components/molecules/TourDateRow/TourDateRow";
import "./UpcomingShows.css";

export default function UpcomingShows({ dates = [] }) {
  const upcoming = dates.slice(0, 3);

  if (!upcoming.length) return null;

  return (
    <section className="section upcoming-shows">
      <div className="container">
        <div className="section__header">
          <span className="section__eyebrow">On Tour</span>
          <Heading size="lg">Upcoming Shows</Heading>
        </div>
        <div className="upcoming-shows__list">
          {upcoming.map((date) => (
            <TourDateRow key={date.id} date={date} />
          ))}
        </div>
        <div className="upcoming-shows__cta">
          <Button href="/live" variant="primary" size="md">
            All Tour Dates
          </Button>
        </div>
      </div>
    </section>
  );
}
