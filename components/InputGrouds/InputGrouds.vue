<!-- 
	type: 'text', //输入框类型
	label: '', //title文字提示
	required: false, //是否必填
	id: 'demo', //id
	relevantId: '', //关联id 单使用验证码 和 两次密码是有效
	ifArrow: true,
	classfy: '', //默认的验证码方式
	errMsg: '错误', //错误提示消息
	icon: 'icon-yanzhengma', //图标名
	iconColor: '#333', //图标颜色
	rule: '', //正则验证规则
	placeholder: '', //空值 提示
	defaulPass: true, //密码框是否首先密文显示
	defaultValue: '', //初始默认值
	arg: {}, //额外参数
	labelText:'示例',
	readyOnly:false , //是否只读
	buttonStyle:'plain', //对应绑定的值 
	background:#ffffff""
	=================
	
	总设置
	edge  是否有20边距 默认： true
	
-->

<template>
	<view class="main">
		<block v-for="(item,index) in xhInputsArray" :key="index">
			<!-- text 正常文本框 -->
			<view class="flex xh_inputBox " v-if="item.type=='text'" :class="[formPamas[item.id].status=='error'?'errorMark':'',edge?'edge':'',item.last?'':'nolast']"
			 :style="{background:item.background}">
				<view class="xh_label_Box flex flex_center">
					<image v-if="item.iconPic" :src="item.iconPic" mode="widthFix" class="xh_icon"></image>
					<text v-else :style="{'width':labelWidth+'rpx'}"  >{{item.labelText}}</text>
					<!-- <text class="isRequire" v-show="item.required">*</text> -->
				</view>
				<view class="f1 " :class="item.last?'':'bd'">
					<input type="text" @focus="_focusHandle" class="xh_input" :disabled="item.readyOnly" v-model="formPamas[item.id].value"
					 :placeholder="item.placeholder?item.placeholder:'请输入示例文字文案'" />
					<!-- <text v-if="markWord" class="helptext" :style="{color:formPamas[item.id].status=='error'?'red':'#999'}">{{formPamas[item.id].status=='error'?item.errMsg:'格式提示文本示例'}}</text> -->
				</view>
			</view>
			<!-- phone 用户电话号码 -->
			<view class="flex xh_inputBox " v-if="item.type=='phone'" :class="[formPamas[item.id].status=='error'?'errorMark':'',edge?'edge':'',item.last?'':'nolast']"
			 :style="{background:item.background}">
				<view class="xh_label_Box flex flex_center">
					<!-- <text class="xh_icon iconfont " :class="item.icon?item.icon:''"  :style="{color:item.iconColor}"></text> -->
					<image v-if="item.iconPic" :src="item.iconPic" mode="widthFix" class="xh_icon"></image>
					<text v-else :style="{'width':labelWidth+'rpx'}">{{item.labelText}}</text>
				</view>
				<view class="f1 ">
					<input type="number" :disabled="item.readOnly?true:false" @focus="_focusHandle" class="xh_input" v-model="formPamas[item.id].value"
					 :placeholder="item.placeholder?item.placeholder:'请输入用户的手机号码'" />
					<!-- <text v-if="markWord" class="helptext" :style="{color:formPamas[item.id].status=='error'?'red':'#999'}">{{formPamas[item.id].status=='error'?item.errMsg:'手机号为1开头的有效的11位数字组成'}}</text> -->
				</view>
			</view>

			<!-- password 用户密码-->
			<view class="flex xh_inputBox " v-if="item.type=='password'" :class="[formPamas[item.id].status=='error'?'errorMark':'',edge?'edge':'',item.last?'':'nolast']"
			 :style="{background:item.background}">
				<view class="xh_label_Box flex flex_center">
					<image v-if="item.iconPic" :src="item.iconPic" mode="widthFix" class="xh_icon"></image>
					<text v-else :style="{'width':labelWidth+'rpx'}">{{item.labelText}}</text>
				</view>
				<view class="f1">
					<input type="password" @focus="_focusHandle" class="xh_input" v-model="formPamas[item.id].value" v-show="item.defaulPass"
					 :placeholder="item.placeholder?item.placeholder:'请输入用户密码'" />
					<input type="text" @focus="_focusHandle" class="xh_input" v-model="formPamas[item.id].value" v-show="!item.defaulPass"
					 :placeholder="item.placeholder?item.placeholder:'请输入用户密码'">
					<!-- <text v-if="markWord" class="helptext" :style="{color:formPamas[item.id].status=='error'?'red':'#999'}">{{formPamas[item.id].status=='error'?item.errMsg:'密码至少为6位数'}}</text> -->
				</view>
				<view class="xh_label_Box flex flex_center ">
					<img src="../../static/img/inpus/bukejian.png" mode="scaleToFill" v-show="item.defaulPass" @tap="_switch(item)"
					 style="width:40rpx;height: 40rpx;"></img>
					<img src="../../static/img/inpus/kejian.png" mode="scaleToFill" v-show="!item.defaulPass" @tap="_switch(item)"
					 style="width: 40rpx;height: 40rpx;"></img>
				</view>
			</view>

			<!--verify 验证码 -->
			<view class="flex xh_inputBox " v-if="item.type=='verify'" :class="[formPamas[item.id].status=='error'?'errorMark':'',edge?'edge':'',item.last?'':'nolast']"
			 :style="{background:item.background}">
				<view class="xh_label_Box flex flex_center">
					<image v-if="item.iconPic" :src="item.iconPic" mode="widthFix" class="xh_icon"></image>
					<text v-else :style="{'width':labelWidth+'rpx'}">{{item.labelText}}</text>
				</view>
				<view class="f1">
					<input type="number" @focus="_focusHandle" class="xh_input" v-model="formPamas[item.id].value" :placeholder="item.placeholder?item.placeholder:'请输入验证码'" />
					<!-- <text v-if="markWord" class="helptext" :style="{color:formPamas[item.id].status=='error'?'red':'#999'}">{{formPamas[item.id].status=='error'?item.errMsg:'验证码为6位字母和数字组合'}}</text> -->
				</view>
				<view class="xh_label_Box flex flex_center " hover-class="cm_hover" @tap="_getVerifyCode(item.relevantId,item.codeType)">
					<text :class="item.buttonStyle=='block'?'yzmBtnBlock':'yzmBtn'">{{seconds>0?seconds+'s':'发送验证码'}}</text>
				</view>
			</view>

			<!-- 两次密码验证 -->
			<view class="flex xh_inputBox " v-if="item.type=='repass'" :class="[formPamas[item.id].status=='error'?'errorMark':'',edge?'edge':'',item.last?'':'nolast']"
			 :style="{background:item.background}">
				<view class="xh_label_Box flex flex_center">
					<image v-if="item.iconPic" :src="item.iconPic" mode="widthFix" class="xh_icon"></image>
					<text v-else :style="{'width':labelWidth+'rpx'}">{{item.labelText}}</text>
				</view>
				<view class="f1">
					<input type="password" @focus="_focusHandle" class="xh_input" v-model="formPamas[item.id].value" v-show="item.defaulPass"
					 :placeholder="item.placeholder?item.placeholder:'请输再次入用户密码'" />
					<input type="text" @focus="_focusHandle" class="xh_input" v-model="formPamas[item.id].value" v-show="!item.defaulPass"
					 :placeholder="item.placeholder?item.placeholder:'请输再次入用户密码'">
					<!-- <text v-if="markWord" class="helptext" :style="{color:formPamas[item.id].status=='error'?'red':'#999'}">{{formPamas[item.id].status=='error'?item.errMsg:'密码至少为6位数,两次密码必须一致'}}</text> -->
				</view>
				<view class="xh_label_Box flex flex_center ">
					<text class="label iconfont icon-bukejian" v-show="item.defaulPass" @tap="_switch(item)"></text>
					<text class="label iconfont icon-visible-solid" v-show="!item.defaulPass" @tap="_switch(item)"></text>
				</view>
			</view>

			<!-- 银行卡验证 -->
			<view class="flex xh_inputBox " v-if="item.type=='bankCard'" :class="[formPamas[item.id].status=='error'?'errorMark':'',edge?'edge':'',item.last?'':'nolast']"
			 :style="{background:item.background}">
				<view class="xh_label_Box flex flex_center">
					<image v-if="item.iconPic" :src="item.iconPic" mode="widthFix" class="xh_icon"></image>
					<text v-else :style="{'width':labelWidth+'rpx'}">{{item.labelText}}</text>
				</view>
				<view class="f1">
					<input type="number" @focus="_focusHandle" class="xh_input" v-model="formPamas[item.id].value" :placeholder="item.placeholder?item.placeholder:'请输入真实的银行卡号'" />
					<!-- <text v-if="markWord" class="helptext" :style="{color:formPamas[item.id].status=='error'?'red':'#999'}">{{formPamas[item.id].status=='error'?item.errMsg:'银行卡号为16或者19为数字组成'}}</text> -->
				</view>
			</view>

			<!-- 邮箱号码 -->
			<view class="flex xh_inputBox " v-if="item.type=='eMail'" :class="[formPamas[item.id].status=='error'?'errorMark':'',edge?'edge':'',item.last?'':'nolast']"
			 :style="{background:item.background}">
				<view class="xh_label_Box flex flex_center">
					<image v-if="item.iconPic" :src="item.iconPic" mode="widthFix" class="xh_icon"></image>
					<text v-else :style="{'width':labelWidth+'rpx'}">{{item.labelText}}</text>
				</view>
				<view class="f1">
					<input type="text" @focus="_focusHandle" class="xh_input" v-model="formPamas[item.id].value" :placeholder="item.placeholder?item.placeholder:'请输入真实有效的邮箱号码'" />
					<!-- <text v-if="markWord" class="helptext" :style="{color:formPamas[item.id].status=='error'?'red':'#999'}">{{formPamas[item.id].status=='error'?item.errMsg:'例：xhdemo@xhdemo.com。'}}</text> -->
				</view>
			</view>

			<!-- 身份证 -->
			<view class="flex xh_inputBox " v-if="item.type=='idCard'" :class="[formPamas[item.id].status=='error'?'errorMark':'',edge?'edge':'',item.last?'':'nolast']"
			 :style="{background:item.background}">
				<view class="xh_label_Box flex flex_center">
					<image v-if="item.iconPic" :src="item.iconPic" mode="widthFix" class="xh_icon"></image>
					<text v-else :style="{'width':labelWidth+'rpx'}">{{item.labelText}}</text>
				</view>
				<view class="f1">
					<input type="idcard" @focus="_focusHandle" class="xh_input" v-model="formPamas[item.id].value" :placeholder="item.placeholder?item.placeholder:'请输入真实有效的身份证号码'" />
					<!-- <text v-if="markWord" class="helptext" :style="{color:formPamas[item.id].status=='error'?'red':'#999'}">{{formPamas[item.id].status=='error'?item.errMsg:'有效身份证为18位'}}</text> -->
				</view>
			</view>

			<!-- 分割 -->
			<view v-if="item.type=='blank'" class="blank" :style="{background:item.background?item.background:'#f8f8f8'}"></view>

		</block>
	</view>
</template>

<script>
	import Utils from './js/utils.js'
	import defaultInputs from './js/defaultInputs.js'
	export default {
		props: {
			inputsArray: {
				type: Array,
				default () {
					return []
				}
			},
			labelWidth: {
				type: Number,
				default: 120
			},
			edge: {
				type: Boolean,
				default: true
			},

		},
		 watch:{
			 inputsArray(){
				 this.init()
			 }
		 },
		created() {

			// console.log(this.inputsArray) 
			this.init()
		},
		data() {
			return {
				xhInputsArray: [],
				// 默认表达参数
				defaultArg: {
					type: 'text', //输入框类型
					label: '', //title文字提示
					required: false, //是否必填
					id: 'demo', //id
					relevantId: '', //关联id   单使用验证码 和 两次密码是有效
					ifArrow: true,
					classfy: '', //默认的验证码方式
					errMsg: '错误', //错误提示消息
					icon: 'icon-yanzhengma', //图标名
					iconColor: '#333', //图标颜色
					rule: '', //正则验证规则
					placeholder: '', //空值 提示
					defaulPass: true, //密码框是否首先密文显示 
					defaultValue: '', //初始默认值
					arg: {}, //额外参数
					labelText: '示例',
					readyOnly: false, //是否只读
					buttonStyle: 'plain', //对应绑定的值
					background: "#ffffff",
					last:false
				},
				defaultInputs: defaultInputs,
				formPamas: {
					// username:{
					// 	value:'',
					// 	status:'normal'						
					// }
				},
				seconds: 0,
				effective: false, //是否在有效的倒计时范围内:
		
			};
		},
		methods: {
			_focusHandle(){},
			_switch(item) {
				item.defaulPass = !item.defaulPass
			},
			init() {
				let arr = []
				let obj = {}
				this.inputsArray.forEach(item => {
					let {
						type,
						id
					} = item;

					if (defaultInputs[type]) {
						arr.push({ ...this.defaultArg,
							...defaultInputs[type],
							...item
						})
					} else {
						arr.push({ ...this.defaultArg,
							...item
						})
					}
					obj[item.id] = {
						value: item.defaultValue ? item.defaultValue :'',
						type: item.type,
						status: 'normal'
					}
				})
				this.xhInputsArray = arr
				this.formPamas = obj
				// console.log(arr)
				// console.log(obj)
			},
			// 开始校验
			verify() {
				let res = this.xhInputsArray.every(item => {
					let {
						id,
						required,
						rule,
						type,
						relevantId
					} = item
					if (required) {
						if (!this.formPamas[id].value.length) {
							this.formPamas[item.id].status = 'error'
							uni.showToast({
								icon: 'none',
								title: '请输入必填项'
							})
							return false
						} else if (type == 'repass') {
							// 特殊类型判断
							switch (type) {
								case 'repass':
									if (this.formPamas[id].value != this.formPamas[relevantId].value) {
										this.formPamas[id].status = 'error'
										return false
									} else {
										this.formPamas[item.id].status == 'error' ? this.formPamas[item.id].status = 'normal' : null
										return true
									}
									break;
								default:
									break;
							}
						} else if (rule) {
							let s = rule
							let reg = new RegExp(s)
							const r = reg.test(this.formPamas[id].value);
							if (!r) {
								this.formPamas[item.id].status = 'error'
								uni.showToast({
									icon: 'none',
									title: item.errMsg
								})
								return false
							} else {
								this.formPamas[item.id].status == 'error' ? this.formPamas[item.id].status = 'normal' : null
								return true
							}
						} else {
							return true
						}
					} else {
						return true
					}
				})
				return this.buildResult(res)
			},
			// 构建返回参数
			buildResult(res) {
				if (res) {
					let data = {}
					// console.log(this.xhInputsArray)
					this.xhInputsArray.forEach(item => {
						data[item.id] = this.formPamas[item.id].value
					})
					// console.log("res: " + JSON.stringify(data));
					return {
						status: true,
						data: data
					}
				} else {
					return {
						status: false,
						data: {}
					}
				}
			},
			// 获取验证码
			async _getVerifyCode(relevantId, type) {
				if (!relevantId) return;
				if (this.effective) return;
				// console.log(relevantId);
				let that = this
				if (!Utils.phoneCheck(this.formPamas[relevantId].value)) {
					this.formPamas[relevantId].status = 'error';
					uni.showToast({
						icon: 'none',
						title: '请输入正确的手机号码'
					})
					return
				} else {
					this.formPamas[relevantId].status = 'normal';

					let data = {
						mobile: this.formPamas[relevantId].value,
						type: type
					}
					let that = this
					// api操作

					try {
						let res = await this.$api.getVerificateCode(data, true)
						if (res.result==1) {
							uni.showToast({
								icon:'none',
								title: '已发送至' + this.formPamas[relevantId].value,
							})
							
							that._time()
						} else {
							uni.showToast({
								icon:'none',
								title: '发送失败',
							})
						}
						console.log('请求结果success : ' + JSON.stringify(res))
					} catch (err) {
						console.log('请求结果false : ' + err)
					}

				}
				// 模拟api操作发送验证码

			},
			// 验证码计时
			_time() {
				this.effective = true;
				this.seconds = 60;
				let time = setInterval(() => {
					this.seconds -= 1;
					if (this.seconds == 0) {
						this.effective = false;
						clearInterval(time)
					}
				}, 1000)
			}

		}
	}
</script>

<style lang="scss" scoped>
	.main {

		// background: red;
		.xh_inputBox {
			min-height: 88rpx;
			position: relative;
			// margin-top: 20rpx;
			align-items: center;


			.xh_label_Box {
				height: 88rpx;
				// line-height: 100rpx;
				position: relative;

				.isRequire {
					z-index: 10;
					width: 10rpx;
					height: 10rpx;
					line-height: 10rpx;
					position: absolute;
					left: -12rpx;
					top: 20rpx;
					color: red;
					border-radius: 50%;
					// background: red
				}
			}

			.xh_input {
				// background: green;
				line-height: 80rpx;
				height: 80rpx;
				position: relative;
				transition: all .2s ease;
			}

			.xh_icon {
				width: 40rpx;
				height: 40rpx;
				// background: pink;
				font-size: 28rpx;
				margin-right: 30rpx
			}

			.xh_label {
				font-size: 28rpx;
				margin: 0 30rpx
			}

			.helptext {
				width: 100%;
				line-height: 20rpx;
				font-size: 20rpx;
				color: #999
			}

			.yzmBtn {
				margin-left: 10rpx;
				padding: 0 20rpx;
				// background:  var(--cl_primary);
				color: var(--cl_primary);
				border-radius: 12rpx;
				line-height: 58rpx
			}

			.yzmBtnBlock {
				height: 56rpx;
				height: 56rpx;
				padding: 0 20rpx;
				border-radius: 28rpx;
				background: var(--cl_primary);
				color: #fff;
				font-size: 24rpx;
				line-height: 56rpx
			}
		}
		// background: red;
		.nolast::after {
			content: '';
			position: absolute;
			bottom: 0;
			left: 0;
			height: 1rpx;
			transform: scaleY(.6);
			width: 100%;
			transition: all .2s ease;
			background: #ededed
		}
		.errorMark {
			&::after {
				content: '';
				position: absolute;
				bottom: 0;
				left: 0;
				height: 2rpx;
				transform: scaleY(.5);
				width: 100%;
				transition: all .2s ease;
				background: red;
			}
		}

		.blank {
			width: 100%;
			height: 16rpx;
		}

		.edge {
			padding: 0 20rpx;
		}
	}
</style>
