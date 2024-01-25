import { Button, Segmented, InputNumber, Switch } from 'antd';
import { useGlobalStore } from '../store';
import { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Table from './table/table-page';
import PresetCharts from './preset-charts';
import { set, uniqueId } from 'lodash';
import { useSetState } from 'fig-components';
import { DEFAULT_SERIES_CONFIG } from '../constants';

const dataModeOptions = ['preset', 'random'];

export default function DataPanel() {
  const { setData, setColumns, columns, data } = useGlobalStore();
  const [dataMode, setDataMode] = useState<string | number>(dataModeOptions[0]);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(100);
  const [count, setCount] = useState(10);
  const [seriesCount, setSeriesCount] = useState(1);
  const [trend, setTrend] = useState<string>('up');
  const [seriesConfig, setSeriesConfig] = useSetState<any>({
    showSymbol: false,
    smooth: false,
    areaStyle: undefined,
    symbolSize: 6,
  });

  return (
    <div>
      <Segmented options={dataModeOptions} onChange={setDataMode} />
      {dataMode === 'customize' && (
        <div>
          {columns?.length > 10 && <div>Only support columns less than 10</div>}
          {columns?.length <= 10 && (
            <DndProvider backend={HTML5Backend}>
              <Table />
            </DndProvider>
          )}
        </div>
      )}
      {dataMode === 'preset' && <PresetCharts />}
      {dataMode === 'random' && (
        <div className="flex flex-col gap-2">
          <div>
            <div>Min</div>
            <InputNumber value={min} onChange={value => setMin(value!)} />
          </div>
          <div>
            <div>Max</div>
            <InputNumber value={max} onChange={value => setMax(value!)} />
          </div>
          <div>
            <div>Data Count</div>
            <InputNumber value={count} onChange={value => setCount(value!)} />
          </div>
          <div>
            <div>Series Count</div>
            <InputNumber value={seriesCount} onChange={value => setSeriesCount(value!)} />
          </div>
          <div>
            <div>Trend</div>
            <Segmented
              options={['up', 'down', 'random']}
              onChange={value => {
                setTrend(value as string);
              }}
            />
          </div>
          <div>
            <div>Show Symbol</div>
            <Switch
              className="w-[40px]"
              checked={seriesConfig.showSymbol}
              onChange={value => {
                setSeriesConfig({ showSymbol: value });
              }}
            />
          </div>
          <div>
            <div>smooth</div>
            <Switch
              className="w-[40px]"
              checked={seriesConfig.smooth}
              onChange={value => {
                setSeriesConfig({ smooth: value });
              }}
            />
          </div>
          <div>
            <div>areaStyle</div>
            <Switch
              className="w-[40px]"
              checked={!!seriesConfig.areaStyle}
              onChange={value => {
                setSeriesConfig({ areaStyle: value ? {} : undefined });
              }}
            />
          </div>
          <div>
            <div>symbolSize</div>
            <InputNumber value={seriesConfig.symbolSize} onChange={value => setSeriesConfig({ symbolSize: value })} />
          </div>
          <Button
            type="primary"
            className="w-[120px]"
            onClick={() => {
              const { columns, data } = generateRandomTableData({
                min,
                max,
                count,
                trend,
                seriesCount,
                ...seriesConfig,
              });

              setData(data);
              setColumns(columns);
            }}
          >
            Generate Data
          </Button>
        </div>
      )}
    </div>
  );
}

function generateRandomTableData(params) {
  const { min, max, count, trend, seriesCount, showSymbol, smooth, areaStyle, symbolSize } = params;
  const data: any = [];
  const columns = [{ id: 'rowKey', label: '' }];
  for (let i = 0; i < count; i++) {
    columns.push({
      id: 'col_' + uniqueId(),
      label: `Col ${i + 1}`,
    });
  }
  for (let i = 0; i < seriesCount; i++) {
    const row = { seriesConfig: { ...DEFAULT_SERIES_CONFIG, showSymbol, smooth, areaStyle, symbolSize } };

    const randomArray = Array.from({ length: count }, () => Math.ceil(Math.random() * (max - min) + min));
    if (trend === 'up') {
      randomArray.sort((a, b) => a - b);
    } else if (trend === 'down') {
      randomArray.sort((a, b) => b - a);
    }

    for (let j = 0; j < columns.length; j++) {
      row[columns[j].id] = j === 0 ? `Sample ${uniqueId()}` : randomArray[j - 1];
    }

    data.push(row);
  }

  return { columns, data };
}
