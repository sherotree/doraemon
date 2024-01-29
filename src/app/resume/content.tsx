import React from 'react'
import resume from './docs/2024.json'
import Block from './components/Block'
import Companies from './components/Companies'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Certificates from './components/Certificates'
import Education from './components/Education'
import MetaInfo from './components/MetaInfo'
import NameAndAvatar from './components/NameAndAvatar'
import Summary from './components/Summary'
import Interests from './components/Interests'

const Content = () => {
  return (
    <main id="main" className="min-h-[1414px] w-[1000px] px-8 py-12">
      <div className="flex">
        <NameAndAvatar
          name={resume.name}
          avatar={resume.avatar}
          title={resume.title}
        />
        <Summary summary={resume.summary} />
      </div>
      <div className="mt-8 flex">
        <section className="mr-6 border-r border-blue-800 border-opacity-20 pr-6">
          <Block title="个人信息" className="mt-3">
            <MetaInfo meta={resume.meta} />
          </Block>

          <Block title="教育背景" className="mt-16">
            <Education educations={resume.educations} />
          </Block>

          <Block title="技能" className="mt-16">
            <Skills />
          </Block>

          <Block title="证书" className="mt-16">
            <Certificates certificates={resume.certificates} />
          </Block>

          <Block title="兴趣爱好" className="mt-16">
            <Interests interests={resume.interests} />
          </Block>
        </section>

        <div className="flex-1">
          <Block title="工作经历" className="mt-2">
            <Companies companies={resume.companies} />
          </Block>
          <Block title="项目经历" className="mt-16">
            <Projects projects={resume.projects} />
          </Block>
        </div>
      </div>
    </main>
  )
}

export default Content
