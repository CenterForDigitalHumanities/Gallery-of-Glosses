"use client";

import { usePathname } from "next/navigation";
import { useEffect, useMemo } from "react";
import NavbarItem from "./NavbarItem";

interface NavbarProps {
  children: React.ReactNode;
}

/**
 * The Navbar component renders a navigation bar with links to different routes.
 * The active route is highlighted.
 */
const Navbar: React.FC<NavbarProps> = ({ children }) => {
  const pathname = usePathname();

  // Define routes for the Navbar. Use the pathname to determine the active route.
  const routes = useMemo(
    () => [
      {
        label: "Gallery of Glosses",
        active: pathname === "/",
        href: "/",
      },
      {
        label: "About",
        active: pathname.includes("/about"),
        href: "/about",
      },
      {
        label: "Browse Glosses",
        active: pathname === "/glosses",
        href: "/glosses",
      },
      {
        label: "Compare Glosses",
        active: pathname === "/compare",
        href: "/compare",
      },
      {
        label: "Explore Maps",
        active: pathname === "/map",
        href: "/map",
      },
    ],
    [pathname]
  );

  useEffect(() => {
    const handleOnMouseMove = (e: React.MouseEvent<HTMLElement>) => {
      const target = e.currentTarget;

      if (!(target instanceof Element)) {
        return;
      }

      const rect = target.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      target.style.setProperty("--mouse-x", `${x}px`);
      target.style.setProperty("--mouse-y", `${y}px`);
    };

    const cards = document.querySelectorAll(".main");
    cards.forEach((card) => {
      card.addEventListener("mousemove", handleOnMouseMove as any); // For some reason, it wasn't accepting MouseEvent as a typescript type
    });

    return () => {
      cards.forEach((card) => {
        card.removeEventListener("mousemove", handleOnMouseMove as any);
      });
    };
  }, []);

  const leftItems = routes.slice(0, 3);
  const rightItems = routes.slice(3);

  return (
    <div className="flex flex-col h-full w-full">
      <div
        className={`z-40 fixed hidden md:flex flex-col h-[60px] w-full p-2 transition duration-200 bg-black`}
      >
        <div className="rounded-lg h-fit w-full flex justify-between px-8">
          <div className="flex gap-8 text-center">
            {leftItems.map((item) => (
              <NavbarItem key={item.label} {...item} />
            ))}
          </div>
          <div className="flex gap-8 text-center">
            {rightItems.map((item) => (
              <NavbarItem key={item.label} {...item} />
            ))}
          </div>
        </div>
      </div>
      <main className="pt-[5vh] flex-1 bg-neutral-800">{children}</main>
    </div>
  );
};

export default Navbar;
