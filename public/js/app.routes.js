app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');
 
  $stateProvider
    .state('home', {
        url: '/',
        templateUrl: './views/home.client.view.html',
        controller: 'HomeCtrl'
    })
    .state('mail', {
        url: '/mail',
        templateUrl: './views/mail.client.view.html',
        controller: 'MailCtrl'
    })
    .state('mail.compose', {
        url: '/compose',
        templateUrl: './views/compose.client.view.html',
        controller: 'ComposeCtrl'
    })
    .state('mail.inbox', {
        url:'/inbox',
        templateUrl: './views/inbox.client.view.html'
    })
    .state('mail.sent', {
        url: '/sent',
        templateUrl: './views/sent.client.view.html',
        controller: 'SentCtrl'
    });

}]);