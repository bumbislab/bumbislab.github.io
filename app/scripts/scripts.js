"use strict";angular.module("config",[]).constant("ENV",{name:"production",apiEndpoint:"http://api.yoursite.com/"});var app=angular.module("bumbislabApp",["ionic","lbServices","bumbislabSvc"]);app.run(["$ionicPlatform","$state","AuthSvc",function(a){console.log("bumbislabApp.run()"),a.ready(function(){window.cordova&&window.cordova.plugins.Keyboard&&cordova.plugins.Keyboard.hideKeyboardAccessoryBar(!0),window.StatusBar&&StatusBar.styleDefault()})}]),app.config(["$stateProvider","$urlRouterProvider","$httpProvider",function(a,b){console.log("bumbislabApp.config()"),a.state("main",{url:"","abstract":!0,templateUrl:"templates/main.html",controller:"MainCtrl"}).state("main.home",{url:"/home",views:{mainContent:{templateUrl:"templates/home.html",controller:"HomeCtrl"}}}).state("main.credits",{url:"/credits",views:{mainContent:{templateUrl:"templates/credits.html",controller:"CreditsCtrl"}}}).state("main.support",{url:"/support",views:{mainContent:{templateUrl:"templates/support.html",controller:"SupportCtrl"}}}),b.otherwise("/home")}]);var app=angular.module("bumbislabApp");app.controller("MainCtrl",["$scope",function(){console.log("bumbislabApp.MainCtrl()")}]);var app=angular.module("bumbislabApp");app.controller("HomeCtrl",["$scope",function(){console.log("bumbislabApp.HomeCtrl()")}]);var app=angular.module("bumbislabApp");app.controller("MenuCtrl",["$scope","AuthSvc",function(a,b){console.log("bumbislabApp.MenuCtrl()"),a.menuItems=[{title:"Home",icon:"ion-home",href:"#/home"},{title:"Support",icon:"ion-help",href:"#/support"},{title:"Credits",icon:"ion-wrench",href:"#/credits"},{title:"Login",icon:"ion-log-in",href:"#/login"}],a.logout=function(){console.log("bumbislabApp.MenuCtrl.logout()"),b.logout()}}]);var app=angular.module("bumbislabApp");app.controller("CreditsCtrl",["$scope",function(){console.log("bumbislabApp.CreditsCtrl()")}]);var app=angular.module("bumbislabApp");app.controller("SupportCtrl",["$scope","$timeout","$ionicLoading","Item","LoadData",function(a,b,c,d,e){console.log("bumbislabApp.SupportCtrl()"),a.items=e(d.query()),a.doRefresh=function(){console.log("bumbislabApp.SupportCtrl.doRfresh()"),a.items=e(d.query()),a.$broadcast("scroll.refreshComplete")}}]);var app=angular.module("bumbislabApp");app.controller("LoginCtrl",["$scope","$state","AuthSvc",function(a,b,c){console.log("bumbislabApp.LoginCtrl()"),a.credentials={email:"",password:""},a.login=function(){console.log("bumbislabApp.LoginCtrl.login()"),c.login(a.credentials,function(a){a&&b.go("main.home")})}}]);var svc=angular.module("bumbislabSvc",[]);svc.provider("AuthSvc",["$httpProvider","$stateProvider",function(a,b){console.log("bumbislabSvc.provider.AuthSvc()"),a.interceptors.push("AuthInterceptor"),b.state("login",{url:"/login",templateUrl:"templates/login.html",controller:"LoginCtrl"}),this.$get=["User","LoopBackAuth","$rootScope","$state","LoadData",function(a,b,c,d,e){return new function(){var f=!1;c.$on("$stateChangeStart",function(a,b,c,e,g){console.log(a,b,c,e,g),f||"login"==b.name||(d.go("login",{notify:!1}),a.preventDefault())}),this.login=function(c,d){console.log("bumbislabSvc.AuthSvc.login(): username=",c.email),e(a.login({include:"user",rememberMe:!0},c,function(a){console.log("bumbislabSvc.AuthSvc.login():successlogin: ",a),b.setUser(a.id,a.userId,a.user),b.rememberMe=!0,b.save(),f=!0,d(!0)},function(a){console.log("bumbislabSvc.AuthSvc.login():failedlogin: ",a),console.log(a.data.error),f=!1,d(!1)}))},this.logout=function(){f=!1,a.logout(),d.go("login")},this.isLoggedIn=function(){return f}}}]}]),svc.factory("AuthInterceptor",["$q","$location",function(a,b){return console.log("bumbislabSvc.factory.AuthInterceptor()"),{responseError:function(c){return console.log("bumbislabApp.AuthInterceptor.responseError()"),console.log("intercepted rejection of ",c.config.url,c.status),401==c.status&&b.path("/login"),a.reject(c)}}}]),svc.factory("LoadData",["$timeout","$ionicLoading",function(a,b){return console.log("DEBUG: bumbislabSvc.factory.LoadData()"),function(a){return console.log("DEBUG: bumbislabSvc.LoadData(): new promise"),b.show({template:"Loading...",delay:700}),a.$promise.then(function(){console.log("DEBUG: bumbislabSvc.LoadData(): promise fullfiled"),b.hide()}),a}}]),function(a,b,c){var d="http://safe-sands-8713.herokuapp.com/api",e=b.module("lbServices",["ngResource"]);e.factory("User",["LoopBackResource","LoopBackAuth","$injector",function(a){var b=a(d+"/Users/:id",{id:"@id"},{login:{url:d+"/Users/login",method:"POST"},logout:{url:d+"/Users/logout",method:"POST"},confirm:{url:d+"/Users/confirm",method:"GET"},resetPassword:{url:d+"/Users/reset",method:"POST"},prototype$__findById__accessTokens:{url:d+"/Users/:id/accessTokens/:fk",method:"GET"},prototype$__destroyById__accessTokens:{url:d+"/Users/:id/accessTokens/:fk",method:"DELETE"},prototype$__updateById__accessTokens:{url:d+"/Users/:id/accessTokens/:fk",method:"PUT"},prototype$__get__accessTokens:{url:d+"/Users/:id/accessTokens",method:"GET",isArray:!0},prototype$__create__accessTokens:{url:d+"/Users/:id/accessTokens",method:"POST"},prototype$__delete__accessTokens:{url:d+"/Users/:id/accessTokens",method:"DELETE"},create:{url:d+"/Users",method:"POST"},upsert:{url:d+"/Users",method:"PUT"},exists:{url:d+"/Users/:id/exists",method:"GET"},findById:{url:d+"/Users/:id",method:"GET"},find:{url:d+"/Users",method:"GET",isArray:!0},findOne:{url:d+"/Users/findOne",method:"GET"},updateAll:{url:d+"/Users/update",method:"POST"},deleteById:{url:d+"/Users/:id",method:"DELETE"},count:{url:d+"/Users/count",method:"GET"},prototype$updateAttributes:{url:d+"/Users/:id",method:"PUT"}});return b}]),e.factory("Item",["LoopBackResource","LoopBackAuth","$injector",function(a){var b=a(d+"/items/:id",{id:"@id"},{create:{url:d+"/items",method:"POST"},upsert:{url:d+"/items",method:"PUT"},exists:{url:d+"/items/:id/exists",method:"GET"},findById:{url:d+"/items/:id",method:"GET"},find:{url:d+"/items",method:"GET",isArray:!0},findOne:{url:d+"/items/findOne",method:"GET"},updateAll:{url:d+"/items/update",method:"POST"},deleteById:{url:d+"/items/:id",method:"DELETE"},count:{url:d+"/items/count",method:"GET"},prototype$updateAttributes:{url:d+"/items/:id",method:"PUT"}});return b}]),e.factory("LoopBackAuth",function(){function a(){var a=this;e.forEach(function(b){a[b]=d(b)}),this.rememberMe=c,this.currentUserData=null}function b(a,b,c){var d="$LoopBack$"+b;null==c&&(c=""),a[d]=c}function d(a){var b="$LoopBack$"+a;return localStorage[b]||sessionStorage[b]||null}var e=["accessTokenId","currentUserId"];return a.prototype.save=function(){var a=this,c=this.rememberMe?localStorage:sessionStorage;e.forEach(function(d){b(c,d,a[d])})},a.prototype.setUser=function(a,b,c){this.accessTokenId=a,this.currentUserId=b,this.currentUserData=c},a.prototype.clearUser=function(){this.accessTokenId=null,this.currentUserId=null,this.currentUserData=null},new a}).config(["$httpProvider",function(a){a.interceptors.push("LoopBackAuthRequestInterceptor")}]).factory("LoopBackAuthRequestInterceptor",["$q","LoopBackAuth",function(a,b){return{request:function(d){if(b.accessTokenId)d.headers.authorization=b.accessTokenId;else if(d.__isGetCurrentUser__){var e={body:{error:{status:401}},status:401,config:d,headers:function(){return c}};return a.reject(e)}return d||a.when(d)}}}]).factory("LoopBackResource",["$resource",function(a){return function(b,c,d){var e=a(b,c,d);return e.prototype.$save=function(a,b){var c=e.upsert.call(this,{},this,a,b);return c.$promise||c},e}}])}(window,window.angular);