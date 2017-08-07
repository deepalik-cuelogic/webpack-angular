'use strict';
//user module js files
require('./modules/client.app.js');
require.context('./modules/user/client', true, /\.js$/);
require.context('./modules/base/client', true, /\.js$/);
import './assets/css/main.css'