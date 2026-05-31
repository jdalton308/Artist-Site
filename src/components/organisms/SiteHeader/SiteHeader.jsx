"use client";

import { useState } from "react";
import Link from "next/link";
import NavLink from "@/components/molecules/NavLink/NavLink";
import SocialLinks from "@/components/molecules/SocialLinks/SocialLinks";
import Icon from "@/components/atoms/Icon/Icon";
import "./SiteHeader.css";

const NAV_ITEMS = [
  { href: "/live", label: "Live" },
  { href: "/music", label: "Music" },
  { href: "/about", label: "About" },
  { href: "/merch", label: "Merch" },
];

export default function SiteHeader({ artistName, socialLinks = [] }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link href="/" className="site-header__brand">
          {artistName}
        </Link>

        <nav className={`site-header__nav ${menuOpen ? "site-header__nav--open" : ""}`}>
          <ul className="site-header__nav-list">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <NavLink href={item.href} onClick={() => setMenuOpen(false)}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <SocialLinks links={socialLinks} size="md" />
        </nav>

        <button
          type="button"
          className="site-header__menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <Icon name={menuOpen ? "close" : "menu"} size="lg" />
        </button>
      </div>
    </header>
  );
}
