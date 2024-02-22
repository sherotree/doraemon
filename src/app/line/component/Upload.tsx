'use client';

import { useRef, useState } from 'react';
import { UploadIcon } from 'fig-components';
import { Button } from 'antd';

interface IProps {
  accept?: string;
  onChange?: (buffer: ArrayBuffer) => void;
  desc?: string;
}

export function Upload(props: IProps) {
  const { accept, onChange, desc = 'Import JSON in format' } = props;
  const csvInputRef = useRef(null);
  const [file, setFile] = useState(null);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    const file = e.target.files[0];
    setFile(file);

    if (file) {
      fileReader.onload = async function () {
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);

        reader.onload = () => {
          const buffer = reader.result as ArrayBuffer;
          onChange?.(buffer);
        };
      };

      fileReader.onloadend = function () {};

      fileReader.readAsText(file);
    }
  };

  return (
    <div className="relative cursor-pointer" onClick={() => csvInputRef.current.click()}>
      <span className="text-[#007bef]">Import data from xlsx file</span>
      <input
        type="file"
        ref={csvInputRef}
        title={null}
        accept={accept}
        onChange={handleOnChange}
        className="absolute hidden h-full w-full cursor-pointer opacity-0"
      />
    </div>
  );

  // return (
  //   <Button className="relative cursor-pointer" onClick={() => csvInputRef.current.click()}>
  //     <div className="flex items-center justify-center gap-2">
  //       <UploadIcon className="h-4 w-4" />
  //       <div>{desc}</div>
  //     </div>
  //     <input
  //       type="file"
  //       ref={csvInputRef}
  //       title={null}
  //       accept={accept}
  //       onChange={handleOnChange}
  //       className="absolute hidden h-full w-full cursor-pointer opacity-0"
  //     />
  //   </Button>
  // );
}
