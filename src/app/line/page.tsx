'use client';

import { ConfigProvider, Segmented, Button, Drawer } from 'antd';
import { Chart } from './chart';
import { useState, useEffect } from 'react';
import { useGlobalStore } from './store';
import { omit } from 'lodash';
import { useTheme } from 'fig-components';
import GeneralConfig from './component/general';
import DataPanel from './component/data-panel';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Table from './component/table/table-page';
import { Panel, PanelGroup } from 'react-resizable-panels';
import { emit, on } from './emit';
import { useUserStore } from './user-store';
import ResizeHandle from './resize-handle';
import styles from './styles.module.css';
import { Header } from './component/header';

export default function LinePage() {
  const { columns, data, commonConfig, config } = useGlobalStore();
  const { setLanguage, setStorage, route, setDocumentUseCount } = useUserStore();
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  const columnsOmitFirst = columns.slice(1);

  const configOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985',
        },
      },
    },
    color: commonConfig.color,
    title: config.title.map(t => ({ ...t, ...commonConfig.title })),
    xAxis: config.xAxis.map(x => ({
      ...x,
      ...commonConfig.xAxis,
      data: columnsOmitFirst.map((x: any) => x.label),
    })),
    yAxis: config.yAxis.map(y => ({ ...y, ...commonConfig.yAxis })),
    grid: config.grid.map(g => ({ ...g, ...commonConfig.grid })),
    legend: config.legend.map(l => ({ ...l, ...commonConfig.legend })),
    visualMap: config.visualMap,
    series: data.map((_data: any) => {
      const omitData = omit(_data, 'rowKey', 'seriesConfig');
      const seriesConfig = _data.seriesConfig;

      return { ...seriesConfig, data: Object.values(omitData) };
    }),
    // dataZoom: config.dataZoom,
  };

  useEffect(() => {
    emit('get-storage');
    emit('get-document-use-count');
  }, []);

  useEffect(() => {
    on('get-storage', storage => {
      console.log('storage', storage);
      setStorage(storage);
      // const language = storage.language || i18n.language;
      // i18n.changeLanguage(language);
      // setLanguage(language);
      // setStorage(storage);
    });

    on('get-document-use-count', documentUseCount => {
      setDocumentUseCount(documentUseCount);
    });
  }, []);

  return (
    <ConfigProvider theme={theme}>
      <div className="p-4 flex gap-4 text-[12px] text-[var(--fig-color-text-secondary)] h-full">
        <div className="flex-1 flex flex-col gap-2 h-full">
          <PanelGroup autoSaveId="example" direction="vertical">
            <Panel className={styles.Panel} collapsible={true} defaultSize={20} order={1}>
              <DataPanel />
            </Panel>
            <ResizeHandle />
            <Panel className={styles.Panel} collapsible={true} order={2}>
              <Chart option={configOption} key={configOption.color.join('')} />
            </Panel>
          </PanelGroup>
        </div>

        <div className="gap-3 w-[240px] flex-shrink-0">
          <div className="flex flex-col gap-3 flex-shrink-0 items-start">
            <Header />
            <GeneralConfig />

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
