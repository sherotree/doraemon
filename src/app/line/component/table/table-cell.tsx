import { useState, useEffect } from 'react';

export const TableCell = ({ getValue, row, column, table }: any) => {
  const { index } = row;
  const { id } = column;
  const initialValue = getValue();
  // We need to keep and update the state of the cell normally
  const [value, setValue] = useState(initialValue);

  // When the input is blurred, we'll call our table meta's updateData function
  const onBlur = () => {
    // @ts-ignore
    table.options.meta?.updateData(index, id, value);
  };

  // If the initialValue is changed external, sync it up with our state
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <input value={value as string} onChange={e => setValue(e.target.value)} onBlur={onBlur} style={{ width: '100%' }} />
  );
};
