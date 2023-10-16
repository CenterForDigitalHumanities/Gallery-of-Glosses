"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./DataTableColumnHeader";
import { useState } from "react";

export const columns: ColumnDef<ProcessedGloss>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Incipit" />
    ),
    cell: ({ row }) => {
      const title = row.getValue("title");

      return <div className="truncate">{title as React.ReactNode}</div>;
    },
  },
  {
    accessorKey: "targetChapter",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Target Chapter" />
    ),
  },
  {
    accessorKey: "targetVerse",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Target Verse" />
    ),
  },
  {
    accessorKey: "textValue",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Target Text" />
    ),
    cell: ({ row }) => {
      const [showMoreRows, setShowMoreRows] = useState(new Set<string>());
      const textValue: string = row.getValue("textValue");
      const isShowMore = showMoreRows.has(row.id);

      const limit = 20;
      const shortText =
        textValue.substring(0, 100) + (textValue.length > limit ? "..." : "");
      const displayText = isShowMore ? textValue : shortText;

      return (
        <div className="font-medium">
          {displayText}
          {textValue.length > limit && (
            <button
              className="text-xs hover:underline text-muted-foreground "
              onClick={() => {
                const newShowMoreRows = new Set(showMoreRows);
                if (isShowMore) {
                  newShowMoreRows.delete(row.id);
                } else {
                  newShowMoreRows.add(row.id);
                }
                setShowMoreRows(newShowMoreRows);
              }}
            >
              {isShowMore ? " Show Less" : " Show More"}
            </button>
          )}
        </div>
      );
    },
  },
];
