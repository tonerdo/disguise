app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');
 
  $stateProvider
    .state('home', {
        url:'/',
        templateUrl: './views/home.client.view.html',
        controller: 'HomeCtrl'
    })
    .state('mail', {
        url:'/mail',
        templateUrl: './views/mail.client.view.html'
    })
    .state('inbox', {
        url:'/mail/inbox',
        templateUrl: './views/inbox.client.view.html'
    });

}]);