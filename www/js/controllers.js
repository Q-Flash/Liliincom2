angular.module('App.controllers', ['ionic','ionic.rating', 'ngCordova'])

.controller('RosterCtrl', function($scope, $location, Players) {

  $scope.player_details = Players.all();

})
.controller('AdminRosterCtrl', function(Players,$scope) {

  $scope.player_details = Players.all();
})

.controller('AdminRosterCtrl', function(Team,Players,$scope) {
  //$scope.team = Team.all();
  $scope.player_details = Players.all();
  $scope.remove_player= function(selected_player){
    Players.delete_record(selected_player);
    console.log("Maed it to remove_player function");
  }
})

.controller('MapCtrl', function($scope, $state, $cordovaGeolocation, $ionicLoading, $ionicPopup) {
  var options = {timeout: 10000, enableHighAccuracy: true, maximumAge: 0};

  $cordovaGeolocation.getCurrentPosition(options).then(function(position){
    var EventmyLatlng = new google.maps.LatLng('13.1704468','-59.6357891'); //Sandy Lane Golf Course
    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    var mapOptions = {
      center: latLng,
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
    //Wait until the map is loaded
    google.maps.event.addListenerOnce($scope.map, 'idle', function(){

       var directionsService = new google.maps.DirectionsService();
        var directionsDisplay = new google.maps.DirectionsRenderer({map:$scope.map});

         var request = {
            origin : latLng,
            destination : EventmyLatlng,
            travelMode : google.maps.TravelMode.WALKING
        };
        directionsService.route(request, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
            }
        });

           directionsDisplay.setMap($scope.map);
    });
  },
  function(error){
    $ionicPopup.alert({
      title: 'Location Error',
      template: "error"
    })
  });

  $scope.centerOnMe = function() {
          if(!$scope.map) {
              return;
          }
          $ionicLoading.show({
            content: 'Getting current location...',
            showBackdrop: false
          });
          navigator.geolocation.getCurrentPosition(function(pos) {
            $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
            $ionicLoading.hide();
          }, function(error) {
            alert('Unable to get location: ' + error.message);
          });
      };
})
.controller('ChatsCtrl', function($scope, Chats,$location,News) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  $scope.news = News.all();
  $scope.remove = function(item){
    News.remove(item);
  };
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('managerController', function($scope) {

})


.controller('NewsDetailCtrl', function($scope, $stateParams, $location,$cordovaCamera, Chats,News, $state, $localStorage,$http,$ionicPopup, $firebaseArray, $firebaseObject, FURL) {
  // set the rate and max variables
  $scope.ratingsObject = {
        iconOn: 'ion-ios-star',    //Optional
        iconOff: 'ion-ios-star-outline',   //Optional
        iconOnColor: 'rgb(200, 200, 100)',  //Optional
        iconOffColor:  'rgb(200, 100, 100)',    //Optional
        rating:  2, //Optional
        minRating:1,    //Optional
        readOnly: true, //Optional
        callback: function(rating) {    //Mandatory
          $scope.ratingsCallback(rating);
        }
      };

      $scope.ratingsCallback = function(rating) {
        console.log('Selected rating is : ', rating);
      };

  var ref = new Firebase(FURL);
  var events = ref.child("Events");
  var events_array = $firebaseArray(events);

  events_array.$loaded(function(eventInfo){
    angular.forEach(eventInfo, function (value, key){
      //var eventLocation = '<div id = "content"'>+value.event_location + '</div>';
      //var displayEventLoc = value.event_location;
      console.log(key);
      console.log(value);
      $scope.displayEventInfo = value;
      console.log($scope.displayEventInfo);
      console.log($scope.displayEventInfo.event_name);
      //var displayEventLocations = '<div id="content">' +displayEventInfo.event_name+ '</div';
      //var displayEvent{
      //  event_name: value.event_name,
      //  event_date: value.event_date,
      //  event_time: value.event_time,
      //  event_location: value.event_location,
      //  event_description: value.event_description
      //}
    })
  })
  $scope.array = [];

  $scope.addListItem = function(quote){
    $scope.array.unshift(quote);
    //clear quote
    this.customQuote = null;

 }




   $scope.takeImage = function() {
       var options2 = {
           quality: 80,
           destinationType: 0,//Camera.DestinationType.DATA_URL,
           sourceType: 1,//Camera.PictureSourceType.CAMERA,
           allowEdit: true,
           encodingType: 0,//Camera.EncodingType.JPEG,
           targetWidth: 250,
           targetHeight: 250,
           //popoverOptions: CameraPopoverOptions,
           saveToPhotoAlbum: false
       };

       $cordovaCamera.getPicture(options2).then(function(imageData) {
           $scope.srcImage = "data:image/jpeg;base64," + imageData;
       }, function(err) {
           // error
       });
   }
  $scope.gotourl = function(path){
   $location.path(path);
}

  $scope.chat = Chats.get($stateParams.chatId);
  $scope.item = News.get($stateParams.itemId);
  //$scope.player = Team.get($stateParams.playerId);

  /*
  var ref = new Firebase(FURL);
  var comments_array = $firebaseArray(ref);

  var comments = ref.child("Comments");

  ref.push().set({
    "comment": newCommentForm.$viewValue
  });
  */
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
