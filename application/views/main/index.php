<!DOCTYPE html>
<html lang="en" >
<head>
	<title>Main</title>
	<?php include('/../_shared/css.php'); ?>
</head>
<body ng-app="baranggoApp">
	<!-- navbar -->
	<div class="app-header navbar">
		<!-- navbar header -->
		<div class="navbar-header bg-dark">
			<button class="pull-right visible-xs dk" data-toggle="class:show" data-target=".navbar-collapse">
				<i class="glyphicon glyphicon-cog"></i>
			</button>
			<button class="pull-right visible-xs" data-toggle="class:off-screen" data-target=".app-aside" ui-scroll="app">
				<i class="glyphicon glyphicon-align-justify"></i>
			</button>
			<!-- brand -->
			<a href="#/" class="navbar-brand text-lt">
				<i class="fa fa-btc"></i>
				<span class="hidden-folded m-l-xs">Baranggo</span>
			</a>
		<!-- / brand -->
		</div>
		<!-- / navbar header -->

		<!-- navbar collapse -->
		<div class="collapse pos-rlt navbar-collapse box-shadow bg-white-only">
			<!-- navbar right -->
			<ul class="nav navbar-nav navbar-right">
				<li class="dropdown">
					<a href="#" data-toggle="dropdown" class="dropdown-toggle clear" data-toggle="dropdown">
						<span class="hidden-sm hidden-md">John.Smith</span><b class="caret"></b>
					</a>
					<!-- dropdown -->
					<ul class="dropdown-menu animated fadeInRight w">
						<li><a ui-sref="access.signin">Logout</a></li>
					</ul>
					<!-- / dropdown -->
				</li>
			</ul>
			<!-- / navbar right -->
		</div>
		<!-- / navbar collapse -->
	</div>
	<!-- / navbar -->

<!-- menu -->
<div class="app-aside hidden-xs {{app.settings.asideColor}}">
    <div class="aside-wrap">
        <!-- if you want to use a custom scroll when aside fixed, use the slimScroll
<div class="navi-wrap" ui-jq="slimScroll" ui-options="{height:'100%', size:'8px'}">
-->
        <div class="navi-wrap">
            <!-- nav -->
            <nav ui-nav class="navi">
                <!-- list -->
                <ul class="nav">
                    <li class="hidden-folded padder m-t m-b-sm text-muted text-xs">
                        <span translate="aside.nav.HEADER">Navigation</span>
                    </li>
                    <li>
                        <a href class="auto">
                            <span class="pull-right text-muted">
<i class="fa fa-fw fa-angle-right text"></i>
<i class="fa fa-fw fa-angle-down text-active"></i>
</span>
                            <i class="glyphicon glyphicon-stats icon text-primary-dker"></i>
                            <span class="font-bold" translate="aside.nav.DASHBOARD">Dashboard</span>
                        </a>
                        <ul class="nav nav-sub dk">
                            <li class="nav-sub-header">
                                <a href>
                                    <span translate="aside.nav.DASHBOARD">Dashboard</span>
                                </a>
                            </li>
                            <li ui-sref-active="active">
                                <a ui-sref="app.dashboard-v1">
                                    <span>Dashboard v1</span>
                                </a>
                            </li>
                            <li ui-sref-active="active">
                                <a ui-sref="app.dashboard-v2">
                                    <b class="label bg-info pull-right">N</b>
                                    <span>Dashboard v2</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li ui-sref-active="active">
                        <a ui-sref="app.calendar">
                            <i class="glyphicon glyphicon-calendar icon text-info-dker"></i>
                            <span class="font-bold" translate="aside.nav.CALENDAR">Calendar</span>
                        </a>
                    </li>
                    <li ui-sref-active="active">
                        <a ui-sref="app.mail.list">
                            <b class="badge bg-info pull-right">9</b>
                            <i class="glyphicon glyphicon-envelope icon text-info-lter"></i>
                            <span class="font-bold" translate="aside.nav.EMAIL">Email</span>
                        </a>
                    </li>
                    <li>
                        <a href class="auto">
                            <span class="pull-right text-muted">
<i class="fa fa-fw fa-angle-right text"></i>
<i class="fa fa-fw fa-angle-down text-active"></i>
</span>
                            <i class="glyphicon glyphicon-th-large icon text-success"></i>
                            <span class="font-bold">Apps</span>
                        </a>
                        <ul class="nav nav-sub dk">
                            <li class="nav-sub-header">
                                <a href>
                                    <span>Apps</span>
                                </a>
                            </li>
                            <li ui-sref-active="active">
                                <a ui-sref="apps.note">
                                    <span>Note</span>
                                </a>
                            </li>
                            <li ui-sref-active="active">
                                <a ui-sref="apps.contact">
                                    <span>Contacts</span>
                                </a>
                            </li>
                            <li ui-sref-active="active">
                                <a ui-sref="app.weather">
                                    <span>Weather</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li class="line dk"></li>
                </ul>
                <!-- / list -->
            </nav>
            <!-- / nav -->
        </div>
    </div>
</div>
<!-- / menu -->



	<div class="app" id="app" ng-class="{'app-header-fixed':app.settings.headerFixed, 'app-aside-fixed':app.settings.asideFixed, 'app-aside-folded':app.settings.asideFolded, 'app-aside-dock':app.settings.asideDock, 'container':app.settings.container}" ui-view></div>

	<?php include('/../_shared/js.php'); ?>

	<script type="text/javascript">
		+ function($) {
			$(function() {
				// class
				$(document).on('click', '[data-toggle^="class"]', function(e) {
					e && e.preventDefault();
					var $this = $(e.target),
						$class, $target, $tmp, $classes, $targets;
					!$this.data('toggle') && ($this = $this.closest('[data-toggle^="class"]'));
					$class = $this.data()['toggle'];
					$target = $this.data('target') || $this.attr('href');
					$class && ($tmp = $class.split(':')[1]) && ($classes = $tmp.split(','));
					$target && ($targets = $target.split(','));
					$classes && $classes.length && $.each($targets, function(index, value) {
						if ($classes[index].indexOf('*') !== -1) {
							var patt = new RegExp('\\s' +
								$classes[index].replace(/\*/g, '[A-Za-z0-9-_]+').split(' ').join('\\s|\\s') +
								'\\s', 'g');

							$($this).each(function(i, it) {
								var cn = ' ' + it.className + ' ';
								while (patt.test(cn)) {
									cn = cn.replace(patt, ' ');
								}
								it.className = $.trim(cn);
							});
						}
						($targets[index] != '#') && $($targets[index]).toggleClass($classes[index]) || $this.toggleClass($classes[index]);
					});
					$this.toggleClass('active');
				});

				// collapse nav
				$(document).on('click', 'nav a', function(e) {
					var $this = $(e.target),
						$active;
					$this.is('a') || ($this = $this.closest('a'));

					$active = $this.parent().siblings(".active");
					$active && $active.toggleClass('active').find('> ul:visible').slideUp(200);

					($this.parent().hasClass('active') && $this.next().slideUp(200)) || $this.next().slideDown(200);
					$this.parent().toggleClass('active');

					$this.next().is('ul') && e.preventDefault();

					setTimeout(function() {
						$(document).trigger('updateNav');
					}, 300);
				});
			});
		}(jQuery);
	</script>
</body>
</html>