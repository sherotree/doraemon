import { create } from 'zustand';
import { LineProps } from 'recharts/types';

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

type State = {
  properties: any;
  setProperties: (properties: any) => void;
  XAxis: any;
  // setXAxis: (XAxis: any) => void;
};

export const useStore = create<State>(set => ({
  properties: {
    layout: 'horizontal',
    width: 800,
    height: 400,
    data,
    margin: { top: 5, right: 5, bottom: 5, left: 5 },
  },
  setProperties: properties => set(state => ({ properties: { ...state.properties, ...properties } })),
  XAxis: {
    hide: false,
    dataKey: 'name',
    xAxisId: 0,
    width: 0,
    height: 30,
    orientation: 'bottom',
    type: 'category',
    allowDecimals: false,
    allowDataOverflow: false,
    allowDuplicatedCategory: true,
    angle: 0,
    tickCount: 5,
    includeHidden: false,
    interval: 'preserveEnd',
    padding: { left: 0, right: 0 },
    minTickGap: 5,
    axisLine: true,
    tickLine: true,
    tickSize: 6,
    mirror: false,
    reversed: false,
    label: { value: '', position: 'insideBottom', offset: 0 },
    scale: 'auto',
    unit: '',
    name: '',
    tickMargin: 0,
  },
}));
