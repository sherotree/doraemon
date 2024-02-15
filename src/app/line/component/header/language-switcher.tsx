import { Dropdown } from 'antd';
import { CheckHeavyIcon, GlobeIcon } from 'fig-components';

const LANGUAGE_OPTIONS = [
  { key: 'en', label: 'English' },
  { key: 'zhCHS', label: '简体中文' },
  // { key: 'zhCHT', label: '正體中文' },
  { key: 'ja', label: '日本語' },
  // { key: 'ko', label: '한국인' },
  // { key: 'fr', label: 'En français' },
  // { key: 'de', label: 'Das ist Deutsch.' },
  // { key: 'ru', label: 'Русский язык' },
];

interface IProps {
  handleSelect: (key: string) => void;
  currentLanguage: string;
  languageOptions?: { key: string; label: string }[];
}

export function LanguageSwitcher(props: IProps) {
  const { handleSelect, currentLanguage, languageOptions = LANGUAGE_OPTIONS } = props;

  return (
    <Dropdown
      trigger={['hover']}
      placement="bottomRight"
      dropdownRender={() => {
        return (
          <div
            style={{
              boxShadow:
                '0px 4px 16px 0px rgba(0, 0, 0, 0.10), 0px 2px 12px 0px rgba(0, 0, 0, 0.05), 0px 0px 4px 0px rgba(0, 0, 0, 0.04)',
            }}
            className="rounded-lg bg-[var(--fig-color-bg)] p-1"
          >
            {languageOptions?.map(x => {
              return (
                <div
                  onClick={() => handleSelect(x.key)}
                  key={x.label}
                  className="flex cursor-pointer items-center justify-between rounded-lg py-1.5 px-2 hover:bg-[var(--fig-color-bg-hover)]"
                >
                  <span>{x.label}</span>
                  {currentLanguage === x.key && <CheckHeavyIcon className="h-4 w-4" />}
                </div>
              );
            })}
          </div>
        );
      }}
      overlayStyle={{ minWidth: 160 }}
    >
      <div className={`text-secondary cube-icon-wrapper cursor-pointer rounded-md p-1`}>
        <GlobeIcon className="h-4 w-4" />
      </div>
    </Dropdown>
  );
}
