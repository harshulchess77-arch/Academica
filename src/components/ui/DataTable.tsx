import { cn } from '@/lib/utils'
import { HTMLAttributes } from 'react'

interface Column<T> {
  key: keyof T
  header: string
  render?: (value: T[keyof T], row: T) => React.ReactNode
}

interface DataTableProps<T> extends HTMLAttributes<HTMLTableElement> {
  data: T[]
  columns: Column<T>[]
  isLoading?: boolean
  emptyMessage?: string
}

export default function DataTable<T extends Record<string, unknown>>({
  data,
  columns,
  isLoading = false,
  emptyMessage = 'No data available',
  className,
  ...props
}: DataTableProps<T>) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-12 bg-cloud-grey-200 rounded-lg dark:bg-white/10 animate-pulse" />
        ))}
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <div className="text-center py-8 text-cloud-grey-600 dark:text-text-secondary-dark">
        {emptyMessage}
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className={cn('w-full', className)} {...props}>
        <thead>
          <tr className="border-b border-cloud-grey-200 dark:border-white/10">
            {columns.map((column) => (
              <th
                key={String(column.key)}
                className="px-4 py-3 text-left text-sm font-medium text-cobalt-900 dark:text-text-primary-dark"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="border-b border-cloud-grey-100 dark:border-white/5 hover:bg-cloud-grey-50 dark:hover:bg-white/5 transition-colors"
            >
              {columns.map((column) => (
                <td key={String(column.key)} className="px-4 py-3 text-sm text-cobalt-900 dark:text-text-primary-dark">
                  {column.render ? column.render(row[column.key], row) : String(row[column.key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
