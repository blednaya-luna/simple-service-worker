self.addEventListener('install', (event) => {
    // install
});

self.addEventListener('activate', (event) => {
    // activate
});

self.addEventListener('fetch', (event) => {
    // fetch
});

self.addEventListener('push', (event) => {
    console.log('[Nyan.Worker] push received');
    
    const title = 'Nice title man';
    const options = {
        body: 'Yay it works!',
        icon: 'https://image.flaticon.com/icons/png/128/633/633584.png',
        badge: 'https://image.flaticon.com/icons/png/128/633/633584.png'
    };
    
    const notificationPromise = self.registration.showNotification(title, options);
    event.waitUntil(notificationPromise);
});

self.addEventListener('notificationclick', (event) => {
    console.log('[Nyan.Worker] notification click received');

    event.notification.close();

    event.waitUntil(
        clients.openWindow('http://nyan-nyan.online')
    );
});
