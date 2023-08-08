"use client";

import * as React from "react";
import { DataTablePagination } from "./DataTablePagination";
import { DataTableToolbar } from "./DataTableToolbar";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/Table";
import { toast } from "react-hot-toast";
import { getTargetIdByValue } from "@/services";
import { useRouter } from "next/navigation";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  setSelectedRows?: any;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  setSelectedRows,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [hasRowSelectionChanged, setHasRowSelectionChanged] =
    React.useState(false);

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const router = useRouter();
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  const getFilteredSelectedRowModel = table.getFilteredSelectedRowModel();

  React.useEffect(() => {
    const selectedRowModel = table.getFilteredSelectedRowModel();
    if (setSelectedRows) {
      setSelectedRows(selectedRowModel);
    }
  }, [table, setSelectedRows, getFilteredSelectedRowModel]);

  const handleGlossClicked = (row: any) => {
    if (hasRowSelectionChanged) {
      setHasRowSelectionChanged(false);
    } else {
      toast.success("Opening Gloss in another tab... Please wait");

      getTargetIdByValue("title", row.original.title)
        .then((targetId) => {
          // Store manuscript data in session storage
          sessionStorage.setItem("glossData", JSON.stringify(row.original));

          // navigate to the new page with the target id as a parameter
          router.push(`/gloss/${targetId}`);
        })
        .catch((error) => {
          console.error("Error getting target id:", error);
        });
    }
  };

  React.useEffect(() => {
    setHasRowSelectionChanged(true);
  }, [rowSelection]);

  return (
    <div className="space-y-4">
      <DataTableToolbar table={table} />
      <div className="rounded-md border border-neutral-500 bg-neutral-200 overflow-auto h-[57vh]">
        <Table>
          <TableHeader className="rounded-md ">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  className="cursor-pointer hover:bg-neutral-300/80"
                  onClick={() => handleGlossClicked(row)}
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell className="text-center" key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
