(function() {
	'use strict';

	angular.module('Live.theme')
		.service('room', room);

	function room($http, $filter, $q, SinaEmotion) {
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

		function decode(i) {
			var str = i.content,
				str = str.replace(/\[@:(.*?)\]/g, function(rs, $1) {
					i.to = $1;
					return '';
				});

			i.content = SinaEmotion.AnalyticEmotion(str);

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

		return {
			chat: [],
			decode: function() {
				var s = this;
				angular.forEach(this.data, function(value) {
					s.chat.push(decode(value));
				});
			},
			load: function() {
				var d = $q.defer(),
					s = this;
				$http.get("/api/live/room").then(function(res) {
					var data = res.data;
					s.user = data.user;
					s.data = res.data.chat;

					d.resolve();
				})
				return d.promise;
			}
		};
	}

})();