angular.module("baranggoApp.controllers", [])

.controller("MainCtrl", function ($scope, $location) {
	$scope.isActive = function (viewLocation) {
		return viewLocation === $location.path();
	};
})

.controller("HomeCtrl", function ($scope) {

})

.controller("PersonsCtrl", function ($scope) {

});