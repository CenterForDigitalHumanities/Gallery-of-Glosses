import { useEffect, useState, useCallback } from 'react';
import { BsChevronDown } from 'react-icons/bs';
import NavbarItem from './NavbarItem';
import Link from 'next/link';
import AboutMenu from './AboutMenu';

// A constant at which the navbar becomes non-transparent after the user has scrolled further down
const TOP_OFFSET = 66;

const Navbar = () => {
	const [showBackground, setShowBackground] = useState(false);
	const [showAboutMenu, setShowAboutMenu] = useState(false);
	const [timeoutId, setTimeoutId] = useState(null);
    
	const showMenu = () => {
		setShowAboutMenu(true);
	};

    // After 200 ms, it closes the about menu if the user doesn't hover their mouse over the 
	const hideMenu = () => {
		let id = setTimeout(() => {
			setShowAboutMenu(false);
		}, 200); 
	
		setTimeoutId(id);
	};

	const cancelHideMenu = () => {
		clearTimeout(timeoutId);
	};

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
                    <div className="flex items-center h-14">
                        <h1 className="text-4xl">Gallery-Of-Glosses</h1>
                    </div>
                </Link>
				<div className="flex-row ml-8 gap-7 hidden lg:flex">
						<NavbarItem label= "Home" refLink="/"/>	
						<div onMouseEnter={showMenu} onMouseLeave={hideMenu} className="flex flex-row gap-2 relative">
							<h className="font-semibold">About</h>
							<BsChevronDown className= {`transition ${showAboutMenu ? 'rotate-180' : 'rotate-0'}`}/>
							<AboutMenu visible={showAboutMenu} cancelHideMenu={cancelHideMenu}/>
						</div>
						<NavbarItem label= "Resources" refLink="/resources"/>
						<NavbarItem label= "Explore Glosses" refLink="/glosses"/>
				</div>
				<div className="ml-auto hidden lg:flex gap-7">
                    <NavbarItem label= "Compare Glosses" refLink="/compare"/>
					<NavbarItem label= "Explore Maps" refLink="/map"/>
				</div>
			</div>
		</nav>
	)
};

export default Navbar;