import Icon from "@/components/atoms/Icon/Icon";
import "./SocialLinks.css";

export default function SocialLinks({ links = [], size = "md", showLabels = false }) {
  if (!links.length) return null;

  return (
    <ul className={`social-links social-links--${size}`}>
      {links.map((link) => (
        <li key={link.id || link.platform}>
          <a
            href={link.url}
            className="social-links__link"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label || link.platform}
          >
            <Icon name={link.platform.toLowerCase()} size={size} />
            {showLabels && <span className="social-links__label">{link.label}</span>}
          </a>
        </li>
      ))}
    </ul>
  );
}
