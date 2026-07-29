import type { SVGProps } from "react";

type IconProps = Readonly<SVGProps<SVGSVGElement>>;

const common = {
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  strokeWidth: 1.8,
} as const;

export function OrthopedicLogo(props: IconProps) {
  return (
    <svg viewBox="0 0 52 52" aria-hidden="true" {...props}>
      <circle cx="26" cy="26" r="22.5" {...common} strokeWidth="2.2" />
      <path d="M26 8v36M21.5 14.5c2.4-2.2 6.6-1.4 7.5 1.2.7 2.2-.7 4.2-3 4.3-2.6.1-4.2 1.7-3.6 4 .5 2.1 2.8 2.7 5 2.2 2.7-.6 4.3 1.2 3.8 3.3-.5 2-2.7 2.9-5 2.4-2.5-.5-4.1 1.2-3.6 3.4.4 1.8 2 2.7 3.4 2.8" {...common} strokeWidth="2" />
      <circle cx="26" cy="10" r="2.2" fill="currentColor" />
      <path d="M21 18h10M21 26h10M21 34h10" {...common} strokeWidth="1.4" />
    </svg>
  );
}

export function WhatsappIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M20.5 11.7a8.4 8.4 0 0 1-12.4 7.4L3.5 20.5l1.5-4.4a8.4 8.4 0 1 1 15.5-4.4Z" {...common} />
      <path d="M8.1 7.6c.3-.7.7-.7 1-.7h.4c.2 0 .4.1.5.5l.8 1.9c.1.3.1.5-.1.7l-.7.8c-.2.2-.1.4 0 .6.7 1.2 1.7 2.1 2.9 2.7.3.1.5.1.7-.1l.9-1.1c.2-.2.4-.3.7-.2l1.9.9c.3.2.5.3.5.5 0 .2-.1 1.2-.7 1.7-.6.6-1.5.9-2.4.7-1.1-.2-2.7-.8-4.6-2.5-1.5-1.3-2.6-3-2.9-4.1-.3-1 0-1.8.1-2.3Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function KneeIcon(props: IconProps) {
  return <svg viewBox="0 0 48 48" aria-hidden="true" {...props}><path d="M18 5c1 8-2 11-4 15-1.6 3.2.7 6.7 4.4 6.7h7.9c3.6 0 6.1-3.5 4.4-6.7-2-4-5-7-4-15M18.5 27c.4 7-1 10-2.5 16M27 27c-.4 7 1 10 2.5 16M17 15c3 2.3 8 2.3 11 0M17 32c4 1.8 8 1.8 12 0" {...common} /></svg>;
}

export function HipIcon(props: IconProps) {
  return <svg viewBox="0 0 48 48" aria-hidden="true" {...props}><path d="M15 7c-5 3-7 8-5 13 1 3 4 5 7 6l2 15M33 7c5 3 7 8 5 13-1 3-4 5-7 6l-2 15M17 16c2-4 4-6 7-6s5 2 7 6M17 26c4 3 10 3 14 0M19 31h10" {...common} /><circle cx="15.5" cy="20" r="3.5" {...common} /><circle cx="32.5" cy="20" r="3.5" {...common} /></svg>;
}

export function TraumaIcon(props: IconProps) {
  return <svg viewBox="0 0 48 48" aria-hidden="true" {...props}><circle cx="24" cy="9" r="5" {...common} /><path d="M14 42v-9c0-6 3-10 10-10s10 4 10 10v9M24 14v13M17 19l-7 9M31 19l7 9M21 31h6" {...common} /></svg>;
}

export function ArthroscopyIcon(props: IconProps) {
  return <svg viewBox="0 0 48 48" aria-hidden="true" {...props}><path d="m10 38 20-20 5 5-20 20-5-5ZM29 19l5-5 6 6-5 5M34 14l3-3M14 34l5 5" {...common} /><path d="M8 40h8" {...common} /></svg>;
}

export function SpineIcon(props: IconProps) {
  return <svg viewBox="0 0 48 48" aria-hidden="true" {...props}><path d="M24 4c-3 3-3 6 0 9-3 3-3 6 0 9-3 3-3 6 0 9-3 3-3 6 0 13" {...common} /><path d="m19 8 5-2 5 2-5 3-5-3Zm0 9 5-2 5 2-5 3-5-3Zm0 9 5-2 5 2-5 3-5-3Zm0 9 5-2 5 2-5 3-5-3Z" {...common} /></svg>;
}

export function SportsIcon(props: IconProps) {
  return <svg viewBox="0 0 48 48" aria-hidden="true" {...props}><circle cx="31" cy="8" r="4" {...common} /><path d="m25 16 6 5 7-2M25 16l-8 8-7-2M25 16l-2 10 8 5 6 11M23 26l-8 8-7 8" {...common} /></svg>;
}
