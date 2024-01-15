import { create } from 'zustand';

const lineColor = '#186FE6';

type State = {
  config: any;
  setConfig: (config: any) => void;
};

export const useStore = create<State>(set => ({
  config: {
    theme: 'dark',
    title: 'Line Charts',
    titleShow: true,
    XAxisShow: true,
    YAxisShow: true,
    lineColor,
    smooth: false,
    enableSymbol: true,
    symbol: 'circle',
  },
  setConfig: config => set(state => ({ config: { ...state.config, ...config } })),
}));
