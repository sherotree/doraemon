'use client';

import { useState, useEffect } from 'react';
import { Excalidraw, exportToSvg, WelcomeScreen, Button, Footer } from '@excalidraw/excalidraw';
import data from './christmas-essentials.json';
import data2 from './data-processing.json';
import data3 from './stick-figures.json';
import { useUserStore } from './user-store';
import { getSvgStringFromElement } from '@/utils/get-svg-string-from-element';
import { emit } from './emit';
import Payment from './components/payment';

const ExcalidrawWrapper: React.FC = () => {
  const { setLanguage, setStorage, setDocumentUseCount, route, setRoute, storage } = useUserStore();
  const [excalidrawAPI, setExcalidrawAPI] = useState<any>(null);

  const isPro = storage?.license?.result === 'VALID';
  const isValid = isPro || storage?.documentUseCount < 3;

  return (
    <>
      {route === 'home' && (
        <Excalidraw
          excalidrawAPI={api => {
            setExcalidrawAPI(api);
          }}
          initialData={{
            // @ts-ignore
            libraryItems: [...data.libraryItems, ...data2.libraryItems, ...data3.libraryItems],
          }}
          gridModeEnabled
        >
          <WelcomeScreen />
          <Footer>
            <Button
              className="w-fit main-menu-trigger main-menu-trigger"
              style={{
                width: 'fit-content',
                height: 36,
                background: '#1a1a1a',
                color: '#fff',
                marginLeft: 40,
              }}
              onSelect={async () => {
                if (!isValid) {
                  setRoute('payment');
                  emit('resize-window', { width: 320, height: 618 });
                  return;
                }
                // @ts-ignore
                const svg: any = await exportToSvg({
                  elements: excalidrawAPI.getSceneElements(),
                  appState: excalidrawAPI.getAppState(),
                });
                const svgString = getSvgStringFromElement(svg);
                emit('create-from-svg', svgString);
              }}
            >
              Insert to Figma
            </Button>
          </Footer>
        </Excalidraw>
      )}
      {route === 'payment' && <Payment />}
    </>
  );
};

export default ExcalidrawWrapper;
