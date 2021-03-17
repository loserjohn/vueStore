<script>
	import Utils from '@/utils/utils.js';
	import http from '@/utils/http/index.js';
	const jweixin = require('jweixin-module');
	// import pageAnimation from './components/page-animation'
	// import mixin from '@/common/mixin'
	import SET from '@/SET.js'
	export default {
		// mixins: [pageAnimation], 
		data() {
			return {
				ifWx: false
			};
		},
		onLaunch: function() {
			// console.log('App Launch');
			let that = this;
			const token = uni.getStorageSync(SET.tokenName);
			this.ifWx = uni.getStorageSync('ifWx')
			
			let url = window.location.href;
			let i = url.match(/action=(.*)action/);
			let p = url.match(/payload=(.*)payload/);
			
			let s = url.match(/code=(.*)&state/); //微信code
			
			// 记录动作
			if (i && i[1] && p && p[1]) {
				// 储存推广码 分享注册
				let action = i[1];
				let payload = p[1]
				// 记录动作
				// console.log('app',action,payload)
				// this.$store.commit('setCurrentAction', {
				// 	action,
				// 	payload
				// })
				uni.setStorageSync('inviAction', {
					action,
					payload
				})
			}
			
			
			// #ifdef MP
				uni.$on('wxPayMini', (data) => {
					that.wxPayMini(data)
				})
				if (token) {
					this.ifEffect();
				}
			// #endif
			
			// #ifdef H5
				if (this.ifWx) {			
					uni.$on('wxPay', (data) => {
						that.wxPay(data)
					})
					this._iniWxJdk();			
					this.ifAuth();
					// return
				} else {
					if (token) {
						this.ifEffect();
					}
				}
			// #endif
			
			
			
			this.getGloConfig()
		},
		onShow: function() {
			console.log('App Show');
		},
		onHide: function() {
			console.log('App Hide');
		},
		methods: {
			// 获取全局的配置
			async getGloConfig(){
				let that = this;
				try {
					// this.$ui.showloading()
					let res = await this.$api.crm_getSetConfig()
					// this.$ui.hideloading()						
					if(res.result==1){
						uni.setStorageSync(SET.globalSetName,res.data)
					}
					
				} catch (err) {
					console.log('请求结果false : ' + err);
					that.pageLoading = false
				}	
			},
			// oid登录
			async _oIdLogin(OID) {
				let that = this;

				if (!OID) return;
				let data = {
					openId: OID
				};
				//
				try {
					let res = await this.$api.WxTokenLogin(data, false);
					if (res.result == 1) {
						that.$ui.toast('登陆成功');
						console.log('登陆成功')
						uni.setStorageSync(SET.tokenName, res.data);
						that.$store.commit('login')
						that.$store.dispatch('refreshUser')
						uni.removeStorageSync('hrefAction');
						uni.removeStorageSync('hrefItem');
					} else {
						// 用户不存在,则引导注册
						// alert(1)
						uni.navigateTo({
							url: '/pages/role/bund/bund'
						});
					}
					// console.log('_oIdLoginsuccess : ' + JSON.stringify(res))
				} catch (err) {
					console.log('请求结果false _oIdLogin: ' + err);
				}
			},
			// 是否受过权
			ifAuth() {
				const token = uni.getStorageSync(SET.tokenName);
				const jllOpenid = uni.getStorageSync(SET.opIdName);
				let url = window.location.href;
				let s = url.match(/code=(.*)&state/);
				if (s && s[1] && !jllOpenid) {
					// 是授权后的页面,则做opnegid判断 使用code获取pid
					// 换取oid

					this._getAuth(s[1]);
				} else if (token) {
					//直接判断token是过期
					this.ifEffect()
				}
			},
			// token是否过期判断
			async ifEffect() {
				let that = this;
				try {
					that.$store.commit('login')
					that.$store.dispatch('refreshUser')
				} catch (err) {
					// console.log('请求结果false : ' + err);
					// that.$store.commit('userLoginOut')
				}
			},
			// code换取opendID
			async _getAuth(code) {
				let that = this;
				try {
					let data = {
						"wx_code": code,
						"wx_code_type": 0, //0-公众号 1-小程序
					}
					this.$ui.showloading()
					let res = await this.$api.GetOpenId(data, false);
					this.$ui.hideloading()
					if (res.result === 1) {
						// #ifdef H5
						uni.setStorageSync(SET.opIdName, res.data.openid)
						uni.setStorageSync(SET.wxInfoName, res.data);
						// this.ifEffect()
						that._oIdLogin(res.data.openid)
						// #endif
						// #ifdef MP
						uni.setStorageSync(SET.opIdName, res.data)
						// #endif
					} else {
						// alert(1)
						// uni.navigateTo({
						// 	url: '/pages/role/bund/bund'
						// });
					}
				} catch (err) {
					uni.hideLoading()
				}
			},
			async _iniWxJdk() {
				let that = this;
				try {
					// #ifdef H5
					let url = window.location.href;
					// let url = 'http://192.168.1.5:8080'
					// #endif
					let res = await this.$api.GetWxJsApiConfig({
						url: url
					}, true);

					if (res.result == 1) {
						let set = res.data;
						jweixin.config({
							debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
							appId: set.appId, // 必填，公众号的唯一标识
							timestamp: set.timestamp, // 必填，生成签名的时间戳
							nonceStr: set.noncestr, // 必填，生成签名的随机串
							signature: set.signature, // 必填，签名
							jsApiList: [
								'onMenuShareAppMessage',
								'onMenuShareTimeline',
								'onMenuShareQQ',
								'onMenuShareQZone',
								'onMenuShareWeibo',
								'chooseWXPay',
								'chooseImage',
								'uploadImage'
							] // 必填，需要使用的JS接口列表
						});
						jweixin.ready(function() {
							// 我自己的pid
							// let parentId = that.accountInfo.invitation_code
							let options = {
								title: 'GLLO睿众官方商城', // 分享标题
								link: http.mainUrl + 'index.html', // 分享链接，记得使用绝对路径，不能用document.URL
								imgUrl: 'http://h5.gllo.com.cn/upload/head/jjl.png', // 分享图标
								desc: 'GLLO睿众官方商城', // 分享描述
								success: function() {
									console.info('分享成功！');
								},
								cancel: function() {
									console.info('取消分享！');
									// 用户取消分享后执行的回调函数
								}
							};
							// jweixin.updateTimelineShareData(options); // 分享到朋友圈
							// jweixin.updateAppMessageShareData(options); // 分享给朋友
							jweixin.onMenuShareAppMessage(options); // 分享到朋友圈
							jweixin.onMenuShareTimeline(options); // 分享给朋友
							jweixin.onMenuShareQQ(options); // 分享到朋友圈
							jweixin.onMenuShareQZone(options); // 分享给朋友
							jweixin.onMenuShareWeibo(options); // 分享到朋友圈
						});
						jweixin.error(function(res) {
							// config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
							console.log(JSON.stringify(res));
						});
					} else {}
				} catch (err) {
					console.log('请求结果false : ' + err);
				}
			},

			// 微信js支付（公众号专用）
			async wxPay(data) {
				// debugger
				let that = this

				let s = `{${data.js_prepay_info}}`
				// let s = `{${data.payparams}}`
				// console.log(s)
				let set = s.replace(/\'/g, '"');
				
				set = JSON.parse(set)
				// console.log(set)
				// debugger
				jweixin.chooseWXPay({
					timestamp: set.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
					nonceStr: set.nonceStr, // 支付签名随机串，不长于 32 位
					package: set.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
					signType: set.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
					paySign: set.paySign, // 支付签名
					success: function(res) {
						// 支付成功后的回调函数
						uni.redirectTo({
							url: '/pages/success/success'
						})
					},
					false: function() {

					},
				});
			},
			// 微信小程序支付
			wxPayMini(){
				let that = this
				
				let s = `{${data.js_prepay_info}}`
				// let s = `{${data.payparams}}`
				// console.log(s)
				let set = s.replace(/\'/g, '"');
				
				set = JSON.parse(set)
				// console.log(set)
				// debugger
				Utils.WxPay(set)
				
				// jweixin.chooseWXPay({
				// 	timestamp: set.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
				// 	nonceStr: set.nonceStr, // 支付签名随机串，不长于 32 位
				// 	package: set.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
				// 	signType: set.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
				// 	paySign: set.paySign, // 支付签名
				// 	success: function(res) {
				// 		// 支付成功后的回调函数
				// 		uni.redirectTo({
				// 			url: '/pages/success/success'
				// 		})
				// 	},
				// 	false: function() {
				
				// 	},
				// });
			}
		}
	};
</script>

<style lang="scss">
	@import '/static/font/iconfont.css';
	@import '/common/animate.css';

	/*每个页面公共css */
	@import '/common/common.css';
	
	view,text{
		box-sizing: border-box;
		word-break: break-all;
	}
	uni-button {
		border: none;

		&:after {
			border: none;
		}
	}
	// .tui-btn-primary{
	// 	background-color: var(--cl_primary)!important;
	// }
	// .tui-primary-hover{
	// 	background-color: var(--cl_hover)!important;
	// } 
	.cm_lines{
		width: 100%;
		height: 2rpx;
		background-color: #E0E0E0;
		transform: scaleY(.5);
		// margin: 16rpx 0;
	}
	// 普通条目  订单部分
	.proItemsBox {
		width: 100%;
		// height: 384rpx;
		background: #fff;
		margin-bottom: 16rpx;
		padding: 24rpx 20rpx;

		.proItemTop {
			padding: 0 0 16rpx 0;
			margin-bottom: 16rpx;

			.shopLogo {
				width: 60rpx;
				height: 60rpx;
				border-radius: 50%;
				margin-right: 20rpx;
			}

			.status {
				color: #dd3a30;
			}
		}

		.picBox {
			width: 100%;
			margin-bottom: 16rpx;
			line-height: 90rpx;
			align-items: flex-start;
			
			.avatar {
				width: 150rpx;
				height: 150rpx;
				border-radius: 10rpx;
				margin-right: 20rpx;
				overflow: hidden;
				background-color: #f1f1f1;
				border: 1rpx solid #f1f1f1;
				img {
					width: 150rpx;
					height: 150rpx;
				}
			}

			.stags {
				font-size: 20rpx;
			}

			.name {
				font-size: 28rpx;
				max-height: 80rpx;
				line-height: 1.4;
				margin-top: 6rpx;
			}
		
			.jd {
				width: 152rpx;
				line-height: 58rpx;
				height: 58rpx;
				border: none;
				background: var(--cl_primary);
				color: #333;
				text-align: center;
				padding: 0;
				font-size: 26rpx;
				border-radius: 8rpx;
			}
			
			&:last-child{
				margin-bottom: 0!important;
			}
		}

		.contentBox {
			justify-content: flex-end !important;
			margin-top: 20rpx;
			// padding-top: 24rpx;
			// border-top: 1rpx solid #e5e5e5;

			.cm_tags {
				margin-left: 16rpx;
				// font-size: 20rpx;
			}
		}

		.picBox:last-child {
			margin-bottom: 0!important;
		}
	}

	// 块状条目
	.proItemsBoxBlock {
		width: calc((100vw - 56rpx) / 2);
		height: 560rpx;
		background: #fff;
		border-radius: 14rpx;
		margin-top: 16rpx;
		overflow: hidden;

		.picBox {
			width: 100%;
			height: 356rpx;
			position: relative;

			.pre {
				width: 100%;
				height: 347rpx;
				// opacity: 0;
			}

			.timeBox {
				position: absolute;
				left: 0;
				bottom: -4rpx;
				width: 100%;
				height: 52rpx;
				line-height: 52rpx;
				background: $uni-color-error;
				color: #fff;
				text-align: center;
			}
		}

		.msgBox {
			padding: 16rpx;

			.tags {
				background: red;
				color: #fff;
				padding: 0 8rpx;
				border-radius: 4rpx;
				font-size: 20rpx;
				line-height: 30rpx;
				height: 30rpx;
				margin-right: 10rpx;
				margin-top: -8rpx;
			}

			.cm_text {
				line-height: 64rpx;
				justify-content: flex-start;
			}

			.has {
				margin-top: 14rpx;
				padding: 0 16rpx;
				line-height: 36rpx;
				height: 36rpx;
				border-radius: 18rpx;
				font-size: 24rpx;
				background: #f7f7f7;
			}
		}
	}

	// 灰色底 条目
	.proItemsBoxgray {
		width: 100%;
		background: #fff;
		margin-bottom: 0;
		border-bottom: 1rpx solid #eee;
		padding:0 20rpx 20rpx 20rpx;
		.itemBoxTop{
			.shopIcon{
				width: 56rpx;
				height: 56rpx;
				border-radius: 50%;
				margin-right: 14rpx;
				border: 1rpx solid #eee;
			}
		}
		.picBox {
			width: 100%;
			background: #f9f9f9;
			line-height: 90rpx;
			padding: 24rpx 20rpx;
			align-items: flex-start;

			.avatar {
				width: 150rpx;
				height: 150rpx;
				border-radius: 10rpx;
				margin-right: 20rpx;
				overflow: hidden;

				img {
					width: 150rpx;
					height: 150rpx;
				}
			}

			.name {
				margin-bottom: 6rpx;
				font-size: 28rpx;
				max-height: 80rpx;
				line-height: 1.2;
				margin-top: 6rpx;
			}
			.serviceText{
				color: #f5a139;
			}
		}

		.contentBox {
			justify-content: flex-end !important;
			// margin-top: 20rpx;
			padding-top: 24rpx;
			border-top: 1rpx solid #e5e5e5;

			.cm_tags {
				margin-left: 16rpx;
			}
		}

		&:last-child {
			margin-bottom: 0;
		}
	}
</style>
