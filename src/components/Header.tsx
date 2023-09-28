import { FC } from "react";
import { AiFillGithub } from "react-icons/ai";
import { ThemeTogggle } from "./ThemeTogggle";
import Image from "next/image";
interface HeaderProps {}

const Header: FC<HeaderProps> = ({}) => {
  return (
    <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <a className="mr-6 flex items-center space-x-2" href="/">
            <Image src="/logo.png" alt="icon" width="20" height="20" />
            <span className="hidden font-bold sm:inline-block">
              Gallery of Glosses
            </span>
          </a>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <a
              className="transition-colors hover:text-foreground/80 text-foreground/60"
              href="/about"
            >
              About
            </a>
            <a
              className="transition-colors hover:text-foreground/80 text-foreground/60"
              href="/books"
            >
              Browse Glosses
            </a>
          </nav>
        </div>
        <div></div>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center">
            <a
              target="_blank"
              rel="noreferrer"
              href="https://github.com/CenterForDigitalHumanities/Gallery-of-Glosses"
            >
              <div className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 py-2 w-9 px-0">
                <AiFillGithub size={20} />
                <span className="sr-only">GitHub</span>
              </div>
            </a>
            <ThemeTogggle />
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
