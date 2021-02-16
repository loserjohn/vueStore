<template>
	<view>
		<tui-skeleton v-if="skeletonShow" backgroundColor="#f9f9f9" skeletonBgColor="#efefef" borderRadius="0rpx"></tui-skeleton>
		<view class="pages tui-skeleton">
			<view class="bgbox ">
				<view>{{item.order_status | order_status_filter}}</view>
				<text style="font-size: 24rpx;font-weight: 400;">
					{{statusText}}
				</text>
			</view>
			<view class="proItemsBox addressBox ">
				<!-- <view class="cm_title">收货地址</view> -->
				<view class="flex flex_center buyer tui-skeleton-fillet">
					<image src="../../../../static/img/ic_dz.png" mode="widthFix" class="icon"></image>
					<view class="f1 addreass tui-skeleton-rect">
						<view class="cm_title ">{{item.buy_address}}</view>
						<view class="flex flex_center">
							<text class="cm_text ">{{item.buy_name}}</text>
							<text class="cm_text ">{{item.buy_phone}}</text>
							<view class="f1"></view>
						</view>
					</view>
				</view>
			</view>

			<view class="proItemsBox ">
				<view class="cm_bdb flex  flex_center proItemTop" @tap="_hrefStore(item.shop_id)">
					<image :src="item.shop_logo" mode="aspectFill" class="shopIcon"></image>
					<view class="cm_title f1">{{ item.shop_name }}</view>
					<tui-icon name="arrowright" :size="16"></tui-icon>
				</view>
				<block v-for="(it, ind) in item.order_child_list" :key="ind">
					<view class="picBox">
						<view class=" flex  flex_center " style="align-items: flex-start;" @click="_hrefPro(it.goods_code)">
							<!-- <view class="picBox flex  flex_center" >						 -->
							<image :src="it.skus_img" mode="aspectFill" class="avatar" lazy-load="true"></image>
							<view class="f1">
								<view class=" cm_title   name cm_ellipsis2 tui-skeleton-fillet">{{ it.goods_title }}</view>
								<view class="cm_des flex flex_center" style="justify-content: flex-start;">
									<!-- <tui-tag shape="circle" size="mini" type="gray" class=" stags">{{ it.skus_name }}</tui-tag> -->
									<text>{{ it.skus_name }}</text>
								</view>
								<view style="margin-top: 4rpx;">
									<view class="cm_des flex flex_center" v-if="it.order_project_service1">
										<view class="f1 cm_t_20" style="color: #E56D00;">{{it.order_project_service1}}</view>

									</view>
									<view class="cm_des flex flex_center" v-if="it.order_project_service2">
										<view class="f1 cm_t_20" style="color: #E56D00;">{{it.order_project_service2}}</view>

									</view>
									<view class="cm_des flex flex_center" v-if="it.order_project_service3">
										<view class="f1 cm_t_20" style="color: #E56D00;">{{it.order_project_service3}}</view>

									</view>
								</view>
								<view class=" tui-skeleton-fillet flex flex_center" style="margin-top: 10rpx;">
									<text class="cm_prize cm_t_32">￥{{ it.alone_price }}</text>
									<view class="f1"></view>
									<tui-icon name="shut" :size="14" color="#999"></tui-icon>
									<text class="cm_des">{{ it.goods_num }}</text>
	
								</view>
							</view>
							<!-- </view> -->
						</view>
						<view class="flex flex_center contentBox cm_bdb">
							<text style="color: #E56D00;"   v-if=" item.order_status!=0 && it.is_refund!=0">已申请退款：{{it.is_refund | is_refund_filter}}</text>
							<view class="f1"></view>
							<button class="cm_tags primary" size="mini" @tap="_refund(it)" v-if=" item.order_status!=0 && it.is_refund==0">退货退款</button>
							<button class="cm_tags " plain size="mini" @tap="_refundDetail(it)"  v-if=" item.order_status!=0 && it.is_refund!=0">退款详情</button>
							<!-- <text style="color: #E56D00;" @tap="_refundDetail(it)" v-if=" item.order_status!=0 && it.is_refund!=0">{{it.is_refund | audit_status_filter}}</text> -->
						</view>
					</view>
				</block>

			</view>

			<view class="proItemsBox  " @click="_call">
				<view class="flex flex_center">
					<image src="../../../../static/img/phone.png" mode="widthFix" class="call"></image>
					<text>联系卖家</text>
				</view>
			</view>

			<view class="proItemsBox  " style="padding: 0;">
				<tui-list-view unlined="all" class="tui-list-view tui-skeleton-fillet" style="margin-top: 0;">
					<tui-list-cell :arrow="false">
						<view class="tui-list-cell-name f1">商品金额</view>
						<view class="tui-right">￥{{ item.goods_total_price }}</view>
					</tui-list-cell>
					<tui-list-cell :arrow="false">
						<view class="tui-list-cell-name f1">运费</view>
						<view class="tui-right">￥{{ item.ems_price?item.ems_price:0 }}</view>
					</tui-list-cell>
					<tui-list-cell :arrow="false">
						<view class="tui-list-cell-name f1">服务费用</view>
						<view class="tui-right">￥{{ item.service_total_price?item.service_total_price:0}}</view>
					</tui-list-cell>
					<tui-list-cell class=" tui-skeleton-fillet flex flex_center cm_bdb">
						<view class="f1"></view>
						<view class="cm_des">共 {{ item.goods_num }} 件商品</view>
						<text class=" cm_t_32" style="margin-left: 24rpx;">合计：￥{{ item.pay_price }}</text>
					</tui-list-cell>
				</tui-list-view>
			</view>

			<view class="proItemsBox  " style="padding: 0;">
				<view class="cm_title t tui-skeleton-fillet flex flex_center">
					<text>订单的详情</text>
					<text class="f1"></text>
					<button class="cm_tags " size="mini" @tap="_copy(item.order_code)">复制</button>
				</view>
				<view class="  tui-skeleton-fillet">
					<tui-list-cell :hover="false">
						<view class="tui-line-cell flex flex_center tui-cell-last">
							<view class="tui-title cm_text">订单编号</view>
							<view class="tui-input f1 cm_tex_r">{{item.order_code}}</view>

						</view>
					</tui-list-cell>
					<tui-list-cell :hover="false">
						<view class="tui-line-cell flex flex_center tui-cell-last">
							<view class="tui-title cm_text">创建时间</view>
							<view class="tui-input f1 cm_tex_r">{{item.create_time | timeFilter}}</view>
						</view>
					</tui-list-cell>
					<tui-list-cell :hover="false" v-if="item.order_status!=0">
						<view class="tui-line-cell flex flex_center tui-cell-last">
							<view class="tui-title cm_text">支付方式</view>
							<view class="tui-input f1 cm_tex_r">{{item.payType | pay_type_filter}}</view>
						</view>
					</tui-list-cell>
					<tui-list-cell :hover="false"  v-if="item.ems_code">
						<view class="tui-line-cell flex flex_center tui-cell-last">
							<view class="tui-title cm_text">快递单号</view>
							<view class="tui-input f1 cm_tex_r">{{item.ems_code}}</view>
						</view>
					</tui-list-cell>
					<tui-list-cell :hover="false" :last="false" v-show="item.emark">
						<view class="tui-line-cell flex flex_center tui-cell-last">
							<view class="tui-title cm_text">买家备注</view>
							<view class="tui-input f1 cm_tex_r">{{item.emark}}</view>
						</view>
					</tui-list-cell>
					<tui-list-cell :hover="false" :last="true" v-show="item.order_remark">
						<view class="tui-line-cell flex flex_center tui-cell-last">
							<view class="tui-title cm_text">商家备注</view>
							<view class="tui-input f1 cm_tex_r">{{item.order_remark}}</view>
						</view>
					</tui-list-cell>
				</view>
			</view>


			<!-- <view class=" tui-skeleton-fillet" style="margin-top: 72rpx;padding: 0 20rpx;">
				<tui-button type="primary" shape="circle" :loading="loading1" @tap="_readyToPay" v-if="item.order_status==0">立即付款</tui-button>
			</view>
			<view class=" tui-skeleton-fillet" style="margin-top: 20rpx;padding: 0 20rpx;">
				<tui-button type="primary" plain shape="circle" :loading="loading2" @tap="cancelOrder" v-if="item.order_status==0">取消订单</tui-button>
			</view> -->
			<view class="footer savebottom " v-if="item.order_status!=5">
				<view class="flex flex_center" style="height: 100rpx;">
					<view class="f1"></view>
					<tui-button type="primary" class="btns"   shape="circle" @tap="_readyToPay" v-if="item.order_status==0">立即付款</tui-button>
					<tui-button type="primary" class="btns"   plain shape="circle" @tap="cancelOrder" v-if="item.order_status==0">取消订单</tui-button>
					<tui-button type="primary" class="btns"   shape="circle" v-if="item.order_status == 1" @tap="prompt(item.order_code)">提醒发货</tui-button>
					<tui-button type="primary" class="btns"   shape="circle" v-if="item.order_status == 2" @tap="sure(item.order_code)">确认收货</tui-button>
					<tui-button type="primary" class="btns"   shape="circle" plain v-if="item.order_status == 2" @tap="scan(item.order_code)">查看物流</tui-button>
				</view>
			</view>

		</view>
		<PayPanel ref="payPanel" :oderId="oderId" :amout="item.sum_price" @success="success" @cancel="cancel"></PayPanel>
	</view>
</template>

<script>
	import tuiSkeleton from '@/components/tui-skeleton/tui-skeleton';
	import tuiListView from '@/components/list-view/list-view';
	import tuiListCell from '@/components/list-cell/list-cell';
	import Utils from '@/utils/utils.js';
	import PayPanel from '@/components/PayPanel/PayPanel';
	import h5Copy from '@/js_sdk/junyi-h5-copy/junyi-h5-copy/junyi-h5-copy.js'
	export default {
		data() {
			return {
				item: '',
				loading1: false,
				loading2: false,
				formParams: {
					"order_code": "",
					"ems_code": "",
				},
				oderId: "",
				// 支付参数
				payParams: {
					pay_type: 0, //1-支付宝 2-微信
					pay_source: 0, //0-定额充值 1-聚友手续费 2-粉丝手续费 3-VIP手续费
					order_num: '' //订单号
				},
				skeletonShow: true
			};
		},
		onLoad(options) {
			this.formParams.order_code = options.code;
			this.payParams.order_num = options.code;
			
			let that = this
			uni.$on('refresh_orderDetail', () => {
				that.loadData()
			})
		},
		onShow() {
			this.loadData()
		},
		computed: {
			statusText() {
				let t = ''
				switch (parseInt(this.item.order_status)) {
					case 0:
						t = '请你尽快完成订单付款'
						break;
					case 1:
						t = '卖家将在48小时内发货'
						break;
					case 2:
						t = '商品已经在运送途中,请保持手机畅通'
						break;
					case 3:
						t = '您已确认签收货物'
						break;
					case 4:
						t = '等待商家退款'
						break;
					case 5:
						t = '交易已成功'
						break;
					default:
						t = '交易已关闭'
						break;
				}
				return t
			}
		},
		components: {
			tuiListCell,
			tuiSkeleton,
			tuiListView,
			PayPanel
		},
		onPullDownRefresh() {
			this.loadData()
			uni.stopPullDownRefresh()
		},
		methods: {
			// 发起退款
			async sure(code) {
				let that = this;
				try {
					// this.$ui.showloading();	
					let data = {
						order_code: code
					}
					let res = await this.$api.Receiving(data, false);
					// this.$ui.hideloading();
					if (res.result==1) {

						that.$ui.toast('收货成功')
						setTimeout(() => {
							that.loadData()
						}, 1000)
					} else {
						that.$ui.toast(res.msg)
					}
					if (callback) callback();
				} catch (err) {
					console.log('请求结果false : ' + err);
				}
			},
			async prompt(code) {
				let that = this;
				try {
					let data = {
						order_code: code
					};
					this.$ui.showloading();
					let res = await this.$api.Prompt(data);
					this.$ui.hideloading();
					if (res.result==1) {
						that.$ui.toast('提醒发货成功');
						that.refresh();
					} else {
						that.$ui.toast(res.msg);
					}
				} catch (err) {
					console.log('请求结果false : ' + err);
				}
			},
			// 查看物流
			scan(code) {
				uni.navigateTo({
					url: '/pages/features/ems/ems?orderCode=' + code
				});
			},
			_call() {
				uni.makePhoneCall({
					phoneNumber: this.item.seller_phone //仅为示例
				});
			},
			_copy(str) {
				// alert(str)
				// uni.setClipboardData({
				// 	data: str,
				// 	success: function() {
				// 		// console.log('success');
				// 		uni.showToast( '复制成功')				
				// 	}
				// });
				let content = str // 复制内容，必须字符串，数字需要转换为字符串
				const result = h5Copy(content)
				if (result === false) {
					uni.showToast({
						title: '不支持',
					})
				} else {
					uni.showToast({
						title: '复制成功',
						icon: 'none'
					})
				}
			},
			_refundDetail(item) {
				console.log(111, item)
				uni.navigateTo({
					url: '/pages/features/refundDetail/refundDetail?code=' + item.refund_code
				})
			},
			_hrefStore(code) {
				uni.switchTab({
					url: '/pages/main/main'
				})
			},
			_hrefPro(code) {
				uni.navigateTo({
					url: '/pages/main/details/details?code=' + code
				})
			},
			// 发起退款
			_refund(item) {

				// this.$emit('refund',item)
				// alert(this.item.order_status)
				// console.log(item)
				// return 
				item.order_code = this.item.order_code
				this.$store.commit('currenPro', item);
				if (this.item.order_status == 0) {
					return
				}
				if (this.item.order_status == 1) {
					// 还未发货					
					uni.navigateTo({
						url: '/pages/features/refundApply/refundApply?type=0'
					})
				} else {
					uni.navigateTo({
						url: '/pages/features/refundAction/refundAction'
					})
				}

			},
			// imageLoad(index) {
			// 	this.$set(this.item, 'load', true);
			// },
			// loadError(index) {
			// 	// console.log('图片未找到');
			// 	this.item.goods_main_img = '/static/img/noPic.jpg';
			// },
			async loadData(callback) {
				let that = this;
				try {
					// this.$ui.showloading();
					let data = {
						order_code: this.formParams.order_code
					}
					let res = await this.$api.getOrderDetail(data, false);
					// this.$ui.hideloading();

					// console.log(res)
					if (res.result==1) {
						if (res.data) {
							that.item = res.data;
							that.formParams.ems_code = res.data.ems_code
							that.oderId = res.data.order_code
							// alert(that.oderId)
						}
						that.skeletonShow = false
					} else {
						that.$ui.toast(res.msg)
					}
					if (callback) callback();
				} catch (err) {
					console.log('请求结果false : ' + err);
				}
			},
			_readyToPay() {
				let that = this;
				this.$refs.payPanel._show()
			},

			// 取消订单
			async cancelOrder() {
				let that = this;
				try {
					that.$ui.showloading()
					let res = await this.$api.CancelOrder({
						order_code: that.payParams.order_num
					});
					that.$ui.hideloading()
					if (res.result==1) {

						that.$ui.toast('取消成功')
						setTimeout(() => {
							uni.$emit('refresh_order')
							uni.navigateBack({})
						}, 500)
					} else {
						that.$ui.toast(res.msg)
					}
				} catch (err) {
					console.log('请求结果false : ' + err);
				}


			},
			// 支付接口
			success(path) {
				// alert('支付接口')
				// this.formParams.order_code = order
				// this.loadData()
				// this.$refs.payPanel._show()
				if(path){
					uni.redirectTo({
						url: path
					});
				}
			},
			cancel() {
				// uni.redirectTo({
				// 	url: '/pages/features/order/orderDetail/orderDetail?code=' + this.payParams.order_num 
				// });
			}
		}
	}
</script>

<style lang="scss" scoped>
	.pages {
		padding: 20rpx;
		position: relative;
		padding-top: 160rpx;
		padding-bottom: 180rpx;

		.bgbox {
			font-size: 40rpx;
			text-align: left;
			// padding: 40rpx 0;
			background: var(--cl_primary);
			color: #fff;
			font-weight: 600;
			position: absolute;
			left: 0;
			top: 0;
			z-index: 0;
			width: 100%;
			height: 260rpx;
			// line-height: 300rpx;

			padding: 20rpx 40rpx;
			padding-top: 60rpx;

			&.text-red {
				color: red
			}

		}

		.proItemsBox {
			border-radius: 12rpx;
			overflow: hidden;

			.call {
				width: 50rpx;
				height: 50rpx;
				margin-right: 20rpx;
			}
		}

		.addressBox {
			// margin-top: 160rpx;
			z-index: 1;
			position: relative;
			text-align: left;

			.icon {
				width: 50rpx;
				height: 50rpx;
				margin-right: 26rpx;
			}

			.cm_title {
				margin-bottom: 10rpx;
			}

			.cm_text {
				text-align: left;
				color: #999;
				margin-right: 20rpx;
			}
		}

		.shopIcon {
			width: 36rpx;
			height: 36rpx;
			border-radius: 50%;
			margin-right: 8rpx;
		}

		.contentBox {
			padding: 10rpx 0;
			margin-top: 20rpx;
		}

		.buyer {
			padding: 10rpx 0;
		}

		.t {
			padding: 20rpx 32rpx;
		}

		.tui-line-cell {
			width: 100%;
		}

		.tui-title {
			width: 110rpx;
			margin-right: 20rpx;
			text-align: left;
		}

		.footer {
			position: fixed;
			left: 0;
			bottom: 0;
			// height: 100rpx;
			background: #fff;
			border-top: 1rpx solid #f2f2f2;
			width: 100%;
			padding: 0 20rpx;
			z-index: 100;
			box-sizing: border-box;
			.btns {
				margin:0 20rpx!important;
				
				
			}
		}
	}
</style>
