'Use Strict';
angular.module('App').controller('managerController', function ($scope, $state,$cordovaOauth, $localStorage, $location,$http,$ionicPopup, $firebaseObject, Auth, FURL, Utils) {
  var ref = new Firebase(FURL);


  $scope.clicked = function (path) {
      $location.path(path);
  }


}
);
