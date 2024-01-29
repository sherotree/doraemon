import { Icon, iconMap } from './Icon';
import Link from 'next/link';

interface MetaInfoProps {
  meta: {
    address: string;
    email: string;
    phone: string;
    github: string;
    website: string;
  };
}

const MetaInfo = (props: MetaInfoProps) => {
  const { address, email, phone, github, website } = props.meta;

  const withIcon = (k: keyof typeof iconMap, v: string) => (
    <div key={k} className="mb-2 flex items-center text-base">
      <Icon type={k} />
      <span className="ml-2">{v}</span>
    </div>
  );
  return (
    <>
      {withIcon('address', address)}
      {withIcon('phone', phone)}
      {withIcon('email', email)}
      <div className="mb-2 flex items-center text-base">
        <img src={`/svg/icon-git.svg`} width={20} height={20} alt="" />
        <Link className="ml-2" href={github}>
          {github}
        </Link>
      </div>
      <div className="mb-2 flex items-center text-base">
        <img src={`/svg/link.svg`} width={20} height={20} alt="" />
        <Link className="ml-2" href={website}>
          {website}
        </Link>
      </div>
    </>
  );
};

export default MetaInfo;
