const Tag = ({ text }: { text: string }) => (
  <span className="print-bg mr-2 mb-2 inline-block rounded-sm bg-slate-600 px-2 py-1 text-xs text-white">
    {text}
  </span>
)

interface InterestsProps {
  interests: string[]
}

const Interests = (props: InterestsProps) => {
  const { interests } = props
  return (
    <>
      {interests.map((t) => (
        <Tag key={t} text={t} />
      ))}
    </>
  )
}

export default Interests
