<template>
	<view class="pages flex flex_center flex_y" >
		<view class="bg"></view>
		<view class="f1 content">
			<view class="box flex flex_center flex_y">
				
				<view class="title">推广者: {{accountInfo.consumer_nick_name}}</view>
				<view class="sqrBox">
					<tki-qrcode ref="qrcode" cid="qrcode" :val="shareUrl" :unit="'rpx'" :size="400" :onval="true" :loadMake="true"
					 @result="qrR" />
				</view>
				<view class="bBox flex flex_center">
					<view class="btns" @click="_save">保存二维码</view>
					<view class="btns" @click="sharurl">复制推广链接</view>
				</view>
				<view class="tBox flex flex_center">
					<text class="blanks"></text>
					<text class="cm_title">分享到</text>
					<text class="blanks"></text>
				</view>
				<view class="sBox flex flex_center "  @click="share">
					<view class="pics">
						<image src="../../../static/img/pyq@1.5x.png" mode="aspectFill" style="width: 86rpx;height: 86rpx;border-radius: 50%;"></image>
					</view>
					<view style="width: 120rpx;height: 1rpx;"></view>
					<view class="pics">
						<image src="../../../static/img/wx@1.5x.png" mode="aspectFill" style="width: 86rpx;height: 86rpx;border-radius: 50%;"></image>
					</view>
				</view>
			</view>
			<view style="padding: 20rpx;">
				<view class="text">1、好友识别二维码通过手机号进行注册</view>
				<view class="text">2、也可以分享此页面到微信，朋友圈邀请注册好友</view>
				<view class="text">3、注册完即可获得相应的奖品</view>
			</view>
		</view>
		
		
	</view>
</template>

<script>
	import wmPoster from "@/components/wm-poster/wm-poster.vue"
	import tkiQrcode from "@/components/tki-qrcode/tki-qrcode.vue"
	// import http from '@/utils/levelHttp/index.js';
	// import html2canvas from 'html2canvas'
	export default {
		data() {
			return {
				parentId: '',
				// ReferralLinks: '',
				QrSrcL: '',
				// inbanner: true,
				// text: '生成海报',
				ewmPic: '',
				shareUrl: 'http://hp.fjhjc.net/page/index.html',
				providerList:[],
				formParams:{
					website:'',
					invitation:''
				},
				shareAuth:false,
				title:'爱心',
				logo:'http://hp.fjhjc.net/logo/hp_logo.png',
				accountInfo:''
			};
		},
		computed: {
			levelAccount() {
				// console.log( this.$store.state.levelAccount)
				return this.$store.state.levelAccount;
			}
		},
		components: {
			tkiQrcode,
			wmPoster
		},
		onLoad() {
			this.accountInfo = this.$store.state.accountInfo;
			// console.log( 111,this.levelAccount)
			// this.formParams.invitation = this.levelAccount.invitation_code
			// const channel = uni.getStorageSync('hepai_currentChannel');
			// switch (channel){
			// 	case 1:
			// 	  this.title = '爱心'
			// 		break;
			// 	case 2:
			// 	 this.title = '蓝钻'
			// 		break;
			// 	case 3:
			// 	  this.title = '皇冠'
			// 		break;
			// 	default:
			// 		break;
			// }
			// this.parentId = this.levelAccount.invitation_code
			// this.shareUrl=
			
			uni.getProvider({
				service: 'share',
				success: e => {
					let data = [];
					for (let i = 0; i < e.provider.length; i++) {
						switch (e.provider[i]) {
							case 'weixin':
								data.push({
									name: '分享到微信好友',
									id: 'weixin'
								});
								data.push({
									name: '分享到微信朋友圈',
									id: 'weixin',
									type: 'WXSenceTimeline'
								});
								break;
							default:
								break;
						}
					}
					this.providerList = data;
				},
				fail: e => {
					console.log('获取登录通道失败' + JSON.stringify(e));
				}
			});
		},
		methods: {
			
			share(e) {
				if (this.providerList.length === 0) {
					uni.showModal({
						title: '当前环境无分享渠道!',
						showCancel: false
					});
					return;
				}
				let itemList = this.providerList.map(function(value) {
					return value.name;
				});
				let that = this
				uni.showActionSheet({
					itemList: itemList,
					success: res => {
						// console.log(this.providerList[res.tapIndex].id)
						if (this.providerList[res.tapIndex].id == 'qq') {
							this.type = 1;
						} else {
							this.type = 0;
						}
						uni.share({
							provider: this.providerList[res.tapIndex].id,
							scene: this.providerList[res.tapIndex].type && this.providerList[res.tapIndex].type === 'WXSenceTimeline' ?
								'WXSenceTimeline' : 'WXSceneSession',
							type:0,
							title: '睿众商城',
							summary:'睿众商城诚邀您加入',
							imageUrl: this.logo,
							href: this.shareUrl,
							success: res => {
								console.log('success:' + JSON.stringify(res));
							},
							fail: e => {
								uni.showModal({
									content: e.errMsg,
									showCancel: false
								});
							}
						});
					}
				});
			},
			qrR(e) {
				// console.log(e)
				this.ewmPic = e
			},
			_navBack() {
				uni.navigateBack({})
			},
			_menus() {
				let that = this
				uni.showActionSheet({
					itemList: ['立即分享'],
					success: function(res) {
						// console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
						let key = res.tapIndex;
						switch (key) {
							case 1:
								// 分享操作
								that.toshare()
								break;
							default:
								break;
						}
					},
					fail: function(res) {
						console.log(res.errMsg);
					}
				});
			},
			// 保存图片
			_save() {
				let  that =  this
				uni.showActionSheet({
					itemList: ['保存图片到相册'],
					success: () => {
						uni.saveImageToPhotosAlbum({
							filePath: this.ewmPic,
							success: function() {
						
								that.$ui.toast('保存成功')
							}
						});
					}
				});
			},
			// 关闭
			_cancel() {
				this.QrSrcL = '',
					this.inbanner = true
			},
			// 复制链接
			sharurl(k) {
				// let str = ''
				// if (k == 0) {
				// 	// 推广码
				// 	str = this.parentId
				// } else {
				// 	// 推广链接
				// 	str = this.shareUrl
				// }
				let str = this.shareUrl
		
				uni.setClipboardData({
					data: str,
					success: function() {
						console.log('success');
						uni.showModal({
							title: '复制成功',
							content: '推广链接已复制到粘贴板',
							showCancel: false,
							success: function(res) {
								if (res.confirm) {
									//console.log('用户点击确定');
								} else if (res.cancel) {
									//console.log('用户点击取消');
								}
							}
						});
					}
				});
			}
		}
	}
</script>

<style scoped lang="scss">
	.pages{
		width: 100%;
		height: 100vh;
		// background: url(../../../static/img/fx_bg@1.jpg);
		background-size: contain;
		background-repeat: no-repeat;
		.bg{
			width: 100%;
			height: 420rpx;
		}
		.content{
			width: 100%;
			background: #c37916;
			padding:40rpx 20rpx;
			.box{
				background: #fff;
				width: 100%;
				border-radius: 20rpx;
				padding: 40rpx 20rpx;
				.sqrBox{
					width: 400rpx;
					height: 400rpx;
					margin:32rpx auto 48rpx auto			
				}
				.bBox{
					width: 80%;
					.btns{
						width: 278rpx;
						height: 66rpx;
						border-radius: 33rpx;
						background: var(--cl_primary);
						text-align: center;
						line-height: 66rpx;
						color: #333;
						margin: 0 18rpx;
					}
				}
				.tBox{
					margin-top:56rpx;
					.blanks{
						width: 108rpx;
						height: 4rpx;
						background: #333;
						margin: 0 20rpx;
					}
				}
				.sBox{
					margin-top: 32rpx;
				}
				
			}
		}
		
		.text{
			color: #fff;
			line-height:2;
			font-size: 24rpx;
		}
	}
</style>
