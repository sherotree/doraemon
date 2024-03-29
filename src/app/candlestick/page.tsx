'use client';

import { Segmented, Switch, ConfigProvider, ColorPicker } from 'antd';
import { useTheme } from 'fig-components';
import { useState, useEffect } from 'react';
import { useStore } from './store';
import { option as option3 } from './option-3';
import { option as option1 } from './option-1';
import { option as option2 } from './option-2';
import { data as data2 } from './data-2';
import { Chart } from './chart';
import grainSrc from './assets/grain.webp';
import Loading from '@/components/loading';

export default function StockPage() {
  const { config, setConfig } = useStore();
  const [category, setCategory] = useState<any>('Candlestick Example 1');
  const [loading, setLoading] = useState<any>(true);
  const theme = useTheme();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, []);

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

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Loading content="Loading..." />
      </div>
    );
  }

  return (
    <ConfigProvider theme={theme}>
      <div
        className="p-4 flex gap-4 text-[12px] text-[var(--fig-color-text-secondary)]"
        // style={{ backgroundImage: `url(${grainSrc})`, backgroundColor: '#EFEDEA' }}
      >
        <div className="flex flex-col gap-4 flex-1">
          <div>
            <Segmented
              options={['Candlestick Example 1', 'Candlestick Example 2', 'Candlestick Example 3']}
              value={category}
              onChange={value => {
                setCategory(value);
              }}
            />
          </div>

          {category === 'Candlestick Example 1' && <Chart option={fooOption1} />}
          {category === 'Candlestick Example 2' && <Chart option={{ dataset: { source: data2 }, ...fooOption2 }} />}
          {category === 'Candlestick Example 3' && <Chart option={fooOption3} />}
        </div>
        <div className="flex flex-col gap-3 w-[110px] flex-shrink-0 items-start">
          <div className="flex flex-col gap-1">
            <div>Dark Mode</div>
            <Switch
              className="w-[40px]"
              checked={config.theme === 'dark'}
              onChange={value => {
                setConfig({ theme: value ? 'dark' : 'light' });
              }}
            />
          </div>

          <div className="flex flex-col gap-1">
            <div>Enabled xAxis</div>
            <Switch
              className="w-[40px]"
              checked={config.XAxisShow}
              onChange={value => {
                setConfig({ XAxisShow: value });
              }}
            />
          </div>
          <div className="flex flex-col gap-1">
            <div>Enabled yAxis</div>
            <Switch
              className="w-[40px]"
              checked={config.YAxisShow}
              onChange={value => {
                setConfig({ YAxisShow: value });
              }}
            />
          </div>

          <div className="flex flex-col gap-1">
            <div>Positive Color</div>
            <ColorPicker
              style={{ width: 108 }}
              showText
              value={config.positiveColor}
              onChange={(_, color) => {
                setConfig({ positiveColor: color });
              }}
            />
          </div>

          <div className="flex flex-col gap-1">
            <div>Negative Color</div>
            <ColorPicker
              showText
              style={{ width: 108 }}
              value={config.negativeColor}
              onChange={(_, color) => {
                setConfig({ negativeColor: color });
              }}
            />
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
}
