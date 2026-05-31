import Button from "@/components/atoms/Button/Button";
import Badge from "@/components/atoms/Badge/Badge";
import "./TourDateRow.css";

export default function TourDateRow({ date, showPastBadge = false }) {
  return (
    <article className={`tour-date-row ${date.isPast ? "tour-date-row--past" : ""}`}>
      <div className="tour-date-row__date">
        <time dateTime={date.date}>{date.dateFormatted}</time>
      </div>
      <div className="tour-date-row__info">
        <h3 className="tour-date-row__city">{date.city}</h3>
        <p className="tour-date-row__venue">
          {date.venue}
          {date.country ? ` · ${date.country}` : ""}
        </p>
      </div>
      <div className="tour-date-row__action">
        {date.isPast && showPastBadge ? (
          <Badge variant="sold-out">Past Show</Badge>
        ) : !date.isPast ? (
          <Button href={date.ticketUrl} external variant="secondary" size="sm">
            Tickets
          </Button>
        ) : null}
      </div>
    </article>
  );
}
