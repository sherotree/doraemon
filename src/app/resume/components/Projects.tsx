import ParseMark from './ParseMark'

interface ProjectsProps {
  projects: {
    name: string
    content: string
    start: string
    end: string
  }[]
}

const Projects = (props: ProjectsProps) => {
  const { projects } = props

  return (
    <>
      {projects.map(({ name, content, start, end }, index) => (
        <div key={name} className="mb-8 last:mb-0">
          <p className="mb-2 text-lg font-bold">{ParseMark(name)}</p>
          <div className="text-sm text-gray-600">
            {/* <span className="mr-4 font-bold">
              {start} - {end}
            </span> */}
            {content.split('\n').map((a: string, index: number) => {
              if (!a.length) return null
              if (a.startsWith('*')) {
                return (
                  <ul key={index} className="mb-2 list-inside list-disc">
                    <li className="text-sm">
                      {ParseMark(a.replace(/^\*\s*/, ''))}
                    </li>
                  </ul>
                )
              }
              return (
                <div key={index} className="mb-2">
                  {ParseMark(a)}
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </>
  )
}

export default Projects
