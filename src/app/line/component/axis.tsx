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
          checked={config.xAxis.show}
          onChange={value => {
            setConfig({ xAxis: { ...config.xAxis, show: value } });
          }}
        />
      </div>

      <div className="flex flex-col gap-1">
        <div>xAxis Name</div>
        <Input
          className="w-[40px]"
          allowClear
          onChange={e => {
            setConfig({ xAxis: { ...config.xAxis, name: e.target.value } });
          }}
        />
      </div>

      <div className="flex flex-col gap-1">
        <div>Enabled yAxis</div>
        <Switch
          className="w-[40px]"
          checked={config.yAxis.show}
          onChange={value => {
            setConfig({ yAxis: { ...config.yAxis, show: value } });
          }}
        />
      </div>

      <div className="flex flex-col gap-1">
        <div>yAxis Name</div>
        <Input
          className="w-[40px]"
          allowClear
          onChange={e => {
            setConfig({ yAxis: { ...config.yAxis, name: e.target.value } });
          }}
        />
      </div>
    </div>
  );
}
