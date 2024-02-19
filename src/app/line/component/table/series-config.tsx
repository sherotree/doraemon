import { Drawer } from 'antd';
import React, { useState } from 'react';
// import { useGlobalStore } from '../../store';
import { useEditDataStore } from '../../edit-data-store';
import { Switch, Select, ColorPicker } from 'antd';

const SymbolOptions = [
  // 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
  { value: 'none', label: 'none' },
  { value: 'circle', label: 'circle' },
  { value: 'rect', label: 'rect' },
  { value: 'roundRect', label: 'roundRect' },
  { value: 'triangle', label: 'triangle' },
  { value: 'diamond', label: 'diamond' },
  { value: 'pin', label: 'pin' },
  { value: 'arrow', label: 'arrow' },
];

export default function SeriesConfig(props: any) {
  const { original, rowId } = props;
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => {
          setOpen(true);
        }}
      >
        SeriesConfig
      </div>
      <Drawer title="Basic Drawer" onClose={() => setOpen(false)} open={open}>
        <GeneralConfig seriesConfig={original.seriesConfig} rowId={rowId} />
      </Drawer>
    </>
  );
}

function GeneralConfig(props: any) {
  const { seriesConfig, rowId } = props;
  const { updateCellData } = useEditDataStore();

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-1">
        <div>Enabled Line Smooth</div>
        <Switch
          className="w-[40px]"
          checked={seriesConfig.smooth}
          onChange={value => {
            updateCellData(rowId, 'seriesConfig', { ...seriesConfig, smooth: value });
          }}
        />
      </div>

      <div className="flex flex-col gap-1">
        <div>Enable Symbol</div>
        <Switch
          className="w-[40px]"
          checked={seriesConfig.showSymbol}
          onChange={value => {
            updateCellData(rowId, 'seriesConfig', { ...seriesConfig, showSymbol: value });
          }}
        />
      </div>

      <div className="flex flex-col gap-1">
        <div>Symbol Type</div>
        <Select
          className="w-[100px]"
          defaultValue="circle"
          options={SymbolOptions}
          onChange={value => {
            updateCellData(rowId, 'seriesConfig', { ...seriesConfig, symbol: value });
          }}
        />
      </div>

      <div className="flex flex-col gap-1">
        <div>Enable Area</div>
        <Switch
          className="w-[40px]"
          checked={seriesConfig.areaStyle}
          onChange={value => {
            updateCellData(rowId, 'seriesConfig', { ...seriesConfig, areaStyle: value ? {} : undefined });
          }}
        />
      </div>

      {/* <div className="flex flex-col gap-1">
        <div>Area Color</div>
        <ColorPicker
          showText
          style={{ width: 108 }}
          value={seriesConfig.areaStyle?.color}
          onChange={(_, color) => {
            updateCellData(rowId, 'seriesConfig', {
              ...seriesConfig,
              areaStyle: { ...seriesConfig.areaStyle, color },
            });
          }}
        />
      </div> */}
    </div>
  );
}
