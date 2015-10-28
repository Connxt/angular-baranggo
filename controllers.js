angular.module("baranggoApp.controllers", [])

.controller("MainCtrl", ['$location', '$scope', function($location, $scope) {
    $scope.isActive = function(viewLocation) {
        return viewLocation === $location.path();
    };
}])

.controller("HomeCtrl", ['Persons', function(Persons) {

    var day = moment(moment()._d).format('Do');
    var month = moment(moment()._d).format('MMMM')

    alert(day + " day of " + month);


    Persons.getAll().then(function(response) {
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

.controller('FormCtrl', ['$scope', 'Persons', function($scope, Persons) {
    var vm = this;

    vm.person = {};
    vm.person.residenceId = 1;
    vm.person.children = [];
    vm.person.siblings = [];


    // vm.person.parent = {};
   

    vm.addChild = addChild;
    vm.save = save;

    

     $scope.isCollapsed = false;



    function addChild(child) {
        child.id = new Date().getTime();
        vm.person.children.push(child);
        console.log(vm.person.children);
    }

    function save() {
        console.log("Personal Info : " + JSON.stringify(vm.person));
        console.log("Personal Info non JSON : " + vm.person);
        Persons.add(vm.person).then(function(res) {
            console.log(res);
        });
    }
}])

.controller('MapCtrl', ['$scope', function ($scope) {
    
}])

.controller('ReportsCtrl', ['$scope', function($scope){
    
}])

//     // we will store all of our form data in this object
// .controller('FormCtrl', ['$scope', function($scope) {
//     // we will store all of our form data in this object
//   $scope.isCollapsed = false;

//     var vm = this;
//     vm.addChild = addChild;
//     vm.person = {};
//     vm.children = [];


//     vm.save = function() {
//         console.log("Hello World!");
//     }

//     function addChild(child) {
//         child.id = new Date().getTime();
//         vm.children.push(child);
//         console.log(vm.children);
//     }



// }]);
