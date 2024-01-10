'use client';

import P1 from './1.png';
import Image from 'next/image';
import { emit } from '../emit';
import { dataURL2Unit8Array } from '../utils/data-url-to-unit8-array';

export default function Png() {
  return (
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
  );
}
