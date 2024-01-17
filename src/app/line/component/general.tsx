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
          checked={config.title.show}
          onChange={value => {
            setConfig({ title: { ...config.title, show: value } });
          }}
        />
      </div>

      <div className="flex flex-col gap-1">
        <div>Title</div>
        <Input
          className="w-[40px]"
          allowClear
          placeholder="Line Charts"
          onChange={e => {
            setConfig({ title: { ...config.title, text: e.target.value } });
          }}
        />
      </div>

      <div className="flex flex-col gap-1">
        <div>Line Color</div>
        <ColorPicker
          showText
          style={{ width: 108 }}
          value={config.color}
          onChange={(_, color) => {
            setConfig({ color });
          }}
        />
      </div>
    </div>
  );
}
