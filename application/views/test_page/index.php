<!DOCTYPE html>
<html lang="en" data-ng-app="baranggoApp">
<head>
	<title>Baranggo</title>
</head>
<body data-ng-controller="CensusesController">
	Test Page

	<input ng-model="person.last_name" type="text" />
	<input ng-model="person.first_name" type="text" />
	<input ng-model="person.middle_name" type="text" />
	<button type="button" ng-click="addPerson()">Add</button>

	<?php include('/../_shared/js.php'); ?>
</body>
</html>