import ReactECharts from 'echarts-for-react';
import { useRef } from 'react';
import { Button } from 'antd';
import { emit } from './emit';
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
        opts={{ renderer: 'svg' }}
        theme={config.theme}
        ref={ref}
      />

      <Button
        type="primary"
        className="mt-4 w-full"
        onClick={() => {
          const echartInstance = ref.current.getEchartsInstance();
          const base64 = echartInstance.getDataURL();
          const svg: any = decodeURIComponent(base64).replace('data:image/svg+xml;charset=UTF-8,', '');
          emit('create-from-svg', svg);
        }}
      >
        Insert
      </Button>
    </div>
  );
}
