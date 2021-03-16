<template>
	<view class="pages ">
		<!-- <u-navbar back-text="返回" title="使用帮助"></u-navbar> -->

		<view class="cm_boxs">
			<block v-for="(item,index) in itemList" :key="index">
					<view :index="index"   @click="change(item)">
						<tui-list-cell arrow >{{item.query}}  </tui-list-cell>
						
						<view v-show="item.show" class="contentBox animated fadeIn">
							<rich-text :nodes="_showDetails(item.reply)"></rich-text>
						</view>
					</view>
				</block>
		</view>
		<!-- <view class="footer">
			<u-button shape="circle" @click="submit" type="primary">我要反馈</u-button>
		</view> -->

	</view>
</template>

<script>
	// import tuiSkeleton from '@/components/tui-skeleton/tui-skeleton';
	// import tuiIcon from "@/components/icon/icon"
	// import tuiTimeAxis from "@/components/time-axis/time-axis"
	// import tuiTimeaxisItem from "@/components/timeaxis-item/timeaxis-item"
	// import tuiTips from "@/components/extend/tips/tips"
	export default {
		data() {
			return {
				form:{
					"status": "1",
					"pageIndex": 1,
					"pageSize": 100
				},
				emsMsg: '',
				pageLoading: true,
				itemList: [],
			};
		},
		onLoad(options) {
			// this.form.send_code = options.code;
			// // console.log(this.form.order_code)
			this.initData()
		},
		filters: {
			status(val) {
				val = parseInt(val)
				let t
				switch (val) {
					case 0:
						t = '已揽件'
						break;
					case 1:
						t = '在途中'
						break;
					case 2:
						t = '正在派件'
						break;
					case 3:
						t = '已签收'
						break;
					case 4:
						t = '派送失败'
						break;
					case 5:
						t = '疑难件'
						break;
						t = '推荐签收'
						break;
					default:
						break;
				}
				return t
			}
		},
		components: {
			// tuiIcon,
			// tuiTimeAxis,
			// tuiTimeaxisItem,
			// tuiSkeleton,
			// tuiTips
		},
		methods: {
			change(e){
				// console.log(e)
				
				e.show = !e.show
			},
			_showDetails(str) {
			  if (str) {
			    // console.log(str.replace('↵','\n'))
				str = str.replace(/\/br/g, "br\/")
				str = str.replace(/\n/g, "<br/>")
				// console.log(str)
			    return str
			  } else {
			    return '--'
			  }
			  
			},
			call(num) {
				// if (!num) {

				// 	that.$ui.toast('没有联系人信息')
				// 	return
				// }

				// let that = this
				// // console.log(phone)
				// uni.showModal({
				// 	title: '小贴士提醒你',
				// 	content: '立即致电？',
				// 	success: function(res) {
				// 		that.show = false;
				// 		if (res.confirm) {
				// 			uni.makePhoneCall({
				// 				phoneNumber: num //仅为示例
				// 			});
				// 		} else if (res.cancel) {
				// 			console.log('用户点击取消');
				// 		}
				// 	}
				// });
			},
			async initData() {
				let that = this;
				this.$ui.showloading();
				let res = await this.$api.GetRJHelp(this.form, false);
				this.$ui.hideloading();
				// console.log(res)
				if (res.result===1) {
					that.itemList = res.data.rows.map(item=>{item.show=false;return item})
					if (that.pageLoading) {
						that.pageLoading = false;					
					}
				} else {
					that.$ui.toast(res.msg)
					if (that.pageLoading) {
						that.pageLoading = false;
					}
				}
			},
			submit() {}
		}
	}
</script>

<style lang="scss" scoped>
	.pages {
		padding: 20rpx;
		// .boxs {
		// 	border-radius: 12rpx;
		// 	padding: 20rpx;
		// 	background-color: #fff;
		// }
		.answer{
			border-radius: 12rpx;
			padding: 20rpx;
			background-color: #f4f5f6;
			line-height: 1.8;
		}
		.footer {
			padding: 20rpx;
			margin-top: 40rpx;
		}
		.contentBox{
			background: #fff;
			padding: 20rpx;
		}
	}
</style>
