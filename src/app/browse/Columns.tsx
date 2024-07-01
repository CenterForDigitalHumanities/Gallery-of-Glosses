"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./DataTableColumnHeader";
import DataTableCell from "./DataTableCell";

function handleOpenGlossInstance(row: { original: ProcessedGloss }) {
  const id = (row.original as ProcessedGloss).targetId.split("/id/")[1];
  window.open(`/gloss/${id}`, "_blank");
}

export function make_columns(columnsList: { header: string, accessorKey: string, expandable: boolean }[]) {
  return columnsList.map((columnObject: any) => {
    if (!columnObject.expandable)
      return {
        accessorKey: columnObject.accessorKey,
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title={columnObject.header} />
        ),
        cell: ({ row }) => {
          const title = row.getValue(columnObject.accessorKey);

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
      }
    else
      return {
        accessorKey: columnObject.accessorKey,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={columnObject.header} />
    ),
        cell: ({ row }) => {
      return (
        <DataTableCell textValue={row.getValue(columnObject.accessorKey)} rowId={row.id} />
      );
    },
      }
  });
}
