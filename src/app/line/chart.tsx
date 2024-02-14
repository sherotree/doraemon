import ReactECharts from 'echarts-for-react';
import { useRef } from 'react';
import { useGlobalStore } from './store';

export function Chart(props: any) {
  const { option } = props;
  const { commonConfig } = useGlobalStore();

  const ref = useRef<any>(null!);

  return (
    <div className="bg-[var(--fig-color-bg-hover)] px-6 py-8">
      <ReactECharts
        style={{ width: '100%', height: 420, backgroundColor: '#ffffff' }}
        notMerge
        option={option}
        theme={commonConfig.theme}
        opts={{ renderer: 'svg' }}
        ref={ref}
      />
    </div>
  );
}
