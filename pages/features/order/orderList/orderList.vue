<template>
	<view>
		<scroll-view class="page" scroll-y="true" @scrolltolower="loadMore">
			<view v-if="lists.length > 0">
				<block v-for="(item, index) in lists" :key="index">
					<view class="proItemsBox ">
						<view class="cm_bdb flex  flex_center proItemTop">
							<image :src="item.shop_logo" mode="widthFix" class="shopLogo"></image>
							<view class="f1 cm_tex_l">{{item.shop_name}}</view>
							<view class="status">{{ item.order_status | order_status_filter }}</view>
						</view>
						<block v-for="(it, ind) in item.goods_list" :key="ind">						
							<navigator :url="'/pages/features/order/orderDetail/orderDetail?code=' + item.order_code" class="picBox flex  flex_center">
								<!-- <view class="picBox flex  flex_center" >						 -->
								<image :src="it.skus_img" mode="aspectFill" class="avatar" lazy-load="true"></image>
								<view class="f1" style="height: 150rpx;">
									<view class=" cm_title   name cm_ellipsis2 tui-skeleton-fillet">{{ it.goods_title }}</view>
									<view class="cm_des flex flex_center" style="justify-content: flex-start;">
										<!-- <tui-tag shape="circle" size="mini" type="gray" class=" stags">{{ it.skus_name }}</tui-tag> -->
										<text>{{ it.skus_name }}</text>
									</view>
									<view class=" tui-skeleton-fillet flex flex_center" style="margin-top: 10rpx;">
										<text class="cm_prize cm_t_32">￥{{ it.alone_price }}</text>
										<view class="f1"></view>
										<tui-icon name="shut" :size="14" color="#999"></tui-icon>
										<text class="cm_des">{{ it.goods_num }} </text>
									</view>
								</view>
								<!-- </view> -->
							</navigator>
						</block>
						
						<view v-if="item.ems_price" class=" tui-skeleton-fillet flex flex_center cm_bdb" style="height: 80rpx;">
							<view class="f1"></view>
							<view class="cm_des">邮费：{{ item.ems_price?'￥'+item.ems_price:'包邮' }}</view>
						</view>
						<!-- <view class=" tui-skeleton-fillet flex flex_center cm_bdb" style="height: 80rpx;">
							<view class="f1">服务费用：</view>
							<view class="">{{ '￥'+item.service_total_price }}</view>
						</view> -->
						<view class=" tui-skeleton-fillet flex flex_center " style="height: 80rpx;">
							<view class="f1"></view>
							<view class="cm_des">共 {{ item.goods_num }} 件商品</view>
							<view  style="margin-left: 24rpx;">合计：<text class=" cm_t_32 cm_prize" >￥{{ item.pay_price }}</text></view>
						</view>
						<view class="flex flex_center  ">
							<view class="f1"></view>
							<button class="cm_tags primary" size="mini" v-if="item.order_status == 0" @tap="_href(item.order_code)">立即付款</button>
							<button class="cm_tags" size="mini" v-if="item.order_status == 0" @tap="_cancel(item.order_code)">取消订单</button>
							<button class="cm_tags primary" size="mini" v-if="item.order_status == 1" @tap="prompt(item.order_code)">提醒发货</button>
							<button class="cm_tags primary" size="mini" v-if="item.order_status == 2" @tap="sure(item.order_code)">确认收货</button>
							<button class="cm_tags primary" size="mini" v-if="item.order_status == 2" @tap="scan(item.order_code)">查看物流</button> 
							<!-- <button class="cm_tags" v-if="item.order_status!=5 && item.order_status!=9&& item.order_status!=0" @tap="refund(item)" >退货退款</button> -->
						</view>
					</view>
				</block>
				<LoadMore :status="loadStatus" />
			</view>
			<view class="flex flex_center" style="width: 100%;height: 90vh;" v-else>
				<tui-tips :fixed="false" imgUrl="/static/img/toast/img_noorder_3x.png">暂无订单</tui-tips>
			</view>

			<!-- <tui-modal :show="modal2" @click="handleClick" @cancel="hide" content="确定退出登录吗？" :maskClosable="false" color="#333" :size="32"></tui-modal> -->
		</scroll-view>
	</view>
</template>

<script>
import { mapState } from 'vuex';
import tuiTips from '@/components/extend/tips/tips';
export default {
	data() {
		return {
			
			baseKey: 'GetOrderList',
			loadStatus: 'more',
			formParams: {
				order_status: '',
				pageIndex: 1,
				pageSize: 10
			},
			onBottom: false,
			onTop: false,
			ifLoad:false,
			currentItem: '' //记录当前操作的item
		};
	},
	computed: mapState(['hasLogin']),
	components: {
		tuiTips
	},
	props: {
		//点击遮罩 是否可关闭
		order_status: {
			type: String,
			default: ''
		}
	},
	created() {
		this.formParams.order_status = this.order_status ? this.order_status : '';
		this._getList('refresh');
	},
	methods: {
		_getListAfter(){
			this.ifLoad = true
		},
		// 跳转
		_href(code) {
			uni.navigateTo({
				url: '/pages/features/order/orderDetail/orderDetail?code=' + code
			});
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

		refresh() {			
			this.formParams.pageIndex = 1;
			this._getList('refresh', () => {
				uni.stopPullDownRefresh();
			});
		},
		loadMore() {
			if (this.loadStatus != 'more') {
				return;
			}
			this.formParams.pageIndex += 1;
			this.loadStatus = 'loading';
			this._getList('more', () => {});
		},
		// 查看物流
		scan(code) {
			uni.navigateTo({
				url: '/pages/features/ems/ems?orderCode=' + code
			});
		},
		// 发起退款
		refund(item) {
			// let  data = {
			// 	action:'refund',
			// 	code:code
			// }
			// this.$emit('refund',item)
			this.$store.commit('currenPro', item);
			uni.navigateTo({
				url: '/pages/features/refundAction/refundAction'
			});
		},
		// 发起退款
		sure(code) {
			// let  data = {
			// 	action:'sure',
			// 	code:code
			// }
			this.$emit('sure', code);
		},
		// 取消订单
		_cancel(code) {
			this.$emit('cancel', code);
		}
	}
};
</script>

<style lang="scss" scoped>
.page {
	width: 100%;
	height: calc(100vh - 160rpx);
	overflow-y: scroll;
	padding: 20rpx;
	.proItemsBox{
		border-radius: 16rpx;
		overflow: hidden;
	}
}
</style>
