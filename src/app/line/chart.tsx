import ReactECharts from 'echarts-for-react';
import { useRef } from 'react';

export function Chart(props: any) {
  const option = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: 'line',
      },
    ],
  };

  const ref = useRef<any>(null!);

  return (
    <div>
      <ReactECharts style={{ width: '100%', height: 420 }} option={option} opts={{ renderer: 'svg' }} ref={ref} />
    </div>
  );
}
