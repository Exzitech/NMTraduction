import type { JSX, SVGProps } from 'react'

export type IconProps = SVGProps<SVGSVGElement>
export type IconComponent = (props: IconProps) => JSX.Element

function Svg(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    />
  )
}

/** Flèche « vers l'avant » : pointe vers la gauche en RTL. */
export const ArrowRightIcon = ({ className = '', ...p }: IconProps) => (
  <Svg className={`rtl:-scale-x-100 ${className}`} {...p}>
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </Svg>
)

export const ArrowLeftRightIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M8 3 4 7l4 4" />
    <path d="M4 7h16" />
    <path d="m16 21 4-4-4-4" />
    <path d="M20 17H4" />
  </Svg>
)

export const ChevronDownIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="m6 9 6 6 6-6" />
  </Svg>
)

export const CheckIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M20 6 9 17l-5-5" />
  </Svg>
)

export const MenuIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 7h16" />
    <path d="M4 12h16" />
    <path d="M4 17h10" />
  </Svg>
)

export const CloseIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </Svg>
)

export const PhoneIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </Svg>
)

export const ChatIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    <path d="M8 12h.01M12 12h.01M16 12h.01" />
  </Svg>
)

export const MailIcon = (p: IconProps) => (
  <Svg {...p}>
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </Svg>
)

export const BadgeCheckIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
    <path d="m9 12 2 2 4-4" />
  </Svg>
)

export const ShieldIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    <path d="m9 12 2 2 4-4" />
  </Svg>
)

export const PenIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 20h9" />
    <path d="M16.38 3.62a1 1 0 0 1 3 3L7.37 18.64a2 2 0 0 1-.86.5l-2.87.84a.5.5 0 0 1-.62-.62l.84-2.87a2 2 0 0 1 .5-.86z" />
  </Svg>
)

export const DocumentIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
    <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    <path d="M16 13H8M16 17H8M10 9H8" />
  </Svg>
)

export const LandmarkIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M3 22h18" />
    <path d="M6 18v-7M10 18v-7M14 18v-7M18 18v-7" />
    <path d="M12 2 20 7H4z" />
  </Svg>
)

export const ScaleIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
    <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
    <path d="M7 21h10M12 3v18" />
    <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" />
  </Svg>
)

export const GraduationIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M21.42 10.92a1 1 0 0 0-.02-1.84L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.83l8.57 3.91a2 2 0 0 0 1.66 0z" />
    <path d="M22 10v6" />
    <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
  </Svg>
)

export const HeartPulseIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    <path d="M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27" />
  </Svg>
)

export const SpeechIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2z" />
    <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
  </Svg>
)
