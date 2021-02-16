<template>
	<view class="pages">
		<view class="note">可提现余额{{accountInfo.consumer_blance}}元</view>
		<view class="formBox">
			<view >提现余额</view>
			<view class="inputBox flex flex_center">
				<!-- <text style="margin-top: 8rpx;margin-right: 20rpx;font-size: 20rpx;">元</text> -->
				<!-- <input type="number" value="" placeholder="0"  class="f1 numBox" v-model="formParams.apply_money"/> -->
				<view class="f1">
					<NumInput :max="accountInfo.consumer_blance" @input="_valid" ref="numInput"></NumInput>
				</view>
			
			</view>
			<view class="flex btnsBar">
				<!-- <view class="f1 text">可提现金额 {{accountInfo.consumer_blance}}</view> -->
				<view class="text primary" @click="_all">
					全部提现
				</view>
			</view>
		</view>	
		<view class="flex flex_center listBar">
			<view class="f1">提现到</view>
			<view class="">
				<picker @change="bindPickerChange" :value="index" :range="bankList" range-key="open_bank">
					<view class="uni-input " v-if="bankList.length">{{ bankList[index].open_bank?bankList[index].open_bank:'请选择提现账户' }}</view>
				</picker>
			</view>
			<image src="../../static/img/down.png" mode="widthFix" style="width: 22rpx;height: 22rpx;margin-left: 20rpx;"></image>
		</view>
		
		
		
		<view style="padding:72rpx 30rpx;">
			<tui-button type="primary" shape="circle" :disabled="false" :loading="false" @tap="submit">立即提现</tui-button>
		</view>
		<tui-modal :show="modal" @click="handleClick" @cancel="hide" title="睿众商城提醒您"  :content="content" :maskClosable="false" color="#333" :size="32"></tui-modal>
		<best-payment-password title="请输入操作密码" :show="payFlag" :value="paymentPwd" digits="6" @cancel="cancelPass" @submit="checkPwd" :forget="false"></best-payment-password>
	</view>
</template>

<script>
	import NumInput from '@/components/xhInput/xhInput.vue'; 
	import bestPaymentPassword from '@/components/best-payment-password/best-payment-password.vue';
	export default {
		data() {
			// console.log(payType)
			return {
				// array: payType,
				index:0,
				formParams: {
					    "apply_money": "",
					    "cash_card": "",
					    "pay_password": "",
					    "vilidate": "000000",
				},
				bankList:[],
				paymentPwd:'',
				payFlag:false,
				modal:false,
				content:'您还尚未添加银行卡',
				action:'login',
			};
		},
		computed:{
			accountInfo(){
				return  this.$store.state.accountInfo
			}
		},
		components: {
			bestPaymentPassword,
			NumInput
		},
		onLoad() {
			// this.formParams.cash_source =  this.array[this.index].Value;
			// this.accountInfo = this.$store.state.accountInfo
			
			if (this.accountInfo.is_password != 1) {
				this.content = '请您先进行支付密码设置';
				this.action = 'payPass'; ///features/authentication/authentication'
				this.modal = true;	
				// return
			}else{
				this.initBank()
			}
			
			
			
		},
		methods:{
			_all(){
				this.$refs.numInput.setValue(this.accountInfo.consumer_blance)
				this.formParams.apply_money =  this.accountInfo.consumer_blance
			},
			_valid(e){
				this.formParams.apply_money = e
			},
			// 体现账户选择
			bindPickerChange(e) {
				// console.log('picker发送选择改变，携带值为', e.target.value);
				this.index = e.target.value;
				this.formParams.cash_card = this.bankList[this.index].bank_code
			},
			submit(){
				// if(this.accountInfo.is_prove!=1 && this.accountInfo.is_prove!=3){
				// 	this.content = '请您先进行身份认证'
				// 	this.action = 'authentication'  ///features/authentication/authentication'
				// 	this.modal = true;			
				// }else if(this.accountInfo.is_prove==3 ){
				// 	this.content = '身份审核中，请耐心等候'
				// 	this.action = 'authentication'  ///features/authentication/authentication'
				// 	return	
				// }else 
				if(this.accountInfo.is_password!=1){
					this.content = '请您先进行支付密码设置'
					this.action = 'payPass'  ///features/authentication/authentication'
					this.modal = true;
				}else{
					if(!this.formParams.apply_money){
					
						this.$ui.toast('请输入提现数额')
						return
					}
					this.payFlag = true
				}	
				
				
			},
			// 取消支付
			cancelPass(){
				this.payFlag =  false
			},
			// 确认密码
			checkPwd(e){
				if (!e) {
					
					that.$ui.toast('取消提现')
					return;
				}
				// alert(e)
				this._depost(e)
				this.payFlag =  false
			},
			// 提交提现
			async _depost(e){
				let that = this
				this.formParams.pay_password = e
				// console.log(this.formParams) 
				try{
					this.$ui.showloading()
					let res = await this.$api.SubmitCash(this.formParams,true)
					// console.log(res)
					this.$ui.hideloading()
					if(res.result==1){
						
						that.$ui.toast('提现成功')
						uni.$emit('refresh_user')				
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
			},
			// 加载银行列表
			async initBank(){
				let that = this
				try {
					this.$ui.showloading()
					let res = await this.$api.GetBankList();
					this.$ui.hideloading()
					if (res.result==1) {
						that.bankList = res.data.rows
						// console.log(that.bankList)
						if(that.bankList.length){
							that.formParams.cash_card = that.bankList[0].bank_code 
						}else{
							// 强制跳转
							that.content = '您尚未绑定银行卡，立即前往绑定'
							that.action = 'bank'  ///features/authentication/authentication
							that.modal = true
						}
						
					} else {
						
						that.$ui.toast(res.msg ? res.msg : '银行卡获取失败')
					}
				} catch (err) {
					console.log('请求结果false : ' + err)
				}
			},
			handleClick(e) {
				let index = e.index;
				if (index === 0) {
					// this.tui.toast("你点击了取消按钮")	
					uni.navigateBack({})
				} else {
					// this.tui.toast("你点击了确定按钮")
					
					switch (this.action){
						case 'bank':
						uni.redirectTo({
							url:'/pages/features/bank/newBank/newBank'
						})	
							break;
						case 'authentication':
						uni.navigateTo({
							url:'/pages/features/authentication/authentication'
						})	
							break;
						case 'payPass':
						uni.redirectTo({
							url:'/pages/user/setPayPass/setPayPass'
						})	
							break;
						default:
							break;
					}					
				}
				this.modal = false
			},
		}
	}
</script>

<style lang="less" scoped> 
	.pages{
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
			padding: 20rpx;
			.inputBox{
				padding-top: 32rpx;
				padding-bottom: 24rpx;
				border-bottom: 1rpx solid #e5e5e5;
				.numBox{
					
					font-size: 36rpx;
					font-weight: 600;
					color: #333;
				}
			}
			.btnsBar{
				margin-bottom: 12rpx;
				margin-top: 24rpx;
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
