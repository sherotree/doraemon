import i18n from 'i18next';
import { LanguageSwitcher } from './language-switcher';
import { useUserStore } from '../../user-store';
import User from './user';
import { emit } from '../../emit';

export function Header() {
  const { setLanguage, language, storage, setRoute } = useUserStore();
  const isPro = storage?.license?.result === 'VALID';

  return (
    <div className="mb-4 flex h-[48px] items-center justify-between w-full">
      <User />

      <div className="flex items-center gap-2">
        {!isPro && (
          <div
            onClick={() => {
              setRoute('payment');
            }}
            className="font-bold cursor-pointer bg-[var(--fig-color-bg-component)] text-[var(--fig-color-text-oncomponent)] rounded-[40px] px-1.5 py-0.5 leading-4"
          >
            {i18n.t('Get Pro')}
          </div>
        )}
        <LanguageSwitcher
          handleSelect={key => {
            i18n.changeLanguage(key);
            setLanguage(key);
            emit('set-storage', { language: key });
          }}
          currentLanguage={language}
        />
      </div>
    </div>
  );
}
