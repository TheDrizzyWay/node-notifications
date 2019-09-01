const express = require('express');
const webpush = require('web-push');
const dotenv = require('dotenv');
const Mailgun = require('mailgun-js')

const router = new express.Router();
dotenv.config();

const { PUBLIC_VAPID_KEY, PRIVATE_VAPID_KEY, MAILGUN_API_KEY, MAILGUN_DOMAIN } = process.env;
const mailer = new Mailgun({ apiKey: MAILGUN_API_KEY, domain: MAILGUN_DOMAIN });
webpush.setVapidDetails('mailto:test@email.org', PUBLIC_VAPID_KEY, PRIVATE_VAPID_KEY);

router.post('/notify', (req, res) => {
    const subscription = req.body;
    res.status(201).json({});
    webpush.sendNotification(subscription, 'Test Notification');
});

router.get('/mail', (req, res) => {
    req.body = `test mail y'all`;
    const data = {
        from: 'Drizzy <sender address>',
        to: 'recipient-address',
        subject: req.body,
        text: 'Testing some Mailgun awesomeness!'
      };

    mailer.messages().send(data, (error, body) => {
      if (error) return res.status(400).json({ message: error });
      console.log(body);
      return res.status(200).json({ message: 'sent' });
    });
});

module.exports = router;
