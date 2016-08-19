(function() {
  'use strict';

  angular.module('Live.main.head')
    .controller('headCtrl', head);

  function head($scope) {
    $scope.data = 111;
  }
})();