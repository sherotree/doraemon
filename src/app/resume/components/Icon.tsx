export const iconWrap = (size: number, children: JSX.Element) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {children}
  </svg>
)
export const iconMap = {
  address: iconWrap(
    20,
    <>
      <rect width="48" height="48" fill="white" fill-opacity="0.01" />
      <path
        d="M24 44C24 44 39 32 39 19C39 10.7157 32.2843 4 24 4C15.7157 4 9 10.7157 9 19C9 32 24 44 24 44Z"
        fill="none"
        stroke="#333"
        stroke-width="4"
        stroke-linejoin="miter"
      />
      <path
        d="M24 25C27.3137 25 30 22.3137 30 19C30 15.6863 27.3137 13 24 13C20.6863 13 18 15.6863 18 19C18 22.3137 20.6863 25 24 25Z"
        fill="none"
        stroke="#333"
        stroke-width="4"
        stroke-linejoin="miter"
      />
    </>
  ),
  email: iconWrap(
    20,
    <>
      <rect width="48" height="48" fill="white" fill-opacity="0.01" />
      <path
        d="M4 39H44V24V9H24H4V24V39Z"
        fill="none"
        stroke="#333"
        stroke-width="4"
        stroke-linejoin="miter"
      />
      <path
        d="M4 9L24 24L44 9"
        stroke="#333"
        stroke-width="4"
        stroke-linecap="square"
        stroke-linejoin="miter"
      />
      <path
        d="M24 9H4V24"
        stroke="#333"
        stroke-width="4"
        stroke-linecap="square"
        stroke-linejoin="miter"
      />
      <path
        d="M44 24V9H24"
        stroke="#333"
        stroke-width="4"
        stroke-linecap="square"
        stroke-linejoin="miter"
      />
    </>
  ),
  phone: iconWrap(
    20,
    <>
      <rect width="48" height="48" fill="white" fill-opacity="0.01" />
      <rect width="48" height="48" fill="white" fill-opacity="0.01" />
      <path
        d="M8 30H40V42C40 43.1046 39.1046 44 38 44H10C8.89543 44 8 43.1046 8 42V30Z"
        fill="none"
        stroke="#333"
        stroke-width="4"
        stroke-linejoin="miter"
      />
      <path
        d="M40 30V6C40 4.89543 39.1046 4 38 4H10C8.89543 4 8 4.89543 8 6V30"
        stroke="#333"
        stroke-width="4"
        stroke-linejoin="miter"
      />
      <path
        d="M22 37H26"
        stroke="#333"
        stroke-width="4"
        stroke-linecap="square"
      />
    </>
  ),
}

export const Icon = ({
  type,
  size = 20,
}: {
  type: keyof typeof iconMap
  size?: number
}) => {
  // return iconMap[type]
  return (
    <img src={`/svg/icon-${type}.svg`} width={size} height={size} alt={type} />
  )
}
