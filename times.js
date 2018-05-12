angular.module('app', [])
.config(function($locationProvider) {
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
});

angular.module('app').controller('mainController', function($scope, $timeout, $location) {
  $scope.mode = $location.search().mode || 'times';
  $scope.operator = getOperator();

  var maxValue = Number($location.search().max || 10);

  $scope.catchNonDigit = function(e) {
    if (e.keyCode < 48 || e.keyCode > 57) {
      e.preventDefault();
      return false;
    }
  }

  $scope.catchEnter = function(e) {
    if (e.keyCode == 13 && $scope.answerStatus !== true && $scope.answer !== null && $scope.answer !== '') {
      var userAnswer = calculateUserAnswer();
      var correctAnswer = Number($scope.answer);
      if (userAnswer === correctAnswer) {
        $scope.answerStatus = true;
        $timeout(function() {
          reset();
        }, 1000);
      }
      else {
        $scope.answerStatus = false;
        $timeout(function() {
          $scope.answer = null;
          $scope.answerStatus = undefined;
        }, 1000);
      }
    }
  }

  function getOperator() {
    switch ($scope.mode) {
      case 'add':
      case 'addition':
      case 'plus':
        return '+';
      case 'subtract':
      case 'subtraction':
      case 'minus':
        return '-';
      case 'divide':
      case 'division':
        return '÷';
      case 'times':
      case 'multiply':
      case 'multiplication':
      default:
        return 'x';
    }
  }

  function calculateUserAnswer() {
    switch ($scope.mode) {
      case 'add':
      case 'addition':
      case 'plus':
        return Number($scope.a) + Number($scope.b);
      case 'subtract':
      case 'subtraction':
      case 'minus':
        return $scope.a - $scope.b;
      case 'divide':
      case 'division':
        return $scope.a / $scope.b;
      case 'times':
      case 'multiply':
      case 'multiplication':
      default:
        return $scope.a * $scope.b;
    }
  }

  function reset() {
    $scope.answer = null;
    $scope.answerStatus = undefined;

    var max = Number(maxValue) + 1;
    console.log(max);
    $scope.a = Math.floor(Math.random() * max);
    $scope.b = Math.floor(Math.random() * max);

    switch ($scope.mode) {
      case 'subtract':
      case 'subtraction':
      case 'minus':
        // no negatives
        if ($scope.a < $scope.b) {
          var tmp = $scope.a;
          $scope.a = $scope.b;
          $scope.b = tmp;
        }
        break;
      case 'divide':
      case 'division':
        // no divide by zero
        $scope.a = Math.floor(Math.random() * maxValue) + 1;
        $scope.b = Math.floor(Math.random() * maxValue) + 1;
        // no quotients less than 1
        if ($scope.a < $scope.b) {
          var tmp = $scope.a;
          $scope.a = $scope.b;
          $scope.b = tmp;
        }
        // no remainders
        var ans = Math.floor($scope.a / $scope.b);
        $scope.a = ans * $scope.b;
        break;
      default:
        break;
    }
  }

  reset();
});
