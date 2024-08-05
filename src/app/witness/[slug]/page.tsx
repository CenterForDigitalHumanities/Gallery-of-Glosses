"use client";

import { RERUM } from "@/configs/rerum-links";
import { useWitnessInstance } from "@/hooks/useWitnessInstance";
import { usePathname } from "next/navigation";

const WitnessInstance = () => {
  const pathname = usePathname();

  const targetId = RERUM + pathname.split("/witness/")[1];
  const witness = useWitnessInstance(targetId);

  const blurredStyles = "filter blur-md opacity-50";

  return (
    <div>
      <div className="text-foreground p-4 md:p-8">
        <h1 className={`text-2xl font-bold mb-4 ${!witness && blurredStyles}`}>
          {witness ? witness.identifier : "Not found"}
        </h1>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-8"></div>
      </div>
    </div>
  );
};

export default WitnessInstance;
