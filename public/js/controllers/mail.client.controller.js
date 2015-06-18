app.controller('MailCtrl', ['$rootScope', '$scope', '$location', '$cookies', 'EmailSvc', 'UserSvc',
 function($rootScope, $scope, $location, $cookies, EmailSvc, UserSvc){
  
  var cookie = $cookies.get('user');
  if (!cookie) {
    $location.path('/');
  } else {
    $rootScope.rootUser = JSON.parse(cookie);
  }

  if ($location.path() == '/mail') {
    $location.path('/mail/inbox');
  }

  $scope.highlight = function(path){
    return $location.path().indexOf(path) !== -1;
  };

  $scope.getUnread = function(){

    EmailSvc.unread($rootScope.rootUser.user_id)
      .success(function(data){
        $scope.unread = data.unread;
      })
      .error(function(data){
      });

  };


  if ($rootScope.rootUser){
    $scope.getUnread();
  }

  $rootScope.logout = function(){
    $cookies.remove('user');
    $rootScope.rootUser = null;
    $location.path('/');
  };

  $scope.dispose = function() {
    swal({  
      title: "Are you sure?",   
      text: "This account and all it's contents will be permanently deleted",   
      type: "warning",   
      showCancelButton: true,   
      confirmButtonColor: "#DD6B55",   
      confirmButtonText: "Yes, dispose it!",   
      closeOnConfirm: false 
    }, 
    function(){   
      UserSvc.dispose($rootScope.rootUser.user_id, $rootScope.rootUser.access_token)
        .success(function(data){
          swal("Deleted!", "Your account has been disposed.", "success");
          $location.path('/');
        })
        .error(function(){
          swal("Deleted!", "Your account has been disposed.", "success");
          $location.path('/');
        });
    });
  };


}]);