import { RAINFALL_VS_EVAPORATION } from './data/grid-multiple';
import { LARGE_AREA_CHART } from './data/area-simple';
import { MULTIPLE_X_AXES } from './data/multiple-x-axis';

export const IMMUTABLE_CONFIG: any = {
  grid: {
    containLabel: true,
    top: 40,
    right: '3%',
    left: '3%',
    bottom: '3%',
    backgroundColor: 'transparent',
    borderWidth: 1,
  },
  title: {
    textStyle: {
      fontSize: 14,
      fontStyle: 'normal',
      fontWeight: 'bold',
    },
    padding: 8,
  },
  color: ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'],
  xAxis: {
    type: 'category',
    name: '',
  },
  yAxis: {
    type: 'value',
    name: '',
  },
  legend: {
    orient: 'horizontal', // 'horizontal', 'vertical'
    padding: 8,
    right: '3%',
  },
};

export const SMALL_CHART_IMMUTABLE_CONFIG = {
  title: {
    textStyle: {
      fontSize: 8,
      fontStyle: 'normal',
      // fontWeight: 'bold',
    },
  },
};

const names = ['Orange', 'Tomato', 'Apple', 'Sakana', 'Banana', 'Snappy Fish', 'Lemon', 'Pasta'];
const years = ['2001', '2002', '2003', '2004', '2005', '2006'];
const shuffle = array => {
  let currentIndex = array.length;
  let randomIndex = 0;
  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
};
const generateRankingData = () => {
  const map = new Map();
  const defaultRanking = Array.from({ length: names.length }, (_, i) => i + 1);
  for (const _ of years) {
    const shuffleArray = shuffle(defaultRanking);
    names.forEach((name, i) => {
      map.set(name, (map.get(name) || []).concat(shuffleArray[i]));
    });
  }
  return map;
};
const generateSeriesList = () => {
  const seriesList: any = [];
  const rankingMap = generateRankingData();
  rankingMap.forEach((data, name) => {
    const series = {
      name,
      symbolSize: 10,
      type: 'line',
      smooth: true,
      emphasis: {
        focus: 'series',
      },
      lineStyle: {
        width: 4,
      },
      data,
    };
    seriesList.push(series);
  });
  return seriesList;
};

const BUMP_CHART = {
  title: [{ ...IMMUTABLE_CONFIG.title, text: 'Bump Chart (Ranking)' }],
  legend: [IMMUTABLE_CONFIG.legend],
  grid: [IMMUTABLE_CONFIG.grid],
  xAxis: [
    {
      data: years,
      type: 'category',
      splitLine: {
        show: true,
      },
    },
  ],
  yAxis: [IMMUTABLE_CONFIG.yAxis],
  visualMap: [],
  series: generateSeriesList(),
};

const BASIC_LINE_CHART = {
  id: 'basic-line-chart',
  title: [{ ...IMMUTABLE_CONFIG.title, text: 'Basic Line Chart' }],
  legend: [IMMUTABLE_CONFIG.legend],
  grid: [IMMUTABLE_CONFIG.grid],
  xAxis: [{ data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], type: 'category' }],
  yAxis: [IMMUTABLE_CONFIG.yAxis],
  visualMap: [],
  series: [{ data: [150, 230, 224, 218, 135, 147, 260], type: 'line', name: 'count' }],
};

const SMOOTHED_LINE_CHART = {
  id: 'smoothed-line-chart',
  title: [{ ...IMMUTABLE_CONFIG.title, text: 'Smoothed Line Chart' }],
  legend: [IMMUTABLE_CONFIG.legend],
  grid: [IMMUTABLE_CONFIG.grid],
  xAxis: [{ data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], type: 'category' }],
  yAxis: [IMMUTABLE_CONFIG.yAxis],
  visualMap: [],
  series: [{ data: [820, 932, 901, 934, 1290, 1330, 1320], type: 'line', smooth: true, name: 'count' }],
};

const BASIC_AREA_CHART = {
  id: 'basic-area-chart',
  title: [{ ...IMMUTABLE_CONFIG.title, text: 'Basic area chart' }],
  legend: [IMMUTABLE_CONFIG.legend],
  grid: [IMMUTABLE_CONFIG.grid],
  xAxis: [{ type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] }],
  yAxis: [IMMUTABLE_CONFIG.yAxis],
  visualMap: [],
  series: [{ data: [820, 932, 901, 934, 1290, 1330, 1320], type: 'line', areaStyle: {}, name: 'count' }],
};

const STACKED_LINE_CHART = {
  id: 'stacked-line-chart',
  title: [{ ...IMMUTABLE_CONFIG.title, text: 'Stacked Line Chart' }],
  xAxis: [{ type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] }],
  yAxis: [IMMUTABLE_CONFIG.yAxis],
  visualMap: [],
  legend: [IMMUTABLE_CONFIG.legend],
  grid: [IMMUTABLE_CONFIG.grid],
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

const STACKED_AREA_CHART = {
  id: 'stacked-area-chart',
  title: [{ ...IMMUTABLE_CONFIG.title, text: 'Stacked Area Chart' }],
  legend: [IMMUTABLE_CONFIG.legend],
  grid: [IMMUTABLE_CONFIG.grid],
  xAxis: [{ data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], type: 'category' }],
  yAxis: [IMMUTABLE_CONFIG.yAxis],
  visualMap: [],
  series: [
    {
      name: 'Email',
      type: 'line',
      stack: 'Total',
      areaStyle: {},
      data: [120, 132, 101, 134, 90, 230, 210],
    },
    {
      name: 'Union Ads',
      type: 'line',
      stack: 'Total',
      areaStyle: {},
      data: [220, 182, 191, 234, 290, 330, 310],
    },
    {
      name: 'Video Ads',
      type: 'line',
      stack: 'Total',
      areaStyle: {},
      data: [150, 232, 201, 154, 190, 330, 410],
    },
    {
      name: 'Direct',
      type: 'line',
      stack: 'Total',
      areaStyle: {},
      data: [320, 332, 301, 334, 390, 330, 320],
    },
    {
      name: 'Search Engine',
      type: 'line',
      stack: 'Total',
      areaStyle: {},
      data: [820, 932, 901, 934, 1290, 1330, 1320],
    },
  ],
};

const GRADIENT_STACKED_AREA_CHART = {
  id: 'gradient-stacked-area-chart',
  title: [{ ...IMMUTABLE_CONFIG.title, text: 'Gradient Stacked Area Chart' }],
  legend: [IMMUTABLE_CONFIG.legend],
  grid: [IMMUTABLE_CONFIG.grid],
  xAxis: [{ type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] }],
  yAxis: [IMMUTABLE_CONFIG.yAxis],
  visualMap: [],
  series: [
    {
      name: 'Line 1',
      type: 'line',
      stack: 'Total',
      smooth: true,
      lineStyle: {
        width: 0,
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
      },
      emphasis: {
        focus: 'series',
      },
      data: [140, 232, 101, 264, 90, 340, 250],
    },
    {
      name: 'Line 2',
      type: 'line',
      stack: 'Total',
      smooth: true,
      lineStyle: {
        width: 0,
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
      },
      emphasis: {
        focus: 'series',
      },
      data: [120, 282, 111, 234, 220, 340, 310],
    },
    {
      name: 'Line 3',
      type: 'line',
      stack: 'Total',
      smooth: true,
      lineStyle: {
        width: 0,
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
      },
      emphasis: {
        focus: 'series',
      },
      data: [320, 132, 201, 334, 190, 130, 220],
    },
    {
      name: 'Line 4',
      type: 'line',
      stack: 'Total',
      smooth: true,
      lineStyle: {
        width: 0,
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
      },
      emphasis: {
        focus: 'series',
      },
      data: [220, 402, 231, 134, 190, 230, 120],
    },
    {
      name: 'Line 5',
      type: 'line',
      stack: 'Total',
      smooth: true,
      lineStyle: {
        width: 0,
      },
      showSymbol: false,
      label: {
        show: true,
        position: 'top',
      },
      areaStyle: {
        opacity: 0.8,
      },
      emphasis: {
        focus: 'series',
      },
      data: [220, 302, 181, 234, 210, 290, 150],
    },
  ],
};

const TEMPERATURE_CHANGE = {
  id: 'temperature-change',
  title: [{ ...IMMUTABLE_CONFIG.title, text: 'Temperature Change in the Coming Week' }],
  legend: [IMMUTABLE_CONFIG.legend],
  grid: [IMMUTABLE_CONFIG.grid],
  xAxis: [{ data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], type: 'category' }],
  yAxis: [IMMUTABLE_CONFIG.yAxis],
  visualMap: [],
  series: [
    {
      name: 'Highest',
      type: 'line',
      data: [10, 11, 13, 11, 12, 12, 9],
      markPoint: {
        data: [
          { type: 'max', name: 'Max' },
          { type: 'min', name: 'Min' },
        ],
      },
      markLine: {
        data: [{ type: 'average', name: 'Avg' }],
      },
    },
    {
      name: 'Lowest',
      type: 'line',
      data: [1, -2, 2, 5, 3, 2, 0],
      markPoint: {
        data: [{ name: '周最低', value: -2, xAxis: 1, yAxis: -1.5 }],
      },
      markLine: {
        data: [
          { type: 'average', name: 'Avg' },
          [
            {
              symbol: 'none',
              x: '90%',
              yAxis: 'max',
            },
            {
              symbol: 'circle',
              label: {
                position: 'start',
                formatter: 'Max',
              },
              type: 'max',
              name: '最高点',
            },
          ],
        ],
      },
    },
  ],
};

const DISTRIBUTION_OF_ELECTRICITY = {
  id: 'distribution-of-electricity',
  title: [{ ...IMMUTABLE_CONFIG.title, text: 'Distribution of Electricity' }],
  legend: [IMMUTABLE_CONFIG.legend],
  grid: [IMMUTABLE_CONFIG.grid],
  xAxis: [
    {
      type: 'category',
      data: [
        '00:00',
        '01:15',
        '02:30',
        '03:45',
        '05:00',
        '06:15',
        '07:30',
        '08:45',
        '10:00',
        '11:15',
        '12:30',
        '13:45',
        '15:00',
        '16:15',
        '17:30',
        '18:45',
        '20:00',
        '21:15',
        '22:30',
        '23:45',
      ],
    },
  ],
  yAxis: [IMMUTABLE_CONFIG.yAxis],
  visualMap: [],
  series: [
    {
      name: 'Electricity',
      type: 'line',
      smooth: true,
      data: [300, 280, 250, 260, 270, 300, 550, 500, 400, 390, 380, 390, 400, 500, 600, 750, 800, 700, 600, 400],
      markArea: {
        itemStyle: {
          color: 'rgba(255, 173, 177, 0.4)',
        },
        data: [
          [
            {
              name: 'Morning Peak',
              xAxis: '07:30',
            },
            {
              xAxis: '10:00',
            },
          ],
          [
            {
              name: 'Evening Peak',
              xAxis: '17:30',
            },
            {
              xAxis: '21:15',
            },
          ],
        ],
      },
    },
  ],
};

const STEP_LINE = {
  id: 'step-line',
  title: [{ ...IMMUTABLE_CONFIG.title, text: 'Step Line' }],
  legend: [IMMUTABLE_CONFIG.legend],
  grid: [IMMUTABLE_CONFIG.grid],
  xAxis: [{ type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] }],
  yAxis: [IMMUTABLE_CONFIG.yAxis],
  visualMap: [],
  series: [
    {
      name: 'Step Start',
      type: 'line',
      step: 'start',
      data: [120, 132, 101, 134, 90, 230, 210],
    },
    {
      name: 'Step Middle',
      type: 'line',
      step: 'middle',
      data: [220, 282, 201, 234, 290, 430, 410],
    },
    {
      name: 'Step End',
      type: 'line',
      step: 'end',
      data: [450, 432, 401, 454, 590, 530, 510],
    },
  ],
};

export const SAMPLES: any = [
  BASIC_LINE_CHART,
  SMOOTHED_LINE_CHART,
  BASIC_AREA_CHART,
  STACKED_LINE_CHART,
  // STACKED_AREA_CHART,
  GRADIENT_STACKED_AREA_CHART,
  BUMP_CHART,
  TEMPERATURE_CHANGE,
  DISTRIBUTION_OF_ELECTRICITY,
  // RAINFALL_VS_EVAPORATION,
  // LARGE_AREA_CHART,
  MULTIPLE_X_AXES,
  STEP_LINE,
];

export const DEFAULT_SERIES_CONFIG: any = {
  type: 'line',
  // name: 'Line',
  symbol: 'circle',
  symbolSize: 6,
  showSymbol: true,
  smooth: false,
  areaStyle: undefined,
  // label: {
  //   show: true,
  //   position: 'top',
  // },
};
