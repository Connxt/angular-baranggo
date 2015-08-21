<!DOCTYPE html>
<html lang="en" >
<head>
	<title>Main</title>
	<?php include('/../_shared/css.php'); ?>
</head>
<body ng-app="baranggoApp" ng-controller="MainController">
	header
	<ul class="nav nav-pills nav-stacked">
		<li ng-class="{ active: isActive('/') }"><a href="#/">Home</a></li>
		<li ng-class="{ active: isActive('/census') }"><a href="#/census">Census</a></li>
	</ul>
	<div ng-view></div>
	footer
	<?php include('/../_shared/js.php'); ?>
</body>
</html>