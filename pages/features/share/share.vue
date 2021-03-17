<template>
	<view>
		<!-- <u-navbar back-text="返回" :title="registe_type ==5?'渠道分享':'客户分享'"></u-navbar> -->
		<view class="pages ">

			<view class="contentBox">
				<image :src="imgSrc" mode="widthFix" class="contentBG"></image>
			</view>
			<view class="footer flex flex_center">
				<tui-button shape="circle" @click="createHB" type="primary">生成海报分享</tui-button>
			</view>
			<view class="hideCanvasView"><canvas class="canvas" canvas-id="default_PosterCanvasId" :style="{ width: canvasW*2 + 'px', height: canvasH*2 + 'px' }"></canvas></view>
			<tui-toast ref="uToast" />
			<tui-modal :show="show"   backgroundColor="transparent"    custom padding="0rpx" :maskClosable="true">
				<!-- <view class="sharebgBox" :style="{'background-image':`url(${canvasPic})`}"> -->
					<view class="sharebgBox flex flex_y"  >
					<!-- <view class="hideContent flex flex_y" > -->
						<image :src="canvasPic" mode="widthFix" class="bgcanvasPic"  ></image>
						<!-- </view> -->
						<view class="flex flex_center u-row-between u-col-center" style="width: 100%;padding: 20rpx 80rpx;">
							<view class="flex flex_y  f1" @click.prevent.stop="saveImage(1)">
								<image src="../../../static/img/zq_bc.jpg" class="sbtns"></image>
								<text style="color: #fff;margin-top: 16rpx;">保存海报</text>
							</view>
							<view class="flex flex_y  f1" @click.prevent.stop="saveImage(2)">
								<image src="../../../static/img/zq_wx.jpg" class="sbtns"></image>
								<text style="color: #fff;margin-top: 16rpx;">微信好友</text>
							</view>
							<view class="flex flex_y  f1" @click.prevent.stop="saveImage(3)">
								<image src="../../../static/img/zq_pyq.jpg" class="sbtns"></image>
								<text style="color: #fff;margin-top: 16rpx;">朋友圈</text>
							</view>
						</view>
						<view class="flex flex_center u-row-center u-col-center" style="width: 100%;padding: 20rpx 80rpx;">
							<tui-icon name="close" @click="show = false" color="#fff" :size="40"></tui-icon>
						</view>
					</view>
			</tui-modal>
		</view>
	</view>
</template>

<script>
	import SET from '@/SET.js';
	import _app from '@/js_sdk/QuShe-SharerPoster/QS-SharePoster/app.js';
	import {
		getSharePoster
	} from '@/js_sdk/QuShe-SharerPoster/QS-SharePoster/QS-SharePoster.js';
	import {
		mapState
	} from 'vuex'
	
	export default {
		data() {
			return {
				providerList: [],
				poster: {},
				qrShow: false,
				canvasId: 'default_PosterCanvasId',
				imgs: [],
				imgSrc: '',
				QrSrc: '',
				Title: ' ',
				ShortTitle: '',
				PriceTxt: '',
				Coupon: '',
				shareUrl: ``,
				currentBg: 0,
				canvasH: '',
				canvasW: '',
				currentShow: 0,
				load: false,
				all: false,
				canvasPic: '',
				usrMsg: '',
				tkl: '',
				errMsg: '',
				id: '',
				show: false,
				registe_type:3  //3是客户   5是渠道业务员
			};
		},
		computed: {},
		onLoad(options) {
			const device = uni.getSystemInfoSync();
			this.registe_type = options.type
			
			this.canvasH = device.safeArea.height * 0.7;
			let rate = 375 / 625; //宽/高
			// let rate = 375 / 812; //宽/高
			this.canvasW = this.canvasH * rate;
			
			let poster = uni.getStorageSync('poster');
			// console.log(this.accountInfo ,this.canvasW,this.canvasH)	
			this.imgSrc =this.registe_type==5?'../../../static/img/fx_ywy.jpg':'../../../static/img/fx_bg.jpg';
			this.Title = `邀请人:${this.accountInfo.consumer_name}`;
			this.ShortTitle = `邀请码:${this.accountInfo.invitation_code}`;
			this.shareUrl = `${SET.mainUrl}/web/index.html?action=${this.registe_type==5?'ywshare':'khshare'}action&payload=${this.accountInfo.invitation_code}payload`;
			// this.shareUrl = `http://192.168.1.5:8080?action=${this.registe_type==5?'ywshare':'khshare'}action&payload=${this.accountInfo.invitation_code}payload`;
			// console.log( this.shareUrl)
		},
		methods: {
			createHB() {
				this.show = true
				this.shareFc();
			},
			async _copy(k) {
				return;
				let that = this;
				clipboard.setText(this.tkl);
				uni.showToast({
					title: '分享链接复制成功，赶紧去分享吧',
					icon: 'none',
					position: 'bottom'
				});
				switch (k) {
					case 2:
						break;
					case 0:
						that._share(0);
						break;
					case 1:
						// 分享朋友圈
						that._share(1);
						// that._downAll(()=>{
						// 	that.errMsg =  '已下载商品组图,赶紧去分享吧'
						// 	that.$refs.resultModal._showDialog()
						// })
						break;
					default:
						break;
				}
			},
			_share(tapIndex) {
				let that = this;
				plus.nativeUI.showWaiting();
				setTimeout(() => {
					plus.nativeUI.closeWaiting();
				}, 1500);
				uni.share({
					provider: that.providerList[tapIndex].id,
					scene: that.providerList[tapIndex].type && that.providerList[tapIndex].type == 'WXSenceTimeline' ?
						'WXSenceTimeline' : 'WXSceneSession',
					type: 2,
					title: '洁利来',
					summary: '邀您下载酷熊APP，让您淘宝天猫购物省钱',
					imageUrl: that.poster.finalPath,
					href: that.shareUrl,
					success: res => {
						//console.log('success:' + JSON.stringify(res));
						plus.nativeUI.toast('分享成功');
						// that.errMsg = '温馨提示：分享失败，请及时检查微信及洁利来pro相机等权限是否打开，必要时可以卸载重装app，微信重装前切记先做好数据备份，以防丢失，具体可点击右下角问号图标进入新手引导'
						// that.$refs.resultModal._showDialog();
						clipboard.setText('');
					},
					fail: e => {
						// plus.nativeUI.closeWaiting()
						that.errMsg =
							'温馨提示：分享失败，请及时检查微信及洁利来pro相机等权限是否打开，必要时可以卸载重装app，微信重装前切记先做好数据备份，以防丢失，具体可点击右下角问号图标进入新手引导';
						that.$refs.resultModal._showDialog();
						clipboard.setText('');
					}
				});
			},

			async shareFc() {
				let that = this;
				try {
					const d = await getSharePoster({
						_this: this, //若在组件中使用 必传
						type: 'testShareType',
						formData: {
							//访问接口获取背景图携带自定义数据
						},
						posterCanvasId: this.canvasId, //canvasId
						delayTimeScale: 20, //延时系数
						background: {
							width: that.canvasW * 2,
							height: that.canvasH * 2,
							backgroundColor: '#fff'
						},
						bgScale: 0.5,
						drawArray: ({
							bgObj,
							type,
							bgScale
						}) => {
							const dx = 22;
							const fontSize = bgObj.width * 0.05;
							const lineHeight = bgObj.width * 0.09;
							const price = bgObj.width * 0.1;
							//可直接return数组，也可以return一个promise对象, 但最终resolve一个数组, 这样就可以方便实现后台可控绘制海报

							return new Promise((rs, rj) => {
								rs([

									{
										type: 'image',
										url: that.imgSrc,
										alpha: 1,
										infoCallBack(imageInfo) {
											// let scale = bgObj.width  / imageInfo.height;/*  */
											// console.log(6666,imageInfo,bgObj)
											return {
												roundRectSet: {
													r: 1
												}, // 圆形图片 , 若circleSet与roundRectSet一同设置 优先circleSet设置
												dx: 0,
												dy: 0,
												dWidth: bgObj.width, // 因为设置了圆形图片 所以要乘以2
												dHeight: bgObj.height  - dx
												/* roundRectSet: { // 圆角矩形
														r: imageInfo.width * .1
													} */
											};
										}
									},
									{
										type: 'qrcode',
										text: that.shareUrl,
										correctLevel: 3,
										size: bgObj.width * 0.2,
										dx: dx ,
										dy: bgObj.height - dx - bgObj.width * 0.2,
									},
									{
										type: 'text',
										// fontStyle: 'italic',
										text: that.Title,
										size: fontSize,
										color: '#333',
										alpha: 1,
										textAlign: 'left',
										textBaseline: 'top',
										infoCallBack(textLength) {
											_app.log('index页面的text的infocallback ，textlength:' + textLength);
											return {
												dx:  2*dx + bgObj.width * 0.2,
												dy: bgObj.height  - bgObj.width * 0.2 - dx 
											};
										},
										lineFeed: {
											maxWidth: bgObj.width - dx ,
											lineHeight: lineHeight,
											lineNum: 2,
											dx: -1
										},
										serialNum: 0,
										id: 'tag1' //自定义标识
									},
									{
										type: 'text',
										text: that.ShortTitle,
										// fontWeight: 'bold',
										size: fontSize,
										color: '#333',
										alpha: 1,
										textAlign: 'left',
										textBaseline: 'top',
										serialNum: 1,
										lineFeed: {
											maxWidth: bgObj.width * 3.6,
											lineHeight: lineHeight,
											lineNum: 1,
											dx: -1
										},
										// infoCallBack(textLength) {
										// 	_app.log('index页面的text的infocallback ，textlength:' + textLength);
										// 	return {
										// 		dx: 4 * dx + bgObj.width * 0.2,
										// 		dy: bgObj.height - 2 * dx - bgObj.width * 0.2 * 0.8
										// 	};
										// },
										allInfoCallback({
											//v3.0.1 更新 可以获取drawArray中全部数据
											drawArray
										} = {}) {
											const obj = drawArray.find(item => item.id === 'tag1');
											//也可以return promise对象
											return new Promise((rs, rj) => {
												setTimeout(() => {
													rs({
														// dx: 4 * dx + bgObj.width * 0.2,
														// dy: bgObj.height - 2 * dx - bgObj.width * 0.7,
														dx: 2* dx + bgObj.width * 0.2,
														dy: bgObj.height -  dx - bgObj.width * 0.1 
													});
												}, 1);
											});
										}
									},


								]);
							});
						},

						setCanvasToTempFilePath: () => {
							return {
								destWidth: 900,
								destHeight: 1500
							};
						},
						quality: 1
					});
					// console.log('海报生成成功, 时间:' + new Date() + '， 临时路径: ' + d.poster.tempFilePath);
					// plus.nativeUI.closeWaiting();
					this.poster.finalPath = d.poster.tempFilePath;
					this.canvasPic = d.poster.tempFilePath;
					this.qrShow = true;
				} catch (e) {
					// plus.nativeUI.closeWaiting();
					_app.hideLoading();
					_app.showToast(JSON.stringify(e));
					console.log(JSON.stringify(e));
				}
			},
			saveImage(k) {
				// #ifndef H5
				uni.saveImageToPhotosAlbum({
					filePath: this.poster.finalPath,
					success(res) {
						_app.showToast('保存成功');
					}
				});
				// #endif
				// #ifdef H5
				switch (k) {
					case 1:
						this.$refs.uToast.show({
							title: '长按图片，保存到相册',
							type: 'info'
						})
						break;
					case 2:
						this.$refs.uToast.show({
							title: '长按图片，发送给好友',
							type: 'info'
						})
						break;
					case 3:
						this.$refs.uToast.show({
							title: '长按图片，发送到朋友圈',
							type: 'info'
						})
						break;
					default:
						break;
				}

				// _app.showToast('长按图片保存到本地');
				// #endif
			},
			// 下载 全部图片
			_downAll() {
				if (this.all) {
					plus.nativeUI.toast('你已经下载该组图，请勿重复下载');
					return;
				}
				plus.nativeUI.showWaiting();
				let works = [];
				this.imgs.forEach((item, index) => {
					works.push(this.save(index));
				});
				let that = this;
				Promise.all(works)
					.then(result => {
						console.log(result);
						//['成功了', 'success']
						// plus.nativeUI.toast('下载成功')
						that.errMsg = '已下载商品组图,赶紧去分享吧';
						that.$refs.resultModal._showDialog();
						plus.nativeUI.closeWaiting();
					})
					.catch(error => {
						console.log(error);
						plus.nativeUI.toast('图片丢失');
						plus.nativeUI.closeWaiting();
					});
				this.all = true;
			},
			//保存图片到相册
			save(index) {
				return new Promise(resolve => {
					let that = this;
					uni.saveImageToPhotosAlbum({
						filePath: that.imgs[index],
						success: function() {
							resolve();
						}
					});
				});
			}
		}
	};
</script>

<style scoped lang="scss">
	.pages {
		width: 100vw;
		min-height: calc(100vh - 88rpx);
		overflow: hidden;
		background: #fff;
		position: relative;

		.hideContent {
			width: 100vw;
			height: 100vh;
			position: fixed;
			background: rgba(0, 0, 0, 0.7);
			z-index: 100;
		}

		.contentBox {
			width: 100vw;
			height: calc(100vh - 88rpx - 160rpx);
			overflow: hidden;
			.contentBG{
				width: 100%;
				height: 100vh;
			}
		}
		
		.footer {
			width: 100vw;
			height: 160rpx;
			background-color: #fff;
			padding: 20rpx;
			position: absolute;
			left: 0;
			bottom: 0;

		}

		.hideCanvasView {
			position: fixed;
			// top: 0;
			// left: 0;
			top: -99999rpx;
			left: -99999rpx;
			z-index: -99999;
		}

		.canvasPic {
			border-radius: 28rpx;
			overflow: hidden;
			width: 100%;
			height: 100%;
		}

		.sbtns {
			width: 80rpx;
			height: 80rpx;
			border-radius: 50%;
			
		}

		.sbtns:active {
			transform: translate(1rpx, 1rpx);
		}
		.bgcanvasPic{
			width: 90%;
			border-radius: 20rpx;
			overflow: hidden;
		}
		.sharebgBox{
			width: 100%;
			height: auto;
			// background-size: 100% auto;
			border-radius: 20rpx;
			overflow: hidden;
			// background-repeat: no-repeat;
			
		}
	}
</style>
