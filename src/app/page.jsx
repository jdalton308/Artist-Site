import Hero from "@/components/organisms/Hero/Hero";
import LatestRelease from "@/components/organisms/LatestRelease/LatestRelease";
import UpcomingShows from "@/components/organisms/UpcomingShows/UpcomingShows";
import { getHomePageData } from "@/lib/payload/queries";
export const revalidate = 3600;

export default async function HomePage() {
  const data = await getHomePageData();

  return (
    <>
      <Hero
        headline={data.heroHeadline}
        subheadline={data.heroSubheadline}
        imageUrl={data.heroImageUrl}
        ctaLabel={data.heroCtaLabel}
        ctaUrl={data.heroCtaUrl}
      />
      <LatestRelease release={data.latestRelease} />
      <UpcomingShows dates={data.upcomingTourDates} />
    </>
  );
}
