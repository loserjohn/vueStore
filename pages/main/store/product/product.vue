<!-- 转入 -->
<template>
	<!-- <view class="pages"> -->
		<scroll-view class="page" scroll-y="true"  @scrolltoupper="refresh" @scrolltolower="loadMore">
			<view class="hot">
				<view class="hotItemBar flex flex_around">
					<block v-for="(item,index) in list" :key="index">
						<!-- <view class="proItemsBox"> -->
						<navigator  :url="'/pages/main/details/details?code='+item.project_code" open-type="redirect" class="proItemsBoxBlock"> 
							<view class="picBox">
								<image @load="imageLoad(index)" @error="loadError(index)" lazy-load="true" :src="item.goods_main_img" mode="aspectFill"
								 class="pre animated" :class="item.load ? 'fadeIn' : ''"></image>
								<view class=" flex flex_center timeBox" v-if="item.project_status==1 || item.project_status==3">
									<!-- 距结束 12天2时23分						 -->
									<text style="color: #fff;margin-right: 10rpx;">距{{item.project_status==1 ?'结束':'开始'}} </text>
									<view class="">
										<tui-countdown :time="item.project_status==1 ?item.end_time:item.statr_time" :scale="false" :size="28" :colonSize="28" bcolor="transparent" color="#fff"
										 colonColor="#fff" bgcolor="#E82324" :isColon="false" :days="true" :seconds="false"></tui-countdown>
									</view>
								</view>
								<view class=" flex flex_center timeBox" style="background: #D5D5D5;" v-else >
									{{item.project_status | projectStatusFilter}}
								</view>
								<view class="cm_statusBox">{{item.project_status | projectStatusFilter}}</view>
							</view>
							
							<view class="msgBox">
								<view class="flex flex_center" style="padding: 6px 0;">
									<!-- <text class="cm_t_20 tags" v-if="item.is_ems==0" >包邮</text> -->
									<view class="f1 cm_ellipsis ">{{item.goods_title}}</view>
								</view>
								<view class="cm_text flex flxe flex_center">现价 <text class="cm_prize">{{item.project_raise_price}}元</text></view>
								<view class="cm_text has">已出价{{item.auction_count}}次</view>
							</view>
							
						<!-- </view> -->
						</navigator>
					</block>
				</view>
			</view> 
			<LoadMore :status="loadStatus" />
		 </scroll-view>
	<!-- </view> -->
</template>

<script>
	import tuiCountdown from "@/components/countdown/countdown"
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
				}
			};
		},
		props: {
			//点击遮罩 是否可关闭
			status: {
				type: Number,
				default: 0
			},
			shopCode: {
				type: String,
				default: ''
			},
		},
		components: {
			tuiCountdown
		},
		created(){
			// 
			this.formParams.business_code = this.shopCode
			this.formParams.project_status = this.status
			this._loadData('refresh')
		},
		methods:{
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
			refresh(){
				// this.formParams.pageIndex = 1;
				// this.list = []
				// this._loadData('refresh', () => {
				// 	uni.stopPullDownRefresh();
				// })
			},
			loadMore(){
				if (this.loadStatus != 'more') {
					return;
				}
				this.formParams.pageIndex += 1;
				this.loadStatus = 'loading'
				this._loadData('more', () => {
					// this.loadStatus = 'more'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page{
		width: 100%;
		height: calc(100vh - 226rpx);
		overflow-y: scroll;
		.hot{
			width: 100%;
			padding: 0 20rpx;
			.title{
				line-height: 1;
				margin-bottom: 24rpx;
				margin-top: 32rpx;
			}
			.hotItemBar{
				width: 100%;
				flex-wrap: wrap;
				justify-content: space-between;
				.proItemsBox{
					width: calc((100% - 56rpx)/2);
					height: 532rpx;
					background: #fff;
					border-radius: 14rpx;
					margin-top: 16rpx;
					overflow: hidden;
					.picBox{
						width: 100%;
						height: 347rpx;
						position: relative;
						.pre{
							width: 100%;
							height: 347rpx;
							opacity: 0;
						}
						.timeBox{
							position: absolute;
							left: 0;
							bottom:-4rpx;
							width: 100%;
							height: 52rpx;
							line-height: 52rpx;
							background: $uni-color-error;
							color: #fff;
							text-align: center;
						}
					}
					.msgBox{
						padding:0 16rpx;
						.cm_ellipsis{
							margin-top: 8rpx;
						}
						.cm_text{
							line-height: 64rpx;
							justify-content:flex-start;
							
						}
						.has{
							margin-top: 14rpx;
							// padding:0 16rpx ;
							line-height: 1;
							font-size: 24rpx;
						}
						.tags{
							background: red;
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
			}
		}
	}
</style>
