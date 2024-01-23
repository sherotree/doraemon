import { Button, Segmented, InputNumber } from 'antd';
import { useGlobalStore } from '../store';
import { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Table from './table/table-page';
import { uniqueId } from 'lodash';

const dataModeOptions = ['preset', 'random', 'customize'];

export default function DataPanel() {
  const { setData, setColumns, columns, data } = useGlobalStore();
  const [dataMode, setDataMode] = useState<string | number>(dataModeOptions[0]);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(100);
  const [count, setCount] = useState(10);
  const [trend, setTrend] = useState<string>('up');

  console.log(columns, 'columns', data);

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
            <div>Count</div>
            <InputNumber value={count} onChange={value => setCount(value!)} />
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

          <Button
            type="primary"
            className="w-[120px]"
            onClick={() => {
              const { columns, data } = generateRandomTableData(min, max, count, trend);

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

function generateRandomTableData(min: number, max: number, count: number, trend: string) {
  const data = [];
  const columns = [{ id: 'id', label: '' }];
  for (let i = 0; i < count; i++) {
    columns.push({
      id: 'col_' + uniqueId(),
      label: `Col ${i + 1}`,
    });
  }
  for (let i = 0; i < 1; i++) {
    const row = { id: `Sample ${uniqueId()}` };

    for (let j = 0; j < count + 1; j++) {
      // @ts-ignore
      row[columns[j].id] = j === 0 ? `Sample ${uniqueId()}` : Math.ceil(Math.random() * (max - min) + min);
    }
    data.push(row);
  }

  return { columns, data };
}
