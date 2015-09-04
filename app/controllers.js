angular.module("baranggoApp.controllers", [])

.controller("MainCtrl", function ($scope, $location) {
	$scope.isActive = function (viewLocation) {
		return viewLocation === $location.path();
	};
})

.controller("HomeCtrl", function ($scope, Censuses) {
	Censuses.getAllCensuses().success(function (response) {
		console.log(response);
	});
})

.controller("StatisticsCtrl", function ($scope) {

});