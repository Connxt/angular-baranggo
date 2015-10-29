angular.module("baranggoApp.controllers", [])

.controller("MainCtrl", ['$location', '$scope', function($location, $scope) {
    var vm = this;
    vm.settings = {};

    vm.showSettingsModal = false;

    vm.toggleModal = function() {
        vm.showSettingsModal = !vm.showSettingsModal;
    };

    vm.save = function(settings) {
        console.log(settings);
        window.localStorage['brgy'] = settings.brgy;
        window.localStorage['city'] = settings.city;
        window.localStorage['province'] = settings.province;
        window.localStorage['zip'] = settings.zip;
    }

    // Initialize fields
    if (window.localStorage['brgy'] != undefined  && window.localStorage['city'] != undefined && window.localStorage['province'] != undefined && window.localStorage['zip'] != undefined) {
        vm.settings.brgy = window.localStorage['brgy'];
        vm.settings.city = window.localStorage['city'];
        vm.settings.province = window.localStorage['province'];
        vm.settings.zip = window.localStorage['zip'];
    };


    $scope.isActive = function(viewLocation) {
        return viewLocation === $location.path();
    };
}])

.controller("HomeCtrl", ['Persons','$scope', function(Persons,$scope) {


    var day = moment(moment()._d).format('Do');
    var month = moment(moment()._d).format('MMMM')

    alert(day + " day of " + month);

    Persons.getAll().then(function(response) {
        console.log(response);
    })
}])

.controller("CensusCtrl", ['$scope', 'Persons', function($scope, Persons) {
    var vm = this;
    vm.persons = [];
    
    $scope.showModal = false;
    $scope.showViewCensus = false;
    $scope.showEditCensus = false;

    Persons.getAll().then(function(res) {
        var persons = JSON.stringify(res);
        vm.persons = res.data;
        console.log(res.data)
    })



    // var persons = Persons.getAll();
    // console.log(persons);






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

.controller('ResidenceCtrl', ['$scope', 'Residences',  function($scope, Residences) {
    var vm = this;
    vm.residence = {};
    vm.residences = [];

    $scope.showModal = false;
    $scope.toggleModal = function() {
        $scope.showModal = !$scope.showModal;
    };



    // Initialize new residence fields
    if (window.localStorage['brgy'] != undefined  && window.localStorage['city'] != undefined && window.localStorage['province'] != undefined  && window.localStorage['zip'] != undefined) {
        vm.residence.brgy = window.localStorage['brgy'];
        vm.residence.city = window.localStorage['city'];
        vm.residence.province = window.localStorage['province'];
        vm.residence.zip = window.localStorage['zip'];
    };

    setTimeout(function() {
        vm.read();
    }, 1000)

    // Create Residence
    vm.save = function(residence) {
        // residence.barangayId = 1;
        // residencesidence.longitude = 100;
        // residence.latitude = 100;
        // residence.code = "QWEQWEQWE"
        console.log(residence);
        Residences.add(residence).then(function(res) {
            console.log(res);
            vm.residence.blockNo = "";
            vm.residence.lotNo = "";
            vm.residence.street = "";
            vm.residence.subdivision = "";
        });
        
    }

    // Read Residence
    vm.read = function() {
        Residences.getAll().then(function(res) {
            console.log(res.data);
            vm.residences = res.data;
        })
    }

    // Update Residence

    // Delete Residence
}])

.controller('FormCtrl', ['$scope', 'Persons', 'Residences', '$filter', function($scope, Persons, Residences, $filter) {
    var vm = this;
    vm.residences = [];
    vm.foundAddress = {}
    vm.person = {};
    // vm.person.residenceId = 1;
    vm.person.children = [];
    vm.person.siblings = [];

    // Read Residence
    vm.getAllResidence = function() {
        Residences.getAll().then(function(res) {
            console.log(res.data);
            vm.residences = res.data;
        })
    }
    vm.getAllResidence();

    vm.findAddress = function(residenceId) {
        vm.foundAddress = $filter('filter')(vm.residences, {id: residenceId})[0];
        console.log(vm.foundAddress);
    }
    

     $scope.isCollapsed = false;



    vm.addChild = function(child) {
        child.id = new Date().getTime();
        vm.person.children.push(child);
        console.log(vm.person.children);
    }

    vm.save = function() {
        console.log("Personal Info : " + JSON.stringify(vm.person));
        console.log("Personal Info non JSON : " + vm.person);
        Persons.add(vm.person).then(function(res) {
            console.log(res);
        });
    }

     $scope.isEmpty = function(obj) {
      for(var prop in obj) {
          if(obj.hasOwnProperty(prop))
              return false;
      }
      return true;
    };
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
