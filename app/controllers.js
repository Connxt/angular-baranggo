angular.module("baranggoApp.controllers", [])

.controller("MainCtrl", ['$location', '$scope', function($location, $scope) {
    $scope.isActive = function(viewLocation) {
        return viewLocation === $location.path();
    };
}])

.controller("HomeCtrl", ['Censuses', function(Censuses) {
    Censuses.getAll().then(function(response) {
        console.log(response);
    })
}])

.controller("CensusCtrl", ['$scope', function($scope) {
    var vm = this;
    $scope.showModal = false;
    $scope.showViewCensus = false;
    $scope.showEditCensus = false;



    $scope.toggleModal = function() {
        $scope.showModal = !$scope.showModal;
    };

    // View Census Modal
    $scope.toggleViewCensus = function() {
        $scope.showViewCensus = !$scope.showViewCensus;
    }

    // Edit Census Modal
    $scope.toggleEditCensus = function() {
        $scope.showEditCensus = !$scope.showEditCensus;
    };

    // 
    vm.rowCollection = [{
        firstName: 'John Anthony',
        lastName: 'Pecson',
        birthDate: new Date('1987-05-21'),
        gender: 'Male',
        email: 'whatever@gmail.com'
    }, {
        firstName: 'Blandine',
        lastName: 'Faivre',
        birthDate: new Date('1987-04-25'),
        gender: 'Male',
        email: 'oufblandou@gmail.com'
    }, {
        firstName: 'Francoise',
        lastName: 'Frere',
        birthDate: new Date('1955-08-27'),
        gender: 'Male',
        email: 'raymondef@gmail.com'
    }];


}])

.controller("NewRecordCtrl", ['$scope', function($scope) {
    var vm = this;
    vm.addItem = addItem;
    vm.addChild = addChild;
    vm.person = {};
    vm.children = [];
    

    vm.save = function() {
        console.log("Hello World!");
    }

    function addChild() {
        alert("Hello World")
        console.log("Adding child");
    }

    function addItem() {
      console.log("Hello World.");
    }

    


}])

.controller('ResidenceCtrl', ['$scope', function($scope) {
    $scope.showModal = false;
    $scope.toggleModal = function() {
        $scope.showModal = !$scope.showModal;
    };
}])

.controller('FormCtrl', ['$scope', function($scope) {
    // we will store all of our form data in this object


    // $scope.formData = {};
    // $scope.person = {};
    // // $scope.residenceId = $scope.person.residenceId;

    // // function to process the form
    // $scope.processForm = function() {
    //     alert('awesome!');
    // };

    // COLLAPSE =====================
  $scope.isCollapsed = false;   

    var vm = this;
    vm.addChild = addChild;
    vm.person = {};
    vm.children = [];
    

    vm.save = function() {
        console.log("Hello World!");
    }

    function addChild(child) {
        child.id = new Date().getTime();
        vm.children.push(child);
        console.log(vm.children);
    }

    

}]);
