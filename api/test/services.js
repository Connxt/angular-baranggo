angular.module("baranggoApp.services", [])

.factory("Persons", function ($http) {
	var self = this;

	self.getAll = function () {
		return $http.get(BASE_URL + "api/persons/", {});
	};

	self.get = function (personId) {
		return $http.get(BASE_URL + "api/person/id/" + personId, {});
	};

	self.add = function () {
		
	};

	self.update = function () {

	};

	self.delete = function (personId) {

	};

	return self;
})

.factory("Residences", function ($http) {
	var self = this;

	self.getAll = function () {
		return $http.get(BASE_URL + "api/residences/", {});
	};

	self.get = function (personId) {
		return $http.get(BASE_URL + "api/residence/id/" + personId, {});
	};

	return self;
});