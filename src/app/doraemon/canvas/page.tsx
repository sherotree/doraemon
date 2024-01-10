'use client';

import React, { useRef, useEffect } from 'react';
import { emit } from '../emit';
import { dataURL2Unit8Array } from '../utils/data-url-to-unit8-array';

export default function Canvas() {
  const canvasRef = useRef<any>(null!);

  const draw = (ctx: any) => {
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(50, 100, 20, 0, 2 * Math.PI);
    ctx.fill();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    draw(context);
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      onClick={() => {
        const canvas = canvasRef.current;
        const dataURL = canvas.toDataURL('image/png');
        const bytes = dataURL2Unit8Array(dataURL);
        emit('create-from-bytes', bytes);
      }}
    />
  );
}
