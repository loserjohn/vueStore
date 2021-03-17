<template>
	<view class="modal" v-if="panelshow">
		<view class="panel animated slideInUp savebottom" v-if="panelshow">
			<view class="cm_title cm_t_32">选择支付方式</view>
			<view style="margin-bottom: 60rpx;">
				<!-- (官方) -->
				<view class="cells flex flex_center cm_bdb" @click="_choose(2)" v-if="ifWx&&payRoute.indexOf('2') > -1">
					<image src="./wx.png" mode="" class="icons"></image>					
					<view class="f1 cm_title">微信支付</view>
					<image src="./xz.png" mode="" class="icons" v-if="form.pay_type == 2"></image>
					<text class="wxz" v-else></text>
				</view>
				<!-- ((syk-公众号)) -->
				<view class="cells flex flex_center cm_bdb" @click="_choose(5)" v-if=" ifWx&&payRoute.indexOf('5') > -1">
					<image src="./wx.png" mode="" class="icons"></image>				
					<view class="f1 cm_title">微信支付</view>
					<image src="./xz.png" mode="" class="icons" v-if="form.pay_type == 5"></image>
					<text class="wxz" v-else></text>
				</view>
				<!-- ((syk-小程序)) -->
				<view class="cells flex flex_center cm_bdb" @click="_choose(4)" v-if=" ifWx&&payRoute.indexOf('4') > -1">
					<image src="./wx.png" mode="" class="icons"></image>
					<view class="f1 cm_title">微信支付</view>
					<image src="./xz.png" mode="" class="icons" v-if="form.pay_type == 4"></image>
					<text class="wxz" v-else></text>
				</view>
				<!-- (测试) -->
				<view class="cells flex flex_center cm_bdb" @click="_choose(9)" v-if="payRoute.indexOf('9') > -1">
					<image src="./wx.png" mode="" class="icons"></image>
					<view class="f1 cm_title">微信支付(测试) </view>
					<image src="./xz.png" mode="" class="icons" v-if="form.pay_type == 9"></image>
					<text class="wxz" v-else></text>
				</view>
				<!-- 建行 -->
				<view class="cm_bdb" v-if="payRoute.indexOf('3') > -1">
					<view class="cells flex flex_center " @click="_choose(3)">
						<image src="./js.png" mode="" class="icons"></image>
						<view class="f1 cm_title">建设银行卡支付</view>
						<image src="./xz.png" mode="" class="icons" v-if="form.pay_type == 3"></image>
						<text class="wxz" v-else></text>
					</view>			
				</view>
				<!-- 商云客 支付宝 -->
				<view class="cells flex flex_center" @click="_choose(6)" v-if="payRoute.indexOf('6') > -1">
					<image src="./zf.png" mode="" class="icons"></image>
					<view class="f1 cm_title">支付宝</view>
					<image src="./xz.png" mode="" class="icons" v-if="form.pay_type == 6"></image>
					<text class="wxz" v-else></text>
				</view>
				<!-- (支付宝官方) -->
				<view class="cells flex flex_center" @click="_choose(1)" v-if="payRoute.indexOf('1') > -1">
					<image src="./zf.png" mode="" class="icons"></image>
					<view class="f1 cm_title">支付宝</view>
					<image src="./xz.png" mode="" class="icons" v-if="form.pay_type == 1"></image>
					<text class="wxz" v-else></text>
				</view>
			</view>
			<view style="padding-bottom: 20rpx;">
				<view class="flex flex_center">
					<tui-button type="primary" class="sbtn" :plain="true" shape="circle" :loading="loading" @tap="_hide">取消</tui-button>
					<tui-button type="primary" class="sbtn" shape="circle" :loading="loading" @tap="_submit">提交</tui-button>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	// 1 官方支付宝 2 官方微信 3建行分期 4 商云客 小程序 5 商云客微信 6商云客支付宝 9测试
	
	
	import Utils from '@/utils/utils.js';
	import SET from '@/SET.js'
	const global_Set_jll = uni.getStorageSync(SET.globalSetName)
	// console.log(global_Set_jll)
	const jweixin = require('jweixin-module')
	export default {
		data() {
			return {
				loading: false,
				agrs: [{
						price: 100, //每期金额
						num: 6, //期数
						charge: 2 //每期手续费
					},
					{
						price: 100, //每期金额
						num: 12, //期数
						charge: 2 //每期手续费
					},
					{
						price: 100, //每期金额
						num: 24, //期数
						charge: 2 //每期手续费
					}
				],
				form: {
					"pay_type": "", 	//  1 官方支付宝 2 官方微信 3建行分期 4 商云客 小程序 5 商云客微信 6商云客支付宝 9测试
					"order_code": "", //订单号
					"install_num": "", //分期数
				},
				panelshow: false,
				payList: [],
				ifWx:false
			};
		},
		props: {
			amout: {
				//是否是统一规格
				Type: Number,
				default: 0
			},
			oderId: {
				//图片
				Type: String,
				default: ''
			}
		},
		computed: {
			payRoute() {
				return global_Set_jll.pay_route.map(item => {
					return item.value
				})
			}
		},
		created() {
			this.ifWx = uni.getStorageSync('ifWx')
			global_Set_jll.pay_route.forEach(item => {
				this.payList.push(item.value)

			})
			// this.form.pay_type = this.payRoute[0]

			
			if (this.ifWx) {
				// #ifdef H5
				// 公众号默认为5
					this.form.pay_type = 5
				// #endif
				// #ifdef MP-WEIXIN
					this.form.pay_type = 4
				// #endif	
			} else {
				this.form.pay_type = ''
			}
			// this.form.pay_type = 9
			console.log(this.payRoute)
		},
		watch: {
			oderId(n, o) {
				if (n) {
					this.form.order_code = n;
					this.initPrice();
				}
			}
		},
		methods: {

			_way(k) {
				this.form.install_num = k;
			},
			// 初始化价格
			initPrice() {
				let n = this.amout;
				if (!n) return;
				this.agrs.forEach(item => {
					item.price = (n / item.num).toFixed(2);
				});
			},
			_show() {
				this.panelshow = true;
			},
			_hide() {
				this.panelshow = false;
				this.$emit('cancel')
				// this._href();
			},
			_choose(k) {
				this.form.pay_type = k
			},
			// 提交支付
			async _submit() {
				if(!this.form.pay_type){
					uni.showToast({
						title:'请选择支付方式',
						icon:'none'
					})
					return 
				}
				const opid = uni.getStorageSync(SET.opIdName);
				if(!opid){
					uni.showModal({
						title:'缺少opined',
						content: '立即前往授权',
						success: function(res) {
							if (res.confirm) {
								Utils.wx_auth()
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					})
				return 		
				}
				if (this.form.pay_type) {
					this._pay()
				} else {
					uni.showToast({
						title:'未知渠道',
						icon:'none'
					})
				}
			},
			_href() {
				uni.redirectTo({
					url: '/pages/features/order/orderDetail/orderDetail?code=' + this.form.order_code
				});
			},
			// 支付接口
			async _pay( callback) {
				let that = this;
				let k = this.form.pay_type ;
		
				try {
					that.loading = true;
					let res = await this.$api.toPayment(this.form);
					that.loading = false;

					if (res.result == 1) {
						if (k == 1) {
							// 官方支付宝支付
							that._toAliPay(res.data);
						} else if (k == 2) {
							// 官方 微信支付
							that._toWXPay(res.data);
						} else if (k == 3) {
							// 建行
							// that.$emit('success', '/pages/features/order/orderDetail/orderDetail?code=' + res.msg)
							that.$emit('success', '/pages/features/order/orderDetail/orderDetail?code=' + res.data.order_code)
							setTimeout(() => {
								// window.location.href = res.data;
								window.location.href = res.data.payparams;
							}, 500)
						} else if (this.form.pay_type == 4) {
							//SYK微信小程序
							that._toMiniWXPay(res.data);	
						} else if (this.form.pay_type == 5) {
							//SYK微信
							that._toWXPay(res.data);
							that.$emit('success', '/pages/features/order/orderDetail/orderDetail?code=' + res.data.order_code)
						} else if (this.form.pay_type == 6) {
							// 商云课 支付宝
							
							that.$emit('success', '/pages/features/order/orderDetail/orderDetail?code=' + res.data.order_code)
							that._toAliPaySyk(res.data);
					
						}else if (this.form.pay_type == 9){
							//测试
							that.$emit('success', '/pages/features/success/success')
							that._toWXPay(res.data);	
						}else{
							uni.showToast({
								title:'未知渠道',
								icon:'none'
							})
						}
						// that.panelshow = false;
						// that._href()
					} else {
						that.$ui.toast(res.msg);
						// that.panelshow = false;
					}
				} catch (err) {
					console.log('请求结果false : ' + err);
				}

				if (callback) callback();
			},
			async _toWXPay(data) {
				let that = this;
				// debugger
				uni.$emit('wxPay', data.payparams)
			},
			// 微信支付
			async _toMiniWXPay(data) {
				uni.$emit('wxPayMini', data.payparams) 
				
			},
			// 官方支付宝
			_toAliPay(str) {
				// let that = this;
				Utils.AliPay_H5(str, () => {
					that.$emit('success')
				});
			},
			// 商云客支付宝支付
			_toAliPaySyk(data) {
				// let that = this;
				let str = data.payparams.qr_code		
				let arr = str.split('/');
				let qrcode = arr[arr.length - 1]
				let url = `https://mobilecodec.alipay.com/client_download.htm?qrcode=${qrcode}`
				
				setTimeout(() => {
					window.location.href = url
				}, 500)
			}
		}
	};
</script>

<style lang="scss" scoped>
	.modal {
		width: 100vw;
		// height: 100vh;
		background: rgba(0, 0, 0, 0.4);
		position: fixed;
		left: 0;
		top: 0;
		bottom: 0;
		right: 0;
		z-index: 999;

		.panel {
			width: 100vw;
			position: absolute;
			left: 0;
			bottom: 0;
			background: #fff;
			border-radius: 20rpx 20rpx 0 0;
			padding: 20rpx;
			box-sizing: border-box;

			// padding-bottom: env(safe-area-inset-bottom);
			.cells {
				min-height: 110rpx;

				.cm_title {
					padding: 0 20rpx;
				}

				.icons {
					width: 40rpx;
					height: 40rpx;
					border-radius: 50%;
				}

				.wxz {
					width: 40rpx;
					height: 40rpx;
					border-radius: 50%;
					border: 1rpx solid #f1f1f1;
				}

				&:active {
					background: #f3f3f3;
				}
			}

			.slider {
				width: 100%;
				height: 100rpx;
				// background: red;
				margin: 40rpx 0;
				overflow-x: auto;

				.bar {
					width: 282rpx;
					height: 98rpx;
					border-radius: 4rpx;
					color: #333;
					background: #f3f3f3;
					margin: 0 20rpx;

					.cm_des {
						margin-top: 10rpx;
						// color: #DD3A30;
					}
				}

				.active {
					border: 2rpx solid #dd3a30;
					color: #dd3a30;
					background: #fff5f5;

					.cm_des {
						color: #dd3a30;
					}
				}
			}

			.cm_bdb {
				position: relative;
				border-bottom: 1rpx solid #f1f1f1;
			}
		}

		.sbtn {
			// transform: scale(.8);
			height: 70rpx;
			line-height: 70rpx;
			margin: 0 20rpx;
		}
	}
</style>
