
const AppPush = {
	initPush() {
		let that = this;
		uni.getProvider({
			service: 'push',
			success: function(res) {
				// 个推的名称为 igexin
				if (~res.provider.indexOf('unipush')) {
					uni.subscribePush({
						provider: 'unipush',
						success: function(res) {
							// console.log('success:' + JSON.stringify(res));
							// 81bdb3865ae137c85038784055c226ec
							that.setPush();
						}
					});
				}
			}
		});
	},
	setPush() {
		let that = this;
		plus.push.addEventListener(
			'click',
			function(msg) {	
				let payload = msg.payload;
				if (payload) {
					// if (that.Platform == 'ios') {
					// 	// plus.nativeUI.alert('ios')
					// 	// if (payload == 'localMsg') {
					// 	// setTimeout(() => {
					// 	// 	uni.navigateTo({
					// 	// 		url: '/pages/sisMsg/sisMsg'
					// 	// 	});
					// 	// }, 4000);
					// 	// }else{// }
					// } else {
					// 	setTimeout(() => {
					// 		uni.navigateTo({
					// 			url: '/pages/sisMsg/sisMsg'
					// 		});
					// 	}, 4000);
					// }	
					uni.showTabBarRedDot({
						index: 0
					});
				}
			},
			false
		);
	
		//监听receive事件
		plus.push.addEventListener(
			'receive ',
			function(msg) {
				// if () {
				// 	plus.push.createMessage(msg.title, msg.payload);
				// }
				// plus.nativeUI.alert('receive'+JSON.stringify(msg))
				// console.log(that.Platform)
				uni.showTabBarRedDot({
					index: 0
				});
				if (that.Platform == 'ios' && msg.payload != 'localMsg') {
					plus.push.createMessage('本地消息', 'localMsg');
				}
			},
			false
		);
	}
}
export default AppPush
