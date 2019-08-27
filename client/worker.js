self.addEventListener('push', e => {
    const data = e.data;
    self.registration.showNotification(data, {
        body: 'Notified by TheDrizzyWay',
        icon: 'https://avatars0.githubusercontent.com/u/43966210?s=400&u=5d0597677e6dc52122ac1ccc47ebb1d8dbfcffd8&v=4'
    })
});