
<template>
	<view class="pages">
		<view v-if="list.length>0" class="hotItemBar">
			<block v-for="(item, index) in list" :key="index">
				<view class="proItemsBox">
					<navigator :url="'/pages/main/details/details?code='+item.project_code" class=" flex flex_around content cm_bdb">
						<view class="picBox">
							<image @load="imageLoad(index)" @error="loadError(index)" lazy-load="true" :src="item.goods_main_img" mode="aspectFill"
							 class="pre animated" :class="item.load ? 'fadeIn' : ''"></image>
						</view>
						<view class="f1 msgBox">
							<view class="protitle cm_ellipsis2">
								<!-- <text class="cm_t_20 tags"   v-if="item.is_ems==0" >包邮</text> -->
								{{item.goods_title}}
								<!-- <view class="protitle f1 cm_ellipsis2">{{item.goods_title}}{{item.goods_title}}{{item.goods_title}}{{item.goods_title}}</view> -->
							</view>
							<view class=" flex flex_center">
								<view class="f1">
									<view class=" cm_text cm_t_20 flex  flex_center">起拍价 <text class="cm_prize">{{item.project_price}}元</text></view>
								</view>
								<view class=" flex flex_center timeBox">
									<!-- 距结束 12天2时23分						 -->
									<text style="color: #fff;margin-right: 10rpx;font-size: 20rpx;">距{{item.project_status==1 ?'结束':'开始'}} </text>
									<view class="">
										<tui-countdown :time="item.project_status==1 ?item.end_time:item.statr_time" :scale="false" :size="20" :colonSize="20" bcolor="transparent" color="#fff"
										 colonColor="#fff" bgcolor="#E82324" :isColon="false" :days="true" :seconds="false"></tui-countdown>
									</view>							
								</view>
							</view>
						</view>
					</navigator>
				</view>
			</block>
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
		height: calc(100vh - 230rpx);
		overflow-y: scroll;

		.proItemsBox {
			width: 100%;
			overflow: hidden;
			// margin-top: 16rpx;
			padding: 0 20rpx;
			background: #fff;

			.content {
				padding: 20rpx 0;
				.top {
					height: 80rpx;
				}

				.picBox {
					// padding: 20rpx 0;
					width: 160rpx;
					height: 160rpx;
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
					// padding: 20rpx 0;
					width: 60%;

					.tags {
						background: red;
						color: #fff;
						padding: 0 8rpx;
						border-radius: 4rpx;
						font-size: 20rpx;
						line-height: 28rpx;
						height: 28rpx;
						margin-right: 10rpx;
						// margin-bottom: 48rpx;
					}

					.protitle {
						height: 76rpx;
						overflow: hidden;
						// background: red;
						line-height: 1.4;
						margin-bottom: 40rpx;
					}

					.cm_ellipsis {
						margin-top: 8rpx;
					}

					.cm_text {
						line-height: 1.4;
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
						background: #E82324;
						color: #fff;
						padding: 0 16rpx;
					}

					.cm_prize {
						font-size: 24rpx;
					}
				}
			}

		}
	}
</style>
