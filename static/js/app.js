/**
 * Created by user on 05.10.15.
 */

angular
    .module('myApp', [
        'ngRoute',
        'ngCookies',
        'ui.router',
        'ui.calendar',
        'ui.bootstrap',
        'ngAnimate',
        'ngResource',
        'ngSanitize',
        'myApp.services',
        'flash',
        'mgcrea.ngStrap',
        'ngMaterial',
        'angular-loading-bar',
        'angular.filter',
        'ngMessages'

    ])
    .config(function ($locationProvider, $httpProvider, $resourceProvider, $interpolateProvider, $routeProvider,
                      $compileProvider, $stateProvider, $urlRouterProvider) {

        // CSRF Support
        $httpProvider.defaults.xsrfCookieName = 'csrftoken';
        $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';

        $resourceProvider.defaults.stripTrailingSlashes = false;

        // Force angular to use square brackets for template tag
        // The alternative is using {% verbatim %}
        $interpolateProvider.startSymbol('[[').endSymbol(']]');

        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension):/);

        // enable html5Mode for pushstate ('#'-less URLs)
        $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('!');


        // Routing
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('auth-login', {
                url: '/login',
                templateUrl: '/static/partials/my_auth/login.html',
                controller: 'AuthController'
            })
            .state('auth-registration', {
                url: '/register',
                templateUrl: '/static/partials/my_auth/register.html',
                controller: 'RegistrationController'
            })
            .state('logout', {
                url: '/logout',
                controller: 'LogoutController'
            })
            .state('index', {
                url: '/',
                templateUrl: '/static/partials/index.html',
                controller: 'HomeController',
                controllerAs: 'vm',
                /*resolve: {
                  authenticated: ['djangoAuth', function(djangoAuth){
                    return djangoAuth.authenticationStatus(true);
                  }]
                }*/
            })
            .state('index.main', {
                url: '^/main',
                templateUrl: '/static/partials/main.html',
                controller: 'HomeController',
                controllerAs: 'vm'
            })
            .state('my-bookings', {
                url: '/my_bookings/',
                templateUrl: '/static/partials/my-bookings.html',
                controller: 'BookingsController'
            })
            .state('otherwise', {
                url : '*path',
                templateUrl: '/static/partials/index.html',
                controller: 'HomeController'
            })

    });