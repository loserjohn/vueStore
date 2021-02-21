<template>
	<view class="pages">
		<view class="modalBg flex flex_center" v-if="refundModal">
			<view class="tui-modal-custom animated fadeIn">
				<view class="tui-prompt-title box">填写物流单号</view>
				<view style="padding: 0 20rpx;" class="box">
					<input placeholder="请填写退货商品的物流单号" class="tui-input" type="text" v-model="ems_code" />
				</view>
				<!-- <tui-button type="primily"   size="small">立即提交</tui-button> -->
				<view class="flex flex_center box" style="border-top: 1rpx solid #e6e6e6;">
					<view class="f1 modalButton" @tap="hide" style="border-right: 1rpx solid #e6e6e6;">取消</view>
					<view class="f1 modalButton" @tap="_agreeRefund(true)" style="color: #039798;">立即提交</view>
				</view>
				<!-- <button class="btn-primary tui-btn-submit" hover-class="btn-hover" tap="_agreeRefund">立即提交</button> -->
			</view>
		</view>
		<view style="background: #fff;">
			<cu-custom :isBack="true" btnColor="#333">
				<block slot="backText">
					<!-- <view class="action flex flex_center" @tap="_back" :style="{'width':'44px' ,'height':'44px'}"> -->
					<tui-icon name="arrowleft" :size="30" color="#333" @tap="_back"></tui-icon>
					<!-- </view> -->
				</block>
				<block slot="content">
					订单管理
				</block>
				<!-- <block slot="right">
					<view class="btns flex flex_center">搜索</view> 
				</block> -->
			</cu-custom>
		</view>

		<view class="tabBar">
			<sun-tab :value.sync="current" @change="objectChange" @touch="refreshCurrent" :tabList="tabObjectList" rangeKey="name"
			 activeColor="#039798"></sun-tab>
		</view>
		<!-- <view class="swiper banners" ></view> -->
		<swiper class="swiper banners" :indicator-dots="false" :autoplay="false" :current.sync="current" @change="_change"
		 :skip-hidden-item-layout="true" :duration="200">
			<swiper-item class="swiper-item ">
				<OrderList order_status="0" @refund="refund" @cancel="cancel" @sure="sure" ref="list0"></OrderList>
			</swiper-item>
			<swiper-item class="swiper-item ">
				<OrderList order_status="1" @refund="refund" @cancel="cancel" @sure="sure" ref="list1"></OrderList>
			</swiper-item>
			<swiper-item class="swiper-item ">
				<OrderList order_status="2" @refund="refund" @cancel="cancel" @sure="sure" ref="list2"></OrderList>
			</swiper-item>
			<swiper-item class="swiper-item ">
				<OrderList order_status="3" @refund="refund" @cancel="cancel" @sure="sure" ref="list3"></OrderList>
			</swiper-item>
			<swiper-item class="swiper-item ">
				<OrderList order_status="6" @refund="refund" @cancel="cancel" @sure="sure" ref="list4"></OrderList>
			</swiper-item>
		</swiper>
		<tui-modal :show="modal" @click="handleClick" @cancel="hide" :content="content" :maskClosable="false" color="#333"
		 :size="32"></tui-modal>
		<tuiBottomPopup :zIndex="1002" :maskZIndex="1001" :show="popupShow" @close="popup">
			<view class="savebottom">
				<tui-list-view unlined="all" class="tui-list-view tui-skeleton-fillet">
					<tui-list-cell :arrow="false" class="  flex flex_center ">
						<view class="tui-list-cell-name f1">商品金额</view>
						<view class="tui-right">￥{{ currentItem.sum_goods_price }}</view>
					</tui-list-cell>
					<tui-list-cell :arrow="false" class="  flex flex_center " v-if="currentItem.ems_price">
						<view class="tui-list-cell-name f1">运费</view>
						<view class="tui-right">￥{{ currentItem.ems_price?currentItem.ems_price:0 }}</view>
					</tui-list-cell>
					<tui-list-cell :arrow="false" class="  flex flex_center ">
						<view class="tui-list-cell-name f1">售后服务</view>
						<view class="tui-right">￥{{ currentItem.sum_service_price?currentItem.sum_service_price:0}}</view>
					</tui-list-cell>
					<tui-list-cell :arrow="false" class="  flex flex_center " v-if="currentItem.ems_price">
						<view class="tui-list-cell-name f1">优惠金额</view>
						<view class="tui-right">-￥{{ currentItem.sum_coupon_price?currentItem.sum_coupon_price:0 }}</view>
					</tui-list-cell>
					<tui-list-cell class=" tui-skeleton-fillet flex flex_center " :last="true">
						<view class="f1"></view>
						<view class="cm_des">共 {{ currentItem.goods_num }} 件商品 , </view>
						<text>实付：</text>
						<text class=" cm_t_32 cm_prize">￥{{ currentItem.pay_price }}</text>
					</tui-list-cell>
				</tui-list-view>
			</view>
		</tuiBottomPopup>
	</view>
</template>

<script>
	import sunTab from '@/components/sun-tab/sun-tab.vue';
	import OrderList from './orderList/orderList.vue';
	import tuiBottomPopup from '@/components/tui-bottom-popup/tui-bottom-popup';

	export default {
		data() {
			return {
				tabObjectList: [
					//对象数组赋值
					{
						name: '全部订单',
						value: 0
					},
					{
						name: '待付款',
						value: 1
					},
					{
						name: '待发货',
						value: 2
					},
					{
						name: '待收货',
						value: 3
					},
					{
						name: '已签收',
						value: 4
					},

				],
				// index: 1,
				current: 0,
				modal: false,
				refundModal: false,
				currentCode: '',
				content: '确认发起退货？',
				action: '',
				ems_code: '',
				currentItem:'',
				popupShow:false
			};
		},
		components: {
			sunTab,
			OrderList,
			tuiBottomPopup
		},
		onLoad(options) {
			let that = this

			this.current = parseInt(options.current)

			uni.$on('showDetail', (item) => {
				that._showDetail(item)
			})
			uni.$on('refresh_order', () => {
				that._refresh()
			})
		},
		onShow() {
			this._refresh('current')
			
		},
		// 下拉刷新
		onPullDownRefresh() {
			let k = this.current;
			// alert(k)
			this.$refs[`list${k}`]._getList('refresh')
			setTimeout(() => {
				uni.stopPullDownRefresh();
			}, 600)
		},
		methods: {
			_showDetail(item){
				this.currentItem =item
				this.popup()
			},	
			popup() {
				this.popupShow = !this.popupShow
			},
			_back() {
				// alert(1)
				uni.switchTab({
					url: '/pages/user/user'
				})
			},
			objectChange(e) {
				// alert( e.tab.value)
				// alert(1)
				// let action  =  'next'
				// if(this.current>e.tab.value){
				// 	action = 'prev'
				// }
				this.current = parseInt(e.tab.value)
				// this._refresh(action)
				// this.$refs[`list${this.current}`]._getList('refresh')
				// this._change({
				// 	detail:{
				// 		current:e.tab.value
				// 	}
				// })
				// console.log(e)
			},
			_change(e) {
		
				// let action  =  'next'
				// if(this.current>e.detail.current){
				// 	action = 'prev'
				// }
				this.current = parseInt(e.detail.current);
				// alert(this.current)
				// this.$refs[`list${this.current}`]._getList('refresh')
				this._refresh()
			},
			refreshCurrent(event) {
				console.log(JSON.stringify(event))
				// let k =event.tab.value

				// this.$refs[`list${k}`]._getList('refresh')
			},
			// 退款退货
			refund(item) {
				// console.log(item)
				let code = item.order_code
				let status = item.order_status
				if (status == 1) {
					this.action = 'refund'
					this.content = '确认发起退款退货？'
					this.currentCode = code
					this.modal = true
				} else if (status == 3) {
					this.currentCode = code
					this.refundModal = true
				}
			},
			// _refund(){

			// },
			// 确认收货
			sure(code) {

				this.action = 'sure'
				this.content = '您确认要收货？'
				this.currentCode = code
				this.modal = true
			},
			cancel(code) {
				this.action = 'cancel'
				this.content = '你确认取消该订单？'
				this.currentCode = code
				this.modal = true
			},
			hide() {
				this.refundModal = false;
				this.modal = false
			},
			handleClick(e) {
				let index = e.index;
				if (index === 0) {
					// this.tui.toast("你点击了取消按钮")

				} else {
					if (this.action == 'refund') {

						this._agreeRefund(false)
					} else if (this.action == 'sure') {

						this._sure()
					} else if (this.action == 'cancel') {

						this._cancel()
					}
				}
				this.modal = false
			},
			async _agreeRefund(needEms) {
				// alert(needEms)
				let that = this;
				if (needEms && !this.ems_code) {
					this.$ui.toast('请输入物流单号')
					return;
				}
				this.refundModal = false
				try {
					// this.$ui.showloading();	
					let data = {
						order_code: this.currentCode
					}
					if (needEms) data.ems_code = this.ems_code
					let res = await this.$api.ApplyRefund(data, false);
					// this.$ui.hideloading();
					if (res.result == 1) {

						that.$ui.toast('退货申请成功')
						setTimeout(() => {
							// that._getList('refresh');
							that._refresh('current')
						}, 600)
					} else {
						that.$ui.toast(res.msg)
					}
				} catch (err) {
					console.log('请求结果false : ' + err);
				}
			},
			async _sure() {
				let that = this;
				try {
					// this.$ui.showloading();	
					let data = {
						order_code: this.currentCode
					}
					let res = await this.$api.Receiving(data, false);
					// this.$ui.hideloading();
					if (res.result == 1) {

						that.$ui.toast('收货成功')
						setTimeout(() => {
							that._refresh('current')
						}, 600)
					} else {
						that.$ui.toast(res.msg)
					}
					if (callback) callback();
				} catch (err) {
					console.log('请求结果false : ' + err);
				}
				
			},
			async _cancel() {
				let that = this;
				try {
					// this.$ui.showloading();	
					let data = {
						order_code: this.currentCode
					}
					let res = await this.$api.CancelOrder(data, false);
					// this.$ui.hideloading();
					if (res.result == 1) {

						that.$ui.toast('取消成功')
						setTimeout(() => {
							// that._getList('refresh');
							that._refresh('current')
						}, 600)
					} else {
						that.$ui.toast(res.msg)
					}
				} catch (err) {
					console.log('请求结果false : ' + err);
				}
			},
			_refresh(action) {
				// console.log('刷新');
				let that =this
				// let l = this.tabObjectList.length;
				
				// let n  = this.current+1;
				// let p  = this.current-1;
				this.$nextTick(function(){
					if(that.$refs[`list${that.current}`]  ){
						that.$refs[`list${that.current}`]._getList('refresh')	
					}				
					// if(n<l){
					// 	that.$refs[`list${n}`]._getList('refresh')	
					// }	
					// if(p>=0){
					// 	that.$refs[`list${p}`]._getList('refresh')	
					// }	
				})
				
				// let  that = this
				// if(action==='current'){
				// 	this.$nextTick(function(){
				// 		if(that.$refs[`list${that.current}`] && !that.$refs[`list${that.current}`].ifLoad ){
				// 			that.$refs[`list${that.current}`]._getList('refresh')	
				// 		}				
				// 		// if(n<l){
				// 		// 	that.$refs[`list${n}`]._getList('refresh')	
				// 		// }	
				// 		// if(p>=0){
				// 		// 	that.$refs[`list${p}`]._getList('refresh')	
				// 		// }	
				// 	})
				// }
				
				
				// this.$refs.list0._getList('refresh')
				// this.$refs.list1._getList('refresh')
				// this.$refs.list2._getList('refresh')
				// this.$refs.list3._getList('refresh')
				// this.$refs.list4._getList('refresh')
			}

		}
	}
</script>

<style lang="scss" scoped>
	.pages {

		height: calc(100vh);

		// background: blue;
		// overflow: hidden;
		.note {
			width: 100%;
			height: 66rpx;
			line-height: 66rpx;
			color: #fff;
			background: #333;
			padding: 0 20rpx;
		}

		.tabBar {
			line-height: 72rpx;
			height: 72rpx;
			background: #fff;
			overflow: hidden;
			// position: fixed;
			// top: 0;
			left: 0;
			width: 100%;
		}

		.banners {
			width: 100%;
			height: calc(100vh - 160rpx);

			// padding-top: 150rpx;
			// background: red;
			.swiper-item {
				width: 100%;
				// height: 100%;
				height: calc(100vh - 160rpx);
				// background: #0000FF;
			}
		}

		.modalBg {
			position: fixed;
			width: 100%;
			height: 100vh;
			background: rgba(0, 0, 0, .6);
			z-index: 100;

			.tui-modal-custom {
				text-align: center;
				width: 80vw;
				height: 300rpx;
				border-radius: 30rpx;
				background: #fff;

				.box {
					height: 100rpx;
					line-height: 100rpx;
				}

				.tui-prompt-title {
					padding-bottom: 20rpx;
					font-size: 34rpx;
					height: 100rpx;
					line-height: 100rpx;
				}

				.tui-input {
					border: 1rpx solid #e6e6e6;
					font-size: 32rpx;
					height: 80rpx;
					line-height: 80rpx;
					border-radius: 4rpx;
				}

				.modalButton {
					height: 100%;
					line-height: 100rpx;
					font-size: 36rpx;
				}
			}



		}

	}
</style>
