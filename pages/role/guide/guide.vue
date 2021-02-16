<template>
	<view class="pages flex flex_y flex_center ">
		<!-- <view class="title">快捷登录设置</view> -->
		<button type="text" class="cm_btn" @tap="bindBunding" hover-class="cm_hover_m" style="margin-bottom: 40rpx;">老会员，立即绑定微信</button>
		<button type="text" class="cm_btn_plain" @tap="bindRegister" hover-class="cm_hover_m">新用户，立即注册</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				inputsArray: [
					// 用户手机号码
					{
						type: 'phone',
						id: 'username',
						defaultValue: '',
						iconPic: '../../static/img/zc_icon_sj.png',
						placeholder:'请输入您的手机号',
						
					},
					// 用户密码
					{
						type: 'password',
						id: 'password',
						markWord:true,
						iconPic:'../../static/img/zc_icon_mm.png',
						placeholder:'请输入您的密码'
					}
				],
			};
		},

		methods: {
			// 老用户绑定
			bindBunding(){
				uni.redirectTo({
					url:'../bunding/bunding'
				})
			},
			// 新用户注册
			bindRegister(){
				uni.redirectTo({
					url:'../reg/reg?type=2'
				})
			},
			_focusHandle(){
				this.hide = true
			},
			async bindLogin() {
				// let res = this.$refs.formInputs.verify();
				// let that = this
						
				// if (res.status) {
				// 	let data = res.data
				// 	const openid =  uni.getStorageSync('HJC_userOpenId');
				// 	const userNikename =  uni.getStorageSync('HJC_userNikename');
				// 	const userHead =  uni.getStorageSync('HJC_userHead');
				// 	data.openid = openid;
				// 	data.head = userHead;
				// 	data.nikename = userNikename;
				// 	try{
				// 		let res = await this.$api.userLogin(data,true)
				// 		if(res.result==1){
			
				// 			if(res.msg)uni.setStorageSync('access_token',res.msg);
				// 			if(res.msg)uni.setStorageSync('HJC_userOpenId',res.data.open_id);
				// 			if(res.data){
				// 				that.$store.commit('setAccountInfo',res.data)
				// 			}
							
				// 			setTimeout(()=>{
				// 				uni.reLaunch({
				// 					url: '/pages/main/main'
				// 				})
				// 			},1000)
							
				// 		}else{
				
				// 		}
				// 		// console.log( '请求结果success : ' + JSON.stringify(res))
				// 	}catch(err){
				// 		console.log( '请求结果false : ' + err )
				// 	}		
				// }
								uni.reLaunch({
									url: '/pages/main/main'
								})
				
			},
			_switch(value) {
				// console.log(value)
				this.inputType = value
			},
			sendMessage() {
		
			}
		},
	}
</script>

<style lang="less" scoped> 
	.pages{
		padding: 30rpx;
		width: 100%;
		height: 100vh;
		.title{
			font-size: 34rpx;
			color: #333;
			text-align: center;
			font-weight: 600;
			margin: 32rpx auto 40rpx auto;
		}
		.formBox{
			margin-bottom: 80rpx;
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
