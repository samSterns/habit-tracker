const express = require('express');
const app = express();

app.use(express.json());
app.use(require('cookie-parser')());
app.use(express.static('public'));
app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/habits', require('./routes/habit'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
