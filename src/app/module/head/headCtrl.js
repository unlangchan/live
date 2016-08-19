(function() {
	'use strict';

	angular.module('Live.main.head')
		.controller('headCtrl', head);

	function head($scope, $http) {
		$scope.live = {
			user: {
				name: "游客133131",
			},
			info: {
				online: 1000,

			}
		}
		$scope.login = function() {
			alert("登陆成功");
		}

		$scope.singup = function() {
			alert("注册成功");
		}
	}
})();