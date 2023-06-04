import React from 'react';
import Link from 'next/link';

const NavbarItem = ({label, refLink}) => {
    return (
        <Link href={refLink}>
            <div className="cursor-pointer hover:text-gray-300 transition font-semibold">
                {label}    
            </div>
        </Link>
    )
}

export default NavbarItem;
