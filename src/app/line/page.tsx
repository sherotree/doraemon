'use client';

import { ConfigProvider, Button, Drawer } from 'antd';
import { useState, useEffect, useRef } from 'react';
import { useGlobalStore } from './store';
import { useTheme, RefreshIcon, StudyIcon } from 'fig-components';
import GeneralConfig from './component/general';
import DataPanel from './component/data-panel';
import { Panel, PanelGroup } from 'react-resizable-panels';
import { emit, on } from './emit';
import { useUserStore } from './user-store';
import ResizeHandle from './resize-handle';
import styles from './styles.module.css';
import ReactECharts from 'echarts-for-react';
import { Header } from './component/header';
import { useEditDataStore } from './edit-data-store';
import { omit, pick, cloneDeep } from 'lodash';
import EditPanel from './edit-panel';
import { ImportFromXLSX } from './import-from-xlsx';
import i18n from 'i18next';
import { initI18next } from './i18n';

initI18next();

export default function LinePage() {
  const { columns, data, commonConfig, config, setData } = useGlobalStore();
  const { setLanguage, setStorage, setDocumentUseCount } = useUserStore();
  const editDataStore = useEditDataStore();
  const [open, setOpen] = useState(false);
  const ref = useRef<any>(null!);
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
      return { ...seriesConfig, data: _data, name: item.rowKey };
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
      const language = storage.language || i18n.language;
      i18n.changeLanguage(language);
      setLanguage(language);
      setStorage(storage);
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
                  ref={ref}
                />
              </div>
            </Panel>
          </PanelGroup>
        </div>

        <div className="gap-3 w-[240px] flex-shrink-0 relative h-full flex flex-col justify-between">
          <div className="flex flex-col gap-3 flex-shrink-0 items-start">
            <Header />
            <GeneralConfig />

            <div>
              <div className="text-[11px] text-[var(--fig-color-text-secondary)] mb-1">Data</div>
              <div className="flex gap-2 flex-wrap">
                <Button
                  onClick={() => {
                    const _data = [];
                    data.forEach((item: any, index: number) => {
                      const omitData = omit(item, ['seriesConfig', 'rowKey']);
                      const current = pick(item, ['seriesConfig', 'rowKey']);
                      const randomData = {};
                      Object.keys(omitData).forEach(key => {
                        const randomValue = Math.random();
                        const isOdd = Math.ceil(randomValue * 10) % 2 === 0;
                        const ratio = Math.min(Math.max(isOdd ? 1 + randomValue : 1 - randomValue, 0.6), 1.4);
                        randomData[key] = Math.ceil(omitData[key] * ratio);
                      });
                      _data.push({ ...current, ...randomData });
                    });
                    setData(_data);
                  }}
                >
                  <div className="inline-flex gap-2 items-center">
                    <RefreshIcon className="w-4 h-4" />
                    Random
                  </div>
                </Button>
                <Button
                  onClick={() => {
                    setOpen(true);
                    editDataStore.setData(cloneDeep(data));
                    editDataStore.setColumns(cloneDeep(columns));
                  }}
                >
                  <div className="inline-flex gap-2 items-center">
                    <StudyIcon className="w-4 h-4" />
                    Edit
                  </div>
                </Button>
                <ImportFromXLSX />
              </div>
            </div>
          </div>
          <Button
            type="primary"
            className="w-full"
            onClick={() => {
              const echartInstance = ref.current.getEchartsInstance();
              const base64 = echartInstance.getDataURL();
              const svg: any = decodeURIComponent(base64).replace('data:image/svg+xml;charset=UTF-8,', '');
              emit('create-from-svg', svg);
            }}
          >
            Insert to Figma
          </Button>
        </div>
      </div>

      {open && <EditPanel setOpen={setOpen} />}
    </ConfigProvider>
  );
}
