// defindes a var for cache when going offline
var staticCache = "restaurantInfoOffline";

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
    console.log(error);
  })
)
});

// Here I define the commands for the service worker:
self.addEventListener('fetch', function(event){
  event.respondWith(
    caches.match(event.request)
    .then(function(response){
    if(response){
      return response;
    }


    })
    );
  );
