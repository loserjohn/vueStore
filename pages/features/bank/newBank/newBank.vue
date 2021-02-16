<template>
	<view class="pages">
		<view class="title">请填写持卡人信息</view>
		<view class="bankBox">
			<view class="inputBox flex flex_center">
				<view class="label">持卡人</view>
				<input type="text" placeholder="请输入持卡人" name="bank_user" v-model="formParams.bank_user" class="f1" />
				<!-- <image src="../../static/img/down.png" mode="widthFix" style="width: 22rpx;height: 22rpx;margin-left: 20rpx;"></image> -->
			</view>
			
			<view class="inputBox flex flex_center">
				<view class="label">银行卡号</view>
				<input type="number" name="bank_num" placeholder="请输入银行卡号" v-model="formParams.bank_num" class="f1" />
			</view>
			<view class="inputBox flex flex_center">
				<view class="label">所属银行</view>
				<view class="f1">
					<picker @change="bindPickerChange" :value="index" :range="bankList" range-key="text">
						<view class="uni-input ">{{ formParams.open_bank?formParams.open_bank:'请选择开户行' }}</view>
					</picker>
				</view>
				<!-- <image src="../../static/img/down.png" mode="widthFix" style="width: 22rpx;height: 22rpx;margin-left: 20rpx;"></image> -->
				<tui-icon name="arrowright" :size="20" color="#333"  style="margin-left: 20rpx"> </tui-icon>
			</view>
			<view class="inputBox flex flex_center">
				<view class="label">开户行</view>
				<input type="text" name="bank_opening" placeholder="请输入开户行" v-model="formParams.bank_opening" class="f1" />
			</view>
		</view>
		<view style="padding:72rpx 30rpx;">
			<tui-button type="primary" shape="circle" :disabled="false" :loading="loading" @tap="submit">确认添加</tui-button>
		</view>
	</view>
</template>

<script>
	import InputGrouds from '@/components/InputGrouds/InputGrouds.vue';
	import banks from '@/utils/banks.js';
	import graceChecker from "@/js_sdk/graceui-dataChecker/graceChecker.js"
	export default {
		data() {
			return {
				formParams: {
					"bank_user": "",
					"bank_num": "",
					"open_bank": "",
					"vilidate": "000000",
					"bank_opening":''
				},
				bankList: banks,
				index: 0,
				// inputsArray: [
				// 	// 用户手机号码
				// 	{
				// 		type: 'phone',
				// 		id: 'mobile',
				// 		defaultValue: '',
				// 		iconPic: '../../static/img/zc_icon_sj.png',
				// 		placeholder: '请输入您的手机号',
				// 		readOnly: true
				// 	},
				// 	// 用户验证码
				// 	{
				// 		type: 'verify',
				// 		id: 'vilidate',
				// 		relevantId: 'mobile',
				// 		iconPic: '../../static/img/zc_icon_yzm.png',
				// 		codeType: 4,
				// 		buttonStyle: 'block',
				// 		placeholder: '请输入短信验证码'
				// 	}
				// ],
				loading:false
			};
		},
		computed: {
			accountInfo() {
				// console.log(this.$store.state.accountInfo);
				return this.$store.state.accountInfo;
			}
		},
		components: {
			InputGrouds: InputGrouds
		},
		onLoad() {
			
		},
		methods: {
			_focusHandle() {},
			bindPickerChange(e) {
				// console.log(JSON.stringify(e.detail))
				let k = e.target.value;
				this.index = k;
				this.formParams.open_bank = this.bankList[k].text;
				this.formParams.bank_opening = this.bankList[k].text;
			},
			href() {
				uni.navigateTo({
					url: '../exchange/exchange'
				});
			},
			submit() {
				var rule = [{
						name: 'bank_user',
						checkType: 'string',
						checkRule: '1,',
						errorMsg: '请输入开户人姓名'
					},
					{
						name: 'bank_num',
						checkType: 'int',
						checkRule: '15,',
						errorMsg: '请输入有效银行卡号'
					},
					{
						name: 'open_bank',
						checkType: 'string',
						checkRule: '1,',
						errorMsg: '请选择所属'
					},
					{
						name: 'bank_opening',
						checkType: 'string',
						checkRule: '1,',
						errorMsg: '请选择开户行'
					}
				];
				//进行表单检查
				// var formData = e.detail.value;
				let formData = this.formParams;
				let checkRes = graceChecker.check(formData, rule);
				if (checkRes) {
					this._addBank()
				} else {
				
					this.$ui.toast(graceChecker.error)
				}
			},
			// 添加
			async _addBank() {
				let  that = this;
				try {
					this.loading = true
					let res = await this.$api.BuilderBank(this.formParams, false); 
					this.loading = false
					if (res.result==1) {
						that.$ui.toast('绑定成功')
						uni.$emit('refresh_bank')			
						setTimeout(()=>{
							uni.navigateBack({
								
							})
						},1000)
					} else {
						that.$ui.toast(res.msg)
					}
					// if (callback) callback();
				} catch (err) {
					console.log('请求结果false : ' + err);
				}
			}
		}
	};
</script>

<style lang="less" scoped>
	.pages {
		// padding: 20rpx;
		width: 100%;
		min-height: 100vh;
		.title{
			padding: 24rpx 20rpx;
		}
		.bankBox {
			background: #fff;
			padding: 0 20rpx;
			margin-bottom: 16rpx;

			.inputBox {
				line-height: 88rpx;
				height: 88rpx;
				border-bottom: 1rpx solid #e5e5e5;

				&:last-child {
					border-bottom: none;
				}

				.label {
					width: 172rpx;
				}

				.getYZM {
					height: 56rpx;
					height: 56rpx;
					padding: 0 20rpx;
					border-radius: 28rpx;
					background: var(--cl_primary);
					color: #fff;
					font-size: 24rpx;
				}
			}
		}
	}
</style>
