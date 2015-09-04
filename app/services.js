angular.module("baranggoApp.services", [])

.factory("Censuses", function ($http) {
	var self = this;

	self.getAll = function () {
		return $http.post("censuses/get_all_censuses", {});
	};

	self.add = function () {
		return $http.post("censuses/add_census", {

		});
	}

	return self;
})

.factory("Users", function ($http, $q) {
	var self = this;

	return self;
});