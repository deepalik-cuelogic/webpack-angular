'use strict';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import glob from "glob";
import path from "path";
import nconf from 'nconf';
import authenticate from '../../modules/user/server/authenticate/authenticate.server.js';

/**
 * Initialize application middleware
 */
const initMiddleware = (app) => {
    app.use(cors());

    // Request body parsing middleware should be above methodOverride
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use(bodyParser.json());
    app.use(express.static('build'))

    //app.use('/', authenticate.authenticate());

    // Add the cookie parser and flash middleware
    /*app.use(cookieParser());*/

    //Handled Unhandled Rejection
    process.on('unhandledRejection', (reason) => {
        log.error('Unhandled Rejection handled in server file Error: ', reason);
    });
};

const initServerModuleRoutes = (app) => {
    glob("./modules/**/server/route/*.js", (err, files) => {
        files.forEach((filePath) => {
            require(path.resolve(filePath))(app);
        });
    });
};

module.exports.init = () => {
    var app = express();
    initMiddleware(app);
    initServerModuleRoutes(app);
    return app;
};