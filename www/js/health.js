'Use Strict';
angular.module('App').controller('healthController', function (Players, Injuries, $scope, $state,$cordovaOauth, $localStorage, $location,$http,$ionicPopup, $firebaseObject, Auth, FURL, Utils) {
  var ref = new Firebase(FURL);

  $scope.injury_details = Injuries.all();


});
