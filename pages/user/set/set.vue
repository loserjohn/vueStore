<template>
	<view class="pages">
		<!-- <view class="main">
				<view class="cu-form-group flex flex_center"  @tap="_chooseAvatar">
					<view class="title f1">头像</view>
					<image class="avatar"  :src="formParams.consumer_head"  mode="aspectFit"></image>
					<tui-icon name="arrowright" size="16"></tui-icon>
				</view>
				<view class="cu-form-group flex flex_center">
					<view class="title">昵称</view>
					<input placeholder="请输入新昵称" name="input" class="cm_tex_r f1" type="text" v-model="formParams.consumer_nick_name" ></input>
				</view>	
				<view class="cu-form-group flex flex_center">
					<view class="title f1">支付密码</view>
						<tui-icon name="arrowright" size="16"></tui-icon>
				</view>	
			</view> -->

		<!-- <button type="primary" class="cm_btn" @tap="_sureUpdated" style="margin-top:60rpx">保存修改</button> -->
		<!-- view style="margin-top: 72rpx;padding: 0 20rpx;">
				<tui-button type="primary" shape="circle" :loading="loading" @tap="_sureUpdated">保存修改</tui-button>
			</view> -->
		<tui-list-view unlined="all" class="tui-list-view">
			<tui-list-cell @click="_href(1)" :arrow="true" :last="false">
				个人信息设置
			</tui-list-cell>
			<!-- <tui-list-cell @click="_href(2)" :arrow="true" :last="false">
				支付密码
			</tui-list-cell> -->
			<!-- <tui-list-cell  :arrow="true" :last="true">
				版本号：{{version}}
			</tui-list-cell> -->
		</tui-list-view>
		<view style="margin-top: 72rpx;padding: 0 20rpx;">
			<tui-button type="primary" shape="circle" :loading="loading" @tap="_loginOut">退出登录</tui-button>
		</view>
		<tui-modal :show="modal" @click="handleClick" @cancel="hide" content="确定退出登录吗？" :maskClosable="false" color="#333"
		 :size="32"></tui-modal>
	</view>
</template>

<script>
	import tuiListView from "@/components/list-view/list-view"
	import tuiListCell from "@/components/list-cell/list-cell"
	// import tuiModal from "@/components/modal/modal"
	import http from '@/utils/http/index.js'
	import SET from '@/SET.js'
	export default {
		data() {
			return {
				formParams: {
					"consumer_nick_name": "",
					"consumer_head": ""
				},
				loading: false,
				modal: false,
				version:''
			};
		},
		components: {
			tuiListView,
			tuiListCell,
			// tuiModal
		},
		onLoad() {
			let usrMsg = this.$store.state.accountInfo;
			// console.log(JSON.stringify(usrMsg))
			this.formParams.consumer_nick_name = usrMsg.consumer_nick_name;
			this.formParams.consumer_head = usrMsg.consumer_head
			this.version = this.Version
		},
		methods: {
			_href(val) {
				let url = ''
				switch (val) {
					case 1:
						url = '/pages/user/person/person'
						break;
					case 2:
						url = '/pages/user/setPayPass/setPayPass'
						break;
					default:
						break;
				}
				uni.navigateTo({
					url: url
				})
			},
			_loginOut() {
				// let that = this;
				// uni.showModal({
				// 	title: '提示',
				// 	content: '退出账户？',
				// 	success: function(res) {
				// 		if (res.confirm) {
				// 			// uni.removeStorageSync('WYJF_openId');
				// 			uni.removeStorageSync('WYJF_token');
				// 			uni.showLoading({
				// 				title: '注销中'
				// 			});
				// 			setTimeout(() => {
				// 				this.$ui.hideloading();
				// 				uni.reLaunch({
				// 					url:'../login/login'
				// 				})
				// 			}, 1000);
				// 		} else if (res.cancel) {
				// 			console.log('用户点击取消');
				// 		}
				// 	}
				// });
				this.modal = true
			},
			handleClick(e) {
				let index = e.index;
				if (index === 0) {
					// this.tui.toast("你点击了取消按钮")

				} else {
					

					this.$store.commit('logout')
					
					// uni.showLoading({
					// 	title: '注销中'
					// });
					uni.showLoading({
						title: '注销中'
					})
					setTimeout(() => {
						// this.$ui.hideloading();
						this.$ui.hideloading();
						// uni.reLaunch({
						// 	url:'/pages/role/login/login'
						// })
						uni.navigateBack({

						})
					}, 1000);
				}
				this.modal = false
			},

		}
	}
</script>

<style lang="scss" scoped>
	.pages {
		.main {
			background: #fff;
			padding: 0 20rpx;

			.cu-form-group {
				border-bottom: 1rpx solid #E5E5E5;
				min-height: 88rpx;
				line-height: 88rpx;

				.avatar {
					width: 70rpx;
					height: 70rpx;
					border-radius: 50%;
				}


				&:last-child {
					border-bottom: none
				}
			}

		}
	}
</style>
