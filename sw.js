//cache variebles
const staticCacheName = 'site-static-v1';
const dynamicCacheName = 'site-dynamic-v1';

//assets
const assets = [
    '/',
    '/index.html',
    'js/app.js',
    'css/main.css',
    'pages/oops.html'
]

// install service worker/ /
self.addEventListener('install', (event) =>{

    // console.log('service worker is installed');
    event.waitUntil(  
        caches.open(staticCacheName).then(cache => {
        console.log('caching shell assets');
        cache.addAll(assets)
    }))
})


//activate of service worker 
self.addEventListener('activate', (event) => {
    console.log('it is activated');
    event.waitUntil(
        caches.keys().then(keys => {
            // console.log(keys)ss
            return Promise.all(keys
                .filter(key => key !==staticCacheName && key !== dynamicCacheName)
                .map(key => caches.delete(key))
            )
        })
    )
})

// fetch event
self.addEventListener('fetch', event => {
    console.log(`fetch event ${event}`)
    event.respondWith(
        caches.match(event.request).then(cacheRes => {
            // console.log(cacheRes)
            return cacheRes || fetch(event.request).then(fetchRes => {
                return caches.open(dynamicCacheName).then(cache => {
                    cache.put(event.request.url, fetchRes.clone())
                    // limitCahceSize(dynamicCacheName, 2)
                    return fetchRes
                })
            });
        }).catch(() =>{
            if(event.request.url.indexOf('.html') > -1){
                return caches.match('/pages/oop.html')
            }
        })
    );
})