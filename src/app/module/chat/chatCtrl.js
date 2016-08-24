(function() {
	'use strict';

	angular.module('Live.main.chat')
		.controller('ChatCtrl', Chat);

	function Chat($scope, $http, $filter, $timeout, room) {
		$scope.chat = {
			list: room.chat
		};

		$timeout(function() {
			$scope.updateScrollbar('scrollTo', 'bottom');
		},500);

		$scope.send = function() {
			alert('发送成功');
		}
	}
})();