'use strict';

import winston from 'winston';
import fs from 'fs';
import path from 'path';
import moment from 'moment';
import settings from '../settings.js';

let logDir = settings.LOG_DIR;
let logFileExtension = settings.LOG_FILE_EXTENSION;
let fileDate = moment().format(settings.MOMENT_FORMAT);
let traceLogLabel = {};
let logFilePath = path.resolve(logDir) + '/' + fileDate + logFileExtension;

// To create a folder with given path
let createDir = (folderPath) => {
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
    }
};

// To create a file with given filepath
let createFile = (filePath) => {
    if (!fs.existsSync(filePath)) {
        fs.writeFile(filePath, '', { flag: 'wx' }, function(err) {
            if (err) {
                console.log(err);
            }
        });
    }
};

// create directories
createDir(logDir);

// create file
createFile(logFilePath);

// create info logger 
let infologger = new winston.Logger({
    level: "info",
    transports: [
        new(winston.transports.Console)(),
        new(winston.transports.File)({ filename: logFilePath })
    ]
});

// create error logger 
let errorLogger = new winston.Logger({
    level: "error",
    transports: [
        new(winston.transports.Console)(),
        new(winston.transports.File)({ filename: logFilePath })
    ]
});

// create debug logger 
let debugLogger = new winston.Logger({
    level: "debug",
    transports: [
        new(winston.transports.Console)(),
        new(winston.transports.File)({ filename: logFilePath })
    ]
});



module.exports = {
    info: infologger.info,
    error: errorLogger.error,
    debug: debugLogger.debug,
};