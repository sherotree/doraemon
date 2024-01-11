'use client';

import P1 from './1.png';
import Image from 'next/image';
import { emit } from '../emit';
import { dataURL2Unit8Array } from '../utils/data-url-to-unit8-array';
import { toPng, toSvg, toCanvas, toPixelData } from 'html-to-image';
import { useRef } from 'react';

export default function Png() {
  const ref = useRef<HTMLDivElement>(null!);
  return (
    <div>
      <div
        className="w-[120px] bg-[#1a1a1a]"
        ref={ref}
        onClick={() => {
          toPng(ref.current).then(dataUrl => {
            const bytes = dataURL2Unit8Array(dataUrl);
            emit('create-from-bytes', bytes);
          });
          toCanvas(ref.current).then(canvas => {
            const dataURL = canvas.toDataURL('image/png');
            const bytes = dataURL2Unit8Array(dataURL);
            emit('create-from-bytes', bytes);
          });

          // toPixelData(ref.current).then(bytes => {
          //   // console.log(dataUrl, 'toPixelData');
          //   emit('create-from-bytes', bytes);
          // });

          // toSvg(ref.current).then(dataUrl => {
          //   console.log(dataUrl);
          //   // const bytes = dataURL2Unit8Array(dataUrl);

          //   // emit('create-from-bytes', bytes);
          // });
        }}
      >
        <div className="bg-[#ff8899]">H1</div>
        <div className="text-white">H2</div>
      </div>
      <Image
        src={P1}
        alt=""
        onClick={e => {
          const target = e.target as HTMLImageElement;
          fetch(target.src)
            .then(res => res.blob())
            .then(blob => {
              const reader = new FileReader();
              reader.readAsDataURL(blob);
              reader.onloadend = function () {
                const bytes = dataURL2Unit8Array(reader.result as string);

                emit('create-from-bytes', bytes);
              };
            });
        }}
      />
    </div>
  );
}
