<template>
	<view class="pages flex flex_center flex_y">
		<image src="../../static/img/logo@1.5x.png" mode="" style="width: 120rpx;height: 120rpx;border-radius:50%;margin-bottom: 40rpx;"></image>
		<text>洁利来商城欢迎您</text>
	</view>
</template>

<script>
import autoUpdater from '@/utils/autoUpdater.min.js';

// import cityData from '@/utils/picker.city.js';
import http from '@/utils/http/index.js';
export default {
	data() {
		return {
			loadModal: true,
			updatedInfo: {},
			result: '',
			loginParams: {
				username: '',
				password: '',
				vilidate: '000000'
			},
			ifProdVersion: false //是否是正式版本
		};
	},
	onLoad() {
		
		// #ifdef APP-PLUS
			this.checkVersion();
		// #endif
		// #ifdef H5
			this.autoLogin()
		// #endif
			
		// autoUpdater.init({
		// 	packageUrl:'http://www.baidu.com',
		// 	content: ['sdfasdfa'],
		// 	browser: false,
		// 	ifForce: false
		// });
		// autoUpdater.show(false);
	},
	computed: {
		hasLogin() {
			return this.$store.state.hasLogin ? this.$store.state.hasLogin : false;
		},
		accountInfo() {
			return this.$store.state.accountInfo;
		}
	},
	methods: {
		getCity(item, str) {
			let that = this;
			item.forEach(t => {
				if (t.id == str) {
					// alert(t.name)
					this.city = t.name;
					return t.name;
				} else {
					if (t.children) {
						return that.getCity(t.children, str);
					}
				}
			});
		},

		// 检查更新
		async checkVersion() {
			let that = this;
			let data = { version: this.Version };
			// alert(0)
			try {
				uni.request({
					url: http.baseUrl + '/api/AppVersion/VersionCheck', //仅为示例，并非真实接口地址。
					method: 'POST',
					data: data,
					header: {
						'Content-Type': 'application/json'
						// Authorization: value
					},
					success: response => {
						// alert(2)
						// console.log(response.data);
						let statusCode = response.statusCode;
						if (statusCode == 200 && response.data.Success) {
							let res = {};
							res.data = response.data.Data;
							// 记录app状态
							if (that.Platform == 'android' && res.data.android_update_type != 1) {
								that.updatedInfo = {
									packageUrl: res.data.android_url_net,
									content: '发现新版本:' + res.data.android_Version + '\n' + res.data.android_update_info ? res.data.android_update_info: ''
								};
								// 1是不更新 2是强制更新 3可选择更新 4//appstore更新
								if (res.data.android_update_type == 2) {
									that.initUpdated(true);
								} else if (res.data.android_update_type == 3) {
									that.initUpdated(false);
								} else if (res.data.android_update_type == 4) {
									// 使用appstore更新
									that.initUpdated(false, true);
								}
							} else if (that.Platform == 'ios' && res.data.ios_update_type != 1) {
								that.updatedInfo = {
									packageUrl: res.data.ios_url_net,
									content: '发现新版本' + res.data.ios_Version + '\n' + res.data.ios_update_info ? res.data.ios_update_info: ''
								};
								// 1是不更新 2是强制更新 3可选择更新 4//appstore更新
								if (res.data.ios_update_type == 2) {
									that.initUpdated(true);
								} else if (res.data.ios_update_type == 3) {
									that.initUpdated(false);
								} else if (res.data.ios_update_type == 4) {
									// 使用appstore更新
									that.initUpdated(false, true);
								}
							}else{
								// that.autoLogin();
							}
						}else{
							// that.autoLogin();
						}
						that.autoLogin();
					},
					fail(err) {
						// console.log(err);
						that.autoLogin();
					}
				});
			} catch (e) {
				that.autoLogin();
			}
		},
		initUpdated(ifForce, browser) {
			// #ifdef APP-PLUS
			autoUpdater.init({
				packageUrl: this.updatedInfo.packageUrl,
				content: this.updatedInfo.content,
				browser: browser,
				ifForce: ifForce
			});
			autoUpdater.show(ifForce);
			// #endif
		},
		async autoLogin() {
			if (this.hasLogin) {
				return;
			}
			// console.log(666666666666)
			let that = this;
			const user = uni.getStorageSync('user');
			// console.log(user)
			if (user) {
				this.loginParams.username = user.username;
				this.loginParams.password = user.password;
			} else {
				uni.reLaunch({
					url: '/pages/main/main'
				});
				return false;
			}

			try {
				// this.$ui.showloading()
				// that.loading = true
				let res = await this.$api.userLogin(this.loginParams, false);
				// this.$ui.hideloading()
				// that.loading = false
				// console.log(res)
				if (res.result==1) {
					if (res.data.jykj) uni.setStorageSync('jykj_token', res.data.jykj);
					if (res.data.fskj) uni.setStorageSync('fskj_token', res.data.fskj);
					if (res.data.vipkj) uni.setStorageSync('vipkj_token', res.data.vipkj);
					if (res.data.svipkj) uni.setStorageSync('svipkj_token', res.data.svipkj);
					if (res.data.hp) uni.setStorageSync(SET.tokenName, res.data.hp);
					uni.setStorageSync('user',that.loginParams);
					
					that.$store.commit('login');
					// this.$ui.toast('登陆成功');
					uni.reLaunch({
						url: '/pages/main/main'
					});	
					// console.log(res)
					that.initUser();
				} else {
					uni.reLaunch({
						url: '/pages/main/main'
					});
				}
			} catch (err) {
				// console.log('请求结果false : ' + err);
				uni.reLaunch({
					url: '/pages/main/main'
				});
			}
		},
		// 加载登录账户信息
		async initUser(callback) {
			let that = this;
			try {
				// this.$ui.showloading();

				let res = await this.$api.getConsumer({}, false);
				// this.$ui.hideloading();

				// console.log(res)
				if (res.result==1) {
					if (res.data) {
						that.$store.commit('setAccountInfo', res.data);
						that.userAccount = res.data;
					}
				} else {
					that.$ui.toast(res.msg);
				}
				if (callback) callback();
			} catch (err) {
				console.log('请求结果false : ' + err);
			}
		}
	}
};
</script>

<style lang="less" scoped>
.pages {
	background: #fff;
	.btu {
		padding: 20rpx 40rpx;
		margin-top: 20rpx;
	}
}
</style>
