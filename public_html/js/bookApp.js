var booksCache = {};
var bookApp = angular.module("booksModule", ["ngRoute"])
  .config(function($routeProvider) {

    $routeProvider.when("/home", {
        templateUrl: "tpl/home.html",
        controller: "homeController",
        pageTitle: "home page"
      })
      .when("/about", {
        templateUrl: "tpl/about.html",
        controller: "aboutController",
        pageTitle: "about page"
      })
      .when("/contact", {
        templateUrl: "tpl/contact.html",
        controller: "contactController",
        pageTitle: "contact page"
      })
      .otherwise({
        redirectTo: '/home'
      });

  })
  .controller("mainController", function($rootScope, $scope, $route) {

    $scope.setActive = function(event) {

      var links = document.querySelectorAll('.menu ul li a');
      for (var i = 0; i < links.length; i++) {
        links[i].className = "";

      }


      angular.element(event.target).parent().addClass('active');
    };


  })
  .controller("homeController", function($rootScope, $scope, $route, $http) {

    $rootScope.title = $route.current.$$route.pageTitle;
    $scope.sortBooks = "+bookName";
    $scope.categoyBooks = "";

    $http({
      method: "GET",
      url: "js/books.json"
    }).then(function(response) {
      $scope.books = booksCache = response.data;
      $scope.categories = getCategories($scope.books);
    });
    $scope.filterCategoyBooks = function() {
      var data = [];
      for (var i = 0; i < $scope.categories.length; i++) {
        for (var y = 0; y < booksCache.length; y++) {
          if ($scope.categories[i] == booksCache[y].bookCategory) {
            if ($scope[$scope.categories[i]] == true) {
              data.push(booksCache[y]);
            }
          }
        }
      }
      console.log(data);
      $scope.books = (data.length > 0) ? data : booksCache;
    }
    $scope.sortByPrice = function(by) {
      $scope.sortBooks = by;
      var links = document.querySelectorAll('#sort-price-links li a');
      for (var i = 0; i < links.length; i++) {
        links[i].className = "";
      }
      event.target.className = 'press-active';

    };

  })
  .controller("aboutController", function($rootScope, $scope, $route) {
    $rootScope.title = $route.current.$$route.pageTitle;
  })
  .controller("contactController", function($rootScope, $scope, $route) {
    $rootScope.title = $route.current.$$route.pageTitle;
  });
var getCategories = function(books) {
  var categories = [];
  for (var i = 0; i < books.length; i++) {
    if (categories.indexOf(books[i].bookCategory) == -1) {
      categories.push(books[i].bookCategory);
    }
  }
  return categories;
}
