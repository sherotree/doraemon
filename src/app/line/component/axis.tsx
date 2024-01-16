import { useStore } from '../store';
import { Switch, Input, Select, ColorPicker } from 'antd';

export default function AxisConfig() {
  const { config, setConfig } = useStore();

  return (
    <div>
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
    </div>
  );
}
