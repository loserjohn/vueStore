<template>
	<view class="pages">
		<view class="flex flex_center header">
			<image src="../../static/img/logo.jpg" mode="scaleToFill" class="logo"></image>
			<view class="cm_title f1">惠美</view>
			<button class="tapIn" @tap="_href(3, '')">进入商城</button>
		</view>
		<block v-for="(item, index) in tops" :key="index">
			<view class="blocks" :class="{'top1':index==0}" @tap="_href(4, item)">
				<image :src="item.link_file" mode="widthFix" class="blocks"></image>
			</view>
		</block>
		<!-- <view class="asideBar flex flex_center animated slideInDown" @tap="_href(3, '')"><tui-icon name="home" :size="20" color="#fff"></tui-icon></view> -->
	<!-- 	<view>
			<block v-for="(item, ind) in list" :key="ind">
				<view class="itemBox">
					<image :src="item.class_img" mode="aspectFill" class="itemTop" @tap="_href(1, item)"></image>
					<block v-for="(it, ids) in item.list" :key="ids">
						<view class="content">
							<image :src="it.goods_main_img" mode="widthFix" class="itemPic"></image>
							<view class="flex flex_center textBox">
								<view class="flex flex_center" style="color: #EA3333;" v-if="it.is_flashsale==1">
									<view>
										<view class="cm_tex_r" style="font-size: 20rpx;">￥</view>
										<view style="font-size: 20rpx;">折扣价</view>
									</view>
									<view class="  prize">
										<text class="price">{{ it.project_raise_price }}</text>
									</view>
								</view>
								<view class="flex flex_center" style="color: #008589;" v-else>
									<view>
										<view class="cm_tex_r" style="font-size: 20rpx;">￥</view>
										<view style="font-size: 20rpx;">特惠价</view>
									</view>
									<view class=" prize">
										<text class="price">{{ it.project_raise_price }}</text>
									</view>
								</view>


								<view class="f1 cm_prize_delete" style="margin-left: 20rpx;">专柜价 ￥{{ it.project_raise_price }}</view>
								<button class="cm_tags primary " :class="{'hot':it.is_flashsale==1?true:false}" style="font-size: 28rpx;" size="small"
								 @tap="_href(2, it)">查看详情</button>
							</view>
						</view>
					</block>
				</view>
			</block>
		</view> -->
	</view>
</template>

<script>
	// import Utils from '@/utils/utils.js';
	// const topsPics = uni.getStorageSync('global_Set_jll');
	export default {
		data() {
			return {
				tops: [],
				list: [],
				formParams: {
					pageIndex: 1,
					pageSize: 100
				}
			};
		},
		onLoad() {
			// alert(1)
			this._loadData();
			// const t = uni.getStorageSync('hrefAction');
			// // console.log(t)
			// // if (t && this.is_weixn()) {
			// // 	this.ifAuth();
			// // }
			// const loca =  uni.getStorageSync('path')
			// uni.removeStorageSync('path')
			// // alert(loca)
			// if(loca){
			// 	uni.navigateTo({
			// 		url:loca
			// 	})
			// }
		},
		computed: {
			hasLogin() {
				return this.$store.state.hasLogin ? this.$store.state.hasLogin : false;
			}
		},
		methods: {

			// 是否微信浏览器
			is_weixn() {
				var ua = navigator.userAgent.toLowerCase();
				if (ua.match(/MicroMessenger/i) == 'micromessenger') {
					return true;
				} else {
					return false;
				}
			},
			// 是否受过权
			ifAuth() {
				let url = window.location.href;
				let s = url.match(/code=(.*)&state/);
				if (s) {
					// 是授权后的页面,则做opnegid判断 使用code获取pid
					// return s[1]
					// 换取oid
					this._getAuth(s[1]);
				} else {
					// 不是授权的页面，重定向进行授权

					Utils.wx_auth();
				}
				// uni.removeStorageSync('hrefAction');
				// uni.removeStorageSync('hrefItem');
			},
			// 跳转
			_href(t, item) {
				let that = this;
	
				if (t == 1) {
					uni.navigateTo({
						url: `/pages/classify/products_s/products_s?code=${item.project_class_code}&title=${item.class_name}`
					});
				} else if (t == 2) {
					uni.navigateTo({
						url: '/pages/main/details/details?code=' + item.project_code
					});
				} else if (t == 3) {
					uni.switchTab({
						url: '/pages/main/main'
					});
				} else {
					if (item.link_url) {
						// alert('/pages/main/details/details?code=' + item.link_url)
						// return
						uni.navigateTo({
							url: item.link_url
						});
					}

				}
				uni.removeStorageSync('hrefAction');
				uni.removeStorageSync('hrefItem');
			},
			// code换取opendID
			async _getAuth(code) {
				let that = this;
				if (!code) return;
				// console.log(111,code)
				try {
					let res = await this.$api.userRegiste({
							"mobile": "",
							"password": "",
							"type": "0",
							"invitation": "",
							"website": "",
							"vilidate": "",
							wx_code: code
						},
						true
					);
					// console.log(222, res)
					if (res.result==1) {
						uni.setStorageSync(SET.opIdName, res.data.openId);
						that._oIdLogin(res.data.openId);
					} else {
						uni.showToast({
							icon: 'none',
							title: '获取身份失败，请手动登录',
						})
						// alert(res.msg)
						uni.navigateTo({
							url: '/pages/role/pLogin/pLogin'
						});
					}
				} catch (err) {
					console.log('请求结果false_getAuth : ' + err);
				}
			},

			// oid登录
			async _oIdLogin(OID) {
				let that = this;

				if (!OID) return;
				let data = {
					openId: OID
				};
				//
				try {
					let res = await this.$api.WxTokenLogin(data, false);
					// console.log('4444', res)
					if (res.result==1) {
						that.$ui.toast('登陆成功');
						console.log('登陆成功')
						if (res.data.hp) uni.setStorageSync(SET.tokenName, res.data.hp);
						// console.log(data)
						that.$store.commit('login');
						const item = uni.getStorageSync('hrefItem');
						const t = uni.getStorageSync('hrefAction');
						// console.log(t)
						// console.log(item)
						if (t == 1) {
							uni.navigateTo({
								url: `/pages/classify/products_s/products_s?code=${item.project_class_code}&title=${item.class_name}`
							});
						} else if (t == 2) {
							uni.navigateTo({
								url: '/pages/main/details/details?code=' + item.project_code
							});
						} else {
							uni.switchTab({
								url: '/pages/main/main'
							});
						}
						uni.removeStorageSync('hrefAction');
						uni.removeStorageSync('hrefItem');
					} else {
						// 用户不存在,则引导注册
						uni.navigateTo({
							url: '/pages/role/bund/bund'
						});
					}
					// console.log('_oIdLoginsuccess : ' + JSON.stringify(res))
				} catch (err) {
					console.log('请求结果false _oIdLogin: ' + err);
				}
			},
			// 热门推荐
			async _loadData(type, callback) {
				let that = this;
				try {
					let res = await this.$api.crm_getHome( );
					console.log(res);

					if (res.result==1) {
						that.tops = res.data.lst_page_detail;
					} else {
						// that.$ui.toast(res.msg)
					}
				} catch (err) {
					that.loadStatus = 'more';
					if (callback) callback();
				}
				if (callback) callback();
			}
		}
	};
</script>

<style lang="scss" scoped>
	.pages {

		// padding-bottom: 100rpx;
		.top1 {
			margin-top: 0;
		}

		.header {
			height: 100rpx;
			line-height: 100rpx;
			padding: 0 20rpx;
			margin-bottom: 1vw;

			.logo {
				width: 80rpx;
				height: 80rpx;
				border-radius: 50%;
				margin-right: 20rpx;
			}

			.tapIn {
				height: 60rpx;
				line-height: 60rpx;
				padding: 0 40rpx;
				border-radius: 30rpx;
				background: linear-gradient(45deg, #ec6434, #eb4434);
				color: #fff;
			}
		}

		.blocks {
			width: 750rpx;
			// height: 420rpx;
			height: auto;
			margin-top: -1vw;
		}

		.itemBox {
			.itemTop {
				width: 750rpx;
				height: 160rpx;
			}

			.itemPic {
				width: 100%;
				height: 100%;
			}

			.price {
				font-size: 56rpx;
				font-weight: bolder;
				margin-right: 28rpx;
			}

			.textBox {
				height: 160rpx;
				padding: 0 30rpx;
				background: #fff;
			}
		}

		.cm_tags {
			width: 264rpx;
			height: 80rpx;
			line-height: 80rpx;
		}

		.cm_tags.hot {
			background: #EA3333;
			border-color: #EA3333;
		}

		.asideBar {
			width: 90rpx;
			height: 90rpx;
			border-radius: 50%;
			background: var(--cl_primary);
			position: fixed;
			left: 40rpx;
			top: 40rpx;
			z-index: 50;
		}
	}
</style>
