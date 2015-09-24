angular.module("baranggoApp.controllers", [])

.controller("MainCtrl", ['$location', '$scope', function($location, $scope){
	$scope.isActive = function (viewLocation) {
		return viewLocation === $location.path();
	};
}])

.controller("HomeCtrl", ['Censuses', function(Censuses){
	Censuses.getAll().then(function (response) {
		console.log(response);
	})
}])

.controller("CensusCtrl", ['$scope', function($scope){
	var vm = this;
	$scope.showModal = false;
    $scope.toggleModal = function(){
        $scope.showModal = !$scope.showModal;
    };

    // 
    vm.rowCollection = [
        {firstName: 'Laurent', lastName: 'Renard', birthDate: new Date('1987-05-21'), balance: 102, email: 'whatever@gmail.com'},
        {firstName: 'Blandine', lastName: 'Faivre', birthDate: new Date('1987-04-25'), balance: -2323.22, email: 'oufblandou@gmail.com'},
        {firstName: 'Francoise', lastName: 'Frere', birthDate: new Date('1955-08-27'), balance: 42343, email: 'raymondef@gmail.com'}
    ];
}])

.controller("NewRecordCtrl", ['$scope', function($scope){
	var vm = this;

	vm.person = {};

	vm.save = function() {
		console.log("Hello World!");
	}


}])

.controller('ResidenceCtrl', ['', function(){
	
}]);