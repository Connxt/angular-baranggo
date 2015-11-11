angular.module("baranggoApp.services", [])

.factory("Persons", function ($http) {
	var self = this;

	self.getAll = function () {
		return $http.get("api/persons", {});
	};

	self.get = function(id) {
		return $http.get("api/person/id/" + id, {});
	};


	self.add = function(person) {
		alert("Service: " + person);
		return $http.post("api/person", person);
	}; 
	
	self.update = function (id, lastName, firstName, middleName, dateOfBirth, placeOfBirth, gender, motherLastName, motherFirstName, motherMiddleName, motherDateOfBirth, fatherLastName, fatherFirstName, fatherMiddleName, fatherDateOfBirth, contactNo, email, civilStatus, religion, annualIncome, educationalAttainment, isEmployed, isVoter, isDeceased, withPhilhealth, withSSS, withElectricity, withWater, spouseLastName, spouseFirstName, spouseMiddleName, spouseGender, spouseDateOfBirth, residenceId, siblings, siblingsToBeAdded, siblingsToBeRemoved, children, childrenToBeAdded, childrenToBeRemoved) {
		return $http.put("api/person", {
			id: id,
			lastName: lastName,
			firstName: firstName,
			middleName: middleName,
			dateOfBirth: dateOfBirth,
			placeOfBirth: placeOfBirth,
			gender: gender,
			motherLastName: motherLastName,
			motherFirstName: motherFirstName,
			motherMiddleName: motherMiddleName,
			motherDateOfBirth: motherDateOfBirth,
			fatherLastName: fatherLastName,
			fatherFirstName: fatherFirstName,
			fatherMiddleName: fatherMiddleName,
			fatherDateOfBirth: fatherDateOfBirth,
			contactNo: contactNo,
			email: email,
			civilStatus: civilStatus,
			religion: religion,
			annualIncome: annualIncome,
			educationalAttainment: educationalAttainment,
			isEmployed: isEmployed,
			isVoter: isVoter,
			isDeceased: 0, // should not be changed
			withPhilhealth: withPhilhealth,
			withSSS: withSSS,
			withElectricity: withElectricity,
			withWater: withWater,
			spouseLastName: spouseLastName,
			spouseFirstName: spouseFirstName,
			spouseMiddleName: spouseMiddleName,
			spouseGender: spouseGender,
			spouseDateOfBirth: spouseDateOfBirth,
			residenceId: residenceId,
			siblings: siblings,
			// [
			// 	{
			// 		id: 10,
			// 		lastName: "lastName",
			// 		firstName: "firstName",
			// 		middleName: "middleName",
			// 		gender: "Male",
			// 		dateOfBirth: "1992-10-07"
			// 	}
			// ]
			siblingsToBeAdded: siblingsToBeAdded,
			// [
			// 	{
			// 		lastName: "lastName",
			// 		firstName: "firstName",
			// 		middleName: "middleName",
			// 		gender: "Male",
			// 		dateOfBirth: "1992-10-07",
			// 	}
			// ]
			siblingsToBeRemoved: siblingsToBeRemoved,
			// [
			// 	1,
			// 	2,
			// 	3,
			// 	4,
			// 	5
			// ]
			children: children,
			// [
			// 	{
			// 		id: 10,
			// 		lastName: "lastName",
			// 		firstName: "firstName",
			// 		middleName: "middleName",
			// 		gender: "Male",
			// 		dateOfBirth: "1992-10-07"
			// 	}
			// ]
			childrenToBeAdded: childrenToBeAdded,
			// [
			// 	{
			// 		lastName: "lastName",
			// 		firstName: "firstName",
			// 		middleName: "middleName",
			// 		gender: "Male",
			// 		dateOfBirth: "1992-10-07"
			// 	}
			// ]
			childrenToBeRemoved: childrenToBeRemoved
			// [
			// 	1,
			// 	2,
			// 	3,
			// 	4,
			// 	5
			// ]
		});
	};

	self.delete = function (id) {
		return $http.delete("http://localhost/angular-baranggo/api/person/" + id, {});
	}

	return self;
})

.factory("Residences", function($http, $q) {
    var self = this;

    self.getAll = function() {
        return $http.get("api/residences", {});
    };

    self.get = function(id) {
        return $http.get("api/residence/id/" + id, {});
    };

    // self.add = function (blockNo, lotNo, street, subdivision, latitude, longitude, barangayId, code) {
    // 	return $http.post("api/residence", {
    // 		blockNo: blockNo,
    // 		lotNo: lotNo,
    // 		street: street,
    // 		subdivision: subdivision,
    // 		latitude: latitude,
    // 		longitude: longitude,
    // 		barangayId: barangayId,
    // 		code: code
    // 	})
    // };

    self.add = function(residence) {
        return $http.post("api/residence", residence)
    };

    return self;
})

.factory("Barangays", function($http, $q) {
    var self = this;

    self.getAll = function() {
        return $http.get("api/barangays", {});
    };

    self.get = function(id) {
        return $http.get("api/barangay/id/" + id, {});
    };

    return self;
})

.factory("BarangayClearances", function($http, $q) {
    var self = this;

    self.getAll = function() {
        return $http.get("api/barangay_clearances", {});
    };

    self.get = function(id) {
        return $http.get("api/barangay_clearance/id/" + id, {});
    };

    self.add = function(personId, reason, remarks) {
        return $http.post("api/barangay_clearance", {
            personId: personId,
            reason: reason,
            remarks: remarks
        });
    };

    return self;
})

.factory("BarangayBusinessClearances", function($http, $q) {
    var self = this;

    self.getAll = function() {
        return $http.get("api/barangay_business_clearances", {});
    };

    self.get = function(id) {
        return $http.get("api/barangay_business_clearance/id/" + id, {});
    };

    self.add = function(personId, businessName, businessAddress, businessType) {
        return $http.post("api/barangay_business_clearance", {
            personId: personId,
            businessName: businessName,
            businessAddress: businessAddress,
            businessType: businessType
        });
    };

    return self;
})

.factory("CertificatesOfClosure", function($http, $q) {
    var self = this;

    self.getAll = function() {
        return $http.get("api/certificates_of_closure", {});
    };

    self.get = function(id) {
        return $http.get("api/certificate_of_closure/id/" + id, {});
    };

    self.add = function(personId, businessName, businessAddress, businessType, dateClosed) {
        return $http.post("api/certificate_of_closure", {
            personId: personId,
            businessName: businessName,
            businessAddress: businessAddress,
            businessType: businessType,
            dateClosed: dateClosed
        });
    };

    return self;
})

.factory("Users", function($http, $q) {
    var self = this;

    self.getAll = function() {
        return $http.get("api/users", {});
    };

    self.get = function(id) {
        return $http.get("api/user/id/" + id, {});
    };

    return self;
})

.factory("Settings", function($http, $q) {
    var self = this;

    self.get = function() {
        return $http.get("api/settings", {});
    };

    self.add = function(barangayId) {
        return $http.post("api/setting", {
            barangayId: barangayId
        });
    };

    self.update = function(barangayId) {
        return $http.put("api/setting", {
            barangayId: barangayId
        })
    };

    return self;
})

.factory("Person", function(Residences, $q) {
    var person = {};

    person.children = [];
    person.siblings = [];


    person.setResidenceId = function(residenceId) {
        person.residenceId = residenceId
    };

    person.getResidenceId = function() {
        return person.residenceId;
    }


    person.setPersonId = function(personId) {
        person.personId = personId;
    };

    person.getPersonId = function() {
        return person.personId;
    }

    person.setChildrenToBeAdded = function(firstname, lastName, middleName, dateOfBirth, gender) {
        person.childrenToBeAdded.push({
            firstName: firstname, 
            lastName: lastName, 
            middleName: middleName, 
            dateOfBirth: dateOfBirth, 
            gender: gender
        })
    }

    person.getChildrenToBeAdded = function() {
        return person.childrenToBeAdded;
    }

    person.setChildrenToBeRemove = function() {

    }

    person.getChildrenToBeRemove = function() {

    }

    // person.setProfileInfo = function(personId, lastName, firstName, middleName, dateOfBirth, placeOfBirth, gender, contactNo, email, civilStatus, religion, annualIncome, educationalAttainment, isEmployed, isVoter, isDeceased, withPhilhealth, withSSS, withElectricity, withWater, spouseLastName, spouseFirstName, spouseMiddleName, spouseGender, spouseDateOfBirth) {
    //     personId = personId;
    //     lastName = lastName;
    //     firstName = firstName;
    //     middleName = middleName;
    //     dateOfBirth = dateOfBirth;
    //     placeOfBirth = placeOfBirth;
    //     gender = gender;
    //     contactNo = contactNo;
    //     email = email;
    //     civilStatus = civilStatus;
    //     religion = religion;
    //     annualIncome = annualIncome;
    //     educationalAttainment = educationalAttainment;
    //     isEmployed = isEmployed;
    //     isVoter = isVoter;
    //     isDeceased = isDeceased;
    //     withPhilhealth = withPhilhealth;
    //     withSSS = withSSS;
    //     withElectricity = withElectricity;
    //     withWater = withWater;
    //     withWater = spouseLastName;
    //     spouseFirstName = spouseFirstName;
    //     spouseMiddleName = spouseMiddleName;
    //     spouseGender = spouseGender;
    //     spouseDateOfBirth = spouseDateOfBirth
    // }

    // person.setParentInfo = function(firstName, lastName) {
    //     person.children.push({
    //         firstName: firstName,
    //         lastName: lastName
    //     });
    // };


    return person;
})

.factory('ResidenceLookup', ['Person', 'Residences', '$q', function(Person, Residences, $q) {
    return {
        getAddress: function() {
            return Residences.getAll().then(function(res) {
                for (var i = 0; i < res.data.length; i++) {
                    if (res.data[i].id == Person.getResidenceId()) {
                        return res.data[i];
                        break;
                    }
                };
            }, function(response) {
                return $q.reject(response.data);
            });
        }
    };
}]);
