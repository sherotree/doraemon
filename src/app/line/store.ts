import { create } from 'zustand';

const color = '#186FE6';

type State = {
  config: any;
  setConfig: (config: any) => void;
};

export const useStore = create<State>(set => ({
  config: {
    theme: 'dark',
    color,
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
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
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
      },
    ],
  },
  setConfig: config => set(state => ({ config: { ...state.config, ...config } })),
}));
