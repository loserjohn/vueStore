<template>
	<view><input class="numBox " type="number" v-model="realvalue" @input="onInput" placeholder="请输入金额" placeholder-class="placeholder"/></view>
</template>

<script>
export default {
	data() {
		return {
			realvalue: '',
			time: ''
		};
	},
	props: {
		max: {
			type: Number,
			default: 1000
		}
	},
	watch: {
		value(nval, oval) {}
	},
	methods: {
		// 外部设置金额
		setValue(val){
			this.realvalue = val
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
					str = this.max;
				}
				// console.log('nomal',str)
				this.realvalue = str;
				this.$emit('input', this.realvalue);
				clearTimeout(this.time);
				this.time = '';
			}, 500);
		}
	}
};
</script>

<style lang="less" scoped>
// .inputs {
// 	height: 88rpx;
// 	line-height: 88rpx;
// 	border-radius: 12rpx;
// 	background: #fff;
// 	padding: 0 20rpx;
// 	input {
// 		line-height: 88rpx;
// 	}
// }
.numBox {
	font-size: 36rpx;
	font-weight: 600;
	color: #333;
	
}
.placeholder{
	font-size: 28rpx;
	font-weight: 400;
	color: #999;
}
</style>
