<template>
	<view>
		<tui-skeleton v-if="skeletonShow" backgroundColor="#f9f9f9" skeletonBgColor="#efefef" borderRadius="0rpx"></tui-skeleton>
		<view class="pages tui-skeleton">
			<view class="shopBox flex  flex_center ">
				<image :src="business.shop_logo" mode="aspectFill" class="avatar tui-skeleton-rect"></image>
				<view class="f1 tui-skeleton-rect ">
					<view class=" cm_title   name ">{{ business.shop_name }}</view>
				<!-- 	<view class="flex cm_t_24 text flex_center">
						等级:
						<image :src="business.shop_level_icon.icon" mode="" style="width: 20rpx;height: 20rpx;margin: 0 10rpx;"></image>
						{{business.shop_level_icon.level}} <text class="f1"></text>
					</view> -->
				</view>
				<!-- <button class="gz tui-skeleton-rect " :class="business.is_attention==1?'':'attention'" @tap="attention">{{ business.is_attention==1?'取消关注':'关注' }}</button> -->
			</view>
			<!-- <view class="tabBar tui-skeleton-fillet">
				<sun-tab :value.sync="index" @change="objectChange" :tabList="tabObjectList" rangeKey="name" activeColor="#039798"></sun-tab>
			</view> -->
			<!-- <view class="tui-skeleton-rect">
				<swiper class="swiper banners" :indicator-dots="false" :autoplay="false" :current.sync="current" @change="_change">
					<swiper-item class="swiper-item "><Product :status="1" :shopCode="formParams.business_code" v-if="formParams.business_code"></Product></swiper-item>
					<swiper-item class="swiper-item "><Product :status="0" :shopCode="formParams.business_code" v-if="formParams.business_code"></Product></swiper-item>
				</swiper>
			</view> -->

			<view class="banners">
				<view class="hotItemBar flex flex_around">
					<block v-for="(item, index) in list" :key="index">
						<navigator :url="'/pages/main/details/details?code=' + item.project_code" class="proItemsBoxBlock">
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
										<!-- <text class="cm_t_20 tags" v-if="item.is_ems == 0">包邮</text>{{ item.goods_title }} -->
										<!-- <text class="cm_t_20 tags" >包邮</text> -->
										{{ item.goods_title }}
									</view>
								<!-- </view> -->
								<view class="cm_prize" style="margin-top: 20rpx;">￥{{ item.project_raise_price }}</view>
								<view class="cm_des" style="margin-top: 20rpx;">{{ item.buy_count  }}人购买</view>
							</view>
						</navigator>
					</block>
				</view>
			</view> 
			<LoadMore :status="loadStatus" />
		</view>
		<tui-modal :show="modal" @click="handleClick" @cancel="hide" content="请您先登录" :maskClosable="false" color="#333" :size="32"></tui-modal>
	</view>
</template>

<script>
	import { mapState, mapMutations } from 'vuex';
import sunTab from '@/components/sun-tab/sun-tab.vue';
import Product from './product/product.vue';
import tuiSkeleton from '@/components/tui-skeleton/tui-skeleton';
export default {
	data() {
		return {
			list:[],
			loadStatus: 'more',
			formParams:{
				    "business_code":"",
				    "key":"",
				    "project_status":"1",
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
		sunTab,
		Product,
		tuiSkeleton
	},
	onLoad(options) {
		// console.log(options.shopCode);
		this.formParams.business_code = options.shopCode;
		// alert(this.shopCode)
		this._loadData('refresh');
	},
	computed: {
		...mapState(['hasLogin']),		
	},
	onNavigationBarSearchInputConfirmed(e) {
		uni.hideKeyboard()
		if(this.searchword && this.searchword!= 'undefined'){
			uni.navigateTo({
				url: '/pages/main/search/search?keyword='+ this.searchword
			})
		}else{
			uni.navigateTo({
				url: '/pages/main/search/search'
			})
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
		// 点击搜素
		if(this.searchword && this.searchword!= 'undefined'){
			uni.navigateTo({
				url: '/pages/main/search/search?keyword='+ this.searchword
			})
		}else{
			
			this.$ui.toast('请输入关键字')
		}
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
		// 关注
		async attention(){
			let  that = this;
			if(!this.hasLogin){
				this.modal=true
				return
			}
			let data = {
				"business_code":this.formParams.business_code,
			}
			let t = this.business.is_attention==1?'取消关注':'关注'
			try {
				this.$ui.showloading()
				let res = await this.$api.Attention(data);
				this.$ui.hideloading()
				if (res.result==1) {
					
					that.$ui.toast(t+'成功')
					uni.$emit('refresh_user')
					if(that.business.is_attention==1){
						that.business.is_attention =0
					}else{
						that.business.is_attention =1
					}
				} else {
					that.$ui.toast(res.msg)
				}
			} catch (err) {
				console.log('请求结果false : ' + err);
			}
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
				if (type == 'refresh') {
					// this.$ui.showloading()
				} else {
					that.loadStatus = 'loading'
				}
				// console.log(JSON.stringify(this.formParams))
				let res = await this.$api.GetBusinessProjectList(this.formParams);
				// console.log(JSON.stringify(res))
				if (type == 'refresh') {
					// this.$ui.hideloading()
				} else {
					// that.loadStatus = 'loading'
				}
				if (res.result==1) {
					that.business = res.data.businessInfo;
					if (type == 'refresh') {
						// 刷新
						that.loadStatus = 'more'
						that.list = res.data.rows
						if(res.data.Total<that.formParams.pageSize){
							that.loadStatus = 'noMore'
						}
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
					if (that.skeletonShow) {
						that.skeletonShow = false;
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
		handleClick(e) {
			let index = e.index;
			if (index === 0) {
				// this.tui.toast("你点击了取消按钮")			
			} else {
				// this.tui.toast("你点击了确定按钮")
				uni.navigateTo({
					url:'/pages/role/login/login'
				})						
			}
			this.modal = false
		},
	}
};
</script>

<style lang="scss" scoped>
.pages {
	.shopBox {
		width: 100%;
		height: 154rpx;
		background: #039798;
		padding: 0 16rpx;
		.avatar {
			width: 94rpx;
			height: 94rpx;
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
			margin-bottom: 16rpx;
		}
		.gz {
			min-width: 100rpx;
			line-height: 50rpx;
			height: 54rpx;
			border: none;
			background: var(--cl_primary);
			color: #333;
			text-align: center;
			padding: 0 20rpx;
			font-size: 26rpx;
			border-radius: 8rpx;
			border: 2rpx solid #333;
		}
		.attention{
			background: #333;
			color: #fff;
		}
	}
	.tabBar {
		line-height: 72rpx;
		height: 72rpx;
		background: #fff;
		overflow: hidden;
	}
	.banners {
		padding: 0 20rpx;
		.hotItemBar {
			width: 100%;
			flex-wrap: wrap;
			justify-content: space-between;
			
		
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
						background: red;
						color: #fff;
						padding: 0 8rpx;
						border-radius: 4rpx;
						font-size: 20rpx;
						line-height: 30rpx;
						height: 30rpx;
						margin-right: 10rpx;
						margin-top: -8rpx;
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
}
</style>
