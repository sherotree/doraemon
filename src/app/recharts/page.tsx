'use client';

import { useRef } from 'react';
import { emit } from './emit';
import { getSvgStringFromElement } from '@/utils/get-svg-string-from-element';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useStore } from './store';
import { Segmented, InputNumber } from 'antd';

export default function Recharts() {
  const ref = useRef(null!);
  const { properties, setProperties } = useStore();

  const foo: any = properties;

  return (
    <div className="flex">
      <div className="flex-1 h-[400px]">
        <LineChart
          ref={ref}
          onClick={() => {
            const svg = document.getElementsByClassName('recharts-surface')?.[0] as HTMLElement;
            const svgString = getSvgStringFromElement(svg);
            emit('create-from-svg', svgString);
          }}
          {...foo}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>
      </div>
      <div className="w-[360px]">
        <div>Properties</div>
        <div>
          <div>layout</div>
          <Segmented
            value={properties.layout}
            onChange={layout => {
              setProperties({ layout });
            }}
            options={[
              { value: 'horizontal', label: 'horizontal' },
              { value: 'vertical', label: 'vertical' },
            ]}
          />
        </div>
        <div>
          <div>width</div>
          <InputNumber
            value={properties.width}
            onChange={value => {
              setProperties({ width: value });
            }}
          />
        </div>
        <div>
          <div>height</div>
          <InputNumber
            value={properties.height}
            onChange={value => {
              setProperties({ height: value });
            }}
          />
        </div>
        <div>
          Margin
          <div className="flex">
            <div>
              <div>top</div>
              <InputNumber
                value={properties.margin.top}
                onChange={value => {
                  setProperties({ margin: { ...properties.margin, top: value } });
                }}
              />
            </div>
            <div>
              <div>right</div>
              <InputNumber
                value={properties.margin.right}
                onChange={value => {
                  setProperties({ margin: { ...properties.margin, right: value } });
                }}
              />
            </div>
            <div>
              <div>bottom</div>
              <InputNumber
                value={properties.margin.bottom}
                onChange={value => {
                  setProperties({ margin: { ...properties.margin, bottom: value } });
                }}
              />
            </div>
            <div>
              <div>left</div>
              <InputNumber
                value={properties.margin.left}
                onChange={value => {
                  setProperties({ margin: { ...properties.margin, left: value } });
                }}
              />
            </div>
          </div>
        </div>

        <div>Child Components</div>
        <div>XAxis</div>
      </div>
    </div>
  );
}
