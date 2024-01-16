import { useStore } from '../store';
import { Switch, Input, ColorPicker } from 'antd';

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
    </div>
  );
}
