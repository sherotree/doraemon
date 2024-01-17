'use client';

import { ConfigProvider, Switch, Input, ColorPicker, Select, Segmented } from 'antd';
import { Chart } from './chart';
import { useStore } from './store';
import { useTheme } from 'fig-components';
import { useState } from 'react';
import GeneralConfig from './component/general';
import AxisConfig from './component/axis';
import SeriesConfig from './component/series';

const typeOptions = ['General', 'Axis', 'Series', 'Legend', 'Grid', 'Label'];

export default function LinePage() {
  const { config, setConfig } = useStore();
  const [configType, setConfigType] = useState<string | number>('General');
  const theme = useTheme();

  const configOption = {
    color: [config.color],
    title: config.title,
    xAxis: config.xAxis,
    yAxis: config.yAxis,
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: 'line',
        step: false,
        // step: 'middle', // 'start', 'middle', 'end', false
        smooth: config.smooth,
        symbol: config.symbol, // 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
        areaStyle: {},
      },
    ],
  };

  return (
    <ConfigProvider theme={theme}>
      <div className="p-4 flex gap-4 text-[12px] text-[var(--fig-color-text-secondary)]">
        <div className="flex-1">
          <Chart option={configOption} />
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
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
}
