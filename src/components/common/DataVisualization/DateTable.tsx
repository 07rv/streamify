"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  ChevronDown,
  Download,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDateTimeRangeStore, useSongStore } from "@/store/store";

import { generateDummySongs } from "@/store/action";

export type Song = {
  id: string;
  stream: number;
  songName: string;
  artist: string;
  dateStreamed: string;
};

export const columns: ColumnDef<Song>[] = [
  {
    accessorKey: "songName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="ml-1"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Song Name
          {column.getIsSorted() == false ? (
            <ArrowUpDown />
          ) : column.getIsSorted() == "asc" ? (
            <ArrowUp />
          ) : (
            <ArrowDown />
          )}
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize ml-5">{row.getValue("songName")}</div>
    ),
  },
  {
    accessorKey: "artist",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="ml-1"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Artist
          {column.getIsSorted() == false ? (
            <ArrowUpDown />
          ) : column.getIsSorted() == "asc" ? (
            <ArrowUp />
          ) : (
            <ArrowDown />
          )}
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize ml-5">{row.getValue("artist")}</div>
    ),
  },
  {
    accessorKey: "stream",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="ml-1"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Stream
          {column.getIsSorted() == false ? (
            <ArrowUpDown />
          ) : column.getIsSorted() == "asc" ? (
            <ArrowUp />
          ) : (
            <ArrowDown />
          )}
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize ml-5">{row.getValue("stream")}</div>
    ),
  },
  {
    accessorKey: "dateStreamed",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="ml-1"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Streamed
          {column.getIsSorted() == false ? (
            <ArrowUpDown />
          ) : column.getIsSorted() == "asc" ? (
            <ArrowUp />
          ) : (
            <ArrowDown />
          )}
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize ml-5">{row.getValue("dateStreamed")}</div>
    ),
  },
];

const DateTable = () => {
  const { state } = useSongStore();
  const data = state.songs;
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const { state: dateTimeRange } = useDateTimeRangeStore();
  React.useEffect(() => {
    generateDummySongs();
  }, [dateTimeRange.endDate, dateTimeRange.startDate]);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    initialState: {
      pagination: {
        pageSize: 6,
      },
    },
  });

  const downloadData = async () => {
    window.alert("Data Download from the api");
  };
  return (
    <Card className="col-span-4 md:col-span-3">
      <CardHeader className="flex">
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <CardTitle>Recent Songs</CardTitle>
            <CardDescription>Total: {data.length}</CardDescription>
          </div>
          <Button
            onClick={() => downloadData()}
            variant="outline"
            className="ml-auto m-2"
          >
            Export <Download />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="w-full">
          <div className="flex items-center py-2">
            <Input
              placeholder="Filter songs..."
              value={
                (table.getColumn("songName")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("songName")?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto m-2">
                  Columns <ChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
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
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
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
          <div className="flex items-center justify-end space-x-2 py-4">
            <div className="space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DateTable;
