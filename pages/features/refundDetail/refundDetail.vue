<template>
	<view>
		<tui-skeleton v-if="skeletonShow" backgroundColor="#f9f9f9" skeletonBgColor="#efefef" borderRadius="0rpx"></tui-skeleton>
		<view class="pages tui-skeleton">
			
			<view class="bgbox " >
				<view >{{item.audit_status | audit_status_filter}}</view>
				<text style="font-size: 24rpx;font-weight: 400;">
					{{item.refund_info}}
				</text>
			</view>	
			<view class="proItemsBox addressBox " v-if="item.refund_shop_info" >
				<view class="cm_title bdb">退货地址</view>
				<view class="flex flex_center buyer tui-skeleton-fillet">
					<image src="../../../static/img/ic_dz.png" mode="widthFix" class="icon"></image>
					<view class="f1 addreass tui-skeleton-rect" >
						<view class="cm_title ">{{item.refund_shop_info.seller_address}}</view>
						<view class="flex flex_center">
							<text class="cm_text ">睿众售后中心</text>
							<text class="cm_text ">{{item.refund_shop_info.seller_phone}}</text>
							<view class="f1"></view>
						</view>					
					</view>					
				</view>
			</view>
			<view class="proItemsBox " >
				<view class="picBox">
					<view class=" flex  flex_center " style="align-items: flex-start;" >
						<image :src="item.skus_img" mode="aspectFill" class="avatar" lazy-load="true"></image>
						<view class="f1" >
							<view class=" cm_title   name cm_ellipsis2 tui-skeleton-fillet">{{ item.goods_title }}</view>
							<view class="cm_ellipsis2 cm_des "  >
								{{ item.skus_name }}
							</view>
							<view style="margin-top: 4rpx;color: #E56D00;" class="cm_des cm_ellipsis2  " v-if="item.goods_service">
								 {{item.goods_service_txt}}
							</view>
							<view class=" tui-skeleton-fillet flex flex_center" style="margin-top: 10rpx;">
								<text class=" ">退款金额：<text class="cm_prize">￥{{ item.apply_price }}</text></text>
								<view class="f1"></view>
							</view>
						</view>
					</view>
				</view>	
			</view>
			
			<view class="proItemsBox  " @click="_call">
				<view class="flex flex_center">
					<image src="../../../static/img/phone.png" mode="widthFix" class="call"></image>
					<text>联系卖家</text>
				</view>
			</view>
			
			<view class="proItemsBox" style="padding: 0;">
				<tui-list-view  unlined="all" class="tui-list-view tui-skeleton-fillet" >
					<!-- <tui-list-cell :arrow="false"  >
						<view class="tui-list-cell-name f1">申请时间</view>
						<view class="tui-right " style="color:#DF5000;">{{item.apply_date | timeFilter}}</view>
					</tui-list-cell> -->
					<tui-list-cell :arrow="false" >
						<view class="tui-list-cell-name f1">订单编号</view>
						<view class="tui-right">{{ item.order_code }}</view>
					</tui-list-cell>
					<tui-list-cell :arrow="false" >
						<view class="tui-list-cell-name f1">退款单号</view>
						<view class="tui-right">{{ item.refund_code }}</view>
					</tui-list-cell>
					<tui-list-cell :arrow="false" v-if="item.audit_status==2">
						<view class="tui-list-cell-name f1">拒绝原因</view>
						<view class="tui-right " style="color:#DF5000;">{{item.audi_remark}}</view>
					</tui-list-cell>
					<tui-list-cell :arrow="false" >
						<view class="tui-list-cell-name f1">退款类型</view>
						<view class="tui-right">{{ item.refund_type | refund_type_filter}}</view>
					</tui-list-cell>
					<tui-list-cell :arrow="false" >
						<view class="tui-list-cell-name f1">退款原因</view>
						<view class="tui-right">{{ item.reason }}</view>
					</tui-list-cell>
					<!-- <tui-list-cell :arrow="false" >
						<view class="tui-list-cell-name f1">退款金额</view>
						<view class="tui-right cm_prize">￥{{ item.apply_price}}</view>
					</tui-list-cell> -->
					
					
					<tui-list-cell :arrow="false" >
						<view class="tui-list-cell-name f1">申请时间</view>
						<view class="tui-right ">{{ item.apply_date}}</view>
					</tui-list-cell>
					<tui-list-cell :arrow="false" >
						<view>
							<view class=""> 退款说明</view>
							<view class="cm_des textarea">{{item.reason_detail?item.reason_detail:'无'}}</view>			
							<view v-if="problemPics.length">
								<block v-for="(item,index) in problemPics" :key="index">
									<image :src="item" mode="aspectFill" class="pics" @tap="_preview(item)"></image>
								</block>
							</view>
						</view>
					</tui-list-cell>
				</tui-list-view>	
			</view>
			<view class="proItemsBox" style="padding: 0;"  v-if="item.audit_status == 1" >
				<tui-list-view  unlined="all" class="tui-list-view tui-skeleton-fillet" style="margin-top: 20rpx;">
					<tui-list-cell :arrow="false" >
						<view class="tui-list-cell-name f1">物流公司</view>
						<view class="tui-right">{{ item.defund_ems_company_name}}</view>
					</tui-list-cell>
					<tui-list-cell :arrow="false" >
						<view class="tui-list-cell-name f1">物流单号</view>
						<view class="tui-right">{{ item.defund_ems_number }}</view>
					</tui-list-cell>
					<tui-list-cell :arrow="false" >
						<view class="tui-list-cell-name f1">联系方式</view>
						<view class="tui-right ">￥{{ item.ems_number}}</view>
					</tui-list-cell>		
				</tui-list-view>	
			</view>
			
			<view class="footer flex flex_center">
				<view class="f1"></view>
				<tui-button class="btns" type="primary"   shape="circle"  @tap="_toEms" v-if="item.audit_status==3 ">立即寄件</tui-button>
				
				<tui-button class="btns"  type="primary"    shape="circle"  @tap="_refund" v-if="item.audit_status==2">重新退款</tui-button>
				
				<tui-button class="btns"  type="primary"    plain shape="circle" @tap="cancel" v-if="item.audit_status!=4 && item.audit_status!=5&& item.audit_status!=0 ">撤销退款</tui-button>
				
				<tui-button class="btns"  type="primary"   plain shape="circle" @tap="deleted" v-if="item.audit_status==4 ||item.audit_status==5 ">删除订单</tui-button>
			
				<tui-button class="btns"  type="primary"    plain shape="circle" @tap="progress(item.refund_code)">退款进度</tui-button>
			</view>
		</view>
	</view>
</template>

<script>
	import tuiSkeleton from '@/components/tui-skeleton/tui-skeleton';
	import tuiListView from '@/components/list-view/list-view';
	import tuiListCell from '@/components/list-cell/list-cell';
	import Utils from '@/utils/utils.js';
	
	export default {
		data() {
			return {
				item: '',
				scheduleList:'',
				loading1: false,
				loading2: false,
				form: {
					"refund_code": ""
				},
				problemPics:[],
				skeletonShow:true
			};
		},
		onLoad(options) {
			this.form.refund_code = options.code;
			// alert(options.code)
			let that = this
			this.loadData()
			uni.$on('refresh_refundDetail',()=>{
				that.loadData()
			})
		},
		components: {
			tuiListCell,
			tuiSkeleton, 
			tuiListView
		},
		methods: {
			_preview(pic){
				// alert(pic)
				uni.previewImage({
				            urls: pic
				 });
			},
			_call(){
				if(!this.item || !this.item.refund_shop_info || !this.item.refund_shop_info.seller_phone ){
					
					this.$ui.toast('该商家未设置联系电话')
					return
				} ;
				let num = this.item.refund_shop_info.seller_phone
				// 客服热线
					uni.showModal({
						title: '提示',
						content: '是否确定拨打商家电话',
						success: function(res) {
							if (res.confirm) {
								uni.makePhoneCall({
									phoneNumber:num //仅为示例
								});
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
			},
			// 立即寄件
			_toEms(code){
				uni.navigateTo({
					url: '/pages/features/refundEms/refundEms?code=' + this.item.refund_code
				});
			},
			// 发起退款
			_refund(){
				// console.log(this.item)
				this.$store.commit('currenPro',{refund_code:this.item.refund_code });
				uni.navigateTo({
					url:'/pages/features/refundApply/refundApply?type=3'
				})				
			},
			// 查看进度
			progress(code){
				uni.navigateTo({
					url: '/pages/features/refundProgress/refundProgress?code=' + code
				});
			},
			// 加载数据
			async loadData(callback) {
				let that = this;
				try {
					// this.$ui.showloading();
					
					let res = await this.$api.GetRefundOrderInfo(this.form, false);
					// this.$ui.hideloading();
					console.log(res)
					if (res.result==1) {
						if (res.data) {
							that.item = res.data.refundModel;
							that.scheduleList = res.data.scheduleList
							that.problemPics = res.data.refundModel.refund_img?JSON.parse(res.data.refundModel.refund_img.split(',')) :[],
							console.log(that.problemPics)
						}
						that.skeletonShow = false
					} else {
						that.$ui.toast(res.msg)
					}
					if (callback) callback();
				} catch (err) {
					console.log('请求结果false : ' + err);
				}
			},
			//删除订单
			async deleted(){
				let that = this;
				try {
					that.$ui.showloading()
					let res = await this.$api.DelectRefund({ refund_code:this.form.refund_code });
					that.$ui.hideloading()
					if (res.result==1) {
				
						that.$ui.toast('删除成功')
						that.loadData()
						setTimeout(()=>{
							uni.$emit('refresh_refundList')
							
						},500)
					} else {
						that.$ui.toast(res.msg)
					}
				} catch (err) {
					console.log('请求结果false : ' + err);
				}
			},
			// 取消订单
			async cancel(){
				let that = this;
				try {
					that.$ui.showloading()
					let res
					if( this.item.refund_type==1){
						res = await this.$api.CancelRefundGoods({ refund_code:this.form.refund_code });
					}else if(this.item.refund_type==0){
						res = await this.$api.CancelRefundMoney({ refund_code:this.form.refund_code });
					}
					// let res = await this.$api.CancelRefund({ refund_code:this.form.refund_code });
					that.$ui.hideloading()
					if (res.result==1) {
				
						that.$ui.toast('撤销成功')
						uni.$emit('refresh_refundList')
						setTimeout(()=>{
							
							uni.navigateBack({
								
							})
						},500)
					} else {
						that.$ui.toast(res.msg)
					}
				} catch (err) {
					console.log('请求结果false : ' + err);
				}
				 
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.pages {
		padding: 20rpx;
		position: relative;
		padding-top: 160rpx;
		padding-bottom: 90rpx;
		.bgbox{
			font-size: 40rpx;
			text-align: left;
			// padding: 40rpx 0;
			background: var(--cl_primary);
			color:#fff;
			font-weight: 600;
			position: absolute;
			left: 0;
			top: 0;
			z-index: 0;
			width: 100%;
			height: 260rpx;
			// line-height: 300rpx;
			
			padding: 20rpx 40rpx;
			padding-top: 60rpx;
			&.text-red{
				color:red
			}
			
		}
		.proItemsBox{
			border-radius: 12rpx;
			overflow: hidden;
			z-index: 1;
			position: relative;
			.call{
				width: 50rpx;
				height: 50rpx;
				margin-right: 20rpx;
			}
		}
		.addressBox{
		
			z-index: 1;
			position: relative;
			text-align: left;
			.icon{
				width: 50rpx;
				height: 50rpx;
				margin-right: 26rpx;
			}
			.cm_title{
				margin-bottom: 10rpx;
				
			}
			.bdb{
				border-bottom: 1rpx solid #f2f2f2;
				padding-bottom: 20rpx;
			}
			.cm_text{
				text-align: left;
				color: #999;
				margin-right: 20rpx;
				
			}
		}
		 .picBox{
			 margin-bottom: 0;
			 .avatar{
				 width: 160rpx;
				 height: 160rpx;
			 }
		 }
		 .textarea{
		 	height: 150rpx;
			margin-top: 24rpx;
		 }
		 .container{
			 
		 	padding:0 20rpx;
		 }
		.box{
			margin-top: 20rpx;
			background: #fff;
			
		}
		.pics{
			width: 120rpx;
			height: 120rpx;
			border-radius: 20rpx;
			margin-right: 20rpx;
			background: #f1f1f1;
		}
	

		
		.tui-line-cell {
			width: 100%;
		}

		.footer{
			position: fixed;
			left: 0;
			bottom: 0;
			height: 100rpx;
			background: #fff;
			border-top: 1rpx solid #f2f2f2;
			width: 100%;
			padding: 0 20rpx;
			z-index: 100; 
			.btns{
				margin-left: 20rpx;
			}
		}
	}
</style>
