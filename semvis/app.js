'use strict';

angular.module('semvisApp', ['ngAnimate','ngRoute'])
	.config(function($routeProvider) {
	  $routeProvider
	    .when('/', { templateUrl: 'projects.html' })
	    .when('/about', { template: 'Über SemVis' })
	    .when('/project-editor', { templateUrl: 'project-editor.html' })
	    .otherwise({ redirectTo: '/' });
	})
  .factory('Workspace', function() {
//	  var project = {'id': '9999', 'name': 'New project'};
	  var project = null;
      
    return {
      getProject: function() {
          return project;
        },
      loadProject: function(loadedProject) {
        project = loadedProject;
      }
    };
  })
  .controller('ProjectsCtrl', function($scope, $http, Workspace){
    $http.get('projects.json').then(function(projectsResponse) {
      $scope.projects = projectsResponse.data;
      $scope.workspace = Workspace;
    })
   })
  .controller('WorkspaceCtrl', function($scope, Workspace){
	  $scope.workspace = Workspace;
   })
//  .directive('price', function(){
//	  return {
//	    restrict: 'E',
//	    scope: {
//	      value: '='
//	    },
//	    template: '<span ng-show="value == 0">kostenlos</span>' +
//	      '<span ng-show="value > 0">{{value | currency}}</span>'
//	  }
//	})
	
	;
