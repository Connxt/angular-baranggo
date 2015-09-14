angular.module('baranggoApp', ['baranggoApp.controllers', 'baranggoApp.services', 'ui.router'])

.config(function ($urlRouterProvider, $stateProvider) {

	// default
	$urlRouterProvider.otherwise('/home');

	$stateProvider

// HOME STATES AND NESTED VIEWS ========================================
    .state('home', {
    url: '/home',
    templateUrl: APP_URL + 'views/home.html',
    controller: 'HomeCtrl'
	})

	// nested list with custom controller
	.state('census', {
	    url: '/census',
	    templateUrl: APP_URL + 'views/census.html',
	    controller: 'CensusCtrl'
	})

	.state('new-record', {
	    url: '/new-record',
	    templateUrl: APP_URL + 'views/new-record.html',
	    controller: 'NewRecordCtrl as person'
	})
});
