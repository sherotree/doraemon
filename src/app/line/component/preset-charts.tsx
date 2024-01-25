import { SAMPLES, IMMUTABLE_CONFIG, SMALL_CHART_IMMUTABLE_CONFIG } from '../constants';
import ReactECharts from 'echarts-for-react';
import { useGlobalStore } from '../store';
import { genColumnAndDataFromOption } from '../utils';

export default function PresetCharts() {
  const { setColumns, setData, setConfig } = useGlobalStore();

  return (
    <div className="flex gap-2 flex-wrap">
      {SAMPLES.map((sample, index) => {
        const title = { ...IMMUTABLE_CONFIG.title, ...SMALL_CHART_IMMUTABLE_CONFIG.title, ...sample.title };
        const grid = { ...IMMUTABLE_CONFIG.grid, ...sample.grid };
        const yAxis = sample.yAxis;
        const xAxis = sample.xAxis;
        const series = sample.series;

        const option = {
          color: IMMUTABLE_CONFIG.color,
          grid,
          title,
          yAxis,
          xAxis,
          series,
        };

        return (
          <div
            key={index}
            onClick={() => {
              const { columns, data } = genColumnAndDataFromOption(sample);

              setConfig({ title, yAxis, xAxis });
              setColumns(columns);
              setData(data);
            }}
          >
            <ReactECharts
              style={{ width: 300, height: 180 }}
              option={option}
              // theme={commonConfig.theme}
              opts={{ renderer: 'svg' }}
            />
          </div>
        );
      })}
    </div>
  );
}
