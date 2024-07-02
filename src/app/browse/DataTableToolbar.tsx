"use client";

import { Table } from "@tanstack/react-table";
import { X } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  filterColumn: { header: string, accessorKey: string };
}

export function DataTableToolbar<TData>({
  table,
  filterColumn,
}: DataTableToolbarProps<TData>) {
  const isFiltered =
    table.getPreFilteredRowModel().rows.length >
    table.getFilteredRowModel().rows.length;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder={`Filter by ${filterColumn.header}...`}
          value={(table.getColumn(filterColumn.accessorKey)?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn(filterColumn.accessorKey)?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px] border border-neutral-500"
        />
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
