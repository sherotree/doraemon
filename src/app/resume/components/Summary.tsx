import ParseMark from './ParseMark'

interface SummaryProps {
  summary: string
}

const Summary = (props: SummaryProps) => {
  const { summary } = props
  return <div className="ml-14 flex-1 break-all">{ParseMark(summary)}</div>
}

export default Summary
