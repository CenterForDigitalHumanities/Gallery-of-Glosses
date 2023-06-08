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
    
    /*
        If the 'visible' prop is true, the drop-down menu is rendered.

        The onMouseEnter event handler is used to persist the visibility of the AboutMenu component when the user's mouse pointer is over it.
        
        Tailwind CSS is used for styling:
        - 'transition-all' property applies the transition effect to all the properties of the element.
        - 'duration-500' property sets the duration of the transition effect to 500ms.
        - 'overflow-hidden' ensures any child elements that go outside the boundaries of this div are hidden.
        - 'bg-bg-color' sets the background color of the menu.
        - 'w-56' sets the width of the menu to approximately 14rem.
        - 'absolute' positions the menu relative to its closest positioned ancestor.
        - 'top-8' and 'right-0' position the top edge of the menu 2rem from the top of its nearest positioned ancestor and aligns the right edge with the right side of the parent.
        - 'py-5' adds padding to the top and bottom of the menu equal to 1.25rem.
        - 'flex-col' displays the child elements in a column.
        - 'border-2' and 'border-gray-800' create a 2px solid border with a gray color.
        - 'flex' is used to layout the child elements of the menu in a row (flex) format.
        - 'opacity-100' and 'opacity-0' control the transparency of the menu, depending on the 'visible' prop.
        - 'max-h-96' and 'max-h-0' control the maximum height of the menu, again depending on the 'visible' prop.
    */

    return (
        <div onMouseEnter={cancelHideMenu} className={`transition-all duration-500 overflow-hidden bg-bg-color w-56 absolute top-8 right-0 py-5 flex-col border-2 border-gray-800 flex ${visible ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0'}`}>
            <div className="flex flex-col gap-3 text-center text-sm">
                <NavbarItem label= "About this Site" refLink="/about"/>
                <NavbarItem label= "Project History" refLink="/history"/>
                <NavbarItem label= "Terminology and Abbreviations" refLink="/terminology"/>
            </div>
        </div>
    )
}

export default AboutMenu;