let base = +new Date(1968, 9, 3);
let oneDay = 24 * 3600 * 1000;
let date = [];
let data = [Math.random() * 300];
for (let i = 1; i < 20000; i++) {
  var now = new Date((base += oneDay));
  date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
  data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]));
}
export const LARGE_AREA_CHART = {
  id: 'large-area-chart',
  title: [
    {
      textStyle: {
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: 'bold',
      },
      padding: 8,
      text: 'Large Area Chart',
    },
  ],
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      data: date,
    },
  ],
  grid: [
    {
      containLabel: true,
      top: 40,
      right: '3%',
      left: '3%',
      bottom: '3%',
      backgroundColor: 'transparent',
      borderWidth: 1,
    },
  ],
  yAxis: [
    {
      type: 'value',
      boundaryGap: [0, '100%'],
    },
  ],
  dataZoom: [
    {
      type: 'inside',
      start: 0,
      end: 10,
    },
    {
      start: 0,
      end: 10,
    },
  ],
  series: [
    {
      name: 'Fake Data',
      type: 'line',
      symbol: 'none',
      sampling: 'lttb',
      itemStyle: {
        color: 'rgb(255, 70, 131)',
      },
      areaStyle: {},
      data: data,
    },
  ],
};
