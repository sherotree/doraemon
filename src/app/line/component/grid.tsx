import { useGlobalStore } from '../store';
import { Switch } from 'antd';

export default function GridConfig() {
  const { commonConfig, setCommonConfig } = useGlobalStore();

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-1">
        <div>Enabled Grid</div>
        <Switch
          className="w-[40px]"
          checked={commonConfig.grid.show}
          onChange={value => {
            setCommonConfig({ grid: { ...commonConfig.grid, show: value } });
          }}
        />
      </div>
    </div>
  );
}
