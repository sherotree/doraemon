import { useStore } from '../store';
import { Switch, Select } from 'antd';

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

export default function GeneralConfig() {
  const { config, setConfig } = useStore();

  return (
    <div>
      <div className="flex flex-col gap-1">
        <div>Enabled Line Smooth</div>
        <Switch
          className="w-[40px]"
          checked={config.series[0].smooth}
          onChange={value => {
            setConfig({ series: [{ ...config.series[0], smooth: value }] });
          }}
        />
      </div>

      <div className="flex flex-col gap-1">
        <div>Enable Symbol</div>
        <Switch
          className="w-[40px]"
          checked={config.series[0].showSymbol}
          onChange={value => {
            setConfig({ series: [{ ...config.series[0], showSymbol: value }] });
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
            setConfig({ series: [{ ...config.series[0], symbol: value }] });
          }}
        />
      </div>
    </div>
  );
}
