export const BASIC_LINE_CHART = {
  title: { text: 'Basic Line Chart' },
  legend: {},
  grid: {},
  xAxis: [{ data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], type: 'category' }],
  yAxis: { type: 'value' },
  series: [{ data: [150, 230, 224, 218, 135, 147, 260], type: 'line' }],
};

export const SMOOTHED_LINE_CHART = {
  title: { text: 'Smoothed Line Chart' },
  legend: {},
  grid: {},
  xAxis: [{ data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], type: 'category' }],
  yAxis: { type: 'value' },
  series: [{ data: [820, 932, 901, 934, 1290, 1330, 1320], type: 'line', smooth: true }],
};

export const BASIC_AREA_CHART = {
  title: { text: 'Basic area chart' },
  legend: {},
  grid: {},
  xAxis: [{ type: 'category', boundaryGap: false, data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] }],
  yAxis: { type: 'value' },
  series: [{ data: [820, 932, 901, 934, 1290, 1330, 1320], type: 'line', areaStyle: {} }],
};

export const STACKED_LINE_CHART = {
  title: { text: 'Stacked Line Chart' },
  xAxis: [{ type: 'category', boundaryGap: false, data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] }],
  yAxis: { type: 'value' },
  legend: {
    data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine'],
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true,
  },
  series: [
    {
      name: 'Email',
      type: 'line',
      stack: 'Total',
      data: [120, 132, 101, 134, 90, 230, 210],
    },
    {
      name: 'Union Ads',
      type: 'line',
      stack: 'Total',
      data: [220, 182, 191, 234, 290, 330, 310],
    },
    {
      name: 'Video Ads',
      type: 'line',
      stack: 'Total',
      data: [150, 232, 201, 154, 190, 330, 410],
    },
    {
      name: 'Direct',
      type: 'line',
      stack: 'Total',
      data: [320, 332, 301, 334, 390, 330, 320],
    },
    {
      name: 'Search Engine',
      type: 'line',
      stack: 'Total',
      data: [820, 932, 901, 934, 1290, 1330, 1320],
    },
  ],
};

export const SAMPLES = [BASIC_LINE_CHART, SMOOTHED_LINE_CHART, BASIC_AREA_CHART, STACKED_LINE_CHART];

export const DEFAULT_SERIES_CONFIG = {
  type: 'line',
  name: 'Line',
  symbol: 'circle',
  symbolSize: 6,
  showSymbol: false,
  smooth: true,
  areaStyle: undefined,
};
