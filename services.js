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
			annualIncome: fatherDateOfBirth,
			educationalAttainment: College,
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
			siblings: sibings,
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
			childrenToBeAdded: childrenToBeRemoved,
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

	return self;
})

.factory("Residences", function ($http, $q) {
	var self = this;

	self.getAll = function () {
		return $http.get("api/residences", {});
	};

	self.get = function (id) {
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
		return $http.post("api/residence",residence)
	};

	return self;
})

.factory("Barangays", function ($http, $q) {
	var self = this;

	self.getAll = function () {
		return $http.get("api/barangays", {});
	};

	self.get = function (id) {
		return $http.get("api/barangay/id/" + id, {});
	};

	return self;
})

.factory("BarangayClearances", function ($http, $q) {
	var self = this;

	self.getAll = function () {
		return $http.get("api/barangay_clearances", {});
	};

	self.get = function (id) {
		return $http.get("api/barangay_clearance/id/" + id, {});
	};

	self.add = function (personId, reason, remarks) {
		return $http.post("api/barangay_clearance", {
			personId: personId,
			reason: reason,
			remarks: remarks
		});
	};

	return self;
})

.factory("BarangayBusinessClearances", function ($http, $q) {
	var self = this;

	self.getAll = function () {
		return $http.get("api/barangay_business_clearances", {});
	};

	self.get = function (id) {
		return $http.get("api/barangay_business_clearance/id/" + id, {});
	};

	self.add = function (personId, businessName, businessAddress, businessType) {
		return $http.post("api/barangay_business_clearance", {
			personId: personId,
			businessName: businessName,
			businessAddress: businessAddress,
			businessType: businessType
		});
	};

	return self;
})

.factory("CertificatesOfClosure", function ($http, $q) {
	var self = this;

	self.getAll = function () {
		return $http.get("api/certificates_of_closure", {});
	};

	self.get = function (id) {
		return $http.get("api/certificate_of_closure/id/" + id, {});
	};

	self.add = function (personId, businessName, businessAddress, businessType, dateClosed) {
		return $http.post("api/certificate_of_closure", {
			personId: personId,
			businessName: businessName,
			businessAddress: businessAddress,
			businessType : businessType,
			dateClosed: dateClosed
		});
	};

	return	 self;
})

.factory("Users", function ($http, $q) {
	var self = this;

	self.getAll = function () {
		return $http.get("api/users", {});
	};

	self.get = function (id) {
		return $http.get("api/user/id/" + id, {});
	};

	return self;
})

.factory("Settings", function ($http, $q) {
	var self = this;

	self.get = function () {
		return $http.get("api/settings", {});
	};

	self.add = function (barangayId) {
		return $http.post("api/setting", {
			barangayId: barangayId
		});
	};

	self.update = function (barangayId) {
		return $http.put("api/setting", {
			barangayId: barangayId
		})
	};

	return self;
});
