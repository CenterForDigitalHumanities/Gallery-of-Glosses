import React from 'react';
import Link from 'next/link';

const Footer = () => (
        <footer className="w-full z-40 bottom-0">
            <div className="mt-44 py-6 text-center bg-bg-secondary-color">
                <p>&copy; {new Date().getFullYear()} Gallery of Glosses</p>
                <p>This site is open source. <Link className="text-blue-900" href="https://github.com/CenterForDigitalHumanities/Gallery-of-Glosses">Improve this page</Link></p>
            </div>
        </footer>
);

export default Footer;
