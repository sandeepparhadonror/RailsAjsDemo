var app = angular.module('myapp', ['ui.router', 'templates', 'Devise']);

  
app.config(['$stateProvider','$urlRouterProvider',function($stateProvider, $urlRouterProvider) {
  
  $stateProvider
  .state('login', {
      url: '/login',
      templateUrl: 'auth/_login.html',
      controller: 'AuthCtrl',
      onEnter: ['$state', 'Auth', function($state, Auth){
        Auth.currentUser().then(function(){
        $state.go('home');
        });
      }]
    })
    .state('register', {
      url: '/register',
      templateUrl: 'auth/_register.html',
      controller: 'AuthCtrl',
      onEnter: ['$state', 'Auth', function($state, Auth){
        Auth.currentUser().then(function(){
          $state.go('home');
        });
      }]
    });

$stateProvider
  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'home/_home.html',
      resolve: {
        postPromise: ['posts', function(posts){
          return posts.getAll();
        }]
      },
      controller: 'MainController'
    });

  $stateProvider
    .state('posts', {
      url: '/posts/{id}',
      templateUrl: 'posts/_posts.html',
      resolve: {
        post: ['$stateParams', 'posts', function($stateParams, posts){
          return posts.get($stateParams.id)
        }]
      },
      controller: 'PostsController'
    });

  $urlRouterProvider.otherwise('home');
}]);



