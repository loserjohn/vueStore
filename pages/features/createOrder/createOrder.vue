<template>
	<view class="pages">
		<!-- <view> -->
		<!-- <tui-skeleton v-if="skeletonShow" backgroundColor="#f9f9f9" skeletonBgColor="#efefef" borderRadius="0rpx"></tui-skeleton> -->
		<view class="">
			<view class="proItemsBox addressBox ">
				<view class="flex flex_center buyer tui-skeleton-fillet" v-if="currentAddress" @click="_switchAddress">
					<image src="../../../static/img/ic_dz.png" mode="widthFix" class="icon"></image>
					<view class="f1 addreass tui-skeleton-rect">
						<view class="cm_title ">{{currentAddress.detailed_address}}</view>
						<view class="flex flex_center">
							<text class="cm_text ">{{currentAddress.receiving_user}}</text>
							<text class="cm_text ">{{currentAddress.receiving_mobile}}</text>
							<view class="f1"></view>
						</view>
					</view>
					<tui-icon name="arrowright" :size="16"></tui-icon>
				</view>
				<view class="flex flex_center buyer tui-skeleton-fillet" v-else>
					<navigator url="/pages/features/newAdress/newAdress?type=switch"  class="f1 noItems">尚未添加地址,立即添加</navigator>
					<tui-icon name="arrowright" :size="16"></tui-icon>
				</view>
			</view>
			<!-- <view class="addressBox flex flex_center tui-skeleton-rect">
				<view class="f1 " v-if="currentAddress" @tap="_switchAddress">
					<view class=" top flex flex_center">
						<view class="cm_title f1 tui-skeleton-fillet">{{ currentAddress.receiving_user }}</view>
						<text class=" tui-skeleton-fillet">{{ currentAddress.receiving_mobile }}</text>
					</view>
					<view class="adress cm_text tui-skeleton-fillet">{{ currentAddress.detailed_address }}</view>
				</view>
				<navigator url="/pages/features/newAdress/newAdress?type=switch" v-else class="f1 noItems">尚未添加地址,立即添加</navigator>
				<tui-icon name="arrowright" :size="16"></tui-icon>
			</view> -->
			<view style="margin-top: 16rpx;border-radius: 12rpx;overflow: hidden;">

				<block v-for="(it, idx) in payOrders" :key="idx">
					<view class="proItemsBoxgray  tui-skeleton-fillet">
						<view class="flex flex_center itemBoxTop">
							<image :src="it.shop_logo" mode="aspectFill" class="shopIcon"></image>
							<view class="cm_title f1">{{it.shop_name}}</view>
						</view>
						<block v-for="(item, index) in it.list" :key="index">
							<view class="picBox flex  flex_center tui-skeleton-fillet">
								<image v-if="item.goods_main_img" :src="item.goods_main_img" mode="aspectFill" class="avatar "></image>
								<view class="f1 ">
									<view class=" cm_title  cm_ellipsis2 tui-skeleton-fillet">{{ item.goods_title }}</view>
									<view class="cm_des cm_ellipsis2 "  >
										{{ item.goods_spec.skus_difference | differenceText }}
									</view>
									<view class="cm_des cm_ellipsis2 serviceText"   v-if="create_order_type==1&& couponList[item.cart_code]&& couponList[item.cart_code].goods_service_txt ">
										{{ couponList[item.cart_code].goods_service_txt}}
									</view>
									<view class="cm_des cm_ellipsis2" style="margin-top: 4rpx;color: #E56D00;"  v-if="create_order_type==0 && activeCoupon.goods_service_txt ">
										{{ activeCoupon.goods_service_txt}}
									</view>
									<view class=" tui-skeleton-fillet flex flex_center" style="margin-top: 10rpx;">
										<text class="cm_des cm_t_32" style="margin-right: 20rpx;color: #e02e24;" v-if="item.goods_spec">￥{{ item.goods_spec.skus_price}}</text>
										<view class="f1"></view>
										<view class="cm_des flex-y flex_center">
											<tui-icon name="shut" :size="14" color="#999"></tui-icon>
											<text>{{ item.goods_num }}</text>
										</view>
									</view>
								</view>
							</view>
						</block>
					</view>
				</block>
			</view>
			<view>
				<tui-list-view unlined="all" class="tui-list-view tui-skeleton-fillet lists">
					<tui-list-cell :arrow="false">
						<view class="tui-list-cell-name f1">商品金额(不含优惠)</view>
						<view class="tui-right">￥{{ allPrize }}</view>
					</tui-list-cell>
					<tui-list-cell :arrow="false">
						<view class="tui-list-cell-name ">配送费用</view>
						<view class="cm_des f1 " style="padding-left: 10rpx;"> 普通配送</view>
						<view class="tui-right">{{ currentAddress?'￥'+allEms:'请先选择收货地址' }}</view>
					</tui-list-cell>
					<tui-list-cell :arrow="false">
						<view class="tui-list-cell-name f1">配送时间</view>
						<view class="tui-right"> 付款后48小时内发货 </view>
					</tui-list-cell>
					<tui-list-cell :arrow="false">
						<view class="tui-list-cell-name f1">售后服务</view>
						<view class="tui-right">￥{{ servePay}}</view>
					</tui-list-cell>
					<tui-list-cell :arrow="false" v-if="activeCoupon && activeCoupon.coupon_code ">
						<view class="tui-list-cell-name ">优惠金额</view>
						<view class="cm_des f1 " style="padding-left: 10rpx;"> {{`${ activeCoupon.coupon_name }`}}</view>
						<view class="tui-right" style="color: red;">-{{`￥${ activeCoupon.sale_price }`}}</view>
						<!-- <text v-show="couponSumMsg.sum_sale_price">共优惠：{{`￥${ couponSumMsg.sum_sale_price }`}}</text> -->
					</tui-list-cell>

					<tui-list-cell :arrow="false" v-if="!activeCoupon && currentCoupon.sum_sale_price ">
						<view class="tui-list-cell-name ">优惠金额</view>
						<view class="cm_des f1 " style="padding-left: 10rpx;"> {{`${ currentCoupon.coupon_name }`}}</view>
						<view class="tui-right" style="color: red;">-{{`￥${ currentCoupon.sum_sale_price }`}}</view>
						<!-- <text v-show="couponSumMsg.sum_sale_price">共优惠：{{`￥${ couponSumMsg.sum_sale_price }`}}</text> -->
					</tui-list-cell>
					
					<tui-list-cell :arrow="false">
						<view class="tui-list-cell-name f1">支付金额</view>
						<view class="tui-right cm_prize">￥{{ allAccount }}</view>
					</tui-list-cell>
					<tui-list-cell :arrow="false" :last="true">
						<view class="tui-list-cell-name f1">买家备注</view>
					</tui-list-cell>
					<tui-list-cell :hover="false">
						<view class="tui-line-cell ">
							<textarea v-model="orderParams.order_remark" placeholder="请输入买家备注" />
							</view>
						</tui-list-cell>
					</tui-list-view>
				</view>
				
			</view>
			
				<view class="footer savebottom  ">
					<view class="flex flex_center " style="padding: 0 30rpx;height: 100rpx;">
						<view class="f1"></view>
						<view class=" flex flex_center">
							<text class="cm_des">共{{allNum}}件，</text>
							<view class=""><text>合计:</text></view>
							<text class="cm_prize">￥{{ allAccount }}</text>
						</view>
						
						<button class="submit" @tap="submit">提交订单</button>
					</view>
				</view>
			
		<!-- </view> -->
		<tui-modal :show="modal" @click="handleClick" @cancel="hide" :title="title" :content="content" :maskClosable="false" color="#333" :size="32"></tui-modal>
		<PayPanel ref="payPanel" :oderId="oderId" :amout="allAccount"  @success="success"  @cancel="cancel"></PayPanel> 
	</view>
</template>

<script>
import tuiSkeleton from '@/components/tui-skeleton/tui-skeleton';
import tuiListView from '@/components/list-view/list-view';
import tuiListCell from '@/components/list-cell/list-cell';
import tuiNumberbox from '@/components/numberbox/numberbox';
import PayPanel from '@/components/PayPanel/PayPanel';
import Utils from '@/utils/utils.js';
import { mapState } from 'vuex';

export default {
	data() {
		return {
			payWay: 0, //支付方式 0-账户余额 1-支付宝 2-微信 3-购物券
			skeletonShow: true,
			currentAddress: '',   //当前的有效地址

			orderParams: {
				"order_remark":''
			},

			allEms:0,  //运费
			modal: false,
			oderId:'',  //生成的订单
			payOrders:[],   //过滤后的子订单平行list
			activeCoupon:'',   //当前单品购买时的 有效优惠券
			allAccount:0,    //最终结算金额
			couponList:'',  //可以使用的优惠券列表对应购物车
			create_order_type:0,   //1为 购物车结算  0为 单品结算
			couponList:[],  //存放优惠券的平行list
			
			
			// 弹窗内容部分
			title: '洁利来商城提醒您',
			content: '',
		};
	},
	filters:{
		differenceText(arr){
			return arr.length? arr.join(','):''
		}
	},
	onLoad(options) {
		let that = this; 
		
		this.create_order_type = options.type;
		this.payOrders =  this._filterOrder(this.currentOrder)
		// console.log(1,this.payOrders)
		// console.log(2,this.payOrders)
		// console.log(3,this.currentCoupon)
		uni.$on('refresh_sureAuction', item => {
			that.currentAddress = item;		
			that.calcEms()
		});

		// this.loadAddress();
		
	},
	onShow() {
		this.loadAddress();
	},
	components: {
		tuiListView,
		tuiListCell,
		tuiNumberbox,
		tuiSkeleton,
		PayPanel
	},
	computed: {
		...mapState(['currentOrder']),
		allPrize() {
			let s = 0;
			this.proPriceArr.forEach(item => {
				s+=item
			});
			return s.toFixed(2);
		},
		// 所有服务费
		servePay(){
			let s = 0
			if( this.create_order_type==1&&  this.currentCoupon){
				for(let item in this.couponList){
					s+=Number(this.couponList[item].goods_service_price)
				}
			}else if(this.create_order_type==0 && this.activeCoupon){
				s =  this.activeCoupon.goods_service_price				
			}
			
			return s
		},
		proPriceArr(){
			let arr= []
			this.payOrders.forEach(it=>{
				
				let money = 0
				it.list.forEach(item=>{
					// console.log(item)
					money += item.origin_price
				})
				arr.push(money)
			})
			return arr
		},
		shopIdArr(){
			let arr= []
			this.payOrders.forEach(item=>{
				arr.push(item.shop_id)
			})
			return arr
		},
		numArr(){
			let arr= []
			this.payOrders.forEach(it=>{
				let n = 0
				it.list.forEach(item=>{
					n += item.goods_num 
				})
				arr.push(n)
			})
			return arr
		},
		allNum(){
			return this.numArr.reduce((it,it2)=>{return it+it2})
		}
	},
	methods: {
		// 计算总金额
		calcAllAccount() {
			let sum = Number(this.allEms) + Number(this.allPrize) + Number(this.servePay)  ;
			if( this.create_order_type==1&&  this.currentCoupon){
				sum = sum - this.currentCoupon.sum_sale_price	
			}else if(this.create_order_type==0 && this.activeCoupon){
				sum = sum - this.activeCoupon.sale_price 			
			}
			this.allAccount = sum.toFixed(2);
		},
		// 单品结算获取能使用的优惠券
		async getOrderCoupon(form) {
			let that = this		
			let res =  await this.$api.GetOrderCouponInfo(form)
			// console.log(res)  
			if(res.result==1){
				// that.formParams.coupon_code = code
				that.activeCoupon = res.data
				that.calcAllAccount()
			}else{
				
			}
		},
		// 自动领取优惠券
		async validCoupon(code){
			let that = this
			let  form = {
				coupon_code:this.currentCoupon.coupon_code
			}
			let res =  await this.$api.ReceiveCoupon(form)
			// console.log(res)  
			if(res.result==1){
				that.formParams.coupon_code = code
				// alert(1.5)
				that.creatOrder()
				// that.calcAllAccount()
			}else{
				that.$ui.toast(res.msg);
				that.creatOrder()
			}
		},
		// 创建订单
		creatOrder(){
			// 数据格式
			let  that = this
			let params = []
			// this.currentCoupon.cart_sale_list.forEach(item => {
			// 	that.couponList[item.cart_code] = item
			// })
			// console.log(3,this.payOrders)
			this.payOrders.forEach((it,index)=>{
				let resIt = {
							"shop_id": it.shop_id,
							"create_order_type": that.create_order_type,
							"order_type": "0",
							"user_address_code": that.currentAddress.address_code,
							"coupon_code":that.create_order_type==1? that.currentCoupon.coupon_code:that.activeCoupon.coupon_code,
							"order_remark":that.orderParams.order_remark
				}
				resIt.list= it.list.map(item=>{
					return {
						"goods_code": item.goods_code,
						"skus_code": item.goods_spec.skus_code,
						"cart_code": item.cart_code?item.cart_code:'',
						"goods_num": item.goods_num,
						"child_coupon_code":that.create_order_type==1? that.couponList[item.cart_code].child_coupon_code:that.activeCoupon.coupon_code,
						"goods_service": item.goods_service
					}
				})
				params.push(resIt)
			})
			// console.log(params)
			// return
			
			
			this._sure({  create_order_data:params})
			
		},
		
		// 构建数据
		_filterOrder(arr) {
		
			let shopList = {};			
			arr.map((item,index) => {				
				if( shopList[item.user_id] ){
					item.index =index
					shopList[item.user_id].list.push(item)
				}else{
					shopList[item.user_id]={}
					shopList[item.user_id].shop_id = item.shop_id;
					shopList[item.user_id].shop_name = item.shop_name;
					shopList[item.user_id].shop_logo = item.shop_logo;
					shopList[item.user_id].list = [];
					item.index =index
					shopList[item.user_id].list.push(item)
				}
				item.checked = false
			})
			// console.log(shopList)
			return Object.values(shopList)
			
		},
		// 计算邮费
		async calcEms(){
			// return
			let that = this;
			try {
			
				let data = {
					"shop_id": this.shopIdArr.join(','),//店铺id
					"address_code": this.currentAddress.address_code,
					"order_count":this.numArr.join(','),//订单数量
					"order_price":this.proPriceArr.join(',') //订单金额
				} 
				// this.$ui.showloading()
				let res = await this.$api.GetEmsPrice(data);
				// this.$ui.hideloading()
				// console.log(data)
				if (res.result==1) {
					that.allEms = res.data.ems_price
					if(this.create_order_type==1 && that.currentCoupon ){
						// 购物车结单
						that.couponList = {}
						that.currentCoupon.cart_sale_list.forEach(item=>{
							that.couponList[item.cart_code] =  item					
						})
						that.calcAllAccount()  //计算总金额
					}else{
						// 单品结单
						let currentOrder = that.currentOrder[0]
						// console.log(2,currentOrder)
						let form = {
							"shop_id": currentOrder.shop_id, //店铺id
							"goods_code": currentOrder.goods_code, //商品编码
							"goods_num": currentOrder.goods_num, //商品数量
							"skus_code": currentOrder.skus_code? currentOrder.skus_code: that.currentOrder.goods_spec.skus_code, //sku_id
							"goods_service":currentOrder.goods_service
						}
						// debugger
						// 单品自动领券（通用券）计算优惠
						that.getOrderCoupon(form)
					};
				} else {
					that.$ui.toast(res.msg);
				}
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
				this._sure();
			}
			this.modal = false;
		},
		//地址列表
		async loadAddress(type, callback) {
			// alert(1)
			let that = this;
			try {
				let res = await this.$api.GetAddressList({ pageIndex: 1, pageSize: 100 });
				// console.log(res)
				if (res.result==1) {
					let list = res.data.rows;
					if (list.length > 0) {
						// 存在地址
						that.currentAddress = list[0];
						// 计算邮费
						if(that.currentAddress){
							that.calcEms();
						}
					} else {
						that.currentAddress = '';
						// that.calcEms();
					}
					that.skeletonShow = false;
				} else {
					that.$ui.toast(res.msg);
				}
			} catch (err) {
				console.log('请求结果false : ' + err);
			}
			// this.loadModal = false;
			// this.$ui.hideloading();
			if (callback) callback();
		},
		// 切换地址
		_switchAddress() {
			uni.navigateTo({
				url: '/pages/features/adress/adress?action=switch'
			});
		},
		
		// 创建订单
		async submit(callback) {
			if (!this.currentAddress) {
				this.$ui.toast('请选择地址');
				return;
			}
			if(this.create_order_type==1  ){
				// 购物车结单 先手动领券
				// alert(0)
				this.validCoupon()
			}else{
				// 单品结单
				this.creatOrder();
				// that.getOrderCoupon(form)
			};
			// this._sure();
		},
		// 确认支付
		async _sure(params) {
			let that = this;

			try {

				this.$ui.showloading('订单生成中');
				let res = await this.$api.CreateOrder(params, false);
				this.$ui.hideloading();
				// console.log(res); 
				if (res.result==1) {
					// that.payParams.order_num = res.data.order_code;
					// that.payParams.order_num ='H7280202001140330267942143'
					that.$ui.toast('订单创建成功');

					setTimeout(()=>{
						if(that.create_order_type==1){
							uni.$emit('refresh_cart')
						}		

						that._readyToPay(res.data[0].order_code);
					},500)
					
				} else {
					that.$ui.toast(res.msg);
					// 重定向到代付款
					uni.redirectTo({
						url: '/pages/features/order/orderList/orderList'
					});
				}
				// if (callback) callback();
			} catch (err) {
				console.log('请求结果false : ' + err);
			}
		},
		_readyToPay(ordercode) {
			this.oderId = ordercode
			let that = this;
			// return
			this.$refs.payPanel._show()
		},
		// 支付接口
		success(path){
			if(path){
				uni.redirectTo({
					url: path
				});
			}else{
				uni.redirectTo({
					url: '/pages/features/order/order'
				});
			}		
		},
		cancel(order){
			uni.redirectTo({
				url: '/pages/features/order/orderDetail/orderDetail?code=' + this.oderId
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.pages {
	padding: 20rpx;
	padding-bottom:120rpx;
	
	.addressBox {
		// margin-top: 160rpx;
		z-index: 1;
		position: relative;
		text-align: left;
	
		.icon {
			width: 50rpx;
			height: 50rpx;
			margin-right: 26rpx;
		}
	
		.cm_title {
			margin-bottom: 10rpx;
		}
	
		.cm_text {
			text-align: left;
			color: #999;
			margin-right: 20rpx;
		}
		.top {
			height: 54rpx;
			line-height: 54rpx;
			padding-right: 20rpx;
		}
		.adress {
			margin-top: 10rpx;
			font-size: 28rpx;
		}
		.noItems {
			line-height: 100rpx;
			text-align: center;
		}
	}
	.itemBoxTop{
		padding: 24rpx 20rpx;
		// padding-bottom:28rpx;
		
		background: #fff;
	}
	.lists{
		margin-top: 16rpx;
		border-radius: 12rpx;
		overflow: hidden;
	}
	.footer {
		position: fixed;
		width: 100%;
		min-height: 100rpx;
		left: 0;
		bottom: 0;
		background: #fff;
		z-index: 200;
		// padding: 0 30rpx;
		// padding-bottom: env(safe-area-inset-bottom);
		.submit {
			padding: 0 40rpx;
			line-height: 68rpx;
			height: 68rpx;
			border-radius: 34rpx;
			background: #da1a0f;
			color: #fff;
			margin-left: 40rpx;
		}
	}
}
</style>
