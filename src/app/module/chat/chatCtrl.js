(function() {
	'use strict';

	angular.module('Live.main.chat')
		.controller('ChatCtrl', Chat);

	function Chat($scope, $http) {
		$scope.send = function() {
			alert("发送成功");
		}
	}
})();