import { create } from 'zustand';
import { uniqueId, last, omit } from 'lodash';
import { SAMPLES } from './constants';
import { genColumnAndDataFromOption } from './utils';

const { columns, data } = genColumnAndDataFromOption(SAMPLES[0]);

interface IProps {
  data: any[];
  setData: (data: any[]) => void;
  addRow: () => void;
  columns: any[];
  updateCellData: (rowId: string, columnId: string, value: any) => void;
  updateColumnLabelById: (id: string, label: string) => void;
  addColumn: () => void;
  removeColumn: (id: string) => void;
  removeRow: (id: string) => void;
  setColumns: (columns: any[]) => void;
}

export const useEditDataStore = create<IProps>((set, get) => ({
  data,
  setData: data => set({ data }),
  addRow: () => {
    const data = get().data;
    const lastRow = last(data);
    const lastRowSeriesConfig = omit(lastRow.seriesConfig, 'name');
    const columns = get().columns;
    const row = {};

    columns.forEach((column: any, index: number) => {
      const value = lastRow[column.id];
      const randomValue = Math.random();
      const isOdd = Math.ceil(randomValue * 10) % 2 === 0;
      const ratio = Math.min(Math.max(isOdd ? 1 + randomValue : 1 - randomValue, 0.6), 1.4);
      row[column.id] = index === 0 ? `Line ${uniqueId()}` : Math.ceil(ratio * value);
    });

    Object.assign(row, { seriesConfig: lastRowSeriesConfig });

    set({ data: [...data, row] });
  },
  updateCellData: (rowId, columnId, value) => {
    const data = get().data;
    data[rowId][columnId] = value;
    set({ data });
  },
  columns,
  updateColumnLabelById: (id, label) => {
    const columns = get().columns;
    const index = columns.findIndex(item => item.id === id);
    columns[index].label = label;
    set({ columns });
  },
  addColumn: () => {
    const columns = get().columns;
    const lastCol = last(columns);
    const data = get().data;
    const id = uniqueId();
    const label = `C ${columns.length + 1}`;
    const column = { id, label };
    columns.push(column);

    const randomValue = Math.random();
    const isOdd = Math.ceil(randomValue * 10) % 2 === 0;
    const ratio = Math.min(Math.max(isOdd ? 1 + randomValue : 1 - randomValue, 0.6), 1.4);

    data.forEach(item => {
      item[id] = Math.ceil(item[lastCol.id] * ratio);
    });

    set({ columns, data });
  },
  setColumns: columns => set({ columns }),
  removeColumn: id => {
    const columns = get().columns;
    const data = get().data;
    const index = columns.findIndex(item => item.id === id);
    columns.splice(index, 1);
    data.forEach(item => {
      delete item[id];
    });
    set({ columns, data });
  },
  removeRow: id => {
    const data = get().data;
    const index = data.findIndex(item => item.id === id);
    data.splice(index, 1);
    set({ data: [...data] });
  },
}));
