import { create } from 'zustand';
import { uniqueId, last, omit } from 'lodash';
import { DEFAULT_SERIES_CONFIG, SAMPLES } from './constants';
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
  setColumns: (columns: any[]) => void;
  commonConfig: any;
  setCommonConfig: (config: any) => void;
  config: any;
  setConfig: (config: any) => void;
  customTemplates: any[];
  setCustomTemplates: (templates: any[]) => void;
}

export const useGlobalStore = create<IProps>((set, get) => ({
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
  commonConfig: {
    theme: 'light',
    grid: { show: false },
    legend: { show: true },
    xAxis: { show: true, boundaryGap: true },
    yAxis: { show: true, boundaryGap: true },
    title: { show: false },
    color: ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'],
  },
  setCommonConfig: commonConfig => set(state => ({ commonConfig: { ...state.commonConfig, ...commonConfig } })),
  config: {
    title: SAMPLES[0].title,
    xAxis: SAMPLES[0].xAxis,
    yAxis: SAMPLES[0].yAxis,
    grid: SAMPLES[0].grid,
    legend: SAMPLES[0].legend,
    visualMap: SAMPLES[0].visualMap,
  },
  setConfig: config => set(state => ({ config: { ...state.config, ...config } })),
  customTemplates: [],
  setCustomTemplates: customTemplates => set({ customTemplates }),
}));
