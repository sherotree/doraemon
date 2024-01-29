// es6 html css3 数据结构 redux

const Skills = () => {
  const logoMap = {
    react: {
      logo: '/svg/react-original-wordmark.svg',
      percent: 3,
      name: 'React',
    },
    antd: {
      logo: '/svg/ant-design.svg',
      percent: 3,
      name: 'Ant Design',
    },
    typescript: {
      logo: '/svg/typescript-original.svg',
      percent: 3,
      name: 'Typescript',
    },
    js: {
      logo: '/svg/js.svg',
      percent: 3,
      name: 'ES6',
    },
    sass: {
      logo: '/svg/sass-original.svg',
      percent: 3,
      name: 'Sass',
    },
    tailwind: {
      logo: '/svg/tailwindcss-icon.svg',
      percent: 3,
      name: 'Tailwind CSS',
    },
    git: {
      logo: '/svg/git-scm-icon.svg',
      percent: 3,
      name: 'Git',
    },
    css: {
      logo: '/svg/css3.svg',
      percent: 4,
      name: 'CSS',
    },
    html: {
      logo: '/svg/html5.svg',
      percent: 4,
      name: 'HTML',
    },
    // jest: {
    //   logo: '/svg/jestjsio-icon.svg',
    //   percent: 1,
    // },
  }

  return (
    <div>
      {Object.keys(logoMap).map((key) => {
        const { logo, percent, name } = logoMap[key as keyof typeof logoMap]
        return (
          <div key={key} className="mb-2 flex items-center justify-between">
            <div>
              <img
                className="mr-1 inline-block"
                src={logo}
                alt={key}
                width="18"
                height="18"
              />
              <span className="text-sm">{name}</span>
            </div>

            <div>
              {new Array(5).fill(1).map((_, index) => (
                <span
                  key={index}
                  className={`print-bg inline-block h-2 w-2 rounded-full border border-gray-600 ${
                    percent > index ? 'bg-gray-600' : ''
                  } ml-1`}
                />
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Skills
