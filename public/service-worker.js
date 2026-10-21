const CACHE_NAME = 'academica-v1'
const STATIC_CACHE = 'academica-static-v1'
const API_CACHE = 'academica-api-v1'
const CONTENT_CACHE = 'academica-content-v1'

const STATIC_ASSETS = [
  '/',
  '/offline.html',
  '/logo-icon.svg',
  '/logo-mono.svg',
  '/hero-particles.svg',
]

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      return cache.addAll(STATIC_ASSETS)
    })
  )
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => cacheName !== STATIC_CACHE && cacheName !== API_CACHE && cacheName !== CONTENT_CACHE)
          .map((cacheName) => caches.delete(cacheName))
      )
    })
  )
})

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Cache-first for static assets
  if (STATIC_ASSETS.some((asset) => url.pathname === asset || url.pathname.endsWith(asset))) {
    event.respondWith(
      caches.match(request).then((cached) => {
        return cached || fetch(request)
      })
    )
    return
  }

  // Network-first with cache fallback for API calls
  if (url.pathname.startsWith('/api') || url.hostname.includes('supabase.co')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Clone response before caching
          const responseToCache = response.clone()
          caches.open(API_CACHE).then((cache) => {
            cache.put(request, responseToCache)
          })
          return response
        })
        .catch(() => {
          return caches.match(request)
        })
    )
    return
  }

  // Cache-first for lesson content (offline study)
  if (url.pathname.startsWith('/content')) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached
        return fetch(request).then((response) => {
          const responseToCache = response.clone()
          caches.open(CONTENT_CACHE).then((cache) => {
            cache.put(request, responseToCache)
          })
          return response
        })
      })
    )
    return
  }

  // Default: network-first for everything else
  event.respondWith(
    fetch(request)
      .catch(() => {
        // If offline and not cached, return offline page
        if (request.mode === 'navigate') {
          return caches.match('/offline.html')
        }
      })
  )
})
