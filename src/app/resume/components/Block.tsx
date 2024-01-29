const Block = ({
  title,
  children,
  className,
}: {
  title: string
  children: JSX.Element
  className?: string
}) => {
  return (
    <section className={className || ''}>
      <div className="mb-2 border-b border-blue-800 border-opacity-20 pb-2 text-2xl font-bold">
        {title}
      </div>
      {children}
    </section>
  )
}

export default Block
