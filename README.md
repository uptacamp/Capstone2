# Space Coast — Next Liftoff

A single-screen, kiosk-style dashboard for a monitor in a Space Coast, FL home. It shows
**only** the next upcoming Florida rocket launch: mission name, a big LED-style countdown,
the NET (No Earlier Than) date/time, and a mission-details panel (provider, rocket, pad,
orbit, mission type, and description) — pulled straight from the
[Launch Library 2 API](https://ll.thespacedevs.com/2.3.0/launch/upcoming/).

This is a fully static site — no server, no API routes. The browser calls the Launch
Library API directly and does the filtering itself, so it's a plain set of HTML/JS/CSS
files that GitHub Pages (or any static host) can serve.

## Publish it on GitHub Pages

1. Push this folder to a new GitHub repo.
2. In the repo, go to **Settings → Pages → Build and deployment → Source**, and choose
   **GitHub Actions**. That's it — the included workflow
   (`.github/workflows/deploy.yml`) builds the app and deploys it automatically on every
   push to `main`.
3. After the first run finishes (check the **Actions** tab), your dashboard is live at:
   - `https://<your-username>.github.io/<repo-name>/` for a normal project repo, or
   - `https://<your-username>.github.io/` if the repo is named
     `<your-username>.github.io`.

Open that URL on the machine driving your monitor, in fullscreen (F11 in Chrome, or
`chrome --kiosk <url>`). That's the "file" you open — a live page, not a local file.

### Why not just double-click the HTML file?

You *can* build it locally (`npm run build` → an `out/` folder with `index.html` etc.)
but opening `out/index.html` directly from disk (`file://...`) is unreliable: browsers
restrict cross-origin `fetch()` calls from `file://` pages, so the launch data may fail to
load, and it won't get code/security updates. Serving it — GitHub Pages is the easiest
free option — avoids both problems and it still behaves like "just a URL you open," no
server for you to run or maintain.

## Building locally (optional, to preview before pushing)

```bash
npm install
npm run build
npx serve out
```

This produces the same static `out/` folder the GitHub Action deploys and serves it
locally over `http://localhost:3000` so you can sanity-check it first.

## How it works

- **`lib/launchLibrary.js`** fetches `launch/upcoming` from Launch Library 2 with
  `mode=detailed`, filters results to pads whose location name contains `FL,` or
  `Florida` (i.e. Cape Canaveral SFS and Kennedy Space Center), sorts by NET, and returns
  only the soonest one. This runs in the browser, not on a server.
- **`app/page.js`** calls that helper on load and again every **5 minutes**
  (`REFRESH_MS`), without a jarring full-page reload.
- **`components/CountdownClock.js`** re-renders every second from the cached NET
  timestamp, so the countdown stays smooth between the 5-minute data refreshes. If the
  countdown reaches zero and the launch hasn't updated its NET yet, it switches to a
  "T-PLUS / HOLD" state instead of showing a nonsensical negative countdown.
- **`next.config.mjs`** sets `output: 'export'` for a static build, and automatically
  prefixes asset/link paths with `/<repo-name>` when built inside GitHub Actions (project
  pages are served from a subpath). Building locally leaves that empty.
- **`public/.nojekyll`** stops GitHub Pages' default Jekyll processing from hiding the
  `_next` assets folder (any folder starting with `_` is ignored by Jekyll otherwise).

## Rate limits

Launch Library 2's free tier allows roughly 15 requests/hour per client. Polling every 5
minutes is 12 requests/hour, which leaves headroom — but note this budget is now
per-browser-tab (there's no shared server-side cache anymore), so don't leave many tabs of
this dashboard open against the same network at once.

## Customizing the Florida filter

The filter lives in `FLORIDA_PATTERN` in `lib/launchLibrary.js`. It currently matches any
pad location name containing `, FL,` or the word `Florida`. If you only want a specific pad
(e.g. just SpaceX's SLC-40, or just KSC's LC-39A), filter on `launch.pad.name` instead.

## Notes

- If nothing is currently scheduled in Florida, the page says so and will pick up the next
  launch automatically on its next refresh.
- If the API is unreachable, the last successfully loaded launch stays on screen and only
  the footer/error state changes — the display won't go blank because of one failed
  request.
