import Link from 'next/link';

const anchorReg = /\[[^\]]+](\(([^\)]+)\))?/g;
const ParseMark = (str: string) => {
  let copyStr = str;
  const matchList = copyStr?.match(anchorReg);
  if (!matchList) {
    return copyStr;
  }
  const contentList: any[] = [];
  let after = copyStr;
  (matchList || []).forEach((m: any) => {
    // eg: [text](url) or [text]
    const [text, url] = m.includes('(') ? m.slice(1, -1).split('](') : [m.slice(1, -1)];
    const [before] = after.split(m);
    after = after.slice(before.length + m.length);
    contentList.push(before);
    if (url) {
      contentList.push(
        <Link key={text} href={url}>
          {text}
        </Link>,
      );
    } else {
      contentList.push(
        <span key={text} className="font-bold">
          {text}
        </span>,
      );
    }
  });
  return contentList.concat([after]);
};

export default ParseMark;
