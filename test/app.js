'use strict';

angular.module('tutorialApp', ['ngAnimate','ngRoute'])
	.config(function($routeProvider) {
	  $routeProvider
	    .when('/', { templateUrl: 'articles.html' })
	    .when('/about', { template: 'Über unsere Pizzeria' })
	    .otherwise({ redirectTo: '/' });
	})
  .factory('Cart', function() {
    var items = [];
    return {
      getItems: function() {
        return items;
      },
      addArticle: function(article) {
        items.push(article);
      },
      sum: function() {
        return items.reduce(function(total, article) {
          return total + article.price;
        }, 0);
      }
    };
  })
  .controller('ArticlesCtrl', function($scope, $http, Cart){
    $http.get('articles.json').then(function(articlesResponse) {
      $scope.articles = articlesResponse.data;
      $scope.cart = Cart;
    })
   })
  .controller('CartCtrl', function($scope, Cart){
	  $scope.cart = Cart;
   })
  .directive('price', function(){
	  return {
	    restrict: 'E',
	    scope: {
	      value: '='
	    },
	    template: '<span ng-show="value == 0">kostenlos</span>' +
	      '<span ng-show="value > 0">{{value | currency}}</span>'
	  }
	})
	
	;
