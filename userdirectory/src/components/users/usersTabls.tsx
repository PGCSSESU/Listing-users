import * as React from "react";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { User } from "@/types/user";
import { Spinner } from "../ui/spinner";

type Props = {
  users: User[];
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
};

const columns: ColumnDef<User>[] = [
  {
    id: "name",
    header: "Name",
    cell: ({ row }) => {
  const u = row.original; 

  return (
    <div className="flex items-center gap-3">
      <Avatar className="h-9 w-9">
        <AvatarImage src={u.Avatar} />
        <AvatarFallback>{u.first_name?.charAt(0) || "?"}</AvatarFallback>
      </Avatar>
      <span className="font-medium">
        {u.first_name} {u.last_name}
      </span>
    </div>
  );
}
  },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "gender", header: "Gender" },
  { accessorKey: "Role", header: "Role" },
];

export function UsersTable({
  users,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: Props) {
  const parentRef = React.useRef<HTMLDivElement>(null);

  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const rows = table.getRowModel().rows;

  const rowVirtualizer = useVirtualizer({
    count: hasNextPage ? rows.length + 1 : rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 64,
    overscan: 6,
  });

  const virtualItems = rowVirtualizer.getVirtualItems();

  React.useEffect(() => {
    const lastVirtualRow = virtualItems[virtualItems.length - 1];

    if (
      !lastVirtualRow ||
      !hasNextPage ||
      isFetchingNextPage
    ) {
      return;
    }

    if (lastVirtualRow.index >= rows.length - 1) {
      fetchNextPage();
    }
  }, [
    virtualItems,
    rows.length,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  ]);

  return (
    <div className="rounded-xl border bg-background">
      {/* Header */}
      <div className="grid grid-cols-[2fr_2fr_1fr_1fr] border-b px-4 py-3 text-sm font-semibold">
        {table.getHeaderGroups().map((hg) =>
          hg.headers.map((h) => (
            <div key={h.id}>
              {flexRender(h.column.columnDef.header, h.getContext())}
            </div>
          ))
        )}
      </div>

      {/* Body */}
      <div ref={parentRef} className="h-[65vh] overflow-auto relative">
        <div style={{ height: rowVirtualizer.getTotalSize() }}>
          {virtualItems.map((vRow) => {
            const isLoaderRow = vRow.index > rows.length - 1;
            const row = rows[vRow.index];

            return (
              <div
                key={vRow.key}
                className="absolute w-full grid grid-cols-[2fr_2fr_1fr_1fr] px-4 border-b"
                style={{
                  height: vRow.size,
                  transform: `translateY(${vRow.start}px)`,
                }}
              >
                {isLoaderRow ? (
                  <div className="col-span-4 flex justify-center py-4">
                    <Spinner />
                  </div>
                ) : (
                  row.getVisibleCells().map((cell) => (
                    <div key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </div>
                  ))
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
