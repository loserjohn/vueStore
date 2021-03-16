<template>
	<view class="modal" v-if="panelshow">
		<view class="panel animated slideInUp savebottom" v-if="panelshow">
			<view class="cm_title cm_t_32">选择支付方式</view>
			<view style="margin-bottom: 60rpx;">
				<view class="cells flex flex_center cm_bdb" @click="_choose(2)" v-if="ifWx&&payRoute.indexOf('2') > -1">
					<image src="./wx.png" mode="" class="icons"></image>
					<view class="f1 cm_title">微信支付(官方)</view>
					<image src="./xz.png" mode="" class="icons" v-if="form.pay_type == 2"></image>
					<text class="wxz" v-else></text>
				</view>
				<view class="cells flex flex_center cm_bdb" @click="_choose(4)" v-if=" ifWx&&payRoute.indexOf('4') > -1">
					<image src="./wx.png" mode="" class="icons"></image>
					<view class="f1 cm_title">微信支付</view>
					<image src="./xz.png" mode="" class="icons" v-if="form.pay_type == 4"></image>
					<text class="wxz" v-else></text>
				</view>
				<view class="cells flex flex_center cm_bdb" @click="_choose(9)" v-if="payRoute.indexOf('9') > -1">
					<image src="./wx.png" mode="" class="icons"></image>
					<view class="f1 cm_title">微信支付(测试)</view>
					<image src="./xz.png" mode="" class="icons" v-if="form.pay_type == 9"></image>
					<text class="wxz" v-else></text>
				</view>
				<view class="cm_bdb" v-if="payRoute.indexOf('3') > -1">
					<view class="cells flex flex_center " @click="_choose(3)">
						<image src="./js.png" mode="" class="icons"></image>
						<view class="f1 cm_title">建设银行卡支付</view>
						<image src="./xz.png" mode="" class="icons" v-if="form.pay_type == 3"></image>
						<text class="wxz" v-else></text>
					</view>
					<view v-if="form.pay_type == 3" class="animated fadeIn">
						<view class="cm_title ">分期方式</view>
						<scroll-view scroll-x="true" class="slider">
							<view class="flex flex_center " style="width: 1208rpx;">
								<view class="bar  flex flex_y flex_center" @click="_way('')" :class="{ active: form.install_num == 0 }">
									<view>不分期</view>
								</view>
								<block v-for="(item, index) in agrs" :key="index">
									<view class="bar  flex flex_y flex_center" @click="_way(item.num)" :class="{ active: form.install_num == item.num }">
										<view>￥{{ item.price }} × {{ item.num }}期</view>
										<view class="cm_des">免息</view>
									</view>
								</block>
							</view>
						</scroll-view>
					</view>
				</view>


				<view class="cells flex flex_center" @click="_choose(1)" v-if="payRoute.indexOf('1') > -1">
					<image src="./zf.png" mode="" class="icons"></image>
					<view class="f1 cm_title">支付宝支付</view>
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
	// 1 官方支付宝 2 官方微信 3建行分期 4 商云客 微信 5 商云客小程序 6商云客支付宝 9测试
	
	
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
					"pay_type": "", 	// 1 官方支付宝 2 官方微信 3建行分期 4 商云客 微信 5 商云客小程序 6商云客支付宝 9测试
					"order_code": "J72202009011051138295051", //订单号
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
				
				this.form.pay_type = 4
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
					this._pay(this.form.pay_type)
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
			async _pay(k, callback) {
				let that = this;
				this.form.pay_type = k ;
				// console.log(this.form)
				// return;
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
							that.$emit('success', '/pages/features/order/orderDetail/orderDetail?code=' + res.msg)
							setTimeout(() => {
								window.location.href = res.data;
							}, 500)
						} else if (this.form.pay_type == 4) {
							//SYK微信
							that._toWXPay(res.data);
							that.$emit('success', '/pages/features/order/orderDetail/orderDetail?code=' + res.data.order_code)
						} else if (this.form.pay_type == 5) {
							//SYK小程序
							// this._pay(5)
							uni.showToast({
								title:'暂未开放',
								icon:'none'
							})
						} else if (this.form.pay_type == 6) {
							// 商云课 微信支付宝
							uni.showToast({
								title:'暂未开放',
								icon:'none'
							})
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
				uni.$emit('wxPay', data)
			},
			// 微信支付
			async wsPay(data) {
				// let that = this
				// jweixin.chooseWXPay({
				// 	timestamp: data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
				// 	nonceStr: data.nonceStr, // 支付签名随机串，不长于 32 位
				// 	package: data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
				// 	signType: data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
				// 	paySign: data.paySign, // 支付签名
				// 	success: function (res) {
				// 	// 支付成功后的回调函数
				// 		// console.log(res)
				// 		// alert(JSON.stringify(res));
				// 		// 清楚购物车
				// 		// that.$store.commit('clearCard',()=>{})

				// 		uni.redirectTo({
				// 			url:'/pages/success/success'
				// 		})
				// 	}
				// });
			},
			_toAliPay(str) {
				// let that = this;
				// Utils.AliPay(str, () => {
				// 	// that.$refs.successModal.show();
				// 	// that.$store.commit('refresh_account');
				// 	// uni.$emit('refresh_user');
				// 	// uni.$emit('refresh_order');
				// 	// uni.redirectTo({
				// 	// 	url: '/pages/features/success/success?form=orderDetail'
				// 	// });
				// 	that.$emit('success')
				// });
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
