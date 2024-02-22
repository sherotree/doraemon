'use client';

import { ConfigProvider } from 'antd';
import { useEffect } from 'react';
import { useTheme, RefreshIcon, StudyIcon } from 'fig-components';
import { emit, on } from './emit';
import { useUserStore } from './user-store';
import i18n from 'i18next';
import { initI18next } from './i18n';
import Payment from './component/header/payment';
import Home from './home';

initI18next();

export default function LinePage() {
  const { setLanguage, setStorage, setDocumentUseCount, route } = useUserStore();

  const theme = useTheme();

  useEffect(() => {
    emit('get-storage');
    emit('get-document-use-count');
  }, []);

  useEffect(() => {
    on('get-storage', storage => {
      setStorage(storage);
      const language = storage?.language || i18n.language;
      i18n.changeLanguage(language);
      setLanguage(language);
      setStorage(storage);
      console.log('storage', storage);
    });

    on('get-document-use-count', documentUseCount => {
      setDocumentUseCount(documentUseCount);
    });
  }, []);

  return (
    <ConfigProvider theme={theme}>
      {route === 'home' && <Home />}
      {route === 'payment' && <Payment />}
    </ConfigProvider>
  );
}
