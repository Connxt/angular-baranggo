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



.controller("HomeCtrl", ['$scope', function($scope) {




    // Persons.getAll().then(function(response) {
    //     console.log(response);
    // })
}])

.controller("PersonCtrl", ['$scope', 'Persons', function($scope, Persons) {
    var vm = this;
    vm.persons = [];
    vm.showViewCensusModal = false;

    Persons.getAll().then(function(res) {
        var persons = JSON.stringify(res);
        vm.persons = res.data;
    })

    // View Census Modal
    vm.toggleViewCensus = function(index) {
        console.log(vm.persons[index]);
        vm.person = vm.persons[index];
        vm.showViewCensusModal = !vm.showViewCensusModal;
    }

    // Delete person
    vm.deletePerson = function(id) {
        Persons.delete(id).then(function(res) {
            console.log(res)
        })
    }
}])

.controller('ResidenceCtrl', ['$scope', 'Residences', 'Settings', function($scope, Residences, Settings) {
    var vm = this;
    vm.residence = {};
    vm.residences = [];

    vm.showViewResidenceModal = false;
    vm.toggleViewResidenceModal = function() {
        vm.showViewResidenceModal = !vm.showViewResidenceModal;
    };

    // Read Residence
    vm.read = function() {
        Residences.getAll().then(function(res) {
            vm.residences = res.data;
        })
    }
    vm.read();

    // setTimeout(function() {
        vm.read();
    // }, 1)

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
        Residences.add(residence).then(function(res) {
            vm.residence.blockNo = "";
            vm.residence.lotNo = "";
            vm.residence.street = "";
            vm.residence.subdivision = "";
        });

    }
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

    // $scope.isCollapsed = false;

    vm.addChild = function(child) {
        child.id = new Date().getTime();
        vm.person.children.push(child);
        console.log(vm.person.children);
    }

    vm.save = function() {
        // console.log("Personal Info : " + JSON.stringify(vm.person));
        // console.log("Personal Info non JSON : " + vm.person);
        vm.person.isEmployed = vm.person.isEmployed == 'Yes' ? 1 : 0;
        vm.person.withSSS = vm.person.withSSS == 'Yes' ? 1 : 0;
        vm.person.withPhilhealth = vm.person.withPhilhealth == 'Yes' ? 1 : 0;
        vm.person.isVoter = vm.person.isVoter == 'Yes' ? 1 : 0;
        vm.person.withElectricity = vm.person.withElectricity == 'Yes' ? 1 : 0;

        Persons.add(vm.person).then(function(res) {
            console.log(res);
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

.controller('FormEditCtrl', ['$scope', 'Persons', 'Residences', '$filter', '$stateParams', function($scope, Persons, Residences, $filter, $stateParams) {

    var vm = this;

    $scope.open = function($event, opened) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope[opened] = true;
    };



    vm.childrenToBeRemoved = [];
    vm.childrenToBeAdded = [];


    // if (!$scope.isEmpty($stateParams)) {
    console.log("StateParams: " + JSON.stringify($stateParams));
    $scope.personId = $stateParams.personId;
    $scope.person = {};
    $scope.person.children = [];

    vm.residences = [];
    vm.foundAddress = {}
    vm.person = {};
    // vm.person.residenceId = 1;
    vm.person.children = [];
    vm.person.siblings = [];

    $scope.isCollapsed = false;

    $scope.isEmpty = function(obj) {
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop))
                return false;
        }
        return true;
    };

    // Load All Residence
    vm.getAllResidence = function() {
        console.log("1");
        Residences.getAll().then(function(res) {
            // console.log(res.data);
            vm.residences = res.data;
        })
    }
    vm.getAllResidence();

    vm.findAddress = function(residenceId) {
        console.log("Residence: " + residenceId);
        console.log("3");

        for (var i = 0; i < vm.residences.length; i++) {
            if (vm.residences[i].id == residenceId) {
                console.log("Found: " + vm.residences[i]);
                vm.foundAddress = vm.residences[i];
                $scope.person.residence = vm.foundAddress;
                // console.log($scope.person.residence);
                var fmt = JSON.stringify(vm.foundAddress);
                console.log(fmt);
                break;
            } else {
                console.log("Not Found");
                vm.foundAddress = {};
            }
        };
    }

    Persons.get($scope.personId).then(function(res) {
        $scope.person = res.data;
        // console.log("Persons" + JSON.stringify($scope.person));
        var residence = res.data.temp_person_infos[0].residence;
        $scope.person.residence = res.data.temp_person_infos[0].residence;
        $scope.person.residenceId = residence.id;
        vm.person.children = res.data.children;
        vm.findAddress(residence.id);
        // $scope.person.residenceId = res.data.temp_person_infos[0].residence.id;
    })


    $scope.getDate = function(date) {
        var d = date;
        console.log(d);
        var d1 = d.split('-');
        var d2 = new Date(d1[0], d1[1] - 1, d1[2]);
        $scope.myDate = d2;
    }

    vm.addChild = function(child) {
        child.id = new Date().getTime();
        vm.person.children.push(child);
        vm.childrenToBeAdded.push(child);
        console.log("Children from scope" + JSON.stringify(vm.person.children));
    }

    vm.update = function(person) {
        console.log(JSON.stringify(person));
        var updatePerson = person;

        console.log("Personal Info : " + JSON.stringify(vm.person));
        // console.log("Personal Info non JSON : " + vm.person);
        vm.person.isEmployed = vm.person.isEmployed == 'Yes' ? 1 : 0;
        vm.person.withSSS = vm.person.withSSS == 'Yes' ? 1 : 0;
        vm.person.withPhilhealth = vm.person.withPhilhealth == 'Yes' ? 1 : 0;
        vm.person.isVoter = vm.person.isVoter == 'Yes' ? 1 : 0;
        vm.person.withElectricity = vm.person.withElectricity == 'Yes' ? 1 : 0;

        var childrenToBeUpdated = [];
        for(var i = 0; i < person.children.length; i++) {
            childrenToBeUpdated.push({
                lastName: person.children[i].last_name,
                firstName: person.children[i].first_name,
                middleName: person.children[i].middle_name,
                gender: person.children[i].gender,
                dateOfBirth: person.children[i].date_of_birth
            });
        }

        Persons.update(person.id,
            person.last_name,
            person.first_name,
            person.middle_name,
            person.date_of_birth,
            person.place_of_birth,
            person.gender,
            person.mother_last_name,
            person.mother_first_name,
            person.mother_middle_name,
            person.mother_date_of_birth,
            person.father_last_name,
            person.father_first_name,
            person.father_middle_name,
            person.father_date_of_birth,
            person.contact_no,
            person.email,
            person.temp_person_infos[0].civil_status,
            'religion',
            '0',
            person.temp_person_infos[0].educational_attainment,
            person.temp_person_infos[0].is_employed,
            person.temp_person_infos[0].is_voter,
            '0',
            person.temp_person_infos[0].with_philhealth,
            person.temp_person_infos[0].with_sss,
            person.temp_person_infos[0].with_electricity,
            '0',
            person.temp_person_infos[0].spouse_last_name,
            person.temp_person_infos[0].spouse_first_name,
            person.temp_person_infos[0].spouse_middle_name,
            person.temp_person_infos[0].spouse_gender,
            person.temp_person_infos[0].spouse_date_of_birth,
            person.residenceId, [], [], [],
            // person.children,
            childrenToBeUpdated,
            vm.childrenToBeAdded,
            vm.childrenToBeRemoved

        ).then(function(res) {
            console.log(res);
        });
    }

    vm.delete = function(child) {
            // console.log(index);
            console.log(JSON.stringify(child));
            vm.childrenToBeRemoved.push(id);
            console.log("Delete: " + JSON.stringify(vm.childrenToBeRemoved));
        }
        // }
}])

.controller('FormEditAddressCtrl', ['$scope', '$stateParams', 'Person', 'ResidenceLookup', function($scope, $stateParams, Person, ResidenceLookup) {
    var vm = this;
    vm.person = {};

    var personId = $stateParams.personId;
    Person.setPersonId(personId);

    var residenceId = $stateParams.residenceId;
    Person.setResidenceId(residenceId);
    vm.person.residenceId = residenceId;

    ResidenceLookup.getAddress().then(function(residence) {
        // console.log("Controller: " + JSON.stringify(residence));
        vm.residence = residence
    });

    // console.log("Person Id: " + JSON.stringify(personId));
    // console.log("Residence Id: " + JSON.stringify(residenceId));
}])

.controller('FormEditProfileCtrl', ['$scope', 'Persons','Person', function($scope, Persons, Person) {
    var vm = this;

    Persons.get(Person.getPersonId()).then(function(res) {
        vm.person = res.data;
        vm.person.children = res.data.children;

        Person.setProfile()
    })

    // Datepicker
    vm.open = function($event, opened) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope[opened] = true;
    };
}])

.controller('FormEditParentCtrl', ['$scope', 'Person', 'Persons', function($scope, Person, Persons) {
    var vm = this;
    vm.person = {};

     // Datepicker
    vm.open = function($event, opened) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope[opened] = true;
    };

    Persons.get(Person.getPersonId()).then(function(res) {
        vm.person = res.data;
        console.log("Person: " + JSON.stringify(vm.person));
        // Person.setProfile()
    })

    vm.dateOptions = {
    formatYear: 'yy',
    formatMonth: 'MMMM',
    formatDay: 'dd',
    startingDay: 1
  };
}])

.controller('FormConfirmCtrl', ['$scope', 'Persons', 'Person', function($scope, Persons, Person) {
    var vm = this;
    vm.person = {};

    Persons.get(Person.getPersonId()).then(function(res) {
        vm.person = res.data;
        console.log("Person: " + JSON.stringify(vm.person));
        // Person.setProfile()
    })
}])

.controller('MapCtrl', ['$scope', function($scope) {
}])

.controller('BrgyClearanceCtrl', ['$scope', '$stateParams', 'Persons', 'BarangayClearances', function($scope, $stateParams, Persons, BarangayClearances) {
        var vm = this;
        console.log($stateParams);
        var personId = $stateParams.personId;
        var purpose = $stateParams.purpose;
        var remarks = $stateParams.remarks;

        vm.purpose = purpose;
        vm.person = null;
        vm.residence = null;
        vm.day = moment(moment()._d).format('Do');
        vm.month = moment(moment()._d).format('MMMM');
        vm.year = moment(moment()._d).format('YYYY');

        console.log("PersonId: " + personId + " Purpose: " + purpose);

        Persons.get(personId).then(function(res) {
            vm.person = res.data;
            vm.residence = res.data.temp_person_infos[0].residence;

            BarangayClearances.add(personId, purpose, remarks).then(function(res) {
                console.log(res);
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
        console.log($stateParams);
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
        console.log(vm.listOfBusinessClearances);
    })

    Persons.getAll().then(function(res) {
        vm.persons = res.data;
        console.log(vm.persons)
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
        console.log(vm.listOfCertificates)
    })


    Persons.getAll().then(function(res) {
        vm.persons = res.data;
        console.log(vm.persons)
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
        // $state.go('brgy-bus-clearance', { businessOwner: vm.businessOwner, businessName: vm.businessName, businessAddress: vm.businessAddress, businessType: vm.businessType });
        console.log("Business Owner: " + vm.businessOwner);
        console.log("Business Name: " + vm.businessName);
        console.log("Business Address: " + vm.businessAddress);
        console.log("Business Type: " + vm.businessType);
        console.log("Date Closed: " + vm.dateClosed);
        CertificatesOfClosure.add(vm.personId, vm.businessName, vm.businessAddress, vm.businessType, vm.dateClosed)
    }

    $(window).on('popstate', function() {
        $(".modal-backdrop").remove(); // Removes the grey modal backdrop whenever the modal is hidden
    });


}])
