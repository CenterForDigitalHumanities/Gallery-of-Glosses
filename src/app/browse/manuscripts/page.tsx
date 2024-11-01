import { FC } from "react";
import * as NAV from "@/configs/navigation";

interface SoonProps {}

const Soon: FC<SoonProps> = ({}) => {
  return (
    <>
      <div className="mb-4 flex items-center space-x-1 text-sm text-muted-foreground"></div>
      <div className="space-y-2">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">SOON</h1>
      </div>
    </>
  );
};

export default Soon;