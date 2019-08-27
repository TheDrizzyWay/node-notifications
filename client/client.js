const publicVapidKey = 'BLAl9vZSTHA1uHD3Aou-t-qoSQNKsASrUhaFEjDAfPaXdruYuL63b6MXraPqCRcKFeFW9USWvZQgg4JdfaCA2Z0';

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');
  
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
  
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

async function send() {
    const register = await navigator.serviceWorker.register('worker.js', {
        scope: '/'
    });
    const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
    });

    await fetch('/api/v1/notify', {
        method: 'POST',
        body: JSON.stringify({ subscription }),
        headers: { 'content-type': 'application/json' }
    }).then(res => res.json());
}

if ('serviceWorker' in navigator) {
    send().catch(err => console.log(err));
}