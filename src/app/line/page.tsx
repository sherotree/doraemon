'use client';

import { ConfigProvider, Switch, Input, ColorPicker, Select } from 'antd';
import { Chart } from './chart';
import { useStore } from './store';
import { useTheme } from 'fig-components';

const SymbolOptions = [
  // 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
  { value: 'none', label: 'none' },
  { value: 'circle', label: 'circle' },
  { value: 'rect', label: 'rect' },
  { value: 'roundRect', label: 'roundRect' },
  { value: 'triangle', label: 'triangle' },
  { value: 'diamond', label: 'diamond' },
  { value: 'pin', label: 'pin' },
  { value: 'arrow', label: 'arrow' },
];

export default function LinePage() {
  const { config, setConfig } = useStore();
  const theme = useTheme();

  const configOption = {
    color: [config.lineColor],
    title: { text: config.title, show: config.titleShow },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      show: config.XAxisShow,
      name: config.XAxisName,
    },
    yAxis: {
      type: 'value',
      show: config.YAxisShow,
      name: config.YAxisName,
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: 'line',
        step: false,
        // step: 'middle', // 'start', 'middle', 'end', false
        smooth: config.smooth,
        symbol: config.symbol, // 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
      },
    ],
  };

  return (
    <ConfigProvider theme={theme}>
      <div className="p-4 flex gap-4 text-[12px] text-[var(--fig-color-text-secondary)]">
        <div className="flex-1">
          <Chart option1={configOption} />
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
            <div>Line Chart Title</div>
            <Switch
              className="w-[40px]"
              checked={config.titleShow}
              onChange={value => {
                setConfig({ titleShow: value });
              }}
            />
          </div>

          <div className="flex flex-col gap-1">
            <div>Line Chart Name</div>
            <Input
              className="w-[40px]"
              allowClear
              onChange={e => {
                setConfig({ title: e.target.value });
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
            <div>xAxis Name</div>
            <Input
              className="w-[40px]"
              allowClear
              onChange={e => {
                setConfig({ XAxisName: e.target.value });
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
            <div>yAxis Name</div>
            <Input
              className="w-[40px]"
              allowClear
              onChange={e => {
                setConfig({ YAxisName: e.target.value });
              }}
            />
          </div>

          <div className="flex flex-col gap-1">
            <div>Line Color</div>
            <ColorPicker
              showText
              style={{ width: 108 }}
              value={config.lineColor}
              onChange={(_, color) => {
                setConfig({ lineColor: color });
              }}
            />
          </div>

          <div className="flex flex-col gap-1">
            <div>Enabled Line Smooth</div>
            <Switch
              className="w-[40px]"
              checked={config.smooth}
              onChange={value => {
                setConfig({ smooth: value });
              }}
            />
          </div>

          <div className="flex flex-col gap-1">
            <div>Enable Symbol</div>
            <Switch
              className="w-[40px]"
              checked={config.enableSymbol}
              onChange={value => {
                setConfig({ enableSymbol: value });
              }}
            />
          </div>

          <div className="flex flex-col gap-1">
            <div>Symbol Type</div>
            <Select
              className="w-[100px]"
              defaultValue="circle"
              options={SymbolOptions}
              onChange={value => {
                setConfig({ symbol: value });
              }}
            />
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
}
