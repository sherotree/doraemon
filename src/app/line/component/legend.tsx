// 针对多条折线图，legend的配置
import { useStore } from '../store';
import { Switch, Select, Radio, InputNumber } from 'antd';

const orientOptions = [
  { value: 'horizontal', label: 'horizontal' },
  { value: 'vertical', label: 'vertical' },
];

const alignOptions = [
  { value: 'auto', label: 'auto' },
  { value: 'left', label: 'left' },
  { value: 'right', label: 'right' },
];

export default function LegendConfig() {
  const { config, setConfig } = useStore();

  return (
    <div>
      <div className="flex flex-col gap-1">
        <div>Enabled Legend</div>
        <Switch
          className="w-[40px]"
          checked={config.legend.show}
          onChange={value => {
            setConfig({ legend: { ...config.legend, show: value } });
          }}
        />
      </div>

      <div className="flex flex-col gap-1">
        <div>Orient</div>
        <Radio.Group
          defaultValue={'horizontal'}
          options={orientOptions}
          onChange={value => {
            setConfig({ legend: { ...config.legend, orient: value.target.value } });
          }}
        />
      </div>

      <div className="flex flex-col gap-1">
        <div>Padding</div>
        <InputNumber
          value={config.legend.padding}
          // min={12}
          // max={64}
          onChange={value => {
            setConfig({ legend: { ...config.legend, padding: value } });
          }}
        />
      </div>

      <div className="flex flex-col gap-1">
        <div>Align</div>
        <Select
          className="w-[100px]"
          defaultValue="auto"
          options={alignOptions}
          onChange={value => {
            setConfig({ legend: [{ ...config.legend, align: value }] });
          }}
        />
      </div>

      <div className="flex flex-col gap-1">
        <div>Item Gap</div>
        <InputNumber
          value={config.legend.itemGap}
          // min={12}
          // max={64}
          onChange={value => {
            setConfig({ legend: { ...config.legend, itemGap: value } });
          }}
        />
      </div>
    </div>
  );
}
