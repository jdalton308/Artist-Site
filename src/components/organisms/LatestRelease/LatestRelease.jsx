import Link from "next/link";
import Button from "@/components/atoms/Button/Button";
import Heading from "@/components/atoms/Heading/Heading";
import Text from "@/components/atoms/Text/Text";
import StreamingLinks from "@/components/molecules/StreamingLinks/StreamingLinks";
import "./LatestRelease.css";

export default function LatestRelease({ release }) {
  if (!release) return null;

  return (
    <section className="section latest-release">
      <div className="container">
        <div className="section__header">
          <span className="section__eyebrow">New Music</span>
          <Heading size="lg">Latest Release</Heading>
        </div>
        <div className="latest-release__grid">
          {release.coverArtUrl && (
            <Link href="/music" className="latest-release__cover-link">
              <img
                src={release.coverArtUrl}
                alt={`${release.title} cover art`}
                className="latest-release__cover"
              />
            </Link>
          )}
          <div className="latest-release__content">
            <Text variant="label">{release.year}</Text>
            <Heading as="h3" size="md">
              {release.title}
            </Heading>
            {release.description && <Text variant="lead">{release.description}</Text>}
            <StreamingLinks links={release.streamingLinks} />
            <Button href="/music" variant="secondary" size="md">
              All Releases
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
