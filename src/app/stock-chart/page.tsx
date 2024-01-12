'use client';

import { Segmented, Switch, Input, ColorPicker } from 'antd';
import { useState } from 'react';
import { useStore } from './store';
import { option as option3 } from './option-3';
import { option as option1 } from './option-1';
import { option as option2 } from './option-2';
import { data as data2 } from './data-2';
import { Chart } from './chart';

export default function StockPage() {
  const { theme, setTheme, config, setConfig } = useStore();
  const [category, setCategory] = useState<any>('ShangHai Index');

  const fooOption2 = {
    ...option2,
    xAxis: { ...option2.xAxis, show: config.XAxisShow },
    yAxis: { ...option2.yAxis, show: config.YAxisShow },
    series: [
      {
        ...option2.series[0],
        itemStyle: {
          ...option2.series[0].itemStyle,
          color: config.positiveColor,
          borderColor: config.positiveColor,
          color0: config.negativeColor,
          borderColor0: config.negativeColor,
        },
      },
      ...option2.series.slice(1),
    ],
  };

  const fooOption3 = {
    ...option3,
    xAxis: { ...option3.xAxis, show: config.XAxisShow },
    yAxis: { ...option3.yAxis, show: config.YAxisShow },
    series: [
      {
        ...option3.series[0],
        itemStyle: {
          ...option3.series[0].itemStyle,
          color: config.positiveColor,
          borderColor: config.positiveColor,
          color0: config.negativeColor,
          borderColor0: config.negativeColor,
        },
      },
      ...option3.series.slice(1),
    ],
  };

  const fooOption1 = {
    ...option1,
    xAxis: { ...option1.xAxis, show: config.XAxisShow },
    yAxis: { ...option1.yAxis, show: config.YAxisShow },
    series: [
      {
        ...option1.series[0],
        itemStyle: {
          ...option1.series[0].itemStyle,
          color: config.positiveColor,
          borderColor: config.positiveColor,
          color0: config.negativeColor,
          borderColor0: config.negativeColor,
        },
      },
      ...option1.series.slice(1),
    ],
  };

  return (
    <div className="p-4 flex gap-4">
      <div className="flex flex-col gap-4 flex-1">
        <Segmented
          options={['ShangHai Index', 'Large Scale Candlestick', 'ShangHai Index, 2015']}
          value={category}
          onChange={value => {
            setCategory(value);
          }}
        />
        {category === 'ShangHai Index' && <Chart option={fooOption1} />}
        {category === 'Large Scale Candlestick' && <Chart option={{ dataset: { source: data2 }, ...fooOption2 }} />}
        {category === 'ShangHai Index, 2015' && <Chart option={fooOption3} />}
      </div>
      <div className="flex flex-col gap-3 w-[200px] flex-shrink-0 items-start">
        <div className="flex flex-col gap-1">
          <div>Dark Mode</div>
          <Switch
            className="w-[60px]"
            checked={theme === 'dark'}
            onChange={value => {
              setTheme(value ? 'dark' : 'light');
            }}
          />
        </div>

        <div className="flex flex-col gap-1">
          <div>Enabled xAxis</div>
          <Switch
            className="w-[60px]"
            checked={config.XAxisShow}
            onChange={value => {
              setConfig({ XAxisShow: value });
            }}
          />
        </div>
        <div className="flex flex-col gap-1">
          <div>Enabled yAxis</div>
          <Switch
            className="w-[60px]"
            checked={config.YAxisShow}
            onChange={value => {
              setConfig({ YAxisShow: value });
            }}
          />
        </div>

        <div className="flex flex-col gap-1">
          <div>Positive Line Color</div>
          <ColorPicker
            showText
            value={config.positiveColor}
            onChange={(_, color) => {
              setConfig({ positiveColor: color });
            }}
          />
        </div>

        <div className="flex flex-col gap-1">
          <div>Negative Line Color</div>
          <ColorPicker
            showText
            value={config.negativeColor}
            onChange={(_, color) => {
              setConfig({ negativeColor: color });
            }}
          />
        </div>
      </div>
    </div>
  );
}
