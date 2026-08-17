'use client';

import { useEffect, useState } from 'react';

function getTimeParts(target) {
  const diff = target - Date.now();
  const clamped = Math.max(diff, 0);
  const totalSeconds = Math.floor(clamped / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { days, hours, minutes, seconds, isPast: diff <= 0 };
}

function pad(n, width = 2) {
  return String(n).padStart(width, '0');
}

export default function CountdownClock({ net }) {
  const target = new Date(net).getTime();
  const [parts, setParts] = useState(() => getTimeParts(target));

  useEffect(() => {
    const tick = () => setParts(getTimeParts(target));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  if (parts.isPast) {
    return (
      <div className="flex flex-col items-center">
        <div className="font-mono text-6xl md:text-8xl font-bold text-flame tracking-wider pulse-slow drop-shadow-[0_0_35px_rgba(255,90,54,0.45)]">
          T-PLUS / HOLD
        </div>
        <p className="mt-3 text-muted text-base md:text-lg tracking-[0.25em] uppercase">
          Awaiting updated NET from the range
        </p>
      </div>
    );
  }

  const units = [
    { label: 'Days', value: pad(parts.days, 3) },
    { label: 'Hrs', value: pad(parts.hours) },
    { label: 'Min', value: pad(parts.minutes) },
    { label: 'Sec', value: pad(parts.seconds) },
  ];

  return (
    <div className="flex items-end justify-center gap-2 md:gap-6 tabular-nums">
      {units.map((u, i) => (
        <div key={u.label} className="flex items-end">
          <div className="flex flex-col items-center">
            <span className="font-mono font-bold leading-none text-amber text-[clamp(3rem,9vw,8.5rem)] drop-shadow-[0_0_35px_rgba(255,176,0,0.35)]">
              {u.value}
            </span>
            <span className="mt-2 text-xs md:text-sm tracking-[0.3em] text-muted uppercase">
              {u.label}
            </span>
          </div>
          {i < units.length - 1 && (
            <span className="font-mono font-bold leading-none text-amber-dim text-[clamp(3rem,9vw,8.5rem)] px-1 md:px-2 pb-6 md:pb-7">
              :
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
