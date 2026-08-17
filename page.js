'use client';

import { useCallback, useEffect, useState } from 'react';
import CountdownClock from '../components/CountdownClock';
import StatusPill from '../components/StatusPill';
import MissionDetails from '../components/MissionDetails';
import { fetchNextFloridaLaunch } from '../lib/launchLibrary';

const REFRESH_MS = 5 * 60 * 1000; // re-poll for new launch data every 5 minutes

function formatNet(net) {
  const date = new Date(net);
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short',
  }).format(date);
}

export default function Home() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [lastFetched, setLastFetched] = useState(null);

  const load = useCallback(async () => {
    try {
      const json = await fetchNextFloridaLaunch();
      setData(json);
      setError(null);
      setLastFetched(new Date());
    } catch (err) {
      setError(err.message);
    }
  }, []);

  useEffect(() => {
    load();
    const id = setInterval(load, REFRESH_MS);
    return () => clearInterval(id);
  }, [load]);

  const launch = data?.next;

  return (
    <main className="relative h-screen w-screen flex flex-col items-center justify-between px-6 py-8 md:px-16 md:py-12">
      <header className="flex w-full max-w-6xl items-center justify-between">
        <p className="text-xs md:text-sm uppercase tracking-[0.35em] text-sky">
          Space Coast · Next Liftoff
        </p>
        {launch && <StatusPill status={launch.status?.name} />}
      </header>

      {!data && !error && (
        <p className="text-muted text-lg md:text-xl tracking-widest uppercase">
          Acquiring signal…
        </p>
      )}

      {error && !data && (
        <div className="text-center">
          <p className="text-scrub text-2xl font-semibold mb-2">Telemetry Lost</p>
          <p className="text-muted">{error}</p>
        </div>
      )}

      {data && !launch && (
        <div className="text-center max-w-2xl">
          <p className="text-white text-2xl md:text-3xl font-semibold mb-3">
            No Florida launches currently scheduled
          </p>
          <p className="text-muted text-base md:text-lg">
            Nothing is on the range at Cape Canaveral or Kennedy Space Center right now. This
            page will pick up the next one automatically.
          </p>
        </div>
      )}

      {launch && (
        <div className="flex flex-col items-center gap-6 md:gap-10 flex-1 justify-center w-full max-w-6xl">
          <div className="text-center">
            <h1 className="text-2xl md:text-5xl font-bold text-white tracking-tight max-w-4xl">
              {launch.name}
            </h1>
            <p className="mt-2 text-muted text-sm md:text-lg tracking-wide">
              {[
                launch.launch_service_provider?.name,
                launch.rocket?.configuration?.name,
                launch.pad?.name,
              ]
                .filter(Boolean)
                .join(' · ')}
            </p>
          </div>

          <CountdownClock net={launch.net} />

          <p className="text-base md:text-2xl text-white/90 tracking-wide">
            NET {formatNet(launch.net)}
          </p>
        </div>
      )}

      {launch && <MissionDetails launch={launch} />}

      <footer className="w-full max-w-6xl flex items-center justify-between text-[10px] md:text-xs text-muted tracking-widest uppercase">
        <span>Source · Launch Library 2 (The Space Devs)</span>
        <span>{lastFetched ? `Updated ${lastFetched.toLocaleTimeString()}` : ''}</span>
      </footer>
    </main>
  );
}
