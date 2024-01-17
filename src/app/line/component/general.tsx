import { useStore } from '../store';
import { Switch, Input, ColorPicker, InputNumber, Select } from 'antd';

const titleStyleOptions = [
  {
    value: 'normal',
    label: 'normal',
  },
  {
    value: 'italic',
    label: 'italic',
  },
  {
    value: 'oblique',
    label: 'oblique',
  },
];

const titleAlignOptions = [
  {
    value: 'left',
    label: 'left',
  },
  {
    value: 'center',
    label: 'center',
  },
  {
    value: 'right',
    label: 'right',
  },
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

      {/* Title */}
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
        <div>Title Color</div>
        <ColorPicker
          showText
          style={{ width: 108 }}
          value={config.title.textStyle.color}
          onChange={(_, color) => {
            setConfig({ title: { ...config.title, textStyle: { ...config.title.textStyle, color } } });
          }}
        />
      </div>

      <div className="flex flex-col gap-1">
        <div>Title Size</div>
        <InputNumber
          value={config.title.textStyle.fontSize}
          min={12}
          max={64}
          onChange={value => {
            setConfig({ title: { ...config.title, textStyle: { ...config.title.textStyle, fontSize: value } } });
          }}
        />
      </div>

      <div className="flex flex-col gap-1">
        <div>Title Style</div>
        <Select
          defaultValue="normal"
          options={titleStyleOptions}
          onChange={value => {
            setConfig({ title: { ...config.title, textStyle: { ...config.title.textStyle, fontStyle: value } } });
          }}
        />
      </div>
      {/* left/top/right/bottom */}
      <div className="flex flex-col gap-1">
        <div>Title Padding</div>
        <InputNumber
          value={config.title.padding}
          // min={12}
          // max={64}
          onChange={value => {
            setConfig({ title: { ...config.title, padding: value } });
          }}
        />
      </div>

      {/* Line Color */}
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
