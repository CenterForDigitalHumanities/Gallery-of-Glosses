import { useEffect, useState } from 'react';
import NavbarItem from './navbar-item'
import Link from 'next/link';

const TOP_OFFSET = 66;

const Navbar = () => {

    const [showBackground, setShowBackground] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= TOP_OFFSET) {
                setShowBackground(true);
            } else {
                setShowBackground(false);
            }
        }

        window.addEventListener('scroll', handleScroll);
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }

    }, []);

    return (
        <nav className="w-full fixed z-40">
            <div className={`px-4 md:px-16 flex flex-row items-center transition duration-300 ${showBackground ? 'bg-bg-secondary-color' : ''}`}>
                <Link href="/">
                    <img className="h-17 lg:h-20 -translate-y-2 cursor-pointer" src="/images/glosses-logo.png" alt="Logo"/>
                </Link>
                <div className="flex-row ml-8 gap-7 hidden lg:flex">
                    <NavbarItem label= "Home" refLink="/"/>
                    <NavbarItem label= "About" refLink="/about"/>
                    <NavbarItem label= "Resources" refLink="/resources"/>
                    <NavbarItem label= "Goal" refLink="/goals"/>
                    <NavbarItem label= "Explore Glosses" refLink="/glosses"/>
                </div>            
                <div className="flex flex-row ml-auto gap-7 items-center">
                </div>
            </div>
        </nav>

    )
};

export default Navbar;