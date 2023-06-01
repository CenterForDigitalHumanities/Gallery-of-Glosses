import React from 'react';
import Navbar from './navbar';
import Footer from './footer';

const Layout = ({ children }) => (
    <main>
        <Navbar />
        <main>{children}</main>
        <Footer />
    </main>
);

export default Layout;
