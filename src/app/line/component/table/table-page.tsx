// import { useGlobalStore } from '../../store';
import { useEditDataStore } from '../../edit-data-store';
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable, ColumnDef } from '@tanstack/react-table';
import { TableCell } from './table-cell';
import { TableHeader } from './table-header';
import { DraggableColumnHeader } from './dragable-column-header';
import { useRef } from 'react';
import './custom.css';
import { DeleteIcon } from 'fig-components';

const columnHelper = createColumnHelper<any>();

const defaultColumn: Partial<ColumnDef<any>> = {
  cell: TableCell,
  size: 122,
  minSize: 111,
  maxSize: Number.MAX_SAFE_INTEGER,
  enableResizing: false,
};

export default function Table() {
  const { data, columns, updateColumnLabelById, updateCellData, addRow, addColumn, removeRow } = useEditDataStore();
  const ref = useRef<HTMLDivElement>(null);

  const formattedColumns = columns.map((column: any) => {
    return columnHelper.accessor(column.id, {
      header: () => <TableHeader column={column} table={table} />,
      size: column.size,
      enableResizing: column.enableResizing,
    });
  });

  const table = useReactTable({
    data,
    defaultColumn,
    columns: formattedColumns,
    enableColumnResizing: false,
    columnResizeMode: 'onChange',
    state: {},
    getCoreRowModel: getCoreRowModel(),
    meta: {
      updateData: (rowIndex: any, columnId: any, value: any) => {
        updateCellData(rowIndex, columnId, value);
      },
      updateHeaderData: (columnId: any, value: any) => {
        updateColumnLabelById(columnId, value);
      },
    },
  });

  const rows = table.getRowModel().rows;
  const headerGroups = table.getHeaderGroups();

  return (
    <div className="flex flex-col gap-2 p-2 pt-0 pl-0">
      <div className="flex gap-2">
        <div className="max-w-full w-full max-h-[270px] overflow-auto pt-2 pl-2" ref={ref}>
          <table className="w-full" style={{ border: `1px solid var(--fig-color-border)` }}>
            <thead>
              {headerGroups.map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header, columnIndex) => {
                    const strokeLeftWeight = columnIndex === 0 ? 0 : 1;
                    const borderStyle = 'solid';
                    const canDelete = columnIndex !== 0 && headerGroup.headers.length > 2;

                    return (
                      <DraggableColumnHeader
                        key={header.id}
                        header={header}
                        table={table}
                        strokeLeftWeight={strokeLeftWeight}
                        borderStyle={borderStyle}
                        canDelete={canDelete}
                      />
                    );
                  })}
                </tr>
              ))}
            </thead>
            <tbody>
              {rows.map((row, _rowIndex) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell, cIndex) => {
                    const rowIndex = _rowIndex + 1;
                    const strokeLeftWeight = cIndex === 0 ? 0 : 1;
                    const strokeTopWeight = rowIndex === 0 ? 0 : 1;
                    const borderStyle = 'solid';

                    const canDelete = cIndex === 0 && rows.length > 1;

                    return (
                      <td
                        key={cell.id}
                        className="relative"
                        style={{
                          borderLeft: `${strokeLeftWeight}px ${borderStyle} var(--fig-color-border)`,
                          borderTop: `${strokeTopWeight}px ${borderStyle} var(--fig-color-border)`,
                        }}
                      >
                        {canDelete && (
                          <span
                            className="absolute w-8 h-8 flex justify-center items-center cursor-pointer text-transparent hover:text-[var(--fig-color-text-secondary)]"
                            style={{
                              top: '50%',
                              left: 0,
                              transform: 'translate(-50%, -50%)',
                            }}
                            onClick={() => {
                              removeRow(cell.row.id);
                            }}
                          >
                            <DeleteIcon className="w-4 h-4" />
                          </span>
                        )}
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div
          onClick={() => {
            addColumn();
            setTimeout(() => {
              ref.current?.scrollTo({ left: ref.current?.scrollWidth });
            }, 0);
          }}
          className="w-6 flex-shrink-0 flex-grow-0 bg-[var(--fig-color-bg-tertiary)] justify-center items-center flex cursor-pointer"
        >
          +
        </div>
      </div>

      <div className="flex gap-2">
        <div
          onClick={() => {
            addRow();
            setTimeout(() => {
              ref.current?.scrollTo({ top: ref.current?.scrollHeight });
            }, 0);
          }}
          className="h-6 w-full flex bg-[var(--fig-color-bg-tertiary)] justify-center items-center cursor-pointer"
        >
          +
        </div>
        <div className="w-6 h-6 flex-shrink-0 flex-grow-0" />
      </div>
    </div>
  );
}
