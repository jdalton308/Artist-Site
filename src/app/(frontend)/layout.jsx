import SiteHeader from "@/components/organisms/SiteHeader/SiteHeader";
import SiteFooter from "@/components/organisms/SiteFooter/SiteFooter";
import { getArtistSettings } from "@/lib/payload/queries";
import "./globals.css";

export const metadata = {
  title: {
    default: "NEON PULSE",
    template: "%s | NEON PULSE",
  },
  description: "Official website — tour dates, music, merch, and more.",
};

export default async function RootLayout({ children }) {
  const settings = await getArtistSettings();

  return (
    <html lang="en">
      <body>
        <SiteHeader artistName={settings.artistName} socialLinks={settings.socialLinks} />
        <main className="page-main">{children}</main>
        <SiteFooter
          artistName={settings.artistName}
          socialLinks={settings.socialLinks}
          tagline={settings.tagline}
        />
      </body>
    </html>
  );
}
