const express = require('express');

const router = new express.Router();

router.post('/webpush', (req, res) => {
    const subscription = req.body;
    res.status(201).json({});
    const payload = JSON.stringify({ title: 'Test Notification' });
    webpush.sendNotification(subscription, payload);
});

module.exports = router;
