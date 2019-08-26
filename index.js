const express = require('express');
const webPush = require('web-push');
const path = require('path');
const dotenv = require('dotenv');
const router = require('./routes');

dotenv.config();

const app = express();
const { PUBLIC_VAPID_KEY, PRIVATE_VAPID_KEY} = process.env
app.use(express.json());
app.use(express.static(path.join(__dirname, 'client')));
app.use('/api/v1', router);

webPush.setVapidDetails('mailto:example@yourdomain.org', PUBLIC_VAPID_KEY, PRIVATE_VAPID_KEY);

app.listen(5000, () => console.info('server running on port 5000'));
