angular.module("baranggoApp.services", [])

.factory("Censuses", function ($http, $q) {
	var self = this;

	self.getAllCensuses = function () {
		var deferred = $q.defer();

		$http.get(CURRENT_CONTROLLER + "/get_sample_output").success(function (data) {
			deferred.resolve(data);
		}).error(function (data) {
			deferred.reject("Error");
		});

		return deferred.promise;
	};

	self.addPerson = function (lastName, firstName, middleName) {
		$http.post(CURRENT_CONTROLLER + "/add_person", {
			lastName: lastName,
			firstName: firstName,
			middleName: middleName
		});
	};

	return self;
});