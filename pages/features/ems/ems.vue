<template>
	<view class="">
		<tui-skeleton v-if="skeletonShow" backgroundColor="#f9f9f9" skeletonBgColor="#efefef" borderRadius="0rpx"></tui-skeleton>
		<view class="pages tui-skeleton" >
			<view v-if="emsMsg">
				<view class="tui-order-header">
					<view class="tui-text tui-skeleton-fillet">物流状态：
						<text class="tui-bold">{{emsMsg.deliverystatus | status}}</text>
					</view>
					<view class="tui-text tui-skeleton-fillet">订单编号：
						<text class="tui-bold">{{emsMsg.number}}</text>
					</view>
					<view class="tui-text tui-skeleton-fillet">更新时间：
						<text class="tui-bold">{{emsMsg.updateTime}}</text>
					</view>
				</view>
				
				<view class="flex flex_center emsCompany tui-skeleton-rect">
					<image :src="emsMsg.logo" mode="aspectFit" class="logo" style="width: 120rpx;height: 120rpx"></image>
					<view class="f1">
						<view class="tui-text tui-bold">{{emsMsg.expName}}</view>
						<view class="cm_text">网址: {{emsMsg.expSite}}</view>
						<view class="cm_text">电话: {{emsMsg.expPhone}}</view>
					</view>
				</view>
				
				<view class="tui-order-tracking tui-skeleton-rect">
					<tui-time-axis v-if="emsMsg.list.length">
						<tui-timeaxis-item bgcolor="none" v-for="(item,index) in emsMsg.list " :key="index">
							<template v-slot:node>
								<view class="tui-node tui-bg-primary">
									<!-- <tui-icon name="check" color="#fff" :size="14" :bold="true"></tui-icon> -->
									<image v-if="index==0" src="../../../static/img/wl_xz.png" mode="aspectFit" style="width: 30rpx;height: 30rpx;"></image>
									<text v-else style="width: 20rpx;height:20rpx;border-radius: 50%;background: #ebebeb;"> </text>
								</view>
							</template>
				
							<template v-slot:content>
								<view>
									<view class="tui-order-desc" :style="{'color':index==0?'#333':'#999'}">{{item.status}}</view>
									<view class="tui-order-time tui-gray" :style="{'color':index==0?'#333':'#999'}">{{item.time}}</view>
								</view>
							</template>
						</tui-timeaxis-item>
					</tui-time-axis>
					<view v-else style="padding: 40rpx 0;text-align: center;"> 暂无物流反馈，请耐心等候</view>
				</view>
				<view style="padding: 40rpx 20rpx;">
					<tui-button type="primary" shape="circle" :disabled="false" :loading="false" @tap="call(emsMsg.courierPhone)"><text
						 class="cm_title">联系承运人（{{emsMsg.courierPhone}}）</text></tui-button>
				</view>
			</view>
	
			<view  class="flex flex_center" style="width: 100%;height: 90vh;" v-else>
				<tui-tips :fixed="false" imgUrl="/static/img/toast/img_noorder_3x.png">暂无物流信息</tui-tips>
			</view>
			
			

		</view>
	</view>
</template>

<script>
	// import tuiSkeleton from '@/components/tui-skeleton/tui-skeleton';
	import tuiIcon from "@/components/icon/icon"
	import tuiTimeAxis from "@/components/time-axis/time-axis"
	import tuiTimeaxisItem from "@/components/timeaxis-item/timeaxis-item"
	import tuiTips from "@/components/extend/tips/tips"
	export default {
		data() {
			return {
				formParams: {
					order_code: ''
				},
				emsMsg: '',
				skeletonShow: true,
			};
		},
		onLoad(options) {
			this.formParams.order_code = options.orderCode;
			// console.log(this.formParams.order_code)
			this.initData()
		},
		filters: {
			status(val) {
				val = parseInt(val)
				let t
				switch (val) {
					case 0:
						t = '已揽件'
						break;
					case 1:
						t = '在途中'
						break;
					case 2:
						t = '正在派件'
						break;
					case 3:
						t = '已签收'
						break;
					case 4:
						t = '派送失败'
						break;
					case 5:
						t = '疑难件'
						break;
						t = '推荐签收'
						break;
					default:
						break;
				}
				return t
			}
		},
		components: {
			tuiIcon,
			tuiTimeAxis,
			tuiTimeaxisItem,
			// tuiSkeleton,
			tuiTips
		},
		methods: {
			call(num) {
				if (!num) {
				
					that.$ui.toast('没有联系人信息')
					return
				}

				let that = this
				// console.log(phone)
				uni.showModal({
					title: '小贴士提醒你',
					content: '立即致电？',
					success: function(res) {
						that.show = false;
						if (res.confirm) {
							uni.makePhoneCall({
								phoneNumber: num //仅为示例
							});
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			async initData() {
				let that = this;
				// this.$ui.showloading();
				let res = await this.$api.GetEMS(this.formParams, false);
				// this.$ui.hideloading();
				if (res.result==1) {
					that.emsMsg = res.data.result
					if (that.skeletonShow) {
						that.skeletonShow = false;
					}
				} else {
					that.$ui.toast(res.msg)
					if (that.skeletonShow) {
						that.skeletonShow = false;
					}
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.pages {
		.emsCompany {
			padding: 20rpx;
			height: 160rpx;
			width: 100%;
			// border-radius: 100rpx;
			margin-top: 16rpx;
			background: #fff;

			.logo {
				margin-right: 30rpx;
				border-radius: 50%;

			}
		}

		.tui-order-header {
			padding: 30rpx;
			box-sizing: border-box;
			background: #fff;
			margin-top: 16rpx;
		}

		.tui-text {
			font-size: 28rpx;
			color: #333;
			padding: 4rpx;
		}

		.tui-bold {
			font-weight: bold;
		}

		.tui-node {
			// background: #ddd;
			height: 44rpx;
			width: 44rpx;
			border-radius: 50%;
			display: flex;
			align-items: center;
			justify-content: center;
			color: #fff;
			padding-top: 0;
		}

		.tui-node-small {
			height: 16rpx !important;
			width: 16rpx !important;
		}

		.tui-bg-primary {
			// background: #5677fc !important;
		}

		.tui-order-tracking {
			padding: 30rpx 30rpx 30rpx 40rpx;
			background: #fff;
			margin-top: 16rpx;
			box-sizing: border-box;
		}

		.tui-order-title {
			color: #333;
			font-weight: bold;
			font-size: 32rpx;
			font-family: "microsoft yahei";
		}

		.tui-order-desc {
			font-size: 28rpx;
			color: #999;
			padding: 12rpx 0;
			line-height: 1.2;
		}

		.tui-ptop {
			display: flex;
			justify-content: flex-start;
			line-height: 28rpx;
		}

		.tui-order-time {
			font-size: 24rpx;
			// font-weight: bold;
		}

		.tui-gray {
			color: #848484 !important;
		}

		.tui-light-gray {
			color: #888 !important;
		}

		.tui-primary {
			color: #5677fc;
		}
	}
</style>
