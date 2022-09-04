<template>
	<view class="pages">
		<!-- #ifdef H5 -->
		<view class="header flex flex_center" @tap="toSearchPage">
			<cu-custom :isBack="false">
				<!-- <block slot="backText"></block> -->
				<block slot="content">
					<view class="searchBar f1 flex flex_center">
						<tui-icon name="search" :size="20" color="#CBCBCB"></tui-icon>
						<div class="f1 cm_des">请输入关键词</div>
					</view>
				</block>
				<block slot="right"><view class="btns flex flex_center">搜索</view></block>
			</cu-custom>
		</view>
		<!-- <iframe src="https://v.qq.com/x/page/e3125mlonsm.html" frameborder="0"></iframe> -->
		<!-- <iframe frameborder="0" src="https://v.qq.com/txp/iframe/player.html?vid=e3125mlonsm" allowFullScreen="true"></iframe> -->
		<!-- <video src="http://1257954096.vod2.myqcloud.com/dc9e0a52vodcq1257954096/2734bac15285890805848918974/k5iITpn4sJMA.mp4" controls></video> -->
		<!-- #endif -->
		
		<!-- 菜单 -->
		<view class="uni-padding-wrap"  >
			<view class="page-section swiper">
				<view class="page-section-spacing">
					<swiper class="swiper" :indicator-dots="true" :autoplay="true">
						<block v-for="(item, index) in banners" :key="index">
							<swiper-item @click="_href(item.link_url)">
								<image :src="item.link_file" mode="aspectFill" lazy-load="true" class="swiper-item uni-bg-red" style="width: 100%;height: 100%;"></image>
							</swiper-item>
						</block>
					</swiper>
				</view>
			</view>
		</view>
		<view class="flex menus"  >
			<block v-for="(item, index) in iconList" :key="index">
				<navigator :url="'/pages/classify/products/products?type=' + index" style="width: 25%;" class=" flex flex_center flex_y">
					<img :src="item.img ? item.img : '../../static/none1_1.jpg'" lazy-load="true"    mode="scaleToFill" class="menusIcons"/>
					<text class="text">{{ item.label }}</text>
				</navigator>
			</block>
		</view>
		
		<!-- <view class="flashSale"> -->
		<navigator url="/pages/features/flashSale/flashSale" class="flashSale" v-if="ifActivity">
			<image src="/static/img/flashSale.png" mode="widthFix" class="cover"></image>
		</navigator>
		<!-- </view> -->
		<!-- <a href=" " target="_blank">
			<img alt="我要啦免费统计" src="//ia.51.la/go1?id=20929387&pvFlag=1" style="border:none" />
			闽ICP备10208645号-1
		</a > -->
		<!-- <view></view> -->
		<!-- <view class="box flex flex_center flex_between">
				<navigator url="/pages/main/choiceness/choiceness" class=" flex flex_center floors">
					<image src="../../static/img/jx@1.5x.png" mode="scaleToFill" class="floorsPic"></image>
				</navigator>
				<navigator url="/pages/main/youDian/youDian" class=" flex flex_center floors">
					<image src="../../static/img/yd@1.5x.png" mode="scaleToFill" class="floorsPic"></image>
				</navigator>
		</view> -->
		<!-- 热门推荐 -->
		<view class="hot" style="padding: 20rpx;">
			<view class="cm_title title">热拍商品</view>
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
		</view>
		<LoadMore :status="loadStatus" />
		
	</view>
</template>

<script>
import { mapState } from 'vuex';
import tuiCountdown from '@/components/countdown/countdown';
import SET from '@/SET.js'
const global_Set_jll = uni.getStorageSync(SET.globalSetName);
// import mixin from '@/common/mixin.js'


export default {
	data() {
		return {
			banners: [],
			iconList: [],
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
			
			classList: '',
			ifActivity:global_Set_jll.isLimitActivity?true:false
		};
	},
	// mixins:[mixin],
	components: {
		tuiCountdown
	},
	// computed: mapState(['hasLogin']),
	// 点击搜索框
	onNavigationBarSearchInputClicked() {
		// alert(1)
		uni.hideKeyboard();
		uni.navigateTo({
			url: '/pages/main/search/search'
		});
	},
	onNavigationBarSearchInputConfirmed(e) {
		uni.hideKeyboard();
		uni.navigateTo({
			url: '/pages/main/search/search'
		});
	},
	// 点击搜索框
	onNavigationBarSearchInputChanged(e) {

		uni.navigateTo({
			url: '/pages/main/search/search'
		});
	},
	onNavigationBarButtonTap(e) {
		// console.log(e.index);
		if (e.index === 0) {
			// 点击搜素
			// this.scanSQR();
			this.$ui.toast('开发中');
		} else {
			// 点击搜素
			uni.navigateTo({
				url: '/pages/main/search/search'
			});
		}
	},

	
	onLoad() {
		let that = this;
		// const global_Set_jll = uni.getStorageSyglobal_Set_jll_Set_jll');
		this.banners = global_Set_jll.banerList;
		// console.log(this.banners)
		this.classList = global_Set_jll.classList;
		this._getList('refresh');
		this._loadHome()
		
	},
	onShow() {
		// this.formParams.pageIndex = 1;
		// this.lists = [];
		// this._getList('refresh');
	},
	methods: {
		async _loadHome(type) {
			let that = this;
			try {
				let res = await this.$api.crm_getHome()
				if(res.result==1){
					this.banners = res.data.lst_baner
					this.iconList = res.data.tree_class.slice(0,5)
					uni.setStorageSync('rj_banerList',res.data.lst_baner)
					uni.setStorageSync('rj_iconList',res.data.tree_class)
					uni.setStorageSync('rj_qr_code',res.data.lst_qr_code_detail[0])
					// this.lists = res.data.lst_hot_product.rows				
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
		toSearchPage() {
			uni.navigateTo({
				url: '/pages/main/search/search'
			});
		},
		_href(url) {
			uni.navigateTo({
				url: url
			});
		},
		imageError1(item) {
			item.Text = '../../static/none3_1.jpg';
		},
		imageError2(item) {
			item.class_logo = '../../static/none1_1.jpg';
		},
		// 扫描二维码  引导商家注册
		scanSQR() {
			let that = this;
			uni.scanCode({
				onlyFromCamera: true,
				success: function(res) {
					// console.log('条码类型：' + res.scanType);
					// console.log('条码内容：' + JSON.stringify(res));
					let result = res.result;
					let arr = result.split('_HePai_');
					if (arr.length <= 1) {
						that.$ui.toast('无效码');
						return;
					}
					let channal = arr[0];
					let pId = arr[1];

					uni.navigateTo({
						url: '/pages/levelup/regNewChannel/regNewChannel?channel=' + channal + '&pId=' + pId
					});
				}
			});
		},
		imageLoad(index) {
			if (this.lists[index]) {
				this.$set(this.lists[index], 'load', true);
			}
		},
		loadError(index) {
			// console.log('图片未找到');
			this.lists[index].goods_main_img = '/static/img/noPic.jpg';
		},
		
	}
};
</script>

<style lang="scss" scoped>
.pages {
	background: #f4f4f4;
	// padding: 20rpx;
	padding-top: 88rpx;
	.uni-padding-wrap {
		background-color: #f4f4f4;
		.swiper {
			// border-radius: 12rpx;
			overflow: hidden;
			width: 100%;
			.swiper-item {
				background: #eee;
			}
		}
	}

	.header {
		width: 100%;
		line-height: 88rpx;
		height: 88rpx;
		font-size: 32rpx;
		color: #fff;
		position: fixed;
		background: #ededed;
		z-index: 10;
		left: 0;
		top: 0;
		// padding: 0 20rpx;
		.searchBar {
			height: 60rpx;
			line-height: 60rpx;
			border-radius: 30rpx;
			background: #fff;
			padding: 0 40rpx;
			margin: 0 20rpx;
		}
		.btns {
			width: 88rpx;
			height: 88rpx;
			color: #333;
			.iconfont {
				font-size: 44rpx;
			}
		}
	}
	.menus {
		background: #fff;
		height: 172rpx;
		// border-radius: 12rpx;
		.menusIcons {
			width: 90rpx;
			height: 90rpx;
		}
		.text {
			margin-top: 14rpx;
			font-size: 24rpx;
		}
	}
	.flashSale{
		width: 100%;
		height: 160rpx;
		margin-top: 20rpx;
		img{
			width: 100%;
			height: 100%;
		}
	}
	.box {
		padding: 0 20rpx 20rpx 20rpx;
		background: #fff;
		.floors {
			width: calc(50vw - 28rpx);
			height: 130rpx;
			.floorsPic {
				width: 100%;
				height: 130rpx;
			}
		}
	}
	.hot {
		width: 100%;
		// padding: 0 20rpx;
		.title {
			line-height: 1;
			margin-bottom: 8rpx;
			margin-top: 32rpx;
			font-weight: bolder;
		}
		.hotItemBar {
			width: 100%;
			flex-wrap: wrap;
			justify-content: space-between;
			// padding: 0 20rpx;
		}
		.tags {
			background: linear-gradient(to right, #ee7e33, #ea3333);
			color: #fff;
			padding: 0 8rpx;
			border-radius: 4rpx;
			font-size: 20rpx;
			line-height: 28rpx;
			height: 28rpx;
			margin-right: 10rpx;
		}
	}
}
</style>
