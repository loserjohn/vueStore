<template>
	<view class="page flex flex_y flex_center">
		<image src="../../static/img/error.jpg" mode="widthFix" class="icon"></image>
		<view class="cm_title" style="line-height: 2;">网络竟然奔溃了</view>
		<view class="cm_text">请及时尝试刷新或重启App</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		onLoad(){
			setTimeout(()=>{
				uni.setStorageSync('errlock',false)
			},500)
		},
		methods:{
			
		}
	}
</script>

<style lang="scss" scoped>
	.page{
		width:100%;
		height: 100vh;
		background: #fff;
		.icon{
			width: 300rpx;
			height: 300rpx;
			border-radius: 50%;
		}
	}
</style>
