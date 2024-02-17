'use client';

import { ConfigProvider, Button, Drawer } from 'antd';
import { useState, useEffect } from 'react';
import { useGlobalStore } from './store';
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
import ReactECharts from 'echarts-for-react';
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
    series: data.map((item: any) => {
      const seriesConfig = item.seriesConfig;
      const _data = columnsOmitFirst.map((x: any) => item[x.id]);
      return { ...seriesConfig, data: _data };
    }),
    // dataZoom: config.dataZoom,
  };

  useEffect(() => {
    emit('get-storage');
    emit('get-document-use-count');
  }, []);

  useEffect(() => {
    on('get-storage', storage => {
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
              <div className="bg-[var(--fig-color-bg-hover)] px-4 py-4" key={configOption.color.join('')}>
                <ReactECharts
                  style={{ width: '100%', height: 240, backgroundColor: '#ffffff' }}
                  notMerge
                  option={configOption}
                  theme={commonConfig.theme}
                  opts={{ renderer: 'svg' }}
                />
              </div>
            </Panel>
          </PanelGroup>
        </div>

        <div className="gap-3 w-[240px] flex-shrink-0">
          <div className="flex flex-col gap-3 flex-shrink-0 items-start">
            <Header />
            <GeneralConfig />

            <div>
              <div className="text-[11px] text-[var(--fig-color-text-secondary)] mb-1">Data</div>
              <div className="inline-flex gap-1">
                <Button>Random</Button>
                <Button onClick={() => setOpen(true)}>Edit</Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {open && (
        <Drawer
          width={1000}
          open
          title="Edit Data"
          onClose={() => setOpen(false)}
          headerStyle={{ padding: '8px 12px' }}
          bodyStyle={{
            display: 'flex',
            flexDirection: 'column',
            padding: '8px 12px',
            gap: 16,
            justifyContent: 'space-between',
          }}
          extra={
            <div className="inline-flex gap-2">
              <Button>Cancel</Button>
              <Button type="primary">Save</Button>
            </div>
          }
        >
          <div>
            {columns?.length > 100 && <div>Only support columns less than 10</div>}
            {columns?.length <= 100 && (
              <DndProvider backend={HTML5Backend}>
                <Table />
              </DndProvider>
            )}
          </div>
          <div>
            <div className="bg-[var(--fig-color-bg-hover)] px-6 py-8">
              <ReactECharts
                style={{ width: '100%', height: 240, backgroundColor: '#ffffff' }}
                notMerge
                option={configOption}
                theme={commonConfig.theme}
                opts={{ renderer: 'svg' }}
              />
            </div>
          </div>
        </Drawer>
      )}
    </ConfigProvider>
  );
}
