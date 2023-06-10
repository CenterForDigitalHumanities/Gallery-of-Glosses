import React from 'react';
import NavbarItem from './NavbarItem';

// AboutMenu is a drop-down component used in the application's navigation bar
const AboutMenu = ({visible, cancelHideMenu}) => {

    /*
        If the 'visible' prop is not set to true, the component is not rendered.
        This mechanism allows us to show and hide the drop-down menu based on user interaction.
    */
    if (!visible) {
        return null;
    }

    return (
        <div onMouseEnter={cancelHideMenu} className={`transition-all duration-1000 overflow-hidden bg-bg-color w-56 absolute top-8 right-0 py-5 flex-col border-2 border-gray-800 flex ${visible ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0'}`}>
            <div className="flex flex-col gap-3 text-center text-sm">
                <NavbarItem label= "About this Site" refLink="/about"/>
                <NavbarItem label= "Project History" refLink="/history"/>
                <NavbarItem label= "Terminology and Abbreviations" refLink="/terminology"/>
            </div>
        </div>
    )
}

export default AboutMenu;