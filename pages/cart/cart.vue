<template>
	<view>

		<view class="pages">
			<view v-if="hasLogin">
				<block v-for="(it, idx) in lists" :key="idx">
					<!-- <navigator :url="'/pages/main/details/details?code=' + item.project_code" class="proItemsBox"> -->
					<view class="proItemsBox">
						<view class="flex flex_center">
							<image :src="it.shop_logo" mode="" class="shopIcon"></image>
							<view class="cm_title f1">{{ it.shop_name }}</view>
							<tui-icon name="arrowright" :size="16"></tui-icon>
						</view>
						<block v-for="(item, index) in it.goods_child" :key="index">
							<view class="flex flex_center contenBox">
								<!-- <navigator :url="'/pages/main/details/details?code=' + item.project_code" class="flex flex_center contenBox"> -->
								<view class="checkBox" @tap="_check(idx,index)">
									<!-- {{item.index}} -->
									<tui-icon name="circle-fill" :size="16" color="#039798" v-if="item.checked"></tui-icon>
									<tui-icon name="circle" :size="16" v-else></tui-icon>
								</view>
								<view class="f1 flex flex_center " style="align-items: flex-start;">
									<!-- <view class="f1 flex flex_center " style="align-items: flex-start;"> -->
									<view class="picBox  flex flex_center">
										<image lazy-load="true" :src="item.goods_main_img" mode="aspectFill" class="pre animated fadeIn"></image>
									</view>

									<view class="msgBox f1">
										<navigator :url="'/pages/main/details/details?code=' + item.goods_code">
											<view class=" cm_ellipsis2 cm_title ">
												{{ item.goods_title }}
											</view>							
										</navigator>
										<view class="cm_ellipsis2 cm_des  " v-if="item.goods_spec" @click="switchSku(item.goods_code)">
											{{ item.goods_spec.skus_difference | differenceText }}
											<tui-icon name="arrowdown" :size="16" color="#999"></tui-icon>
										</view>
										<view class="  cm_ellipsis2 cm_des" style="color: #f5a139; " v-if="couponList[item.cart_code]&& couponList[item.cart_code].goods_service_txt ">
											{{ couponList[item.cart_code].goods_service_txt}}
										</view> 
										<view class="flex flex_center" style="margin-top: 10rpx;">
											<view class="cm_des " style="margin-right: 20rpx;color:#e02e24">
												￥{{ item.goods_spec.skus_price}}
											</view>
											<tui-tag type="danger" padding=" 8rpx 16rpx " size="24rpx" shape="circle" v-if="couponList[item.cart_code]&& couponList[item.cart_code].child_coupon_txt ">{{couponList[item.cart_code].child_coupon_txt}}</tui-tag>
											<view class="f1"></view>
											<tui-icon name="shut" color="#999" :size="12"></tui-icon>
											<text class="cm_des">{{item.goods_num}}</text>
										</view>
										
										<view class="cm_des " style="margin-top: 10rpx;" v-if="couponList[item.cart_code]&& couponList[item.cart_code].child_coupon_name ">
											{{couponList[item.cart_code].child_coupon_name}}
										</view>
									</view>
									<!-- </view> -->
								</view>
							</view>
						</block>
						<view class="flex flex_center proBottom " v-show="couponSumMsg.coupon_name">
							<text >{{`${ couponSumMsg.coupon_name }`}}</text>
							<view class="f1"></view>
							<!-- <text class="price">共计：{{`￥${payprice}`}}</text> -->
						</view>
					</view>
				</block>

				<view class="footer   animated fadeIn " v-if="lists.length > 0">
					<view class="savebottom">
						<view class="footerContent flex flex_center ">
							<view class=" flex flex_center">
								<text style="margin-left: 20rpx;" v-if="sellectAll" @tap="selectAll(false)">全不选</text>
								<text style="margin-left: 20rpx;" v-else @tap="selectAll(true)">全选</text>
							</view>
							<view class="f1"></view>
							<view class=" flex flex_center">
								<!-- <text style="margin-right: 20rpx;">合计:</text> -->
								<view class="sumPriceBox">
									<view class="price">{{ payprice }}</view>
									<text class="gjyh" v-show="couponSumMsg.sum_sale_price">共优惠：{{`￥${ couponSumMsg.sum_sale_price }`}}</text>
								</view>
						
								<button class="cancel" v-show="sellectLast" plain @tap="_clear">删除</button>
								<button class="submit" @tap="submit">{{ couponSumMsg.sum_sale_price>0?'领券结算':'结算'}} </button>
							</view>
						</view>
					</view>
					
				</view>
				<view class="flex flex_center animated fadeIn" style="width: 100%;height: 80vh;" v-else>
					<!-- <tui-tips :fixed="false" imgUrl="/static/img/toast/none.png">
						还没有商品哟
						<navigator open-type="switchTab" url="../main/main">
							<tui-button type="primary" shape="circle" width="180rpx" height="60rpx" style="transform: scale(0.9);margin-top: 20rpx;">去逛逛</tui-button>
						</navigator>
					</tui-tips> -->
					<tui-no-data imgUrl="/static/img/toast/img_nodata.png" backgroundColor="#50ab9f"     >
						<view class="flex flex_y flex_center">
							<text class="tui-color__black">您还没有购买任何商品~</text>
							<!--如果需要自定义按钮，可在插槽中自定义，不使用默认按钮-->
							<navigator open-type="switchTab" url="../main/main">
								<tui-button type="primary" shape="circle" width="180rpx" height="60rpx" style="transform: scale(0.9);margin-top: 20rpx;">去逛逛</tui-button>
							</navigator>
						</view>
						
					</tui-no-data>
					
				</view>
			</view>
			<view v-else class="modal flex flex_y flex_center">
				<text class="cm_des" style="margin-bottom: 20rpx;">您尚未登录</text>
				<tui-button type="warning" width="180rpx" height="60rpx" :size="24" shape="circle" @tap="_login">立即登录</tui-button>
			</view>
		</view>
		<xhStoreParamsSKU    ref="params" :bottom="100" :ifActive="goods.is_flashsale==1?true:false" :preImg="goods.goods_main_img"
		 :title="goods.goods_title" :parameter="specifications" :difference="skuList" :defaultprice="goods.goods_price"
		 :defaultstock="goods.default_stock" @creatOrder="creatOrder"   :propertyList="propertyList"></xhStoreParamsSKU>
		
	</view>

</template>

<script>
	
	// 	[{
	// 		"goods_code": "778b0da4b08f41049724e9e81866d305",
	// 		"create_time": "2020-01-13 15:30:50",
	// 		"cart_user": "1de1b2e336314c54a42da2d7b2e4cf87",
	// 		"shop_name": "全绒睡衣旗舰店",
	// 		"shop_logo": "http://hp.fjhjc.net/upload/head/head.jpg",
	// 		"prioject_code": "420c8edbb3594c338483d1859ff61621",
	// 		"goods_num": 1,
	// 		"goods_title": "睡衣裤全绒",
	// 		"project_price": 80,
	// 		"goods_main_img": "http://hp.fjhjc.net/upload/cmslinkimage/products/5B4379ED1B85E3B94718CC8CAFE62157_original.JPG",
	// 		"is_ems": "0",
	// 		"project_status": "1"
	// 	}],
	// 购物车
	import tuiTips from '@/components/extend/tips/tips';
	import tuiNumberbox from '@/components/numberbox/numberbox';
	import {
		mapGetters
	} from 'vuex';
	import xhStoreParamsSKU from '@/components/xhStoreParamsSKU/xhStoreParamsSKU';
	export default {
		data() {
			return {

				baseKey: 'cardList',
				formParams: {
					pageIndex: 1,
					pageSize: 100
				},
				onBottom: false,
				onTop: false,
				lists: [],

				hasRow: false,
				couponList: {}, //存放优惠券
				couponSumMsg: {} ,//每次优惠计算的数据
				
				// skulist??
				goods: '',  //商品信息
				skuList: [],
				specifications: [],
				propertyList:[],
			};
		},
		components: {
			tuiNumberbox,
			tuiTips,
			xhStoreParamsSKU
		},
		filters: {
			differenceText(arr) {
				return arr&& arr.length ? arr.join(',') : ''
			}
		},
		onLoad() {
			let that = this;
			// const global_Set_jll = uni.getStorageSyglobal_Set_jll_Set_jll');
			// this.banners = global_Set_jll.banerList;
			uni.$on('refresh_cart', () => {
				if (this.hasLogin) {
					this._getList('refresh');
				}
			});
			if (this.hasLogin) {
				this._getList('refresh');

			}
		},
		onShow() {
			// console.log(this.lists)
		},
		onNavigationBarButtonTap(e) {
			// console.log(e.index);

		},
		computed: {
			// 重构list数据结构
			cartList() {
				let shopList = [];
				this.lists.forEach((it, idx) => {
					let ls = it.goods_child
					ls.forEach((item, index) => {
						item.shop_name = it.shop_name
						item.shop_logo = it.shop_logo
						item.shop_id = it.shop_id
						shopList.push(item)
					})
				})
				return shopList
			},
			// 至少选一个选判断
			sellectLast() {
				let b = this.cartList.some(item => {
					if (item.checked) {
						return true;
					} else {
						return false;
					}
				})
				return b
				// return this.cartList.length?true:false;
			},
			// 全选判断
			sellectAll() {
				let b = this.cartList.every(item => {
					if (item.checked) {
						return true;
					} else {
						return false;
					}
				});
				return b;
			},
			// 全部金额
			payprice() {
				let p = 0;
				this.selectProducts.forEach(item => {
					p += Number(item.origin_price) ;				
				});
				// for(let item in this.couponList){
				// 	console.log(this.couponList[item])
				// 	p+=Number(this.couponList[item].goods_service_price)
				// }
				if (this.couponSumMsg && this.couponSumMsg.sum_sale_price) {
					return (p - this.couponSumMsg.sum_sale_price).toFixed(2);
				} else {
					return p.toFixed(2);
				}

			},
			// 选择的购物车数组
			selectProducts() {

				let s = [];
				this.cartList.forEach(item => {
					if (item.checked) {
						s.push({ ...item
						});
					}
				});
				if (s.length) {
					this._getCoupons(s)
				} else {
					this.couponList = {}
					this.couponSumMsg = {}
				}

				return s;
			}
		},
		watch: {
			hasLogin(newValue, oldValue) {
				if (newValue) {
					this._getList('refresh');
				}
			}
		},
		methods: {
			creatOrder(){
				alert('暂时不支持切换')
			},
			async switchSku(code){
				let that = this;
				try {
					let form = {
						goods_code: code
					}
					let res = await this.$api.GetGoodsInfo(form);
					// console.log(res.data.goods_service_list)
					if (res.result == 1) {
						// that.skuList =[];
						// that.specifications = [];
						// that.propertyList = [];
						that.goods = res.data.goods;
						that.skuList = res.data.skuList;
						that.specifications = res.data.goods_parameter;
						that.propertyList = res.data.goods_service_list;
				
						this.$refs.params.show();
				
					} else {
						that.$ui.toast(res.msg);
						setTimeout(() => {
							uni.reLaunch({
								url: '/pages/main/main'
							});
						}, 1000)
					}
				} catch (err) {
					console.log('请求结果false : ' + err);
					setTimeout(() => {
						uni.reLaunch({
							url: '/pages/main/main'
						});
					}, 1000)
				}
			},
			// 获取购物车 优惠券数据
			async _getCoupons(s) {

				let form = {
					shop_id: s[0].shop_id,
					cartcodes: (s.map(item => {
						return item.cart_code
					})).join(',')
				}

				let that = this
				let res = await this.$api.GetCartCouponList(form)
				// console.log(res)  
				if (res.result == 1) {
					that.couponList = {}
					res.data.cart_sale_list.forEach(item => {
						that.couponList[item.cart_code] = item
					})
					// console.log(that.couponList)
					that.couponSumMsg = { ...res.data
					}
				} else {

				}
			},
			_getListAfter() {
				// alert(1)
				this.lists.forEach(item => {
					item.goods_child.forEach(it => {
						it.checked = true
						it.origin_price = it.goods_num * it.goods_spec.skus_price
					});
				});
				console.log(this.lists)
			},
			_clear() {
				if (!this.hasLogin) {
					this.$ui.toast('请您先登录');
					return;
				}
				// alert(1)
				this._delete();
			},

			// 删除购物车
			async _delete() {
				if (this.selectProducts.length == 0) {
					this.$ui.toast('请选择商品');
					return;
				}
				let that = this;
				let s = [],
					data = {};
				this.selectProducts.forEach(item => {
					s.push(item.cart_code);
				});
				data.ids = Object.values(s).join(',');
				// debugger
				try {
					// console.log(data);
					let res = await this.$api.cardDelete(data, false);
					// this.$ui.hideloading()
					// console.log(res);
					if (res.result == 1) {
						that.$ui.toast('删除成功');
						that._getList('refresh');
					} else {
						that.$ui.toast(res.msg);
					}
					// if (callback) callback();
				} catch (err) {
					console.log('请求结果false : ' + err);
				}
			},
			selectAll(k) {
				this.lists.forEach(item => {
					item.goods_child.forEach(it => {
						it.checked = k;
					});
				});
				this.lists = [...this.lists]
				// console.log(this.cartList)
			},
			// 修改值
			change(event, idx, index) {
				// console.log(this.lists )
				this.lists[idx].goods_child[index].goods_num = event.value
				let item = this.lists[idx]
				this.$set(this.lists, idx, { ...item
				})
			},
			_check(idx, index) {
				// console.log(this.lists )
				let check = this.lists[idx].goods_child[index].checked
				this.lists[idx].goods_child[index].checked = !check
				let item = this.lists[idx]
				this.$set(this.lists, idx, { ...item
				})

			},


			//格式化数组
			filerArray(arr) {
				// debugger
				let a = [];
				let aa = arr.map(item => {
					item.checked = true;
					a.push(item);
				});
				// console.log(aa);
				return a;
			},
			// 结算提交订单
			submit() {
				// console.log(this.selectProducts);
				// return
				if (this.selectProducts.length == 0) {
					this.$ui.toast('请选择商品');
					return false;
				}
				uni.showToast({
					icon: 'none',
					title: '去结算'
				});
				this.$store.commit('creatOrder', [...this.selectProducts]);
				this.$store.commit('creatCoupon', { ...this.couponSumMsg});
				uni.navigateTo({
					url: `/pages/features/createOrder/createOrder?type=1`
				});
			}
		}
	};
</script>

<style lang="scss" scoped>
	.header {
		width: 100%;
		line-height: 88rpx;
		height: 88rpx;
		font-size: 32rpx;
		color: #fff;
		position: fixed;
		background: #fff;
		z-index: 10;
		left: 0;
		top: 0;
		padding: 0 20rpx;

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

	.pages {
		padding: 20rpx;
		min-height: calc(100vh - 188rpx);
		padding-bottom: 140rpx;

		.proItemsBox {
			width: 100%;
			// height: 532rpx;
			background: #fff;
			border-radius: 14rpx;
			margin-bottom: 16rpx;
			padding: 20rpx;
			overflow: hidden;

			.shopIcon {
				width: 36rpx;
				height: 36rpx;
				border-radius: 50%;
				margin-right: 8rpx;
			}

			.contenBox {
				border-bottom: 1rpx solid #f1f1f1;
				// margin: 20rpx 0;
				padding: 20rpx 0;

				.checkBox {
					width: 36rpx;
					height: 36rpx;
					border-radius: 50%;
					margin-right: 20rpx;
					// margin
				}

				.picBox {
					width: 190rpx;
					height: 190rpx;
					overflow: hidden;
					position: relative;
					margin-right: 20rpx;
					margin-bottom: 0;
					border-radius: 10rpx;
					border: 1rpx solid #f2f2f2;

					.pre {
						width: 190rpx;
						height: 190rpx;
						overflow: hidden;
						opacity: 1;
					}
				}

				.msgBox {
					// .title {
					// 	line-height: 1.4;
					// 	margin-bottom: 10rpx;
					// 	font-size: 30rpx;
					// }

					// padding: 16rpx;
					// .tags {
					// 	background: red;
					// 	color: #fff;
					// 	padding: 0 8rpx;
					// 	border-radius: 4rpx;
					// 	font-size: 20rpx;
					// 	line-height: 30rpx;
					// 	height: 30rpx;
					// 	margin-right: 10rpx;
					// 	margin-top: -8rpx;
					// }

					// .cm_text {
					// 	line-height: 64rpx;
					// 	justify-content: flex-start;
					// }

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
			// .contenBox:last-child {
			// 	border-bottom: none!important;
			// 	padding-bottom: 0;
			// }
			.proBottom {
				width: 100%;
				text-align: right;
				padding-top: 20rpx;

				.price {
					padding-left: 20rpx;
					font-size: 32rpx;
					color: #ec6d46;
				}
			}
		}

		.footer {
			position: fixed;
			width: 100%;
			min-height: 100rpx;
			left: 0;
			box-sizing: border-box;
			// #ifdef H5
			bottom: 100rpx;
			// #endif


			z-index: 20;
			padding: 20rpx;

			.footerContent {
				background: linear-gradient(to right, #ec6d46, #da352d);
				border-radius: 20rpx 0 20rpx 0;
				padding: 20rpx;
				width: 100%;
				color: #fff;

				.sumPriceBox {
					margin-right: 20rpx;

					.price {
						font-size: 44rpx;
						position: relative;
						text-indent: 40rpx;
						font-weight: 600;
						position: relative;

						&::after {
							content: '￥';
							position: absolute;
							left: -19px;
							font-size: 20px;
							bottom: 4rpx;
							color: #fff;
						}
					}

					.gjyh {
						display: block;
						width: 100%;
						font-size: 20rpx;
						color: #fff;
						text-align: right;
					}
				}

				.submit {
					padding: 0 30rpx;
					line-height: 68rpx;
					height: 68rpx;
					border-radius: 34rpx;
					background: #fff;
					color: #da352d;
					border: 1rpx solid #fff;
					// margin-left: 40rpx;
				}

				.cancel {
					padding: 0 30rpx;
					line-height: 68rpx;
					height: 68rpx;
					border-radius: 34rpx;
					background: #fff;
					color: #ec6d46;
					margin-right: 10rpx;
					border: 1rpx solid #fff;
					// margin-left: 10rpx;
				}
			}

		}

		.modal {
			width: 100%;
			height: 80vh;
			background: #fff;
		}
	}
</style>
