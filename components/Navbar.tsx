"use client";

import Link from "next/link";
import Image from "next/image";
import posthog from "posthog-js";

const Navbar = () => {
  const handleNavClick = (destination: string) => {
    posthog.capture("nav_link_clicked", { destination });
  };

  return (
    <header>
      <nav>
        <Link href="/" className="logo" onClick={() => handleNavClick("/")}>
          <Image src="/icons/logo.png" alt="logo" width={24} height={24} />
          <p>Dev Event Hub</p>
        </Link>
        <ul>
            <Link href="/home" onClick={() => handleNavClick("/home")}>Home</Link>
            <Link href="/events" onClick={() => handleNavClick("/events")}>Events</Link>
            <Link href="/create-event" onClick={() => handleNavClick("/create-event")}>Create Event</Link>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;