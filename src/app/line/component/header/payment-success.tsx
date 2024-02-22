import { Input, Button } from 'antd';
import { useUserStore } from '../../user-store';
import { ArrowCircleLeftFillIcon } from 'fig-components';
import i18n from 'i18next';
import { emit } from '../../emit';

export default function PaymentSuccess() {
  const { license, currentUser, setRoute } = useUserStore();

  return (
    <div className="p-4 flex h-full justify-between flex-col">
      <div>
        <div className="inline-flex items-center gap-1">
          <ArrowCircleLeftFillIcon
            className="w-5 h-5 cursor-pointer text-[#B3B3B3]"
            onClick={() => {
              setRoute('home');
            }}
          />
          <div>{i18n.t('Back to plugin')}</div>
        </div>
        <div className="text-[60px] mt-12">🎉</div>
        <div className="text-[20px] font-bold mt-8">{i18n.t('Thank you')} !</div>
        <div className="text-[20px] font-bold mt-2">{currentUser?.name}</div>
        <div className="text-[20px] font-bold mt-8">{i18n.t("You've been granted unlimited access")}</div>
        <Input
          disabled
          className="mt-3 w-full"
          value={license?.licenseKey?.slice(0, 10) + '**********' + license?.licenseKey?.slice(20)}
        />
      </div>

      <Button
        className="w-full"
        type="primary"
        onClick={() => {
          setRoute('home');
          emit('resize-window', { width: 1000, height: 618 });
        }}
      >
        {i18n.t('Use Plugin')}
      </Button>
    </div>
  );
}
