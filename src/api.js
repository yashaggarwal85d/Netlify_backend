const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const mongoose = require('mongoose');
const serverless = require('serverless-http');
const bodyparser = require('body-parser');
const compression = require('compression');
require('dotenv/config');

const app = express();

//router
app.use(compression());
app.use(bodyparser.json());
const HomeRouter = require('./routes/users');
const RoomRouter = require('./routes/rooms');
app.use('/.netlify/functions/api/users', HomeRouter);
app.use('/.netlify/functions/api/rooms', RoomRouter);

//socket connects
const server = http.createServer(app);
const io = socketio(server);
require('./routes/Socket')(io);

mongoose.connect(
  'mongodb+srv://Yash:c903a3d80@cluster0.noatc.mongodb.net/<dbname>?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log('db active')
);

module.exports = app;
module.exports.handler = serverless(app);
