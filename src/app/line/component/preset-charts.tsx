import { SAMPLES, DEFAULT_SERIES_CONFIG } from '../constants';
import ReactECharts from 'echarts-for-react';
import { useStore, useGlobalStore } from '../store';
import { uniqueId, omit } from 'lodash';

export default function PresetCharts() {
  const { config, setConfig } = useStore();
  const { setColumns, setData, data } = useGlobalStore();

  return (
    <div className="flex gap-2 flex-wrap">
      {SAMPLES.map((sample, index) => {
        const title = { ...config.title, ...sample.title };
        const legend = { ...config.legend, ...sample.legend };
        const grid = { ...config.grid, ...sample.grid };
        const yAxis = sample.yAxis;
        const xAxis = sample.xAxis;
        const series = sample.series;

        const option = {
          color: [config.color],
          grid,
          legend,
          title,
          yAxis,
          xAxis,
          series,
        };

        return (
          <div
            key={index}
            onClick={() => {
              const columns = sample.xAxis[0].data.reduce((acc: any, cur) => {
                acc.push({ id: cur, label: cur });
                return acc;
              }, []);
              columns.unshift({ id: 'rowKey', label: '' });

              const data: any = [];
              for (let i = 0; i < series.length; i++) {
                const row = { seriesConfig: { ...DEFAULT_SERIES_CONFIG, ...omit(sample.series[i], ['data']) } };

                for (let j = 0; j < columns.length; j++) {
                  row[columns[j].id] = j === 0 ? `Sample ${uniqueId()}` : sample.series[i].data[j - 1];
                }
                data.push(row);
              }

              setConfig({ title, yAxis });
              setColumns(columns);
              setData(data);
            }}
          >
            <ReactECharts
              style={{ width: 400, height: 200 }}
              option={option}
              theme={config.theme}
              opts={{ renderer: 'svg' }}
            />
          </div>
        );
      })}
    </div>
  );
}
