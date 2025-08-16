const CACHE_NAME = "pwa-cache-v1";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll([
      "/",
      "/manifest.json",
      "/offline.css",
      "/offline.html"
    ]))
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  const url = new URL(req.url);

  if (req.method !== "GET") return;

  event.respondWith(
    (async () => {
      try {
        // Cache-first for home & CSS
        if (url.pathname === "/" || url.pathname.startsWith("/_next/static/css")) {
          const cached = await caches.match(req);
          if (cached) return cached;
        }

        // Always try network
        const res = await fetch(req);
        if (res && res.ok) {
          const resClone = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, resClone));
        }
        return res;
      } catch {
        // Offline fallback
        if (req.destination === "style") {
          return (await caches.match("/offline.css"));
        }
        return (await caches.match(req)) || await caches.match("/offline.html");
      }
    })()
  );
});