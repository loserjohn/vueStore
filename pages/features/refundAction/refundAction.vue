<!-- 退款选项 -->

<template>
	<view class="pages">
	
		<view style="background: #fff;">
			<view class="proItemsBox  tui-skeleton-fillet" >
				<view class="picBox flex  flex_center tui-skeleton-fillet">
					<image v-if="item.skus_img  " :src="item.skus_img  " mode="aspectFill" class="avatar "></image>
					<view class="f1 " >
						<view class=" cm_title   name cm_ellipsis2 tui-skeleton-fillet">{{item.goods_title }}</view>
						
						<view class="cm_ellipsis2 cm_des "  >
							{{ item.skus_name }}
						</view>
						<view style="margin-top: 4rpx;color: #E56D00;" class="cm_des cm_ellipsis2  " v-if="item.goods_service">
							 {{item.goods_service_txt}}
						</view>
						<view class=" tui-skeleton-fillet flex flex_center" style="margin-top: 10rpx;"  >
							<text class="cm_prize cm_t_32">￥{{ item.alone_price }}</text>
							<view class="f1"></view>
							<tui-icon name="shut" :size="14" color="#999"></tui-icon>
							<text class="cm_des">	{{ item.goods_num }}</text>
						</view>
					</view>
				</view>			
			</view>
			<tui-list-view unlined="all" class="tui-list-view tui-skeleton-fillet" >
				<tui-list-cell class=" tui-skeleton-fillet flex flex_center cm_bdb">
					<view class="f1"></view>
					<!-- <view class="cm_des">共 {{ item.goods_num }} 件商品</view> -->
					<text class=" cm_t_32" style="margin-left: 24rpx;">商品金额：￥{{ currentPro.en_refund_price }}</text>
				</tui-list-cell>
			</tui-list-view>
		</view>
		
		
		<view class="box">
			<view class="flex flex_center cells cm_bdb" @click="_href(0)">
				<image src="../../../static/img/refund1.png" mode="aspectFill" class="avatar "></image>
				<view class="f1">
					<view style="line-height: 2;">我要退款（无需退货）</view>
					<view class="cm_des">没收到货，或与卖家协商同意不用退货只退款</view>
				</view>
				<tui-icon name="arrowright" :size="16"></tui-icon>
			</view>
			<view class="flex flex_center cells" @click="_href(1)">
				<image src="../../../static/img/refund2.png" mode="aspectFill" class="avatar "></image>
				<view class="f1">
					<view style="line-height: 2;">我要退货退款</view>
					<view class="cm_des">已收到货，需要退还收到的货物</view>
				</view>
				<tui-icon name="arrowright" :size="16"></tui-icon>
			</view>
		</view>
	
	</view>
</template>

<script>
import { mapState } from 'vuex';
import tuiListView from '@/components/list-view/list-view';
import tuiListCell from '@/components/list-cell/list-cell';
export default {
	data() {
		return {
			item: ''
		};
	},
	components: {
		tuiListCell,
		tuiListView
	},
	computed: {
		...mapState(['currentPro']),
		refundPrice() {
			return (this.item.alone_price * this.item.goods_num).toFixed(2);
		}
	},
	onLoad() {
		this.item = this.currentPro;
		// console.log('退款', this.item);
	},
	methods: {
		_href(k){
			uni.redirectTo({
				url:"../refundApply/refundApply?type="+ k 
			})
		}
	}
};
</script>

<style lang="scss" scoped>
.pages {
	.proItemsBox{
		margin-bottom: 0;
		padding-bottom: 0;
		.picBox{
			margin-bottom: 0;
		}
	}
	.itemBoxTop {
		padding: 24rpx 20rpx;
		padding-bottom: 0;
		background: #fff;
		.shopIcon {
			width: 56rpx;
			height: 56rpx;
			border-radius: 50%;
			margin-right: 14rpx;
		}
	}
	.box {
		margin-top: 20rpx;
		.cells {
			height: 142rpx;
			background: #fff;
			padding: 0 20rpx;
			.avatar {
				width: 78rpx;
				height: 78rpx;
				border-radius: 50%;
				margin-right: 24rpx;
			}
			&:active {
				background: #f1f1f1;
			}
		}
	}
}
</style>
