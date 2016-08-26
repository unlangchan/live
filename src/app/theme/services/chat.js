(function() {
	'use strict';

	angular.module('Live.theme')
		.service('chat', chat);

	function chat($http, $filter, $q, SinaEmotion, toastr) {
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
				id: i.id,
				time: $filter('date')(i.utime * 1000, "[HH:mm]"),
				name: i.name,
				icon: i.icon,
				status: i.status,
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
			utime: 0,
			setTime: function(t) {
				this.utime = t;
			},
			update: function() {
				var s = this,
					d = $q.defer();
				$http.get("/api/chat/get?t=" + s.utime).then(function(res) {
					var data = res.data,
						result = [];
					if (data.length > 0) {
						s.utime = data[0]['utime'];
						angular.forEach(data, function(value) {
							result.push(decode(value));
						});
						result.reverse();
					}

					d.resolve(result);
				})
				return d.promise;
			},
			set: function(content) {
				var d = $q.defer();
				$http.post("/api/chat/set", {
					content: content
				}).then(function(res) {
					if (res.code == 1) {
						toastr.success(res.data.msg);
					} else {
						toastr.warning(res.data.msg, '提示');
					}

					d.resolve(res.data);
				})
				return d.promise;

			},
			remove: function(id) {
				var d = $q.defer();
				$http.post("/api/chat/remove", {
					id: id
				}).then(function(res) {
					toastr.error(res.data.msg);
					d.resolve(res.data);
				})
				return d.promise;
			},
			activate: function(id) {
				var d = $q.defer();
				$http.post("/api/chat/activate", {
					id: id
				}).then(function(res) {
					toastr.success(res.data.msg);
					d.resolve(res.data);
				})
				return d.promise;
			}
		};
	}

})();