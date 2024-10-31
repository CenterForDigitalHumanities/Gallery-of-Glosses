import { ACKNOWLEDGEMENTS_CONTENT } from "@/configs/docs";
import * as NAV from "@/configs/navigation";
import { FC } from "react";
import Image from "next/image";

interface AcknowledgementsProps {}

const Acknowledgements: FC<AcknowledgementsProps> = ({}) => {
  return (
    <>
      <div className="mb-4 flex items-center space-x-1 text-sm text-muted-foreground"></div>
      <div className="space-y-2">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
          Acknowledgements
        </h1>
        <p className="text-lg text-muted-foreground">
          <span className="inline-block align-top no-underline">
            Contributors of Gallery of Glosses
          </span>
        </p>
      </div>
      <div className="pb-12 pt-8">
        <div className="flex flex-col gap-10">
          {ACKNOWLEDGEMENTS_CONTENT.map((content, index) => (
            <div key={index}>
            <h2 className="font-medium">{content.title}</h2>
            <hr className="text-muted-foreground" />
            <p className="leading-7 mt-2 text-muted-foreground" dangerouslySetInnerHTML={ {__html: content.summary} }>
            </p>
          </div>
          ))}
        </div>
        <div className="flex gap-10">
          <div className="flex-col">
          <Image
            className="dark:hidden"
            src={`${NAV.BASEPATH}/assets/images/slu-primary-blue-rgb.png`}
            alt="SLU logo"
            width={400}
            height={400}
          />
          <Image
            className="dark:block hidden"
            src={`${NAV.BASEPATH}/assets/images/slu-primary-white-rgb.png`}
            alt="SLU logo"
            width={400}
            height={400}
          />
          </div>
          <div className="flex-col">
          <Image
            className="dark:hidden"
            src={`${NAV.BASEPATH}/assets/images/NEH-seal.jpg`}
            alt="NEH logo"
            width={400}
            height={400}
          />
          <Image
            className="dark:block hidden"
            src={`${NAV.BASEPATH}/assets/images/NEH-dark.png`}
            alt="NEH logo"
            width={400}
            height={400}
          />
          </div>
        </div>
      </div>
    </>
  );
};

export default Acknowledgements;
