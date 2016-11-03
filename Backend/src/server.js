/**
 * @author Anthony Altieri on 10/23/16.
 */

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const mongoose = require('mongoose');
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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/static/img', express.static(path.join(__dirname, '../../Frontend/img')));
app.use('/static', express.static(path.join(__dirname, '../../Frontend/dist')));

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
