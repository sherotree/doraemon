import { useStore } from '../store';
import { Switch, InputNumber, ColorPicker } from 'antd';

export default function GridConfig() {
  const { config, setConfig } = useStore();

  return (
    <div>
      {/* FIXME: don't work */}
      <div className="flex flex-col gap-1">
        <div>Enabled Grid</div>
        <Switch
          className="w-[40px]"
          checked={config.grid.show}
          onChange={value => {
            setConfig({ grid: { ...config.grid, show: value } });
          }}
        />
      </div>

      <div className="flex flex-col gap-1">
        <div>Background Color</div>
        <ColorPicker
          showText
          style={{ width: 108 }}
          value={config.grid.backgroundColor}
          onChange={(_, color) => {
            setConfig({ grid: { ...config.grid, backgroundColor: color } });
          }}
        />
      </div>

      <div className="flex flex-col gap-1">
        <div>Border Color</div>
        <ColorPicker
          showText
          style={{ width: 108 }}
          value={config.grid.borderColor}
          onChange={(_, color) => {
            setConfig({ grid: { ...config.grid, borderColor: color } });
          }}
        />
      </div>

      <div className="flex flex-col gap-1">
        <div>Border Width</div>
        <InputNumber
          value={config.grid.borderWidth}
          // min={12}
          // max={64}
          onChange={value => {
            setConfig({ grid: { ...config.grid, borderWidth: value } });
          }}
        />
      </div>
    </div>
  );
}
