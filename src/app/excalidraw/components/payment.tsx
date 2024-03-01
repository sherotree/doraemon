import { Input, Button, ConfigProvider } from 'antd';
import { validateGumroadLicenseKeyUiAsync } from '@/utils/gumroad/validate-gumroad-license-key-ui-async';
import { useState } from 'react';
import PaymentSuccess from './payment-success';
import { useUserStore } from '../user-store';
import { ArrowCircleLeftFillIcon } from 'fig-components';
import { emit } from '../emit';

export default function Payment() {
  const { setStorage, setRoute } = useUserStore();
  const [verifyStatus, setVerifyStatus] = useState<'valid' | 'invalid' | 'loading' | 'none'>('none'); // ['valid', 'invalid', 'loading', 'none'
  const [licenseKey, setLicenseKey] = useState<string>(null!);

  const isError = verifyStatus === 'invalid';

  if (verifyStatus === 'valid') {
    return <PaymentSuccess />;
  }

  return (
    <div className="p-4">
      <div className="inline-flex items-center gap-1">
        <ArrowCircleLeftFillIcon
          className="w-5 h-5 cursor-pointer text-[#B3B3B3]"
          onClick={() => {
            setRoute('home');
            emit('resize-window', { width: 1000, height: 618 });
          }}
        />
        <div>Back to plugin</div>
      </div>
      <div className="text-[60px] mt-12">🚀</div>
      <div className="text-[20px] font-bold mt-8">Upgrade to PRO</div>
      <Input
        status={isError ? 'error' : null}
        className="mt-3 w-full"
        placeholder="E.g. 42E76172-31E8C901-B59C9D79-02D0671A"
        value={licenseKey}
        onChange={e => {
          setVerifyStatus('none');
          setLicenseKey(e.target.value);
        }}
      />
      {isError && (
        <div className="my-2 text-[var(--fig-color-text-danger)]">
          This is an invalid verification code, please confirm before entering
        </div>
      )}
      <Button
        className="mt-3 w-full"
        disabled={!licenseKey?.trim()}
        type="primary"
        onClick={async () => {
          const res = await validateGumroadLicenseKeyUiAsync({
            // productId: '5PIqJvhRWMhjPPpEtQfYMA==',
            productId: '9hBvaY_1cdSEMRq46Bd3Gw==',
            licenseKey,
            // licenseKey: 'CF578DC0-79774D60-86C0068C-F850A142',
          });
          emit('set-storage', { license: res });
          if (res.result !== 'VALID') {
            setVerifyStatus('invalid');
          } else {
            setStorage({ license: res });
            setVerifyStatus('valid');
          }
        }}
      >
        Verify
      </Button>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#9747ff',
            colorPrimaryActive: '#9747ff',
          },
        }}
      >
        <Button
          type="primary"
          className="mt-3 w-full"
          onClick={() => {
            window.open('https://uwarp.gumroad.com/l/excalidraw');
          }}
        >
          Get Pro License ($1/quarterly)
        </Button>
      </ConfigProvider>
    </div>
  );
}
