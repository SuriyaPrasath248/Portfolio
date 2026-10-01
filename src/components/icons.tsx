type P = { className?: string };
const base = "h-[15px] w-[15px] shrink-0";
const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

export const ArrowUpRight = ({ className = "" }: P) => (
  <svg className={`${base} ${className}`} viewBox="0 0 24 24" {...stroke} aria-hidden="true">
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

export const ArrowRight = ({ className = "" }: P) => (
  <svg className={`${base} ${className}`} viewBox="0 0 24 24" {...stroke} aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const ArrowLeft = ({ className = "" }: P) => (
  <svg className={`${base} ${className}`} viewBox="0 0 24 24" {...stroke} aria-hidden="true">
    <path d="M19 12H5M11 6l-6 6 6 6" />
  </svg>
);

export const Mail = ({ className = "" }: P) => (
  <svg className={`${base} ${className}`} viewBox="0 0 24 24" {...stroke} aria-hidden="true">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);

export const Play = ({ className = "" }: P) => (
  <svg className={`${base} ${className}`} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.4-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" />
  </svg>
);

export const Folder = ({ className = "" }: P) => (
  <svg className={`${base} ${className}`} viewBox="0 0 24 24" {...stroke} aria-hidden="true">
    <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
  </svg>
);
