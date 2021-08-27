const express = require('express');
const socketio = require('socket.io');
const mongoose = require('mongoose');
const serverless = require('serverless-http');
const bodyparser = require('body-parser');
const compression = require('compression');
require('dotenv/config');

const app = express();
const io = socketio(app);

//router
app.use(compression());
app.use(bodyparser.json());
const HomeRouter = require('./routes/users');
const RoomRouter = require('./routes/rooms');
app.use('/.netlify/functions/api/users', HomeRouter);
app.use('/.netlify/functions/api/rooms', RoomRouter);

//socket connects
require('./routes/Socket')(io);

mongoose.connect(
  process.env.DB_CONNECTION_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log('db active')
);
module.exports = app;
module.exports.handler = serverless(app);
