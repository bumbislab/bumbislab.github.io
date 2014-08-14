(function() {

var app = angular.module('lab003', ['ionic', 'lbServices', 'app.services'])

app.run(function($rootScope, $ionicPlatform, $location, AppAuth) {
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
});

app.config(function($stateProvider, $urlRouterProvider, $httpProvider) {

  $stateProvider
	.state('login', {
		url: "/login",
		templateUrl : "templates/login.html",
		controller: 'LoginCtrl'
	})
    .state('app', {
		url: "/app",
		abstract: true,
		templateUrl: "templates/app.html",
		controller: 'AppCtrl'
	})
	.state('app.home', {
		url: "/home",
		views: {
			'mainContent' :{
				templateUrl: "templates/app.home.html"
			}
		}
    })
    .state('app.support', {
      url: "/support",
      views: {
        'mainContent' :{
          templateUrl: "templates/app.support.html",
		  controller: 'supportCtrl'
        }
      }
    })
	.state('app.credits', {
		url : "/credits",
		views: {
			'mainContent' : {
				templateUrl: "templates/app.credits.html",
			}
		}
	})
  $urlRouterProvider.otherwise("/app/home");

  // Intercept 401 responses and redirect to login screen
  $httpProvider.interceptors.push(function($q, $location, AppAuth) {
    return {
      responseError: function(rejection) {
        console.log('intercepted rejection of ', rejection.config.url, rejection.status);
        if (rejection.status == 401) {
          AppAuth.currentUser = null;
          // save the current location so that login can redirect back
          $location.nextAfterLogin = $location.path();
          $location.path('/login');
        }
        return $q.reject(rejection);
      }
    };
  });
});

app.controller('AppCtrl', function($scope, User, $location, AppAuth) {
    AppAuth.ensureHasCurrentUser(User);
    $scope.currentUser = AppAuth.currentUser;

    $scope.options = [
    {text: 'Logout', action: function() {
      User.logout(function() {
        $scope.currentUser =
        AppAuth.currentUser = null;
        $location.path('/');
      });
    }}
  ];

  $scope.toggleLeft = function() {
    $scope.sideMenuController.toggleLeft();
  };
})

app.controller('supportCtrl', function($scope) {
  $scope.items = [
    { title: 'iPhone 4/4s pakrovėjas', id: 1, description: 'Pakrovėjas....', available: 2, total: 10 },
    { title: 'iPhone 5s pakrovėjas', id: 2, description: 'Pakrovėjas....', available: 5, total: 5 },
    { title: 'MiniUSB pakrovėjas', id: 3, description: 'Pakrovėjas....', available: 0, total: 3 }
  ];
});

app.controller('menuCtrl', function($scope) {
	$scope.menuItems = [
		{ title: 'Home', icon: 'ion-home', href: '#app/home' },
		{ title: 'Support', icon: 'ion-help', href: '#app/support' },
		{ title: 'Credits', icon: 'ion-wrench', href: '#app/credits' },
		{ title: 'Logout', icon: 'ion-log-out', href: '#' }
	];
});

app.controller('LoginCtrl', function($scope, $routeParams, User, $location, AppAuth) {
  $scope.registration = {};
  $scope.credentials = {
    email: 'foo@bar.com',
    password: '123456'
  };

  $scope.login = function() {
    $scope.loginResult = User.login({include: 'user', rememberMe: true}, $scope.credentials,
      function() {
        var next = $location.nextAfterLogin || '/';
        $location.nextAfterLogin = null;
        AppAuth.currentUser = $scope.loginResult.user;
        $location.path(next);
      },
      function(res) {
        $scope.loginError = res.data.error;
      }
    );
  }
  $scope.register = function() {
    $scope.user = User.save($scope.registration,
      function() {
        // success
      },
      function(res) {
        $scope.registerError = res.data.error;
      }
    );
  }
});

})();

