angular.module("baranggoApp.services", [])

.factory("Persons", function ($http) {
	var self = this;

	self.getAll = function () {
		return $http.get("api/persons", {});
	};

	self.get = function (id) {
		return $http.get("api/person/id/" + id + "/", {});
	};

	self.add = function (lastName, firstName, middleName, dateOfBirth, placeOfBirth, gender, motherLastName, motherFirstName, motherMiddleName, motherDateOfBirth, fatherLastName, fatherFirstName, fatherMiddleName, fatherDateOfBirth, contactNo, email, civilStatus, religion, annualIncome, educationalAttainment, isEmployed, isVoter, isDeceased, withPhilhealth, withSSS, withElectricity, withWater, spouseLastName, spouseFirstName, spouseMiddleName, spouseGender, spouseDateOfBirth, residenceId, siblings, children) {
		return $http.post("api/person", {
			lastName: "lastName",
			firstName: "firstName",
			middleName: "middleName",
			dateOfBirth: "1992-10-07",
			placeOfBirth: "placeOfBirth",
			gender: "gender",
			motherLastName: "motherLastName",
			motherFirstName: "motherFirstName",
			motherMiddleName: "motherMiddleName",
			motherDateOfBirth: "1992-10-07",
			fatherLastName: "fatherLastName",
			fatherFirstName: "fatherFirstName",
			fatherMiddleName: "fatherMiddleName",
			fatherDateOfBirth: "1992-10-07",
			contactNo: "contactNo",
			email: "email",
			civilStatus: "civilStatus",
			religion: "religion",
			annualIncome: "100000",
			educationalAttainment: "College",
			isEmployed: "1",
			isVoter: "1",
			isDeceased: "0",
			withPhilhealth: "1",
			withSSS: "1",
			withElectricity: "1",
			withWater: "1",
			spouseLastName: "spouseLastName",
			spouseFirstName: "spouseFirstName",
			spouseMiddleName: "spouseMiddleName",
			spouseGender: "spouseGender",
			spouseDateOfBirth: "1992-10-07",
			residenceId: "00000000001",
			siblings: [{
				lastName: "lastName",
				firstName: "firstName",
				middleName: "middleName",
				gender: "gender",
				dateOfBirth: "1992-10-07",
			}],
			children: [{
				lastName: "lastName",
				firstName: "firstName",
				middleName: "middleName",
				gender: "gender",
				dateOfBirth: "1992-10-07",
			}]
		});
	};

	self.update = function (id, lastName, firstName, middleName, dateOfBirth, placeOfBirth, gender, motherLastName, motherFirstName, motherMiddleName, motherDateOfBirth, fatherLastName, fatherFirstName, fatherMiddleName, fatherDateOfBirth, contactNo, email, civilStatus, religion, annualIncome, educationalAttainment, isEmployed, isVoter, isDeceased, withPhilhealth, withSSS, withElectricity, withWater, spouseLastName, spouseFirstName, spouseMiddleName, spouseGender, spouseDateOfBirth, residenceId, siblings, siblingsToBeAdded, siblingsToBeRemoved, children, childrenToBeAdded, childrenToBeRemoved) {
		return $http.put("api/person", {
			id: id,
			lastName: "lastName",
			firstName: "firstName",
			middleName: "middleName",
			dateOfBirth: "1992-10-07",
			placeOfBirth: "placeOfBirth",
			gender: "gender",
			motherLastName: "motherLastName",
			motherFirstName: "motherFirstName",
			motherMiddleName: "motherMiddleName",
			motherDateOfBirth: "1992-10-07",
			fatherLastName: "fatherLastName",
			fatherFirstName: "fatherFirstName",
			fatherMiddleName: "fatherMiddleName",
			fatherDateOfBirth: "1992-10-07",
			contactNo: "contactNo",
			email: "email",
			civilStatus: "civilStatus",
			religion: "religion",
			annualIncome: "100000",
			educationalAttainment: "College",
			isEmployed: "1",
			isVoter: "1",
			isDeceased: "0",
			withPhilhealth: "1",
			withSSS: "1",
			withElectricity: "1",
			withWater: "1",
			spouseLastName: "spouseLastName",
			spouseFirstName: "spouseFirstName",
			spouseMiddleName: "spouseMiddleName",
			spouseGender: "spouseGender",
			spouseDateOfBirth: "1992-10-07",
			residenceId: "00000000001",
			siblings: [{
				id: 10,
				lastName: "lastName",
				firstName: "firstName",
				middleName: "middleName",
				gender: "gender",
				dateOfBirth: "1992-10-07",
			}],
			siblingsToBeAdded: [{
				lastName: "lastName",
				firstName: "firstName",
				middleName: "middleName",
				gender: "gender",
				dateOfBirth: "1992-10-07",
			}],
			siblingsToBeRemoved: [1, 2, 3, 4, 5],
			children: [{
				id: 10,
				lastName: "lastName",
				firstName: "firstName",
				middleName: "middleName",
				gender: "gender",
				dateOfBirth: "1992-10-07",
			}],
			childrenToBeAdded: [{
				lastName: "lastName",
				firstName: "firstName",
				middleName: "middleName",
				gender: "gender",
				dateOfBirth: "1992-10-07",
			}],
			childrenToBeRemoved: [1, 2, 3, 4, 5]
		});
	};

	return self;
})

.factory("Users", function ($http, $q) {
	var self = this;

	return self;
});
