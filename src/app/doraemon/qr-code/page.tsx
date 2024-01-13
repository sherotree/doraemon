'use client';

import { Input, ColorPicker, Button } from 'antd';
import { QRCodeSVG, QRCodeCanvas } from 'qrcode.react';
import { useState } from 'react';
import { emit } from '../emit';
import { dataURL2Unit8Array } from '@/utils/data-url-to-unit8-array';
import { getSvgStringFromElement } from '@/utils/get-svg-string-from-element';

const downloadPNG = () => {
  const canvas = document.getElementById('qr-png') as HTMLCanvasElement;
  const dataURL = canvas.toDataURL('image/png');
  const bytes = dataURL2Unit8Array(dataURL);

  emit('create-from-bytes', bytes);
};

const insertSVG = () => {
  const svg = document.getElementById('qr-svg') as HTMLElement;
  const svgString = getSvgStringFromElement(svg);
  emit('create-from-svg', svgString);
};

export default function QRCode() {
  const [value, setValue] = useState('https://reactjs.org/');
  const [fgColor, setFgColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#FFFFFF');

  return (
    <div className="flex flex-col gap-2">
      <Input value={value} onChange={e => setValue(e.target.value)} />

      <ColorPicker
        value={fgColor}
        onChange={(_, hex) => {
          setFgColor(hex);
        }}
      />

      <ColorPicker
        value={bgColor}
        onChange={(_, hex) => {
          setBgColor(hex);
        }}
      />

      <QRCodeSVG value={value} bgColor={bgColor} fgColor={fgColor} id="qr-svg" />

      <QRCodeCanvas value={value} bgColor={bgColor} fgColor={fgColor} id="qr-png" className="hidden" />

      <Button type="primary" onClick={downloadPNG}>
        Add as PNG
      </Button>
      <Button type="primary" onClick={insertSVG}>
        Add as SVG
      </Button>
    </div>
  );
}
