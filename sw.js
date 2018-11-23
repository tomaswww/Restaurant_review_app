// defindes a var for cache when going offline
var staticCache = "restaurantInfoOffline-v1";

// sets where to look for (url)
var urlToCache =[
  '/',
  '/index.html',
  '/restaurant.html',
  '/css/styles.css',
  '/data/restaurants.json',
  '/img/1.jpg',
  '/img/2.jpg',
  '/img/3.jpg',
  '/img/4.jpg',
  '/img/5.jpg',
  '/img/6.jpg',
  '/img/7.jpg',
  '/img/8.jpg',
  '/img/9.jpg',
  '/img/10.jpg',
  '/js/main.js',
  '/js/restaurant_info.js',
  '/js/dbhelper.js'
];

// start the install for the cache
self.addEventListener('install',function(event){
event.waitUntil(
  caches.open(staticCache).then(function(cache){
    return cache.addAll(urlToCache);
  }).catch(error =>{
    // just to see in the case I get an error
    console.log(error);
  })
)
});

// setting the activate event for new service serviceWorker

self.addEventListener('activate', function(event){
event.waitUntil(
caches.keys().then(function(cacheNames){
  return Promise.all(
  cacheNames.filter(function(cacheName) {
    return cacheName.startsWith('restaurant-')&&
      cacheName != staticCache;
  }),map(function(cacheName){
    return caches.delete(cacheName);
  })
)
})
)
})

// Here I define the commands for the service worker:
// source: https://developers.google.com/web/fundamentals/primers/service-workers/
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }

        // IMPORTANT: Clone the request. A request is a stream and
        // can only be consumed once. Since we are consuming this
        // once by cache and once by the browser for fetch, we need
        // to clone the response.
        var fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          function(response) {
            // Check if we received a valid response
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // IMPORTANT: Clone the response. A response is a stream
            // and because we want the browser to consume the response
            // as well as the cache consuming the response, we need
            // to clone it so we have two streams.
            var responseToCache = response.clone();

            caches.open(staticCache)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
    );
});
