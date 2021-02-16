
<template>
	<view class="pages">
		<view v-if="list.length>0" >
			<view class="hotItemBar flex flex_between">
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
								<text class="tags" v-if="item.is_flashsale == 1">限时抢购</text>
								{{ item.goods_title }}
							</view>
						<!-- </view> -->
						<view class="cm_prize" style="margin-top: 20rpx;">￥{{ item.project_price }}</view>
						<view class="cm_des" style="margin-top: 20rpx;">{{ item.buy_count  }}人购买</view>
					</view>
				</navigator>
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
						
				let res = await this.$api.GetGoodsList(this.formParams);
				
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
		// height: calc(100vh - 230rpx);
		overflow-y: scroll;
		padding: 0 20rpx;
		.hotItemBar {
			width: 100%;
			flex-wrap: wrap;
			justify-content: space-between;
			// padding: 0 20rpx;
		
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
