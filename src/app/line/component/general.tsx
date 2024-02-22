import { useGlobalStore } from '../store';
import { Switch, Checkbox, ColorPicker } from 'antd';
import { RefreshIcon } from 'fig-components';

export default function GeneralConfig() {
  const { commonConfig, setCommonConfig, data } = useGlobalStore();

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
          {/* <Checkbox
            checked={commonConfig.title.show}
            onChange={e => {
              setCommonConfig({ title: { show: e.target.checked } });
            }}
          >
            Show Title
          </Checkbox> */}
          <Checkbox
            checked={commonConfig.xAxis.show}
            onChange={e => {
              setCommonConfig({ xAxis: { ...commonConfig.xAxis, show: e.target.checked } });
            }}
          >
            Show xAxis
          </Checkbox>

          <Checkbox
            checked={commonConfig.xAxis.boundaryGap}
            onChange={e => {
              setCommonConfig({ xAxis: { ...commonConfig.xAxis, boundaryGap: e.target.checked } });
            }}
          >
            Show xAxis boundaryGap
          </Checkbox>

          <Checkbox
            checked={commonConfig.yAxis.show}
            onChange={e => {
              setCommonConfig({ yAxis: { ...commonConfig.yAxis, show: e.target.checked } });
            }}
          >
            Show yAxis
          </Checkbox>

          <Checkbox
            checked={commonConfig.legend.show}
            onChange={e => {
              setCommonConfig({ legend: { ...commonConfig.legend, show: e.target.checked } });
            }}
          >
            Show Legend
          </Checkbox>

          <Checkbox
            checked={commonConfig.grid.show}
            onChange={e => {
              setCommonConfig({ grid: { ...commonConfig.grid, show: e.target.checked } });
            }}
          >
            Show Grid
          </Checkbox>
        </div>
      </div>

      <div>
        <div className="text-[11px] text-[var(--fig-color-text-secondary)] mb-1">Color</div>
        <div className="flex gap-1 items-center flex-wrap">
          {commonConfig.color.slice(0, data.length).map((color: string, index: number) => {
            return (
              <ColorPicker
                key={index}
                value={color}
                size="small"
                onChange={(_, value) => {
                  const color = commonConfig.color;
                  color[index] = value;
                  setCommonConfig({ color });
                }}
              />
            );
          })}
          <RefreshIcon
            className="w-4 h-4 ml-1 cursor-pointer"
            onClick={() => {
              const COLORS = [
                '#5470c6',
                '#91cc75',
                '#fac858',
                '#ee6666',
                '#73c0de',
                '#3ba272',
                '#fc8452',
                '#9a60b4',
                '#ea7ccc',
              ];
              const randomColor = () => COLORS[Math.floor(Math.random() * COLORS.length)];
              const color = commonConfig.color;
              commonConfig.color.slice(0, data.length).forEach((_, index) => {
                color[index] = randomColor();
              });
              setCommonConfig({ color });
            }}
          />
        </div>
      </div>
    </div>
  );
}
