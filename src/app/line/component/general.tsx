import { useStore } from '../store';
import { Switch, Input, Select, ColorPicker } from 'antd';

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
        <div>Show Title</div>
        <Switch
          className="w-[40px]"
          checked={config.titleShow}
          onChange={value => {
            setConfig({ titleShow: value });
          }}
        />
      </div>

      <div className="flex flex-col gap-1">
        <div>Title</div>
        <Input
          className="w-[40px]"
          allowClear
          onChange={e => {
            setConfig({ title: e.target.value });
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
  );
}
