import { create } from 'zustand';

const upColor = '#ec0000';
const downColor = '#00da3c';

type State = {
  config: any;
  setConfig: (config: any) => void;
};

export const useStore = create<State>(set => ({
  config: {
    theme: 'dark',
    titleText: 'Candlestick Charts',
    XAxisShow: true,
    YAxisShow: true,
    positiveColor: upColor,
    negativeColor: downColor,
  },
  setConfig: config => set(state => ({ config: { ...state.config, ...config } })),
}));
