app.controller('MainController', function($scope, posts, Auth){
  $scope.headtitle = "Angular With Rails";
  $scope.message = true;
  $scope.posts = posts.posts;
  
  $scope.addPost = function(){
    $scope.message = Auth.isAuthenticated();
  	if( !$scope.title || $scope.title === '' ) { return  ; }
  	posts.create({ 
  		title: $scope.title, 
  		link: $scope.link, 
  	});
  	$scope.title = '';
  	$scope.link = '';
  }
  $scope.incrementUpvotes = function(post) {
  	posts.upvote(post);
  };
});