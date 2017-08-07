/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("nconf");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _winston = __webpack_require__(13);

var _winston2 = _interopRequireDefault(_winston);

var _fs = __webpack_require__(3);

var _fs2 = _interopRequireDefault(_fs);

var _path = __webpack_require__(0);

var _path2 = _interopRequireDefault(_path);

var _moment = __webpack_require__(14);

var _moment2 = _interopRequireDefault(_moment);

var _settings = __webpack_require__(15);

var _settings2 = _interopRequireDefault(_settings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var logDir = _settings2.default.LOG_DIR;
var logFileExtension = _settings2.default.LOG_FILE_EXTENSION;
var fileDate = (0, _moment2.default)().format(_settings2.default.MOMENT_FORMAT);
var traceLogLabel = {};
var logFilePath = _path2.default.resolve(logDir) + '/' + fileDate + logFileExtension;

// To create a folder with given path
var createDir = function createDir(folderPath) {
    if (!_fs2.default.existsSync(folderPath)) {
        _fs2.default.mkdirSync(folderPath);
    }
};

// To create a file with given filepath
var createFile = function createFile(filePath) {
    if (!_fs2.default.existsSync(filePath)) {
        _fs2.default.writeFile(filePath, '', { flag: 'wx' }, function (err) {
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
var infologger = new _winston2.default.Logger({
    level: "info",
    transports: [new _winston2.default.transports.Console(), new _winston2.default.transports.File({ filename: logFilePath })]
});

// create error logger 
var errorLogger = new _winston2.default.Logger({
    level: "error",
    transports: [new _winston2.default.transports.Console(), new _winston2.default.transports.File({ filename: logFilePath })]
});

// create debug logger 
var debugLogger = new _winston2.default.Logger({
    level: "debug",
    transports: [new _winston2.default.transports.Console(), new _winston2.default.transports.File({ filename: logFilePath })]
});

module.exports = {
    info: infologger.info,
    error: errorLogger.error,
    debug: debugLogger.debug
};

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _express = __webpack_require__(5);

var _express2 = _interopRequireDefault(_express);

var _nconf = __webpack_require__(1);

var _nconf2 = _interopRequireDefault(_nconf);

var _logger = __webpack_require__(2);

var _logger2 = _interopRequireDefault(_logger);

var _path = __webpack_require__(0);

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// App configuration arguments
_nconf2.default.argv().env().file({ file: _path2.default.resolve('./config.json') });

var app = _express2.default.init();
var server = app.listen(_nconf2.default.get('PORT'), function (err) {

    if (err) {
        _logger2.default.error('Error while listening port', err);
    }

    _logger2.default.info('App is running at http://%s:%s', server.address().address, server.address().port);
});

module.exports = server;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var _express = __webpack_require__(7);

var _express2 = _interopRequireDefault(_express);

var _bodyParser = __webpack_require__(8);

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cors = __webpack_require__(9);

var _cors2 = _interopRequireDefault(_cors);

var _glob = __webpack_require__(10);

var _glob2 = _interopRequireDefault(_glob);

var _path = __webpack_require__(0);

var _path2 = _interopRequireDefault(_path);

var _nconf = __webpack_require__(1);

var _nconf2 = _interopRequireDefault(_nconf);

var _authenticateServer = __webpack_require__(11);

var _authenticateServer2 = _interopRequireDefault(_authenticateServer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Initialize application middleware
 */
var initMiddleware = function initMiddleware(app) {
    app.use((0, _cors2.default)());

    // Request body parsing middleware should be above methodOverride
    app.use(_bodyParser2.default.urlencoded({
        extended: true
    }));

    app.use(_bodyParser2.default.json());

    //app.use('/', authenticate.authenticate());

    // Add the cookie parser and flash middleware
    /*app.use(cookieParser());*/

    //Handled Unhandled Rejection
    process.on('unhandledRejection', function (reason) {
        log.error('Unhandled Rejection handled in server file Error: ', reason);
    });
};

var initServerModuleRoutes = function initServerModuleRoutes(app) {
    (0, _glob2.default)("./modules/**/server/route/*.js", function (err, files) {
        files.forEach(function (filePath) {
            !(function webpackMissingModule() { var e = new Error("Cannot find module \".\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())(app);
        });
    });
};

module.exports.init = function () {
    var app = (0, _express2.default)();
    initMiddleware(app);
    initServerModuleRoutes(app);
    return app;
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 6 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("cors");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("glob");

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Authenticate = undefined;

var _jsonwebtoken = __webpack_require__(12);

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _logger = __webpack_require__(2);

var _logger2 = _interopRequireDefault(_logger);

var _fs = __webpack_require__(3);

var _fs2 = _interopRequireDefault(_fs);

var _path = __webpack_require__(0);

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Read the keycloak certification file
var cert = _fs2.default.readFileSync(_path2.default.resolve("./keycloak_certfile.pem"));

var Authenticate = exports.Authenticate = function Authenticate() {
    var _this = this;

    _classCallCheck(this, Authenticate);

    this.authenticate = function (req, res, next) {
        var self = _this;
        return function (req, res, next) {
            _logger2.default.info("Authenticate: going to authenticate request " + req.originalUrl);
            if (!req.body.isAuthorized) {
                //get the token
                try {

                    var auth = req.headers.authorization;
                    var access_token = auth.split(" ")[1];
                    if (access_token) {

                        //verify the token
                        _jsonwebtoken2.default.verify(access_token, cert, { algorithms: ["RS256"] }, function (err, decoded) {

                            if (err) {
                                _logger2.default.error("Error", err);

                                //if expired
                                if (self.checkTokenExpired(err)) {
                                    res.status(401).json({ message: "Not Authenticated" });
                                } else {
                                    //tampered
                                    _logger2.default.info("Request is tampered");
                                    res.status(401).json({ message: "Not Authenticated" });
                                }
                            } else {
                                //authenticate request
                                req.body.user_id = decoded["sub"];
                                req.body.user = {};
                                req.body.user.id = decoded["sub"];
                                req.body.user.name = decoded["name"];
                                req.body.user.given_name = decoded["given_name"];
                                req.body.user.username = decoded["preferred_username"];
                                req.body.user.email = decoded["email"];
                                next();
                            }
                        });
                    } else {
                        //logger.error("No access token in request");
                        res.status(400).json({ message: "Bad Request.Missing Token." });
                    }
                } catch (err) {
                    _logger2.default.info("Bad Request");
                    res.status(400).json({ message: "Bad Request" });
                }
            } else {
                _logger2.default.info("Authenticate: No request authentication performed as request already authorized " + req.originalUrl + " " + req.body.isAuthorized);
                next();
            }

            var checkTokenExpired = function checkTokenExpired(err) {
                if (err.name === "TokenExpiredError") {
                    return true;
                }
                return false;
            };
        };
    };
};

exports.default = new Authenticate();

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("jsonwebtoken");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("winston");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("moment");

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**constants
 * Constants variable  	
 */
module.exports = {
  MOMENT_FORMAT: "LL",
  LOG_DIR: "logs",
  LOG_FILE_EXTENSION: ".log",
  LOG_TRACE: true
};

/***/ }),
/* 16 */
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 16;

/***/ })
/******/ ]);