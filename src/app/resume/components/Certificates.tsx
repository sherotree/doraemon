interface CertificatesProps {
  certificates: { name: string }[]
}

const Certificates = (props: CertificatesProps) => {
  const { certificates } = props
  return (
    <>
      {certificates.map(({ name }) => (
        <div key={name} className="mb-2">
          {name}
        </div>
      ))}
    </>
  )
}

export default Certificates
