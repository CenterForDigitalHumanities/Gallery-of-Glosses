import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

/*
    Layout Component:
    - This component acts as a wrapper for all the pages. 
    - It includes the Navbar at the top and Footer at the bottom, allowing them to be present across all pages.
    - The {children} prop is used to display whatever is passed into the Layout component. This is useful for creating page-specific content while maintaining a consistent overall structure.
    
    Tailwind CSS is used for styling:
    - 'px-4' and 'md:px-16': Add horizontal padding of 1rem (4*0.25rem) on all screen sizes and 4rem (16*0.25rem) on medium-sized screens or larger.
    - 'pt-24': Add padding to the top equal to 6rem (24*0.25rem).
    - 'pb-96': Add padding to the bottom equal to 24rem (96*0.25rem). This large padding at the bottom may be used to accommodate a floating or absolutely positioned element.
*/

const Layout = ({ children }) => (
<main>
	<Navbar />
		<main className="px-4 md:px-16 pt-24 pb-96">{children}</main>
	<Footer />
</main>
);

export default Layout;