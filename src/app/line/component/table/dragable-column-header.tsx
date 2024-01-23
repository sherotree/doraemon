import { flexRender, ColumnOrderState, Header, Table, Column } from '@tanstack/react-table';
import { useDrag, useDrop } from 'react-dnd';

const reorderColumn = (draggedColumnId: string, targetColumnId: string, columnOrder: string[]): ColumnOrderState => {
  columnOrder.splice(
    columnOrder.indexOf(targetColumnId),
    0,
    columnOrder.splice(columnOrder.indexOf(draggedColumnId), 1)[0] as string,
  );
  return [...columnOrder];
};

interface DraggableColumnHeaderProps {
  header: Header<any, unknown>;
  table: Table<any>;
  borderStyle: string;
  strokeLeftWeight: number;
}

export function DraggableColumnHeader(props: DraggableColumnHeaderProps) {
  const { header, table, strokeLeftWeight, borderStyle } = props;
  const { getState, setColumnOrder } = table;
  const { columnOrder } = getState();

  const { column } = header;

  const [, dropRef] = useDrop({
    accept: 'column',
    drop: (draggedColumn: Column<any>) => {
      const newColumnOrder = reorderColumn(draggedColumn.id, column.id, columnOrder);
      setColumnOrder(newColumnOrder);
    },
  });

  const [{ isDragging }, dragRef, previewRef] = useDrag({
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
    item: () => column,
    type: 'column',
  });

  return (
    <th
      ref={dropRef}
      colSpan={header.colSpan}
      style={{
        borderLeft: `${strokeLeftWeight}px ${borderStyle} var(--fig-color-border)`,
        opacity: isDragging ? 0.5 : 1,
        position: 'relative',
        width: header.getSize(),
      }}
    >
      <div ref={previewRef} className="relative py-5 px-4">
        <div
          ref={dragRef}
          className="absolute w-8 h-5 hover:bg-gray-400"
          style={{
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
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
