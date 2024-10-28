"use client";
import { FC, useState } from "react";
import { AiFillGithub, AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { PiCaretRightBold } from "react-icons/pi";
import { ThemeTogggle } from "./ThemeTogggle";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  BROWSE_GLOSSES_LINKS,
  GETTING_STARTED_LINKS,
  GLOSS_TOOLS_LINKS,
} from "@/configs/navigation";

interface HeaderProps {}

const Header: FC<HeaderProps> = ({}) => {
  const pathname = usePathname();
  const split_pathname = pathname.split("/");
  const section = CapitalizeFirstLetter(split_pathname[1]);
  const topic = CapitalizeFirstLetter(split_pathname[2]);

  const [openMenu, setOpenMenu] = useState(false);

  function CapitalizeFirstLetter(topic: string) {
    if (topic) return topic.charAt(0).toUpperCase() + topic.slice(1);
    else return "";
  }

  return (
    <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <a className="mr-6 flex items-center space-x-2" href="/">
            <Image
              src="/Gallery-of-Glosses/assets/images/logo.png"
              alt="icon"
              width="20"
              height="20"
            />
            <span className="hidden font-bold sm:inline-block">
              Gallery of Glosses
            </span>
          </a>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <a
              className="transition-colors hover:text-foreground/80 text-foreground/60"
              href="/docs/about"
            >
              About
            </a>
            <a
              className="transition-colors hover:text-foreground/80 text-foreground/60"
              href="/browse"
            >
              Browse Glosses
            </a>
          </nav>
        </div>

        <div className="flex flex-1 items-center space-x-2 justify-between md:justify-end">
          <div className="flex items-center mr-4 border-b border-slate-900/10 md:hidden dark:border-slate-50/[0.06]">
            <button
              onClick={() => setOpenMenu(true)}
              className="text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300"
            >
              <AiOutlineMenu />
            </button>
            {pathname != "/" && (
              <ol className="ml-4 flex text-sm leading-6 whitespace-nowrap min-w-0 items-center gap-2">
                <li>{section}</li>

                {["Document", "Tag", "Theme"].includes(topic) && (
                  <>
                    <PiCaretRightBold />
                    <li className="font-semibold text-slate-900 truncate dark:text-slate-200">
                      {topic}
                    </li>
                  </>
                )}
              </ol>
            )}
          </div>
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
      {openMenu && (
        <>
          <div
            data-state="open"
            className="pointer-events-auto fixed h-screen w-screen gap-4 bg-black opacity-40 p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500 inset-y-0 left-0 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm pr-0"
          >
            test
          </div>
          <div
            data-state="open"
            className="pointer-events-auto fixed h-screen gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500 inset-y-0 left-0 w-4/5 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm pr-0"
          >
            <div className="flex items-center gap-4 ">
              <a href="/">
                <Image
                  src="/Gallery-of-Glosses/assets/images/logo.png"
                  alt="icon"
                  width="20"
                  height="20"
                />
              </a>

              <a href="/" className="font-bold right-4 top-6">
                Gallery of Glosses
              </a>
              <button
                onClick={() => setOpenMenu(false)}
                className="ml-auto mr-4 rounded-sm opacity-70 transition-opacity"
              >
                <AiOutlineClose />
              </button>
            </div>
            <div className="relative overflow-hidden my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
              {[
                { header: "Introduction", items: GETTING_STARTED_LINKS },
                { header: "Browse Glosses", items: BROWSE_GLOSSES_LINKS },
                { header: "Gloss Tools", items: GLOSS_TOOLS_LINKS },
              ].map((section) => (
                <div className="pb-4" key={section.header}>
                  <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold">
                    {section.header}
                  </h4>
                  <div className="grid grid-flow-row auto-rows-max text-sm">
                    {section.items.map((item) => (
                      <a
                        key={item.href}
                        className="group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:underline text-muted-foreground"
                        href={item.href}
                      >
                        {item.title}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
