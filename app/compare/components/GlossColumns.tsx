"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/DataTableColumnHeader";
import { Checkbox } from "@/components/ui/Checkbox";
import { Gloss } from "@/lib/Gloss";

export const GlossColumns: ColumnDef<Gloss>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("title")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => {
      return <span>{row.getValue("description")}</span>;
    },
  },
  {
    accessorKey: "targetChapter",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Target Chapter" />
    ),
    cell: ({ row }) => {
      return <span>{row.getValue("targetChapter")}</span>;
    },
  },
  {
    accessorKey: "targetVerse",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Target Verse" />
    ),
    cell: ({ row }) => {
      return <span>{row.getValue("targetVerse")}</span>;
    },
  },
  {
    accessorKey: "targetedText",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Targeted Text" />
    ),
    cell: ({ row }) => {
      return <span>{row.getValue("targetedText")}</span>;
    },
  },
  {
    accessorKey: "transcribedGloss",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Transcribed Gloss" />
    ),
    cell: ({ row }) => {
      return <span>{row.getValue("transcribedGloss")}</span>;
    },
  },
  {
    accessorKey: "notes",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Notes" />
    ),
    cell: ({ row }) => {
      return <span>{row.getValue("notes")}</span>;
    },
  },
  {
    accessorKey: "tags",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tags" />
    ),
    cell: ({ row }) => {
      const tags: any = row.getValue("tags");
      const tagsString = tags.items.join(", ");
      return <span>{tagsString}</span>;
    },
  },
];
