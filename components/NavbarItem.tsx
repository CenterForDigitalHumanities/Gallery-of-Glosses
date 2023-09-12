import Link from "next/link";
import { twMerge } from "tailwind-merge";
import "@/../app/globals.css";

interface NavbarItemProps {
  label: string;
  active?: boolean;
  href: string;
}

/**
 * The NavbarItem component represents a single item on the Navbar.
 * It receives label, active state, and href as props to render a Link.
 * The Link component is used to create a link to the provided href.
 */
const NavbarItem: React.FC<NavbarItemProps> = ({ label, active, href }) => {
  return (
    <Link
      href={href}
      className={twMerge(
        "flex flex-row h-auto items-center w-full gap-x-4 text-2xl font-medium cursor-pointer hover:text-white transition text-neutral-400 py-1 hover-underline-animation",
        active && "text-white"
      )}
      passHref
    >
      <p className="truncate w-full">{label}</p>
    </Link>
  );
};

export default NavbarItem;
