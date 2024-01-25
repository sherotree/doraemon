import { SAMPLES, DEFAULT_SERIES_CONFIG } from './constants';
import { uniqueId, omit } from 'lodash';

export function genColumnAndDataFromOption(sample) {
  const series = sample.series;
  const columns = sample.xAxis[0].data.reduce((acc: any, cur) => {
    acc.push({ id: cur, label: cur });
    return acc;
  }, []);
  columns.unshift({ id: 'rowKey', label: '' });

  const data: any = [];
  for (let i = 0; i < series.length; i++) {
    const row = { seriesConfig: { ...DEFAULT_SERIES_CONFIG, ...omit(sample.series[i], ['data']) } };

    for (let j = 0; j < columns.length; j++) {
      row[columns[j].id] = j === 0 ? `Sample ${uniqueId()}` : sample.series[i].data[j - 1];
    }
    data.push(row);
  }

  return { columns, data };
}
