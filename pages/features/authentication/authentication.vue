<template>
	<view class="pages">
		<view class="box" :class="(accountInfo.is_prove==1 ||accountInfo.is_prove==3 )?'tex-red':''">
			{{accountInfo.is_prove | proveStatusFilter}}
		</view>
		<view class="title">请填写有效信息</view>
		<InputGrouds :inputsArray="inputsArray" @focusHandle="_focusHandle" :markWord="false" ref="formInputs"></InputGrouds>
		<view class="title">请按照提示，上传有效身份证正反面</view>
		<view style="padding: 0 20rpx;">
			<view class="unploadBtn flex flex_y flex_center" @click="_uploadPic('idcard_front')">
				<view v-if="formParams.idcard_front" class="flex flex_y flex_center" style="width: 100%;height:360rpx;">
					<image :src="formParams.idcard_front" mode="aspectFit" style="width: 100%;height:320rpx;"></image>
					
				</view>
				<view v-else class="flex flex_y flex_center">
					<image src="../../../static/img/sctp@1.5x.png" mode="scaleToFill" class="cover uploadIcons"></image>
					<text>上传有效身份证正面</text>
				</view>
			</view>
			<view class="cm_des cm_tex_c" v-if="formParams.idcard_front" @click="preview('idcard_front')">预览</view>
			<view class="unploadBtn  flex flex_y flex_center" @click="_uploadPic('idcard_back')" >
				<view v-if="formParams.idcard_back"  class="flex flex_y flex_center" style="width: 100%;height:360rpx;">
					<image :src="formParams.idcard_back" mode="aspectFit" style="width: 100%;height: 320rpx;"></image>			
				</view>
				<view v-else class="flex flex_y flex_center">
					<image src="../../../static/img/sctp@1.5x.png" mode="scaleToFill" class="cover uploadIcons"></image>
					<text>上传有效身份证反面</text>
				</view>
			</view>
			<view class="cm_des cm_tex_c" v-if="formParams.idcard_back"  @click="preview('idcard_back')">预览</view>
			
		</view>
		
		<view style="padding:72rpx 30rpx;" >
			<tui-button type="primary" shape="circle" :disabled="disabled" :loading="false" @tap="bindSubmit">提交认证</tui-button>		
		</view>
	</view>
</template>

<script>
import InputGrouds from '@/components/InputGrouds/InputGrouds.vue';
import http from '@/utils/http/index.js';
export default {
	data() {
		return {
			formParams: {
				"consumer_name": "",
				    "idcard": "",
				    "idcard_back": "",
				    "idcard_front": "",
				    "vilidate": "",
			},
			inputsArray: [
				// 用户真实姓名
				{
					type: 'text',
					id: 'consumer_name',
					// iconPic: '../../static/img/zc_icon_sj.png',
					placeholder: '请输入真实姓名',
					labelText: '真实姓名',
					readOnly: true
				},
				// 用户身份证号
				{
					type: 'idCard',
					id: 'idcard',
					// iconPic: '../../static/img/zc_icon_yzm.png',
					buttonStyle: 'block',
					labelText: '身份证号',
					placeholder: '请输入身份证号'
				},
				// 用户手机号码
				{
					type: 'phone',
					id: 'mobile',
					defaultValue: '',
					// iconPic: '../../static/img/zc_icon_sj.png',
					labelText: '手机号',
					placeholder: '请输入您的手机号',
					readOnly: true
				},
				// 用户验证码
				{
					type: 'verify',
					id: 'vilidate',
					relevantId: 'mobile',
					// iconPic: '../../static/img/zc_icon_yzm.png',
					labelText: '验证码',
					codeType: 4,
					buttonStyle: 'block',
					placeholder: '请输入短信验证码'
				}
			],
			disabled:false
		};
	},
	filters:{
		authFilter(val){
			val = parseInt(val)
			switch (val){
				case 3:
				return '未通过'
					break;
				case 2:
				return '已认证'
					break;
				case 1:
				return '审核中'
					break;
				default:
				return '未认证'
					break;
			}
		}
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
			console.log(222,this.accountInfo)
		this.inputsArray[0].defaultValue = this.accountInfo.consumer_name?this.accountInfo.consumer_name:'';
		this.inputsArray[1].defaultValue = this.accountInfo.idcard?this.accountInfo.idcard:'';
		this.inputsArray[2].defaultValue = this.accountInfo.consumer_mobile?this.accountInfo.consumer_mobile:this.$store.state.accountInfo.consumer_mobile;
		this.formParams = {
			idcard_front: this.accountInfo.idcard_front ? this.accountInfo.idcard_front : '',
			idcard_back: this.accountInfo.idcard_back ? this.accountInfo.idcard_back : ''
		};
		// alert(this.accountInfo.is_prove)
		if(this.accountInfo.is_prove==3 ||this.accountInfo.is_prove==1){
			this.disabled = true
		}
	},
	methods: {
		_focusHandle() {},
		// 预览
		preview(val){
			// let urls = [this.formParams.report_img]
			if(!val)return;
			uni.previewImage({
			            urls: [this.formParams[val]],
			            longPressActions: {
			                itemList: ['发送给朋友', '保存图片', '收藏'],
			                success: function(data) {
			                    console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
			                },
			                fail: function(err) {
			                    console.log(err.errMsg);
			                }
			            }
			        });
		},
		// 上传图片
		_uploadPic(val) {
			// console.log(http.baseUrl);
			if(this.accountInfo.is_prove==2 ||this.accountInfo.is_prove==1){
				// this.preview(this.formParams[val] )			
				return
			}
			// 选择图片
			let that = this;
			uni.chooseImage({
				success: chooseImageRes => {
					this.$ui.showloading();
					const uploadTask = uni.uploadFile({
						url: http.baseUrl + '/api/Upload/UploadImg?folder=auth',
						name: 'folder',
						filePath: chooseImageRes.tempFilePaths[0],
						formData: {},
						header: {},
						success: uploadFileRes => {
							this.$ui.hideloading();
							that.$ui.toast('上传成功')
							// console.log(JSON.parse(uploadFileres.data).Data);
							let src = JSON.parse(uploadFileres.data).Data;
							if (src) {
								that.formParams[val] = src;
							}
						},
						fail: err => {
							this.$ui.hideloading();
						}
					});
					uploadTask.onProgressUpdate(res => {
						this.$emit('on-process', res);
					});
				}
			});
		},
		// 提交表单
		async bindSubmit() {
			let that = this;
			if(!this.formParams.idcard_front ||!this.formParams.idcard_back ){
				
				this.$ui.toast('请上传身份证正反面')
				return;
			}
									
			let r = this.$refs.formInputs.verify();
	
			
			if (r.status) {
				let data = r.data;
				// consumer_full_name:'',
				// consumer_identity_code:'',
				this.formParams.consumer_name = data.consumer_name;
				this.formParams.idcard = data.idcard;
				this.formParams.vilidate = data.vilidate;
				// console.log(555,this.formParams)
					
				try {
					this.$ui.showloading();
					let res = await this.$api.SubmitProve(this.formParams, true);
					// console.log(res)
					this.$ui.hideloading();
					if (res.result==1) {
						uni.$emit('refresh_user');
			
						that.$ui.toast('提交成功')
						setTimeout(() => {
							uni.navigateBack({});
						}, 1000);
					} else {
						that.$ui.toast(res.msg)
					}
					// console.log( '请求结果success : ' + JSON.stringify(res))
				} catch (err) {
					console.log('请求结果false : ' + err);
				}
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.pages {
	.box{
		font-size: 40rpx;
		text-align: center;
		padding: 40rpx 0;
		background: #fff;
		color:#666;
		font-weight: 600;
		margin-top: 16rpx;
		&.text-red{
			color:red
		}
		
	}
	.title {
		// margin-top: 32rpx;
		// margin-bottom: 24rpx;
		font-weight: 600;
		padding: 24rpx 20rpx;
	}
	.unploadBtn {
		width: 100%;
		height: 320rpx;
		border-radius: 16rpx;
		background: #fff;
		margin-bottom: 16rpx;
		.uploadIcons {
			width: 140rpx;
			height: 140rpx;
			// border-radius: 70rpx;
			background: #fff;
			margin-bottom: 24rpx;
		}
	}
}
</style>
