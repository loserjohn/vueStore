<template>
	<view class="pages">
		<!-- 头部 -->
		<view class="pageTop">
			<view class="header flex flex_center">
				<cu-custom :isBack="true">
					<block slot="backText">
						<view class="btns flex flex_center"></view>
					</block>
					<block slot="content">
						<view class="cm_title">我的</view>
					</block>
					<!-- <block slot="right"> <view class="btns flex flex_center" @tap="_href('set')"><text class="iconfont icon-shezhi "></text></view> 
					</block> -->
				</cu-custom>
			</view>
			<view class="flex top flex_center" @tap="_auth_href('/pages/user/person/person')" v-if="hasLogin">
				<image :src="accountInfo.consumer_head ? accountInfo.consumer_head : '../../static/img/default.jpg'" mode="aspectFill"
				 class="avatar"></image>
				<text class="name cm_title f1">{{ hasLogin?accountInfo.consumer_nick_name:'暂未登录'}}</text>
				<tui-icon name="arrowright" :size="20" color="#fff" v-if="hasLogin"> </tui-icon>
			</view>
			<view class="flex top flex_center" v-else>
				<image src="../../static/img/default.jpg" mode="aspectFit" class="avatar"></image>
				<text class="name cm_title f1">{{ hasLogin?accountInfo.consumer_nick_name:'暂未登录'}}</text>
				<!-- <navigator v-if="!hasLogin" class="cz" url="/pages/role/pLogin/pLogin">立即登录</navigator> -->
				<button type="default" class="cz" @click="_login">立即登录</button>
			</view>
		</view>


		<!-- 个人信息 -->
		<view class="accountBox">

			<view class="boxs bottom  ">
				<!-- <view class="boxs"> -->
				<view class=" flex flex_center">
					<view class="cm_title f1">我的订单</view>
					<view class="flex flex_center cm_des" @tap="_auth_href('/pages/features/order/order?current=0')">全部订单<tui-icon name="arrowright"
						 :size="16"></tui-icon>
					</view>

				</view>
				<view class="flex flex_center flex_between">
					<view class="menus flex flex_center flex_y " @tap="_auth_href('/pages/features/order/order?current=1')">
						<img src="../../static/img/dd_df.png" class="menusPic"></img>
						<text class="cm_t_24">待付款</text>
						<view class="tips" v-if="hasLogin && accountInfo.wait_paying_count">{{accountInfo.wait_paying_count}}</view>
					</view>
					<!-- <navigator url="../features/order/order" class="menus flex flex_center flex_y"> -->
					<view class="menus flex flex_center flex_y" @tap="_auth_href('/pages/features/order/order?current=2')">
						<img src="../../static/img/dd_dfh.png" class="menusPic"></img>
						<text class="cm_t_24">待发货</text>
						<view class="tips" v-if="hasLogin && accountInfo.wait_sending_count">{{accountInfo.wait_sending_count}}</view>
					</view>
					<!-- </navigator> -->
					<!-- <navigator url="../features/order/order" class="menus flex flex_center flex_y"> -->
					<view class="menus flex flex_center flex_y" @tap="_auth_href('/pages/features/order/order?current=3')">
						<img src="../../static/img/dd_dsh.png" class="menusPic"></img>
						<text class="cm_t_24">待收货</text>
						<view class="tips" v-if="hasLogin && accountInfo.wait_receiving_count">{{accountInfo.wait_receiving_count}}</view>
					</view>
					<!-- </navigator> -->
					<!-- <navigator url="../features/order/order" class="menus flex flex_center flex_y"> -->
					<view class="menus flex flex_center flex_y" @tap="_auth_href('/pages/features/refundList/refundList')">
						<img src="../../static/img/dd_th.png" class="menusPic"></img>
						<text class="cm_t_24">退货</text>
						<view class="tips" v-if="hasLogin && accountInfo.returned_goods_count">{{accountInfo.returned_goods_count}}</view>
					</view>
					<!-- </navigator> -->
					<!-- <navigator url="../features/order/order" class="menus flex flex_center flex_y"> -->

					<!-- </navigator> -->
				</view>
				<!-- </view> -->
			</view>
		</view>

		<!-- 菜单 -->
		<view class="menusBox">

			<view class="boxs">
				<!-- <view class="cm_title">其他工具</view> -->
				<view class="">
					<view class="menus flex flex_center " @tap="_auth_href('/pages/features/adress/adress')">
						<img src="../../static/img/ic_dz.png" class="menusPic"></img>
						<text class="cm_t_24 f1">收货地址</text>
						<tui-icon name="arrowright" :size="20"></tui-icon>
					</view>
					<view class="menus flex flex_center " @tap="_auth_href('/pages/features/comment/comment')">
						<img src="../../static/img/ic_bz.png" class="menusPic"></img>
						<text class="cm_t_24 f1">意见反馈</text>
						<tui-icon name="arrowright" :size="20"></tui-icon>

					</view>
					<!-- 					
					<view class="menus flex flex_center flex_y"  @tap="_href('/features/hpShare/hpShare')">
						<img src="../../static/img/fx.png"  class="menusPic"></img>
						<text class="cm_t_24">分享</text>
					</view> -->
					<view class="menus flex flex_center " @tap="_auth_href('/pages/user/set/set')">
						<img src="../../static/img/ic_sz.png" class="menusPic"></img>
						<text class="cm_t_24 f1">设置</text>
						<tui-icon name="arrowright" :size="20"></tui-icon>
					</view>
					<view class="menus flex flex_center " @tap="_kefu">
						<img src="../../static/img/ic_kf.png" class="menusPic"></img>
						<text class="cm_t_24 f1">客服</text>
						<tui-icon name="arrowright" :size="20"></tui-icon>
					</view>
				</view>
			</view>

		</view>

		<!-- 热门推荐 -->
		<view class="hot">
			<view class="cm_title title cm_tex_c">热门推荐</view>
			<view class="hotItemBar flex flex_around">
				<block v-for="(item, index) in lists" :key="index">
					<navigator :url="'/pages/main/details/details?code=' + item.goods_code" class="proItemsBoxBlock">
						<view class="picBox">
							<image @load="imageLoad(index)" @error="loadError(index)" lazy-load="true" :src="item.goods_main_img" mode="aspectFill"
							 class="pre animated" :class="item.load ? 'fadeIn' : ''"></image>
						</view>

						<view class="msgBox">
							<!-- <view class="flex flex_center" style="padding: 6px 0;"> -->

							<view class=" cm_ellipsis2  " style="line-height: 1.3;">
								<text class="tags" v-if="item.is_flashsale == 1">限时抢购</text>
								{{ item.goods_title }}
							</view>
							<!-- </view> -->
							<view class="cm_prize" style="margin-top: 20rpx;">￥{{ item.goods_price }}</view>
							<!-- <view class="cm_prize_delete" style="margin-top: 20rpx;">￥{{ item.project_price }}</view> -->
							<view class="cm_des" style="margin-top: 20rpx;">{{ item.buy_count  }}人购买</view>
						</view>
					</navigator>
				</block>
			</view>
			<LoadMore :status="loadStatus" />
		</view>
		<tui-modal :show="modal" @click="handleClick" @cancel="hide" :content="content" :maskClosable="false" color="#333"
		 :size="32"></tui-modal>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	// import tuiLoadmore from "@/components/loadmore/loadmore"
	import http from '@/utils/http/index.js';
	const globalSet = uni.getStorageSync(SET.globalSetName)
	import SET from '@/SET.js'


	export default {
		data() {
			return {
				// accountInfo: '',
				kefu: '',
				modal: false,
				logining: false,
				content: '请您先登录',
				action: 'login',
				loginParams: {
					"username": "",
					"password": "",
					"vilidate": "000000",
				},
				formParams: {
					"key": "",//关键字
					  "type": "1",//0-综合 1-热销 2-价格 
					  "sort": "desc",//asc-升序 desc-降序  
					  "class_code": "",
					  "pageIndex": 1,//分页：页面索引，第几页
					  "pageSize": 10//分页：页面大小，每页几条
				},
				onBottom: true,
				onTop: false,

				phone: ''
			};
		},
		onLoad() {
			let that = this;

			// this.autoLogin()
			// this.GetKefu();

			// 注册刷新事件
			uni.$on('refresh_user', function() {
				// console.log(1213541)
				// that.loadData();
				that.$store.dispatch('refreshUser')
			});
			this._getShopSet();
			this._getList();
		},
		onShow() {
			// this.loadData()

		},
		computed: {

			hasLogin() {
				return this.$store.state.hasLogin ? this.$store.state.hasLogin : false;
			},
			accountInfo() {
				return this.$store.state.accountInfo
			},
		},
		watch: {
			hasLogin(newValue, oldValue) {
				// console.log(oldValue)
				// console.log(newValue)
				this.loadData();
				// this.loadData();
			},
			// accountInfo(o,n){
			// 	console.log(o)
			// 	console.log(n)
			// },
		},
		components: {
		},
		// 下拉刷新
		onPullDownRefresh() {
			if (!this.hasLogin) {
				uni.stopPullDownRefresh();
				return;
			}
			this.loadData(() => {
				uni.stopPullDownRefresh();
			});
		},
		methods: {
		
			
			// 热门推荐
			async _loadData(type, callback) {
				let that = this;
				try {
					if (type == 'refresh') {
						that.loadStatus = 'loading';
					} else {
						that.loadStatus = 'loading';
					}

					let res = await this.$api.GetGoodsList(this.formParams);

					if (type == 'refresh') {
						// this.$ui.hideloading()
					} else {
						// that.loadStatus = 'loading'
					}
					if (res.result == 1) {
						if (type == 'refresh') {
							// 刷新
							that.loadStatus = 'more';
							that.list = res.data.rows;
						} else {
							// console.log(res.data.rows.length);
							// 更多
							if (res.data.rows.length == 0) {
								that.loadStatus = 'noMore';
							} else {
								let arr = that.list.concat(res.data.rows);
								that.list = arr;
								that.loadStatus = 'more';
							}
						}
					} else {
						that.$ui.toast(res.msg)
					}
				} catch (err) {
					// console.log('请求结果false : ' + err);
					that.loadStatus = 'more';
					if (callback) callback();
				}
				// this.loadModal = false;
				// this.$ui.hideloading();
				if (callback) callback();
			},
			_href(val) {

				if (!this.hasLogin) {
					this.content = '请您先登录'
					this.action = 'login' ///features/authentication/authentication'
					this.modal = true
					return;
				}
				switch (val) {
					case 'set':
						uni.navigateTo({
							url: '/pages/user/set/set'
						})
						break;
					default:
						uni.navigateTo({
							url: `/pages${val}`
						})
						break;
				}
			},
			// 加载个人信息
			async loadData(callback) {
				// alert(1)
				let that = this;
				try {
					// this.$ui.showloading();

					let res = await this.$api.getConsumer({}, false);
					// this.$ui.hideloading();
					// "wait_paying_count": 0,     //订单支付订单数
					//         "wait_sending_count": 0,    //等待发货订单数
					//         "wait_receiving_count": 0,  //等待收货订单数
					//         "returned_goods_count": 0,  //等待收货订单数
					// console.log(res)
					if (res.result == 1) {
						if (res.data) {
							that.$store.commit('setAccountInfo', res.data);
							// that.accountInfo = res.data;
						}
					} else {
						that.$ui.toast(res.msg)
					}
					if (callback) callback();
				} catch (err) {
					console.log('请求结果false : ' + err);
				}
			},
			handleClick(e) {
				let index = e.index;
				if (index === 0) {
					// this.tui.toast("你点击了取消按钮")			
				} else {
					// this.tui.toast("你点击了确定按钮")

					switch (this.action) {
						case 'login':
							uni.navigateTo({
								url: '/pages/role/pLogin/pLogin'
							})
							// uni.navigateTo({
							// 	url:'/pages/role/login/login'
							// })	
							break;
						case 'authentication':
							uni.navigateTo({
								url: '/pages/features/authentication/authentication'
							})
							break;
						case 'payPass':
							uni.navigateTo({
								url: '/pages/user/setPayPass/setPayPass'
							})
							break;
						default:
							break;
					}

				}
				this.modal = false
			},
			// 客服
			_kefu() {

				let that = this
				uni.showModal({
					title: '睿众商城提醒你',
					content: '立即致电官方客服？',
					success: function(res) {
						that.show = false;
						if (res.confirm) {
							uni.makePhoneCall({
								phoneNumber: this.phone //仅为示例
							});
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			async _getShopSet() {
				let that = this;
				try {
					let res = await this.$api.crm_getShopSet()					
					if (res.result == 1) {
						let text = res.data.tqa ? res.data.tqa.phone : ''
						this.phone = text ? text.split('：')[1] : ''
						uni.setStorageSync('hotPhone',this.phone)
					}

				} catch (err) {
					console.log('请求结果false : ' + err);
					that.pageLoading = false
				}
			},
		}
	};
</script>

<style scoped lang="scss">
	.pages {
		min-height: 100vh;
		// padding-bottom: 20rpx;
		.pageTop {
			width: 100%;
			background: url(../../static/img/wd_bg.jpg);
			background-size: contain;
			background-repeat: no-repeat;
			height: 260rpx;

			.header {
				width: 100%;
				line-height: 88rpx;
				font-size: 32rpx;
				color: #fff;

				.cm_title {
					text-align: center;
					color: #fff;
				}

				.btns {
					width: 88rpx;
					height: 88rpx;

					.iconfont {
						font-size: 44rpx;
					}
				}
			}

			.top {
				height: 118rpx;
				line-height: 118rpx;
				padding: 40rpx;

				.avatar {
					width: 102rpx;
					height: 102rpx;
					margin-right: 26rpx;
					border-radius: 50%;
					border: 2rpx solid #fff;

					img {
						// width: 100%;
					}

					// box-sizing: content-box;
				}

				.name {
					color: #fff;
				}

				.cz {
					// width: 104rpx;
					line-height: 54rpx;
					height: 54rpx;
					border: none;
					background: #333;
					color: #fff;
					text-align: center;
					padding: 0 20rpx;
					font-size: 26rpx;
					border-radius: 4rpx;
				}
			}
		}

		.accountBox {
			width: 100%;
			// height: 386rpx;
			position: relative;
			// padding: 0 20rpx;
			// background: red;

			.content {
				height: 160rpx;
			}

			.bottom {
				width: 100%;
				// height: 210rpx;
				// border-radius: 12rpx;
				background: #fff;
				// position: absolute;
				// bottom: -105rpx;
				// left: 20rpx;
				// margin-top: 40rpx;
				padding: 40rpx 20rpx;

				// box-shadow:0px 1px 16px rgba(213,213,213,0.5);
				.menus {
					width: 100%;

					position: relative;

					.menusPic {
						width: 60rpx;
						height: 60rpx;
						margin-bottom: 20rpx;
						margin-top: 32rpx;
					}

					.tips {
						width: 30rpx;
						height: 30rpx;
						color: #fff;
						background: red;
						border-radius: 50%;
						position: absolute;
						right: 20rpx;
						top: 20rpx;
						font-size: 20rpx;
						text-align: center;
						line-height: 30rpx;
					}
				}
			}
		}

		.menusBox {
			// padding: 20rpx;
			margin-top: 16rpx;

			.boxs {
				padding: 0rpx 20rpx;
				border-radius: 12rpx;
				background: #fff;
				margin-bottom: 20rpx;

				.cm_title {
					// margin-top: 12rpx;
				}

				.menus {
					width: 100%;
					height: 92rpx;

					.menusPic {
						width: 48rpx;
						height: 48rpx;
						margin-right: 12rpx;
					}
				}

				.menuTextNum {
					font-size: 48rpx;
					color: #5bc1ab;
					margin-bottom: 20rpx;
					margin-top: 36rpx;
				}
			}
		}

		.shadowLeft {
			// box-shadow:  -4rpx 0 16rpx #eee ;
			position: relative;

			&::before {
				content: '';
				width: 30rpx;
				height: 80rpx;
				// background: red;
				position: absolute;
				left: -30rpx;
				top: 48rpx;
				overflow: hidden;
				// border: 1rpx solid red;
				// background: radial-gradient(0 0,  #333,#fff );
				background: -webkit-radial-gradient(center, #dedede 30%, #fff 70%);
				// background-size: 90% 60%;
				background-position: 20rpx 0;
				background-repeat: no-repeat;
			}
		}

		.hot {
			width: 100%;
			padding: 0 20rpx;

			.title {
				line-height: 1;
				margin-bottom: 8rpx;
				margin-top: 32rpx;
				font-weight: bolder
			}

			.hotItemBar {
				width: 100%;
				flex-wrap: wrap;
				justify-content: space-between;
				// padding: 0 20rpx;

				.proItemsBox {
					width: calc((100% - 56rpx) / 2);
					height: 560rpx;
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
							background: linear-gradient(to right, #EE7E33, #EA3333);
							;
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
	}
</style>
