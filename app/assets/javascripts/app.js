var app = angular.module('myapp', ['ui.router', 'templates']);

app.config(['$stateProvider','$urlRouterProvider',function($stateProvider, $urlRouterProvider) {
  
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



