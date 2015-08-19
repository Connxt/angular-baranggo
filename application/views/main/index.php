<!DOCTYPE html>
<html lang="en" ng-app="baranggoApp">
<head>
	<title>Main</title>
</head>
<body ng-controller="MainController">
	header
	<ul>
		<li><a href="#/">Home</a></li>
		<li><a href="#/census">Census</a></li>
	</ul>
	<div ng-view></div>
	footer
	<?php include('/../_shared/js.php'); ?>
</body>
</html>