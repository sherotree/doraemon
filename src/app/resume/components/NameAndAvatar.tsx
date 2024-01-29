interface NameAndAvatarProps {
  name: string
  avatar: string
  title: string
}

const NameAndAvatar = (props: NameAndAvatarProps) => {
  const { name, avatar, title } = props
  return (
    <div className="flex w-1/4">
      <div>
        <img
          width={80}
          height={80}
          className="rotate-[-32deg] rounded-full shadow-lg print:shadow-none"
          src={'/avatar.jpeg'}
          alt="avatar"
        />
      </div>
      <div className="ml-4 flex flex-col justify-center font-bold">
        <div className="text-3xl">{name}</div>
        <div className="mt-3 text-gray-600">{title}</div>
      </div>
    </div>
  )
}

export default NameAndAvatar
