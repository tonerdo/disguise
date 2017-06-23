app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', 'cfpLoadingBarProvider', 'toastrConfig',
  function ($stateProvider, $urlRouterProvider, $locationProvider, cfpLoadingBarProvider, toastrConfig) {

    cfpLoadingBarProvider.includeSpinner = false;
    $urlRouterProvider.otherwise('/');
    angular.extend(toastrConfig, {
      timeOut: 2000
    });

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
      .state('mail.inbox', {
        url: '/inbox',
        templateUrl: './views/inbox.client.view.html',
        controller: 'InboxCtrl'
      })
      .state('mail.inbox.messages', {
        url: '/:messageId',
        templateUrl: './views/message.client.view.html',
        controller: 'MessageCtrl'
      });

    $locationProvider.html5Mode(true);

  }]);