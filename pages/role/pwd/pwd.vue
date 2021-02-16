<template>
	<view class="pages">
		<!-- <view class="title">忘记密码</view> -->
		<view class="input-group">
			
			<view class="formBox">
				<InputGrouds :inputsArray="inputsArray" @focusHandle="_focusHandle" :markWord="false" ref="formInputs"></InputGrouds>
			</view>
		
			<!-- <button type="text" class="cm_btn" @tap="bindLogin" hover-class="cm_hover_m">更改密码</button> -->
			<tui-button type="primary" shape="circle" :disabled="false" :loading="loading" @tap="bindUpdated">更改密码</tui-button>
			<!-- <view class="flex flex_center" style="margin-top: 32rpx;">
				<view class="">
					密码已找回,
				</view>
				<view class=" cm_tex_r">
					<navigator open-type="redirect" url="../login/login" class="primary">去登陆</navigator>
				</view>
			</view> -->
		</view>
		
	</view>
</template>

<script>
	import InputGrouds from '@/components/InputGrouds/InputGrouds.vue'
	export default {
		data() {
			return {
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
						type: 'password',
						id: 'password',
						markWord:true,
						iconPic:'../../../static/img/inpus/zc_icon_mm.png',
						placeholder:'请输入您的新密码'
					},
					// 用户密码
					{
						type: 'password',
						id: 'check_password',
						markWord:true,
						iconPic:'../../../static/img/inpus/zc_icon_mm.png',
						placeholder:'请再次输入您的新密码'
					},
					{
						type: 'verify',
						id: 'vilidate',
						relevantId: 'mobile',
						iconPic:'../../../static/img/inpus/zc_icon_yzm.png',
						codeType:3,
						placeholder:'请输入短信验证码',
						buttonStyle:'block'
					},
				],
				loading:false
			};
		},
		components: {
			InputGrouds: InputGrouds
		},
		onLoad(options){
			if(options.phone){
				this.inputsArray[0].defaultValue = options.phone;
				this.inputsArray[0].readOnly = true;
			}
		},
		methods: {
			_focusHandle(){
				this.hide = true
			},
			async bindUpdated() {
				let res = this.$refs.formInputs.verify();
				let that = this
				let data = {
					   "password": "",//登录密码
					   "check_password": "",//登录密码
					   "vilidate": ""//验证码
				}
						
				if (res.status) {
					// let data = res.data
					data.password = res.data.password
					data.check_password = res.data.check_password
					data.vilidate = res.data.vilidate
					
					try{
						this.$ui.showloading()
						let res = await this.$api.findPassword(data,true)
						this.$ui.hideloading()
						if(res.result==1){
						
							that.$ui.toast('修改成功')
							setTimeout(()=>{
								uni.redirectTo({
									url:"../pLogin/pLogin"
								})
							},1000)
							
						}else{
							that.$ui.toast(res.msg,)
							that.loading = false
						}
						// console.log( '请求结果success : ' + JSON.stringify(res))
					}catch(err){
						console.log( '请求结果false : ' + err )
						that.loading = false
					}		
				}
				
				
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
		background: #fff;
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
