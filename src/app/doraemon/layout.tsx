import Link from 'next/link';

interface DoraemonLayoutProps {
  children: React.ReactNode;
}

const navItems = [
  {
    href: '/doraemon/canvas',
    label: 'canvas',
  },
  {
    href: '/doraemon/png',
    label: 'png',
  },
  {
    href: '/doraemon/qr-code',
    label: 'qr-code',
  },
  {
    href: '/doraemon/recharts',
    label: 'recharts',
  },
  {
    href: '/doraemon/three-fiber',
    label: 'three-fiber',
  },
];

export default function DoraemonLayout(props: DoraemonLayoutProps) {
  const { children } = props;

  return (
    <div className="flex gap-3">
      <div className="flex flex-col">
        {navItems.map(item => {
          const { href, label } = item;
          return (
            <Link key={href} href={href}>
              {label}
            </Link>
          );
        })}
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}
