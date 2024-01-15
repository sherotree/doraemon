import ReactECharts from 'echarts-for-react';
import { useRef } from 'react';
import { useStore } from './store';

export function Chart(props: any) {
  const { option1 } = props;
  const { config } = useStore();
  const option = {
    title: {
      text: 'Line Chart222',
      show: false,
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      show: true,
      name: 'Date',
    },
    yAxis: {
      type: 'value',
      show: true,
      name: 'Price',
    },
    grid: [
      {
        // show: true,
        // borderColor: 'red',
        // borderWidth: 1,
        // backgroundColor: 'blue',
        // left: 0,
        // right: 0,
        // top: 0,
        // bottom: 0,
      },
    ],
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: 'line',
        step: false,
        // step: 'middle', // 'start', 'middle', 'end', false
        smooth: true,
        symbol: 'rect', // 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
      },
    ],
  };

  const ref = useRef<any>(null!);

  return (
    <div>
      <ReactECharts
        style={{ width: '100%', height: 420 }}
        option={option1 || option}
        theme={config.theme}
        opts={{ renderer: 'svg' }}
        ref={ref}
      />
    </div>
  );
}
