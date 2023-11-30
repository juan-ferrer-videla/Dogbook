"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Nav = () => {
  const pathname = usePathname();

  return (
    <nav className="space-x-4">
      <Link href="/" className={pathname === "/" ? "text-primary" : ""}>
        Home
      </Link>
      <Link
        href="/dashboard"
        className={pathname === "/dashboard" ? "text-primary" : ""}
      >
        Dashboard
      </Link>
    </nav>
  );
};

export default Nav;
