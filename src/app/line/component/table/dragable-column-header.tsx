import { flexRender, ColumnOrderState, Header, Table } from '@tanstack/react-table';
import { DeleteIcon } from 'fig-components';
import { useEditDataStore } from '../../edit-data-store';

interface DraggableColumnHeaderProps {
  header: Header<any, unknown>;
  table: Table<any>;
  borderStyle: string;
  strokeLeftWeight: number;
  canDelete: boolean;
}

export function DraggableColumnHeader(props: DraggableColumnHeaderProps) {
  const { header, table, strokeLeftWeight, borderStyle, canDelete } = props;
  const { getState } = table;
  const { columnOrder } = getState();
  const { removeColumn } = useEditDataStore();

  return (
    <th
      colSpan={header.colSpan}
      style={{
        borderLeft: `${strokeLeftWeight}px ${borderStyle} var(--fig-color-border)`,
        position: 'relative',
        width: header.getSize(),
        minWidth: 100,
      }}
    >
      {canDelete && (
        <div
          className="absolute w-8 h-8 flex justify-center items-center cursor-pointer text-transparent hover:text-[var(--fig-color-text-secondary)]"
          style={{
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
          onClick={() => {
            removeColumn(header.column.id);
          }}
        >
          <DeleteIcon className="w-4 h-4" />
        </div>
      )}

      <div className="relative py-2 px-3">
        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
        {header.column.getCanResize() && (
          <div
            onMouseDown={header.getResizeHandler()}
            onTouchStart={header.getResizeHandler()}
            className={`resizer ${header.column.getIsResizing() ? 'isResizing' : ''}`}
          ></div>
        )}
      </div>
    </th>
  );
}
