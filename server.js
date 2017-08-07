'use strict'
import expressapp from './config/lib/express.js';
import nconf from 'nconf';
import log from './config/lib/logger.js';
import path from 'path';

// App configuration arguments
nconf.argv()
    .env()
    .file({ file: path.resolve('./config.json') });

var app = expressapp.init();

app.get('/', (req, res) => {    res.sendFile(path.join(__dirname + '/build/index.html'));});
const server = app.listen(nconf.get('PORT'), (err) => {

    if (err) {
        log.error('Error while listening port', err);
    }

    log.info('App is running at http://%s:%s', server.address().address, server.address().port);
});

module.exports = server;
