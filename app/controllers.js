angular.module("baranggoApp.controllers", [])

.controller("MainCtrl", function ($scope, $location) {
	$scope.isActive = function (viewLocation) {
		return viewLocation === $location.path();
	};
})

.controller("HomeCtrl", function ($scope, Censuses) {
	Censuses.getAll().then(function (response) {
		
	})
})

.controller("PersonsCtrl", function ($scope) {

});