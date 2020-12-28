importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

if (workbox) {
    console.log(`Yay! Workbox is loaded 🎉`);
} else {
    console.log(`Boo! Workbox didn't load 😬`);
}

workbox.routing.registerRoute(
    //   return request.destination === 'document' || request.destination === 'image'
    ({ request }) => {
        return true;
    },
    new workbox.strategies.CacheFirst({
        cacheName: 'cache',
    })
);


