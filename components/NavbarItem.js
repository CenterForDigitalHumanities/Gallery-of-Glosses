import React from 'react';
import Link from 'next/link';

/*
    NavbarItem Component:
    - This is a reusable component for creating items in the Navbar.
    - Each NavbarItem is a clickable element (Link from 'next/link') that navigates to the specified 'refLink' when clicked.
    - The 'label' prop specifies the text that is displayed for each NavbarItem.
 
    Tailwind CSS is used for styling:
    - 'cursor-pointer' changes the cursor to a pointer on hover, indicating that the item is clickable.
    - 'hover:text-gray-300' changes the text color to light gray when the item is hovered over.
    - 'transition' and 'font-semibold' apply a smooth transition effect to the color change and make the text bold, respectively.
*/

const NavbarItem = ({ label, refLink}) => {
	return (
		<Link href={refLink}>
			<div className="cursor-pointer hover:text-gray-300 transition font-semibold">
				{label}    
			</div>
		</Link>
	)
}

export default NavbarItem;
