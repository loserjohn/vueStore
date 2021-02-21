<!-- 退款选项 -->

<template>
	<view class="pages">
		<view class="proItemsBox  tui-skeleton-fillet" >
			<view class="picBox flex  flex_center tui-skeleton-fillet">
				<image v-if="item.skus_img  " :src="item.skus_img  " mode="aspectFill" class="avatar "></image>
				<view class="f1 " >
					<view class=" cm_title   name cm_ellipsis2 tui-skeleton-fillet">{{item.goods_title }}</view>
					<view class="cm_ellipsis2 cm_des "  >
						{{ item.skus_name }}
					</view>
					<view style="margin-top: 4rpx;color: #E56D00;" class="cm_des cm_ellipsis2  " v-if="item.goods_service">
						 {{item.goods_service}}
					</view>
					<!-- <view class=" tui-skeleton-fillet flex flex_center" style="margin-top: 10rpx;"  v-if="type==3">
						<text class=" cm_t_32">退款金额：{{ item.apply_price }}</text>
						<view class="f1"></view>
				
					</view> -->
					<view class=" tui-skeleton-fillet flex flex_center" style="margin-top: 10rpx;" v-if="type!=3" >
						<text class="cm_prize cm_t_32">￥{{ item.alone_price }}</text>
						<view class="f1"></view>
						<tui-icon name="shut" :size="14" color="#999"></tui-icon>
						<text class="cm_des">	{{ item.goods_num }}</text>
					</view>
				</view>
			</view>			
		</view>
		
		<view class="box">
			<!-- <view class="cells flex flex_center"  >
				<view class="cm_title">退款方式</view>
				<view class=" f1"> </view>			
				<tui-icon name="circle-selected" :size="24" :color="form.refund_type==1?'#19be6b':'#eee'" @tap="_switch(1)"></tui-icon>
				<text>退货退款</text>
				<view style="width: 40rpx;"></view>
				<tui-icon name="circle-selected" :size="24" :color="form.refund_type==0?'#19be6b':'#eee'" @tap="_switch(0)"></tui-icon>
				<text>仅退款</text>
			</view> -->
			<view class="cells flex flex_center"  @tap="_toggle">
				<view class="cm_title"> 退款原因</view>
				<view class=" f1">{{form.reason}}</view>
				<tui-icon name="arrowright" :size="14" color="#999"></tui-icon>
			</view>
		</view>
		
		<view class="box">
			<view class="cells " style="padding: 20rpx ;" v-if="hasEms">
				<view class=" flex flex_center" style="width: 100%;position: relative;"  >
					<view class="cm_title f1"> 邮费</view>
					<text class=" cm_tex_r" >{{hasEms}}</text> 
					<!-- <input class="cm_prize cm_tex_r"  type="number"  @input="onInput" placeholder=""   v-model="form.apply_price"  />	 -->
				</view>
			</view>
			<view class="cells " style="padding: 20rpx ;">
				<view class=" flex flex_center" style="width: 100%;position: relative;"  >
					<view class="cm_title f1"> 商品金额</view>
					<text class=" cm_tex_r" >￥{{sumPrice}}</text> 
					<!-- <input class="cm_prize cm_tex_r"  type="number"  @input="onInput" placeholder=""   v-model="form.apply_price"  />	 -->
				</view>
			</view>
			<view class="cells " style="padding: 20rpx ;">
				<view class=" flex flex_center" style="width: 100%;position: relative;" >
					<view class="cm_title f1"> 退款金额</view>
					<text class="cm_prize posUnit" :style="{'right':(form.apply_price+'').length*18+'rpx'}">￥</text> 
					<input class="cm_prize cm_tex_r"  type="number"  @input="onInput" placeholder=""   v-model="form.apply_price"  />	
				</view>
				<view style="margin-top: 20rpx;" class="cm_des">
					退款金额可修改，最多￥{{max}}不含运费				
				</view>		 
			</view>
		</view>
		
		<view class="box" v-if="type!=0 && form.refund_type!=0">
			<view class="cells " style="padding: 20rpx ;">
				<view class="cm_title f1"> 退款说明</view>			
				<textarea   v-model="form.reason_detail" style="margin-top: 20rpx;"  class="cm_des textarea" placeholder="选填，详细填写您的退货说明" /> 
			</view>
			
			<view class="container">			
				<view class="tui-box-upload">
					<tui-upload :serverUrl="serverUrl" :value="oringinImg" :formData="formData"  fileKeyName="folder" @complete="result" @remove="remove"></tui-upload>
				</view>
			</view>
			<view class="container cm_des" style="padding: 20rpx   ;">最多上传3张</view>
		</view>
		
		<view class=" tui-skeleton-fillet" style="margin-top:72rpx;padding: 0 20rpx;">
			<tui-button type="primary" shape="circle" :loading="loading" @tap="_readyTo">{{type==3?'重新提交':'提交'}} </tui-button>
		</view>
		
		<view class="modal flex  flex_y flex_center " v-if="show">
			<view class="panel animated fadeIn">
				<view class="cell cm_title flex flex_center" style="padding: 0 30rpx;">
					<view class="f1">请选择退款原因</view>
					<tui-icon name="close" :size="16" @tap="_toggle"></tui-icon>
				</view>
				<block v-for="(item,index) in reasonList" :key="index">					
					<view class="cell flex flex_center"  @tap="_setDefault(item)">
						<view class="leftBar flex flex_center">
							<image v-if="form.reason==item"  src="/static/img/wl_xz.png" mode="scaleToFill" style="width: 32rpx;height: 32rpx;"></image>
							<text v-else class="noDefault"></text>
						</view>
						<view class="f1">
							{{item}}			
						</view>
					</view>
				</block>			
			</view>
		</view>
	</view>
</template>
 
<script>
	import { mapState } from 'vuex';
	import tuiListCell from "@/components/list-cell/list-cell"
	import tuiUpload from '@/components/tui-upload/tui-upload'
	import tuiListView from '@/components/list-view/list-view'
	import http from '@/utils/http/index.js'
	export default {
		data() {
			return {
				item:'',
				loading:false,
				reasonList:[	
					'不想要了',
					'多拍、错拍、不想要',
					'不喜欢、效果不好',
					'商品成分描述不符',
					'材质与商品描述不符',
					'大小尺寸与商品描述不符',
					'生产日期、保质期与商品描述不符',
					'质量问题',
					'收到商品少件、破损或者污渍',
					'商家发错货',
					'假冒品牌',
					'其他'
				],
				form: {
					 "refund_code": "",//修改后重新提交时使用
					    "order_code": "",//主订单号
					    "order_code_child": "",//子订单号
					    "apply_price": 0,//申请金额
					    "reason": "多拍、错拍、不想要",//申请原因
					    "ems_company_name": "",//快递公司名称
					    "ems_number": "",//快递单号
					    "refund_type": "0",//退款方式0-退款 1-退货退款
					    "refund_pay_type": "0",//退款支付状态0-待支付 1-支付成功 2-支付失败
					    "return_quantity": 0,//退货数量
					    "certPic": "",//退款图片
					    "reason_detail": "买多了" //退款详情
				},
				show:false,
				oringinImg:[],  //初始化数组
				imageData: [],
				//上传地址
				serverUrl:http.baseUrl+'/api/Upload/UploadImg',
				time: '',
				sumPrice:0,
				max:0,
				hasEms:0,
				formData:{
					setting: 'up_crm_images'
				}
			};
		},
		components:{
			tuiListCell,
			tuiListView, 
			tuiUpload
		},
		computed: {
			...mapState(['currentPro']),	
			refundPrice() {
				return (this.item.price + this.item.service_total_price).toFixed(2);
			}
		},
		onLoad(options){
			
			this.type = options.type
			// 0仅退款  1退货退款 3编辑状态
			// console.log(this.currentPro)
			uni.setNavigationBarTitle({
				title:this.type==1?'退款退货申请':'退款申请'
			})
			
			if(options.type==3){
				// 编辑状态
				this.form.refund_code = this.currentPro.refund_code			
				this.loadData(this.currentPro.refund_code)			
			}else if(this.type==0){
					// 0仅退款
				this.form.order_code = this.currentPro.order_code					
				this.item = this.currentPro
				this.sumPrice = this.currentPro.goods_num * this.currentPro.alone_price
				this.form.order_code_child = this.currentPro.child_order_code
				this.form.return_quantity = this.currentPro.goods_num
				this.form.refund_type = 0  //1退貨退款 -0 僅退款
				this.form.apply_price = this.currentPro.en_refund_price
				this.max = this.currentPro.en_refund_price
				// alert( this.currentPro.en_refund_price )
				this.ifLast(this.form.order_code )
			}else{	
				// 1退货退款
				this.item = this.currentPro
				this.form.order_code = this.currentPro.order_code		
				this.form.order_code_child = this.currentPro.child_order_code
				this.sumPrice = this.currentPro.goods_num * this.currentPro.alone_price
				// this.form.apply_price = this.currentPro.refund_price?this.currentPro.refund_price:this.sumPrice
				this.form.return_quantity = this.currentPro.goods_num
				this.form.refund_type = 1  //1退貨退款 -0 僅退款
				this.form.apply_price = this.currentPro.en_refund_price
				this.max = this.currentPro.en_refund_price
				this.ifLast(this.form.order_code )
			}
		},
		methods:{
			_switch(k){
				this.form.refund_type = k
				this.type = k
				uni.setNavigationBarTitle({
					title:k==1?'退款退货申请':'退款申请'
				})
			},
			// 是否是最后一个子订单
			async ifLast(code){
				let that = this;
				try {
					let res = await this.$api.ifLastSubOrder({order_code:code}, false);
					if (res.result==1 ) { 
						// 需要退邮费
						this.hasEms = res.data.is_succeed?res.data.ems_price:0
						this.form.apply_price +=res.data.ems_price
						this.sumPrice +=res.data.ems_price
						this.max = this.sumPrice				
					 
					} else {
						that.$ui.toast(res.msg)
					}
				} catch (err) {
					console.log('请求结果false : ' + err);
				}
			},
			// 加载详情
			async loadData(code){
				let that = this;
				try {

					let res = await this.$api.GetRefundOrderInfo({refund_code:code}, false);
	 
					if (res.result==1) {
						if (res.data) {
							let refundModel = res.data.refundModel
							that.item = refundModel;
							that.form.order_code_child =  res.data.refundModel.order_child_code
							that.form.apply_price =  res.data.refundModel.apply_price
							that.sumPrice = res.data.refundModel.apply_price
							that.max = res.data.refundModel.apply_price
							that.form.refund_type = res.data.refundModel.refund_type //1退貨退款 -0 僅退款
							that.form.reason = res.data.refundModel.reason						
							that.form.refund_code = res.data.refundModel.refund_code 
							that.form.reason_detail = res.data.refundModel.reason_detail
							that.oringinImg = res.data.refundModel.certPic.split(',')
							that.form.certPic = that.oringinImg.join(',')
							
							// console.log(that.oringinImg )
						}
						that.skeletonShow = false
					} else {
						that.$ui.toast(res.msg)
					}
				} catch (err) {
					console.log('请求结果false : ' + err);
				}
			},
			onInput(e) {
				let value = e.detail.value;
				// console.log(1,value)
				let arr = value.split('.');
				if (this.time) {
					clearTimeout(this.time);
					this.time = '';
				}
				// 防抖判断
				this.time = setTimeout(() => {
					let str = value;
					if (arr[1] && arr[1].length >= 2) {
						// 小数大4位
						str = value.match(/^\d+\.(\d){2}/)[0];
						// console.log('超过4位')
					}
					// 是否超过最大值
					if (Number(str) >= this.max) {
						// console.log('超过最大值')
						str = this.max
						// console.log('nomal',str)
					}
					
					// this.realvalue = str;
					this.form.apply_price = Number(str)
					// let name = 'form.apply_price'
					// this.$set(this.form,'apply_price', Number(str))
					
					clearTimeout(this.time);
					this.time = '';
				}, 500);
			},
			// 提交
			async _readyTo(){
				// console.log(this.form)			
				// return
				let that =  this
				try {
					// this.$ui.showloading();
					let res = await this.$api.ApplyRefund(this.form);
					// this.$ui.hideloading();
					if (res.result==1) {				
		
						that.$ui.toast('提交成功');
						setTimeout(function() {
							if(that.type==3){
								uni.$emit('refresh_orderDetail')
								uni.$emit('refresh_refundDetail')
								uni.$emit('refresh_refundList')
								uni.navigateBack({
									
								})
							}else{
								uni.redirectTo({
									url: '/pages/features/refundDetail/refundDetail?code='+ res.data.refund_code
								});
							}						
						}, 1000);
					} else {
						that.$ui.toast(res.msg);
					}
				} catch (err) {
					console.log('请求结果false : ' + err);
				}
				
				
			},
			_toggle(){
				this.show = !this.show
			},
			_setDefault(item){
				this.form.reason = item
				this._toggle()
			},
			result(e) {
				// console.log(1,e)
				this.imageData = e.imgArr;
				this.form.certPic = this.imageData.join(',')
			},
			remove(e) {
				//移除图片
				console.log(2,e)
				let index = e.index
			}
		}
	}
</script>

<style lang="scss" scoped>
	.pages{
		padding-bottom: 20rpx;
		.box{
			margin-top: 20rpx;
			background: #fff;
			.cells{
				width: 100%;
				min-height: 92rpx;
				line-height: 92rpx;
				background: #fff;
				padding: 0 20rpx;
				.cm_title{
					margin-right: 50rpx;
				}
				.avatar{
					width: 78rpx;
					height: 78rpx;
					border-radius: 50%;
					margin-right: 24rpx;
				}
				.posUnit{
					position: absolute;
					top: 14rpx;
					font-size: 20rpx;
					
				}
			}
			.textarea{
				height: 150rpx;
			}
			.container{
				padding:0 20rpx;
			}
			
		}
		.picBox {
			margin-bottom: 0;
		}
		.modal{
			width: 100%;
			height: 100vh;
			background: rgba(0,0,0,.4);
			position: fixed;
			left: 0;
			top: 0;
			z-index: 10000;
			.panel{
				width: 80vw;
				// height: 80vh;
				border-radius: 14rpx;
				padding: 40rpx 20rpx;
				background: #fff;
				.cell{
					line-height: 80rpx; 
					height: 80rpx;
					.leftBar {
						width: 92rpx;
						height: 92rpx;
					
						.noDefault {
							width: 32rpx;
							height: 32rpx;
							border-radius: 50%;
							border: 1rpx solid #999999;
						}
					}
				}
			}
		}
	}
</style>
