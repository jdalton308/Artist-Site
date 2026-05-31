import Heading from "@/components/atoms/Heading/Heading";
import Text from "@/components/atoms/Text/Text";
import ReleaseGrid from "@/components/organisms/ReleaseGrid/ReleaseGrid";
import { getReleases } from "@/lib/contentful/queries";
export const revalidate = 3600;

export const metadata = {
  title: "Music",
  description: "Releases, streaming links, and embedded players.",
};

export default async function MusicPage() {
  const releases = await getReleases();

  return (
    <section className="section">
      <div className="container">
        <div className="section__header">
          <span className="section__eyebrow">Discography</span>
          <Heading size="lg">Music</Heading>
          <Text variant="lead">
            Stream everywhere or dive into the full catalog below.
          </Text>
        </div>
        <ReleaseGrid releases={releases} />
      </div>
    </section>
  );
}
