const STATUS_STYLES = {
  Go: { color: 'text-go', border: 'border-go/40', bg: 'bg-go/10', dot: 'bg-go' },
  'To Be Confirmed': {
    color: 'text-hold',
    border: 'border-hold/40',
    bg: 'bg-hold/10',
    dot: 'bg-hold',
  },
  'To Be Determined': {
    color: 'text-hold',
    border: 'border-hold/40',
    bg: 'bg-hold/10',
    dot: 'bg-hold',
  },
  Hold: { color: 'text-hold', border: 'border-hold/40', bg: 'bg-hold/10', dot: 'bg-hold' },
  'In Flight': { color: 'text-sky', border: 'border-sky/40', bg: 'bg-sky/10', dot: 'bg-sky' },
  Success: { color: 'text-go', border: 'border-go/40', bg: 'bg-go/10', dot: 'bg-go' },
  Failure: { color: 'text-scrub', border: 'border-scrub/40', bg: 'bg-scrub/10', dot: 'bg-scrub' },
  'Partial Failure': {
    color: 'text-hold',
    border: 'border-hold/40',
    bg: 'bg-hold/10',
    dot: 'bg-hold',
  },
};

const DEFAULT_STYLE = {
  color: 'text-muted',
  border: 'border-hairline',
  bg: 'bg-white/5',
  dot: 'bg-muted',
};

export default function StatusPill({ status }) {
  const label = status || 'Status Unknown';
  const style = STATUS_STYLES[label] || DEFAULT_STYLE;

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs md:text-sm font-semibold uppercase tracking-widest ${style.color} ${style.border} ${style.bg}`}
    >
      <span className={`h-2 w-2 rounded-full ${style.dot}`} />
      {label}
    </span>
  );
}
