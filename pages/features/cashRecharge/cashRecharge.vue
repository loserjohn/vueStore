<template>
	<view class="pages">
		<view class="cm_pd10">
			<view class="cm_title">请选择您要充值的面额</view>
			<view class="flex box">
				
				<view class="blocks " v-for="(item,index ) in cashLists" :key="index" :class="{'active':type==index}" @tap="_chooseMoney(index,item.Value)">
					<view class="value">{{item.Text}}元</view>
					<!-- <text class="cm_text">售价 {{item.Value}}元</text> -->
				</view>
			</view>

			<view style="padding:72rpx 30rpx;">
				<tui-button type="primary" shape="circle" @tap="_creatOrder" :disabled="false" :loading="loading">立即支付</tui-button>
			</view>
		</view>
		<!-- <Success ref="successModal" title="充值成功" des="请及时确认账户元btn="知道了" ></Success> -->
	</view>
</template>

<script>
	import Utils from '@/utils/utils.js'
	export default {
		data() {
			return {
				formParams: {
					 "pay_type":0,  //1-支付宝 2-微信
					 "pay_source":0,  //0-定额充值 1-聚友手续费 2-粉丝手续费 3-VIP手续费
					 "order_num":"",  //订单号
				},
				type:0,
				cashLists:[],
				loading:false,
				recharge_code:''
			};
		},
		onLoad(){
			this.initCashList()
		},
		methods: {
			async initCashList(){
				let that = this
				try {
					this.$ui.showloading()
					let res = await this.$api.RechargeList({});
					this.$ui.hideloading();
					if (res.result==1) {
						// console.log(res.data.ListInfo);
						that.cashLists = res.data.ListInfo;
						that.recharge_code =  that.cashLists[0].Value
					} else {
						
						that.$ui.toast(res.data)
					}
				} catch (err) {
					console.log('请求结果false : ' + err);
					this.$ui.hideloading();
				}
			},
			_chooseMoney(k,code){
				// console.log(code)
				this.type = k;
				this.recharge_code = code
			},
			_readyToPay(){
				let that = this
				uni.showActionSheet({
					itemList: ['微信支付', '支付宝支付'],
					success: function (res) {
						// console.log('选中了第' + (res.tapIndex + 1) + '个按钮')
						if(res.tapIndex ==0){
							// 微信支付
							that.formParams.pay_type = 2
							that._pay(2)
						}else{
							// 支付宝支付
							that.formParams.pay_type = 1
							that._pay(1)
						}
					},
					fail: function (res) {
						console.log(res.errMsg);
					}
				});
			},
			async _creatOrder(){
				let that = this;
				let  data = {recharge_code:this.recharge_code};
				console.log(data)
				try {
					this.loading = true
					let res = await this.$api.Recharge(data);				
					this.loading = false
					if (res.result==1) {
						console.log(res)
						that.formParams.order_num    = res.data
						that._readyToPay()
					} else {
						
						that.$ui.toast(res.data)
					}
				} catch (err) {
					console.log('请求结果false : ' + err)
				}
			},
			async _pay(k,callback) {
				let that = this
				try {
					uni.showLoading('处理中,请稍后...')
					let res = await this.$api.toPayment(this.formParams);				
					this.$ui.hideloading();
					if (res.result==1) {
						console.log(res)
						if(k==1){
							// 支付宝支付
							that._toAliPay(res.data)
						}else{
							// 微信支付
							that._toWXPay(res.data)
						}
					
					} else {
						that.$ui.toast(res.msg)
					}
				} catch (err) {
					console.log('请求结果false : ' + err)
				}
				
				if (callback) callback()
			},
			_toWXPay(data){
				let  that = this
				Utils.WxPay(data,()=>{
					// that.$refs.successModal.show();
					// that.$store.commit('refresh_account');
					uni.$emit('refresh_user');
					uni.redirectTo({
						url:'/pages/features/success/success'
					})
				})
			},
			_toAliPay(str) {
				let  that = this
				Utils.AliPay(str,()=>{
					// that.$refs.successModal.show();
					// that.$store.commit('refresh_account');
					uni.$emit('refresh_user');
					uni.redirectTo({
						url:'/pages/features/success/success'
					})
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.pages {
		.box {
			padding: 20rpx;
			// background: #fff;
			flex-wrap: wrap;
			justify-content: space-between;

			.blocks {
				width: 30%;
				background: #fff;
				text-align: center;
				margin-bottom: 20rpx;
				border-radius: 20rpx;
				padding: 20rpx 0;

				.value {
					font-size: 38rpx;
					font-weight: 600;
					color: #999;
					line-height: 3
				}
			}

			.active {
				// color: #fff;
				// border: 1rpx solid #E32C1F;
				background: var(--cl_primary);
				.value {
					color: #333;
				}

				.cm_text {
					color: #333;
				}
			}
		}
		.submitbtn{
			border-radius: 44rpx
		}
		.cm_title{
			padding: 20rpx;
		}
	}
</style>
