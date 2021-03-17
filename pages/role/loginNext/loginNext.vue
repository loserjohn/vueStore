<template>
	<view class="page savebottom" :class="show?'showScreen':'hideScreen'">
		<view class="animated " :class="show?'fadeInUp':'fadeOutDown'" style="width: 100%;height: 100%;padding: 30rpx;" >

		<view class="input-group">
			<view class="cm_title">请输入验证码</view>
			<view class="cm_des">验证码已发送至{{phone}}</view>
			<view class="formBox">
				<tui-keyboard-input :size="50" :inputvalue="pwdArr"></tui-keyboard-input>
				<!-- <view class="flex flex_center inputs"><button type="default" size="mini" @tap="_getVerifyCode()">{{seconds>0?'('+seconds+'s)后重新发送':'发送验证码'}}</button>
				</view> -->
			</view>

			<!-- <button type="text" class="cm_btn" @tap="bindLogin" hover-class="cm_hover_m">登录</button> -->
			<tui-button type="primary" shape="circle" :disabled="false" :loading="loading" @tap="bindLogin">登录</tui-button>

			
		</view>
		<tui-keyboard :mask="false" :show="true" @click="keyboardClick"></tui-keyboard>
		

		</view>
		<tui-tips position="top" ref="tips2"></tui-tips>
	</view>
</template>

<script>
	import tuiKeyboard from "@/components/tui-keyboard/tui-keyboard"
	import tuiKeyboardInput from "@/components/tui-keyboard-input/tui-keyboard-input"
	import Utils from '@/utils/utils.js'
	export default {
		data() {
			return {
				pwdArr: ["", "", "", "", "", ""],
		
				loading: false,
				agree: true,
				vilidate: '',
				seconds: 0,
				index:0,
				show:false,
				effective: false, //是否在有效的倒计时范围内:
			};
		},
		props:{
			phone:{
				type:String,
				default:''
			}
		},
		components: {
			tuiKeyboard,
			tuiKeyboardInput
		},
		onLoad(options) {
			this.phone = options.phone

		},
		methods: {
			_initValide(type){
				if(type=='reset'){
					this.index=0
					this.pwdArr = ["", "", "", "", "", ""]
				}
				this.show =  true
			},
			keyboardClick(e) {
				
				let k = e.index;
				// alert(k)
				
				let action = ''
				switch (k) {
					case 9:
					// alert(1)
						action = 'reset'
						
						this.show =  false
						break;
					case 11:
					console.log('del',this.index)
						if(this.index==6){
							this.pwdArr[5] = ''
							this.pwdArr = [...this.pwdArr]
							this.index=5
						}else if(this.index>=0){
							this.pwdArr[this.index-1] = ''
							this.pwdArr = [...this.pwdArr]
							this.index-=1
						} 
						break;
					default:
					// console.log('add',this.index)
						let value = k+1
						if(k==10){
							value = 0
						}
						if(this.index==-1) {
							this.pwdArr[0] = value
							this.pwdArr = [...this.pwdArr]
							this.index=1
						} else if(this.index<6){
							this.pwdArr[this.index] = value
							this.pwdArr = [...this.pwdArr]
							this.index+=1
						} 			
						break;
				}
				
				
				
			},
			back() {},
			_agree() {
				this.agree = !this.agree
			},
			// 获取验证码
			async _getVerifyCode(relevantId, type) {

				if (this.effective) return;
				// console.log(relevantId);
				let that = this
				let data = {
					mobile: this.phone,
					type: 2
				}

				try {

					let res = await this.$api.getVerificateCode(data, true)
					if (res.result == 1) {
						uni.showToast({
							icon: 'none',
							title: '已发送至' + this.phone,
						})

						that._time()
					} else {
						uni.showToast({
							icon: 'none',
							title: '发送失败',
						})
					}
					console.log('请求结果success : ' + JSON.stringify(res))
				} catch (err) {
					console.log('请求结果false : ' + err)
				}

			},
			// 验证码计时
			_time() {
				this.effective = true;
				this.seconds = 60;
				let time = setInterval(() => {
					this.seconds -= 1;
					if (this.seconds == 0) {
						this.effective = false;
						clearInterval(time)
					}
				}, 1000)
			},
			// 登录
			async bindLogin() {
				let that = this
				// if (!this.agree) {
				// 	uni.showToast({
				// 		icon: 'none',
				// 		title: '请阅读并同意相关条例'
				// 	})
				// 	return
				// }
				let v = this.pwdArr.join('')
				// if(v.length<6){
				// 	let options = {
				// 		msg: '请输入6位有效验证码',
				// 		duration: 1000,
				// 		type: 'danger'
				// 	};
				// 	this.$refs.tips2.showTips(options);
				// 	return
				// }
				this._initValide('reset')
				this.show = false
				this.$emit('success',v)
				return 
				// if (!this.vilidate) {

				// 	uni.showToast({
				// 		icon: 'none',
				// 		title: '请输入验证码'
				// 	})
				// 	return
				// }
				// let data = {
				// 	"mobile": this.phone,
				// 	"vilidate": this.vilidate,
				// }
				// // debugger
				// try {
				// 	that.loading = true
				// 	let res = await this.$api.MobileToken(data, true)
				// 	that.loading = false
				// 	if (res.result == 1) {
				// 		that.$ui.toast('登录成功')
				// 		if (res.data.hp) uni.setStorageSync(SET.tokenName, res.data.hp);
				// 		that.$store.commit('login')
				// 		setTimeout(() => {
				// 			// uni.navigateBack({
				// 			// 	delta:-1
				// 			// })
				// 			uni.redirectTo({
				// 				url: "/pages/land/land"
				// 			})
				// 		}, 1000)
				// 	} else {
				// 		uni.showToast({
				// 			icon: 'none',
				// 			title: res.msg,
				// 		})
				// 	}
				// 	console.log('请求结果success : ' + JSON.stringify(res))
				// } catch (err) {
				// 	console.log('请求结果false : ' + err)
				// }

			}
		},
	}
</script>

<style lang="scss" scoped>
	.page {
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		background: #fff;
		// padding: 20rpx;
		opacity: 0;
		z-index: 10;
		transition: opacity 0.3s ease-in-out; 
		// pointer-events: none;	
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
			padding: 140rpx 0;

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
				margin: 40rpx auto 50rpx auto;
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
	.showScreen {
		opacity: 1;
		pointer-events: auto;
	}
	
	.hideScreen {
		opacity: 0;
		pointer-events: none;
	}
</style>
