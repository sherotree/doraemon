import { useGlobalStore } from '../store';
import { Switch } from 'antd';

export default function AxisConfig() {
  const { commonConfig, setCommonConfig } = useGlobalStore();

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-1">
        <div>Enabled xAxis</div>
        <Switch
          className="w-[40px]"
          checked={commonConfig.xAxis.show}
          onChange={value => {
            setCommonConfig({ xAxis: { ...commonConfig.xAxis, show: value } });
          }}
        />
      </div>

      <div className="flex flex-col gap-1">
        <div>Enabled xAxis boundaryGap</div>
        <Switch
          className="w-[40px]"
          checked={commonConfig.xAxis.boundaryGap}
          onChange={value => {
            setCommonConfig({ xAxis: { ...commonConfig.xAxis, boundaryGap: value } });
          }}
        />
      </div>

      <div className="flex flex-col gap-1">
        <div>Enabled yAxis</div>
        <Switch
          className="w-[40px]"
          checked={commonConfig.yAxis.show}
          onChange={value => {
            setCommonConfig({ yAxis: { ...commonConfig.yAxis, show: value } });
          }}
        />
      </div>
    </div>
  );
}
