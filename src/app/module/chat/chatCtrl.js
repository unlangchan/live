(function() {
	'use strict';

	angular.module('Live.main.chat')
		.controller('ChatCtrl', Chat);

	function Chat($scope, $http, $filter) {
		$scope.chat = {
			list: []
		}
		var icons = [{
			"role": "0",
			"level": "0",
			"text": "会员",
			"icon": "v0.png"
		}, {
			"role": "0",
			"level": "1",
			"text": "白银会员",
			"icon": "v1.png"
		}, {
			"role": "0",
			"level": "2",
			"text": "黄金会员",
			"icon": "v2.png"
		}, {
			"role": "0",
			"level": "3",
			"text": "铂金会员",
			"icon": "v3.png"
		}, {
			"role": "0",
			"level": "4",
			"text": "钻石会员",
			"icon": "v4.png"
		}, {
			"role": "0",
			"level": "5",
			"text": "至尊会员",
			"icon": "v5.png"
		}, {
			"role": "1",
			"level": "0",
			"text": "房间管理",
			"icon": "admin.png"
		}, {
			"role": "-1",
			"level": "0",
			"text": "游客",
			"icon": "guest.png"
		}];
		var data = function() {
			var arr = [];
			var str = ["[@:chen]EIA库存报告会对油的影响有多大，老师", "李老师，婧怡好，4111的多银今天能出来吗", "[pt顶一个]老师油讲了没有，刚来，没有听到，在说说油吧", "谢谢大家"],
				yk = ["游客", "会员"];

			for (var i = 1; i < 100; i++) {
				var sj = Math.floor(Math.random() * icons.length);
				arr[i] = {
					"utime": Math.floor(new Date().getTime() / 1000) + i * 100,
					"uid": i,
					"id": i,
					"name": yk[Math.floor(Math.random() * yk.length)] + Math.floor(Math.random() * 1000),
					"content": str[Math.floor(Math.random() * str.length)],
					"role": icons[sj].role,
					"level": icons[sj].level,
				}
			}
			return arr;
		}();
		var ndata = [];
		angular.forEach(data, function(value) {
			ndata.push(decode(value));
		})
		$scope.chat.list = ndata;

		function decode(i) {
			var str = i.content,
				str = str.replace(/\[@:(.*?)\]/g, function(rs, $1) {
					i.to = $1;
					return '';
				});
			i.content = AnalyticEmotion(str);

			var icon = getIcon(i);
			i.icon = icon.src;
			i.as = icon.as;
			return {
				time: $filter('date')(i.utime * 1000, "[HH:mm]"),
				name: i.name,
				icon: i.icon,
				as: i.as,
				content: i.content
			};
		}

		function getIcon(v) {
			var selected = [];
			if (v.level) {
				selected = $filter('filter')(icons, {
					"role": v.role,
					"level": v.level,
				});
			}
			return {
				as: selected[0].text,
				src: selected[0].icon
			}
		};


		$scope.send = function() {
			alert("发送成功");
		}
	}
})();