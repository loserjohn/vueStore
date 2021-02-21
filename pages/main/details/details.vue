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
				<!-- <img src="../../../static/img/activebg.png" v-show="goods.is_flashsale==1" class="swiperBg"></img> -->
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
						<tui-tag type="danger" padding="10rpx 20rpx" shape="circle" v-show="mostCoupon" size="24rpx">券后价{{`${mostCoupon}`}}</tui-tag>
						<view class=" f1"></view>
						<!-- <text style="color:#999 ;" @click="showModalStatus=true">查看优惠券</text> -->
						<!-- <tui-icon name="arrowright" :size="20" color="#999"> </tui-icon> -->
					</view>
					<view class="flex couponBox flex_center" :style="{'padding-top':goods.is_flashsale==1?'20rpx':''}">
						<tui-tag type="danger" plain v-for="(item,index) in couponList" v-show="index<=1" :key="index" padding="8rpx 16rpx" shape="square" size="24rpx">{{`${item.order_amount_text}  `}}</tui-tag>
						<view class=" f1"></view>
						<span style="color:#999 ;" @click="showModalStatus=true">查看领取</span>
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
				<!-- {{mostCoupon}} -->
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
				</view>

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
						<button class="btns" @click="_next('card')"  >加入购物车</button>
						<view class="btns hot flex flex_y flex_center" v-if="goods.is_flashsale==1?true:false" @click="_next('buy')">
							<view class="cm_t_20">马上抢</view>
							<view class="" style="margin-top: 8rpx;">折后￥{{goods.goods_price}}</view>
						</view>
						<button class="btns sure" @click="_next('buy')" v-else > {{mostCoupon?'领券购买':'立即购买'}}  </button>
					</view>
				</view>

			</view>
		</view>
		<tui-modal :show="modal" @click="handleClick" @cancel="hide" :content="content" :maskClosable="false" color="#333"
		 :size="32"></tui-modal>
		<!-- <best-payment-password :title="tigs" :show="payFlag" :value="paymentPwd" digits="6" @cancel="cancelPass" @submit="checkPwd" :forget="false"></best-payment-password> -->

		<xhStoreParamsSKU :action="skuAction" :couponList="couponList"   :platform="platform" ref="params" :ifActive="goods.is_flashsale==1?true:false" :preImg="goods.goods_main_img"
		 :title="goods.goods_title" :parameter="specifications" :difference="skuList" :defaultprice="goods.goods_price"
		 :defaultstock="goods.default_stock" @creatOrder="creatOrder" @addCard="addCard" :propertyList="propertyList"></xhStoreParamsSKU>

		<view class="mask-screen animated " @tap="_toggleModal" @touchmove.stop.prevent="_none" :class="showModalStatus?'showScreen':'hideScreen'"  >
			<view  class="couponsbox animated slideInUp savebottom" :class="showModalStatus?'slideInUp':'slideOutDown'"  @tap.stop="_none">
				<view class="couponTitle">优惠券</view>
				<scroll-view scroll-y style="width: 100%;max-height: 40vh;">
					<view class="couponsItem flex flex_center" :class="item.use_area==0?'cm':''" v-for="(item,index) in couponList"  :key="index"  @click="validCoupon(item.coupon_code)">
						<view class="numBox flex flex_y  flex_center">
							<view class="num prize">{{item.price}}</view>
							<!-- <text class="texts">{{item.use_area}}</text> -->
						</view>
						<view class="f1 couponContent">
							<view class="num ">{{item.order_amount_text}}</view>
							<text class="texts">{{item.end_date}}</text>
						</view>
						<img src="../../../static/img/hasGet.png" alt="" class="getBg" v-show="hasGetCoupon[item.coupon_code]">
					</view>
					
				</scroll-view>
				
				
				<view class="tips">即刻下单，系统自动为您匹配最高优惠券</view>
				<tui-button type="danger" shape="circle" @tap="_next('buy')">即刻下单</tui-button>
			</view>
		</view>

		<!-- <view class="back"> -->
		<image src="../../../static/img/ic_xq_zd.png" mode="aspectFill" class="backBtn animated slideInUp" @tap="_backTop"></image>
		<!-- </view> -->
		<view class="asideBar flex flex_y flex_center animated slideInUp" @tap="home">
			<tui-icon name="home" :size="20" color="#fff"></tui-icon>
			<view style="font-size: 8px;color: #fff;">首页</view>
		</view>


		<tui-tips ref="toast" ></tui-tips>

		<!-- <view class="asideBar2 flex flex_center animated slideInUp" @tap="cart"><tui-icon name="cart" :size="20" color="#50AB9F"></tui-icon></view> -->
	</view>
</template>

<script>
	import tuiSkeleton from '@/components/tui-skeleton/tui-skeleton';
	// import tuiCountdown from '@/components/countdown/countdown';
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
		 
				
				business: { shipments_address: '' },  //商家信息
				goods: '',  //商品信息
				banners: [], 
				// auction: '',
				skeletonShow: true,
				formParams: {
					goods_code: ''
				},
				phoneNum: global_Set_jll.service_mobile,
				 
				modal: false,
				// payFlag: false,
				time: null,
				content: '请您先登录',
				action: 'login',
				
				details_img: '',
				// paymentPwd: '', //支付密码
				skuList: [],
				specifications: [],
				propertyList:[],
				showModalStatus: false,
			
				// endTime: '',
				platform: 'android',
				// activityInfo: '', //限时购信息
				// area: '',
				couponList:[],  //可以使用的优惠券列表   0是通用券 1是商品券
				skuAction:'buy',
				hasGetCoupon:{} //存放已领取的商品券
			};
		},
		watch: {
			hasLogin(newValue, oldValue) {
				if(newValue){
					this.myCards()
				}
				
			}
		},
		components: {
			tuiSkeleton,
			// tuiCountdown,
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
					that.platform = res.platform
				}
			})
			if(this.hasLogin){
				this.myCards()
			}		
		},
		onUnload() {
			// alert(2)
			// clearInterval(this.time);
			// this.time = null;
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
				// console.log(obj);
				return obj
			},
			// 最优商品券的判断
			mostCoupon(){
				let spList = {}
				// console.log(555,this.couponList)
				let  hasSP = this.couponList.some(item=>{
					if(item.use_area==1){
						spList[item.order_amount] = item
					}
					return item.use_area==1?true:false
				})
				// console.log(666,spList)
				if(hasSP){
					// 有商品券
					let arr= {}
					this.couponList.map(it=>{
						if(it.use_area==1 && this.goods.goods_price>=it.order_amount){
							arr[it.price] = it
						}						
					}) 
					// console.log(77,arr)
					if(Object.keys(arr).length){
						let k = Math.max(...Object.keys(arr))
						// console.log(777,k)
						return  this.goods.goods_price - arr[k].price
					}else{
						return ''
					}		
				}else{
					return '' //没有优惠价
				}
			}
		},
		methods: {
			// 领取商品券
			async validCoupon(code){
		
				if (!this.hasLogin) {
					this.content = '请您先登录';
					this.action = 'login'; ///features/authentication/authentication'
					this.modal = true;
					return;
				} 
				if(this.hasGetCoupon[code])return;
				
				let that = this
				let  form = {
					coupon_code:code
				}
				let res =  await this.$api.ReceiveCoupon(form)
				// console.log(res)  
				if(res.result==1){
					that.formParams.coupon_code = code				
					let options = {
							msg: '恭喜领券成功',
							duration: 2000,
							backgroundColor:'#ea441e'
					};
					that.$refs.toast.showTips(options);
					that.myCards()	
				}else{
					
				}
			},
			// 获取我的卡包
			async myCards(){
				let form = {
					"goods_code": this.formParams.goods_code,
					"use_area": "",
					"status": "0"
				}
				this.hasGetCoupon = {}
				const res = await this.$api.GetReceiveCouponlist(form)
				// console.log(res)
				if(res.data.length){
					this.hasGetCoupon={}
					// let arr = this.couponList.map(it=>{
					// 	return it.coupon_code
					// })
					res.data.map(item=>{
						this.hasGetCoupon[item.coupon_code] = item
						// if( arr.indexOf(item.coupon_code)>=0){
						// 	this.hasGetCoupon[item.coupon_code] = item
						// }
						
					})
				}
			},
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
			_next(act) {
				
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
				// alert(act)
				this.skuAction = act
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
					// console.log(res.data.goods_service_list)
					if (res.result == 1) {
						that.business = res.data.shopInfo;
						that.goods = res.data.goods;
						// that.auction = res.data.auction;
						that.banners = res.data.goods.goods_banner_img 
						// that.banners = JSON.parse(banners);
						that.details_img  = res.data.goods.goods_img 
						// that.details_img = JSON.parse(details);
						that.couponList = res.data.couponList

						that.skuList = res.data.skuList;
						that.specifications = res.data.goods_parameter;
						that.propertyList = res.data.goods_service_list;

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
						origin_price: data.skus_price * data.selectNum,
						goods_num: data.selectNum,
						// goods_service_price: 0,
						// goods_service_txt: " ",
						goods_service_code: " ",
					};
					if(data.goods_service.length){
						let tarr = []
						let name = []
						let carr=[]
						data.goods_service.forEach(item=>{
							name.push(item.service_name)
							tarr.push(item.service_price)
							carr.push(item.service_code)
						})
						cardData.goods_service_code = carr.join(',')
					}
					
					
					this.$store.commit('creatOrder', [cardData]);
					uni.navigateTo({
						url: '/pages/features/createOrder/createOrder?type=0'
					});
					// }
				}
			},

			// 加入购物车
			async _addCard(data) {
				let that = this;
				let agr = {
					goods_code: this.formParams.goods_code,
					sku_id: data.skus_code ? data.skus_code : '',
					goods_num: data.selectNum,
					goods_service:data.goods_service
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
			// checkPwd(e) {
			// 	if (!e) {
			// 		that.$ui.toast('取消购买');
			// 		return;
			// 	}
			// 	// alert(e)
			// 	// this._addPrize(e);
			// 	// this.payFlag = false;
			// },
			handleClick(e) {
				let index = e.index;
				if (index === 0) {
					// this.tui.toast("你点击了取消按钮")
				} else {
					switch (this.action) {
						case 'login':
							// uni.navigateTo({
							// 	url: '/pages/role/pLogin/pLogin'
							// });
							this._login()
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
			padding:10rpx 20rpx;
			margin-bottom: 20rpx;
			background-color: #fdf1f1;
			// border: 1rpx solid #f44336;
			position: relative;
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
			
			.getBg{
				width: 200rpx;
				height: 200rpx;
				position: absolute;
				bottom: -40rpx;
				right: -40rpx;
				transform: rotate(-45deg);
				opacity: .8;
			}
			&.cm{
				    background-color: #fffadf;
			}
		}

		.tips {
			text-align: center;
			padding : 20rpx 0;
			color: #f44336;
			
		}
		
	}
	.mask-screen {
		width: 100%;
		// height: 100vh;
		position: fixed;
		top: 0;
		left: 0;
		right:0;
		bottom:0;
		background: rgba(0, 0, 0, 0.5);
		transition: opacity 0.3s ease-in-out; 
		overflow: hidden;
		z-index: 10;
	
	}
	.showScreen {
		opacity: 1;
		pointer-events: auto;
	}
	
	.hideScreen {
		opacity: 0;
		pointer-events: none;
	}
	/*底部抽屉样式 start*/
</style>
