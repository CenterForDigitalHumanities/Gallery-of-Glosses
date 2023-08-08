"use client";

import Box from "@/components/Box";
import { BounceLoader } from "react-spinners";

const Loading = () => {
  return (
    <Box className="min-h-screen flex items-center justify-center">
      <BounceLoader size={40} />
    </Box>
  );
};

export default Loading;
