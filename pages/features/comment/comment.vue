<template>
	<view class="pages">
		<!-- <cu-custom bgColor="bg-gradual-orange" :isBack="true">
			<block slot="content">意见反馈</block>
		</cu-custom> -->
		<view class="box">
			<view class="textBox">
				<textarea @input="bindText" auto-height maxlength="100" v-model="commont"  :focus="true" placeholder="请输入你的宝贵意见"/>
				<text class="nums text-gray">{{ len+'/100'}}</text>
			</view>
			
			<tui-button type="primary" shape="circle" :disabled="false" :loading="false" @tap="bindSubmit">提交意见</tui-button>		
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				commont:'',
				len:0,
			};
		},
		methods:{
			// 字数计算
			bindText(){
				let l = this.commont.length;
				this.len =l
			},
			// 提交
			async bindSubmit(){
				if(!this.commont){
				
					this.$ui.toast('请输入您的宝贵意见')
					return false
				}
				let  that = this;
				let data = {
					"feedback_content": this.commont
				}
				try {
					this.$ui.showloading()
					let res = await this.$api.SubmitComment(data);
					this.$ui.hideloading();
					// console.log( '请求结果success : ' + JSON.stringify(res))
					if (res.result==1) {
				
						that.$ui.toast('反馈成功')
						setTimeout(function() {
							uni.navigateBack({
								
							})
						}, 1000);
					} else {
						that.$ui.toast(res.msg)
					}
				} catch (err) {
					console.log('请求结果false : ' + err)
				}
				
			}
		}
	}
</script>

<style lang="less" scoped>
	.pages{
		.box{
			padding: 20rpx;
			.textBox{
				width: 100%;
				min-height:400rpx;
				background: #fff;
				padding: 20rpx;
				border-radius: 20rpx;
				margin-bottom:60rpx;
				position: relative;
				.nums{
					position: absolute;
					right: 40rpx;
					bottom: 40rpx;
					line-height: 2;
				}
			}
		}
		
	}
</style>
