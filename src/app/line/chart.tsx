import ReactECharts from 'echarts-for-react';
import { useRef } from 'react';
import { useGlobalStore } from './store';

export function Chart(props: any) {
  const { option } = props;
  const { commonConfig } = useGlobalStore();

  const ref = useRef<any>(null!);

  return (
    <div>
      <ReactECharts
        style={{ width: '100%', height: 420 }}
        notMerge
        option={option}
        theme={commonConfig.theme}
        opts={{ renderer: 'svg' }}
        ref={ref}
      />
    </div>
  );
}
