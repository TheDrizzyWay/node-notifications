const express = require('express');
const webpush = require('web-push');
const dotenv = require('dotenv');

const router = new express.Router();
dotenv.config();

const { PUBLIC_VAPID_KEY, PRIVATE_VAPID_KEY} = process.env;
webpush.setVapidDetails('mailto:test@email.org', PUBLIC_VAPID_KEY, PRIVATE_VAPID_KEY);

router.post('/notify', (req, res) => {
    const subscription = req.body;
    res.status(201).json({});
    webpush.sendNotification(subscription, 'Test Notification');
});

module.exports = router;
