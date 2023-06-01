import React from 'react';
import Link from 'next/link';

const Footer = () => (
    <footer w-full fixed z-40>
        <div className="px-4 md:px-16 py-6 text-center bg-bg-secondary-color">
            <p>&copy; {new Date().getFullYear()} Gallery of Glosses</p>
            <p>This site is open source. <Link className="text-blue-900" href="https://github.com/CenterForDigitalHumanities/Gallery-of-Glosses">Improve this page</Link></p>
        </div>
    </footer>
);

export default Footer;
