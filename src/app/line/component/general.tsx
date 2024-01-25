import { useGlobalStore } from '../store';
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

export default function GeneralConfig() {
  const { commonConfig, setCommonConfig, config, setConfig } = useGlobalStore();

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-1">
        <div>Dark Mode</div>
        <Switch
          className="w-[40px]"
          checked={commonConfig.theme === 'dark'}
          onChange={value => {
            setCommonConfig({
              theme: value ? 'dark' : 'light',
            });
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

      {/* <div className="flex flex-col gap-1">
        <div>Title</div>
        <Input
          className="w-[40px]"
          allowClear
          placeholder="Line Charts"
          value={config.title.text}
          onChange={e => {
            setConfig({ title: { ...config.title, text: e.target.value } });
          }}
        />
      </div> */}

      {/* <div className="flex flex-col gap-1">
        <div>Title Color</div>
        <ColorPicker
          showText
          style={{ width: 108 }}
          value={config.title.textStyle.color}
          onChange={(_, color) => {
            setConfig({ title: { ...config.title, textStyle: { ...config.title.textStyle, color } } });
          }}
        />
      </div> */}
      {/* 
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
      </div> */}

      {/* <div className="flex flex-col gap-1">
        <div>Title Style</div>
        <Select
          defaultValue="normal"
          options={titleStyleOptions}
          onChange={value => {
            setConfig({ title: { ...config.title, textStyle: { ...config.title.textStyle, fontStyle: value } } });
          }}
        />
      </div> */}
      {/* left/top/right/bottom */}
      {/* <div className="flex flex-col gap-1">
        <div>Title Padding</div>
        <InputNumber
          value={config.title.padding}
          min={0}
          max={64}
          onChange={value => {
            setConfig({ title: { ...config.title, padding: value } });
          }}
        />
      </div> */}

      {/* Line Color */}
      {/* <div className="flex flex-col gap-1">
        <div>Line Color</div>
        <ColorPicker
          showText
          style={{ width: 108 }}
          value={config.color}
          onChange={(_, color) => {
            setConfig({ color });
          }}
        />
      </div> */}
    </div>
  );
}
