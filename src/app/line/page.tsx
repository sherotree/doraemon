'use client';

import { Chart } from './chart';
import { useStore } from './store';

export default function LinePage() {
  const { config, setConfig } = useStore();

  return (
    <div className="p-4 flex gap-4 text-[12px] text-[var(--fig-color-text-secondary)]">
      <div className="flex-1">
        <Chart />
      </div>
      <div>Config</div>
    </div>
  );
}
