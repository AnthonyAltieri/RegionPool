/**
 * @author Anthony Altieri on 10/23/16.
 */

import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import session from 'express-session';
import fs from 'fs';
import mongoose from 'mongoose';
const MongoStore = require('connect-mongo/es5')(session);
const app = express();
const PORT = 4040;

mongoose.connect('mongodb://localhost/RegionPool');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Database connection is open.');
});

app.use((req, res, next) => {
  res.error = (error) => {
    res.send({
      error: error,
    })
  };
  res.success = () => {
    res.send({
      success: true,
    })
  };
  next();
});

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, *');
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/static/img', express.static(path.join(__dirname, '../../Frontend/img')));
app.use('/static', express.static(path.join(__dirname, '../../Frontend/dist')));

app.post('/data.json', (req, res) => {
  const json = fs.readFileSync(path.join(__dirname, '../data.json'));
  res.send(json);
});

app.get('/*', (req, res) => {
  console.log('__dirname', __dirname);
  console.log(path.join(__dirname, '../../Frontend/index.html'));
  res.sendFile(path.join(__dirname, '../../Frontend/index.html'));
});

const UserRouter = require('./routers/User');
app.use('/api/user', UserRouter);

app.listen(PORT, function() {
  console.log('listening on port ' + PORT);
});
