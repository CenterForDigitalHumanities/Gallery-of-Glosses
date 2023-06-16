import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => (
<main>
	<Navbar />
        <main className="pb-40">
                {children}
        </main>
	<Footer />
</main>
);

export default Layout;