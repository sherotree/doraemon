import { SAMPLES, IMMUTABLE_CONFIG, SMALL_CHART_IMMUTABLE_CONFIG } from '../constants';
import ReactECharts from 'echarts-for-react';
import { useGlobalStore } from '../store';
import { genColumnAndDataFromOption } from '../utils';
import AddChart from './add-chart';

export default function PresetCharts() {
  const { setColumns, setData, setConfig, customTemplates } = useGlobalStore();

  return (
    <div className="flex gap-2 flex-wrap">
      <AddChart />
      {[...customTemplates, ...SAMPLES].map((sample: any, index) => {
        const title = sample.title.map(t => ({
          ...t,
          ...IMMUTABLE_CONFIG.title,
          ...SMALL_CHART_IMMUTABLE_CONFIG.title,
        }));

        const grid = sample.grid;
        const yAxis = sample.yAxis;
        const xAxis = sample.xAxis;
        const series = sample.series;
        const visualMap = sample.visualMap;
        const dataZoom = sample.dataZoom;

        const option = {
          color: IMMUTABLE_CONFIG.color,
          grid,
          title,
          yAxis,
          xAxis,
          series,
          visualMap,
          // dataZoom,
        };

        return (
          <div
            key={index}
            onClick={() => {
              const { columns, data } = genColumnAndDataFromOption(sample);
              console.log('columns', option);
              setConfig(sample);
              setColumns(columns);
              setData(data);
            }}
          >
            <ReactECharts
              style={{ width: 200, height: 120 }}
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
