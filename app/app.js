angular.module("baranggoApp", ["baranggoApp.controllers", "baranggoApp.services", "ngRoute"])

.config(function ($routeProvider) {
	$routeProvider
		.when("/", {
			templateUrl: APP_URL + "views/home.html",
			controller: "HomeCtrl"
		})

		.when("/persons", {
			templateUrl: APP_URL + "views/persons.html",
			controller: "PersonsCtrl"	
		});
});
