<template>
	<view class="pages">
		
		<tui-sticky :scrollTop="scrollTop" stickyHeight="88rpx" ref="sticky">
			<template v-slot:header>
				<view style="width: 100%;background: #fff;">
					<scroll-view scroll-x scroll-with-animation class="tab-view" :scroll-left="scrollLeft">
						<view v-for="(item, index) in tabs" :key="index" class="tab-bar-item" :class="[currentTab == index ? 'active' : '']" :data-current="index" :data-code="item.value" @tap.stop="swichNav">
							<text class="tab-bar-title">{{ item.label }}</text>
						</view>
					</scroll-view>
					<xhFilterTab @tabChange="tabChange"></xhFilterTab>
				</view>
				
			</template>
			<template v-slot:content>			
				<view v-if="lists.length > 0" >
					<view class="hotItemBar flex flex_around">
						<block v-for="(item, index) in lists" :key="index">
							<navigator :url="'/pages/main/details/details?code=' + item.goods_code" class="proItemsBoxBlock">
								<view class="picBox">
									<image
										@load="imageLoad(index)"
										@error="loadError(index)"
										lazy-load="true"
										:src="item.goods_main_img"
										mode="aspectFill"
										class="pre animated"
										:class="item.load ? 'fadeIn' : ''"
									></image>
								</view>
					
								<view class="msgBox">
									<!-- <view class="flex flex_center" style="padding: 6px 0;"> -->
					
									<view class=" cm_ellipsis2  " style="line-height: 1.3;">
										<text class="tags" v-if="item.is_flashsale == 1">限时抢购</text>
										{{ item.goods_title }}
									</view>
									<!-- </view> -->
									<view class="cm_prize" style="margin-top: 20rpx;">￥{{ item.goods_price }}</view>
									<view class="cm_des" style="margin-top: 20rpx;">{{ item.buy_count }}人购买</view>
								</view>
							</navigator>
						</block>
					</view>
					<LoadMore :status="loadStatus" style="width: 100%;"/>
				</view>
				<view class="flex flex_center" style="width: 100%;height: 90vh;" v-else>
					<tui-tips :fixed="false" imgUrl="/static/img/toast/img_noorder_3x.png">暂无商品</tui-tips>
				</view>
			</template>
		</tui-sticky>
		<!--header-->
	</view>
</template>

<script>
import xhFilterTab from '@/components/xhFilterTab/xhFilterTab';
import tuiSticky from '@/components/tui-sticky/tui-sticky';
// import tuiTips from '@/components/extend/tips/tips';
// import tuiTabs from '@/components/tui-tabs/tui-tabs';
export default {
	components: {
		xhFilterTab,
		tuiTips,
		tuiSticky,
		tuiTabs
	},
	data() {
		return {
		
			proDropIndex: -1,
			dropShow: false,
			scrollTop: 0,
			formParams: {
				  "key": "",//关键字
				  "type": "0",//0-综合 1-热销 2-价格 
				  "sort": "desc",//asc-升序 desc-降序  
				  "class_code": "",
				  "pageIndex": 1,//分页：页面索引，第几页
				  "pageSize": 10//分页：页面大小，每页几条
			},
			onBottom: true,
			onTop: true,
			dropdownShow: false,
			popupShow: false,
			tabs: [],
			currentTab: 0,
			scrollLeft: 0
		};
	},
	//页面滚动执行方式
	onPageScroll(e) {
		this.scrollTop = e.scrollTop;
	},

	// 下拉刷新
	// onPullDownRefresh() {
	// 	this.formParams.pageIndex = 1;
	// 	this.list = [];
	// 	this._getList('refresh', () => {
	// 		uni.stopPullDownRefresh();
	// 	});
	// },
	// // 上拉加载
	// onReachBottom() {
	// 	if (this.loadStatus == 'noMore') {
	// 		return;
	// 	}
	// 	this.formParams.pageIndex += 1;
	// 	this.loadStatus = 'loading';
	// 	this._getList('more');
	// },
	onLoad(options) {
		// console.log(options)
		// type==1 精选  type==2 捡漏
		this.currentTab = options.type? options.type:0
		
		this.init();
	},
	methods: {
		async init(type) {
			let that = this;
			try {
				let res = await this.$api.crm_getHome()
				if(res.result==1){
					that.tabs = res.data.tree_class		
					that.formParams.class_code = that.tabs[this.currentTab].value;
					// console.log( that.formParams)
					that._getList('refresh');
				}else{
					this.$refs.uToast.show({
						title: res.msg,
						type: 'error',
						position: 'center',
					})
				}
			} catch (err) {
				console.log('请求结果false : ' + err);
				that.pageLoading = false
			}
		},
		// 分类加载
	
		// 切换筛选
		tabChange(data) {
			if (this.formParams.sort == data.sort || this.formParams.type == data.type ) {
				this.formParams.sort = data.sort;
				this.formParams.type = data.type;
				this._getList('refresh');
			}
		},
		// 滚动切换标签样式
		switchTab: function(e) {
			let that = this;
			this.currentTab = e.detail.current;
			this.checkCor();
		},
		// 点击标题切换当前页时改变样式
		swichNav: function(e) {
			// console.log(item)
			let cur = e.currentTarget.dataset.current;
			let code = e.currentTarget.dataset.code
			if (this.currentTab == cur) {
				return false;
			} else {
				this.currentTab = cur;
				this.formParams.class_code = code
				this.checkCor();
				this._getList('refresh')
			}
		},
		//判断当前滚动超过一屏时，设置tab标题滚动条。
		checkCor: function() {
			if (this.currentTab > 3) {
				//这里距离按实际计算
				this.scrollLeft = 300;
			} else {
				this.scrollLeft = 0;
			}
		},
	
	}
};
</script>

<style lang="scss" scoped>
.pages {
	.tab-view::before {
		content: '';
		position: absolute;
		border-bottom: 1rpx solid #eaeef1;
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
		bottom: 0;
		right: 0;
		left: 0;
	}

	.tab-view {
		width: 100%;
		height: 80rpx;
		overflow: hidden;
		box-sizing: border-box;
		// position: fixed;
		// top: 0;
		/* #ifdef H5 */
		// top: 44px;
		/* #endif */
		left: 0;
		// z-index: 99;
		background: #fff;
		white-space: nowrap;
	}

	.tab-bar-item {
		padding: 0;
		height: 80rpx;
		min-width: 80rpx;
		line-height: 80rpx;
		margin: 0 28rpx;
		display: inline-block;
		text-align: center;
		box-sizing: border-box;
	}

	.tab-bar-title {
		height: 80rpx;
		line-height: 80rpx;
		font-size: 32rpx;
		color: #999;
		font-weight: 400;
	}

	.active {
		border-bottom: 6rpx solid #039798;
	}

	.active .tab-bar-title {
		color: #039798!important;
		font-size: 32rpx;
		// font-weight: bold;
	}

	.hotItemBar {
		width: 100%;
		flex-wrap: wrap;
		justify-content: space-between;
		padding: 0 20rpx;
		.proItemsBox {
			width: calc((100% - 56rpx) / 2);
			height: 532rpx;
			background: #fff;
			border-radius: 14rpx;
			margin-top: 16rpx;
			overflow: hidden;

			.picBox {
				width: 100%;
				height: 356rpx;
				position: relative;

				.pre {
					width: 100%;
					height: 347rpx;
					opacity: 0;
				}

				.timeBox {
					position: absolute;
					left: 0;
					bottom: -4rpx;
					width: 100%;
					height: 52rpx;
					line-height: 52rpx;
					background: $uni-color-error;
					color: #fff;
					text-align: center;
				}
			}

			.msgBox {
				padding: 16rpx;
				.tags {
					background: linear-gradient(to right, #EE7E33, #EA3333);;
					color: #fff;
					padding: 0 8rpx;
					border-radius: 4rpx;
					font-size: 20rpx;
					line-height: 28rpx;
					height: 28rpx;
					margin-right: 10rpx;
				}
				.cm_text {
					line-height: 64rpx;
					justify-content: flex-start;
				}

				.has {
					margin-top: 14rpx;
					padding: 0 16rpx;
					line-height: 36rpx;
					height: 36rpx;
					border-radius: 18rpx;
					font-size: 24rpx;
					background: #f7f7f7;
				}
			}
		}
	}
}
</style>
