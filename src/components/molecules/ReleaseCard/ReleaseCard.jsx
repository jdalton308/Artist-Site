import Heading from "@/components/atoms/Heading/Heading";
import Text from "@/components/atoms/Text/Text";
import StreamingLinks from "@/components/molecules/StreamingLinks/StreamingLinks";
import "./ReleaseCard.css";

export default function ReleaseCard({ release }) {
  return (
    <article className="release-card">
      <div className="release-card__media">
        {release.coverArtUrl && (
          <img
            src={release.coverArtUrl}
            alt={`${release.title} cover art`}
            className="release-card__cover"
          />
        )}
        {release.embedUrl && (
          <div className="release-card__embed">
            <iframe
              src={release.embedUrl}
              title={`${release.title} player`}
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              allowFullScreen
            />
          </div>
        )}
      </div>
      <div className="release-card__content">
        <Text variant="label">{release.year}</Text>
        <Heading as="h3" size="md">
          {release.title}
        </Heading>
        {release.description && <Text variant="body">{release.description}</Text>}
        <StreamingLinks links={release.streamingLinks} />
      </div>
    </article>
  );
}
