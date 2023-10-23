"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./DataTableColumnHeader";
import DataTableCell from "./DataTableCell";

function handleOpenGlossInstance(row: { original: ProcessedGloss }) {
  const id = (row.original as ProcessedGloss).targetId.split("/id/")[1];
  window.open(`/gloss/${id}`, "_blank");
}
export const columns: ColumnDef<ProcessedGloss>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Incipit" />
    ),
    cell: ({ row }) => {
      const title = row.getValue("title");

      return (
        <div
          className="truncate"
          onClick={() => {
            handleOpenGlossInstance(row);
          }}
        >
          {title as React.ReactNode}
        </div>
      );
    },
  },
  {
    accessorKey: "targetChapter",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Target Chapter" />
    ),
    cell: ({ row }) => {
      const targetChapter = row.getValue("targetChapter");

      return (
        <div
          onClick={() => {
            handleOpenGlossInstance(row);
          }}
        >
          {targetChapter as React.ReactNode}
        </div>
      );
    },
  },
  {
    accessorKey: "targetVerse",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Target Verse" />
    ),
    cell: ({ row }) => {
      const targetVerse = row.getValue("targetVerse");

      return (
        <div
          onClick={() => {
            handleOpenGlossInstance(row);
          }}
        >
          {targetVerse as React.ReactNode}
        </div>
      );
    },
  },
  {
    accessorKey: "textValue",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Target Text" />
    ),
    cell: ({ row }) => {
      return (
        <DataTableCell textValue={row.getValue("textValue")} rowId={row.id} />
      );
    },
  },
];
