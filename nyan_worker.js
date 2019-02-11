function urlB64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');
  
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
  
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

const applicationServerPublicKey = 'BLXtgWVNwtecTmd7BOU9yShoGW_fwaLT-Gvl9DBG0J4lUA1qUuzN1vA33SmMLawRumzQaQaI18VxjiO4IQ29XPM';

function subscribe() {
    const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
    swRegistration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: applicationServerKey
      })
      .then((subscription) => {
        console.log('[Nyan.Worker] is subscribed to server');
        
        isSubscribed = true;
        
        console.log(JSON.stringify(subscription));
      })
      .catch((error) => {
        console.log('[Nyan.Worker] failed to subscribe:', error);
      });
}

function initialize() {
    subscribe();

    swRegistration.pushManager.getSubscription()
    .then((subscription) => {
        isSubscribed = !(subscription === null);

        if (isSubscribed) {
            console.log('[Nyan.Worker] is subscribed');
        } else {
            console.log('[Nyan.Worker] is not subscribed');
        }
    });
}

if ('serviceWorker' in navigator && 'PushManager' in window) {
    navigator.serviceWorker.register('/serviceWorker.js')
    .then((swReg) => {
        console.log('[Nyan.Worker] is registered');

        swRegistration = swReg;
        initialize();
    }).catch((error) => {
        console.log('[Nyan.Worker] error:', error);
    });
  } else {
      console.log(
          'has serviceWorker:', 'serviceWorker' in navigator,
          'has PushManager:', 'PushManager' in window
        );
  }
