// Simple Express server setup to serve the build output
const compression = require('compression');
const helmet = require('helmet');
const express = require('express');
const path = require('path');

const app = express();
/*app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: ["'self'"],
            scriptSrcElem: [
                "'self'",
                "'unsafe-inline'",
                '*.googletagmanager.com',
                '*.google-analytics.com',
                '*.api.exchangeratesapi.io'
            ],
            styleSrc: ["'self'", "'unsafe-inline'"],
            connectSrc: ['*.google-analytics.com', 'www.googleapis.com','*.api.exchangeratesapi.io'],
            imgSrc: ["'self'", '*.google-analytics.com','*.api.exchangeratesapi.io']
        }
    })
);*/
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.use(compression());

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3001;
const DIST_DIR = './dist';

app.use(express.static(DIST_DIR));

app.use('*', (req, res) => {
    res.sendFile(path.resolve(DIST_DIR, 'index.html'));
});

app.listen(PORT, () =>
    console.log(`✅  Server started: http://${HOST}:${PORT}`)
);
