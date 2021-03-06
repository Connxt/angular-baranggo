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
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop))
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
                // console.log("Found settings: " + settings);
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
        // console.log("Saving settings: " + settings);

        Settings.add(vm.settings.brgyId).then(function(res) {
            // console.log(res);
        });
    }


    $scope.isActive = function(viewLocation) {
        return viewLocation === $location.path();
    };
}])

.controller("HomeCtrl", ['$scope', function($scope) {




    // Persons.getAll().then(function(response) {
    //     console.log(response);
    // })
}])

.controller("PersonCtrl", ['$scope', 'Persons', function($scope, Persons) {
    var vm = this;
    vm.persons = [];
    vm.showViewPersonModal = false;


    Persons.getAll().then(function(res) {
        vm.persons = res.data;
    })

    // View Person Modal
    vm.toggleViewPerson = function(index) {
        // console.log(vm.persons[index]);
        vm.person = vm.persons[index];
        vm.showViewPersonModal = !vm.showViewPersonModal;
    }


    // Delete person
    vm.deletePerson = function(id) {
        // console.log(id);
        Persons.delete(id).then(function(res) {
            // console.log(res)

             Persons.getAll().then(function(res) {
                vm.persons = res.data;
            })
        })
    }

}])

.controller('ResidenceCtrl', ['$scope', 'Residences', 'Settings', function($scope, Residences, Settings) {
    var vm = this;
    vm.residence = {};
    vm.residences = [];

    // Read Residence
    vm.read = function() {
        Residences.getAll().then(function(res) {
            vm.residences = res.data;
        })
    }
    vm.read();

    vm.showAddResidenceModal = false;
    vm.toggleAddResidenceModal = function() {
        vm.showAddResidenceModal = !vm.showAddResidenceModal;
    };

     // Add Residence Modal
    vm.toggleViewResidenceModal = function(index) {
        var res = vm.residences[index];
        vm.residence.blockNo  =  res.block_no;
        vm.residence.lotNo = res.lot_no;
        vm.residence.street = res.street;
        vm.residence.sitio = res.sitio;
        vm.residence.subdivision = res.subdivision;
        vm.residence.brgy = res.barangay;
        vm.residence.city = res.city;
        vm.residence.province = res.province;
        vm.residence.zip = res.zip_code;
        vm.showViewResidenceModal = !vm.showViewResidenceModal;
    }

    // Edit Residence Modal
    vm.toggleEditResidenceModal = function(index) {
        var res = vm.residences[index];
        vm.residence.blockNo  =  res.block_no;
        vm.residence.lotNo = res.lot_no;
        vm.residence.street = res.street;
        vm.residence.sitio = res.sitio;
        vm.residence.subdivision = res.subdivision;
        vm.residence.brgy = res.barangay;
        vm.residence.city = res.city;
        vm.residence.province = res.province;
        vm.residence.zip = res.zip_code;
        vm.showEditResidenceModal = !vm.showEditResidenceModal;
    }

     // Create Residence
    vm.save = function(residence) {
        Residences.add(residence).then(function(res) {
            vm.residence.blockNo = "";
            vm.residence.lotNo = "";
            vm.residence.street = "";
            vm.residence.subdivision = "";
        });

    }

    // Update Residence 
    vm.update = function() {
        Residence.update()
    }


    

    


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

   
}])

.controller('FormCtrl', ['$scope', 'Persons', 'Residences', '$filter', '$state', function($scope, Persons, Residences, $filter, $state) {
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
                // console.log("Found: " + vm.residences[i]);
                vm.foundAddress = vm.residences[i];
                var fmt = JSON.stringify(vm.foundAddress);
                break;
            } else {
                // console.log("Else");
                vm.foundAddress = {};
            }
        };
    }

    // $scope.isCollapsed = false;

    vm.addChild = function(child) {
        child.id = new Date().getTime();
        vm.person.children.push(child);
        // console.log(vm.person.children);
    }

    vm.save = function() {
        console.log("Personal Info : " + JSON.stringify(vm.person));
        // console.log("Personal Info non JSON : " + vm.person);
        vm.person.isEmployed = vm.person.isEmployed == 'Yes' ? 1 : 0;
        vm.person.withSSS = vm.person.withSSS == 'Yes' ? 1 : 0;
        vm.person.withPhilhealth = vm.person.withPhilhealth == 'Yes' ? 1 : 0;
        vm.person.isVoter = vm.person.isVoter == 'Yes' ? 1 : 0;
        vm.person.withElectricity = vm.person.withElectricity == 'Yes' ? 1 : 0;

        Persons.add(vm.person).then(function(res) {
            // console.log(res);
        });

        $state.go('persons');
    }

    vm.isEmpty = function(obj) {
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop))
                return false;
        }
        return true;
    };
}])

.controller('FormEditAddressCtrl', ['$scope', '$stateParams', 'Person', 'Persons','ResidenceLookup', function($scope, $stateParams, Person, Persons, ResidenceLookup) {
    var vm = this;
    vm.person = {};

    vm.residenceId = 0;
    var residenceId;

    function displayResidence() {
        ResidenceLookup.getAddress().then(function(residence) {
            vm.residence = residence;
        });
    }

    residenceId = Person.getResidenceId();
    if (residenceId) {
        Person.setResidenceId(residenceId);
        displayResidence();
         vm.residenceId = residenceId;
    } else {
        var personId = $stateParams.personId;
        Person.setPersonId(personId);

        residenceId = $stateParams.residenceId;
        Person.setResidenceId(residenceId);
        vm.residenceId = residenceId;

        displayResidence();

        Persons.get(Person.getPersonId()).then(function(res) {
            vm.person = res.data;
        })
    }

    $scope.$on("$destroy", function() {
        Person.setProfile(vm.person);
    });
}])

.controller('FormEditProfileCtrl', ['$scope', 'Persons', 'Person', function($scope, Persons, Person) {
    var vm = this;
    vm.children = [];
    vm.childrenToBeAdded = [];
    vm.childrenToBeRemove = [];

    Persons.get(Person.getPersonId()).then(function(res) {
        vm.person = res.data;
        console.log(JSON.stringify(vm.person));
        vm.person.children = res.data.children;

        Person.resetChildrenToBeUpdated();
        for (var i = 0; i < vm.person.children.length; i++) {
            Person.setChildrenToBeUpdated(
                vm.person.children[i].id,
                vm.person.children[i].last_name,
                vm.person.children[i].first_name,
                vm.person.children[i].middle_name,
                vm.person.children[i].gender,
                vm.person.children[i].date_of_birth
            );
        }
        vm.children = Person.getChildrenToBeUpdated();


    })

    // Datepicker
    vm.open = function($event, opened) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope[opened] = true;
    };

    guid = function() {
        return new Date(moment()).getTime();
    }

    vm.addChild = function(child) {
        child.id = guid();
        vm.children.push(child);
        vm.childrenToBeAdded.push(child);
        Person.setChildrenToBeAdded(child.firstName, child.lastName, child.middleName, child.dateOfBirth, child.gender);

        vm.children = [];
        vm.children = Person.getChildrenToBeUpdated();

        // console.log("Children to be added: " + JSON.stringify(vm.childrenToBeAdded));
        
    }

    vm.removeChild = function(index, childId) {
        vm.childrenToBeRemove.push(childId);
        Person.spliceChildrenToBeUpdated(index);
        Person.setChildrenToBeRemove(childId);

        vm.children = Person.getChildrenToBeUpdated();
        // console.log("Children to be remove: " + vm.childrenToBeRemove);
    }

    vm.setPersonProfile = function() {
        Person.setProfile(vm.person);
    }

    $scope.$on("$destroy", function() {
        Person.setProfile(vm.person);
    });
}])

.controller('FormEditParentCtrl', ['$scope', 'Person', 'Persons', function($scope, Person, Persons) {
    var vm = this;
    vm.person = {};

    vm.person = Person.getProfile();

    vm.setPersonProfile = function() {
        Person.setProfile(vm.person);
    }

    // Datepicker
    vm.open = function($event, opened) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope[opened] = true;
    };


    vm.dateOptions = {
        formatYear: 'yy',
        formatMonth: 'MMMM',
        formatDay: 'dd',
        startingDay: 1
    };
}])

.controller('FormConfirmCtrl', ['$scope', 'Persons', 'Person', '$state', function($scope, Persons, Person, $state) {
    var vm = this;
    vm.person = {};
    vm.person = Person.getProfile();
    vm.children = Person.getChildrenToBeUpdated();

    vm.update = function() {
        var p = Person.getProfile();
        var childrenToBeUpdated = Person.getChildrenToBeUpdated();
        var childrenToBeAdded = Person.getChildrenToBeAdded();
        var childrenToBeRemove = Person.getChildrenToBeRemove();

        Persons.update(p.id, p.last_name, p.first_name, p.middle_name, p.date_of_birth, p.place_of_birth, p.gender, p.mother_last_name, p.mother_first_name, p.mother_middle_name, p.mother_date_of_birth, p.father_last_name, p.father_first_name, p.father_middle_name, p.father_date_of_birth, p.contact_no, p.email, p.temp_person_infos[0].civil_status, 'religion', '0', p.temp_person_infos[0].educational_attainment, p.temp_person_infos[0].is_employed, p.temp_person_infos[0].is_voter, '0', p.temp_person_infos[0].with_philhealth, p.temp_person_infos[0].with_sss, p.temp_person_infos[0].with_electricity, '0', p.temp_person_infos[0].spouse_last_name, p.temp_person_infos[0].spouse_first_name, p.temp_person_infos[0].spouse_middle_name, p.temp_person_infos[0].spouse_gender, p.temp_person_infos[0].spouse_date_of_birth, p.temp_person_infos[0].residence_id, [], [], [], childrenToBeUpdated, childrenToBeAdded, childrenToBeRemove).then(function(res) {
            // console.log(JSON.stringify("Result" + res.data))
            $state.go('persons');
        });

        $scope.$on("$destroy", function() {
            Person.setProfile(vm.person);
        });
    }
}])

.controller('MapCtrl', ['$scope', function($scope) {}])

.controller('BrgyClearanceCtrl', ['$scope', '$stateParams', 'Persons', 'BarangayClearances', function($scope, $stateParams, Persons, BarangayClearances) {
    var vm = this;
    // console.log($stateParams);
    var personId = $stateParams.personId;
    var purpose = $stateParams.purpose;
    var remarks = $stateParams.remarks;

    vm.purpose = purpose;
    vm.person = null;
    vm.residence = null;
    vm.day = moment(moment()._d).format('Do');
    vm.month = moment(moment()._d).format('MMMM');
    vm.year = moment(moment()._d).format('YYYY');

    // console.log("PersonId: " + personId + " Purpose: " + purpose);

    Persons.get(personId).then(function(res) {
        vm.person = res.data;
        vm.residence = res.data.temp_person_infos[0].residence;

        BarangayClearances.add(personId, purpose, remarks).then(function(res) {
            // console.log(res);
        });
    });

    var imgUrl = 'images/clearance_logo.png';
    var convertImgToBase64 = function(url, callback) {
        var img = new Image();
        img.onError = function() {
            alert('Cannot load image: "' + url + '"');
        };
        img.onload = function() {
            callback(img);
        };
        img.src = url;
    }

    var createText = function(text, alignment, x, y, fontType, fontSize, fontName) {
        return doc.alignedText(text, {
            align: alignment
        }, x, y, fontType, fontSize, fontName);
    }

    var createParagraphTextFromHtml = function(dom, x, y, width) {
        return doc.fromHTML(dom.get(0), x, y, {
            'width': width
        });
    }

    var generateDocumentHeader = function(firstLine, secondLine, thirdLine, fourthLine, fifthLine, imageLeft, imageRight) {
        createText(firstLine, "center", 0, 50, "normal", 12, "times");
        createText(secondLine, "center", 0, 70, "normal", 12, "times");
        createText(thirdLine, "center", 0, 90, "normal", 12, "times");
        createText(fourthLine, "center", 0, 110, "bold", 12, "times");
        createText(fifthLine, "center", 0, 130, "bold", 14, "times");
        doc.setLineWidth(1.5);
        doc.line(40, 150, 555.28, 150);
    }

    var generateDocumentBody = function(text, dom, y) {
        createText(text, "center", 0, 230, "bold", 20, "times");
        createText("Control No: __________", "right", 0, 270, "normal", 12, "times");
        createText("TO WHOM IT MAY CONCERN:", "left", 0, 310, "normal", 12, "times");
        createParagraphTextFromHtml(dom, y, 340, 535);
    }

    var generateDocumentFooter = function(nameText, descriptionText, nameX, descriptionX) {
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

.controller('BrgyBusinessClearanceCtrl', ['$scope', '$stateParams', function($scope, $stateParams) {

    var vm = this;
    // console.log($stateParams);
    vm.businessOwner = $stateParams.businessOwner;
    vm.businessName = $stateParams.businessName;
    vm.businessAddress = $stateParams.businessAddress;
    vm.businessType = $stateParams.businessType;

    vm.day = moment(moment()._d).format('Do');
    vm.day1 = moment(moment()._d).format('D');
    vm.month = moment(moment()._d).format('MMMM');
    vm.year = moment(moment()._d).format('YYYY');

    vm.getNextYear = function() {
        return moment(moment()._d).add(1, 'year').format('YYYY');
    }


    var imgUrl = 'images/clearance_logo.png';
    var convertImgToBase64 = function(url, callback) {
        var img = new Image();
        img.onError = function() {
            alert('Cannot load image: "' + url + '"');
        };
        img.onload = function() {
            callback(img);
        };
        img.src = url;
    }

    var createText = function(text, alignment, x, y, fontType, fontSize, fontName) {
        return doc.alignedText(text, {
            align: alignment
        }, x, y, fontType, fontSize, fontName);
    }

    var createParagraphTextFromHtml = function(dom, x, y, width) {
        return doc.fromHTML(dom.get(0), x, y, {
            'width': width
        });
    }

    var generateDocumentHeader = function(firstLine, secondLine, thirdLine, fourthLine, fifthLine, imageLeft, imageRight) {
        createText(firstLine, "center", 0, 50, "normal", 12, "times");
        createText(secondLine, "center", 0, 70, "normal", 12, "times");
        createText(thirdLine, "center", 0, 90, "normal", 12, "times");
        createText(fourthLine, "center", 0, 110, "bold", 12, "times");
        createText(fifthLine, "center", 0, 130, "bold", 14, "times");
        doc.setLineWidth(1.5);
        doc.line(40, 150, 555.28, 150);
    }

    var generateDocumentBody = function(text, dom, y) {
        createText(text, "center", 0, 230, "bold", 20, "times");
        createText("Control No: __________", "right", 0, 270, "normal", 12, "times");
        createText("TO WHOM IT MAY CONCERN:", "left", 0, 310, "normal", 12, "times");
        createParagraphTextFromHtml(dom, y, 340, 535);
    }

    var generateDocumentFooter = function(nameText, descriptionText, nameX, descriptionX) {
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

.controller('CertificateOfClosureCtrl', ['$scope', function($scope) {
    var imgUrl = 'images/clearance_logo.png';
    var convertImgToBase64 = function(url, callback) {
        var img = new Image();
        img.onError = function() {
            alert('Cannot load image: "' + url + '"');
        };
        img.onload = function() {
            callback(img);
        };
        img.src = url;
    }

    var createText = function(text, alignment, x, y, fontType, fontSize, fontName) {
        return doc.alignedText(text, {
            align: alignment
        }, x, y, fontType, fontSize, fontName);
    }

    var createParagraphTextFromHtml = function(dom, x, y, width) {
        return doc.fromHTML(dom.get(0), x, y, {
            'width': width
        });
    }

    var generateDocumentHeader = function(firstLine, secondLine, thirdLine, fourthLine, fifthLine, imageLeft, imageRight) {
        createText(firstLine, "center", 0, 50, "normal", 12, "times");
        createText(secondLine, "center", 0, 70, "normal", 12, "times");
        createText(thirdLine, "center", 0, 90, "normal", 12, "times");
        createText(fourthLine, "center", 0, 110, "bold", 12, "times");
        createText(fifthLine, "center", 0, 130, "bold", 14, "times");
        doc.setLineWidth(1.5);
        doc.line(40, 150, 555.28, 150);
    }

    var generateDocumentBody = function(text, dom, y) {
        createText(text, "center", 0, 230, "bold", 20, "times");
        createText("Control No: __________", "right", 0, 270, "normal", 12, "times");
        createText("TO WHOM IT MAY CONCERN:", "left", 0, 310, "normal", 12, "times");
        createParagraphTextFromHtml(dom, y, 340, 535);
    }

    var generateDocumentFooter = function(nameText, descriptionText, nameX, descriptionX) {
        createText(nameText, "", 370, nameX, "normal", 12, "times");
        createText(descriptionText, "", 380, descriptionX, "italic", 10, "times");
    }


    var createPDFForCerfificateOfClosure = function(imgData) {
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

.controller('BrgyClearanceListCtrl', ['$scope', 'BarangayClearances', 'Persons', '$state', function($scope, BarangayClearances, Persons, $state) {
    var vm = this;
    vm.persons = [];
    vm.brgyClearance = {};
    vm.listOfClearance = [];

    BarangayClearances.getAll().then(function(res) {
        vm.listOfClearancees = res.data;
        // console.log(vm.listOfClearancees);
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
        $state.go('brgy-clearance', {
            personId: vm.brgyClearance.id,
            purpose: vm.brgyClearance.purpose,
            remarks: vm.brgyClearance.remarks
        });
    }

    $(window).on('popstate', function() {
        $(".modal-backdrop").remove(); // Removes the grey modal backdrop whenever the modal is hidden
    });
}])

.controller('BrgyBusinessClearanceListCtrl', ['$scope', 'Persons', 'BarangayBusinessClearances', '$state', function($scope, Persons, BarangayBusinessClearances, $state) {
    var vm = this;
    vm.persons = [];
    vm.listOfBusinessClearances = [];

    BarangayBusinessClearances.getAll().then(function(res) {
        vm.listOfBusinessClearances = res.data;
        // console.log(vm.listOfBusinessClearances);
    })

    Persons.getAll().then(function(res) {
        vm.persons = res.data;
        // console.log(vm.persons)
    })

    $scope.showListOfPersons = false;

    $scope.toggleListOfPersonsModal = function() {
        $scope.showListOfPersons = !$scope.showListOfPersons;
    }

    $scope.toggleBusinessInfoModal = function(id) {
        $scope.showBusinessInfoModal = !$scope.showBusinessInfoModal;
    }

    $scope.promptBusinessInfo = function(i, id) {
        vm.personId = id;
        var name = vm.persons[i].first_name + ' ' + vm.persons[i].middle_name.charAt(0) + '. ' + vm.persons[i].last_name;
        vm.businessOwner = name;
        $scope.toggleListOfPersonsModal();
        $scope.toggleBusinessInfoModal();
    }

    $scope.printPreview = function() {
        BarangayBusinessClearances.add(vm.personId, vm.businessName, vm.businessAddress, vm.businessType);
        $scope.toggleBusinessInfoModal(); // Hides the toggleBusinessInfoModal
        $state.go('brgy-bus-clearance', {
            businessOwner: vm.businessOwner,
            businessName: vm.businessName,
            businessAddress: vm.businessAddress,
            businessType: vm.businessType
        });
    }

    $(window).on('popstate', function() {
        $(".modal-backdrop").remove(); // Removes the grey modal backdrop whenever the modal is hidden
    })
}])

.controller('CertificateOfClosureListCtrl', ['$scope', 'CertificatesOfClosure', 'Persons', '$state', function($scope, CertificatesOfClosure, Persons, $state) {
    // CertificatesOfClosure.getAll().then(function(res){
    //     console.log(res.data);
    // })

    var vm = this;
    vm.persons = [];

    CertificatesOfClosure.getAll().then(function(res) {
        vm.listOfCertificates = res.data;
        // console.log(vm.listOfCertificates)
    })


    Persons.getAll().then(function(res) {
        vm.persons = res.data;
        // console.log(vm.persons)
    })

    $scope.showListOfPersons = false;

    $scope.toggleListOfPersonsModal = function() {
        $scope.showListOfPersons = !$scope.showListOfPersons;
    };

    $scope.toggleBusinessInfoModal = function(id) {
        $scope.showBusinessInfoModal = !$scope.showBusinessInfoModal;
    }

    $scope.promptBusinessInfo = function(i, id) {
        vm.personId = id;
        var name = vm.persons[i].first_name + ' ' + vm.persons[i].middle_name.charAt(0) + '. ' + vm.persons[i].last_name;
        vm.businessOwner = name;
        $scope.toggleListOfPersonsModal();
        $scope.toggleBusinessInfoModal();
    }

    $scope.printPreview = function() {
        // BarangayBusinessClearances.add(vm.personId, vm.businessName, vm.businessAddress, vm.businessType);
        $scope.toggleBusinessInfoModal(); // Hides the toggleBusinessInfoModal
        $state.go('brgy-bus-clearance', { businessOwner: vm.businessOwner, businessName: vm.businessName, businessAddress: vm.businessAddress, businessType: vm.businessType });
        console.log("Business Owner: " + vm.businessOwner);
        console.log("Business Name: " + vm.businessName);
        console.log("Business Address: " + vm.businessAddress);
        console.log("Business Type: " + vm.businessType);
        console.log("Date Closed: " + vm.dateClosed);
        CertificatesOfClosure.add(vm.personId, vm.businessName, vm.businessAddress, vm.businessType, vm.dateClosed)

        CertificatesOfClosure.getAll().then(function(res) {
            vm.listOfCertificates = res.data;
            // console.log(vm.listOfCertificates)
        })
    }

    $(window).on('popstate', function() {
        $(".modal-backdrop").remove(); // Removes the grey modal backdrop whenever the modal is hidden
    });
}])
