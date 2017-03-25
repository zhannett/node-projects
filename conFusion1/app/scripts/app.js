'use strict';

angular.module('confusionApp', ['ui.router'])
    .config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider
            .otherwise('/');
        $stateProvider
        // route for the home page
            .state('app', {
                url: '/',
                views: {
                    'header': {
                        templateUrl: 'views/header.html'
                    },
                    'content': {
                        template: '<h1>To be Completed</h1>'//,
                        //controller: IndexController
                    },
                    'footer': {
                        templateUrl: 'views/footer.html'
                    }
                }
            })
            .state('app.aboutus', {
                url: 'aboutus',
                views: {
                    'content@': {
                        template:'<h1>To be Completed</h1>'
                    }
                }
            })
            .state('app.contactus', {
                url: 'contactus',
                views: {
                    'content@': {
                        templateUrl: 'views/contactus.html',
                        controller: 'ContactController'
                    }
                }
            })
            .state('app.menu', {
                url: 'menu',
                views: {
                    'content@': {
                        templateUrl: 'views/menu.html',
                        controller: 'MenuController'
                    }
                }
            })
            .state('app.dishdetails', {
                url: 'dishdetail/:id',
                views: {
                    'content@': {
                        templateUrl: 'views/dishdetail.html',
                        controller: 'DishDetailController'
                    }
                }
            });

    })