
<template>
	<view class="pages">
		<view v-if="list.length>0" class="">
			<block v-for="(item, index) in list" :key="index">
				<view class=" hotItemBar">
					<navigator :url="'/pages/main/store/store?shopCode='+item.business_code" class="proItemsBox cm_bdb flex flex_center">
						<view class="picBox">
							<image @load="imageLoad(index)" @error="loadError(index)" lazy-load="true" :src="item.shop_logo" mode="aspectFill"
							 class="pre animated" :class="item.load ? 'fadeIn' : ''"></image>
						</view>
						<view class="f1 msgBox ">
							<view class="protitle cm_ellipsis">
								{{item.shop_name}}
							</view>
							<view class="flex cm_t_24 text flex_center">
								等级:
								<image :src="item.shop_level_icon.icon" mode="" style="width: 20rpx;height: 20rpx;margin: 0 10rpx;"></image>
								{{item.shop_level_icon.level}} <text class="f1"></text>
							</view>
						</view>
						<button type="primary" class="btns">进店逛逛</button>
					</navigator>
				</view>
			</block>
			<LoadMore :status="loadStatus" />
		</view>
		<view class="flex flex_center" style="width: 100%;height: 90vh;" v-else>
			<tui-tips :fixed="false" imgUrl="/static/img/toast/img_noorder_3x.png">暂无关注店铺</tui-tips>
		</view>
	</view>
</template>

<script>
import { mapState } from 'vuex';
import tuiCountdown from "@/components/countdown/countdown"

import tuiTips from "@/components/extend/tips/tips"
export default {
	data() {
		return {
			list:[],
			formParams:{
			    "key":'',
			    "type":1,
			    "pageIndex":1,
			    "pageSize":10,
			},
			loadStatus:'more'
		};
	},
	computed: mapState(['hasLogin']),
	components: {
		tuiCountdown,
		tuiTips
	},
	onLoad(options) {
		// console.log(options)
		// type==1 精选  type==2 捡漏
		this._loadData('refresh')
	},
	// 下拉刷新
	onPullDownRefresh() {	
		this.formParams.pageIndex = 1;
		this.list =[] 
		this._loadData('refresh',() => {
			uni.stopPullDownRefresh();
		})
	},
	// 上拉加载
	onReachBottom() {
		if(this.loadStatus == 'noMore'){
			return;
		}
		this.formParams.pageIndex += 1;
		this.loadStatus = 'loading'
		this._loadData('more',() => {
			// this.loadStatus = 'more'
		})
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
		async _loadData(type,callback) {
			let that = this
			try {
				if(type=='refresh'){
						// this.$ui.showloading()
				}else{
					that.loadStatus = 'loading'
				}
						
				let res = await this.$api.GetAttentionList(this.formParams);
				
				if(type=='refresh'){
					// this.$ui.hideloading()
				}else{
					// that.loadStatus = 'loading'
				}
				if (res.result==1) {
					
					if(type=='refresh'){
						// 刷新
						that.loadStatus = 'more'
						that.list = res.data.rows
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
		width: 100%;
		overflow-y: scroll;
		.hotItemBar{
			padding:  0 20rpx;
			background: #fff;
			.proItemsBox {
				width: 100%;
				overflow: hidden;
				padding: 20rpx 0 ;
				
				.picBox {
					// padding: 20rpx 0;
					width: 90rpx;
					height: 90rpx;
					position: relative;
					border-radius: 50%;
					margin-right: 20rpx;
					border-radius: 50%;
					overflow: hidden;
					.pre {
						width: 90rpx;
						height: 90rpx;
						opacity: 0;
					}
							
				}
				.msgBox {
					// padding: 20rpx 0;
					width: 60%;
					.protitle {
						// height: 76rpx;
						overflow: hidden;
						font-size: 32rpx;
						line-height: 1.4;
						margin-bottom: 10rpx;
					}					
				}
				.btns{
					width: 160rpx;
					height: 58rpx;
					text-align: center;
					line-height: 58rpx;
					color: #333;
					background: var(--cl_primary);
					border-radius: 8rpx;
					font-size: 24rpx;
				}
			
			}
		}
		
	}
</style>
