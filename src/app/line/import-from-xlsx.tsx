import * as ExcelJS from 'exceljs';
import { Upload } from './Upload';
import { useGlobalStore } from './store';

export function ImportFromXLSX() {
  const { data, setData, setColumns } = useGlobalStore();

  return (
    <Upload
      key={Math.random()}
      accept=".xlsx"
      desc="Import from xlsx"
      onChange={buffer => {
        const workbook = new ExcelJS.Workbook();
        const collections = [];

        workbook.xlsx.load(buffer).then(workbook => {
          const len = workbook.worksheets.length;

          workbook.eachSheet((sheet, index) => {
            const collection: any = {};
            collection.name = sheet.name;
            let columns = [];
            const _data = [];

            sheet.eachRow((row, rowIndex) => {
              if (rowIndex === 1) {
                const firstRow = row.values as ExcelJS.CellValue[];
                columns = firstRow;
                return;
              }

              const rowKey = row.getCell(1).value as string;
              let variable: any = { rowKey, seriesConfig: data[0].seriesConfig };

              columns.forEach((item, index) => {
                if (index === 0) return;
                const cellValue = row.getCell(index).value as string;
                variable[columns[index]] = cellValue;
              });
              _data.push(variable);
            });
            collection.data = _data;
            collections.push(collection);

            if (len === index) {
              const _columns = columns
                .filter(x => x)
                .map((item, index) => {
                  return {
                    id: item,
                    label: item,
                  };
                });
              setData(collections[0].data);
              setColumns([{ id: 'rowKey', label: '' }, ..._columns]);
            }
          });
        });
      }}
    />
  );
}
