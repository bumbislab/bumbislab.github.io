// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('lab003', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "menu.html"
    })
    .state('app.home', {
      url: "/home",
      views: {
        'menuContent' :{
          templateUrl: "home.html"
        }
      }
    })
    .state('app.help', {
      url: "/help",
      views: {
        'menuContent' :{
          templateUrl: "help.html",
		  controller: 'HelpCtrl'
        }
      }
    })
  $urlRouterProvider.otherwise("/app/home");
})

.controller('HelpCtrl', function($scope) {
  $scope.items = [
    { title: 'iPhone 4/4s pakrovėjas', id: 1, description: 'Pakrovėjas....', available: 2, total: 10 },
    { title: 'iPhone 5s pakrovėjas', id: 2, description: 'Pakrovėjas....', available: 5, total: 5 },
    { title: 'MiniUSB pakrovėjas', id: 3, description: 'Pakrovėjas....', available: 0, total: 3 }
  ];
})

.controller('menuCtrl', function($scope) {
	$scope.menuItems = [
		{ title: 'Home', icon: 'ion-home', href: '#app/home' },
		{ title: 'Support', icon: 'ion-help', href: '#app/help' },
		{ title: 'Incident', icon: 'ion-wrench', href: '#' },
		{ title: 'Logout', icon: 'ion-log-out', href: '#' }
	];
})

