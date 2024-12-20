"use client";

import * as NAV from "@/configs/navigation";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./DataTableColumnHeader";
import DataTableCell from "./DataTableCell";

function handleOpenRecordInstance(row: { original: ProcessedGloss | ProcessedManuscript | ProcessedFragment}) {
  const id = (row.original as ProcessedGloss | ProcessedManuscript | ProcessedFragment)?.targetId?.split("/id/")?.[1];
  const link = 
  (row.original.targetCollection?.includes("Gloss")) ? `${NAV.BASEPATH}/gloss/${id}` : 
  (row.original.targetCollection?.includes("Manuscript")) ? `${NAV.BASEPATH}/manuscript/${id}` :
  (row.original.targetCollection?.includes("Fragment")) ? `${NAV.BASEPATH}/witness/${id}` :
  undefined
  if(link) window.open(link, "_blank");
  return
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
          let textVal: string = row.getValue(columnObject.accessorKey) ? row.getValue(columnObject.accessorKey) : "Not Found"
          if(textVal === "Not Found"){
            return (
              <div
                className="truncate"
                onClick={() => {
                  handleOpenRecordInstance(row);
                }}
              >
                <small>Not Found</small>
              </div>
            );
          }
          return (
            <div
              className="truncate"
              onClick={() => {
                handleOpenRecordInstance(row);
              }}
            >
              {textVal as React.ReactNode}
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
          let textVal: string = row.getValue(columnObject.accessorKey) ? row.getValue(columnObject.accessorKey) : "Not Found"
          return (
            <DataTableCell textValue={textVal} rowId={row.id} />
          );
        },
      }
  });
}
