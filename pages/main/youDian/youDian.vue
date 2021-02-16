<template>
	<view class="pages">
		<view v-if="list.length>0">
			<view class="hot">
				<block v-for="(item, index) in list" :key="index">
					<view class="proItemsBox ">
						<view class="picBox flex  flex_center">
							<image :src="item.shop_logo" mode="aspectFill" class="avatar"></image>
							<view class="f1">
								<view class=" cm_title   name">{{item.shop_name}}</view>
								<!-- <view class="flex cm_t_24 text flex_center">
									等级:
									<image :src="item.shop_level_icon.icon" mode="" style="width: 20rpx;height: 20rpx;margin: 0 10rpx;"></image>
									{{item.shop_level_icon.level}} <text class="f1"></text>
								</view> -->
							</view>
							<navigator :url="'/pages/main/store/store?shopCode='+item.business_code" class=" jd">
								进店逛逛
							</navigator>
							<!-- <button class=" jd">进店逛逛</button> -->
						</view>
						<view class="contentBox flex flex_center" style="justify-content: space-between;">
							<block v-for="(item2, index2) in item.list" :key="index2">
								<view class="products">
									<image class="pics" :src="item2.goods_main_img.split(',')[0]" mode="widthFix"></image>
									<view class=" bottom">现价 {{item2.project_raise_price}}元</view>
								</view>
							</block>
							<!-- <view class="products">
							<image class="pics" src="http://b-ssl.duitang.com/uploads/item/201811/20/20181120204138_irzdb.jpg" mode="widthFix"></image>
							<view class=" bottom">当前价格 150</view>
						</view>
						<view class="products">
							<image class="pics" src="http://b-ssl.duitang.com/uploads/item/201811/20/20181120204138_irzdb.jpg" mode="widthFix"></image>
							<view class=" bottom">当前价格 150</view>
						</view> -->
						</view>
					</view>
				</block>
			</view>
			<LoadMore :status="loadStatus" />
		</view>
		<view class="flex flex_center" style="width: 100%;height: 90vh;" v-else>
			<tui-tips :fixed="false" imgUrl="/static/img/toast/img_noorder_3x.png">暂无商品</tui-tips>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	import tuiTips from "@/components/extend/tips/tips"
	export default {
		data() {
			return {
				list: [],
				formParams: {
					"pageIndex": 1,
					"pageSize": 10,
				},
				loadStatus: 'more'
			};
		},
		computed: mapState(['hasLogin']),
		onLoad(options) {
			// console.log(options)
			// type==1 精选  type==2 捡漏
			this._loadData('refresh')
		},
		// 下拉刷新
		onPullDownRefresh() {
			this.formParams.pageIndex = 1;
			this.list = []
			this._loadData('refresh', () => {
				uni.stopPullDownRefresh();
			})
		},
		// 上拉加载
		onReachBottom() {
			if (this.loadStatus == 'noMore') {
				return;
			}
			this.formParams.pageIndex += 1;
			this.loadStatus = 'loading'
			this._loadData('more', () => {
				// this.loadStatus = 'more'
			})
		},
		components: {
			tuiTips
		},
		methods: {
			imageLoad(index) {
				this.$set(this.list[index], 'load', true);
			},
			loadError(index) {
				// console.log('图片未找到');
				this.list[index].goods_picture = '/static/img/noPic.jpg';
			},
			// 热门推荐
			async _loadData(type, callback) {
				let that = this
				try {
					if (type == 'refresh') {
						// this.$ui.showloading()
					} else {
						that.loadStatus = 'loading'
					}

					let res = await this.$api.GetMerchantList(this.formParams);

					if (type == 'refresh') {
						// this.$ui.hideloading()
					} else {
						// that.loadStatus = 'loading'
					}
					if (res.result==1) {

						if (type == 'refresh') {
							// 刷新
							that.loadStatus = 'more'
							that.list = res.data.rows
						} else {
							// console.log(res.data.rows.length)
							// 更多
							if (res.data.rows.length == 0) {
								that.loadStatus = 'noMore'
							} else {
								let arr = that.list.concat(res.data.rows);
								that.list = arr;
								that.loadStatus = 'more'
							}

						}


					} else {
						that.$ui.toast(res.msg)
					}
				} catch (err) {
					console.log('请求结果false : ' + err)
				}
				// this.loadModal = false;
				// this.$ui.hideloading();
				if (callback) callback()
			},
		}
	};
</script>

<style lang="scss" scoped>
	.pages {
		.proItemsBox {
			width: 100%;
			height: 384rpx;
			background: #fff;
			margin-bottom: 16rpx;
			padding: 24rpx 20rpx;

			.picBox {
				width: 100%;
				height: 90rpx;
				line-height: 90rpx;

				.avatar {
					width: 90rpx;
					height: 90rpx;
					border-radius: 50%;
					margin-right: 20rpx;
					overflow: hidden;

					img {
						width: 90rpx;
						height: 90rpx;
					}
				}

				.name {
					margin-bottom: 16rpx;
				}

				.jd {
					width: 152rpx;
					line-height: 58rpx;
					height: 58rpx;
					border: none;
					background: var(--cl_primary);
					color: #fff;
					text-align: center;
					padding: 0;
					font-size: 26rpx;
					border-radius: 8rpx;
				}
			}

			.contentBox {
				width: 100%;
				justify-content: space-between!important;
				margin-top: 20rpx;

				.products {
					width: calc((100% - 72rpx) / 3);
					background: #eee;
					height: 226rpx;
					overflow: hidden;
					border-radius: 10rpx;
					position: relative;

					.pics {
						width: 100%;
						height: 100%;
					}

					.bottom {
						position: absolute;
						left: 0;
						bottom: 0;
						width: 100%;
						line-height: 54rpx;
						color: #fff;
						background: rgba(0, 0, 0, 0.8);
						font-family: 26rpx;
						text-align: center;
					}
				}
			}

			&:last-child {
				margin-bottom: 0;
			}
		}
	}
</style>
