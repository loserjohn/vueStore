<template>
	<view class="pages">
		<view class="input-group">
			<view class="formBox">
				<InputGrouds :inputsArray="inputsArray" @focusHandle="_focusHandle" :markWord="false" ref="formInputs"></InputGrouds>
				<view class="flex flex_center noteBox" >
					<tui-icon name="circle-fill" :color="agree?'red':'#666'" :size="16" @tap="_agree"></tui-icon>
					<navigator class="note f1" url="/pages/main/note/note?type=0">《邵氏消防商城隐私政策》</navigator>
				</view>
			</view>
			<tui-button type="primary" shape="circle" :disabled="false" :loading="loading" @tap="bindBund">立即更换</tui-button>
		</view>		
	</view>
</template>

<script>
	import InputGrouds from '@/components/InputGrouds/InputGrouds.vue'
	import SET from '@/SET.js';
	export default {
		data() {
			return {
				loading:false,
				inputsArray: [
					// 用户手机号码
					{
						type: 'phone',
						id: 'mobile',
						defaultValue: '',
						iconPic: '../../../static/img/inpus/zc_icon_sj.png',
						placeholder:'请输入您的手机号',
						
					},
					{
						type: 'phone',
						id: 'nowmobile',
						defaultValue: '',
						iconPic: '../../../static/img/inpus/zc_icon_sj.png',
						placeholder:'请输入您的新手机号',
						
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
				type:1   ,//1为正常注册于微信无关，2为微信注册并绑定
				agree:true
			};
		},
		onLoad(options){
			// alert('a'+this.type)
			this.inputsArray[0].defaultValue = this.accountInfo.consumer_mobile;
			this.inputsArray[0].readOnly = true;
			
			// alert('b'+this.type)
		},
		components: {
			InputGrouds: InputGrouds
		},
		methods: {
			_focusHandle(){
				this.hide = true
			},
			// 绑定手机号
			async bindBund() {
				if(!this.agree){				
					this.$ui.toast('请您阅读并同意《邵氏消防商城隐私政策》有关事项')
					return;
				}
				let re = this.$refs.formInputs.verify();
				let that = this
	
				// const opId = uni.getStorageSync(SET.opIdName);
					
				let data = {
					"mobile": "",//手机号码
					  "nowmobile": "",//新手机号码
					  "vilidate": ""//验证码
				}	
				// const wxaccount = uni.getStorageSync(SET.wxInfoName);

				// data.nickname = wxaccount.nickname;
				// data.headimgurl = wxaccount.headimgurl;
							
				if(re.status) {
					data.mobile = re.data.mobile
					data.vilidate = re.data.vilidate
					data.nowmobile = re.data.nowmobile
					// debugger
					try{
						that.loading = true
						let res = await this.$api.ReplaceMobile(data,true)
						that.loading = false
						if(res.result==1){
							// console.log(res)
							that.$ui.toast('修改成功')
							that.$store.dispatch('refreshUser')
							uni.navigateBack()
						}else{
							that.$ui.toast(res.msg)
							that.loading = false
						}
						// console.log( '请求结果success : ' + JSON.stringify(res))
					}catch(err){
						console.log( '请求结果false : ' + err )
						that.loading = false
					}		
				}			
			},
			// 微信登录
			async wxlogin(openid){
				let that = this
				try{
					// this.$ui.showloading()
					that.loading = true
					let res = await this.$api.WxTokenLogin({openId:openid},false)
					// this.$ui.hideloading()
					that.loading = false
					console.log(res)
					if(res.result==1){
						that.$ui.toast('登陆成功')
						if(res.data.hp)uni.setStorageSync(SET.tokenName,res.data.hp);
	
						that.$store.commit('login')
						setTimeout(()=>{
							uni.navigateBack({})
						},1000)						
					}else{
						that.$ui.toast(res.msg)
						that.loading = false
					}
				}catch(err){
					console.log( '请求结果false : ' + err )
					that.loading = false
				}		
			},
			// 普通账户登录
			async login(o){
				// console.log(o)
				let that = this
				let data = {
					username:o.mobile,
					password:o.password,
					vilidate:'000000'
				}
				// data.vilidate = '000000';		
				// debugger
				try{
					// this.$ui.showloading()
					that.loading = true
					let res = await this.$api.userLogin(data,false)
					// this.$ui.hideloading()
					that.loading = false
					console.log(res)
					if(res.result==1){
						that.$ui.toast('登陆成功')
						if(res.data.hp)uni.setStorageSync(SET.tokenName,res.data.hp);
						// console.log(data)
						uni.setStorageSync('user',data);
						that.$store.commit('login')
						setTimeout(()=>{
							uni.navigateBack({
								delta:2
							})
						},1000)						
					}else{
						that.$ui.toast(res.msg)
						that.loading = false
					}
				}catch(err){
					console.log( '请求结果false : ' + err )
					that.loading = false
				}		
			},
			sendMessage() {
		
			}
		},
	}
</script>

<style lang="scss" scoped> 
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
