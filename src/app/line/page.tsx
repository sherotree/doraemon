'use client';

import { ConfigProvider, Segmented, Button, Drawer } from 'antd';
import { Chart } from './chart';
import { useState } from 'react';
import { useGlobalStore } from './store';
import { omit } from 'lodash';
import { useTheme } from 'fig-components';
import GeneralConfig from './component/general';
import AxisConfig from './component/axis';
import LegendConfig from './component/legend';
import GridConfig from './component/grid';
import DataPanel from './component/data-panel';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { IMMUTABLE_CONFIG } from './constants';
import Table from './component/table/table-page';
const typeOptions = ['General', 'Axis', 'Legend', 'Grid'];

export default function LinePage() {
  const { columns, data, commonConfig, config } = useGlobalStore();
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  const columnsOmitFirst = columns.slice(1);

  const configOption = {
    color: IMMUTABLE_CONFIG.color,
    title: { ...IMMUTABLE_CONFIG.title, ...commonConfig.title, ...config.title },
    xAxis: config.xAxis.map(x => ({
      ...x,
      ...IMMUTABLE_CONFIG.xAxis,
      ...commonConfig.xAxis,
      data: columnsOmitFirst.map((x: any) => x.label),
    })),
    yAxis: config.yAxis.map(y => ({ ...y, ...IMMUTABLE_CONFIG.yAxis, ...commonConfig.yAxis })),
    grid: { ...IMMUTABLE_CONFIG.grid, ...commonConfig.grid },
    legend: { ...IMMUTABLE_CONFIG.legend, ...commonConfig.legend },
    series: data.map((_data: any) => {
      const omitData = omit(_data, 'rowKey', 'seriesConfig');
      const seriesConfig = _data.seriesConfig;

      return { ...seriesConfig, data: Object.values(omitData) };
    }),
  };

  return (
    <ConfigProvider theme={theme}>
      <div className="p-4 flex gap-4 text-[12px] text-[var(--fig-color-text-secondary)]">
        <div className="flex-1 flex flex-col gap-2">
          <Chart option={configOption} />
          <DataPanel />
        </div>

        <div className="gap-3 w-[210px] flex-shrink-0">
          {/* <Segmented options={typeOptions} size="small" onChange={setConfigType} /> */}
          <div className="flex flex-col gap-3 w-[210px] flex-shrink-0 items-start">
            {/* General */}
            <GeneralConfig />
            {/* Axis */}
            <AxisConfig />
            {/* Series */}
            {/* {configType === 'Series' && <SeriesConfig />} */}
            {/* Legend */}
            <LegendConfig />
            {/* Grid */}
            <GridConfig />
            {/* Label */}

            <Button type="primary" onClick={() => setOpen(true)}>
              Edit Data
            </Button>
          </div>
        </div>
      </div>

      {open && (
        <Drawer width={800} open title="Edit Data" onClose={() => setOpen(false)}>
          <div>
            {columns?.length > 10 && <div>Only support columns less than 10</div>}
            {columns?.length <= 10 && (
              <DndProvider backend={HTML5Backend}>
                <Table />
              </DndProvider>
            )}
          </div>
        </Drawer>
      )}
    </ConfigProvider>
  );
}
