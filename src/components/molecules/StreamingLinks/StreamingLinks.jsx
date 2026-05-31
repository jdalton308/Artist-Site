import Icon from "@/components/atoms/Icon/Icon";
import "./StreamingLinks.css";

const PLATFORM_LABELS = {
  spotify: "Spotify",
  apple: "Apple Music",
  youtube: "YouTube Music",
  tidal: "Tidal",
  bandcamp: "Bandcamp",
};

export default function StreamingLinks({ links = {} }) {
  const entries = Object.entries(links).filter(([, url]) => url);

  if (!entries.length) return null;

  return (
    <ul className="streaming-links">
      {entries.map(([platform, url]) => (
        <li key={platform}>
          <a
            href={url}
            className="streaming-links__link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name={platform} size="sm" />
            <span>{PLATFORM_LABELS[platform] || platform}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
