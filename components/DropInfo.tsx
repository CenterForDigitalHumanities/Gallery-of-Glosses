"use client";

import { useState } from "react";
import { BsChevronDown } from "react-icons/bs";

interface DropInfoProps {
  children: React.ReactNode;
  title: string;
}

/**
 * The DropInfo component is a drop-down list where users can toggle the visibility of the children.
 * The title and state of the dropdown is managed within the component.
 * When the title area is clicked, the dropdown visibility state is toggled.
 * When the dropdown is visible, it shows the content inside.
 *
 * @param {React.ReactNode} children The child nodes to be rendered within the dropdown when it's visible.
 * @param {string} title The title for the dropdown, displayed permanently at the top of the component.
 * @returns A dropdown component with a title and toggleable visibility.
 */
const DropInfo: React.FC<DropInfoProps> = ({ children, title }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="dropinfo">
      <div
        onClick={() => setShowDropdown(!showDropdown)}
        className="cursor-pointer flex items-center justify-between px-6 py-4 transition-colors hover:bg-gray-50"
      >
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        <BsChevronDown
          className={`w-6 h-6 transition-transform transform ${
            showDropdown ? "rotate-180" : "rotate-0"
          } text-gray-500`}
        />
      </div>
      {showDropdown && <div className="px-6 py-4 space-y-4">{children}</div>}
    </div>
  );
};

export default DropInfo;
