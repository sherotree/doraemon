'use client';

import { Input, Tooltip, message, Spin } from 'antd';
import { useState } from 'react';
import { useTimeout } from 'fig-components';
import COLOR_TOKENS from './color-token.json';
import copy from 'copy-text-to-clipboard';

export default function SemanticColorTokens() {
  const [list, setList] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  useTimeout(() => {
    setLoading(false);
    setList(COLOR_TOKENS);
  }, 200);

  const handleCopy = (text: string) => {
    copy(text);
    message.success(`${text} copied 🎉`);
  };

  return (
    <Spin spinning={loading}>
      <div className="overflow-hidden text-xs max-w-[420px]">
        <div className="mt-3 px-2">
          <Input.Search
            placeholder="Type keyword to search"
            allowClear
            onChange={e => {
              const value = e.target.value;

              setList(
                COLOR_TOKENS.filter(
                  x =>
                    x.token.includes(value) ||
                    x.light.includes(value) ||
                    x.dark.includes(value) ||
                    x.figjam.includes(value),
                ),
              );
            }}
          />
        </div>

        <div className="mt-3 flex items-center justify-between px-2 font-bold">
          <div>token</div>
          <div className="flex gap-3">
            <div className="w-8">light</div>
            <div className="w-8">dark</div>
            <div className="w-8">figjam</div>
          </div>
        </div>

        <div style={{ height: '600px' }} className="my-3 flex flex-col gap-2 overflow-auto px-2">
          {list.map((x: any) => {
            return (
              <div key={x.token} className="flex items-center justify-between gap-1">
                <span
                  className="cursor-pointer"
                  onClick={() => {
                    handleCopy(x.token);
                  }}
                >
                  {x.token}
                </span>
                <div className="flex gap-3">
                  <Tooltip title={x.light}>
                    <div
                      onClick={() => {
                        handleCopy(x.light);
                      }}
                      className="h-7 w-7 cursor-pointer"
                      style={{ border: `1px solid var(--figma-color-border)`, background: x.light }}
                    />
                  </Tooltip>
                  <Tooltip title={x.dark}>
                    <div
                      onClick={() => {
                        handleCopy(x.dark);
                      }}
                      className="h-7 w-7 cursor-pointer"
                      style={{ border: `1px solid var(--figma-color-border)`, background: x.dark }}
                    />
                  </Tooltip>
                  <Tooltip title={x.figjam}>
                    <div
                      onClick={() => {
                        handleCopy(x.figjam);
                      }}
                      className="h-7 w-7 cursor-pointer"
                      style={{ border: `1px solid var(--figma-color-border)`, background: x.figjam }}
                    />
                  </Tooltip>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Spin>
  );
}
