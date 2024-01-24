import { create } from 'zustand';
import { uniqueId } from 'lodash';

const color = '#186FE6';

type State = {
  config: any;
  setConfig: (config: any) => void;
};

export const useStore = create<State>(set => ({
  config: {
    theme: 'dark',
    color,
    grid: {
      show: true,
      // top: 60,
      // right: 60,
      // bottom: 60,
      // left: 60,
      backgroundColor: '#100C2A',
      borderColor: '#ccc',
      borderWidth: 1,
    },
    // TODO: title, padding(副标题), top, right, bottom, left(容器)
    title: {
      text: 'Line Charts',
      show: true,
      textStyle: {
        color: '#fff',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: 'bold', // 'normal', 'bold', 'bolder', 'lighter', 100 | 200 | 300 | 400...
      },
      padding: 5,
    },
    xAxis: {
      type: 'category',
      show: true,
      name: '',
    },
    yAxis: {
      type: 'value',
      show: true,
      name: '',
    },
    series: [
      {
        type: 'line',
        name: 'Line',
        showSymbol: true,
        symbol: 'circle',
        symbolSize: 6,
        smooth: true,
        // lineStyle: {
        //   color,
        //   width: 2,
        //   type: 'solid',
        // },
        // itemStyle: {
        //   color,
        //   borderColor: '#fff',
        //   borderWidth: 2,
        // },
        areaStyle: undefined,
      },
    ],
    // TODO: legend, left/top/right/bottom, padding, itemWidth, itemHeight, itemStyle, textStyle, lineStyle
    // data 可以单独设置每个图例的样式
    legend: {
      show: true,
      orient: 'horizontal', // 'horizontal', 'vertical'
      padding: 5,
      align: 'auto', // 'auto', 'left', 'right',
      itemGap: 10, // the distance between each item
    },
  },
  setConfig: config => set(state => ({ config: { ...state.config, ...config } })),
}));

const columns = [
  { id: 'id', label: '' },
  { id: 'Mon', label: 'Mon' },
  { id: 'Tue', label: 'Tue' },
  { id: 'Wed', label: 'Wed' },
  { id: 'Thu', label: 'Thu' },
  { id: 'Fri', label: 'Fri' },
  { id: 'Sat', label: 'Sat' },
  { id: 'Sun', label: 'Sun' },
];

const data = [
  {
    id: 'Sample 1',
    Mon: 120,
    Tue: 200,
    Wed: 34,
    Thu: 22,
    Fri: 34,
    Sat: 22,
    Sun: 22,
  },
];

interface IProps {
  data: any[];
  setData: (data: any[]) => void;
  addRow: () => void;
  columns: any[];
  updateCellData: (rowIndex: number, columnIndex: number, value: string) => void;
  updateColumnLabelById: (id: string, label: string) => void;
  addColumn: () => void;
  setColumns: (columns: any[]) => void;
}

export const useGlobalStore = create<IProps>((set, get) => ({
  data,
  setData: data => set({ data }),
  addRow: () => {
    const data = get().data;
    const columns = get().columns;
    const row = {};
    columns.forEach((column: any, index: number) => {
      // @ts-ignore
      row[column.id] = index === 0 ? `Sample ${uniqueId()}` : Math.ceil(Math.random() * 100);
    });

    set({ data: [...data, row] });
  },
  updateCellData: (rowIndex, columnIndex, value) => {
    const data = get().data;
    data[rowIndex][columnIndex] = value;
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
    const data = get().data;
    const id = uniqueId();
    const label = `Column ${columns.length + 1}`;
    const column = { id, label };
    columns.push(column);

    data.forEach(item => {
      item[id] = undefined;
    });

    set({ columns, data });
  },
  setColumns: columns => set({ columns }),
}));
