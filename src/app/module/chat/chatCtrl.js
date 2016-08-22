(function() {
	'use strict';

	angular.module('Live.main.chat')
		.controller('ChatCtrl', Chat);

	function Chat($scope, $http) {
		$scope.chat = {
			list: []
		}
		var list = [{
			"time": "-13:00-",
			"icon": "/assets/images/icons/level/v6.png",
			"name": "荒漠",
			"to": "",
			"content": "148.8的空钯金，怎么看"
		}, {
			"time": "-13:00-",
			"icon": "/assets/images/icons/level/v0.png",
			"name": "荒漠",
			"to": "chen",
			"content": "148.8的空钯金，怎么看"
		}];
		$scope.chat.list = list;
		var data = {
			"utime": "1471349727",
			"content": "[@:chen]148.8的空钯金，怎么看"
		}
		data_decode(data);

		function data_decode(i) {
				arr = str.replace(/\[@:(.*?)\]/g,function(rs,$1){
				}) 
		}
		$scope.send = function() {
			alert("发送成功");
		}
	}
})();