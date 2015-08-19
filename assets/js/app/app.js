angular.module("baranggoApp", ["ngRoute", "baranggoApp.controllers", "baranggoApp.services"])

.config(function ($routeProvider) {
	$routeProvider
		.when("/", {
			templateUrl: APP_URL + "views/home.html",
			controller: "HomeController"
		})

		.when("/census", {
			templateUrl: APP_URL + "views/census.html",
			controller: "CensusController"
		});
});