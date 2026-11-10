/* Lesen service worker: cache once, then run fully offline.
   When you change index.html, bump VERSION so installed apps pick up the update. */
const VERSION = 'v13';
const CACHE = 'lesen-' + VERSION;
const PAGE = './';
const ASSETS = [PAGE, './manifest.webmanifest', './icon-192.png', './icon-512.png'];

/* Some hosts (Netlify) redirect /index.html to /. A redirected response can't be
   handed to a page navigation, so rebuild it as a plain response before using it. */
async function clean(r) {
  if (!r.redirected) return r;
  const body = await r.blob();
  return new Response(body, { status: r.status, statusText: r.statusText, headers: r.headers });
}

self.addEventListener('install', (e) => {
  e.waitUntil((async () => {
    const c = await caches.open(CACHE);
    for (const a of ASSETS) {
      const r = await fetch(a, { cache: 'reload' });
      if (!r.ok) throw new Error('precache failed: ' + a);
      await c.put(a, await clean(r));
    }
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;
  const isPage = req.mode === 'navigate' || /\/index\.html$/.test(url.pathname);
  e.respondWith((async () => {
    const hit = await caches.match(isPage ? PAGE : req, { ignoreSearch: true });
    if (hit) return hit;
    return clean(await fetch(req));
  })());
});
