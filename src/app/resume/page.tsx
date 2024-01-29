import type { NextPage } from 'next';
import Head from 'next/head';
import Content from './content';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <meta char-set="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <title>汪杨 - 简历</title>
        <meta name="keywords" content="汪杨,简历,sherotree,resume" />
        <meta name="description" content="汪杨的个人简历" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex min-w-[1280px] justify-center p-8 pr-12 pb-12">
        {/* <div
          className="sticky hidden items-end self-start text-right md:block"
          style={{ top: 20 }}
        >
          <div className="text-6xl font-bold">
            <div className="mb-8 flex justify-end">
              <img
                width={90}
                src="https://visitor-badge-reloaded.herokuapp.com/badge?page_id=sherotree.resume&color=00cf00"
                alt=""
              />
            </div>

            <h1>Hello</h1>
            <h2 className="text-3xl">This is my resume</h2>
          </div>
          <a
            className="mt-8 inline-flex w-24 flex-col items-center rounded py-2 hover:bg-gray-200"
            href="https://github.com/sherotree"
            target="_blank"
          >
            <img
              src="/svg/icon-github.svg"
              width="40"
              height="40"
              alt="github"
            />
            <span className="mt-1 text-sm">个人 Github</span>
          </a>
          <a
            className="mt-8 inline-flex w-24 flex-col items-center rounded py-2 hover:bg-gray-200"
            href="/sherotree-resume.pdf"
            download
          >
            <img
              src="/svg/icon-download.svg"
              width="40"
              height="40"
              alt="download"
            />
            <span className="mt-1 text-sm">下载 pdf</span>
          </a>
        </div> */}
        <div className="wrapper ml-12">
          <Content />
        </div>
      </div>
    </>
  );
};

export default Home;
