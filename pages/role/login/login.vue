<template>
	<view class="pages">
		<!-- <view class="flex flex_y flex_center" >
			<image src="../../../static/img/logo@1.5x.png" mode="scaleToFill" class="logo"></image>
			<view class="title">睿众商城</view>
		</view> -->
		<view class="input-group">
			<view class="cm_title">欢迎登陆睿众商城</view>
			<view class="cm_des">通过手机号验证码登录</view>
			<view class="formBox">
				<input type="number" class="inputs" v-model="form.mobile" placeholder="请输入手机号码" />
			</view>
			<tui-button type="primary" shape="circle" :disabled="false" :loading="loading" @tap="_getVerifyCode('mobile',2)">{{seconds>0?seconds+'s后重新发送':'发送验证码'}}</tui-button>

			<view class="flex" style="margin-top: 32rpx;">
				<view class="f1 ">
					<navigator url="../pLogin/pLogin">密码登录</navigator>
				</view>
				<view class="f1 cm_tex_r">
					<navigator url="../reg/reg">注册账户</navigator>
				</view>
			</view>
		</view>
		<tui-toast ref="toast"></tui-toast>
		<tui-tips position="top" ref="tips"></tui-tips>

		<ValidatePage ref="ValidatePage" @success="bindLogin" :phone="form.mobile"></ValidatePage>
		<view class="footer  ">
			<view class="flex flex_center">
				<view class="line"></view>
				<view style="margin:  0 16rpx;">快捷登录</view>
				<view class="line"></view>
			</view>
			<view class="flex flex_center">
				<view class="wxLogin" hover-class="cm_hover_m" @click="wxAuth">
					<image src="/static/img/weact.png" mode="scaleToFill"  class="wxLoginIcon"></image>
				</view>		
				<view class="wxLogin" hover-class="cm_hover_m" @click="_pLogin">
					<image src="/static/img/wd_cdk.png" mode="scaleToFill"  class="wxLoginIcon"></image>
				</view>		
			</view>
			
		</view>
	</view>
</template>

<script>
	import ValidatePage from '../loginNext/loginNext.vue'
	import Utils from '@/utils/utils.js'
	import SET from '@/SET.js';	
	export default {
		data() {
			return {
				show: false,
				form: {
					"mobile": "15959131219", //手机号
					"vilidate": "", //验证码
					"openId": "", //openid
					"wx_code_type": "0" //0-公众号 1-小程序(不传默认为0)
				},
				rule: [{
					name: 'mobile',
					rule: ['isMobile'],
					msg: ['请输入正确的手机号']
				}],
				loading: false,
				agree: true,
				phone: '',
				seconds: 0,
				time:null,
				effective: false, //是否在有效的倒计时范围内
			};
		},
		components: {
			ValidatePage
		},
		onLoad() {
			const user = uni.getStorageSync('user');

		},
		methods: {
			wxAuth(){
				uni.redirectTo({
					url:'/pages/role/wxLogin/wxLogin'
				})
			},
			_pLogin(){
				uni.redirectTo({
					url:'/pages/role/pLogin/pLogin'
				})
			},
			_agree() {
				this.agree = !this.agree
			},
			_focusHandle() {

			},
			// 获取验证码
			async _getVerifyCode(relevantId, type) {
				if (this.effective) {
					this.$refs.ValidatePage._initValide('show')
					return
				}
				let that = this
				const res = this.$form.validation(this.form, this.rule)
				if (res.status) {
					let data = {
						mobile: this.form[relevantId].value,
						type: type
					}
					// api操作						
					try {
						this.loading = true
						// let res2 = await this.$api.getVerificateCode(data, true)
						let res2 = {
							result: 1
						}
						this.loading = false
						if (res2.result == 1) {
							that._time();
							that.$refs.ValidatePage._initValide('reset')
						} else {
							let options = {
								msg: res2.msg,
								duration: 2000,
								type: 'danger'
							};
							this.$refs.tips.showTips(options);
						}
						console.log('请求结果success : ' + JSON.stringify(res2))
					} catch (err) {
						console.log('请求结果false : ' + err)
					}
				} else {
					let options = {
						msg: res.msg,
						duration: 2000,
						type: 'danger'
					};
					this.$refs.tips.showTips(options);
				}

			},
			// 验证码计时
			_time() {
				this.effective = true;
				this.seconds = 10;
				this.time = setInterval(() => {
					this.seconds -= 1;
					if (this.seconds == 0) {
						this.effective = false;
						clearInterval(this.time)
					}
				}, 1000)
			},
			// 登录
			async bindLogin(v) {
				let that = this
				this.form.vilidate = v
				this.loading = true
				let res = await this.$api.MobileToken(this.form, true)
				this.loading = false
				if (res.result == 1) {
					// that.$ui.toast('登录成功')
					let params = {
						title: "登录成功",
						imgUrl: "/static/img/toast/check-circle.png",
						icon: true
					}
					that.$refs.toast.show(params);

					if (res.data) uni.setStorageSync(SET.tokenName, res.data);
					that.$store.commit('login')
					that.$store.dispatch('refreshUser')
					setTimeout(() => {
						uni.switchTab({
							url: "/pages/main/main"
						})
					}, 1000)
				} else {
					let options = {
						msg: res.msg,
						duration: 2000,
						type: 'danger'
					};
					this.$refs.tips.showTips(options);
				}
				this.effective = false;
				clearInterval(this.time)
				this.time= null
				this.seconds = 0;
			}
		},
	}
</script>

<style lang="scss" scoped>
	.pages {
		padding: 30rpx;
		// width: 100vw;
		// height: 100vh;
		// height: calc(100vh - 176rpx);
		// min-height: 700rpx;
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		background: #fff;

		.input-group {
			padding-top: 60rpx;

			.cm_title {
				line-height: 2;
				font-size: 40rpx;
			}

			.inputs {
				border-bottom: 1rpx solid #f1f1f1;
				margin-top: 100rpx;
				margin-bottom: 80rpx;
				line-height: 88rpx;
				height: 88rpx;
			}
		}

		.logo {
			width: 146rpx;
			height: 146rpx;
			border-radius: 16rpx;
			margin-top: 56rpx;
		}

		.title {
			font-size: 34rpx;
			color: #333;
			text-align: center;
			font-weight: 600;
			margin: 24rpx auto 54rpx auto;

		}

		.formBox {
			margin-bottom: 80rpx;

			.noteBox {
				height: 60rpx;
				padding: 0 20rpx;
			}
		}

		.footer {
			position: absolute;
			width: 100%;
			left: 0;
			bottom: 0;

			.line {
				width: 50rpx;
				height: 2rpx;
				color: #333333;
				background: #333333;
			}

			.wxLogin {
				margin: 50rpx;
				width: 90rpx;
				height: 90rpx;
				border-radius: 50%;

				.wxLoginIcon {
					width: 90rpx;
					height: 90rpx
				}
			}
		}
	}
</style>
