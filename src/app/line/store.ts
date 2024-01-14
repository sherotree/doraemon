import { create } from 'zustand';

type State = {
  config: any;
  setConfig: (config: any) => void;
};

export const useStore = create<State>(set => ({
  config: {
    theme: 'dark',
  },
  setConfig: config => set(state => ({ config: { ...state.config, ...config } })),
}));
