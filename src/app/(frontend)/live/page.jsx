import Heading from "@/components/atoms/Heading/Heading";
import Text from "@/components/atoms/Text/Text";
import PastTourToggle from "@/components/organisms/PastTourToggle/PastTourToggle";
import { getTourDates } from "@/lib/payload/queries";
export const revalidate = 3600;

export const metadata = {
  title: "Live",
  description: "Upcoming tour dates and ticket links.",
};

export default async function LivePage() {
  const { future, past } = await getTourDates();

  return (
    <section className="section">
      <div className="container">
        <div className="section__header">
          <span className="section__eyebrow">On Tour</span>
          <Heading size="lg">Live Dates</Heading>
          <Text variant="lead">
            Catch NEON PULSE on the road. Grab tickets before they sell out if past shows are any indication.
          </Text>
        </div>
        <PastTourToggle futureDates={future} pastDates={past} />
      </div>
    </section>
  );
}
