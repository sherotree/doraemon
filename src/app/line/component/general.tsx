import { useGlobalStore } from '../store';
import { Switch } from 'antd';

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
            setCommonConfig({ title: { show: value } });
          }}
        />
      </div>
    </div>
  );
}
