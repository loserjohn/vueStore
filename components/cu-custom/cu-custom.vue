<template>
	<view>
		<view class="cu-custom" :style="[{height:CustomBar + 'px'}]">
			<view class="cu-bar flex flex_center" :style="style" :class="[bgImage!=''?'none-bg text-white bg-img':'',bgColor,fixed?'fixed':'']">
				<view class="action flex flex_center" v-if="isBack" :style="{'width':CustomBar+'px' ,'height':CustomBar+'px'}" >
					<!-- <text class="icon-back"></text> -->
					<slot name="backText" >
						<view  :style="{'width':CustomBar+'px' ,'height':CustomBar+'px'}"  @tap="BackPage">
							<Icon name="arrowleft" :size="30" :color="btnColor" ></Icon>
						</view>					
					</slot>
				</view>
				<view class="content f1 flex flex_center" :style="[{top:StatusBar + 'px'}]">
					<slot name="content"></slot>
				</view>
				<slot name="right" >
					<view :style="{'width':CustomBar+'px' ,'height':CustomBar+'px'}"></view>
				</slot>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar
			};
		},
		name: 'cu-custom',
		computed: {
			style() {
				var StatusBar= this.StatusBar;
				var CustomBar= this.CustomBar;
				// console.log(StatusBar)
				// console.log(CustomBar)
				var bgImage = this.bgImage;
				var style = `height:${CustomBar}px;padding-top:${StatusBar}px;`;
				// #ifdef H5
				
				// #endif
				
				// #ifdef APP-PLUS
				
				// #endif
				// if (this.bgImage) {
				// 	style = `${style}background-image:url(${bgImage});`;
				// }
				return style
			}
		},
		props: {
			bgColor: {
				type: String,
				default: ''
			},
			isBack: {
				type: [Boolean, String],
				default: false
			},
			btnColor:{
				type: String,
				default: '#fff'
			},
			bgImage: {
				type: String,
				default: ''
			},
			fixed:{
				type: Boolean,
				default: true
			}
		},
		methods: {
			BackPage() {
				uni.navigateBack({
					delta: 1
				});
			}
		}
	}
</script>

<style  scoped>

	.cu-custom {
		display: block;
		position: relative;
		width: 100vw;
		/* background: red; */
	}
	
	.cu-custom .cu-bar .content {
		width: calc(100% - 440rpx);
		height: 100%;
		/* background: pink; */
	}
	
	.cu-custom .cu-bar .content image {
		height: 60rpx;
		width: 240rpx;
	}
	
	.cu-custom .cu-bar {
		min-height: 0px;
		/* #ifdef MP */
		padding-right: 220rpx;
		/* #endif */
		box-shadow: 0rpx 0rpx 0rpx;
		z-index: 9999;
	}
	
	.cu-custom .cu-bar .border-custom {
		position: relative;
		background: rgba(0, 0, 0, 0.15);
		border-radius: 1000rpx;
		height: 30px;
	}
	
	.cu-custom .cu-bar .border-custom::after {
		content: " ";
		width: 200%;
		height: 200%;
		position: absolute;
		top: 0;
		left: 0;
		border-radius: inherit;
		transform: scale(0.5);
		transform-origin: 0 0;
		pointer-events: none;
		box-sizing: border-box;
		border: 1rpx solid  var(--white);
		opacity: 0.5;
	}
	
	.cu-custom .cu-bar .border-custom::before {
		content: " ";
		width: 1rpx;
		height: 110%;
		position: absolute;
		top: 22.5%;
		left: 0;
		right: 0;
		margin: auto;
		transform: scale(0.5);
		transform-origin: 0 0;
		pointer-events: none;
		box-sizing: border-box;
		opacity: 0.6;
		background-color:  var(--white);
	}
	
	.cu-custom .cu-bar .border-custom text {
		display: block;
		flex: 1;
		margin: auto !important;
		text-align: center;
		font-size: 34rpx;
	}
	.cu-custom  .action{
		
	}
</style>
