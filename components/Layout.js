import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => (
<main>
	<Navbar />
		<main className="px-4 md:px-16 pt-24 pb-96">{children}</main>
	<Footer />
</main>
);

export default Layout;