angular.module("baranggoApp.services", [])

.factory("Users", function ($http, $q) {
	var self = this;

	return self;
})

.factory("Censuses", function ($http, $q) {
	var self = this;

	self.getAllCensuses = function () {
		return $http.post("censuses/get_all_censuses", {});
	}

	return self;
});