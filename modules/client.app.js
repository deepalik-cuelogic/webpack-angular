'use strict';
//var angular = require('angular');
(function() {
	var angular = require('angular');
    // Declare app level module
    angular
        .module('lessonBeeApp', [
            'ui.router',
            'base',
            'user'
        ])
        .config(['$stateProvider', '$urlRouterProvider','$locationProvider']);
         angular.element(document).ready(function() {
	     angular.bootstrap(document);
	   });

});
