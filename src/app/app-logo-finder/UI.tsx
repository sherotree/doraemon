import { ConfigProvider, Select, Input, Empty } from 'antd';
import { useTheme } from 'fig-components';
import { SetStateAction, useEffect, useState } from 'react';
import { emit } from './event';
import i18n from 'i18next';
import Loading from '@/components/loading';
import { debounce } from 'lodash';

const regions = ['CN', 'HK', 'US', 'JP', 'GB', 'KR'];

export default function UI() {
  const theme = useTheme();
  const [search, setSearch] = useState('梦幻西游');
  const [results, setResults] = useState([]);
  const [country, setCountry] = useState(regions[0]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await fetch(
        `https://itunes.apple.com/search?entity=software&limit=50&country=${country}&term=${search}`,
      );
      if (!response.ok) {
        setLoading(false);
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setResults(data?.results);
      setLoading(false);
    };

    fetchData();
  }, [country, search]);

  function handleDragEnd(e: any) {
    // Don't proceed if the item was dropped inside the plugin window.
    // if (e.view.length === 0) return;

    window.parent.postMessage(
      {
        pluginDrop: {
          clientX: e.clientX,
          clientY: e.clientY,
          files: [],
          dropMetadata: { name: e.target.dataset.name, url: e.target.src },
        },
        pluginId: '1110011',
      },
      '*',
    );
  }

  const onSearch = (e: { target: { value: SetStateAction<string> } }) => {
    debounce(() => {
      setSearch(e?.target?.value);
    }, 500)();
  };

  return (
    <ConfigProvider theme={theme}>
      <div>
        <div className="flex px-4 pt-4 gap-2">
          <Select
            className="min-w-[86px]"
            options={regions.map(x => ({ value: x, label: i18n.t(x) }))}
            value={country}
            onChange={value => setCountry(value)}
          />
          <Input defaultValue={search} allowClear placeholder={i18n.t('Search logo here')} onChange={onSearch} />
        </div>
      </div>
      {results?.length === 0 && search === '' && !loading && (
        <div className="mt-20 flex justify-center px-12 text-center text-sm text-gray-500">
          {i18n.t('Please filter the country/region or search the logo name, displaying at most the top 50')}
        </div>
      )}
      {results?.length === 0 && search !== '' && !loading && (
        <Empty description={i18n.t('No related signs yet')} className="mt-20" />
      )}
      {loading && search !== '' && (
        <div className="mt-40 flex justify-center">
          <Loading content={i18n.t('Retrieving logos, displaying at most the top 50')} />
        </div>
      )}

      {!loading && (
        <div className="mt-4 flex max-h-[416px] flex-wrap items-center justify-start overflow-auto">
          {results.map((item: any, index) => {
            return (
              <div className="flex px-4 py-2 hover:bg-gray-50" key={item.trackName}>
                <img
                  src={item.artworkUrl512}
                  draggable="true"
                  data-name={item.trackName}
                  onDragEnd={handleDragEnd}
                  alt=""
                  className="h-10 w-10 cursor-pointer rounded-lg border border-solid border-gray-100 transition ease-in-out hover:scale-110"
                  onClick={() => {
                    emit('create-image', { url: item.artworkUrl512, name: item.trackName });
                  }}
                />
                <div className="flex w-60 flex-col justify-center gap-1.5 pl-2">
                  <div
                    className="cursor-pointer truncate text-[12px] font-semibold text-[#1a1a1a]"
                    title={item.trackName}
                  >
                    {item.trackName}
                  </div>
                  <div className="cursor-pointer truncate text-[11px] text-gray-400" title={item.sellerName}>
                    {item.sellerName}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </ConfigProvider>
  );
}
