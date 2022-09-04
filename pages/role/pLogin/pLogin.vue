
<!-- 账号登录 -->
<template>
	<view class="pages">
		<!-- <view class="input-group">
			<view class="cm_title">欢迎登陆惠美</view>
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
		</view> -->
		<view class="input-group">		
			<view class="cm_title">欢迎登陆惠美</view>
			<view class="cm_des">账户密码登录</view>
			<view class="formBox">
				<!-- <InputGrouds :inputsArray="inputsArray" @focusHandle="_focusHandle" :markWord="false" ref="formInputs"></InputGrouds> -->
				<input type="number" class="inputs" v-model="form.username" placeholder="请输入手机号码" />
				<input type="password" class="inputs" cleable v-model="form.password" placeholder="请输入密码" />
				<view class="flex flex_center noteBox" >
					<tui-icon name="circle-fill" :color="agree?'#50ab9f':'#666'" :size="16" @tap="_agree"></tui-icon>
					<navigator class="note f1" url="/pages/main/note/note?type=1">《惠美隐私政策》</navigator>
					<!-- <text class=""></text> -->
				</view>
			</view>
			
			<!-- <button type="text" class="cm_btn" @tap="bindLogin" hover-class="cm_hover_m">登录</button> -->
			<tui-button type="primary"  style="margin-top: 80rpx;" shape="circle" :disabled="false" :loading="loading" @tap="bindLogin">登录</tui-button>
			
			<view class="flex" style="margin-top: 32rpx;">
				<view class="f1">
					<navigator url="../reg/reg">注册账户</navigator>
				</view>
				<view class="f1 cm_tex_r">
					<navigator url="../pwd/pwd">忘记密码?</navigator>
				</view>
			</view>
		</view>
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
				<view class="wxLogin" hover-class="cm_hover_m" @click="_yzmLogin">
					<image src="/static/img/sy_tx.png" mode="scaleToFill"  class="wxLoginIcon"></image>
				</view>		
			</view>
			
		</view>
		<tui-toast ref="toast"></tui-toast>
		<tui-tips position="top" ref="tips"></tui-tips>
	</view>
</template>

<script>
	// import InputGrouds from '@/components/InputGrouds/InputGrouds.vue'
	import SET from '@/SET.js'
	export default {
		data() {
			return {
				form: {
					"username":'',//手机号
					"password": '',//密码
					"vilidate": "000000",//验证码
					"openId": "",//openid
					"wx_code_type": "0"//0-公众号 1-小程序(不传默认为0)
				},
				rule: [{
					name: 'username',
					rule: ['isMobile'],
					msg: ['请输入正确的手机号']
				},
				{
					name: 'password',
					rule: ['required'],
					msg: ['请输入有效密码']
				}],
				loading:false,
				agree:true
			};
		},
		components: {
			// InputGrouds: InputGrouds
		},
		onLoad(){
			// this.inputsArray[0].defaultValue = '15959131219'
			// this.inputsArray[1].defaultValue = '888888'
			
		},
		methods: {
			_yzmLogin(){
				uni.redirectTo({
					url:'/pages/role/login/login'
				})
			},
			wxAuth(){
				uni.redirectTo({
					url:'/pages/role/wxLogin/wxLogin'
				})
			},
			_agree(){
				this.agree = !this.agree
			},
			_focusHandle(){
				
			},
			// 登录
			async bindLogin() {
				let that = this
				if(!this.agree){				
					let options = {
						msg: '请您阅读并同意《惠美隐私协议》有关事项',
						duration: 2000,
						type: 'danger'
					};
					this.$refs.tips.showTips(options);				
					return;
				}
				
				const res = this.$form.validation(this.form, this.rule)
				// let res = this.$refs.formInputs.verify();					
				if (res.status) {
					try{
						that.loading = true
						let res2 = await this.$api.userLogin(this.form,false)
						that.loading = false
						// console.log(res)
						if(res2.result==1){
							let params = {
								title: "登录成功",
								imgUrl: "/static/img/toast/check-circle.png",
								icon: true
							}
							that.$refs.toast.show(params);
							if(res2.data)uni.setStorageSync(SET.tokenName,res2.data);

							that.$store.commit('login')
							that.$store.dispatch('refreshUser')
							setTimeout(()=>{
								uni.navigateBack({
								})
							},1000)						
						}else{
							let options = {
								msg: res2.msg,
								duration: 2000,
								type: 'danger'
							};
							that.$refs.tips.showTips(options);
							that.loading = false
						}
					}catch(err){
						console.log( '请求结果false : ' + err )
						that.loading = false
					}		
				}else{
					let options = {
						msg: res.msg,
						duration: 2000,
						type: 'danger'
					};
					this.$refs.tips.showTips(options);
				}	
			}
		},
	}
</script>

<style lang="scss" scoped> 
	.pages{
		padding: 30rpx;
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		background: #fff;
		.input-group {
			padding-top: 60rpx;
			.formBox{
				padding-top: 40rpx;
			}
			.cm_title {
				line-height: 2;
				font-size: 40rpx;
			}
		
			.inputs {
				border-bottom: 1rpx solid #f1f1f1;
				margin-top: 20rpx;
				margin-bottom: 20rpx;
				line-height: 60rpx;
				height: 88rpx;
			}
			.noteBox{ 
				margin-top: 60rpx;
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
				margin: 50rpx;
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
