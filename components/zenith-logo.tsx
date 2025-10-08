import type { SVGProps } from "react"

export function ZenithLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M20 30 L80 30 L20 70 L80 70"
        stroke="currentColor"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="4" fill="none" />
    </svg>
  )
}
