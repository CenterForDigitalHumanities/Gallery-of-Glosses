"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./DataTableColumnHeader";
import DataTableCell from "./DataTableCell";

function handleOpenLink(row: { original: any }, baseUrl: string) {
  const id = row.original.targetId.split("/id/")[1];
  window.open(`${baseUrl}/${id}`, "_blank");
}

/**
 * Creates an array of columns for a data table.
 * @param columnsList - An array of objects representing basic column information.
 * @param baseUrl - The base of the URL for links in the column.
 * @returns An array of columns.
 */
export function make_columns(
  columnsList: {
    header: string;
    accessorKey: string;
    expandable: boolean;
    linked: boolean;
  }[],
  baseUrl: string,
): ColumnDef<any>[] {
  return columnsList.map((columnObject) => {
    if (!columnObject.expandable)
      return {
        accessorKey: columnObject.accessorKey,
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title={columnObject.header} />
        ),
        cell: ({ row }) => {
          const title = row.getValue(columnObject.accessorKey);

          return columnObject.linked ? (
            <div
              className="truncate text-blue-500 hover:underline cursor-pointer"
              onClick={() => {
                if (columnObject.linked) handleOpenLink(row, baseUrl);
              }}
            >
              {title as React.ReactNode}
            </div>
          ) : (
            <div className="truncate">{title as React.ReactNode}</div>
          );
        },
      };
    else
      return {
        accessorKey: columnObject.accessorKey,
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title={columnObject.header} />
        ),
        cell: ({ row }) => {
          return (
            <DataTableCell
              textValue={row.getValue(columnObject.accessorKey)}
              rowId={row.id}
            />
          );
        },
      };
  });
}
