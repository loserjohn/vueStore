<template>
	<view class="uni-countdown flex flex_center">
		<view v-if="showDay" :style="{borderColor:borderColor, color:color, background:backgroundColor}" class="uni-countdown__number">{{ d }}</view>
		<view v-if="showDay" :style="{color:splitorColor}" class="uni-countdown__splitor">天</view>
		<view :style="{borderColor:borderColor, color:color, background:backgroundColor}" class="uni-countdown__number">{{ h }}</view>
		<view :style="{color:splitorColor}" class="uni-countdown__splitor">{{ showColon ? ':' : '时' }}</view>
		<view :style="{borderColor:borderColor, color:color, background:backgroundColor}" class="uni-countdown__number">{{ i }}</view>
		<view :style="{color:splitorColor}" class="uni-countdown__splitor">{{ showColon ? ':' : '分' }}</view>
		<view :style="{borderColor:borderColor, color:color, background:backgroundColor}" class="uni-countdown__number">{{ s }}</view>
		<view v-if="!showColon" :style="{color:splitorColor}" class="uni-countdown__splitor">秒</view>
	</view>
</template>
<script>
	export default {
		name: 'CountCalc',
		props: {
			showDay: {
				type: Boolean,
				default: true
			},
			showColon: {
				type: Boolean,
				default: true
			},
			backgroundColor: {
				type: String,
				default: '#FFFFFF'
			},
			borderColor: {
				type: String,
				default: '#fff'
			},
			color: {
				type: String,
				default: '#fff'
			},
			splitorColor: {
				type: String,
				default: '#333'
			},
			day: {
				type: Number,
				default: 0
			},
			hour: {
				type: Number,
				default: 0
			},
			minute: {
				type: Number,
				default: 0
			},
			second: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				timer: null,
				d: '00',
				h: '00',
				i: '00',
				s: '00',
				leftTime: 0,
				seconds: 0
			}
		},
		created: function(e) {
			this.seconds = this.toSeconds(this.day, this.hour, this.minute, this.second)
			// console.log( this.hour, this.minute, this.second)
			this.countDown()
			this.timer = setInterval(() => {
				this.seconds--
				if (this.seconds < 0) {
					this.timeUp()
					return
				}
				this.countDown()
			}, 1000)
		},
		beforeDestroy() {
			clearInterval(this.timer)
		},
		methods: {
			toSeconds(day, hours, minutes, seconds) {
				return (day * 60 * 60 * 24) + (hours * 60 * 60) + (minutes * 60) + seconds
			},
			timeUp() {
				clearInterval(this.timer)
				this.$emit('timeup')
			},
			countDown() {
				let seconds = this.seconds
				let [day, hour, minute, second] = [0, 0, 0, 0]
				if (seconds > 0) {
					day = Math.floor(seconds / (60 * 60 * 24))
					hour = Math.floor(seconds / (60 * 60)) - (day * 24)
					minute = Math.floor(seconds / 60) - (day * 24 * 60) - (hour * 60)
					second = Math.floor(seconds) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60)
				} else {
					this.timeUp()
				}
				if (day < 10) {
					day = '0' + day
				}
				if (hour < 10) {
					hour = '0' + hour
				}
				if (minute < 10) {
					minute = '0' + minute
				}
				if (second < 10) {
					second = '0' + second
				}
				this.d = day
				this.h = hour
				this.i = minute
				this.s = second
			}
		}
	}
</script>
<style>
	@charset "UTF-8";

	.uni-countdown {
		padding: 2rpx 0;
		display: inline-flex;
		flex-wrap: nowrap;
		justify-content: center;
		margin: 12rpx 0;
		height: 36rpx;
	}

	.uni-countdown__splitor {
		justify-content: center;
		line-height: 32rpx;
		padding: 0 5rpx;
		font-size: 28rpx
	}

	.uni-countdown__number {
		line-height: 36rpx;
		justify-content: center;
		height: 36rpx;
		width: 36rpx;
		border-radius: 6rpx;
		margin: 0 5rpx;
		font-size: 28rpx;
		border: 1px solid #fff;
		font-size: 24rpx;
		/* padding: 0 5rpx; */
		text-align: center;
		background: #fff;
		color: #fff;
	}
</style>