<template>
	<view class="container">
		<!-- <view class="tui-searchbox flex flex_center"  @tap="search">
			<input class="tui-search-input f1" placeholder="请输入商品名称">	
			</input>
			<text class="tui-search-text">搜索</text>
		</view> -->

		<scroll-view scroll-y scroll-with-animation class="tab-view" :scroll-top="scrollTop" :style="{height:height+'px',top:top+'px'}">
			
			<view v-for="(item,index) in tabbar" :key="index"   :class="[currentTab==index ? 'tab-bar-item current' : 'tab-bar-item']"
			 :data-current="index" @tap.stop="swichNav(item.class_code,index)">
				<view  :class="[currentTab==index ? 'active' : '']">{{item.class_name}}</view>				
			</view>
		</scroll-view>
		<!-- <block v-for="(item,index) in tabbar" :key="index"> -->
		<view class="right-box" >
				<!-- <view ></view> -->
			<!-- <scroll-view scroll-y class="right-box" :style="{height:height+'px',top:top+'px'}" @scrolltoupper="refresh" @scrolltolower="loadMore"> -->
				<!--内容部分 start 自定义可删除-->
				<view class="productBox">
					<!-- <view class="cm_title">当前分类</view> -->
					<block v-for="(item2,index2) in list" :key="index2" >
						<navigator :url="'/pages/main/details/details?code='+item2.project_code" class="productItems cm_bdb flex flex_center">
							<!-- <image :src="item2.goods_main_img" mode="aspectFit" class="pics"  lazy-load="true" ></image> -->
							<image @load="imageLoad(index2)" @error="loadError(index2)"   lazy-load="true" :src="item2.goods_main_img.split(',')[0]" mode="aspectFill" class="pics animated" :class="item2.load ? 'fadeIn' : ''"></image>
							<view class="f1">
								<view class="cm_title cm_ellipsis2 productTitle">{{item2.goods_title}}</view>
								<!-- <view class="restTime flex flex_center cm_t_20"> -->
								<!-- 	<text class="cm_t_20">距离开始还有</text> 
									<tui-countdown :time="item2.end_time" :scale="true" :size="20" bcolor="transparent" bgcolor="#F0F0F0" :isColon="false" :days="true" :seconds="false"></tui-countdown>
								 -->
								<!-- </view> -->
								<view class="cm_des">当前价格  <text class="cm_prize cm_t_32">{{item2.project_price}}元</text></view>
							</view>
						</navigator>
					</block>
					<LoadMore :status="loadStatus" />
				</view>
				<!--内容部分 end 自定义可删除-->
			<!-- </scroll-view> -->
		<!-- </block> -->
		</view>
	</view>
</template>

<script>
	import tuiCountdown from "@/components/countdown/countdown"
	export default {
		data() {
			return {
				tabbar: ["推荐分类", "进口超市", "国际名牌", "奢侈品", "海囤全球", "男装", "女装", "男鞋", "女鞋", "钟表珠宝", "手机数码", "电脑办公", "家用电器", "玩具乐器",
					"运动户外", "宠物生活", "特产馆"
				],
				height: 0, //scroll-view高度
				top: 0,
				currentTab: 0, //预设当前项的值
				scrollTop: 0, //tab标题的滚动条位置
				list:[],
				loadStatus:'more',
				formParams:{
				    "class_code":"",
				    "pageIndex":1,
				    "pageSize":10,
				},
				searchword:''
			}
		},
		onLoad: function(options) {
			setTimeout(() => {
				uni.getSystemInfo({
					success: (res) => {
						let header = 92;
						let top = 0;
						//#ifdef H5
						top = 44;
						//#endif
						this.height = res.windowHeight - uni.rpx2px(header)
						this.top = top 
					}
				});
			}, 50)
			this.init()
			
		},
		onNavigationBarSearchInputConfirmed(e) {
			uni.hideKeyboard();
			if (this.searchword && this.searchword != 'undefined') {
				uni.navigateTo({
					url: '/pages/main/search/search?keyword=' + this.searchword
				});
			} else {
				uni.navigateTo({
					url: '/pages/main/search/search'
				});
			}
		},
		// 点击搜索框
		onNavigationBarSearchInputChanged(e) {
			// console.log("e: " + JSON.stringify(e));
			let v = e.text;
			// console.log(v)
		
			if (v) {
				this.searchword = v;
			}
		},
		onNavigationBarButtonTap(e) {
			// console.log(e.index);
			if (this.searchword && this.searchword != 'undefined') {
				uni.navigateTo({
					url: '/pages/main/search/search?keyword=' + this.searchword
				});
			} else {
			
				this.$ui.toast('请输入关键字')
			}
		},
		
		// 下拉刷新
		onPullDownRefresh() {
			this.formParams.pageIndex = 1;
			this.list = [];
			// this.init()
			this._loadData('refresh')
			// this._loadData('refresh', () => {
			// 	uni.stopPullDownRefresh();
			// });
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
		components: {
			tuiCountdown
		},
		methods: {
			imageLoad(index) {
				this.$set(this.list[index], 'load', true);
			},
			loadError(index) {
				// console.log('图片未找到');
				this.list[index].goods_picture = '/static/img/noPic.jpg';
			},
			async init(){
				let that = this
				try {			
					let res = await this.$api.GetClassList({});
					// console.log(res)
					if (res.result==1) {
						that.tabbar = res.data	;
						that.formParams.class_code = 	that.tabbar[0].class_code 		
						that._loadData('refresh')					
					} else {
						that.$ui.toast(res.msg)
					}
				} catch (err) {
					console.log('请求结果false : ' + err)
					if(type=='refresh'){
						// this.$ui.hideloading();
							uni.stopPullDownRefresh();
					}
				}
			},
			// 分类商品
			async _loadData(type,callback) {
				let that = this
				try {
					if(type=='refresh'){
						// this.$ui.showloading();
						
					}else{
						// that.loadStatus = 'loading'
					}
							
					let res = await this.$api.GetGoodsByClassList(this.formParams);
					
					if(type=='refresh'){
						// this.$ui.hideloading();
							uni.stopPullDownRefresh();
					}else{
						// that.loadStatus = 'loading'
					}
					if (res.result==1) {
						
						if(type=='refresh'){
							// 刷新
							that.loadStatus = 'more'
							that.list = res.data.rows	
							if(res.data.Total<that.formParams.pageSize){
								that.loadStatus = 'noMore'
							}
						}else{
							// console.log(res.data.rows.length)
							// 更多
							if(res.data.rows.length==0){
								that.loadStatus = 'noMore'
							}else{
								let arr = that.list.concat(res.data.rows);
								that.list = arr;
								that.loadStatus = 'more'
							}
							
						}
						
						
					} else {
						this.$ui.toast(res.msg)
					}
				} catch (err) {
					console.log('请求结果false : ' + err)
					
				}
				// this.loadModal = false;
				// this.$ui.hideloading();
				if (callback) callback()
			},
			// 点击标题切换当前页时改变样式
			swichNav: function(code,cur) {
				this.formParams.class_code = code
				// let cur = e.currentTarget.dataset.current;
				if (this.currentTab == cur) {
					return false;
				} else {
					this.currentTab = cur;
					this.formParams.pageIndex = 1;
					this.list = []
					this._loadData('refresh')
					this.checkCor();
				}
			},
			//判断当前滚动超过一屏时，设置tab标题滚动条。
			checkCor: function() {
				let that = this;
				//这里计算按照实际情况进行修改，动态数据要进行动态分析
				//思路：窗体高度/单个分类高度 200rpx 转px计算 =>得到一屏幕所显示的个数，结合后台传回分类总数进行计算
				//数据很多可以多次if判断然后进行滚动距离计算即可
				if (that.currentTab > 7) {
					that.scrollTop = 500
				} else {
					that.scrollTop = 0
				}
			},
			detail(e) {
				uni.navigateTo({
					url: '../extend-view/productDetail/productDetail'
				})
			},
			productList(e) {
				let key = e.currentTarget.dataset.key;
				uni.navigateTo({
					url: '../extend-view/productList/productList?searchKey=' + key
				})
			},
			search: function() {
				uni.navigateTo({
					url: '/pages/main/search/search'
				})
			},
			// refresh(){
			// 	// this.formParams.pageIndex = 1;
			// 	// this.list = []
			// 	// this._loadData('refresh', () => {
			// 	// 	uni.stopPullDownRefresh();
			// 	// })
			// },
			// loadMore(){
			// 	if (this.loadStatus != 'more') {
			// 		return;
			// 	}
			// 	this.formParams.pageIndex += 1;
			// 	this.loadStatus = 'loading'
			// 	this._loadData('more', () => {
			// 		// this.loadStatus = 'more'
			// 	})
			// }
		}
	}
</script>

<style scoped>
	page {
		background: #fcfcfc;
	}

	/* 左侧导航布局 start*/

	/* 隐藏scroll-view滚动条*/

	::-webkit-scrollbar {
		width: 0;
		height: 0;
		color: transparent;
	}

	.tui-searchbox {
		width: 100%;
		height: 92rpx;
		padding: 0 30rpx;
		box-sizing: border-box;
		background: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		position: fixed;
		left: 0;
		top: 0;
		/* #ifdef H5 */
		top: 44px;
		/* #endif */
		z-index: 100;
	}

	.tui-searchbox::after {
		content: '';
		position: absolute;
		/* border-bottom: 1rpx solid #d2d2d2; */
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
		bottom: 0;
		right: 0;
		left: 0;
	}

	.tui-search-input {
		width: 100%;
		height: 60rpx;
		background: #f1f1f1;
		border-radius: 30rpx;
		font-size: 26rpx;
		color: #999;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0 40rpx;
	}

	.tui-search-text {
		padding-left: 16rpx;
	}

	.tab-view {
		min-height: 100%;
		width: 186rpx;
		position: fixed;
		left: 0;
		z-index: 100;
		background: #f8f8f8;
	}

	.tab-bar-item {
		width: 186rpx;
		height: 110rpx;
		background: #f8f8f8;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 26rpx;
		color: #444;
		font-weight: 400;
	}
	
	.active {
		position: relative;
		color: #fff;
		font-size: 30rpx;
		font-weight: 600;
		background: #fcfcfc;
		width: 152rpx;
		height: 60rpx;
		border-radius: 30rpx;
		background: var(--cl_primary);
		line-height: 60rpx;
		text-align: center;
	}
	.tab-bar-item.current{
		background: #fff;
	}
	/* .active::before {
		content: "";
		position: absolute;
		border-left: 8rpx solid #E41F19;
		height: 30rpx;
		left: 0;
	} */

	/* 左侧导航布局 end*/

	.right-box {
/* 		width: 100%;
		position: fixed;
		padding-left: 186rpx;
		box-sizing: border-box;
		left: 0; */
		background: #fff;
		/* background: red; */
	}

	.page-view {
		width: 100%;
		overflow: hidden;
		padding-top: 20rpx;
		padding-right: 20rpx;
		box-sizing: border-box;
		padding-bottom: env(safe-area-inset-bottom);
	}

	

	.slide-image {
		width: 100%;
		height: 220rpx;
	}

	.class-box {
		padding-top: 30rpx;
	}

	.class-item {
		background: #fff;
		width: 100%;
		box-sizing: border-box;
		padding: 20rpx;
		margin-bottom: 20rpx;
		border-radius: 12rpx;
	}

	.class-name {
		font-size: 22rpx;
	}

	.g-container {
		/* padding-top: 20rpx; */
		display: flex;
		display: -webkit-flex;
		justify-content: flex-start;
		flex-direction: row;
		flex-wrap: wrap;
	}

	.g-box {
		width: 33.3333%;
		text-align: center;
		padding-top: 40rpx;
	}

	.g-image {
		width: 120rpx;
		height: 120rpx;
	}

	.g-title {
		font-size: 22rpx;
	}
	.productBox{
		padding-right:20rpx;
		padding-left:196rpx; ;
	}
	.productTitle{
		height: 76rpx;
		/* background: red; */
		line-height: 1.2;
		overflow: hidden;
		margin-bottom: 20rpx;
	}
	.productItems{
		width: 100%;
		padding: 24rpx 0;
		/* border-bottom: 1rpx solid #eee; */
		height: 194rpx;
	}
	.productItems .pics{
		width: 146rpx;
		height: 146rpx;
		margin-right: 20rpx;
		opacity: 0;
	}
	.productItems  .restTime{
		justify-content: flex-start;
		line-height: 30rpx;
		height: 30rpx;
		color: #333;
		background: #f0f0f0;
		font-size: 20rpx;
		padding:  0 20rpx;
		border-radius: 15rpx;
		margin-bottom: 26rpx;
		margin-top: 16rpx;
	}
</style>
