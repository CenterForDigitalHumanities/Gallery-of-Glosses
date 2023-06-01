import React from 'react';
import Link from 'next/link';

const Navbar = () => (
    <nav>
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/glosses">Glosses</Link>
        {/* Add more links as needed */}
    </nav>
);

export default Navbar;