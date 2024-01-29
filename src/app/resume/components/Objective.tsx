const Objective = ({ resume }: any) => {
  const KV = (k: string, v: string) => (
    <>
      <div className="mt-2 text-sm text-gray-600">{k}</div>
      <div className="text-base font-bold">{v}</div>
    </>
  )
  return (
    <>
      {KV('地址', resume.objective.address)}
      {KV('薪资', resume.objective.salary)}
      {KV('目前状态', resume.objective.currentState)}
      {KV('预计到岗', resume.objective.after)}
    </>
  )
}

export default Objective
