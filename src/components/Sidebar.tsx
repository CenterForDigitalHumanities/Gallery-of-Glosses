import { FC } from "react";
import { GETTING_STARTED, BROWSE_GLOSSES, GLOSS_TOOLS } from "../config";

interface SidebarProps {}

const Sidebar: FC<SidebarProps> = ({}) => {
  return (
    <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
      <div className="relative overflow-hidden h-full py-6 pl-8 pr-6 lg:py-8">
        <div
          data-radix-scroll-area-viewport=""
          className="h-full w-full rounded-[inherit] "
        >
          <div style={{ minWidth: "100%", display: "table" }}>
            <div className="w-full">
              <div>
                {[
                  { header: "Introduction", items: GETTING_STARTED },
                  { header: "Browse Glosses", items: BROWSE_GLOSSES },
                  { header: "Gloss Tools", items: GLOSS_TOOLS },
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
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
