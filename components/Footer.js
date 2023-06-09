import React from 'react';
import Link from 'next/link';



/*
    Footer Component:
    - This component displays the footer of the page.
    - The footer includes a statement that updates to the current year and a link to the project's GitHub repository.
    
    Tailwind CSS is used for styling:
    - 'w-full': Width of the footer is set to full width of its parent container.
    - 'z-40': z-index of the footer is set to 40 to ensure it appears on top of other elements.
    - 'absolute': Positions the footer relative to the nearest ancestor (instead of default static positioning).
    - 'py-6': Adds a vertical padding of 1.5rem (6 * 0.25rem where 1rem = 16px).
    - 'text-center': Centers the text inside the div.
    - 'bg-bg-secondary-color': Sets the background color of the div.
*/

const Footer = () => (
        <footer className="w-full z-40 absolute">
            <div className="py-6 text-center bg-bg-secondary-color">
                <p>&copy; {new Date().getFullYear()} Gallery of Glosses</p>
                <p>This site is open source. <Link className="text-blue-900" href="https://github.com/CenterForDigitalHumanities/Gallery-of-Glosses">Improve this page</Link></p>
            </div>
        </footer>
);

export default Footer;
