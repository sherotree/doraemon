import { useState, useEffect } from 'react';

export const TableHeader = ({ column, table }: any) => {
  const { id } = column;
  const initialValue = column.label;
  const [value, setValue] = useState(initialValue);

  // When the input is blurred, we'll call our table meta's updateData function
  const onBlur = () => {
    // @ts-ignore
    table.options.meta?.updateHeaderData(id, value);
  };

  // If the initialValue is changed external, sync it up with our state
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <input value={value as string} onChange={e => setValue(e.target.value)} onBlur={onBlur} style={{ width: '100%' }} />
  );
};
