(function() {
	'use strict';

	angular.module('Live.main.head')
		.controller('headCtrl', head);

	function head($scope, $http, $uibModal) {
		$scope.live = {
			user: {
				name: "游客133131",
			},
			info: {
				online: 1000,

			}
		}
		$scope.signup = function() {
			$uibModal.open({
				animation: true,
				templateUrl: 'app/templates/signup.html',
				controller: function($scope, $http) {
					$scope.codeimg = '/api/code/signup';
					$scope.changecode = function() {
						$scope.codeimg = '/api/code/signup?t=' + new Date().getTime();
					}
					$scope.signup = function() {
						$scope.alerts = [];
						$http.post("/api/user/signup/", $scope.formdata).then(function(res) {
							if (res.data.code == 1) {
								$scope.alerts = [{
									type: 'success',
									msg: '注册成功!正在跳转,请稍候'
								}]
								setTimeout(function() {
									window.location.href = '';
								}, 500);

							} else if (res.data.code == 0) {
								var msg = [];
								angular.forEach(res.data.msg, function(v) {
									msg.push({
										'type': 'danger',
										'msg': v
									});
								})
								$scope.alerts = msg;
							} else {
								$scope.alerts = [{
									type: 'danger',
									msg: '未知错误!'
								}]
							}
						})
					}
					$scope.closeAlert = function(index) {
						$scope.alerts.splice(index, 1);
					};

				},
			})
		}
		$scope.login = function() {
			$uibModal.open({
				animation: true,
				templateUrl: 'app/templates/login.html',
				controller: function($scope, $http) {
					$scope.alerts = [];
					$scope.login = function() {
						$http.post("/api/user/signin/", $scope.formdata).then(function(res) {
							if (res.data.code == 1) {
								$scope.alerts = [{
									type: 'success',
									msg: '登陆成功!正在跳转,请稍候'
								}]
								setTimeout(function() {
									window.location.href = '';
								}, 500);

							} else if (res.data.code == 0) {
								var msg = [];
								angular.forEach(res.data.msg, function(v) {
									msg.push({
										'type': 'danger',
										'msg': v
									});
								})
								$scope.alerts = msg;
							} else {
								$scope.alerts = [{
									type: 'danger',
									msg: '未知错误!'
								}]
							}
						})
					}
					$scope.closeAlert = function(index) {
						$scope.alerts.splice(index, 1);
					};
				},
				size: "lm"
			})
		}
		$scope.logout = function() {
			$uibModal.open({
				animation: true,
				templateUrl: 'app/templates/logout.html',
				size: "sm"
			}).result.then(function() {
				$http.get("/api/user/signout").then(function(res) {
					window.location.href = '';
				})

			})
		}
	}
})();