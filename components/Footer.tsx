"use client";

import Link from "next/link";

/**
 * The Footer component provides a static footer for your application.
 * It includes a copyright notice and a link to the source code repository.
 */
const Footer = () => (
  <footer className="w-full z-40 bottom-0 bg-black">
    <div className="py-6 text-center flex flex-col items-center">
      <p className="text-white">
        &copy; {new Date().getFullYear()}. Gallery of Glosses
      </p>
      <p className="text-white">
        This site is open source.
        <Link
          className="text-blue-500 ml-1"
          href="https://github.com/CenterForDigitalHumanities/Gallery-of-Glosses"
        >
          Improve this page
        </Link>
      </p>
    </div>
  </footer>
);

export default Footer;
