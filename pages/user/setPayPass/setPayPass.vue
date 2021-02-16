<template>
	<view class="pages">
		<!-- <image src="../../../static/img/logo@1.5x.png" mode="widthFix" class="logo"></image> -->
		<view class="input-group">
			
			<view class="formBox">
				<InputGrouds :inputsArray="inputsArray" @focusHandle="_focusHandle" :markWord="false" ref="formInputs"></InputGrouds>
			</view>
		
			<!-- <button type="text" class="cm_btn" @tap="bindLogin" hover-class="cm_hover_m">更改密码</button> -->
			
			<tui-button type="primary" shape="circle" :disabled="false" :loading="loading" @tap="_bindSubmit">更改密码</tui-button>
			<!-- <view class="flex flex_center" style="margin-top: 32rpx;">
				<view class="">
					密码已找回,
				</view>
				<view class=" cm_tex_r">
					<navigator open-type="redirect" url="../login/login" class="primary">去登陆</navigator>
				</view>
			</view> -->
		</view>
		<best-payment-password title="设置输入密码" :show="payFlag" :value="paymentPwd" digits="6" @cancel="cancelPass" @submit="checkPwd" :forget="false"></best-payment-password>
	</view>
</template>

<script>

	// import Utils from '../../../utils/utils.js'
	import bestPaymentPassword from '@/components/best-payment-password/best-payment-password.vue';
	import InputGrouds from '@/components/InputGrouds/InputGrouds.vue'
	export default {

		data() {
			return {
				positionTop: 0,
				inputsArray: [
					// 用户手机号码
					{
						type: 'phone',
						id: 'mobile',
						defaultValue: '',
						iconPic: '../../../static/img/inpus/zc_icon_sj.png',
						placeholder:'请输入您的手机号',
						readOnly:true
					},
					{
						type: 'verify',
						id: 'vilidate',
						relevantId: 'mobile',
						iconPic:'../../../static/img/inpus/zc_icon_yzm.png',
						codeType:6,
						placeholder:'请输入短信验证码',
						buttonStyle:'block',
						last:true
					},
				],
				loading:false,
				// 修改密码
				formParmas: {
					"pay_password": "",
				    "vilidate": ""
				},
				payFlag:false,
				paymentPwd:'' //支付密码
			}
		},
		onLoad(){
			
			
			if(this.accountInfo.is_password==1){
				// 已设置过
				let mobile = this.$store.state.accountInfo.consumer_mobile
				this.inputsArray[0].defaultValue = mobile
				
			}else{
				// 未设置过直接设置
				this.payFlag =  true
				uni.setNavigationBarTitle({
					title:'设置支付密码'
				})
			}
			
			
		},
		components: {
			bestPaymentPassword,
			InputGrouds
		},
		computed:{
			accountInfo(){
				return  this.$store.state.accountInfo
			}
		},
		methods: {
			_focusHandle(){
				
			},
			// 取消支付
			cancelPass(){
				
				this.$ui.toast('取消设置')
				this.payFlag =  false
			},
			// 确认密码
			checkPwd(e){
				if (!e) {
					
					this.$ui.toast('取消设置')
					return;
				}
				this.formParmas.pay_password = e
				this.setPass()			
				this.payFlag =  false
			},
			async setPass(){
				let  that =this
				// console.log(this.formParmas)
				
				try{
					this.loading = true
					let res = await this.$api.SettingPayPassword(this.formParmas);
					this.loading = false
					// console.log(JSON.stringify(res))
					if (res.result==1) {					
						
						that.$ui.toast('修改成功')
						uni.$emit('refresh_user');
						setTimeout(function() {
							uni.navigateBack()
						}, 1000);
						
					} else {
					    that.$ui.toast(res.msg)
					}
				}catch(err){
					console.log( '请求结果false : ' + err )
					this.$ui.hideloading()
				}
			},
			 _bindSubmit() {
				uni.hideKeyboard()
				
				let res = this.$refs.formInputs.verify();
				let that = this
						
				if (res.status) {
					let data = res.data
					this.formParmas.vilidate = data.vilidate
					this.payFlag = true
					// try{
					// 	// this.$ui.showloading()
					// 	that.loading = true
					// 	let res = await this.$api.userLogin(data,false)
					// 	// this.$ui.hideloading()
					// 	that.loading = false
					// 	// console.log(res)
					// 	if(res.result==1){
						
					// 		setTimeout(()=>{
					// 			// uni.reLaunch({
					// 			// 	url: '/pages/main/main'
					// 			// })
					// 			uni.navigateBack({
									
					// 			})
					// 		},1000)						
					// 	}else{
					
					// 	}
					// }catch(err){
					// 	console.log( '请求结果false : ' + err )
					// }		
				}	
			
				// let  that =this
				// try{
				// 	plus.nativeUI.showWaiting('处理中,请稍后...')
				// 	let res = await this.$api.SettingVerify(data);
				// 	this.$ui.hideloading()
				// 	if (res.result === 1) {					
				// 		that.payFlag = true	
				// 	} else {
				
				// 	}
				// }catch(err){
				// 	console.log( '请求结果false : ' + err )
				// 	this.$ui.hideloading()
				// }		
			
			},
			
		
		}
	}
</script>

<style lang="less" scoped>
	.pages {
		width: 100%;
		height: 100vh;
		background: #fff;
		overflow: hidden;
		.input-group{
			padding: 20rpx;
		}
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
	}
</style>
