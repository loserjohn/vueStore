<template>
	<view class="pages">
		<view class="prizeBox">
			<!-- 出价状态（0-出局 1-领先） -->
			<view v-if="list.length>0">
				<block v-for="(item,index) in list" :key="index">
					<view class="prizeItems flex flex_center  tui-skeleton-rect" :class="item.status==1?'active':''">
						<view class="f1 flex flex_center" >
							<image :src="item.consumer_head" mode="aspectFill" class="avatar"></image>
							<view class="f1" v-if="item.status==1">
								<view class="name">{{item.consumer_name}}</view>
								<view class="cm_text cm_t_24" >
									若无人出价，将以
									<text style="color: #E02E24;">{{item.bidder_price}}元</text>
									拍下此商品
								</view>							
							</view>
							<view class="f1 flex flex_center"  v-else>
								<view class="name f1">{{item.consumer_name}}</view>
								<view class="cm_t_24">{{item.bidder_price}}元</view>
							</view>
						</view>
						<view class="mark">{{item.status==1?'领先':'出局'}}</view>
					</view>
				</block>
			</view>
			<view v-else class="cm_des cm_tex_c">
				暂未有人出价
			</view>
			
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[],
				formParams:{
				    project_code:''
				},
				loadStatus:'more'
			};
		},
		// computed: mapState(['hasLogin']),
		// components: {
		// 	tuiCountdown
		// },
		onLoad(options) {
			// console.log(options)
			// type==1 精选  type==2 捡漏
			this.formParams.project_code = options.code;
			this._loadData('refresh')
		},
		// 下拉刷新
		onPullDownRefresh() {	
			// this.formParams.pageIndex = 1;
			this.list =[] 
			this._loadData('refresh',() => {
				uni.stopPullDownRefresh();
			})
		},
		// 上拉加载
		onReachBottom() {
			// if(this.loadStatus == 'noMore'){
			// 	return;
			// }
			// this.formParams.pageIndex += 1;
			// this.loadStatus = 'loading'
			// this._loadData('more',() => {
			// 	// this.loadStatus = 'more'
			// })
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
							
					let res = await this.$api.GetAuctionList(this.formParams);
					
					if(type=='refresh'){
						// this.$ui.hideloading()
					}else{
						// that.loadStatus = 'loading'
					}
					if (res.result==1) {
						
						if(type=='refresh'){
							// 刷新
							that.loadStatus = 'more'
							that.list = res.data.list
						}else{
							// console.log(res.data.rows.length)
							// 更多
							if(res.data.list.length==0){
								that.loadStatus = 'noMore'
							}else{
								let arr = that.list.concat(res.data.list);
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
		
	}
</script>

<style lang="scss" scoped>
	.pages{
		padding:20rpx;
		min-height: 100vh;
		// background: #fff;
		.prizeBox {
			.prizeItems {
				background: #fff;
				border-radius: 10rpx;
				margin-bottom: 16rpx;
				height: 122rpx;
				overflow: hidden;
				.avatar {
					width: 90rpx;
					height: 90rpx;
					border-radius: 50%;
					margin-right: 16rpx;
					margin-left: 16rpx;
				}
				.name {
					line-height: 1.5;
					font-size: 28rpx;
					color: #333;
					font-weight: 600;
				}
				.mark {
					height: 122rpx;
					width: 122rpx;
					text-align: center;
					line-height: 122rpx;
					background: #dedede;
					color: #999;
					font-size: 30rpx;
					margin-left: 32rpx;
				}
			}
			.active {
				.mark {
					background: var(--cl_primary);
					color: #333;
				}
			}
		}
	}
</style>
