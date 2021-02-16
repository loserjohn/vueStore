<template>
	<view class="page flex_y flex_center">
		<view class="content">
			<view class="flex" style="align-items: center;">
				<view class="cm_title">最近搜索</view>
				<!-- <view class="tui-tag-small tui-tag-outline tui-gray-outline" style="margin-right: 16rpx;margin-top: 16rpx;"  @tap="_removeAll()">清除历史</view> -->
				<tui-tag padding="10rpx 16rpx" size="22rpx"  shape="circle" plain  type="black"  @tap="_removeAll()">清除历史</tui-tag>
				
			</view>
			
			<view class="labelBox flex" style="margin-bottom: 10rpx;" >
				<block v-for="(item, index) in localWordList" :key="index" v-if="index <= 6">
					<tui-tag  size="small"  type="white"  @tap="_choose(item)">{{ item }}</tui-tag>
				</block>
					
				<!-- <view class="cu-tag radius md latest bg-orange" @tap="_removeAll()" hover-class="cm_hover">清除历史</view> -->
			</view>
		</view>
		<view v-if="show" class="animated fadeIn"  >
			<!-- <view class="fixed" style="background: #fff;"><Filtrate noScroll @chooseSort="_chooseSort"></Filtrate></view> -->
			<view class="f1 " >
				<view class="mainContent">
					<!-- <view class="productList " > -->
					<view class="hotItemBar ">
						<block v-for="(item, index) in lists" :key="index">
							<navigator :url="'/pages/main/details/details?code=' + item.goods_code" class="proItemsBox flex flex_around">
								<!-- <view class="proItemsBox"> -->
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
								<view class=" f1 msgBox cm_bdb">				
									<view class=" cm_ellipsis2  " style="line-height: 1.3;">
											<!-- <text class="cm_t_20 tags" v-if="item.is_ems == 0">包邮</text> -->
											{{ item.goods_title }}
										</view>
									<!-- </view> -->
									<view class="cm_prize" style="margin-top: 10rpx;">￥{{ item.goods_price }}</view>
									<view class="cm_des" style="margin-top: 10rpx;">{{ item.buy_count  }}人购买</view>
								</view>
							</navigator>
						</block>
					</view>
					<LoadMore :status="loadStatus" />
				</view>
			</view>
		</view>
		<!-- <view v-else class="animated fadeIn">

		</view> -->
		<!-- <button @click="test">test</button> -->
	</view>
</template>

<script>
// import Filtrate from '@/components/filtrate.vue';
import tuiCountdown from "@/components/countdown/countdown"
export default {
	data() {
		return {
			StatusBar: this.StatusBar,
			CustomBar: this.CustomBar,
			sliderHeight: 64,
			// hotWordList: [],
			localWordList: [],
			list: [],
			show: false,

			// 筛选表单数据
			loadStatus: 'more',
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
		};
	},
	components: {
		tuiCountdown
	},
	filters: {
		parse: function(value) {
			return parseInt(value);
		}
	},

	computed: {
		
	},
	onLoad(options) {
		
		let that = this;
		let keyWord = options.keyword;
		// 初始化本地数据
		// this._initLocal();

		if (keyWord) {
			that.formParams.key = keyWord;
			// #ifdef APP-PLUS
			let webView = that.$mp.page.$getAppWebview();
			
			// 设置 searchInput的 text
			webView.setTitleNViewSearchInputText(keyWord);
			// #endif
			that._toSearch();
		}
		this._initLocal()
	},

	onNavigationBarSearchInputConfirmed(e) {
		let v = e.text;
		this.formParams.key = v;

		this._toSearch();
	},
	// 点击搜索框
	onNavigationBarSearchInputChanged(e) {
		// console.log("e: " + JSON.stringify(e));
		let v = e.text;
		this.formParams.key = v;

		if (!v) {
			this.show = false;
		}
	},
	onNavigationBarButtonTap(e) {
		// console.log(e.index);
		if (e.index === 0) {
			// 点击搜素
			// let webView = this.$mp.page.$getAppWebview();
			// // 设置 searchInput的 text
			// webView.setTitleNViewSearchInputText('');
			// this.formParams.key = '';
			// this.show = false;
			this._toSearch();
		} else {
			
			// 点击搜素
			this._toSearch();
		}
	},
	methods: {
	
		// 初始化本记录
		_initLocal() {
			let wordslist = uni.getStorageSync('localWords');
				// console.log(11+JSON.stringify(wordslist))
			wordslist = wordslist ? wordslist : [];
		
			this.localWordList = wordslist;
		},
		_removeAll() {
			uni.removeStorageSync('localWords');
			this.localWordList = [];
		},
		// 选择热刺
		_choose(text) {
			console.log(text)
			// #ifdef APP-PLUS
			let webView = this.$mp.page.$getAppWebview();
			// 设置 searchInput的 text
			webView.setTitleNViewSearchInputText(text);
			this.formParams.key = text;
			this._toSearch();
			// #endif
			this.formParams.key = text;
			this._toSearch();
		},
		_toSearch() {
			// alert(1)
			// #ifdef APP-PLUS
			plus.key.hideSoftKeybord();
			// #endif
			if (!this.formParams.key) {		
				this.$ui.toast( '请输入关键字')
				this.show = false;
				return;
			}
			
			this._getList()
			
			// 记录本地
			let list = uni.getStorageSync('localWords');
			let value = this.formParams.key;
			if (!list) {
				list = [];
			}

			if (list.indexOf(value) < 0) {
				list.unshift(this.formParams.key);
				this.localWordList = list;
				// console.log(list)
				uni.setStorageSync('localWords', list);
			}
		},
		_getListAfter(){
			this.show =  true
			// console.log(this.lists)
		}
		// 热门推荐
		// async _loadData(type, callback) {
		// 	let that = this;
		// 	try {
		// 		if (type == 'refresh') {
		// 			// this.$ui.showloading()
		// 		} else {
		// 			that.loadStatus = 'loading';
		// 		}

		// 		let res = await this.$api.GetGoodsList(this.formParams);

		// 		if (type == 'refresh') {
		// 			// this.$ui.hideloading()
		// 		} else {
		// 			// that.loadStatus = 'loading'
		// 		}
		// 		if (res.result==1) {
		// 			if (type == 'refresh') {
		// 				// 刷新
		// 				that.loadStatus = 'more';
		// 				that.list = res.data.rows;
		// 			} else {
		// 				// console.log(res.data.rows.length)
		// 				// 更多
		// 				if (res.data.rows.length == 0) {
		// 					that.loadStatus = 'noMore';
		// 				} else {
		// 					let arr = that.list.concat(res.data.rows);
		// 					that.list = arr;
		// 					that.loadStatus = 'more';
		// 				}
		// 			}
		// 		} else {
		// 			that.$ui.toast(res.msg)
		// 		}
		// 	} catch (err) {
		// 		console.log('请求结果false : ' + err);
		// 	}
		// 	// this.loadModal = false;
		// 	// this.$ui.hideloading();
		// 	if (callback) callback();
		// }
		// 排序
		// _chooseSort(t) {
		// 	this.list = [];
		// 	this.formParams.pageIndex = 1;
		// 	this.formParams.sort = t + '';
		// 	this._loadData();
		// },

		// // 特殊条跳转
		// _toDetail(item) {
		// 	// console.log(JSON.stringify(item))

		// 	uni.setStorageSync('currentCoupon', JSON.stringify(item));
		// 	uni.navigateTo({
		// 		url: '/pages/superSearch/currentCouponDetail/currentCouponDetail'
		// 	});
		// }
	}
};
</script>

<style lang="scss" scoped>
.page {
	.fixed {
		position: fixed;
		width: 100%;
		left: 0;
		top: 0;
		z-index: 100;

		.search {
			padding: 10rpx 0;

			.search-form {
				height: 68rpx;
				border-radius: 34rpx;
			}
		}
	}

	.content {
		box-sizing: border-box;
		padding:   20rpx;
		background: #fff !important;
		// height: 550rpx;
		margin-bottom: 20rpx;
		.cm_title {
			line-height: 1;
			margin-right: 20rpx;
			// margin-bottom: 20rpx;
		}
		.labelBox {
			flex-wrap: wrap;
			margin-top: 10rpx;
			.label {
				background: #fff;
				padding: 18rpx 38rpx;
				font-size: 24rpx;

				margin-right: 30rpx;
			}
			.active {
				background: #f4f4f4;
			}
			.latest {
				margin-bottom: 20rpx;
				padding: 0 18rpx;
				max-width: 120rpx;
				width: 120rpx;
				text-overflow: ellipsis;
				white-space: nowrap;
				overflow: hidden; 
			}
		}
	}

	.hotItemBar {
		width: 100%;
		flex-wrap: wrap;
		justify-content: space-between;
		.proItemsBox {
			width: 100%;
			// height: 532rpx;
			background: #fff;
			padding: 0 20rpx;
			// margin-top: 16rpx;
			overflow: hidden;
			.picBox {
				padding: 20rpx 0;
				width: 180rpx;
				height: 180rpx;
				position: relative;
				border-radius: 14rpx;
				margin-right: 10rpx;
				.pre {
					width: 160rpx;
					height: 160rpx;
					opacity: 0;
				}
			}
			.msgBox {
				padding: 20rpx 0;
				// border-bottom: 1rpx solid #e5e5e5;
				width: 60%;

				.protitle {
					height: 84rpx;
					overflow: hidden;
					// background: red;
					line-height: 1.4;
					margin-bottom: 12rpx;
				}
				.cm_ellipsis {
					margin-top: 8rpx;
				}
				.cm_text {
					line-height: 64rpx;
					justify-content: flex-start;
				}
				.has {
					margin-top: 14rpx;
					// padding:0 16rpx ;
					line-height: 1;
					font-size: 24rpx;
				}
				.timeBox {
					line-height: 36rpx;
					height: 36rpx;
					border-radius: 18rpx;
					background: #e82324;
					color: #fff;
					padding: 0 16rpx;
				}
			}
		}
	}
}
</style>
