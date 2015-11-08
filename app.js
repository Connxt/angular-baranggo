angular.module('baranggoApp', ['baranggoApp.controllers', 'baranggoApp.services', 'ui.router', 'smart-table', 'validation', 'validation.rule', 'angularMoment', '720kb.datepicker', 'ui.bootstrap', 'angular-confirm'])

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
    .state('persons', {
        url: '/persons',
        templateUrl: 'views/persons.html',
        controller: 'PersonCtrl as vm'
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

    .state('form-edit', {
        url: '/form-edit',
        templateUrl: 'views/form-edit.html',
        controller: ''
    })

    .state('form-edit.address', {
        url: '/address/:personId',
        templateUrl: 'views/form-edit-address.html',
        controller: 'FormEditCtrl as vm'
    })

    .state('form-edit.profile', {
        url: '/profile/:personId',
        templateUrl: 'views/form-edit-profile.html',
        controller: 'FormEditCtrl as vm'
    })

    .state('form-edit.parents', {
        url: '/parents/:personId',
        templateUrl: 'views/form-edit-parents.html',
        controller: 'FormEditCtrl as vm'
    })

    .state('form-edit.confirm', {
        url: '/confirm/:personId',
        templateUrl: 'views/form-edit-confirm.html',
        controller: 'FormEditCtrl as vm'
    })

    .state('map', {
        url:'/map',
        templateUrl: 'views/map.html',
        controller: 'MapCtrl'
    })

    .state('brgy-clearance', {
        url:'/brgy-clearance/:personId/:purpose/:remarks',
        templateUrl: 'views/reports/brgy-clearance.html',
        controller: 'BrgyClearanceCtrl as vm' 
    })

    .state('brgy-bus-clearance', {
        url:'/brgy-bus-clearance/:businessOwner/:businessName/:businessAddress/:businessType',
        templateUrl: 'views/reports/brgy-bus-clearance.html',
        controller: 'BrgyBusinessClearanceCtrl as vm'
    })

    .state('cert-of-closure', {
        url:'/cert-of-closure',
        templateUrl: 'views/reports/cert-of-closure.html',
        controller: 'CertificateOfClosureCtrl'
    })

    .state('brgy-clearance-list', {
        url:'/brgy-clearance-list',
        templateUrl: 'views/brgy-clearance-list.html',
        controller: 'BrgyClearanceListCtrl as vm'
    })

    .state('brgy-bus-clearance-list', {
        url:'/brgy-bus-clearance-list',
        templateUrl: 'views/brgy-bus-clearance-list.html',
        controller: 'BrgyBusinessClearanceListCtrl  as vm'
    })

    .state('cert-of-closure-list', {
        url:'/cert-of-closure-list',
        templateUrl: 'views/cert-of-closure-list.html',
        controller: 'CertificateOfClosureListCtrl  as vm'
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
