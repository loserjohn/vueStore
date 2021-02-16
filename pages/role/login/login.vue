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
				<!-- <InputGrouds :inputsArray="inputsArray" @focusHandle="_focusHandle" :markWord="false" ref="formInputs"></InputGrouds> -->
				
				
				<!-- <view class="flex flex_center noteBox" >
					<tui-icon name="circle-fill" :color="agree?'red':'#666'" :size="16" @tap="_agree"></tui-icon>
					<navigator class="note f1" url="/pages/main/note/note?type=1">《睿众商城隐私政策》</navigator>
				</view> -->
				<input type="number" class="inputs" v-model="phone" placeholder="请输入手机号码" />
				
			</view>
			
			<!-- <button type="text" class="cm_btn" @tap="bindLogin" hover-class="cm_hover_m">登录</button> -->
			<tui-button type="primary" shape="circle" :disabled="false" :loading="loading" @tap="bindLogin">手机号登录</tui-button>
			
			<view class="flex" style="margin-top: 32rpx;">
				<view class="f1 ">
					<navigator url="../pLogin/pLogin">密码登录</navigator>
				</view>
				<view class="f1 cm_tex_r">
					<navigator url="../reg/reg">注册账户</navigator>
				</view>
				
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
				phone:''
			};
		},
		components: {
			InputGrouds: InputGrouds
		},
		onLoad(){
			const user = uni.getStorageSync('user');
			
		},
		methods: {
			_agree(){
				this.agree = !this.agree
			},
			_focusHandle(){
				
			},
			// 登录
			async bindLogin() {
				if(!Utils.phoneCheck(this.phone)){
					uni.showToast({
						icon:'none',
						title:'请输入正确手机号'
					})
					return
				}
				uni.navigateTo({
					url:'../loginNext/loginNext?phone='+ this.phone
				})
				
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
