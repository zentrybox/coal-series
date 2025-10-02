import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../lib/cn";

export interface DataTableColumn<T> {
  key: keyof T | string;
  header: ReactNode;
  render?: (row: T) => ReactNode;
  align?: "left" | "center" | "right";
  className?: string;
}

export interface DataTableProps<T> extends Omit<HTMLAttributes<HTMLTableElement>, "children"> {
  columns: DataTableColumn<T>[];
  data: T[];
  getRowId?: (row: T, index: number) => string;
  caption?: ReactNode;
  emptyState?: ReactNode;
}

export function DataTable<T>({
  columns,
  data,
  className,
  getRowId,
  caption,
  emptyState,
  ...props
}: DataTableProps<T>) {
  return (
    <table
      className={cn(
        "min-w-full border-separate text-left text-body text-coal-text-primary",
        className,
      )}
      cellPadding={0}
      cellSpacing={0}
      {...props}
    >
      {caption && (
        <caption className="px-6 pb-4 text-left text-body-sm text-coal-text-muted">
          {caption}
        </caption>
      )}
      <thead>
        <tr className="border-b border-coal-border text-body-sm uppercase tracking-[0.2em] text-coal-text-muted">
          {columns.map((column) => (
            <th
              key={String(column.key)}
              className={cn("px-6 py-3 font-semibold", alignClass(column.align), column.className)}
              scope="col"
            >
              {column.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.length === 0 && (
          <tr>
            <td className="px-6 py-8 text-center text-body text-coal-text-secondary" colSpan={columns.length}>
              {emptyState ?? "No entries yet"}
            </td>
          </tr>
        )}
        {data.map((row, index) => {
          const rowId = getRowId?.(row, index) ?? String(index);
          return (
            <tr
              key={rowId}
              className="border-b border-coal-border/60 transition duration-150 hover:bg-white/05"
            >
              {columns.map((column) => {
                const fallback = (row as Record<string, unknown>)[
                  column.key as string
                ];
                const content = column.render ? column.render(row) : (fallback as ReactNode);

                return (
                  <td
                    key={`${rowId}-${String(column.key)}`}
                    className={cn("px-6 py-4 align-middle", alignClass(column.align), column.className)}
                  >
                    {content ?? null}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

function alignClass(align: DataTableColumn<unknown>["align"]): string {
  switch (align) {
    case "center":
      return "text-center";
    case "right":
      return "text-right";
    default:
      return "text-left";
  }
}
