angular
  .module('example')
  .controller('LearnMoreController', function($scope, supersonic, $firebase) {

  	/* bbb */
    $scope.navbarTitle = "잘 배워봐";

    $scope.testTitle = "hahaha";

    $scope.storiesArray = [];
    $scope.storiesObject = {};
  	$scope.storiesCnt = 0;

  	$scope.hostUrl = "http://www.doresol.net:8000";

		steroids.logger.log("여기여기~~1!");
		steroids.logger.log($scope.hostUrl);
		steroids.logger.log($scope.testTitle);

    var currentStoriesRef = new Firebase('https://doresol-dev.firebaseio.com/memorials/-J_yaUS2gsgyLbDtgzQA/stories');
    var _stories = $firebase(currentStoriesRef).$asArray();

		_stories.$loaded().then(function(value) {

			  angular.forEach(value, function(story) {
		      assignStory(story);
		      $scope.storiesCnt++;
		    });

				steroids.logger.log($scope.storiesArray);
				steroids.logger.log($scope.storiesObject);

		    _stories.$watch(function(event){
		      switch(event.event){
		        case "child_removed":
		          var storyId = event.key;

		          // delete from timeline and setting
		          var index = $scope.storiesArray.indexOf(event.key);
		          if( index >= 0) {
		            $scope.storiesArray.splice(index, 1);
		            delete $scope.storiesObject[storyId];
		          }
		          $scope.storiesCnt--;
		          break;

		        case "child_added":
		          var newStoryRef = new Firebase(ENV.FIREBASE_URI + '/memorials/' + ENV.MEMORIAL_KEY + '/stories/' + event.key);
		          var newStory = $firebase(newStoryRef).$asObject();

		          newStory.$loaded().then(function(value) {
		            // User.setUsersObject(value.ref_user);
		            assignStory(value);
		            $scope.storiesCnt++;
		          });

		        break;
		      }
		    });
		  });

		  var assignStory = function(value) {
		    value.updatedAt = moment(value.updated_at).format("YYYY-MM-DD");
		    $scope.storiesArray.push(value.$id);
		    $scope.storiesObject[value.$id] = value;
		    
		    // User.setUsersObject(value.ref_user);
				// console.log(value);

		    $scope.storiesArray.sort(function(aKey,bKey){
		      var aValue = $scope.storiesObject[aKey];
		      var bValue = $scope.storiesObject[bKey];
		      var aStartDate = moment(aValue.startDate).unix();
		      var bStartDate = moment(bValue.startDate).unix();
		      return aStartDate > bStartDate ? 1 : -1;
		    });
		  }

 });
