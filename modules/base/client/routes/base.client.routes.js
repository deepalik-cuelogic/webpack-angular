(function() {
    'use strict';

    angular
        .module('base')
        .config(['$stateProvider', stateProvider])

    function stateProvider($stateProvider) {

        $stateProvider
            .state('base', {
                url: '/',
                template: '<h1>From angular</h1>'
            });
            console.log('state changed.')
    }

})();