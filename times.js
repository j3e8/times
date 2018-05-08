angular.module('app', []);

angular.module('app').controller('mainController', function($scope, $timeout) {

  $scope.catchNonDigit = function(e) {
    if (e.keyCode < 48 || e.keyCode > 57) {
      e.preventDefault();
      return false;
    }
  }

  $scope.catchEnter = function(e) {
    if (e.keyCode == 13 && $scope.answerStatus !== true) {
      var userAnswer = $scope.a * $scope.b;
      var correctAnswer = Number($scope.product);
      console.log(userAnswer, correctAnswer);
      if (userAnswer == correctAnswer) {
        $scope.answerStatus = true;
        $timeout(function() {
          reset();
        }, 1000);
      }
      else {
        $scope.answerStatus = false;
      }
    }
  }

  function reset() {
    $scope.a = Math.floor(Math.random() * 10.99999999);
    $scope.b = Math.floor(Math.random() * 10.99999999);
    $scope.product = null;
    $scope.answerStatus = undefined;
  }

  reset();
});
