// Runs entirely in the browser (this app is a static export with no server),
// so it calls the Launch Library 2 API directly and filters client-side.

const LL2_URL =
  'https://ll.thespacedevs.com/2.3.0/launch/upcoming/?mode=detailed&limit=60&ordering=net';

// LL2 pad location names look like "Cape Canaveral, FL, USA" or
// "Kennedy Space Center, FL, USA" — match on "FL," or the word "Florida".
const FLORIDA_PATTERN = /,\s*fl,|florida/i;

function isFloridaLaunch(launch) {
  const locationName = launch?.pad?.location?.name || '';
  return FLORIDA_PATTERN.test(locationName);
}

export async function fetchNextFloridaLaunch() {
  const res = await fetch(LL2_URL, { headers: { Accept: 'application/json' } });

  if (!res.ok) {
    throw new Error(`Launch Library API responded with ${res.status}`);
  }

  const data = await res.json();
  const results = Array.isArray(data.results) ? data.results : [];

  const floridaLaunches = results
    .filter(isFloridaLaunch)
    .sort((a, b) => new Date(a.net) - new Date(b.net));

  return {
    count: floridaLaunches.length,
    next: floridaLaunches[0] || null,
    fetchedAt: new Date().toISOString(),
  };
}
