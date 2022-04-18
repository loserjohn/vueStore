<template>
	<view class="pages">
		    <view class="main">
				<view class="cu-form-group flex flex_center"  @tap="_chooseAvatar">
					<view class="title f1">头像</view>
					<image class="avatar"  :src="accountInfo.consumer_head"  mode="aspectFill"></image>
					<!-- <text class="iconfont "></text> -->
					<tui-icon name="arrowright" :size="16"></tui-icon>
				</view>
				<view class="cu-form-group flex flex_center">
					<view class="title">微信昵称</view>
					<input placeholder="请输入新昵称" name="input" class="cm_tex_r f1" type="text" v-model="formParams.consumer_nick_name" ></input>
				</view>	
				<view class="cu-form-group flex flex_center" >
					<view class="title">手机号</view>
					<view class="cm_tex_r f1">{{usrMsg.consumer_mobile}}</view>
					<!-- <tui-icon name="arrowright" :size="16"></tui-icon> -->
				</view>	
				<!-- <view class="cu-form-group flex flex_center">
					<view class="title f1">登录密码修改</view>
						<tui-icon name="arrowright" :size="16"></tui-icon>
				</view>	 -->
			</view>
					
			<!-- <button type="primary" class="cm_btn" @tap="_sureUpdated" style="margin-top:60rpx">保存修改</button> -->
			<view style="margin-top: 72rpx;padding: 0 20rpx;">
				<tui-button type="primary" shape="circle" :loading="loading" @tap="_updateUserInfo">保存修改</tui-button>
			</view>
			
			<!-- <view style="margin-top: 72rpx;padding: 0 20rpx;">
				<tui-button type="primary" shape="circle" :loading="loading" @tap="_loginOut">退出登录</tui-button>
			</view> -->
	</view>
</template>

<script>
	
	import http from '@/utils/http/index.js'
	export default {
		data() {
			return {
				formParams: {
					"consumer_nick_name": "", 
					"consumer_head": ""
				},
				loading:false
			};
		},
		onLoad(){
			let usrMsg =  this.$store.state.accountInfo;
			// console.log(JSON.stringify(usrMsg))
			this.formParams.consumer_nick_name = usrMsg.consumer_nick_name;
			this.formParams.consumer_head = usrMsg.consumer_head
		},
		computed:{
			usrMsg(){
				return this.$store.state.accountInfo
			} 
		},
		methods:{
			// 更改手机号
			updatedPhone(){
				uni.navigateTo({
					url:'/pages/role/replacePhone/replacePhone'
				})			
			},
			// 头像
			_chooseAvatar(){
				let that = this
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					// sourceType: ['album'], //从相册选择
					success: function(res) {
						// console.log(JSON.stringify(res.tempFilePaths));
						that._upload(res.tempFilePaths)
							.then((src) => {
								that.updatedUser({
									consumer_head: src
								})
							})
							.catch(err => {
								// that.$refs.uToast.show({
								// 	title: '上传失败' + err,
								// 	type: 'error',
								// 	position: 'bottom'
								// })
								that.$ui.toast('上传失败')
							})
					}
				})
			},
			_updateUserInfo(){
				this.updatedUser({consumer_nick_name:this.formParams.consumer_nick_name})
			},
			// 更新用户信息
			async updatedUser(obj){
				let that = this
				let data = Object.assign({},this.formParams, obj)
				try {
					// console.log(data)
					that.$ui.showloading()
					let res = await this.$api.userInfoUpdate(data);
					that.$ui.hideloading()
					if (res.result===1) {
						// throw new Error('res.msg')
						// that.$refs.uTips.show({
						// 	title: '更新成功',
						// 	type: 'success'
						// })
						that.$ui.toast('更新成功')
						that.$store.dispatch('refreshUser')
					} else {
						throw new Error(res.msg)
					}
				} catch (err) {
					// console.log(err)
					that.$ui.toast(err)
					// that.$refs.uTips.show({
					// 	title: err,
					// 	type: 'error'
					// })
				
				}
			},
			_sureUpdated(){
				let that = this
				uni.showModal({
					title: '邵氏消防商城提醒你',
					content: '是否提交修改',
					success: function (res) {
						if (res.confirm) {
							that._updateUserInfo()
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			_loginOut(){
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.pages{
		.main{
			background: #fff;
			padding:0 20rpx;
			.cu-form-group{
				border-bottom: 1rpx solid #E5E5E5;
				min-height: 88rpx;
				line-height: 88rpx;
				.avatar{
					width: 70rpx;
					height: 70rpx ;
					border-radius: 50%;
				}
				
				
				&:last-child{
					border-bottom: none
				}
			}
			
		}
	}
</style>
