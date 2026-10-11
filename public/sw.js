const VERSION = "rallx-shell-v2";
const SHELL = [
  "/",
  "/manifest.webmanifest",
  "/icon.svg",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
];
const isPublicShellRequest = (request) => {
  if (
    request.method !== "GET" ||
    (request.mode === "navigate" && new URL(request.url).pathname !== "/")
  )
    return false;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return false;
  return url.pathname === "/" || SHELL.includes(url.pathname);
};
self.addEventListener("install", (event) =>
  event.waitUntil(
    caches
      .open(VERSION)
      .then((cache) => cache.addAll(SHELL))
      .then(() => self.skipWaiting()),
  ),
);
self.addEventListener("activate", (event) =>
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key.startsWith("rallx-shell-") && key !== VERSION)
            .map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  ),
);
self.addEventListener("fetch", (event) => {
  if (!isPublicShellRequest(event.request)) return;
  event.respondWith(
    caches.match(event.request).then(
      (cached) =>
        cached ||
        fetch(event.request).then((response) => {
          if (response.ok)
            caches
              .open(VERSION)
              .then((cache) => cache.put(event.request, response.clone()));
          return response;
        }),
    ),
  );
});
