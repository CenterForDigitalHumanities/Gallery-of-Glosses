"use client";

import { Table } from "@tanstack/react-table";
import { X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useEffect, useState } from "react";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  filterColumn: { header: string; accessorKey: string };
}

export function DataTableToolbar<TData>({
  table,
  filterColumn,
}: DataTableToolbarProps<TData>) {
  const isFiltered =
    table.getPreFilteredRowModel().rows.length >
    table.getFilteredRowModel().rows.length;
  const [searchTerm, setSearchTerm] = useState<string | null>(
    new URLSearchParams(window.location.search).get("q"),
  );

  useEffect(() => {
    const url = new URL(window.location.href);
    if (searchTerm !== "" && searchTerm !== null) {
      url.searchParams.set("q", searchTerm);
    } else {
      url.searchParams.delete("q");
    }
    history.pushState(null, "", url.toString());
    table.getColumn(filterColumn.accessorKey)?.setFilterValue(searchTerm);
  }, [searchTerm, table, filterColumn.accessorKey]);

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder={`Filter by ${filterColumn.header}...`}
          value={searchTerm ?? ""}
          onChange={(event) => setSearchTerm(event.target.value)}
          className="h-8 w-[150px] lg:w-[250px] border border-neutral-500"
        />
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => {
              table.resetColumnFilters();
              setSearchTerm(null);
            }}
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
