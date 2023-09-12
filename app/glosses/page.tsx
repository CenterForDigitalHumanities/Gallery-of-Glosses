"use client";

import { GlossColumns } from "./components/GlossColumns";
import { DataTable } from "@/components/DataTable";
import Sidebar from "./components/Sidebar";
import { useFetchedGlosses } from "@/hooks/useFetchedGlosses";
import Box from "@/components/Box";
import LoadingBox from "@/components/LoadingBox";

/**
 * Glosses content.
 * This page is used to display a list of glosses fetched from rerum.
 * It uses the `useState` and `useEffect` hooks to fetch and store the glosses data.
 *
 * @returns {React.ReactElement} A JSX element representing the Glosses component.
 */
export default function Glosses() {
  const { glosses, isLoading } = useFetchedGlosses(
    "Glossing-Matthew-Named-Glosses"
  );

  return (
    <div className="flex gap-4 p-8">
      <Box className="h-[77vh] rounded-md p-8 overflow-auto flex gap-4 w-full">
        <div className="w-[75%] bg-gray-100 p-4 rounded-md">
          <DataTable columns={GlossColumns} data={glosses} />
        </div>
        <div className="w-[25%] bg-gray-100 p-4 rounded-md">
          <Sidebar />

          {isLoading && <LoadingBox label="Glosses" />}
        </div>
      </Box>
    </div>
  );
}
