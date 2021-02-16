<template>
	<view>
		<!-- <u-navbar back-text="返回" title="微信一键登录"></u-navbar> -->
		<view class="pages">
			<view class="header u-flex-y">
				<!-- <image src="../../../static/img/logo@1.5x.png" mode="scaleToFill" class="logo"></image> -->
			</view>

			<view class="box">
				<!-- #ifdef H5 -->
				<tui-button shape="circle" @click="_wxLogin"  :style="{width:'100%',marginBottom:'32rpx'}" type="primary">微信一键注册/登录</tui-button>
				<!-- #endif -->
				<!-- #ifdef MP -->
				<tui-button shape="circle" open-type="getUserInfo" @getuserinfo="getuserinfo" :custom-style="{width:'100%',marginBottom:'32rpx'}"
				 type="primary">微信登录</tui-button>
				<!-- #endif -->
				<tui-button shape="circle" @click="_nav" plain :style="{width:'100%'}" type="primary">其他方式登录</tui-button>
			</view>
			<!-- <u-top-tips ref="uTips" :navbar-height="44"></u-top-tips>
			<u-toast ref="uToast" /> -->
		</view>
	</view>
</template>

<script>
	import Utils from '@/utils/utils.js';
	import SET from '@/SET.js';
	export default {
		data() {
			return {
				set: {
					appid: SET.appid, //测试环境
					redirect_uri: SET.redirect,
				}
			};
		},

		computed: {},
		onLoad() {
			let that = this
			// this.loginParams.openId = uni.getStorageSync(SET.opIdName);
			// 存在预先引导动作
			// console.log(this.currentAction)

		},

		methods: {
			_nav() {
				// debugger
				uni.redirectTo({
					url: '../pLogin/pLogin'
				})
			},
			// 前往授权 h5使用
		
			// 小程序使用
			getuserinfo(res) {
				let that = this
				let userInfo = res.detail.userInfo
				console.log(userInfo)
				// this.formParams.nickname = userInfo.nickName
				// this.formParams.headimgurl =  userInfo.avatarUrl
				if (userInfo) {
					uni.setStorageSync(SET.wxInfoName, userInfo)
					const opId = uni.getStorageSync(SET.opIdName)
					if (!opId) {
						// #ifdef MP
						uni.login({
							provider: 'weixin',
							success: function(res) {
								let code = res.code;
								// 获取code换opid
								console.log(code)
								// const r = await that.getopId(code)	
								that._getOpenId(code, 1)
							}
						});
						// #endif
						return false
					}
					let data = {
						"openId": opId,
						"wx_code_type": "1", //0-公众号 1-小程序(不传默认为0)
					}

					this._wxLoginApi(data)
				}

			},
			// 获取用户身份
			async _getOpenId(code) {
				let that = this;
				try {
					const inviCode = uni.getStorageSync('inviCode')
					let data = {
						// "wx_code": code,
						// "invitation": inviCode
						"wx_code": code,
						"wx_code_type": 1, //0-公众号 1-小程序
					}
					this.$ui.showloading()
					let res = await this.$api.GetOpenId(data, false);
					this.$ui.hideloading()

					if (res.result === 1) {
						// #ifdef H5
						uni.setStorageSync(SET.opIdName, res.Data.openid)
						uni.setStorageSync('rj_miniAccount', res.Data);
						// #endif
						// #ifdef MP
						uni.setStorageSync(SET.opIdName, res.Data)
						// #endif
					} else {

					}
					// let data2 = {
					// 	"openId": res.Data.openid,
					// 	"wx_code_type": "1", //0-公众号 1-小程序(不传默认为0)
					// }

					// this._wxLoginApi(data2)

				} catch (err) {
					uni.hideLoading()
				}
			},
			// h5登录
			async _wxLogin() {
				// uni.navigateTo({
				// 	url: '/pages/role/bund/bund'
				// });
				// return;
				const opId = uni.getStorageSync(SET.opIdName);
				const wxAccount = uni.getStorageSync(SET.wxInfoName)
				
				if(!opId ){
					Utils.wx_auth()
					return 
				}else{
					this._oIdLogin( opId)
				}		
			},
			async _oIdLogin(OID) {
				let that = this;
			
				if (!OID) return;
				let data = {
					openId: OID
				};
				
				
				try {
					let res = await this.$api.WxTokenLogin(data, false);
					if (res.result == 1) {
						that.$ui.toast('登陆成功');
						// console.log('登陆成功')
						uni.setStorageSync(SET.tokenName, res.data);
						that.$store.commit('login');
						uni.removeStorageSync('hrefAction');
						uni.removeStorageSync('hrefItem');
						setTimeout(()=>{
							uni.navigateBack()
						},1000)
					} else {
						// 用户不存在,则引导注册
						uni.navigateTo({
							url: '/pages/role/bund/bund'
						});
					}
					// console.log('_oIdLoginsuccess : ' + JSON.stringify(res))
				} catch (err) {
					console.log('请求结果false _oIdLogin: ' + err);
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.pages {
		background-color: #fff;

		.header {
			height: 500rpx;
			width: 100vw;
		}

		.box {
			padding: 0 50rpx;

		}

		.warp {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 100vw;
			height: 100vh;

			.rect {
				width: 90vw;
				// height: 80vh;
				background-color: #fff;
				border-radius: 16rpx;
				padding: 40rpx;

				.username {
					margin: 30rpx auto;
				}

				.inputs {
					width: 80vw;
					height: 88rpx;
					line-height: 88rpx;
					border-radius: 44rpx;
					background-color: #F7F7F7;
					margin-bottom: 32rpx;
					padding: 0 20rpx;
				}

				.icons {
					width: 36rpx;
					height: 36rpx;
					margin-right: 10rpx;
					margin-left: 10rpx;
				}
			}
		}


	}
</style>
