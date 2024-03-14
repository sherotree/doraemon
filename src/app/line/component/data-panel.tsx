import { SAMPLES, IMMUTABLE_CONFIG, SMALL_CHART_IMMUTABLE_CONFIG } from '../constants';
import ReactECharts from 'echarts-for-react';
import { useGlobalStore } from '../store';
import { genColumnAndDataFromOption } from '../utils';
import AddChart from './add-chart';
import { useState } from 'react';
import clsx from 'clsx';
import { useUserStore } from '../user-store';
import { emit } from '../emit';

export default function PresetCharts() {
  const { storage, setRoute } = useUserStore();
  const { setColumns, setData, setConfig, customTemplates } = useGlobalStore();
  const [selectedId, setSelectedId] = useState(SAMPLES[0].id);

  const isPro = storage?.license?.result === 'VALID';
  const isValid = isPro || storage?.documentUseCount < 3;

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
          series: series.map((item: any) => {
            return {
              ...item,
              symbolSize: 2,
              lineStyle: {
                width: 1,
              },
            };
          }),
          visualMap,
          // dataZoom,
        };

        const cls = clsx('bg-[var(--fig-color-bg-hover)] rounded-md cursor-pointer relative', {
          'outline outline-2 outline-[#1a1a1a]': selectedId === sample.id,
        });

        const isFree = index < 3;

        return (
          <div
            key={index}
            className={cls}
            onClick={() => {
              if (!isValid && index > 2) {
                setRoute('payment');
                emit('resize-window', { width: 320, height: 618 });
                return;
              }
              const { columns, data } = genColumnAndDataFromOption(sample);
              setConfig(sample);
              setColumns(columns);
              setData(data);
              setSelectedId(sample.id);
            }}
          >
            {isFree && (
              <div
                className="absolute right-1 top-1 text-white px-1 py-0.5 text-xs rounded-sm"
                style={{ background: 'rgba(0, 0, 0, 0.7)' }}
              >
                Free
              </div>
            )}
            {!isFree && (
              <div className="absolute right-1 top-1 text-white px-1 py-0.5 text-xs rounded-sm bg-[var(--fig-color-bg-component)] z-50">
                Pro
              </div>
            )}
            <ReactECharts
              style={{ width: 234 * 0.56, height: 175 * 0.56 * 0.8 }}
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
