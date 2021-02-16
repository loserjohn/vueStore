<template>
	<view class="pages">

		<view class="box">
			<block v-for="(item,index) in encryptBankList" :key="index">
				<tui-swipe-action :actions="actions" class="lists" @click="handlerButton" :params="item">
					<template v-slot:content>
						<view class="cardItems flex flex_center">
							<!-- <image :src="'../../static/images/news/'+item.img+'.jpg'" class="item-img"></image> -->
							<view class="leftBar flex flex_center" @tap="__default(item.bank_code)">

								<image v-if="item.status==1" src="../../../static/img/wl_xz.png" mode="scaleToFill" style="width: 32rpx;height: 32rpx;"></image>
								<!-- <image src="../../../static/img/wl_xz.png" mode="scaleToFill" style="width: 32rpx;height: 32rpx;"></image> -->
								<text v-else class="noDefault"></text>
							</view>
							<view class="f1 content">
								<view class="cm_title">{{item.bank_user}}</view>
								<view style="line-height: 2;">{{item.open_bank}}</view>
								<view class="cm_text">{{item.bank_num }}</view>
							</view>
							<tui-icon name="arrowleft" color="#333" :size="16"></tui-icon>
						</view>
					</template>
				</tui-swipe-action>
			</block>
			<!-- <view v-if="encryptBankList.length==0" class="cm_tex_c"  style="line-height: 160rpx;">您还没有银行卡</view> -->
			<view v-if="encryptBankList.length==0" class="flex flex_center" style="width: 100%;height: 30vh;padding-top: 30rpx;" >
				<tui-tips :fixed="false" imgUrl="/static/img/toast/k_yhk@1.5x.png">您还没有银行卡</tui-tips>
			</view>
		</view>

		<view style="padding: 30rpx;">
			<navigator url="./newBank/newBank">
				<tui-button type="primary" shape="circle" :disabled="false" :loading="false">
					<view class="flex flex_center cm_title" style="width: 100%;height: 100%;color: #fff;">绑定银行卡 <tui-icon name="plus" color="#fff"
						 :size="16"></tui-icon>
					</view>
				</tui-button>
			</navigator>
		</view>
		<tui-modal :show="modal" @click="handleClick" @cancel="hide" content="确定解绑改银行卡？" :maskClosable="false" color="#333"
		 :size="32"></tui-modal>
	</view>
</template>

<script>
	import Utils from '../../../utils/utils.js'
	import tuiSwipeAction from "@/components/swipe-action/swipe-action"
		import tuiTips from "@/components/extend/tips/tips"
	export default {
		data() {
			return {
				bankList: '',
				actions: [{
					name: '解绑',
					color: '#fff',
					fontsize: 30, //单位rpx
					width: 80, //单位px
					//icon: 'like.png',//此处为图片地址
					background: '#ed3f14'
				}],
				currentCode: '',
				modal: false
			};

		},

		onLoad() {
			// 加载银行卡
			this._getList()
			let that = this
			uni.$on('refresh_bank', function(data) {
				that._getList()
			})
		},
		components: {
			tuiSwipeAction,
			tuiTips
		},
		computed: {
			encryptBankList() {
				let reg = /^(\d{4})\d+(\d{4})$/;
				let arr = []
				if (this.bankList.length > 0) {
					this.bankList.forEach((item) => {
						let obj = { ...item
						}
						let str = item.bank_num;
						let s = str.slice(4, -3)
						str = str.replace(s, '**** **** ****');
						obj.bank_num = str;
						arr.push(obj)
					})
				}
				return arr
			}
		},
		methods: {
			handlerButton(e) {
				let index = e.index;
				let item = e.item;
				// console.log(item)
				this.modal = true
				this.currentCode = item.bank_code
			},
			async _getList() {
				let that = this
				try {
					this.$ui.showloading()
					let res = await this.$api.GetBankList();
					this.$ui.hideloading()
					if (res.result==1) {
						that.bankList = res.data.rows
						// console.log(that.bankList)
					} else {
						that.$ui.toast(res.msg ? res.msg : '银行卡获取失败')
					}
				} catch (err) {
					console.log('请求结果false : ' + err)
				}

			},
			handleClick(e) {
				let index = e.index;
				if (index === 0) {
					// this.tui.toast("你点击了取消按钮")
			
				} else {
					// this.tui.toast("你点击了确定按钮")
					this._delect()
				}
				this.modal = false
			},
			async _delect(callback) {
				let that = this;
				try {
					this.$ui.showloading();	
					
					let data = {
						card_code: this.currentCode
					}
					let res = await this.$api.RelieveBank(data, false);
					this.$ui.hideloading();
					if (res.result==1) {
						that.$ui.toast('解绑成功')
						that.currentCode = ''
						setTimeout(() => {
							that._getList('refresh');
							// that.refresh()
						}, 1000)
					} else {
						that.$ui.toast(res.msg)
					}
					if (callback) callback();
				} catch (err) {
					console.log('请求结果false : ' + err);
				}
			},
			// 默认
			async __default(bankcode) {
				let that = this
				let  data = {
					card_code:bankcode
				}
				try {
					this.$ui.showloading()
					let res = await this.$api.DefaultBank(data);
					this.$ui.hideloading()
					// console.log(JSON.stringify(res))
					if (res.result==1) {
				
						that.$ui.toast('设置成功')
						setTimeout(() => {
							that._getList()
						}, 1000)	
					} else {
						
						that.$ui.toast(res.msg ? res.msg : '设置失败')
					}
				} catch (err) {
					console.log('请求结果false : ' + err)
				}
			}
		},
	}
</script>

<style lang="less" scoped>
	.pages {
		.box {
			padding: 20rpx;

			.lists {
				margin-bottom: 16rpx;
			}

			.cardItems {
				background: #fff;
				padding-right: 20rpx;
				.leftBar {
					width: 92rpx;
					height: 92rpx;

					.noDefault {
						width: 32rpx;
						height: 32rpx;
						border-radius: 50%;
						border: 1rpx solid #999999;
					}
				}

				.rightBar {
					width: 92rpx;
					height: 92rpx;
				}

				.content {
					padding: 34rpx 0;

					.top {
						margin-bottom: 20rpx;
					}

					.cm_des {
						line-height: 1.2;
					}
				}

			}
		}
	}
</style>
