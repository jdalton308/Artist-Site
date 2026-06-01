import AboutSection from "@/components/organisms/AboutSection/AboutSection";
import { getAboutPage } from "@/lib/payload/queries";
export const revalidate = 3600;

export const metadata = {
  title: "About",
  description: "The story behind the music.",
};

export default async function AboutPage() {
  const about = await getAboutPage();

  return (
    <section className="section">
      <div className="container">
        <AboutSection about={about} />
      </div>
    </section>
  );
}
