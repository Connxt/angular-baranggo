angular.module("baranggoApp.services", [])

.factory("Censuses", function ($http, $q) {
	var self = this;

	self.getAllCensuses = function () {
		var deferred = $q.defer();

		$http.post("census/get_all_censuses").success(function (data) {
			deferred.resolve(data);
		}).error(function (data) {
			deferred.reject("Error");
		});

		return deferred.promise;
	};

	self.addPerson = function (lastName, firstName, middleName) {
		$http.post("census/add_person", {
			lastName: lastName,
			firstName: firstName,
			middleName: middleName
		});
	};

	return self;
});