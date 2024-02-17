import { SAMPLES, IMMUTABLE_CONFIG, SMALL_CHART_IMMUTABLE_CONFIG } from '../constants';
import ReactECharts from 'echarts-for-react';
import { useGlobalStore } from '../store';
import { genColumnAndDataFromOption } from '../utils';
import AddChart from './add-chart';

export default function PresetCharts() {
  const { setColumns, setData, setConfig, customTemplates } = useGlobalStore();

  return (
    <div className="flex gap-3 flex-wrap">
      {/* <AddChart /> */}
      {[...customTemplates, ...SAMPLES].map((sample: any, index) => {
        const title = sample.title.map(t => ({
          ...t,
          ...IMMUTABLE_CONFIG.title,
          ...SMALL_CHART_IMMUTABLE_CONFIG.title,
        }));

        const grid = sample.grid;
        const yAxis = sample.yAxis;
        const xAxis = sample.xAxis.map(x => ({
          ...x,
          axisLabel: {
            fontSize: 8,
          },
        }));
        const series = sample.series;
        const visualMap = sample.visualMap;
        const dataZoom = sample.dataZoom;

        const option = {
          color: IMMUTABLE_CONFIG.color,
          grid: {
            containLabel: false,
            top: 20,
            right: 8,
            left: 8,
            bottom: 20,
          },
          title,
          yAxis: { show: false },
          xAxis,
          series,
          visualMap,
          // dataZoom,
        };

        return (
          <div
            key={index}
            className="bg-[var(--fig-color-bg-hover)] rounded-md cursor-pointer"
            onClick={() => {
              const { columns, data } = genColumnAndDataFromOption(sample);
              setConfig(sample);
              setColumns(columns);
              setData(data);
            }}
          >
            <ReactECharts
              style={{ width: 234 * 0.56, height: 175 * 0.56 }}
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
