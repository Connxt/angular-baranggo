angular.module("baranggoApp.controllers", [])

.controller("CensusesController", function ($scope, Censuses) {
	$scope.person = {};

	var getAllCensuses = function () {
		Censuses.getAllCensuses().then(function (data) {
			$scope.censuses = data;
		}, function (data) {
			alert("error: " + data);
		});
	};
	getAllCensuses();

	$scope.addPerson = function () {
		Censuses.addPerson($scope.person.last_name, $scope.person.first_name, $scope.person.middle_name);
	};
});