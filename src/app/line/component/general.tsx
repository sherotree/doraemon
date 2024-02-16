import { useGlobalStore } from '../store';
import { Switch, Checkbox } from 'antd';

export default function GeneralConfig() {
  const { commonConfig, setCommonConfig } = useGlobalStore();

  return (
    <div className="flex flex-col gap-4">
      <div>
        <div className="text-[11px] text-[var(--fig-color-text-secondary)] mb-1">Appearance</div>
        <div className="flex gap-2">
          <Switch
            className="w-[28px]"
            size="small"
            checked={commonConfig.theme === 'dark'}
            onChange={value => {
              setCommonConfig({
                theme: value ? 'dark' : 'light',
              });
            }}
          />
          <div className="text-[var(--fig-color-text)]">Dark Mode</div>
        </div>
      </div>

      <div>
        <div className="text-[11px] text-[var(--fig-color-text-secondary)] mb-1">Common Config</div>
        <div className="flex flex-col gap-2">
          <Checkbox
            checked={commonConfig.title.show}
            onChange={e => {
              setCommonConfig({ title: { show: e.target.checked } });
            }}
          >
            Show Title
          </Checkbox>
          <Checkbox
            checked={commonConfig.xAxis.show}
            onChange={e => {
              setCommonConfig({ xAxis: { ...commonConfig.xAxis, show: e.target.checked } });
            }}
          >
            Enabled xAxis
          </Checkbox>

          <Checkbox
            checked={commonConfig.xAxis.boundaryGap}
            onChange={e => {
              setCommonConfig({ xAxis: { ...commonConfig.xAxis, boundaryGap: e.target.checked } });
            }}
          >
            Enabled xAxis boundaryGap
          </Checkbox>

          <Checkbox
            checked={commonConfig.yAxis.show}
            onChange={e => {
              setCommonConfig({ yAxis: { ...commonConfig.yAxis, show: e.target.checked } });
            }}
          >
            Enabled yAxis
          </Checkbox>

          <Checkbox
            checked={commonConfig.legend.show}
            onChange={e => {
              setCommonConfig({ legend: { ...commonConfig.legend, show: e.target.checked } });
            }}
          >
            Enabled Legend
          </Checkbox>

          <Checkbox
            checked={commonConfig.grid.show}
            onChange={e => {
              setCommonConfig({ grid: { ...commonConfig.grid, show: e.target.checked } });
            }}
          >
            Enabled Grid
          </Checkbox>
        </div>
      </div>
    </div>
  );
}
