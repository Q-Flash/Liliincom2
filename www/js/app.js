// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'App' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('App', ['ionic','ngMessages','ngAnimate',/*'uiCalendarConfig','ui.rCalendar',*/'App.controllers', 'App.services', 'ngCordova', 'ngCordovaOauth', 'ngStorage', 'firebase'])

.run(function($ionicPlatform, $animate) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    $animate.enabled(false);
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider,$ionicConfigProvider, $urlRouterProvider) {

  $ionicConfigProvider.tabs.position('bottom'); //bottom

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  .state('tab.map', {
      url: '/map',
      views: {
        'tab-chats': {
          templateUrl: 'templates/map.html',
          controller: 'MapCtrl'
        }
      }
    })
  // Each tab has its own nav history stack:

  .state('tab.roster', {
    url: '/roster',
    views: {
      'tab-roster': {
        templateUrl: 'templates/tab-roster.html',
        controller: 'RosterCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-news.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/news_detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  })

  .state('admin-events', {
    url: '/admin-events',
    templateUrl: 'templates/admin-events.html',
    controller:'eventController'
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller:'loginController'
  })

  .state('editRoster', {
    url: '/editRoster',
    templateUrl: 'templates/editRoster.html',
    controller:'editRosterCtrl'
  })

  .state('manager', {
    url: '/manager',
    templateUrl: 'templates/manager.html',
    controller: 'managerController'
  })
  .state('adminlogin', {
      url: '/adminlogin',
      templateUrl: 'templates/admin-login.html',
      controller:'adminloginController'
    })
  .state('forgot', {
    url: '/forgot',
    templateUrl: 'templates/forgot.html',
    controller:'forgotController'
  })
  .state('register', {
    url: '/register',
    templateUrl: 'templates/register.html',
    controller:'registerController'
  })
  .state('home', {
    url: '/home',
    templateUrl: 'templates/calender.html',
    controller:'homeController'
  })

  .state('calender', {
    url: '/calender',
    templateUrl: 'templates/calender.html',
    controller:'calenderController'
  })


  .state('scheduler', {
    url: '/scheduler',
      templateUrl: 'templates/scheduler.html',
      controller:'scheduleController'
  })
  .state('health', {
    url: '/health',
      templateUrl: 'templates/health.html',
      controller:'healthController'
  })
  .state('budget', {
    url: '/budget',
      templateUrl: 'templates/budget.html',
      controller:'budgetController'
  })

  .state('report', {
    url: '/report',
      templateUrl: 'templates/report.html',
      controller:'reportController'
  });







  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

})
.constant('FURL','https://lilincom-sports.firebaseio.com');
