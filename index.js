const express = require('express');
const path = require('path');
const router = require('./routes');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'client')));
app.use('/api/v1', router);

app.listen(3000, () => console.info('server running on port 3000'));
