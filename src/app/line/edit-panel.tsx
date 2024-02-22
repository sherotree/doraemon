import { Button, Drawer } from 'antd';
import { useGlobalStore } from './store';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Table from './component/table/table-page';
import ReactECharts from 'echarts-for-react';
import { useEditDataStore } from './edit-data-store';

import { cloneDeep } from 'lodash';

export default function EditPanel(props) {
  const { columns, data } = useEditDataStore();
  const { setData, commonConfig, config, setColumns } = useGlobalStore();
  const { setOpen } = props;

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

  return (
    <Drawer
      width={1000}
      open
      title="Edit Data"
      onClose={() => setOpen(false)}
      styles={{
        header: { padding: '8px 12px' },
        body: {
          display: 'flex',
          flexDirection: 'column',
          padding: '8px 12px',
          gap: 16,
          justifyContent: 'space-between',
        },
      }}
      extra={
        <div className="inline-flex gap-2">
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            type="primary"
            onClick={() => {
              setData(cloneDeep(data));
              setColumns(cloneDeep(columns));
              setOpen(false);
            }}
          >
            Save
          </Button>
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
        <div className="bg-[var(--fig-color-bg-hover)] flex items-center justify-center py-6">
          <ReactECharts
            style={{ width: 500, height: 180, backgroundColor: '#ffffff' }}
            notMerge
            option={configOption}
            theme={commonConfig.theme}
            opts={{ renderer: 'svg' }}
          />
        </div>
      </div>
    </Drawer>
  );
}
