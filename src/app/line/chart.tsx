import ReactECharts from 'echarts-for-react';
import { useRef } from 'react';
import { useStore } from './store';

export function Chart(props: any) {
  const { option } = props;
  const { config } = useStore();

  const ref = useRef<any>(null!);

  return (
    <div>
      <ReactECharts
        style={{ width: '100%', height: 420 }}
        option={option}
        theme={config.theme}
        opts={{ renderer: 'svg' }}
        ref={ref}
      />
    </div>
  );
}
