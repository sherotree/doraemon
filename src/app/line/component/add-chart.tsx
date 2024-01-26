import { Button, Segmented, InputNumber, Switch, Drawer } from 'antd';
import { useGlobalStore } from '../store';
import { useState } from 'react';
import { uniqueId } from 'lodash';
import { useSetState } from 'fig-components';
import { DEFAULT_SERIES_CONFIG, IMMUTABLE_CONFIG } from '../constants';

export default function AddChart() {
  const { setData, setColumns, columns, data, setConfig, setCustomTemplates, customTemplates } = useGlobalStore();
  const [open, setOpen] = useState(false);
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
    titleText: 'Chart Title',
  });

  return (
    <>
      <div
        style={{ width: 200, height: 120 }}
        className="flex items-center justify-center"
        onClick={() => {
          setOpen(true);
        }}
      >
        + Add New
      </div>
      {open && (
        <Drawer open title="Add Chart" onClose={() => setOpen(false)}>
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
                const { columns, data, seriesData, xAxisData } = generateRandomTableData({
                  min,
                  max,
                  count,
                  trend,
                  seriesCount,
                  ...seriesConfig,
                });

                const id = Math.random().toString(36).substring(7);
                const BASIC_LINE_CHART = {
                  id,
                  title: [{ ...IMMUTABLE_CONFIG.title, text: seriesConfig.titleText }],
                  legend: [IMMUTABLE_CONFIG.legend],
                  grid: [
                    {
                      containLabel: true,
                      top: 40,
                      right: '3%',
                      left: '3%',
                      bottom: '3%',
                      backgroundColor: 'transparent',
                      borderWidth: 1,
                    },
                  ],
                  xAxis: [{ data: xAxisData, type: 'category', name: '' }],
                  yAxis: [
                    {
                      type: 'value',
                      name: '',
                    },
                  ],
                  visualMap: [],
                  // series: [{ data: [150, 230, 224, 218, 135, 147, 260], type: 'line' }],
                  series: seriesData.map((data: any) => ({
                    data,
                    type: 'line',
                    name: `series_${uniqueId()}`,
                    showSymbol: seriesConfig.showSymbol,
                    smooth: seriesConfig.smooth,
                    areaStyle: seriesConfig.areaStyle,
                    symbolSize: seriesConfig.symbolSize,
                  })),
                };
                setCustomTemplates([BASIC_LINE_CHART, ...customTemplates]);

                // setData(data);
                // setColumns(columns);
                // setConfig({
                //   title: [{ ...IMMUTABLE_CONFIG.title, text: seriesConfig.titleText }],
                //   legend: [IMMUTABLE_CONFIG.legend],
                //   grid: [IMMUTABLE_CONFIG.grid],
                //   yAxis: [IMMUTABLE_CONFIG.yAxis],
                //   visualMap: [],
                // });
              }}
            >
              Generate Data
            </Button>
          </div>
        </Drawer>
      )}
    </>
  );
}

function generateRandomTableData(params) {
  const { min, max, count, trend, seriesCount, showSymbol, smooth, areaStyle, symbolSize } = params;
  const data: any = [];
  const columns = [{ id: 'rowKey', label: '' }];
  const xAxisData = [];
  const seriesData = [];
  for (let i = 0; i < count; i++) {
    xAxisData.push(`Col_${i}`);
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
      // @ts-ignore
      row[columns[j].id] = j === 0 ? `Sample ${uniqueId()}` : randomArray[j - 1];
    }
    seriesData.push(randomArray);
    data.push(row);
  }

  return { columns, data, seriesData, xAxisData };
}
