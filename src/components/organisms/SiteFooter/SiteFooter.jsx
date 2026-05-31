import NavLink from "@/components/molecules/NavLink/NavLink";
import SocialLinks from "@/components/molecules/SocialLinks/SocialLinks";
import Text from "@/components/atoms/Text/Text";
import "./SiteFooter.css";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/live", label: "Live" },
  { href: "/music", label: "Music" },
  { href: "/about", label: "About" },
  { href: "/merch", label: "Merch" },
];

export default function SiteFooter({ artistName, socialLinks = [], tagline = "" }) {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div className="site-footer__brand">
          <p className="site-footer__name">{artistName}</p>
          {tagline && <Text variant="muted">{tagline}</Text>}
        </div>

        <nav className="site-footer__nav">
          <ul className="site-footer__nav-list">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <NavLink href={item.href}>{item.label}</NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-footer__social">
          <Text variant="label">Follow</Text>
          <SocialLinks links={socialLinks} size="lg" showLabels />
        </div>

        <p className="site-footer__copy">
          &copy; {year} {artistName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
