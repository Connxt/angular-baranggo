angular.module('baranggoApp', ['baranggoApp.controllers', 'baranggoApp.services', 'ui.router', 'smart-table'])

.config(function ($urlRouterProvider, $stateProvider) {

	// default
	$urlRouterProvider.otherwise('/home');

	$stateProvider

// HOME STATES AND NESTED VIEWS ========================================
    .state('home', {
    url: '/home',
    templateUrl: APP_URL + 'views/home.html',
    controller: 'HomeCtrl'
	})

	// nested list with custom controller
	.state('censuses', {
	    url: '/censuses',
	    templateUrl: APP_URL + 'views/censuses.html',
	    controller: 'CensusCtrl as census'
	})

	.state('new-record', {
	    url: '/new-record',
	    templateUrl: APP_URL + 'views/new-record.html',
	    controller: 'NewRecordCtrl as person'
	})

  .state('residences', {
      url: '/residences',
      templateUrl: APP_URL + 'views/residences.html',
      controller: 'ResidenceCtrl'
  }); 
})

.directive('modal', function () {
    return {
      template: '<div class="modal modal-primary modal-wide fade">' + 
          '<div class="modal-dialog">' + 
            '<div class="modal-content">' + 
              '<div class="modal-header">' + 
                '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' + 
                '<h4 class="modal-title">{{ title }}</h4>' + 
              '</div>' + 
              '<div class="modal-body" ng-transclude></div>' + 
            '</div>' + 
          '</div>' + 
        '</div>',
      restrict: 'E',
      transclude: true,
      replace:true,
      scope:true,
      link: function postLink(scope, element, attrs) {
        scope.title = attrs.title;

        scope.$watch(attrs.visible, function(value){
          if(value == true)
            $(element).modal('show');
          else
            $(element).modal('hide');
        });

        $(element).on('shown.bs.modal', function(){
          scope.$apply(function(){
            scope.$parent[attrs.visible] = true;
          });
        });

        $(element).on('hidden.bs.modal', function(){
          scope.$apply(function(){
            scope.$parent[attrs.visible] = false;
          });
        });
      }
    };
  });;
