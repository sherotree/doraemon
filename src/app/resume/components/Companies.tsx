import ParseMark from './ParseMark'

interface CompaniesProps {
  companies: {
    name: string
    logo?: string
    url?: string
    start: string
    end: string
    title: string
    address: string
    content: string
  }[]
}

const Companies = (props: CompaniesProps) => {
  const { companies } = props

  return (
    <>
      {companies.map(({ start, end, title, name, address, content }, index) => (
        <div key={name} className="mb-8">
          <p className="mb-2 flex justify-between">
            <span className="text-lg font-bold">{`${name} | ${title}`}</span>
            <span className="text-sm text-gray-600">
              {start} - {end}
            </span>
          </p>
          {/* <p className="mb-2 flex text-sm text-gray-600">
            <span className="inline-block w-40 font-bold">
              {start} - {end}
            </span>
            <span>
              {name} · {address}
            </span>
          </p> */}
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
              <div key={index} className="mt-4 mb-2">
                {ParseMark(a)}
              </div>
            )
          })}
        </div>
      ))}
    </>
  )
}

export default Companies
