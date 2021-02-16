<template>
	<view class="pages">


		<view class="input-group">
			<view class="formBox">
				<InputGrouds :inputsArray="inputsArray" @focusHandle="_focusHandle" :markWord="false" ref="formInputs"></InputGrouds>
			</view>
				<tui-button type="primary" shape="circle" :disabled="false" :loading="loading" @tap="bindUpdated">更改密码</tui-button>
		</view>
	</view>
</template>

<script>

	import Utils from '../../../utils/utils.js' 

	export default {

		data() {
			return {
				positionTop: 0,
				inputType: 'password',
				loadModal: false,
				formParmas: {
					"username": "",
				    "newmobile": "",
				    "validate": ""
				},
				inputsArray: [
					// 用户手机号码
					{
						type: 'phone',
						id: 'mobile',
						defaultValue: '',
						iconPic: '../../../static/img/inpus/zc_icon_sj.png',
						placeholder:'请输入您的手机号',
						
					},
					// 用户密码
					{
						type: 'repass',
						id: 'password',
						markWord:true,
						iconPic:'../../../static/img/inpus/zc_icon_mm.png',
						placeholder:'请输入您的手机号'
					},
				],
				effective: false, //是否在有效的倒计时范围内
				time: null,
				seconds: 0,
			}
		},
		onLoad(){
			// console.log(JSON.stringify(this.$store.state.userInfo.mobile) )
			 this.formParmas.username = this.$store.state.userInfo.mobile
		},
		// computed: mapState(['forcedLogin']),
		methods: {
			async _bindSubmit() {
				if (this.loadModal) return;
				if (!Utils.phoneCheck(this.formParmas.username)) {
					uni.showToast({
						icon: 'none',
						title: '请输入正确的手机号码'
					});
					return;
				}
				if (!Utils.phoneCheck(this.formParmas.newmobile)) {
					uni.showToast({
						icon: 'none',
						title: '请输入正确的手机号码'
					});
					return;
				}
				if (this.formParmas.validate.length==0) {
					uni.showToast({
						icon: 'none',
						title: '请输入验证码'
					});
					return;
				}


				const data = this.formParmas
				// console.log(JSON.stringify(data))
				try{
					plus.nativeUI.showWaiting('处理中,请稍后...')
					let res = await this.$api.userChangeMobile(data);
					plus.nativeUI.closeWaiting()
					// console.log(JSON.stringify(res))
					if (res.result == 1) {					
						uni.showToast({
						    title: '修改成功',
							icon:'success'
						});
						uni.removeStorageSync('access_token');
						
						uni.showLoading({
							icon: 'none',
							title: '注销用户中...',
							mask: true
						});
						setTimeout(() => {
							uni.hideLoading()
							uni.reLaunch({
								url: '/pages/role/login/login'
							});
						}, 1500)
						
						
					} else {
					    uni.showToast({
					        icon: 'none',
					        title: res.msg?res.msg:'修改失败',
					    });
					}
				}catch(err){
					console.log( '请求结果false : ' + err )
				}
				
			
			},

			// 获取验证码
			async _getCode() {
				if (this.effective) return;
				if (!this.formParmas.username || !Utils.phoneCheck(this.formParmas.username)) {
					uni.showToast({
						icon: 'none',
						title: '请输入正确的手机号码'
					});
					return;
				};
				
				let self = this;
				let data = {
					mobile: this.formParmas.username,
					type: 6  //1,注册 2,登录 3,找回 4.银行卡 5.营销充值 6，修改手机号
				};				
				try{
					let res = await this.$api.getValidCode(data);
					console.log(JSON.stringify(res))
					if (res.result == 1) {
						uni.showToast({
						    title: '验证码已发送',
							position:'bottom'
						});
						
						self.effective = true;
						self.seconds = 60;
						let time = setInterval(()=>{
							self.seconds-=1;
							if(self.seconds==0){
								self.effective = false;
								clearInterval(time)
							}
						},1000)
					} else {
					    uni.showToast({
					        icon: 'none',
					        title: res.data,
					    });
					}
				}catch(err){
					console.log( '请求结果false : ' + err )
				}
			
			},
			// 切换密码类型
			_switch(value) {
				this.inputType = value
			},
			// 跳转
			toMain() {
				uni.switchTab({
					url: '/pages/main/mainTest',
				})
			}
		}
	}
</script>

<style lang="less" scoped>
.pages{
		padding: 30rpx;
		// height: calc(100vh - 176rpx);
		// min-height: 700rpx;
		background: #fff;
		.logo{
			width:146rpx;
			height:146rpx;
			border-radius: 16rpx;
			margin-top: 56rpx; 
		}
		.title{
			font-size: 34rpx;
			color: #333;
			text-align: center;
			font-weight: 600;
			margin: 24rpx auto 54rpx auto;
			
		}
		.formBox{
			margin-bottom: 80rpx;
			.noteBox{
				height: 60rpx;
				padding: 0 20rpx;
			}
		}
		.footer{
			position: absolute;
			width: 100%;
			left: 0;
			bottom: 0;
			.line{
				width: 50rpx;
				height: 2rpx;
				color: #333333;
				background: #333333;
			}
			.wxLogin{
				margin: 40rpx auto 50rpx auto;
				width: 90rpx;
				height: 90rpx;
				border-radius: 50%;
				.wxLoginIcon{
					width: 90rpx;
					height: 90rpx
				}
			}
		}
	}
</style>
