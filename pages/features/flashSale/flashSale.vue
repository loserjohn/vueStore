<template>
	<view>
		<tui-skeleton v-if="skeletonShow" backgroundColor="#f9f9f9" skeletonBgColor="#efefef" borderRadius="0rpx"></tui-skeleton>
		<view class="pages tui-skeleton">
			<!-- <view class="shopBox flex  flex_center ">
				<image :src="business.merchant_logo" mode="aspectFill" class="avatar tui-skeleton-rect"></image>
				<view class="f1 tui-skeleton-rect ">
					<view class="  name ">{{ business.merchant_name }}</view>			
				</view>
				<text class="">领取数量： {{business.receive_coupon_count}}</text>
			</view> -->
			<view class="header flex flex_center">
				<!-- <view class="btns flex flex_center"> -->
					<navigator url="" class="btns flex flex_center" open-type="navigateBack">
						<tui-icon name="arrowleft" color="#fff" :size="22"></tui-icon>
					</navigator>
				<!-- </view> -->
				<image src="../../../static/img/fslogo.png" mode="widthFix" class="fslogo"></image>
				<view class="btns"></view>
			</view>
			
			<view class="banners">
				<block v-for="(item,index) in list" :key="index">
					<view class="couponBox"  @tap="_nav(item.project_code)">
						<view class="flex flex_center couponTop ">
							<view class="f1 flex flex_center">
								<text class="">距离结束还有：</text>
								<CountCalc color="#FFFFFF" background-color="#333" border-color="#333" :show-colon="true" :show-day="false" 
								 :hour="restTimeValied(item.activity_end_time).h" :day="restTimeValied(item.activity_end_time).d" :minute="restTimeValied(item.activity_end_time).m" :second="restTimeValied(item.coupon_end_time).s"  />
								<text class="f1"></text>
							</view>
							<!-- <view class="cm_des" style="color: #999;">仅剩<text style="color: #EC6A33;">{{item.coupon_count}}</text>件</view> -->
						</view>
						<!-- {{item.coupon_end_time}} -->
						<view class="flex flex_center couponContent">
							<image :src="item.goods_main_img" mode="aspectFill" class="couponPic"></image>
							<view class="f1">
								<view class="cm_title cm_ellipsis2">{{item.goods_title}}</view>
								
								<view class="flex flex_center" style="margin-top: 20rpx;">
									<!-- <text class="cm_price">￥{{item.project_raise_price}}</text> -->
									<text class="cm_prize_delete ">原价:￥{{item.project_price}}</text>
									<text class="f1"></text>
									<text class="cm_des">仅剩:<text style="color: #EC6A33;">{{item.activity_sku}}</text>件</text>
								</view>
								<view class=" coupon flex flex_center">
									<!-- <image src="../../../static/img/cp.png" mode="scaleToFill" class="bg"></image> -->
									<view class="f1 redCoupon" >秒杀价：￥{{item.project_raise_price}}</view>
									<text style="color: #333;z-index: 1;padding: 0 20rpx;">去秒杀</text>
								</view>
							</view>
						</view>
						
					</view>
					
				</block>	
			</view> 
			<!-- <LoadMore :status="loadStatus" /> -->
		</view>
	</view>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import CountCalc from '@/components/uni-countdown.vue'
import tuiSkeleton from '@/components/tui-skeleton/tui-skeleton';
export default {
	data() {
		return {
			list:[],
			loadStatus: 'more',
			formParams:{
				   "key":"",
				    "type":"0",
				    "pageIndex":1,
				    "pageSize":10,
			},
			business: '',
			current: 0,
			skeletonShow: true,
			modal:false,
			searchword:''
		};
	},
	components: {
		tuiSkeleton,
		CountCalc
	},
	onLoad(options) {
		// console.log(options.shopCode);
		this.formParams.merchant_code = options.code;
		// alert(this.shopCode)
		this._loadData('refresh');
	},
	computed: {
		...mapState(['hasLogin']),		
	},

	// 下拉刷新
	onPullDownRefresh() {
		this.formParams.pageIndex = 1;
		this.list = [];
		this._loadData('refresh', () => {
			uni.stopPullDownRefresh();
		});
	},
	// 上拉加载
	onReachBottom() {
		if (this.loadStatus == 'noMore') {
			return;
		}
		this.formParams.pageIndex += 1;
		this.loadStatus = 'loading';
		this._loadData('more', () => {
			// this.loadStatus = 'more'
		});
	},
	methods: {
		_nav(code){
			if(!code)return;
			uni.navigateTo({
				url:'/pages/main/details/details?code='+ code
			})
		},
		restTimeValied(ts) {
			let t = ts
			// console.log( ts);
			if (!t) {
				return false
			}
			
			let s = new Date(t).getTime()
			
			let n = new Date().getTime();
		console.log( s);
			let date = s - n;
		
			let days = date / 1000 / 60 / 60 / 24;
			let daysRound = Math.floor(days);
			let hours = date / 1000 / 60 / 60 - (24 * daysRound);
			let hoursRound = Math.floor(hours);
			let minutes = date / 1000 / 60 - (24 * 60 * daysRound) - (60 * hoursRound);
			let minutesRound = Math.floor(minutes);
			let seconds = date / 1000 - (24 * 60 * 60 * daysRound) - (60 * 60 * hoursRound) - (60 * minutesRound);
			let secondsRound = Math.floor(seconds);
			let time = "倒计时" + (daysRound + "天" + hoursRound + "时" + minutesRound + "分" + secondsRound + "秒");
		
			let obj = {
				d:parseInt(daysRound),
				h: parseInt(hoursRound),
				m: parseInt(minutesRound),
				s: parseInt(secondsRound)
			}
			// 
			return obj
		},
		imageLoad(index) {
			this.$set(this.list[index], 'load', true);
		},
		loadError(index) {
			// console.log('图片未找到');
			this.list[index].goods_picture = '/static/img/noPic.jpg';
		},
		async _loadData(type, callback) {
			
			let that = this
			try {
				
				let res = await this.$api.LimitActivityGoods(this.formParams);
				console.log(res)
				
				if (res.result==1) {
					
					// that.business = res.data.merchant
					that.list =  res.data.rows
					console.log(that.list)
				} else {
					// plus.nativeUI.toast(res.msg)
				}
				
			} catch (err) {
				console.log('请求结果false : ' + err);
				
			}
			that.skeletonShow = false
			if (callback) callback()
		},
		handleClick(e) {
			let index = e.index;
			if (index === 0) {
				// this.tui.toast("你点击了取消按钮")			
			} else {
				// this.tui.toast("你点击了确定按钮")
				uni.navigateTo({
					url: '/pages/role/mmLogin/mmLogin'
				})						
			}
			this.modal = false
		},
	}
};
</script>

<style lang="scss" scoped>
.pages {
	background: url(../../../static/img/fsbg.jpg) 0 0 /contain no-repeat;
	.header{
		width: 100%;
		height: 88rpx;
		.btns{
			width: 88rpx;
			height: 88rpx;
		}
		.fslogo{
			width: 156rpx;
			height: 40rpx;
			margin: 0 auto;
			display: block;
		}
	}
	
	.shopBox {
		width: 100%;
		height: 112rpx;
		background: var(--cl_primary);
		padding: 0 16rpx;
		color: #fff;
		.avatar {
			width: 80rpx;
			height: 80rpx;
			border-radius: 50%;
			margin-right: 20rpx;
			overflow: hidden;
			border: 4rpx solid #fff;
			img {
				width: 94rpx;
				height: 94rpx;
			}
		}
		.name {
			// margin-bottom: 16rpx;
		}
	
	}
	.banners{
		padding: 20rpx;
		.couponBox{
			width: 100%;
			padding: 20rpx;
			background: #fff;
			border-radius: 10rpx;
			margin-bottom: 20rpx;
			.couponTop{
				// border-bottom: 1rpx solid #f2f2f2;
				// padding-bottom: 20rpx;
				// margin-bottom: 20rpx;
			}
			.couponContent{
				width: 100%;
				
				.couponPic{
					width: 240rpx;
					height: 240rpx;
					border-radius: 12rpx;
					overflow: hidden;
					margin-right: 20rpx;
				}
				.coupon{
					width: 100%;
					height: 44rpx;
					background: #FCD833;
					position: relative;
					font-size: 26rpx;
					margin-top: 20rpx;
					border-radius: 8rpx;
					overflow: hidden;
					.redCoupon{
						height: 44rpx;
						line-height: 44rpx;
						background: url(../../../static/img/fsbar.png)  0 0/100% 100%  no-repeat;
						color: #fff;
						padding-left: 32rpx;
					}
					.bg{
						width: 100%;
						height: 100%;
						position: absolute;
						z-index: 0;
						left: 0;
						top: 0;
					}
					.price{
						width: 60rpx;
						color: #E32013;
						z-index: 10;
					}
				}
				.cm_price{
						color: #E93F39;
						font-size: 30rpx;
						font-weight: 600;
				}
				.scan{
					width: 156rpx;
					height: 56rpx;
					text-align: center;
					line-height: 56rpx;
					border-radius: 28rpx;
					color: #fff;
					background:linear-gradient(45deg, #EC6A33, #E93F33); 
					font-size: 24rpx;
					&:active{
						transform: translate(2rpx,2rpx);
					}
				}
			}
			
		}
	}
}
</style>
