<template>
	<view class="pages">
		 <rich-text :nodes="strings"></rich-text>
		 
		 
	</view>
</template>

<script>
	export default {
		data() {
			return {
				formParams:{
					type:3
				},
				strings:''
			};
		},
		onLoad(options) {
			let type =  parseInt(options.type) ;
			this.formParams.type=type
			this._loadData('refresh');
	
		},
		methods: {
			imageLoad(){},
			async _loadData(type, callback) {
				let that = this
				try {
					this.$ui.showloading();
					let res = await this.$api.getGuide(this.formParams);
					
					this.$ui.hideloading()
					if (res.result==1) {
						that.strings = res.data.Value
						// let img =new Image();
						// img.src = res.data.Value
						// img.onLoad = function(e){
						// 	console.log(JSON.stringify(e))
						// }			
						
						uni.setNavigationBarTitle({
							title:res.data.Text
						})
					} else {
						that.$ui.toast(res.msg)
					}
				} catch (err) {
					console.log('请求结果false : ' + err)
				}
				if (callback) callback()
			},
		}
	};
</script>

<style lang="scss" scoped>
	.pages{
		padding: 20rpx;
	}
</style>
