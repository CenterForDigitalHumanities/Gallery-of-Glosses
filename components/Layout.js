import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => (
<main>
	<Navbar />
        <main className="pb-40">
            <div className="pt-24 px-24">
                {children}
            </div>
        </main>
	<Footer />
</main>
);

export default Layout;