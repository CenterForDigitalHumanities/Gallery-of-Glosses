import { FC } from "react";
import * as NAV from "@/configs/navigation";

interface BrowseProps {}

const Browse: FC<BrowseProps> = ({}) => {
  return (
    <>
      <div className="mb-4 flex items-center space-x-1 text-sm text-muted-foreground"></div>
      <div className="space-y-2">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Browsing Options</h1>
      </div>
      <div className="pb-12 pt-8">
        <div className="flex flex-col gap-10">
          <a href={`${NAV.BASEPATH}/browse/glosses`}>Browse Glosses</a>
          <a href={`${NAV.BASEPATH}/browse/manuscripts`}>Browse Manuscripts</a>
        </div>
      </div>
    </>
  );
};

export default Browse;