angular.module("baranggoApp.controllers", [])

.controller("MainController", function ($scope) {
	console.log("Main");
})

.controller("HomeController", function ($scope) {
	console.log("Home");
})

.controller("CensusController", function ($scope, Censuses) {
	console.log("Census");

	$scope.person = {};

	var getAllCensuses = function () {
		Censuses.getAllCensuses().then(function (data) {
			$scope.censuses = data;
		}, function (data) {
			alert("error: " + data);
		});
	};
	// getAllCensuses();

	$scope.addPerson = function () {
		Censuses.addPerson($scope.person.last_name, $scope.person.first_name, $scope.person.middle_name);
	};
});