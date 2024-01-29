interface EducationProps {
  educations: {
    name: string
    start: string
    end: string
    profession: string
    degree: string
    is211: boolean
    is985: boolean
  }[]
}

const Education = (props: EducationProps) => {
  const { educations } = props

  return (
    <>
      {educations.map(({ start, end, profession, name, is211, degree }) => (
        <div key={name} className="mb-8">
          <p className="inline-flex items-center text-lg font-bold">
            {name}
            {is211 ? (
              <span className="print-bg mr-1 mb-1 rounded-sm bg-slate-600 px-1 py-[2px] text-xs text-white">
                211
              </span>
            ) : null}
          </p>
          <p className="text-sm font-bold text-gray-600">
            <span className="mr-4">
              {start} - {end}
            </span>
            <span className="mr-4">{profession}</span>
            <span>{degree}</span>
          </p>
        </div>
      ))}
    </>
  )
}

export default Education
