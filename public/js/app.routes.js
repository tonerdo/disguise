app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', 
    function ($stateProvider, $urlRouterProvider, $locationProvider) {

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
        templateUrl: './views/inbox.client.view.html',
        controller: 'InboxCtrl'
    })
    .state('mail.inbox.messages', {
        url:'/:messageId',
        templateUrl: './views/received.client.view.html',
        controller: 'ReceivedCtrl'
    })
    .state('mail.sent', {
        url: '/sent',
        templateUrl: './views/sent.client.view.html',
        controller: 'SentCtrl'
    })
    .state('mail.sent.messages', {
        url: '/:messageId',
        templateUrl: './views/outbox.client.view.html',
        controller: 'OutboxCtrl'
    });

    $locationProvider.html5Mode(true);

}]);