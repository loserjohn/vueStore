<template>
	<view class="tui-header">
		<view class="tui-header-top">
		<!-- 	<view class="tui-top-item" :class="type==0?'active':''" @tap="screen(0)">综合</view>
			<view class="tui-top-item" :class="type==1?'active':''" @tap="screen(1)">人气</view> -->
			<view class="tui-top-item" :class="type==0?'active':''" @tap="screen(0)">
				<view>综合</view>
				<view class="tui-price-arrow">
					<tui-icon name="up" color="#409899" :size="22" v-show="type==0&&sort=='asc'"></tui-icon>
					<tui-icon name="down" color="#409899" :size="22" v-show="type==0&&sort=='desc'"></tui-icon>
					<!-- <view class="tui-icon-box tui-arrow-up"  >
						<Icon name="turningup" :size="16" :color="type==0&&sort=='asc'?'#409899':'#666'"></Icon>
					</view>
					<view class="tui-icon-box tui-arrow-down">
						<Icon name="turningdown" :size="16" :color="type==0&&sort=='desc'?'#409899':'#666'"></Icon>
					</view> -->
				</view>
			</view>
			<view class="tui-top-item" :class="type==1?'active':''" @tap="screen(1)" >
				<view>热销</view>
				<view class="tui-price-arrow">
					<tui-icon name="up" color="#409899" :size="22" v-show="type==1&&sort=='asc'"></tui-icon>
					<tui-icon name="down" color="#409899" :size="22" v-show="type==1&&sort=='desc'"></tui-icon>
					<!-- <view class="tui-icon-box tui-arrow-up" >
						<Icon name="turningup" :size="16" :color="type==1&&sort=='asc'?'#409899':'#666'"></Icon>
					</view>
					<view class="tui-icon-box tui-arrow-down">
						<Icon name="turningdown" :size="16" :color="type==1&&sort=='desc'?'#409899':'#444'"></Icon>
					</view> -->
				</view>
			</view>
			<view class="tui-top-item" :class="type==2 ?'active':''"  @tap="screen(2)">
				<view>价格</view>
				<view class="tui-price-arrow">
					<tui-icon name="up" color="#409899" :size="22" v-show="type==2&&sort=='asc'"></tui-icon>
					<tui-icon name="down" color="#409899" :size="22" v-show="type==2&&sort=='desc'"></tui-icon>
					<!-- <view class="tui-icon-box tui-arrow-up" >
						<Icon name="turningup" :size="16" :color="type==2&&sort=='asc'?'#409899':'#444'"></Icon>
					</view>
					<view class="tui-icon-box tui-arrow-down">
						<Icon name="turningdown" :size="16" :color="type==2&&sort=='desc'?'#409899':'#444'"></Icon>
					</view> -->
				</view> 
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type:0,
				sort:'desc'
			};
		},
		methods:{
			screen(k) {
				// alert(k);
				this.type = k
				if(this.sort=='desc'){
					this.sort = 'asc'
				}else{
					this.sort = 'desc'
				}
				
				this.$emit('tabChange',{type:this.type,sort:this.sort})
			},
		}
	}
</script>

<style  scoped>
	/*header*/
	.tui-header {
		width: 100%;
		padding-top: 24rpx;
		padding-bottom: 24rpx;
		/* box-shadow: 0 15rpx 10rpx -15rpx #f2f2f2; */
		box-sizing: border-box;
		background: #fff;
		/* position: fixed; */
		z-index: 1000;
	}
	
	.tui-header-top,

	
	.tui-top-item {
		height: 26rpx;
		line-height: 26rpx;
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #999;
	}
	.active{
		color: #409899;
	}
	.tui-topitem-active {
		position: relative;
		font-weight: bold;
	}
	
	.tui-topitem-active::after {
		content: '';
		position: absolute;
		width: 44rpx;
		height: 6rpx;
		background: #5677fc;
		border-radius: 6rpx;
		bottom: -10rpx;
		left: 50%;
		-webkit-transform: translateX(-50%);
		transform: translateX(-50%);
	}
	
	.tui-price-arrow {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 16rpx;
		/* background: red; */
	}
	
	.tui-bottom-item .tui-icon-class,
	.tui-screen .tui-icon-class {
		margin-left: 6rpx;
	}
	
	.tui-icon-box {
		line-height: 10px !important;
		padding: 0 !important;
		display: block !important;
		position: relative;
	}
	
	.tui-arrow-up {
		top: 6px;
	}
	
	.tui-arrow-down {
		top: -3px;
	}
	
	.tui-hover {
		background: rgba(0, 0, 0, 0.2);
	}
	
</style>
