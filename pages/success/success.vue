<template>
	<view class="pages">
		<view class="blank"></view>
		
		<image src="../../static/img/success.png" mode="aspectFill" class="logo"></image>
		<view class="cm_title">支付成功</view>
		<!-- <view class="cm_text">您已经购买成功，前往我的订单查看</view> -->
	<!-- 	<view class="flex flex_center">
			<view class="btns cm_btn plain" @tap="_toHis">查看订单</view>
			<view class="btns cm_btn" @tap="_toMain">返回首页</view>
		</view> -->
		<view style="padding: 0 100rpx;">
			<tui-button type="primary" shape="circle" :disabled="false" :loading="loading" @tap="yes">完成</tui-button>
		</view>
		
	</view>
</template>

<script>
	import SET from '../../SET.js'
	export default {
		data() {
			return {
				from:''
			};
		},
		onLoad(options){
			this.from = options.from
		},
		methods:{
			_toHis(){
				if(this.from == 'orderDetail'){
					
					uni.navigateBack({
						delta:2
					})
				}else{
					uni.redirectTo({
						url:'/pages/features/order/order?current=2'
					})
				}		
			},
			_toMain(){
				uni.switchTab({
					url:'/pages/main/main'
				})
			},
			yes(){
				// uni.redirectTo({
				// 	url:'/pages/features/order/order'
				// })
				window.location.href = SET.mainUrl + '#/pages/features/order/order?current=2'
			}
		}
	}
</script>

<style lang="scss" scoped>
	.pages{
		background: #fff;
		text-align: center;
		.logo{
			width: 280rpx;
			height:220rpx;
			margin-top: 200rpx;
		}
		.blank{
			width: 100%;
			height: 16rpx;
			background: #f8f8f8;
		}
		.cm_title{
			margin-top: 56rpx;
			margin-bottom: 32rpx;
		}
		.btns{
			width: 290rpx;
			margin: 96rpx 15rpx;
		}
	}
</style>
