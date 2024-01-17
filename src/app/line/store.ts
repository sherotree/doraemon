import { create } from 'zustand';

const color = '#186FE6';

type State = {
  config: any;
  setConfig: (config: any) => void;
};

export const useStore = create<State>(set => ({
  config: {
    theme: 'dark',
    title: {
      text: 'Line Charts',
      show: true,
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      show: true,
      name: '',
    },
    yAxis: {
      type: 'value',
      show: true,
      name: '',
    },
    color,
    smooth: false,
    enableSymbol: true,
    symbol: 'circle',
  },
  setConfig: config => set(state => ({ config: { ...state.config, ...config } })),
}));
