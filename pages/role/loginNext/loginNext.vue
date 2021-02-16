<template>
	<view class="pages">
		<!-- <view class="flex flex_y flex_center" >
			<image src="../../../static/img/logo@1.5x.png" mode="scaleToFill" class="logo"></image>
			<view class="title">睿众商城</view>
		</view> -->
		<view class="input-group">		
			<view class="cm_title">请输入验证码</view>
			<view class="cm_des">验证码已发送至{{phone}}</view>
			<view class="formBox">
				<!-- <InputGrouds :inputsArray="inputsArray" @focusHandle="_focusHandle" :markWord="false" ref="formInputs"></InputGrouds> -->
		
				<!-- <view class="flex flex_center noteBox" >
					<tui-icon name="circle-fill" :color="agree?'red':'#666'" :size="16" @tap="_agree"></tui-icon>
					<navigator class="note f1" url="/pages/main/note/note?type=1">《睿众商城隐私政策》</navigator>
				</view> -->
				<view class="flex flex_center inputs">
					<input type="text" class="f1" v-model="vilidate" placeholder="请输入验证码" />
					<button type="default" size="mini" @tap="_getVerifyCode()">{{seconds>0?'('+seconds+'s)后重新发送':'发送验证码'}}</button>
				</view>
				
				
			</view>
			
			<!-- <button type="text" class="cm_btn" @tap="bindLogin" hover-class="cm_hover_m">登录</button> -->
			<tui-button type="primary" shape="circle" :disabled="false" :loading="loading" @tap="bindLogin">登录</tui-button>
			
			<view class="flex flex_center noteBox" style="margin-top: 40rpx;">
				<tui-icon name="circle-fill" style="margin-right: 10rpx;" :color="agree?'#50AB9F':'#999'" :size="16" @tap="_agree"></tui-icon>
				<!-- <view class="note f1">
					
					
				</view> -->
				<text class="cm_des"  @tap="_agree">我已阅读并同意以下</text>
				<text> <navigator class="note f1" url="/pages/main/note/note?type=1">《睿众商城隐私政策》</navigator></text>
			</view>
		</view>
		<!-- <view class="footer  ">
			<view class="flex flex_center">
				<view class="line"></view>
				<view style="margin:  0 16rpx;">快捷登录</view>
				<view class="line"></view>
			</view>
			<view class="wxLogin" hover-class="cm_hover_m" @click="wxAuth">
				<image src="../../static/img/wx.png" mode="scaleToFill"  class="wxLoginIcon"></image>
			</view>
				
		</view> -->
	</view>
</template>

<script>
	import InputGrouds from '@/components/InputGrouds/InputGrouds.vue'
	import Utils from '@/utils/utils.js'
	export default {
		data() {
			return {
				inputsArray: [
					// 用户手机号码
					{
						type: 'phone',
						id: 'username',
						defaultValue: '',
						iconPic: '../../../static/img/inpus/zc_icon_sj.png',
						placeholder:'请输入您的手机号',
						
					},
					{
						type: 'verify',
						id: 'vilidate',
						relevantId: 'mobile',
						iconPic:'../../../static/img/inpus/zc_icon_yzm.png',
						codeType:1,
						placeholder:'请输入短信验证码',
						buttonStyle:'block'
					},
				],
				set:{
					// appid: 'wx09daee2f47e178aa',//测试环境
					appid: 'wxbb1e69472b847c6e',//正式环境
					redirect_uri: 'http://jf.fjdmll.com/index.html'
				},
				loading:false,
				agree:true,
				phone:'',
				vilidate:'',
				seconds: 0,
				effective: false, //是否在有效的倒计时范围内:
			};
		},
		components: {
			InputGrouds: InputGrouds
		},
		onLoad(options){
			this.phone = options.phone
			
		},
		methods: {
			_agree(){
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
					if (res.result==1) {
						uni.showToast({
							icon:'none',
							title: '已发送至' + this.phone,
						})
						
						that._time()
					} else {
						uni.showToast({
							icon:'none',
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
				let  that = this
				if (!this.agree) {
				
					uni.showToast({
						icon: 'none',
						title: '请阅读并同意相关条例'
					})
					return
				} 
				if (!this.vilidate) {
				
					uni.showToast({
						icon: 'none',
						title: '请输入验证码'
					})
					return
				} 
				let data = {
					 "mobile": this.phone,
					  "vilidate": this.vilidate,
				}
				// debugger
				try {
					that.loading= true
					let res = await this.$api.MobileToken(data, true)
					that.loading  = false
					if (res.result==1) {
						that.$ui.toast('登录成功')
						if(res.data.hp)uni.setStorageSync(SET.tokenName,res.data.hp);
						that.$store.commit('login')
						setTimeout(()=>{
							// uni.navigateBack({
							// 	delta:-1
							// })
							uni.redirectTo({
								url:"/pages/land/land"
							})
						},1000)				
					} else {
						uni.showToast({
							icon:'none',
							title: res.msg,
						})
					}
					console.log('请求结果success : ' + JSON.stringify(res))
				} catch (err) {
					console.log('请求结果false : ' + err)
				}
				
			}
		},
	}
</script>

<style lang="scss" scoped> 
	.pages{
		padding: 30rpx;
		// height: calc(100vh - 176rpx);
		// min-height: 700rpx;
		background: #fff;
		.input-group{
			padding-top: 60rpx;
			.cm_title{
				line-height: 2;
				font-size: 40rpx;
			}
			.inputs{
				border-bottom: 1rpx solid #f1f1f1;
				margin-top: 100rpx;
				margin-bottom: 80rpx;
				line-height: 88rpx;
				height: 88rpx;
			}
		}
		
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
