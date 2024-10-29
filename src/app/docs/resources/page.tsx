import { RESOURCES_CONTENT } from "@/configs/docs";
import { FC } from "react";

interface ResourceProps {}

const Resource: FC<ResourceProps> = ({}) => {
  return (
    <>
      <div className="mb-4 flex items-center space-x-1 text-sm text-muted-foreground"></div>
      <div className="space-y-2">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
          Resources
        </h1>
      </div>
      <div className="pb-12 pt-8">
        <div className="flex flex-col gap-10">
          {RESOURCES_CONTENT.map((content, index) => (
            <div key={index}>
              <h2 className="font-medium">{content.title}</h2>
              <hr className="text-muted-foreground" />
              <p className="leading-7 mt-2 text-muted-foreground"
              dangerouslySetInnerHTML={ {__html:content.summary}}>
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Resource;
