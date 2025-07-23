import * as React from "react"
const MobileLogo = (props) => (
  <svg width={24} height={25} xmlns="http://www.w3.org/2000/svg" {...props}>
    <g fill="#635FC7" fillRule="evenodd">
      <rect width={6} height={25} rx={2} />
      <rect opacity={0.75} x={9} width={6} height={25} rx={2} />
      <rect opacity={0.5} x={18} width={6} height={25} rx={2} />
    </g>
  </svg>
)
export default MobileLogo
