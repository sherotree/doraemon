import { base64ToArrayBuffer } from './base64-to-array-buffer';
import { getBase64StringFromDataURL } from './get-base64-string-from-data-url';

export function dataURL2Unit8Array(dataURL: string) {
  const base64 = getBase64StringFromDataURL(dataURL as string);
  const arrayBuffer = base64ToArrayBuffer(base64);
  const data = new Uint8Array(arrayBuffer);

  return data;
}
