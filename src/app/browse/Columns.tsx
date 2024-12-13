"use client";

import * as NAV from "@/configs/navigation";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./DataTableColumnHeader";
import DataTableCell from "./DataTableCell";

function handleOpenRecordInstance(row: { original: ProcessedGloss | ProcessedManuscript }) {
  const id = (row.original as ProcessedGloss | ProcessedManuscript)?.targetId?.split("/id/")?.[1];
  const link = (row.original.targetCollection.includes("Gloss")) ? `${NAV.BASEPATH}/gloss/${id}` : `${NAV.BASEPATH}/manuscript/${id}`;
  window.open(link, "_blank");
}

/**
 * Creates an array of columns for a data table.
 * @param columnsList - An array of objects representing basic column information.
 * @returns An array of columns.
 */
export function make_columns(columnsList: { header: string, accessorKey: string, expandable: boolean }[]): ColumnDef<ProcessedGloss | ProcessedManuscript>[] {
  return columnsList.map((columnObject) => {
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
                handleOpenRecordInstance(row);
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
