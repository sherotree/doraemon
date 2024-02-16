import { useGlobalStore } from '../store';
import { Switch, Checkbox } from 'antd';

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

      <Checkbox
        checked={commonConfig.title.show}
        onChange={e => {
          setCommonConfig({ title: { show: e.target.checked } });
        }}
      >
        Show Title
      </Checkbox>
    </div>
  );
}
