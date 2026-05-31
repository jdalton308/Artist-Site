"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import "./NavLink.css";

export default function NavLink({ href, children }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href} className={`nav-link ${isActive ? "nav-link--active" : ""}`}>
      {children}
    </Link>
  );
}
