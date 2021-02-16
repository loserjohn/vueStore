<template>
	<view class="page">
		<!-- <scroll-view class="page" scroll-y="true"  @scrolltolower="loadMore"> -->
		<view v-if="lists.length > 0">
			<block v-for="(item, index) in lists" :key="index">
				<view class="proItemsBox ">
					<view class="cm_bdb flex  flex_center proItemTop">
						<image :src="item.shop_logo" mode="" class="shopIcon"></image>
						<view class="cm_title f1">{{ item.shop_name }}</view>
						<tui-icon name="arrowright" :size="16"></tui-icon>
					</view>

					<!-- 	<block v-for="(it, ind) in item.project_list" :key="ind">-->				
					<navigator :url="'/pages/features/refundDetail/refundDetail?code=' + item.refund_code" class="picBox flex  flex_center"> 
						<!-- <view class="picBox flex  flex_center"> -->
							<image :src="item.skus_img" mode="aspectFill" class="avatar" lazy-load="true"></image>
							<view class="f1" style="height: 150rpx;">
								<view class=" cm_title   name cm_ellipsis2 tui-skeleton-fillet">{{ item.goods_name }}</view>
								<view class="cm_des flex flex_center" style="justify-content: flex-start;">
									<!-- <tui-tag shape="circle" size="mini" type="gray" class=" stags">{{ item.goods_sku }}</tui-tag> -->
									<text>{{ item.goods_sku }}</text>
								</view>
								<view class=" tui-skeleton-fillet flex flex_center" style="margin-top: 10rpx;">
									<text class=" ">退款金额:{{ item.apply_price }}</text>
									<view class="f1"></view>
									<view style="color: red;">
											{{ item.refund_type | refund_type_filter}}	
									</view>
								</view>
							</view>
						<!-- </view> -->
					</navigator>
					<!--</block> -->

					<view class="graybar ">{{ item.audit_status | audit_status_filter }}</view>

					<view class="flex flex_center contentBox ">
						<view class="f1"></view>
						<button class="cm_tags" size="mini"   v-if="item.audit_status!=4 && item.audit_status!=5&& item.audit_status!=0 " @tap="_cancel(item.refund_code,item.refund_type)">撤销退款</button>
						<button class="cm_tags primary" size="mini" v-if="item.audit_status == 3" @tap="_href(item.refund_code)">我要寄件</button>
						<button class="cm_tags " size="mini" v-if="item.audit_status == 1" @tap="scan(item.ems_number)">查看物流</button>
						<button class="cm_tags primary" size="mini" v-if="item.audit_status == 2" @tap="edit(item.refund_code)">再次发起退款</button>
						<!-- <button class="cm_tags primary" size="mini"  @tap="progress(item.refund_code)">退款进度</button> -->
						<button class="cm_tags " size="mini" v-if="item.audit_status==4 ||item.audit_status==5"  @tap="deleted(item.refund_code)">删除订单</button>
					</view>
				</view>
			</block>
			<LoadMore :status="loadStatus" />
		</view>
		<view class="flex flex_center" style="width: 100%;height: 90vh;" v-else>
			<tui-tips :fixed="false" imgUrl="/static/img/toast/img_noorder_3x.png">暂无订单</tui-tips>
		</view>

	</view>
</template>

<script>
import { mapState } from 'vuex';
import tuiTips from '@/components/extend/tips/tips';
export default {
	data() {
		return {
			loadStatus: 'more',
			formParams: {
				   "order_status": "2",// 2-待退款 3-已退款
				    "pageIndex":1,//页
				    "pageSize": 10//条
			},
			hasRow: 'rows',
			baseKey: 'GetRefundOrderList',
			onBottom: true,
			onTop: true,
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
		// this.formParams.order_status = this.order_status?this.order_status:''
		this._getList('refresh');
		let that= this
		uni.$on('refresh_refundList',()=>{
			that._getList('refresh')
		})
	},

	methods: {
		// 重新编辑
		edit(code){
			// uni.navigateTo({
			// 	url:'/pages/features/refundDetail/refundDetail?code=' + code
			// })	
			
			this.$store.commit('currenPro',{refund_code:code} );
			uni.navigateTo({
				url:'/pages/features/refundApply/refundApply?type=3'
			})		
		},
		// 跳转
		_href(code) {
			uni.navigateTo({
				url: '/pages/features/refundEms/refundEms?code=' + code
			});
		},
		// 查看进度
		progress(code){
			uni.navigateTo({
				url: '/pages/features/refundProgress/refundProgress?code=' + code
			});
		},
		// 家在数据
	// 	async _getList(type, callback) {
	// 		let that = this;
	// 		try {
	// 			if (type == 'refresh') {
	// 				this.formParams.pageIndex = 1;
	// 				this.list = [];
	// 			} else {
	// 				that.loadStatus = 'loading';
	// 			}
	// 			// console.log(JSON.stringify(this.formParams))
	// 			let res = await this.$api.GetRefundOrderList(this.formParams);
	// 			// console.log(JSON.stringify(res))
	// 			if (type == 'refresh') {
	// 				// this.$ui.hideloading()
	// 			} else {
	// 				// that.loadStatus = 'loading'
	// 			}
	// 			if (res.result==1) {
	// 				if (type == 'refresh') {
	// 					// 刷新
	// 					that.loadStatus = 'more';
	// 					that.list = res.data.rows;
	// 					if (res.data.Total < that.formParams.pageSize) {
	// 						that.loadStatus = 'noMore';
	// 					}
	// 				} else {
	// 					// console.log(res.data.rows.length)
	// 					// 更多
	// 					if (res.data.rows.length == 0) {
	// 						that.loadStatus = 'noMore';
	// 					} else {
	// 						let arr = that.list.concat(res.data.rows);
	// 						that.list = arr;
	// 						that.loadStatus = 'more';
	// 					}
	// 				}
	// 			} else {
	// 				that.$ui.toast(res.msg);
	// 			}
	// 		} catch (err) {
	// 			console.log('请求结果false : ' + err);
	// 		}
	// 		// this.loadModal = false;
	// 		// this.$ui.hideloading();
	// 		if (callback) callback();
	// 	},
	
		// 查看物流
		scan(code) {
			uni.navigateTo({
				url: '/pages/features/ems/ems?orderCode=' + code
			});
		},
		
		// 取消订单
		async _cancel(code,type) {
			let that = this;
			try {
				that.$ui.showloading()
				let res;
				if(type==1){
					res = await this.$api.CancelRefundGoods({ refund_code:code });
				}else if(type==0){
					res = await this.$api.CancelRefundMoney({ refund_code:code });
				}
				
				that.$ui.hideloading()
				if (res.result==1) {
			
					that.$ui.toast('撤销成功')
					that._getList('refresh')
	
				} else {
					that.$ui.toast(res.msg)
				}
			} catch (err) {
				console.log('请求结果false : ' + err);
			}
			
		},
		//删除订单
		async deleted(code){
			let that = this;
			try {
				that.$ui.showloading()
				let res = await this.$api.DelectRefund({ refund_code:code });
				that.$ui.hideloading()
				if (res.result==1) {			
					that.$ui.toast('删除成功')
					that._getList('refresh')
	
				} else {
					that.$ui.toast(res.msg)
				}
			} catch (err) {
				console.log('请求结果false : ' + err);
			}
		},
	}
};
</script>

<style lang="scss" scoped>
.page {
	width: 100%;
	height: calc(100vh - 72rpx);
	overflow-y: scroll;

	.proItemsBox {
		width: 100%;
		// height: 384rpx;
		background: #fff;
		margin-bottom: 16rpx;
		padding: 24rpx 20rpx;
		.shopIcon {
			width: 36rpx;
			height: 36rpx;
			border-radius: 50%;
			margin-right: 8rpx;
		}
		.picBox {
			width: 100%;
			// height: 90rpx;
			line-height: 90rpx;

			.avatar {
				width: 150rpx;
				height: 150rpx;
				border-radius: 10rpx;
				margin-right: 20rpx;
				overflow: hidden;

				img {
					width: 150rpx;
					height: 150rpx;
				}
			}
			.stags {
				font-size: 20rpx;
			}
			.name {
				font-size: 28rpx;
				max-height: 80rpx;
				line-height: 1.4;
				margin-top: 6rpx;
			}

			.jd {
				width: 152rpx;
				line-height: 58rpx;
				height: 58rpx;
				border: none;
				background: var(--cl_primary);
				color: #333;
				text-align: center;
				padding: 0;
				font-size: 26rpx;
				border-radius: 8rpx;
			}
		}
		.graybar{
			background: #f1f1f1;
			border-radius: 10rpx;
			text-align: center;
			height: 100rpx;
			line-height: 100rpx;
		}
		.contentBox {
			justify-content: flex-end !important;
			// margin-top: 20rpx;
			// padding-top: 24rpx;
			// border-top: 1rpx solid #e5e5e5;

			.cm_tags {
				margin-left: 16rpx;
			}
		}

		&:last-child {
			margin-bottom: 0;
		}
	}
}
</style>
