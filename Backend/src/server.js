/**
 * @author Anthony Altieri on 10/23/16.
 */

import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import database from './db';
import session from 'express-session';
import fs from 'fs';
import https from 'https';
import { v1 } from 'node-uuid';
import mongoose from 'mongoose';
const MongoStore = require('connect-mongo/es5')(session);
const app = express();
const ports = [80, 443];

const server = https.createServer({
	key: fs.readFileSync(path.join(__dirname, '../../../tls/key.pem')),
	cert: fs.readFileSync(path.join(__dirname, '../../../tls/cert.pem'))
	},
	app
);

app.use('*', (req, res, next) => {
	if (req.secure) {
		next();
		return;
	}
	res.redirect('https://regionpool.xyz' + req.url);
});



mongoose.connect('mongodb://localhost/RegionPool');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Database connection is open.');
});

const store =

app.use(session({
  genid: req => v1(),
  secret: 'ALTIERI',
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
}));

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
  res.setHeader('Access-Control-Allow-Origin', 'http://regionpool.xyz');
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


// For A/B test
app.get('/dash/main', (req, res) => {
  const html = `
  <!DOCTYPE html>
<html lang="en">
<head>
    <!-- Google Analytics Content Experiment code -->
<script>function utmx_section(){}function utmx(){}(function(){var
k='128753037-0',d=document,l=d.location,c=d.cookie;
if(l.search.indexOf('utm_expid='+k)>0)return;
function f(n){if(c){var i=c.indexOf(n+'=');if(i>-1){var j=c.
indexOf(';',i);return escape(c.substring(i+n.length+1,j<0?c.
length:j))}}}var x=f('__utmx'),xx=f('__utmxx'),h=l.hash;d.write(
'<sc'+'ript src="'+'http'+(l.protocol=='https:'?'s://ssl':
'://www')+'.google-analytics.com/ga_exp.js?'+'utmxkey='+k+
'&utmx='+(x?x:'')+'&utmxx='+(xx?xx:'')+'&utmxtime='+new Date().
valueOf()+(h?'&utmxhash='+escape(h.substr(1)):'')+
'" type="text/javascript" charset="utf-8"><\/sc'+'ript>')})();
</script><script>utmx('url','A/B');</script>
<!-- End of Google Analytics Content Experiment code -->
    <script>
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

        ga('create', 'UA-87922603-1', 'auto');
        ga('send', 'pageview');

    </script>
    <!-- @author Anthony Altieri -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <script async defer
            src="https://maps.googleapis.com/maps/api/js?libraries=geometry&key=AIzaSyDCC8dfErgORDAlxl7_fwOmgPzA_qsJd6g&callback=initMap">
    </script>
    <title>RegionPool</title>
    <link href="https://fonts.googleapis.com/css?family=Courgette|Rubik:300,400,500,700" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet">

</head>
<body class="fullscreen">
<div id="root"></div>
<script>
  window.__PRELOADED_STATE__ = ${JSON.stringify(req.session.state)}
</script>
<script src="/static/app.bundle.js"></script>
</body>
</html>
`
  res.send(html);
});

app.get('/dash/mainOld', (req, res) => {
  const html = `
  <!DOCTYPE html>
<html lang="en">
<head>
    <script>
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

        ga('create', 'UA-87922603-1', 'auto');
        ga('send', 'pageview');

    </script>
    <!-- @author Anthony Altieri -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <script async defer
            src="https://maps.googleapis.com/maps/api/js?libraries=geometry&key=AIzaSyDCC8dfErgORDAlxl7_fwOmgPzA_qsJd6g&callback=initMap">
    </script>
    <title>RegionPool</title>
    <link href="https://fonts.googleapis.com/css?family=Courgette|Rubik:300,400,500,700" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet">

</head>
<body class="fullscreen">
<div id="root"></div>
<script>
  window.__PRELOADED_STATE__ = ${JSON.stringify(req.session.state)}
</script>
<script src="/static/app.bundle.js"></script>
</body>
</html>
`
  res.send(html);
});

app.get('/*', (req, res) => {
  console.log('__dirname', __dirname);
  console.log(path.join(__dirname, '../../Frontend/index.html'));
  res.sendFile(path.join(__dirname, '../../Frontend/index.html'));
});

const UserRouter = require('./routers/User');
app.use('/api/user', UserRouter);
app.post('/api/state/save', (req, res) => {
  const { state } = req.body;
  req.session.state = state;
  res.send({ success: true });
});

server.listen(ports[1]);

app.listen(ports[0], function() {
	console.log('server starting');
});
