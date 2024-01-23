'use client';

import { ConfigProvider, Switch, Input, ColorPicker, Select, Segmented } from 'antd';
import { Chart } from './chart';
import { useStore, useGlobalStore } from './store';
import { useTheme } from 'fig-components';
import { useState } from 'react';
import GeneralConfig from './component/general';
import AxisConfig from './component/axis';
import SeriesConfig from './component/series';
import LegendConfig from './component/legend';
import GridConfig from './component/grid';
import DataPanel from './component/data-panel';

const typeOptions = ['General', 'Axis', 'Series', 'Legend', 'Grid'];

export default function LinePage() {
  const { config, setConfig } = useStore();
  const { columns, data } = useGlobalStore();
  const [configType, setConfigType] = useState<string | number>(typeOptions[0]);
  const theme = useTheme();

  const columnsOmitFirst = columns.slice(1);

  const configOption = {
    color: [config.color],
    title: config.title,
    xAxis: { ...config.xAxis, data: columnsOmitFirst.map((x: any) => x.label) },
    yAxis: config.yAxis,
    series: data.map((x: any) => {
      const dataOmitFirst = Object.values(x).slice(1);
      return { ...config.series[0], data: dataOmitFirst };
    }),
    // series: config.series.map((x: any, index: number) => ({ ...x, data: Object.values(data?.[index]).slice(1) })),
    grid: config.grid,
  };

  return (
    <ConfigProvider theme={theme}>
      <div className="p-4 flex gap-4 text-[12px] text-[var(--fig-color-text-secondary)]">
        <div className="flex-1 flex flex-col gap-2">
          <Chart option={configOption} />
          <DataPanel />
        </div>

        <div className="gap-3 w-[210px] flex-shrink-0">
          <Segmented options={typeOptions} size="small" onChange={setConfigType} />
          <div className="flex flex-col gap-3 w-[210px] flex-shrink-0 items-start">
            {/* General */}
            {configType === 'General' && <GeneralConfig />}
            {/* Axis */}
            {configType === 'Axis' && <AxisConfig />}
            {/* Series */}
            {configType === 'Series' && <SeriesConfig />}
            {/* Legend */}
            {configType === 'Legend' && <LegendConfig />}
            {/* Grid */}
            {configType === 'Grid' && <GridConfig />}
            {/* Label */}
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
}
