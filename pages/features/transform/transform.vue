<template>
	<view class="pages">
		<view class="flex userInfo" v-if="hjcAccount">
			<image :src="hjcAccount.consumer_head" mode="aspectFill" class="avatar"></image>
			<view class="f1">
				<view class="flex " style="align-items: center;">
					<view class="username cm_title f1">{{hjcAccount.consumer_name}}</view>
				</view>
				<view class="accountItems">
					{{hjcAccount.consumer_mobile}}
				</view>
			</view>	
		</view>
		<view class="note">可提现余额{{hjcAccount.consumer_score}}</view>
		
		<view class="formBox">
			<tui-list-cell :hover="false">
				<view class="tui-line-cell flex flex_center">
					<view class="tui-title ">合家慈余额</view>			
					<input placeholder-class="phcolor" class="tui-input f1" v-model="formParams.score" @input="_filert('score')"  name="age" placeholder="请输入起拍价" maxlength="50" type="number" />
				</view>
			</tui-list-cell>
			<tui-list-cell :hover="false">
				<view class="tui-line-cell flex flex_center">
					<view class="tui-title">转为元</view>
					<view class="f1">{{amount}}</view>
				</view>
			</tui-list-cell>
			<tui-list-cell :hover="false" :last="true">
				<view class="tui-line-cell flex flex_center">
					<view class="tui-title">市场单价</view>
					<view class="f1">{{hjcAccount.interest_rate}}</view>
				</view>
			</tui-list-cell>
		</view>
		
		<view class="formBox">
			<InputGrouds :inputsArray="inputsArray" :labelWidth="180" @focusHandle="_focusHandle" :markWord="false" ref="formInputs"></InputGrouds>
		</view>
		
		<view style="padding:72rpx 30rpx;">
			<tui-button type="primary" shape="circle" :disabled="false" :loading="loading" @tap="submit">立即提现</tui-button>
		</view>
		<!-- <tui-modal :show="modal" @click="handleClick" @cancel="hide" title="您还尚未添加银行卡"  content="立即添加银行卡" :maskClosable="false" color="#333" :size="32"></tui-modal> -->
		<!-- <best-payment-password title="请输入操作密码" :show="payFlag" :value="paymentPwd" digits="6" @cancel="cancelPass" @submit="checkPwd" :forget="false"></best-payment-password> -->
		
		<tui-modal :show="modal" :maskClosable="false" :custom="true">
			<view class="tui-modal-custom">
				<view class="flex  flex_center">
					<image src="../../../static/img/logo2.png" class="tui-tips-img" style="width: 100rpx ;height: 100rpx;"></image>
				</view>
				<InputGrouds :inputsArray="loginParams" @focusHandle="_focusHandle" :markWord="false" ref="formInputs2"></InputGrouds>				
				<tui-button type="danger"  @click="handleClick" :loading="logining" style="margin-top: 40rpx;">匹配账户</tui-button>
				<tui-button type="default"  @click="_back" :plain="true" style="margin-top: 40rpx">返回</tui-button>
			</view>
		</tui-modal>
	</view>
</template>

<script>
	import NumInput from '@/components/xhInput/xhInput.vue'; 
	// import bestPaymentPassword from '@/components/best-payment-password/best-payment-password.vue';
	import tuiListCell from "@/components/list-cell/list-cell"
	import InputGrouds from '@/components/InputGrouds/InputGrouds.vue';
	export default {
		data() {
			// console.log(payType)
			return {
				// array: payType,
				index:0,
				formParams: {
					"mobile":"",
					    "score":"",
					    "vilidate":"",
				},
				bankList:[],
				paymentPwd:'',
				payFlag:false,
				modal:true,
				inputsArray: [
					// 用户手机号码
					{
						type: 'text',
						id: 'mobile',
						defaultValue: '',
						iconPic: '../../../static/img/inpus/zc_icon_sj.png',
						placeholder:'请输入您的手机号',
						readyOnly:true
					},
					// 用户密码				
					{
						type: 'verify',
						id: 'vilidate',
						relevantId: 'username',
						iconPic:'../../../static/img/inpus/zc_icon_yzm.png',
						codeType:8,
						placeholder:'请输入短信验证码',
						buttonStyle:'block'
					},
				],
				loginParams:[
					// 用户手机号码
					{
						type: 'text',
						id: 'mobile',
						defaultValue: '',
						iconPic: '../../../static/img/inpus/zc_icon_sj.png',
						placeholder:'请输入您的手机号',
							// readyOnly:true
					},
					// 用户密码
					{
						type: 'password',
						id: 'password',
						markWord:true,
						defaultValue: '',
						iconPic:'../../../static/img/inpus/zc_icon_mm.png',
						placeholder:'请输入您的密码'
					}
				],
				timelock: null,
				loading:false,
				logining:false,
				hjcAccount:''
			};
		},
		computed:{
			accountInfo(){
				return  this.$store.state.accountInfo
			},
			amount(){
				if(this.formParams.score){
					return this.formParams.score*this.hjcAccount.interest_rate
				}else{
					return 0 
				}
			
			}
		},
		components: {
			// bestPaymentPassword,
			NumInput,
			InputGrouds,
			tuiListCell
		},
		onLoad() {
			this.inputsArray[0].defaultValue = this.accountInfo.consumer_mobile?this.accountInfo.consumer_mobile:'';
			// this.loginParams[0].defaultValue = this.accountInfo.consumer_mobile?this.accountInfo.consumer_mobile:'';
		},
		methods:{
			_back(){
				uni.navigateBack({
					
				})
			},
			// 整数过滤
			_filert(id){
				if(this.timelock != null){
					clearTimeout(this.timelock)
				}
				
				this.timelock = setTimeout(()=>{
					this.formParams[id] = parseInt(this.formParams[id]);
					if(this.formParams[id] >this.hjcAccount.consumer_score){
						this.formParams[id] =this.hjcAccount.consumer_score
					}
					this.timelock = null
				},500)
				
			},
			_focusHandle() {},

			_valid(e){
				this.formParams.apply_money = e
			},
			submit(){
				if(!this.formParams.score){
					
					this.$ui.toast('请输入余额数量')
					return
				}
				this._transform()
			},
			// 提交提现
			async _transform(){
				let res = this.$refs.formInputs.verify();
				let that = this
						
				if (res.status) {
					this.formParams.vilidate = res.data.vilidate
					this.formParams.mobile = res.data.mobile
					console.log(	this.formParams)
					try{
						// this.$ui.showloading()
						that.loading = true
						let res = await this.$api.HJCIntegralRecharge(this.formParams,false)
						// this.$ui.hideloading()
						that.loading = false
						// console.log(res)
						if(res.result==1){
							that.$ui.toast('转移成功')	
							setTimeout(()=>{
								uni.navigateBack({
									
								})
							},1000)						
						}else{
							that.$ui.toast(res.msg)
						}
					}catch(err){
						console.log( '请求结果false : ' + err )
					}		
				}		
			},
			async handleClick(e) {
				let res = this.$refs.formInputs2.verify();
				let that = this
						
				if (res.status) {
					// this.formParams.vilidate = res.data.vilidate
					// console.log( res.data)
					let data = res.data
					try{
						// this.$ui.showloading()
						that.logining = true
						let res = await this.$api.GetHJCConsumer(data,false)
						// this.$ui.hideloading()
						that.logining = false
						// console.log(res)
						if(res.result==1){
							that.$ui.toast('欢迎回来')
							that.hjcAccount = res.data
							that.modal = false				
						}else{
							that.modal = false
							uni.showModal({
								title:res.msg,
								showCancel:false,
								success: () => {
									that.modal = true
									setTimeout(()=>{
										uni.navigateBack({
											
										})
									},1000)	
								}
							})
							
						}
					}catch(err){
						console.log( '请求结果false : ' + err )
					}		
				}		
			},
		}
	}
</script>

<style lang="less" scoped> 
	.pages{
		.userInfo {
			
			align-items: center;
			padding: 20rpx;
			color: #333;
			background: var(--cl_primary);
			.avatar {
				width: 136rpx;
				height: 136rpx;
				border-radius: 50%;
				border: 2rpx solid #fff;
				margin-right: 40rpx;
				box-shadow: 0 0 4rpx #ddd;
		
				img {
					width: 136rpx !important;
					height: 136rpx !important;
				}
			}
		
			.username {
				font-size: 32rpx;
				font-weight: bold;
				margin-bottom: 40rpx;
			}
		
			.nums {
				margin-left: 20rpx
			}
		
			.acyncBtn {
				line-height: 36rpx;
				height: 36rpx;
				padding: 0 10rpx;
				border: 1rpx solid #b82331;
				border-radius: 8rpx;
				font-size: 20rpx;
				margin-left: 20rpx;
				color: #333;
				background: #b82331;
				box-shadow: 0 0 4rpx #ddd
			}
		}
		.note{
			width: 100%;
			height: 66rpx;
			line-height: 66rpx;
			color: #fff;
			background: #333;
			padding: 0 20rpx;
		}
		.formBox{
			background: #fff;
			width: 100%;
			margin-bottom: 16rpx;
			// padding: 20rpx;
			.tui-title{
				width: 180rpx;
			}
			
		}
		.listBar{
			padding:0 20rpx;
			line-height: 88rpx;
			height: 88rpx;
			background: #fff;
			.text{
				line-height: 28rpx;
				color: #999;
			}
		}
	}
</style>
