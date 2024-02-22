import { create } from 'zustand';

interface IProps {
  currentUser: User;
  setCurrentUser: (currentUser: User) => void;
  language: string;
  setLanguage: (language: string) => void;
  license: any;
  setLicense: (license: any) => void;
  storage: any;
  setStorage: (storage: any) => void;
  route: 'home' | 'payment';
  setRoute: (route: 'home' | 'payment') => void;
  subRoute: 'insert-text' | 'replace-text';
  setSubRoute: (subRoute: 'insert-text' | 'replace-text') => void;
  documentUseCount: number;
  setDocumentUseCount: (documentUseCount: number) => void;
}

export const useUserStore = create<IProps>(
  (set, get) =>
    ({
      currentUser: null,
      setCurrentUser: currentUser => set({ currentUser }),
      language: 'en',
      setLanguage: language => set({ language }),
      license: null,
      setLicense: license => set({ license }),
      storage: {},
      setStorage: storage => {
        set(state => ({ storage: { ...state.storage, ...storage } }));
      },
      route: 'home',
      setRoute: route => set({ route }),
      documentUseCount: 0,
      setDocumentUseCount: documentUseCount => set({ documentUseCount }),
      subRoute: 'replace-text',
      setSubRoute: subRoute => set({ subRoute }),
    }) as IProps,
);
