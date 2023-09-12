"use client";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { AiFillBook, AiFillTag } from "react-icons/ai";
import { BiBookAlt } from "react-icons/bi";
import { BsPalette, BsCardList } from "react-icons/bs";

import SidebarItem from "@/components/SidebarItem";
import Box from "@/components/Box";

// Sidebar component contains a set of navigation items
const Sidebar = () => {
  // Use the usePathname hook to get the current route
  const pathname = usePathname();

  // Initialize state for expanded menu
  const [isExpanded, setIsExpanded] = useState(false);

  // Define the routes for the sidebar
  const routes = useMemo(
    () => [
      {
        icon: BsCardList,
        label: "Show All Glosses",
        active: pathname === "/glosses",
        href: "/glosses",
      },
      {
        icon: BiBookAlt,
        label: "Browse by Book",
        active: pathname === "/glosses/book",
        href: "/glosses/book",
      },
      {
        icon: BsPalette,
        label: "Browse by Theme",
        active: pathname === "/glosses/theme",
        href: "/glosses/theme",
      },
      {
        icon: AiFillBook,
        label: "Browse by Manuscript",
        active: pathname === "/glosses/manuscript",
        href: "/glosses/manuscript",
      },
      {
        icon: AiFillTag,
        label: "Browse by Tag",
        active: pathname === "/glosses/tag",
        href: "/glosses/tag",
      },
    ],
    [pathname]
  );

  // Identify the active navigation item
  const activeItem = useMemo(
    () => routes.find((item) => item.active),
    [routes]
  );

  // Return the Sidebar component
  return (
    <div className="mt-10">
      <Box className="hidden md:flex flex-col gap-y-2 rounded-md w-full">
        <div className="flex flex-col">
          {/* If the menu is expanded, show all items. Otherwise, only show the active item. */}
          {isExpanded
            ? routes.map((item) => <SidebarItem key={item.label} {...item} />)
            : activeItem && (
                <SidebarItem
                  key={activeItem.label}
                  {...activeItem}
                  onClick={() => setIsExpanded(!isExpanded)}
                />
              )}
        </div>
      </Box>
    </div>
  );
};

// Export the Sidebar component
export default Sidebar;
