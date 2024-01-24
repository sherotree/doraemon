'use client';

import { ConfigProvider, Segmented } from 'antd';
import { Chart } from './chart';
import { useStore, useGlobalStore } from './store';
import { omit } from 'lodash';
import { useTheme } from 'fig-components';
import { useState } from 'react';
import GeneralConfig from './component/general';
import AxisConfig from './component/axis';
import LegendConfig from './component/legend';
import GridConfig from './component/grid';
import DataPanel from './component/data-panel';

const typeOptions = ['General', 'Axis', 'Legend', 'Grid'];

export default function LinePage() {
  const { config } = useStore();
  const { columns, data } = useGlobalStore();
  const [configType, setConfigType] = useState<string | number>(typeOptions[0]);
  const theme = useTheme();

  const columnsOmitFirst = columns.slice(1);

  const configOption = {
    color: [config.color],
    title: config.title,
    xAxis: { ...config.xAxis, data: columnsOmitFirst.map((x: any) => x.label) },
    yAxis: config.yAxis,
    grid: config.grid,
    series: data.map((_data: any) => {
      const omitData = omit(_data, 'rowKey', 'seriesConfig');
      const seriesConfig = _data.seriesConfig;
      return { ...seriesConfig, data: Object.values(omitData) };
    }),
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
            {/* {configType === 'Series' && <SeriesConfig />} */}
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
