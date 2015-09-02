<!DOCTYPE html>
<html lang="en" >
<head>
	<title>Baranggo - Main</title>
	<?php include('/../../../app/views/partials/css.php'); ?>
</head>
<body class="hold-transition skin-blue sidebar-mini" ng-app="baranggoApp" ng-controller="MainCtrl">
	<?php include('/../../../app/views/partials/header.html'); ?>
	<?php include('/../../../app/views/partials/sidebar.html'); ?>

	<div class="wrapper">
		<div class="content-wrapper">
			<div ng-view></div>
		</div>
	</div>

	<?php include('/../../../app/views/partials/js.php'); ?>
</body>
</html>