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
