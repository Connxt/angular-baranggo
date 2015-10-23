angular.module("baranggoApp", ["baranggoApp.controllers", "baranggoApp.services", "ui.router"])

.config(function ($urlRouterProvider, $stateProvider) {
	$urlRouterProvider.otherwise("/home");
});
