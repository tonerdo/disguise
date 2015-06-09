app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');
 
  $stateProvider
    .state('home', {
        url:'/',
        templateUrl: './views/home.client.view.html',
        controller: 'HomeCtrl'
    })
    .state('inbox', {
        url:'/mail/inbox',
        templateUrl: './views/inbox.client.view.html'
    });

}]);