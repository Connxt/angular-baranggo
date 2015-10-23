angular.module("baranggoApp.controllers", [])

.controller("MainCtrl", function (
	$scope,
	$location,
	Persons,
	Residences) {

	$scope.isActive = function (viewLocation) {
		return viewLocation === $location.path();
	};

	/**
	 * Persons
	 */
	Persons.getAll().then(function (response) {
		console.log("All persons");
		console.log(response);
	});

	Persons.get(1).then(function (response) {
		console.log("Single Person");
		console.log(response);
	});

	/**
	 * Residences
	 */
	Residences.getAll().then(function (response) {
		console.log("All persons");
		console.log(response);
	});

	Residences.get(1).then(function (response) {
		console.log("Single Person");
		console.log(response);
	});
});