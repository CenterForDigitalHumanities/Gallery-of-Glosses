"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./DataTableColumnHeader";
import { useState } from "react";
import DataTableCell from "./DataTableCell";

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
      return (
        <DataTableCell textValue={row.getValue("textValue")} rowId={row.id} />
      );
    },
  },
];
