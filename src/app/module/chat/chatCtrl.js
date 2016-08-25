(function() {
	'use strict';

	angular.module('Live.main.chat')
		.controller('ChatCtrl', Chat);

	function Chat($scope, $http, $filter, $timeout, $interval, room, chat, SinaEmotion) {
		$scope.content = '';
		$scope.chat = {
			list: room.chat,
			admin: room.user.role != 1 ? false : true
		};
		updateScrollbar();
		chat.setTime(room.data[0]['utime']);


		$interval(function() {
			chat.update().then(function(d) {
				if (d.length > 0) {
					angular.forEach(d, function(v) {
						$scope.chat.list.push(v);
					})
					$scope.config.scroll && updateScrollbar();
				}
			})
		}, 3000);
		$scope.config = {
			scroll: true,
			ct: false,
		}
		$scope.tool = {
			scroll: function() {
				$scope.config.scroll = !$scope.config.scroll;
			},
			clear: function() {
				$scope.chat.list = [];
			},
			ct: function(content) {
				chat.set(content);
				$scope.config.ct = false;
			}
		};
		$scope.admin = {
			remove: function(id, index) {
				chat.remove(id).then(function() {
					$scope.chat.list.splice(index, 1);
				})
			},
			activate: function(id, index) {
				chat.activate(id).then(function() {
					$scope.chat.list.splice(index, 1);
				})
			}
		}
		$scope.send = function() {
			var content = $scope.content;
			if (!content) {
				return;
			}
			chat.set(content);
			$scope.content = '';
		}

		function updateScrollbar() {
			$timeout(function() {
				$scope.updateScrollbar('scrollTo', 'bottom');
			}, 500);
		}

	}
})();