<!DOCTYPE html>
<html lang="en" >
<head>
	<title>Baranggo - Main</title>
	<?php include('/../_shared/css.php'); ?>
</head>
<body class="hold-transition skin-blue sidebar-mini" ng-app="baranggoApp">
	<?php include('/../_shared/header.php'); ?>
	<?php include('/../_shared/sidebar.php'); ?>

	<div class="wrapper">
		<div class="content-wrapper">
			<div ng-view></div>
		</div>
	</div>

	<?php include('/../_shared/js.php'); ?>
</body>
</html>