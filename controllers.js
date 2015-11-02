angular.module("baranggoApp.controllers", [])

.controller("MainCtrl", ['$location', '$scope', 'Settings', 'Barangays', function($location, $scope, Settings, Barangays) {
    var vm = this;
    vm.settings = {};
    var settings = {};

    vm.showSettingsModal = false;
    vm.toggleModal = function() {
        vm.showSettingsModal = !vm.showSettingsModal;
    };

        
    // Initialize fields
     var isEmpty = function(obj) {
      for(var prop in obj) {
          if(obj.hasOwnProperty(prop))
              return false;
      }
      return true;
    };
    
    vm.getSettings = function(id) {
        var _id = id;
        if (isEmpty(vm.settings)) {
            Settings.get().then(function(res) {
                settings = res.data;
                vm.settings.brgyId = settings.barangay_id;
                vm.settings.brgy = settings.barangay;
                vm.settings.city = settings.city;
                vm.settings.province = settings.province;
                vm.settings.zip = settings.zip_code;
                
            })
        } else {
            Barangays.get(_id).then(function(res) {
            settings = res.data;
            console.log("Found settings: " + settings);
                vm.settings.brgyId = settings.barangay_id;
                vm.settings.brgy = settings.barangay;
                vm.settings.city = settings.city;
                vm.settings.province = settings.province;
                vm.settings.zip = settings.zip_code;
            })
        }
    }
    vm.getSettings();

    vm.save = function(settings) {
        console.log("Saving settings: " + settings);

        Settings.add(vm.settings.brgyId).then(function(res) {
            console.log(res);
        });
    }


    $scope.isActive = function(viewLocation) {
        return viewLocation === $location.path();
    };
}])

.controller("HomeCtrl", ['Persons','$scope', function(Persons,$scope) {


   

    Persons.getAll().then(function(response) {
        console.log(response);
    })
}])

.controller("PersonCtrl", ['$scope', 'Persons', function($scope, Persons) {
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

.controller('ResidenceCtrl', ['$scope', 'Residences', 'Settings',  function($scope, Residences, Settings) {
    var vm = this;
    vm.residence = {};
    vm.residences = [];

    $scope.showModal = false;
    $scope.toggleModal = function() {
        $scope.showModal = !$scope.showModal;
    };

    // Initialize new residence fields
    // if (window.localStorage['brgy'] != undefined  && window.localStorage['city'] != undefined && window.localStorage['province'] != undefined  && window.localStorage['zip'] != undefined) {
    //     vm.residence.brgy = window.localStorage['brgy'];
    //     vm.residence.city = window.localStorage['city'];
    //     vm.residence.province = window.localStorage['province'];
    //     vm.residence.zip = window.localStorage['zip'];
    // };

    setTimeout(function() {
        vm.read();
    }, 1)

    // Get Settings data
     vm.getSettings = function() {
            Settings.get().then(function(res) {
                settings = res.data;
                vm.residence.barangayId = settings.barangay_id;
                vm.residence.brgy = settings.barangay;
                vm.residence.city = settings.city;
                vm.residence.province = settings.province;
                vm.residence.zip = settings.zip_code;
            })
    }
    vm.getSettings();

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
            // console.log(res.data);
            vm.residences = res.data;
        })
    }
    vm.getAllResidence();

    vm.findAddress = function(residenceId) {
        for (var i = 0; i < vm.residences.length; i++) {
            if (vm.residences[i].id == residenceId) {
                console.log("Found: " + vm.residences[i]);
                vm.foundAddress = vm.residences[i];
                var fmt = JSON.stringify(vm.foundAddress);
                break;
            } else {
                console.log("Else");
                vm.foundAddress = {};
            }
        };
    }
    

     $scope.isCollapsed = false;



    vm.addChild = function(child) {
        child.id = new Date().getTime();
        vm.person.children.push(child);
        console.log(vm.person.children);
    }

    vm.save = function() {
        console.log("Personal Info : " + JSON.stringify(vm.person));
        // console.log("Personal Info non JSON : " + vm.person);
        vm.person.isEmployed =  vm.person.isEmployed == 'Yes' ? 1 : 0;
        vm.person.withSSS =  vm.person.withSSS == 'Yes' ? 1 : 0;
        vm.person.withPhilhealth =  vm.person.withPhilhealth == 'Yes' ? 1 : 0;
        vm.person.isVoter =  vm.person.isVoter == 'Yes' ? 1 : 0;
        vm.person.withElectricity =  vm.person.withElectricity == 'Yes' ? 1 : 0;

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

.controller('BrgyClearanceCtrl', ['$scope', '$stateParams', 'Persons', 'Residences', function($scope, $stateParams, Persons, Residences){
var vm = this;
var personId = $stateParams.personId;
var purpose = $stateParams.purpose;
vm.purpose = purpose;
vm.person = null;
vm.residence = null;

var residenceId = null;

vm.day = moment(moment()._d).format('Do');
vm.month = moment(moment()._d).format('MMMM');
vm.year = moment(moment()._d).format('YYYY');

console.log("PersonId: " + personId + " Purpose: " + purpose);

Persons.get(personId).then(function(res) {
    vm.person = res.data;
    residenceId = res.data.temp_person_info[0].residence_id;

    Residences.get(residenceId).then(function(result) {
        console.log(JSON.stringify(result.data));
        vm.residence = result.data;
    })
})


var imgUrl = 'images/clearance_logo.png';
var convertImgToBase64 = function(url, callback){
    var img = new Image();
    img.onError = function() {
        alert('Cannot load image: "'+ url +'"');
    };
    img.onload = function() {
        callback(img);
    };
    img.src = url;
}

var createText = function(text, alignment, x, y, fontType, fontSize, fontName){
    return doc.alignedText(text, {align: alignment}, x, y, fontType, fontSize, fontName);
}

var createParagraphTextFromHtml = function(dom, x, y, width){
    return doc.fromHTML(dom.get(0), x, y, {'width': width });
}

var generateDocumentHeader = function(firstLine, secondLine, thirdLine, fourthLine, fifthLine, imageLeft, imageRight){
    createText(firstLine, "center", 0, 50, "normal", 12, "times");
    createText(secondLine, "center", 0, 70, "normal", 12, "times");
    createText(thirdLine, "center", 0, 90, "normal", 12, "times");
    createText(fourthLine, "center", 0, 110, "bold", 12, "times");
    createText(fifthLine, "center", 0, 130, "bold", 14, "times");
    doc.setLineWidth(1.5);
    doc.line(40, 150, 555.28, 150);
}

var generateDocumentBody = function (text, dom, y){
    createText(text, "center", 0,230, "bold", 20, "times");
    createText("Control No: __________", "right", 0,270, "normal", 12, "times");
    createText("TO WHOM IT MAY CONCERN:", "left", 0,310, "normal", 12, "times");
    createParagraphTextFromHtml(dom, y, 340, 535);
}

var generateDocumentFooter = function(nameText, descriptionText, nameX, descriptionX){
    createText(nameText, "", 370, nameX, "normal", 12, "times");
    createText(descriptionText, "", 380, descriptionX, "italic", 10, "times");
}

// ***
// * events
// ***
var createPDFForBaranggayClearance = function(imgData) {
    doc = new jsPDF("portrait", "pt");
    doc.margins = 10;
    doc.addImage(imgData, 'PNG', 35, 30, 0, 0, 'icon');
    doc.addImage(imgData, 'PNG', 460.28, 30, 0, 0, 'icon');
    generateDocumentHeader("REPUBLIC OF THE PHILIPPINES", 
                        "PROVINCE OF NEGROS OCCIDENTAL", 
                        "CITY OF KABANKALAN", 
                        "BARANGGAY II", 
                        "OFFICE OF THE PUNONG BARANGGAY");
    generateDocumentBody("BARANGGAY CLEARANCE", $("#body_baranggay_clearance"), 40);
    generateDocumentFooter("REY G. CORDERO", "Punong Barangay", 630, 640);
    string = doc.output("datauristring");
    $("#frm_print_baranggay_clearance").attr("src", string);
}
setTimeout(function() {
convertImgToBase64(imgUrl, createPDFForBaranggayClearance);
}, 1);


}])
.controller('BrgyBusinessClearanceCtrl', ['$scope', function($scope){
var imgUrl = 'images/clearance_logo.png';
var convertImgToBase64 = function(url, callback){
    var img = new Image();
    img.onError = function() {
        alert('Cannot load image: "'+ url +'"');
    };
    img.onload = function() {
        callback(img);
    };
    img.src = url;
}

var createText = function(text, alignment, x, y, fontType, fontSize, fontName){
    return doc.alignedText(text, {align: alignment}, x, y, fontType, fontSize, fontName);
}

var createParagraphTextFromHtml = function(dom, x, y, width){
    return doc.fromHTML(dom.get(0), x, y, {'width': width });
}

var generateDocumentHeader = function(firstLine, secondLine, thirdLine, fourthLine, fifthLine, imageLeft, imageRight){
    createText(firstLine, "center", 0, 50, "normal", 12, "times");
    createText(secondLine, "center", 0, 70, "normal", 12, "times");
    createText(thirdLine, "center", 0, 90, "normal", 12, "times");
    createText(fourthLine, "center", 0, 110, "bold", 12, "times");
    createText(fifthLine, "center", 0, 130, "bold", 14, "times");
    doc.setLineWidth(1.5);
    doc.line(40, 150, 555.28, 150);
}

var generateDocumentBody = function (text, dom, y){
    createText(text, "center", 0,230, "bold", 20, "times");
    createText("Control No: __________", "right", 0,270, "normal", 12, "times");
    createText("TO WHOM IT MAY CONCERN:", "left", 0,310, "normal", 12, "times");
    createParagraphTextFromHtml(dom, y, 340, 535);
}

var generateDocumentFooter = function(nameText, descriptionText, nameX, descriptionX){
    createText(nameText, "", 370, nameX, "normal", 12, "times");
    createText(descriptionText, "", 380, descriptionX, "italic", 10, "times");
}

// ***
// * events
// ***
// var createPDFForBaranggayClearance = function(imgData) {
//     doc = new jsPDF("portrait", "pt");
//     doc.margins = 10;
//     doc.addImage(imgData, 'PNG', 35, 30, 0, 0, 'icon');
//     doc.addImage(imgData, 'PNG', 460.28, 30, 0, 0, 'icon');
//     generateDocumentHeader("REPUBLIC OF THE PHILIPPINES", 
//                         "PROVINCE OF NEGROS OCCIDENTAL", 
//                         "CITY OF KABANKALAN", 
//                         "BARANGGAY II", 
//                         "OFFICE OF THE PUNONG BARANGGAY");
//     generateDocumentBody("BARANGGAY CLEARANCE", $("#body_baranggay_clearance"), 40);
//     generateDocumentFooter("REY G. CORDERO", "Punong Barangay", 630, 640);
//     string = doc.output("datauristring");
//     $("#frm_print_baranggay_clearance").attr("src", string);
// }

var createPDFForBaranggayBusinessClearance = function(imgData) {
    doc = new jsPDF("portrait", "pt");
    doc.addImage(imgData, 'PNG', 35, 30, 0, 0, 'icon');
    doc.addImage(imgData, 'PNG', 460.28, 30, 0, 0, 'icon');
    generateDocumentHeader("REPUBLIC OF THE PHILIPPINES", 
                        "PROVINCE OF NEGROS OCCIDENTAL", 
                        "CITY OF KABANKALAN", 
                        "BARANGGAY II", 
                        "OFFICE OF THE PUNONG BARANGGAY");
    generateDocumentBody("BARANGAY BUSINESS CLEARANCE", $("#body_baranggay_business_clearance"), 40);
    generateDocumentFooter("REY G. CORDERO", "Punong Barangay", 660, 670);
    string = doc.output("datauristring");
    $("#frm_print_baranggay_business_clearance").attr("src", string);
}

// var createPDFForCerfificateOfClosure = function(imgData){
//     doc = new jsPDF("portrait", "pt");
//     doc.addImage(imgData, 'PNG', 35, 30, 0, 0, 'icon');
//     doc.addImage(imgData, 'PNG', 460.28, 30, 0, 0, 'icon');
//     generateDocumentHeader("REPUBLIC OF THE PHILIPPINES", 
//                         "PROVINCE OF NEGROS OCCIDENTAL", 
//                         "CITY OF KABANKALAN", 
//                         "BARANGGAY II", 
//                         "OFFICE OF THE PUNONG BARANGGAY");
//     generateDocumentBody("CERTIFICATE OF CLOSURE", $("#body_certificate_of_closure"), 40);
//     generateDocumentFooter("REY G. CORDERO", "Punong Barangay", 630, 640);
//     string = doc.output("datauristring");
//     $("#frm_print_certificate_of_closure").attr("src", string);
// }

setTimeout(function() {
convertImgToBase64(imgUrl, createPDFForBaranggayBusinessClearance);
}, 1);


}])

.controller('CertificateOfClosureCtrl', ['$scope', function($scope){
var imgUrl = 'images/clearance_logo.png';
var convertImgToBase64 = function(url, callback){
    var img = new Image();
    img.onError = function() {
        alert('Cannot load image: "'+ url +'"');
    };
    img.onload = function() {
        callback(img);
    };
    img.src = url;
}

var createText = function(text, alignment, x, y, fontType, fontSize, fontName){
    return doc.alignedText(text, {align: alignment}, x, y, fontType, fontSize, fontName);
}

var createParagraphTextFromHtml = function(dom, x, y, width){
    return doc.fromHTML(dom.get(0), x, y, {'width': width });
}

var generateDocumentHeader = function(firstLine, secondLine, thirdLine, fourthLine, fifthLine, imageLeft, imageRight){
    createText(firstLine, "center", 0, 50, "normal", 12, "times");
    createText(secondLine, "center", 0, 70, "normal", 12, "times");
    createText(thirdLine, "center", 0, 90, "normal", 12, "times");
    createText(fourthLine, "center", 0, 110, "bold", 12, "times");
    createText(fifthLine, "center", 0, 130, "bold", 14, "times");
    doc.setLineWidth(1.5);
    doc.line(40, 150, 555.28, 150);
}

var generateDocumentBody = function (text, dom, y){
    createText(text, "center", 0,230, "bold", 20, "times");
    createText("Control No: __________", "right", 0,270, "normal", 12, "times");
    createText("TO WHOM IT MAY CONCERN:", "left", 0,310, "normal", 12, "times");
    createParagraphTextFromHtml(dom, y, 340, 535);
}

var generateDocumentFooter = function(nameText, descriptionText, nameX, descriptionX){
    createText(nameText, "", 370, nameX, "normal", 12, "times");
    createText(descriptionText, "", 380, descriptionX, "italic", 10, "times");
}


var createPDFForCerfificateOfClosure = function(imgData){
    doc = new jsPDF("portrait", "pt");
    doc.addImage(imgData, 'PNG', 35, 30, 0, 0, 'icon');
    doc.addImage(imgData, 'PNG', 460.28, 30, 0, 0, 'icon');
    generateDocumentHeader("REPUBLIC OF THE PHILIPPINES", 
                        "PROVINCE OF NEGROS OCCIDENTAL", 
                        "CITY OF KABANKALAN", 
                        "BARANGGAY II", 
                        "OFFICE OF THE PUNONG BARANGGAY");
    generateDocumentBody("CERTIFICATE OF CLOSURE", $("#body_certificate_of_closure"), 40);
    generateDocumentFooter("REY G. CORDERO", "Punong Barangay", 630, 640);
    string = doc.output("datauristring");
    $("#frm_print_certificate_of_closure").attr("src", string);
}

setTimeout(function() {
convertImgToBase64(imgUrl, createPDFForCerfificateOfClosure);
}, 1);


}])

.controller('BrgyClearanceListCtrl', ['$scope', 'BarangayClearances', 'Persons', '$state', function($scope, BarangayClearances, Persons, $state){
    var vm = this;
    vm.persons = [];
    vm.brgyClearance = {};
    vm.listOfClearance = [];

    BarangayClearances.getAll().then(function(res){
        vm.listOfClearancees = res.data;
    })


    Persons.getAll().then(function(res) {
        vm.persons = res.data;
    })

    $scope.showModal = false;

    $scope.toggleModal = function() {
        $scope.showModal = !$scope.showModal;
    };

    $scope.togglePurposesModal = function() {
        $scope.showPurposeModal = !$scope.showPurposeModal;
    };

    $scope.promptPurpose = function(id) {
        vm.brgyClearance.id = id;
        $scope.toggleModal(); // Hides the list of persons modal
        $scope.togglePurposesModal(); // Shows the purpose modal
        // $state.go('brgy-clearance', { personId: id , purpose: 'Employment' });
    }

    $scope.printPreview = function() {
        $scope.togglePurposesModal(); // Hides the modal
        $state.go('brgy-clearance', { personId: vm.brgyClearance.id , purpose: vm.brgyClearance.purpose });
    }

    $(window).on('popstate', function() {
        $(".modal-backdrop").remove(); // Removes the grey modal backdrop whenever the modal is hidden
    });

}])

.controller('BrgyBusinessClearanceListCtrl', ['$scope', 'BarangayBusinessClearances', function($scope, BarangayBusinessClearances){
    BarangayBusinessClearances.getAll().then(function(res){
        console.log(res.data);
    })



}])

.controller('CertificateOfClosureListCtrl', ['$scope', 'CertificatesOfClosure', function($scope, CertificatesOfClosure){
    CertificatesOfClosure.getAll().then(function(res){
        console.log(res.data);
    })

}])

