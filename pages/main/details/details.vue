<template>
	<view>
		<tui-skeleton v-if="skeletonShow" backgroundColor="#f9f9f9" skeletonBgColor="#efefef" borderRadius="0rpx"></tui-skeleton>
		<view class="pages tui-skeleton">
			<!-- <view class="uni-padding-wrap"> -->
			<view class="page-section swiperBox tui-skeleton-rect ">
				<!-- <view class="page-section-spacing"> -->
				<swiper class="swiper" :indicator-dots="true" :autoplay="true">
					<block v-for="(item, index) in banners" :key="index">
						<swiper-item>
							<image :src="item" mode="aspectFill" lazy-load="true" class="swiper-item uni-bg-red" style="width: 100%;height: 100%;"></image>
						</swiper-item>
					</block>
				</swiper>
				<img src="../../../static/img/activebg.png" v-show="goods.is_flashsale==1" class="swiperBg"></img>
			</view>
			<view class="bar flex flex_y flex_center" v-if="goods.is_flashsale==1">
				<view class="acountTit">{{goods.title}}</view>
				<view class="acountConten flex  flex_center">
					<view class="price">{{goods.goods_price}}</view>
					<view class=" delete">￥{{goods.goods_original_price}}</view>
					<view class="f1"></view>
				</view>
				<view class="aside flex flex_y flex_center">
					<view>活热进行中</view>
					<!-- <view>
							<CountCalc color="#fff" background-color="#D8442E" border-color="#D8442E" splitorColor="#ED754B" :show-colon="true"  :show-day="false" v-if="restTimeValied"
							 :hour="restTimeValied.h" :minute="restTimeValied.m" :day="restTimeValied.d" :second="restTimeValied.s"  />
							<text class="f1" style="color: #ED754B;margin-top: 14rpx;"></text>	
						</view> -->
				</view>
			</view>


			<view style="padding: 20rpx 20rpx 0 20rpx;">
				<view class="boxs box1">
					<view class="flex titleBox tui-skeleton-fillet" v-if="goods.is_flashsale!=1">
						<text class="cm_prize" style="margin-right: 10rpx;">￥{{ goods.goods_price }}</text>
						<text class="cm_prize_delete">￥{{ goods.goods_original_price }}</text>
						<!-- <tui-tag type="danger" padding="10rpx 20rpx" shape="circle" size="24rpx">券后￥2341起</tui-tag> -->
						<view class=" f1"></view>
						<!-- <text style="color:#999 ;" @click="showModalStatus=true">查看优惠券</text> -->
						<!-- <tui-icon name="arrowright" :size="20" color="#999"> </tui-icon> -->
					</view>
					<view class="flex couponBox flex_center" :style="{'padding-top':goods.is_flashsale==1?'20rpx':''}">
						<tui-tag type="danger" plain v-for="(item,index) in couponList" v-show="index<=1" :key="index" padding="10rpx 20rpx" shape="circle" size="24rpx">{{`满${item.order_amount}减${item.price}`}}</tui-tag>
						<view class=" f1"></view>
						<span style="color:#999 ;" @click="showModalStatus=true">查看</span>
						<tui-icon name="arrowright" :size="20" color="#999"> </tui-icon>
					</view>
					<view class="cm_title tui-skeleton-fillet" style="line-height: 40rpx;">
						<text class="tags" v-if="goods.is_flashsale==1">限时抢购</text>{{ goods.goods_title }}
					</view>
					<view class=" tui-skeleton-fillet short_title">
						{{ goods.goods_short_title }}
					</view>
					<view class="logoBox flex  flex_center">
						<image src="../../../static/img/logo.jpg" mode="widthFix" class="logo"></image>
						<view class=" cm_title   name">睿众</view>
						<view class="blank"></view>

						<text class="f1">第一家智能厨卫上市公司</text>
					</view>
				</view>

				<view class="boxs box4">
					<view class="flex flex_center cells">
						<view class="f1 cm_des">发货地</view>
						<tui-icon name="position-fill" color="#333" :size="16" style="margin-right: 4rpx;"></tui-icon>
						<text class="">{{business.shipments_address.area }}</text>
					</view>
					<view class="cm_lines"></view>
					<view class="flex flex_center cells">
						<view class="f1 flex flex_center">
							<image src="../../../static/img/choose.png" mode="widthFix" style="width: 40rpx;height: 40rpx;"></image>
							<text class="cm_des" style="margin-left: 8rpx;">7天无理由退货</text>
						</view>
						<view class="f1 flex flex_center">
							<image src="../../../static/img/choose.png" mode="widthFix" style="width: 40rpx;height: 40rpx;"></image>
							<text class="cm_des" style="margin-left: 8rpx;">正品保障</text>
						</view>
						<view class="f1 flex flex_center">
							<image src="../../../static/img/choose.png" mode="widthFix" style="width: 40rpx;height: 40rpx;"></image>
							<text class="cm_des" style="margin-left: 8rpx;">全国联保</text>
						</view>
					</view>
					<view class="line"></view>
					<!-- 		</view>
				<view class="boxs box3"> -->
					<view class="picBox flex  flex_center">
						<image :src="business.shop_logo" mode="aspectFill" class="avatar tui-skeleton-rect"></image>
						<view class="f1 tui-skeleton-fillet">
							<view class=" cm_title   name">{{ business.shop_name }}</view>
							<!-- <view class="flex cm_t_24 text">4| 累计收益(元) 0</view> -->
						</view>
						<navigator url="/pages/main/main" open-type="switchTab" class="cm_des">进店逛逛</navigator>

						<tui-icon name="arrowright" color="#999" :size="16"></tui-icon>
						<!-- <button class=" jd">进店逛逛</button> -->
					</view>
					<!-- <view class="scoreBox flex flex_center">
						<view class="f1 flex flex_center tui-skeleton-fillet">
							<text class="">宝贝描述</text>
							<text class="score">{{ business.sevice_point }}</text>
						</view>
						<view class="f1 flex flex_center tui-skeleton-fillet">
							<text class="">卖家服务</text>
							<text class="score">{{ business.sevice_point }}</text>
						</view>
						<view class="f1 flex flex_center tui-skeleton-fillet">
							<text class="">物流服务</text>
							<text class="score">{{ business.sevice_point }}</text>
						</view>
					</view> -->
				</view>
				<!-- {{addPrize}} -->



			</view>
			<view class="commonTit flex flex_center">
				<view class="blank"></view>
				<view class="cm_title">商品详情</view>
				<view class="blank"></view>
			</view>

			<view class="richBox" v-if="goods.is_ueditor==1">
				<rich-text :nodes="goods.goods_details"></rich-text>
			</view>
			<view class="richBox" v-else>
				<block v-for="(it, index) in details_img" :key="index">
					<image :src="it" mode="widthFix" style="width: 100%;"></image>
				</block>
			</view>
			<view class="footer savebottom" v-if="!skeletonShow">
				<view class="flex flex _center" style="padding: 10rpx 24rpx;">
					<view class="flex  flex_y flex_center mes" @tap="_phone">
						<image src="../../../static/img/xq_kf.png" mode="widthFix" style="width: 50rpx;height: 50rpx;"></image>
						<text class="cm_des ">客服</text>
					</view>
					<view class="flex  flex_y flex_center mes" @tap="cart">
						<image src="../../../static/img/xq_gwc.png" mode="widthFix" style="width: 50rpx;height: 50rpx;"></image>
						<text class="cm_des ">购物车</text>
					</view>
					<view class="f1"></view>
					<view class=" btnBox flex flex_center" style="margin-left: 20rpx;">
						<button class="btns" @tap="_next" :disabled="goods.goods_status != 1">加入购物车</button>
						<view class="btns hot flex flex_y flex_center" v-if="goods.is_flashsale==1?true:false" @tap="_next">
							<view class="cm_t_20">马上抢</view>
							<view class="" style="margin-top: 8rpx;">折后￥{{goods.goods_price}}</view>
						</view>
						<button class="btns sure" @tap="_next" v-else :disabled="goods.goods_status != 1">立即购买</button>
					</view>
				</view>

			</view>
		</view>
		<tui-modal :show="modal" @click="handleClick" @cancel="hide" :content="content" :maskClosable="false" color="#333"
		 :size="32"></tui-modal>
		<!-- <best-payment-password :title="tigs" :show="payFlag" :value="paymentPwd" digits="6" @cancel="cancelPass" @submit="checkPwd" :forget="false"></best-payment-password> -->

		<!-- 		<xhStoreParams ref="params" 
			:preImg="banners[0]" 
			:title="goods.goods_title"
			:prize="goods.project_raise_price" 
			@creatOrder="creatOrder"
			@addCard="addCard"
		></xhStoreParams> -->
		<xhStoreParamsSKU :platform="platform" ref="params" :ifActive="goods.is_flashsale==1?true:false" :preImg="goods.goods_main_img"
		 :title="goods.goods_title" :parameter="specifications" :difference="skuList" :defaultprice="goods.goods_price"
		 :defaultstock="goods.default_stock" @creatOrder="creatOrder" @addCard="addCard"></xhStoreParamsSKU>

		<view class="mask-screen" @tap="_toggleModal" @touchmove.stop.prevent="_none" v-show="showModalStatus">
			<view class="couponsbox animated slideInUp" v-show="showModalStatus" @tap.stop="_none">
				<view class="couponTitle">优惠券</view>
				<view class="couponsItem flex flex_center" v-for="(item,index) in couponList" :key="index">
					<view class="numBox flex flex_y  flex_center">
						<view class="num prize">{{item.price}}</view>
						<text class="texts">{{item.use_area}}</text>
					</view>
					<view class="f1 couponContent">
						<view class="num ">{{item.order_amount_text}}</view>
						<text class="texts">{{item.end_date}}</text>
					</view>
				</view>
				
				<view class="tips">即刻下单，系统自动为您匹配最高优惠券</view>
				<tui-button type="danger" shape="circle" @tap="_next">即刻下单</tui-button>
			</view>
		</view>

		<!-- <view class="back"> -->
		<image src="../../../static/img/ic_xq_zd.png" mode="aspectFill" class="backBtn animated slideInUp" @tap="_backTop"></image>
		<!-- </view> -->
		<view class="asideBar flex flex_y flex_center animated slideInUp" @tap="home">
			<tui-icon name="home" :size="20" color="#fff"></tui-icon>
			<view style="font-size: 8px;color: #fff;">首页</view>
		</view>




		<!-- <view class="asideBar2 flex flex_center animated slideInUp" @tap="cart"><tui-icon name="cart" :size="20" color="#50AB9F"></tui-icon></view> -->
	</view>
</template>

<script>
	import tuiSkeleton from '@/components/tui-skeleton/tui-skeleton';
	import tuiCountdown from '@/components/countdown/countdown';
	import tuiNumberbox from '@/components/numberbox/numberbox';
	import CountCalc from '@/components/uni-countdown.vue'
	const global_Set_jll = uni.getStorageSync('global_Set_jll');
	import xhStoreParamsSKU from '@/components/xhStoreParamsSKU/xhStoreParamsSKU';
	import {
		mapState,
		mapMutations
	} from 'vuex';
	import Utils from '@/utils/utils.js';
	import SET from '@/SET.js'
	// import bestPaymentPassword from '@/components/best-payment-password/best-payment-password.vue';
	export default {
		data() {
			return {
				list: [],
				index: 1,
				business: {
					shipments_address: ''
				},
				goods: '',
				banners: [],
				auction: '',
				skeletonShow: true,
				formParams: {
					goods_code: ''
				},
				phoneNum: global_Set_jll.service_mobile,
				showAll: false,
				modal: false,
				payFlag: false,
				time: null,
				content: '请您先登录',
				action: 'login',
				animationData: '',
				details_img: '',
				paymentPwd: '', //支付密码
				skuList: [],
				specifications: [],
				showModalStatus: false,
				service1: '',
				service2: '',
				service3: '',
				endTime: '',
				platform: 'android',
				activityInfo: '', //限时购信息
				area: '',
				couponList:[]  //可以使用的优惠券列表
			};
		},
		watch: {
			hasLogin(newValue, oldValue) {
				// console.log(oldValue)
				// console.log(newValue)
				// this._loadData();
				// this.loadData();
			}
		},
		components: {
			tuiSkeleton,
			tuiCountdown,
			// bestPaymentPassword,
			CountCalc,
			tuiNumberbox,
			xhStoreParamsSKU
		},
		onLoad(options) {
			this.formParams.goods_code = options.code;

			this._loadData('refresh');
			let that = this
			uni.getSystemInfo({
				success(res) {
					// console.log(111,res)
					// if(res.platform == 'ios'){
					// 	that.platform = 'ios'
					// }
					that.platform = res.platform
				}
			})

		},
		onUnload() {
			// alert(2)
			clearInterval(this.time);
			this.time = null;
		},
		computed: {
			...mapState(['hasLogin', 'ifx']),
			// hasLogin() {
			// 	return this.$store.state.hasLogin ? this.$store.state.hasLogin : false;
			// },
			accountInfo() {
				return this.$store.state.accountInfo;
			},
			restTimeValied() {
				let t = this.endTime
				// console.log(t)
				if (!t) {
					return false
				}
				let s = new Date(t).getTime()

				let n = new Date().getTime();
				// console.log(s)
				let date = s - n;

				let days = date / 1000 / 60 / 60 / 24;
				let daysRound = Math.floor(days);
				let hours = date / 1000 / 60 / 60 - (24 * daysRound);
				let hoursRound = Math.floor(hours);
				let minutes = date / 1000 / 60 - (24 * 60 * daysRound) - (60 * hoursRound);
				let minutesRound = Math.floor(minutes);
				let seconds = date / 1000 - (24 * 60 * 60 * daysRound) - (60 * 60 * hoursRound) - (60 * minutesRound);
				let secondsRound = Math.floor(seconds);
				let time = "倒计时" + (daysRound + "天" + hoursRound + "时" + minutesRound + "分" + secondsRound + "秒");

				let obj = {
					d: parseInt(daysRound),
					h: parseInt(hoursRound),
					m: parseInt(minutesRound),
					s: parseInt(secondsRound)
				}
				console.log(obj);
				return obj
			}
		},
		methods: {
			cart() {
				uni.switchTab({
					url: '/pages/cart/cart'
				})
			},
			home() {
				uni.switchTab({
					url: '/pages/main/main'
				});
			},
			_phone() {
				// 客服热线
				uni.showModal({
					title: '提示',
					content: '是否确定拨打商家电话',
					success: function(res) {
						if (res.confirm) {
							uni.makePhoneCall({
								phoneNumber: global_Set_jll.service_mobile //仅为示例
							});
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			_backTop() {
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 100
				});
			},
			_none() {},
			_toggleModal() {
				this.showModalStatus = !this.showModalStatus;
			},
			addCard(data) {
				this._addCard(data);
			},
			creatOrder(data) {
				this._buy(data);
			},
			// 显示参数框
			_next() {
				if (!this.hasLogin) {
					this.content = '请您先登录';
					this.action = 'login'; ///features/authentication/authentication'
					this.modal = true;
					return;
				} else {
					const JLL_openId = uni.getStorageSync(SET.opIdName);
					if (this.is_weixn() && !JLL_openId) {
						Utils.wx_auth();
						return;
					}

				}
				this.showModalStatus = false
				this.$refs.params.show();
			},
			is_weixn() {
				var ua = navigator.userAgent.toLowerCase();
				if (ua.match(/MicroMessenger/i) == 'micromessenger') {
					return true;
				} else {
					return false;
				}
			},
			// 关闭
			hideModal() {
				this.showModalStatus = false;
			},
			// 加载
			async _loadData(type, callback) {
				let that = this;
				try {
					let res = await this.$api.GetGoodsInfo(this.formParams);
					// console.log(res)
					if (res.result == 1) {
						that.business = res.data.shopInfo;
						that.goods = res.data.goods;
						// that.auction = res.data.auction;
						let banners = res.data.goods.goods_banner_img.replace(/\'/g, '\"')
						that.banners = JSON.parse(banners);
						let details = res.data.goods.goods_img.replace(/\'/g, '\"')
						that.details_img = JSON.parse(details);
						
						that.couponList = res.data.couponList
						// that.area = checkedCity
						// console.log(that.banners,that.details_img)
						// that.service1 = res.data.projectService1;
						// that.service2 = res.data.projectService2;
						// that.service3 = res.data.projectService3;

						that.skuList = res.data.skuList;
						that.specifications = res.data.goods_parameter;


						let form = {
							"shop_id": res.data.shopInfo.shop_id, //店铺id
							"goods_code": res.data.goods.goods_code, //商品编码
							"goods_num": res.data.goods.goods_code, //商品数量
							"skus_code": "" //sku_id
						}
						// 加载优惠券
						that.getOrderCoupon(form)
						// console.log(111,)
						if (that.skeletonShow) {
							that.skeletonShow = false;
						}

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
				if (callback) callback();
			},
			// 获取能使用的优惠券
			async getOrderCoupon(form) {

			},
			// 购买
			_buy(data) {
				// console.log(222, data);
				if (!this.hasLogin) {
					this.content = '请您先登录';
					this.action = 'login'; ///features/authentication/authentication'
					this.modal = true;
					return;
				} else {
					// cart_code: "f3489a8bf70746c48fdfb375c019d19e"
					// checked: true
					// create_time: "2021-02-04T16:10:36"
					// goods_code: "d9b994eb59444360950042e484ba4e77"
					// goods_main_img: "http://model.fjdmll.com/upload/shop/goods/3e5b344db8c84c2fa7b2fcaa70a08bf6.png"
					// goods_num: 1
					// goods_original_price: null
					// goods_price: null
					// goods_spec: Object
					// goods_status: "1"
					// goods_stock: 0
					// goods_title: "xxxx5"
					// is_ems: null
					// load: true
					// shop_logo: "http://model.fjdmll.com/upload/shop/shop_logo/1d27928d25124cc28b3fc75fcf9a3998.jpg"
					// shop_name: "代码力量商城"
					// user_id: "b41d0e732be54cd085e85f9a187aae9a"
					// let d = {
					// 	skus_code: data.skus_code ? data.skus_code : '',
					// 	skus_difference: data.skus_difference ? data.skus_difference.join(',') : '',
					// 	skus_price: data.skus_price ? data.skus_price : '',
					// 	skus_origin: data.skus_origin ? data.skus_origin : '',
					// 	skus_stock: data.skus_stock ? data.skus_stock : ''
					// };
					let cardData = {
						shop_name: this.business.shop_name,
						shop_id: this.business.shop_id,
						shop_logo: this.business.shop_logo,
						goods_code: this.formParams.goods_code,
						goods_title: this.goods.goods_title,
						goods_main_img: this.goods.goods_main_img,
						is_ems: this.goods.is_ems,
						goods_parameter_type: 1,
						goods_spec: data,
						skus_code: data.skus_code,
						// goods_price: this.goods.goods_price,
						origin_price: data.skus_price * data.selectNum,
						// goods_raise_price: this.goods.goods_raise_price,
						goods_num: data.selectNum,
						// goods_service1: data.goods_service_code.serve1,
						// goods_service2: data.goods_service_code.serve2,
						// goods_service3: data.goods_service_code.serve3,
						// goods_service1: '',
						// goods_service2:  '',
						// goods_service3: '',
					};
					this.$store.commit('creatOrder', [cardData]);
					uni.navigateTo({
						url: '/pages/features/createOrder/createOrder?type=0'
					});
					// }
				}
			},

			// 加入购物车
			async _addCard(data) {
				// console.log(111, data);
				// if(!data.id){
				// 	this.$ui.toast('请选择规格')
				// 	return
				// }
				let that = this;
				let agr = {
					goods_code: this.formParams.goods_code,
					sku_id: data.skus_code ? data.skus_code : '',
					goods_num: data.selectNum,
					// project_service1: data.goods_service_code.serve1.service_code,
					// project_service2: data.goods_service_code.serve2.service_code,
					// project_service3: data.goods_service_code.serve3.service_code
				};
				try {
					let res = await this.$api.cardAdd(agr);
					if (res.result == 1) {
						uni.$emit('refresh_cart');
						that.$ui.toast('已成功添加至购物车');
					} else {
						that.$ui.toast(res.msg);
					}
				} catch (err) {
					console.log('请求结果false : ' + err);
				}
			},

			// 取消支付
			cancelPass() {
				this.payFlag = false;
			},
			// 确认密码
			checkPwd(e) {
				if (!e) {
					that.$ui.toast('取消购买');
					return;
				}
				// alert(e)
				// this._addPrize(e);
				// this.payFlag = false;
			},
			handleClick(e) {
				let index = e.index;
				if (index === 0) {
					// this.tui.toast("你点击了取消按钮")
				} else {
					switch (this.action) {
						case 'login':
							uni.navigateTo({
								url: '/pages/role/pLogin/pLogin'
							});
							break;
						case 'authentication':
							uni.navigateTo({
								url: '/pages/features/authentication/authentication'
							});
							break;
						case 'payPass':
							uni.navigateTo({
								url: '/pages/user/setPayPass/setPayPass'
							});
							break;
						default:
							break;
					}
				}
				this.modal = false;
			}
			// 参与加价
			// async _addPrize(e) {
			// 	let that = this;
			// 	let data = {
			// 		project_code: this.formParams.project_code,
			// 		project_price: this.goods.project_price,
			// 		pay_password: e
			// 	};
			// 	// console.log(data)
			// 	try {
			// 		this.$ui.showloading();
			// 		let res = await this.$api.doAuction(data);
			// 		this.$ui.hideloading();
			// 		if (res.result==1) {
			// 			that.$ui.toast('加价成功');
			// 			uni.$emit('refresh_main');
			// 			setTimeout(function() {
			// 				uni.redirectTo({
			// 					url: '/pages/features/auction/auction?current=1'
			// 				});
			// 			}, 1000);
			// 		} else {
			// 			that.$ui.toast(res.msg);
			// 		}
			// 	} catch (err) {
			// 		console.log('请求结果false : ' + err);
			// 	}
			// }
		}
	};
</script>

<style lang="scss" scoped>
	.pages {
		padding-bottom: 180rpx;
		overflow: hidden;

		.swiperBox {
			width: 100vw;
			height: 774rpx;
			position: relative;
			.swiper {
				width: 100vw;
				height: 774rpx;
				position: relative;
			}
			.swiperBg {
				position: absolute;
				display: block;
				width: 100vw;
				height: 100%;
				// height: 774rpx;
				left: 0;
				right: 0;
				top: 0;
				bottom: 0;
				z-index: 10;
				// background: url(../../../static/img/activebg.png);
			}
		}
		
		

		.bar {
			// position: absolute;
			width: 100%;
			height: 120rpx;
			// line-height: 120rpx;
			// background: #DD3A30;
			background: linear-gradient(to right, #de2a2a, #f99731);
			color: #fff;
			left: 0;
			bottom: 0;
			z-index: 10;
			padding: 0 20rpx;
			box-sizing: border-box;
			border: none;

			.acountTit {
				width: 100%;

			}

			.acountConten {
				width: 100%;

				.price {
					font-size: 70rpx;
					position: relative;
					text-indent: 40rpx;
					margin-right: 40rpx;
					font-weight: 600;

					&::after {
						content: '￥';
						position: absolute;
						left: -19px;
						font-size: 20px;
						bottom: 12rpx;
						color: #fff;
					}
				}

				.delete {
					position: relative;
					font-size: 36rpx;
					text-decoration: line-through;
					margin-top: 14rpx;
				}
			}

			.aside {
				position: absolute;
				right: 0;
				top: 0;
				height: 120rpx;
				padding: 0 40rpx 0 60rpx;
				background: url(../../../static/img/right.png) left top/cover no-repeat;
				color: #ED754B;
			}
		}

		.timeBox {
			line-height: 70rpx;
			height: 70rpx;
			text-align: center;
			color: #fff;
			background: #d12020;
			font-size: 26rpx;

			.statusBox {
				width: 300rpx;
				height: 100%;
				// background: url(../../../static/img/bg.png);
				background-size: 100% 100%;
				background-repeat: no-repeat;
			}
		}

		.boxs {
			background: #fff;
			border-radius: 16rpx;
			margin-bottom: 16rpx;
		}

		.box1 {
			padding: 0 20rpx 20rpx 20rpx;

			.titleBox {
				padding-top: 36rpx;
				padding-bottom: 16rpx;
				align-items: center;

				.cm_prize {
					// margin-top: -10rpx;
					font-size: 50rpx;
					color: #e02e24;
					font-weight: 600;
					margin-right: 10rpx;
				}

				.cm_prize_delete {
					margin-right: 10rpx;
				}

			}

			.short_title {
				color: #666;

			}

			.cm_title {
				line-height: 1.2;
				font-size: 32rpx;
				padding: 24rpx 0;

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
			}

			.msgBar {
				margin-top: 24rpx;
				margin-bottom: 4rpx;
				// justify-content: flex-start;
				width: 100%;
				height: 80rpx;
				background: #f8f8f8;
				border-radius: 16rpx;

				.testTags {
					font-size: 24rpx;
					color: #666;
				}

				.blank {
					width: 4rpx;
					height: 26rpx;
					background: #666;
					margin: 0 24rpx;
				}
			}

			.logoBox {
				height: 80rpx;
				line-height: 80rpx;
				border-radius: 6rpx;
				background: #F2E5DA;
				color: #642704;
				padding: 0 20rpx;
				margin-top: 20rpx;

				.logo {
					width: 56rpx;
					height: 56rpx;
					border-radius: 50%;
					margin-right: 20rpx;
				}

				.name {
					color: #642704;
				}

				.blank {
					width: 4rpx;
					height: 24rpx;
					background: #642704;
					margin: 0 20rpx;
				}
			}
		}

		.box2 {
			padding: 0 20rpx;

			.titleBar {
				line-height: 66rpx;
				height: 66rpx;
			}

			.cells {
				height: 72rpx;
				line-height: 72rpx;
			}

			.prizeBox {
				.prizeItems {
					background: #f8f8f8;
					border-radius: 10rpx;
					margin-top: 16rpx;
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

		.box4 {
			padding: 0 20rpx;

			.cells {
				height: 72rpx;
				line-height: 72rpx;
			}

			.picBox {
				width: 100%;
				height: 90rpx;
				line-height: 90rpx;

				// margin-bottom: 20rpx;
				.avatar {
					width: 90rpx;
					height: 90rpx;
					border-radius: 50%;
					margin-right: 20rpx;
					overflow: hidden;

					img {
						width: 90rpx;
						height: 90rpx;
					}
				}

				.name {
					// margin-bottom: 16rpx;
				}

				.jd {
					width: 152rpx;
					line-height: 58rpx;
					height: 58rpx;
					border: none;
					background: var(--cl_primary);
					color: #fff;
					text-align: center;
					padding: 0;
					font-size: 26rpx;
					border-radius: 29rpx;
				}
			}

			.scoreBox {
				padding: 24rpx 0 8rpx 0;
				border-top: 1rpx solid #e5e5e5;

				.score {
					margin-left: 10rpx;
					color: #d12020;
				}
			}
		}

		.box3 {
			margin-bottom: 0;
			padding: 30rpx 20rpx;

		}

		.commonTit {
			width: 100%;
			height: 80rpx;
			line-height: 80rpx;

			.blank {
				width: 40rpx;
				height: 4rpx;
				background: #333;
				margin: 0 12rpx;
			}
		}

		.footer {
			width: 100%;
			// height: 200rpx;

			background: #fff;
			position: fixed;
			left: 0;
			bottom: 0;

			// padding-bottom: env(safe-area-inset-bottom);
			.mes {
				width: 100rpx;

			}

			.cm_des {
				font-size: 20rpx;
			}
		}
	}

	.mask-screen {
		width: 100%;
		height: 100vh;
		position: fixed;
		top: 0;
		left: 0;
		background: rgba(0, 0, 0, 0.5);
		// opacity: 0.5;
		overflow: hidden;
		z-index: 10;

		.region-box {
			width: 100%;
			overflow: hidden;
			position: absolute;
			bottom: 0;
			left: 0;
			z-index: 20;
			background: #fff;
			padding: 8rpx 50rpx;
			box-sizing: border-box;
			border-radius: 20rpx 20rpx 0 0;

			.cm_title {
				margin-top: 24rpx;
			}

			.cm_des {
				line-height: 2;
				padding: 26rpx 0;
			}

			.btns {
				height: 80rpx;
				line-height: 80rpx;
				background: #ddb152;
				color: #fff;
				border-radius: 40rpx;
			}
		}
	}

	.btnBox {
		// width: 80%;
		height: 80rpx;
		border-radius: 40rpx;
		line-height: 80rpx;
		overflow: hidden;
		background: #d1a320;
		color: #fff;
		box-shadow: none;

		.btns {
			width: 30vw;
			height: 80rpx;
			line-height: 80rpx;
			background: #ddb152;
			color: #fff;
			border-radius: 0 !important;
		}
	}

	.backBtn {
		position: fixed;
		right: 40rpx;
		bottom: 138rpx;
		width: 90rpx;
		height: 90rpx;
		border-radius: 50%;
	}

	.asideBar {
		width: 90rpx;
		height: 90rpx;
		border-radius: 50%;
		background: var(--cl_primary);
		position: fixed;
		right: 40rpx;
		bottom: 238rpx;
		// z-index: 50;
	}

	.asideBar2 {
		width: 90rpx;
		height: 90rpx;
		border-radius: 50%;
		background: #fff;
		border: 4rpx solid var(--cl_primary);
		color: var(--cl_primary);
		position: fixed;
		right: 40rpx;
		bottom: 338rpx;
	}

	.btns.sure {
		background: #50AB9F
	}

	.btns.hot {
		background-color: #E93F37;
	}

	.btns[disabled="true"] {
		// color: red;
		background-color: #d6d293;
	}

	.sure[disabled="true"] {
		// color: red;
		background-color: #8aacad;
	}

	.couponsbox {
		width: 100%;
		overflow: hidden;
		position: absolute;
		bottom: 0;
		left: 0;
		z-index: 20;
		background: #fff;
		padding: 20rpx;
		box-sizing: border-box;
		border-radius: 20rpx 20rpx 0 0;

		.couponTitle {
			font-size: 36rpx;
			font-weight: bolder;
			text-align: center;
			line-height: 2;
			padding-bottom: 20rpx;
		}

		.couponsItem {
			// box-shadow: 0 0 6rpx #eee ;
			border-radius: 16rpx;
			padding: 20rpx;
			margin-bottom: 20rpx;
			background-color: #fdf1f1;
			border: 1rpx solid #f44336;

			.numBox {
				width: 200rpx;
				height: 160rpx;
				margin-right: 20rpx;
				border-right: 1rpx dashed #f44336;

				.num {
					font-size: 64rpx;
					color: #f44336;
					position: relative;

					&::before {
						content: '￥';
						position: absolute;
						left: -21px;
						bottom: 2px;
						font-size: 23px;
						color: #f44336;
					}
				}

				.texts {
					color: #f44336;
					padding-top: 8rpx;
				}
			}

			.couponContent {
				color: #333;

				.num {
					font-size: 34rpx;
					// font-weight: bolder;
					padding-bottom: 10rpx;
				}
			}

		}

		.tips {
			text-align: center;
			padding-bottom: 20rpx;
			color: #f44336;
		}
	}

	/*底部抽屉样式 start*/
</style>
