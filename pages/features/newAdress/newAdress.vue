<template>
	<view class="pages">
		<view class="box">
			<view class="formBox">
				<tui-list-cell :hover="false">
					<view class="tui-line-cell flex flex_center">
						<view class="tui-title">收货人</view>
						<input placeholder-class="phcolor" class="tui-input f1" v-model="formParams.receiving_user" name="receiving_user"
						 placeholder="请输入姓名" maxlength="50" type="text" />
					</view>
				</tui-list-cell>
				<tui-list-cell :hover="false">
					<view class="tui-line-cell flex flex_center">
						<view class="tui-title">收货人手机号</view>
						<input placeholder-class="phcolor" class="tui-input f1" v-model="formParams.receiving_mobile" name="receiving_mobile"
						 placeholder="请输入手机号" maxlength="50" type="number" />
					</view>
				</tui-list-cell>
			</view>

			<view class="formBox">
				<tui-list-cell :hover="false">
					<view class="tui-title">地址信息：</view>
				</tui-list-cell>
				<tui-list-cell :hover="false">
					<view class="tui-line-cell flex flex_center" @tap="showPicker">
						<view class="f1 flex flex_center">
							<text class="text  ">{{text[0]?text[0]:'请选择'}}</text>
							<!-- <image src="../../static/images/index/icon_right.png" class="img30 pdr20"></image> -->
							<tui-icon name="arrowright" :size="16"></tui-icon>
						</view>
						<view class="f1 flex flex_center">
							<text class="text  ">{{text[1]?text[1]:'请选择'}}</text>
							<tui-icon name="arrowright" :size="16"></tui-icon>
						</view>
						<view class="f1 flex flex_center">
							<text class="text ">{{text[2]?text[2]:'请选择'}}</text>
							<tui-icon name="arrowright" :size="16"></tui-icon>
						</view>
					</view>
				</tui-list-cell>
				<tui-list-cell :hover="false">
					<view class="tui-line-cell ">

						<!-- <input placeholder-class="phcolor" class="tui-input" name="mobile" placeholder="请输入手机号" maxlength="50" type="text" /> -->
						<textarea v-model="addressDetail" placeholder="请输入详细地址" />
						</view>
				</tui-list-cell>
			</view>

			<view style="margin-top: 72rpx;padding: 0 20rpx;">
				<tui-button type="primary" shape="circle" :loading="loading" @tap="_save">保存</tui-button>
			</view>
		</view>
		<view class="tui-mask-screen" :class="[showPickerStatus?'tui-mask-show':'']" @tap="hidePicker"></view>
		<view class="tui-picker-box" :class="[showPickerStatus?'tui-pickerbox-show':'']">
			<view class="picker-header list-item">
				<view class="btn-cancle" hover-class="opcity" :hover-stay-time="150" @tap.stop="hidePicker">取消</view>
				<view class="btn-sure" hover-class="opcity" :hover-stay-time="150" @tap.stop="picker">确定</view>
			</view>
			<picker-view indicator-style="height: 50px;" class="picker-view" :value="value" @change="columnPicker">
				<picker-view-column>
					<view v-for="(item,index) in proviceArr" :key="index" class="item">{{item}}</view>
				</picker-view-column>
				<picker-view-column>
					<view v-for="(item,index) in cityArr" :key="index" class="item">{{item}}</view>
				</picker-view-column>
				<picker-view-column>
					<view v-for="(item,index) in districtArr" :key="index" class="item">{{item}}</view>
				</picker-view-column>
			</picker-view>
		</view>
		<!--picker-view end-->
	</view>
</template>

<script>
	import cityData from '@/utils/picker.city.js'
	// console.log(cityData)
	import graceChecker from "@/js_sdk/graceui-dataChecker/graceChecker.js"
	import tuiListCell from "@/components/list-cell/list-cell"
	import {
		mapState
	} from 'vuex';
	export default {
		data() {
			return {
				proviceArr: [],
				cityArr: [],
				districtArr: [],
				value: [0, 0, 0],
				iconHidden: true,
				showPickerStatus: false,
				text: ["福建省", "福州市", "鼓楼区"],
				searchKey: "",
				formParams:{
					"area": "350102",
					"receiving_user": "",
					"receiving_mobile": "",
					"detailed_address": "",
					"type":0
				},
				formParamsRule :[
				   // { name: "goods_title", checkType: "string", checkRule: "1,", errorMsg: "请填写商品名称" },
				    { name: "receiving_user", checkType: "string", checkRule: "1,", errorMsg: "请填写收货人姓名" },
				  
					 { name: "area", checkType: "string", checkRule: "1,", errorMsg: "请选择地址" },
				    { name: "detailed_address", checkType: "string", checkRule: "1,", errorMsg: "请填写详细地址" },
					  { name: "receiving_mobile", checkType: "phoneno",checkRule: "1,", errorMsg: "请输入正确收货人手机号"},
				],
				loading:false,
				action:'',
				addressDetail:''  //详细地址
			}
		},
		onLoad: function(options) {
			let type = options.type;
			if (type == 'switch') {
				// 确认拍品选择地址
				this.action = 'switch'
			}
			
			//初始化数据
			this.proviceArr = this.toArr(cityData);
			this.cityArr = this.toArr(cityData[0].children);
			this.districtArr = this.toArr(cityData[0].children[0].children)
			
			// this.addressDetail = this.text.join(',')
			
			// 350001
		},
		components: {
			tuiListCell
		},
		methods: {
			toArr(object) {
				let arr = [];
				for (let i in object) {
					arr.push(object[i].name);
				}
				return arr;
			},
			//picker change切换事件
			columnPicker: function(e) {
				let value = e.detail.value;
				
				//如果两者下标不一致，表示滚动过
				if (this.value[0] !== value[0]) {
					this.proviceArr = this.proviceArr;
					this.cityArr = this.toArr(cityData[value[0]].children);
					this.districtArr = this.toArr(cityData[value[0]].children[0].children);
					this.value = [value[0], 0, 0]
				} else if (this.value[1] !== value[1]) {
					this.proviceArr = this.proviceArr;
					this.cityArr = this.cityArr;
					this.districtArr = this.toArr(cityData[value[0]].children[value[1]].children);
					this.value = [value[0], value[1], 0]
				} else {
					this.value = value
				}
				
				
				
			},
			//确定按钮
			picker: function(e) {
				let value = this.value;
				if (cityData.length > 0) {
					let provice = cityData[value[0]].name;
					let city = cityData[value[0]].children[value[1]].name;
					let district = cityData[value[0]].children[value[1]].children[value[2]].name;
					this.text = [provice, city, district];
					console.log(cityData[value[0]].children[value[1]].children[value[2]])
					let  area = cityData[value[0]].children[value[1]].children[value[2]].id
					 // console.log(area)
					
					this.formParams.area = area
					this.addressDetail = ''
					this.showPickerStatus = false
				}
				// console.log(111,value)
			},
			// 显示picker-view
			showPicker: function() {
				this.showPickerStatus = true
			},
			// 隐藏picker-view
			hidePicker: function() {
				this.showPickerStatus = false
			},
			
	
			// 保存
			_save(){
				let  that = this;
				this.formParams.detailed_address = this.addressDetail
				let checkRes = graceChecker.check(this.formParams, this.formParamsRule);
				// alert(this.addressDetail)
				
				// console.log(this.formParams)
				// return 
				if(checkRes){
					  this._createAdress()
				 }else{
					  this.$ui.toast(graceChecker.error)
				  }	
			},
			// 新建地址
			async _createAdress(){
				let  that = this;
				let form = {...this.formParams}
				if(form.detailed_address.indexOf('省')<0 || form.detailed_address.indexOf('市')<0 ){
					form.detailed_address = `${this.text.join(',')}  ${form.detailed_address}`
				}
				
				
				try {
					this.loading = true
					let res = await this.$api.addAddress(form, false); 
					this.loading = false
					if (res.result==1) {
						
							
						that.$ui.toast('新建地址成功')
						
						// alert(that.action)	
						if(that.action=='switch'){
							// alert(1)
							// uni.$emit('refresh_addressList')
						}else{
							uni.$emit('refresh_address')
						}
						// uni.$emit('refresh_addressList')	
						setTimeout(()=>{
							uni.navigateBack({})
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
	}
</script>

<style lang="scss" scoped>
	.pages {
		.box {
			width: 100%;
			
			.formBox {
				width: 100%;
				background: #fff;
				margin-top: 20rpx;
				.tui-line-cell{
					width: 100%;
				}
				.tui-title {
					width: 200rpx;
					margin-right: 20rpx;
					text-align: left;
				}
			}
		}



	}

	.tui-mask-screen {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.6);
		z-index: 99996;
		transition: all 0.3s ease-in-out;
		opacity: 0;
		visibility: hidden;
	}

	.tui-mask-show {
		opacity: 1;
		visibility: visible;
	}

	.tui-picker-box {
		width: 100%;
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 99999;
		visibility: hidden;
		transform: translate3d(0, 100%, 0);
		transform-origin: center;
		transition: all 0.3s ease-in-out;
		min-height: 20rpx;
		background: #fff;
	}

	.tui-pickerbox-show {
		transform: translate3d(0, 0, 0);
		visibility: visible;
	}

	.picker-header {
		width: 100%;
		height: 90rpx;
		padding: 0 46rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		box-sizing: border-box;
		font-size: 32rpx;
		background: #fff;
	}

	.list-item::after {
		left: 0;
	}

	.btn-cancle {
		padding: 20rpx;
		color: #888;
	}

	.btn-sure {
		padding: 20rpx;
		color: #5677fc;
	}

	.picker-view {
		width: 100%;
		height: 260px;
	}

	.item {
		line-height: 50px;
		text-align: center;
	}

	/* picker end*/
</style>
