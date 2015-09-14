angular.module("baranggoApp.controllers", [])

.controller("MainCtrl", function ($scope, $location) {
	$scope.isActive = function (viewLocation) {
		return viewLocation === $location.path();
	};
})

.controller("HomeCtrl", function ($scope, Censuses) {
	Censuses.getAll().then(function (response) {
		console.log(response);
	})
})

.controller("CensusCtrl", function ($scope) {

})

.controller("NewRecordCtrl", function ($scope) {
	var vm = this;

	this.save = function() {
		console.log("Hello World!");
	}
});