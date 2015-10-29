angular.module('baranggoApp', ['baranggoApp.controllers', 'baranggoApp.services', 'ui.router', 'smart-table', 'validation', 'validation.rule'])

.config(function($urlRouterProvider, $stateProvider) {

    // default
    $urlRouterProvider.otherwise('/home');

    $stateProvider

    // HOME STATES AND NESTED VIEWS ========================================
    .state('home', {
        url: '/home',
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl as vm'
    })

    // nested list with custom controller
    .state('censuses', {
        url: '/censuses',
        templateUrl: 'views/censuses.html',
        controller: 'CensusCtrl as vm'
    })

    .state('new-record', {
        url: '/new-record',
        templateUrl: 'views/new-record.html',
        controller: 'NewRecordCtrl as vm'
    })

    .state('residences', {
        url: '/residences',
        templateUrl: 'views/residences.html',
        controller: 'ResidenceCtrl as vm'
    })

    .state('form', {
        url: '/form',
        templateUrl: 'views/form.html',
        controller: 'FormCtrl as vm'
    })

    .state('form.address', {
        url: '/address',
        templateUrl: 'views/form-address.html',
        controller: 'FormCtrl'
    })

    .state('form.profile', {
        url: '/profile',
        templateUrl: 'views/form-profile.html',
        controller: 'FormCtrl'
    })

    .state('form.parents', {
        url: '/parents',
        templateUrl: 'views/form-parents.html',
        controller: 'FormCtrl'
    })

    .state('form.confirm', {
        url: '/confirm',
        templateUrl: 'views/form-confirm.html',
        controller: 'FormCtrl'
    })

    .state('map', {
        url:'/map',
        templateUrl: 'views/map.html',
        controller: 'MapCtrl'
    })

    .state('brgy-clearance', {
        url:'/brgy-clearance',
        templateUrl: 'views/reports/brgy-clearance.html',
        controller: 'ReportsCtrl'
    })

    .state('brgy-bus-clearance', {
        url:'/brgy-bus-clearance',
        templateUrl: 'views/reports/brgy-bus-clearance.html',
        controller: 'ReportsCtrl'
    })

    .state('cert-of-closure', {
        url:'/cert-of-closure',
        templateUrl: 'views/reports/cert-of-closure.html',
        controller: 'ReportsCtrl'
    });
})

.directive('modal', function() {
    return {
        template: '<div class="modal modal-wide fade">' +
            '<div class="modal-dialog">' +
            '<div class="modal-content">' +
            '<div class="modal-header">' +
            '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
            '<h4 class="modal-title">{{ title }}</h4>' +
            '</div>' +
            '<div class="modal-body" ng-transclude></div>' +
            '</div>' +
            '</div>' +
            '</div>',
        restrict: 'E',
        transclude: true,
        replace: true,
        scope: true,
        link: function postLink(scope, element, attrs) {
            scope.title = attrs.title;

            scope.$watch(attrs.visible, function(value) {
                if (value == true)
                    $(element).modal('show');
                else
                    $(element).modal('hide');
            });

            $(element).on('shown.bs.modal', function() {
                scope.$apply(function() {
                    scope.$parent[attrs.visible] = true;
                });
            });

            $(element).on('hidden.bs.modal', function() {
                scope.$apply(function() {
                    scope.$parent[attrs.visible] = false;
                });
            });
        }
    };
})

.filter('num', function() {
    return function(input) {
      return parseInt(input, 10);
    };
});
