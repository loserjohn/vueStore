<!-- 简单版本 属性使用价格浮动的做法 -->
<template>
	<!--底部抽屉-->
	<view class="mask-screen" @tap="hideModal" @touchmove.stop.prevent="_none" v-show="showModalStatus">
		<view class="region-box animated slideInUp" v-show="showModalStatus" @tap.stop="_none">
			<view class="flex flex_center cm_border_bottom" style="padding-bottom: 20rpx;">
				<image :src="nowPreImg" mode="" class="pre"></image>
				<view class="f1">
					<view class="cm_title">{{ title }}</view>
					<view class="flex flex_center" style="justify-content: flex-start;">
						<block v-for="(its, inds) in optionsText" :key="inds">
								<tui-tag
									shape="circle"
									size="mini"
									type="gray"
									class=" stags"
								>
									{{ its }}
								</tui-tag>
						</block>	
					</view>
					<view class="cm_prize">￥{{ sum }}</view>
				</view>
			</view>
			<view class="argueBox">
				<block v-for="(item, index) in options" :key="index">
					<view class="" style="margin-top:16rpx ;">{{ item.paramsName }}</view>
					<view class=" flex flex_center" style="justify-content: flex-start;">
						<block v-for="(it, ind) in item.list" :key="ind">
							<tui-tag
								shape="circle"
								size="small"
								:plain="formParams[item.paramsKey].text == it.text ? false : true"
								type="danger"
								class="argus flex flex_center"
								data-pro="item.paramsKey"
								data-val="it.text"
								@tap="_chooesOne(item,it)"
							>
								<image v-if="item.showIcon" :src="it.icon" mode="aspectFit" class="icons"></image>
								{{ it.text }}
							</tui-tag>
							<!-- <tui-tag shape="circle" size="small" :plain="false" type="danger" class="argus">{{item.paramsName}}</tui-tag> -->
						</block>
					</view>
				</block>
				<view class=" cells flex flex_center">
					<text>数量:</text>
					<view class="f1"></view>
					<tuiNumberbox :min="1" :value="num" @change="change"></tuiNumberbox>
				</view>
				<!-- <view class="">选择分类:</view>
				<view class=" flex flex_center" style="justify-content: flex-start;">
					<tui-tag shape="circle" size="small" :plain="true" type="danger" class="argus">组件标签</tui-tag>
					<tui-tag shape="circle" size="small" :plain="false" type="danger" class="argus">组件标签</tui-tag>
				</view> -->
			</view>
			<view class="btnBox flex flex_center">
				<button class="btns" @tap.stop="_addCard">加入购物车</button>
				<button class="btns" @tap.stop="_creatOrder" :style="{ background: '#E02E24' }">立即购买</button>
			</view>
		</view>
	</view>
</template>

<script>
import tuiNumberbox from '@/components/numberbox/numberbox';
export default {
	data() {
		return {
			paramsList: [], //
			formParams: {}, //表单参数
			num: 1,
			nowPrize:0,
			showModalStatus: false //显示选
		};
	},
	components: {
		tuiNumberbox
	},
	computed: {
		sum() {
			return this.num * this.nowPrize;
		},
		// 已选的属性
		optionsText(){
			let arr = []
			Object.values(this.formParams).forEach(item=>{
				if(item)arr.push(item.text)
			})
			return arr
		}
	},
	props: {
		preImg: {
			//图片
			Type: String,
			default: ''
		},
		title: {
			//标题
			Type: String,
			default: ''
		},
		prize: {
			//单价
			Type: Number,
			default: 0
		},
		options: {
			//参数选项
			Type: Array,
			default:()=>{
				return [
				{
					paramsName: '颜色', //参数名
					showIcon: true, //是否连同显示小图标
					paramsKey: 'color', //表单字段名
					list: [
						//选项
						{
							value: 0,
							text: '粉红',
							floatPrize: 20, //价格浮动
							icon: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2841648446,236398816&fm=26&gp=0.jpg' //小图标图片
						},
						{
							value: 0,
							text: '天空蓝',
							floatPrize: 0,
							icon:
								'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584610581049&di=0feb46ee2a027f4e9405be8c293860b7&imgtype=0&src=http%3A%2F%2Fpic1.zhimg.com%2F50%2Fv2-ede9473ddcbd84fe7c1e363953ed7410_hd.jpg'
						}
					]
				},
				{
					paramsName: '尺寸',
					paramsKey: 'size',
					showIcon: false,
					list: [
						{
							value: 0,
							text: 'sm',
							floatPrize: 30,
							icon: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2841648446,236398816&fm=26&gp=0.jpg'
						},
						{
							value: 0,
							text: 'L',
							floatPrize: 0,
							icon:
								'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584610581049&di=0feb46ee2a027f4e9405be8c293860b7&imgtype=0&src=http%3A%2F%2Fpic1.zhimg.com%2F50%2Fv2-ede9473ddcbd84fe7c1e363953ed7410_hd.jpg'
						}
					]
				}
			]
			} 
		}
	},
	created() {
		let obj = {};
		this.nowPrize = this.prize
		this.nowPreImg = this.preImg
		console.log('基准价'+ this.prize)
		this.paramsList = this.options.map(item => {
			obj[item.paramsKey] = '';
			return item;
			// item.list.forEach(it=>{
			// 	it
			// })
		});
		this.formParams = obj;
		
		// console.log(this.paramsList, this.formParams);
	},
	watch:{
		prize(n,o){
			this.nowPrize = n
		},
		preImg(n,o){
			this.nowPreImg = n
		}
	},
	methods: {
		// 创建订单
		_creatOrder(){
			uni.showToast({
				title:'创建订单'
			})
			let res = {}
			
			let r = Object.keys(this.formParams).every(item=>{
				if(this.formParams[item]){
					res[item]=this.formParams[item].text
					return true
				}else{
					return false
				}			
			})
			if(r){
				console.log('购买回调数据',res)
				this.$emit('creatOrder',res)
				this.hide()
			}else{
				uni.showToast({
					icon:'none',
					title:'请选择商品规格'
				})
			}
			
		},
		// 购物车
		_addCard(){
			uni.showToast({
				title:'添加购物车'
			})
			let res = {}
			
			let r = Object.keys(this.formParams).every(item=>{
				if(this.formParams[item]){
					res[item]=this.formParams[item].text
					return true
				}else{
					return false
				}			
			})
			if(r){
				console.log('添加购物车回调数据',res)
				this.$emit('addCard',res)
				this.hide()
			}else{
				uni.showToast({
					icon:'none',
					title:'请选择商品规格'
				})
			}
		},
		// 选择规格
		_chooesOne(item,it){
			
			let val = it.value
			let pro = item.paramsKey
			
			if(item.showIcon){
				this.nowPreImg = it.icon
			}
			this.formParams[pro] = it
			// this.nowPrize = this.prize+fp
			this.calc()
		},
		// 计算现单价
		calc(){
			let arr = Object.values(this.formParams)
			let s = this.prize;
			console.log('计算')
			arr.forEach(item=>{
				console.log(item)
				console.log('计算+'+item.floatPrize)
				if(item)s+=item.floatPrize
				
			})
			console.log('现价'+s)
			this.nowPrize = s
		},
		_none() {},
		show() {
			this.showModalStatus = true;
		},
		hide() {
			this.showModalStatus = false;
		},
		hideModal() {
			this.showModalStatus = false;
			// alert(1)
			return;
		},
		change(e) {
			let v = e.value;
			console.log(e, v);
			this.num = v;
		}
	}
};
</script>

<style lang="less">
/*底部抽屉样式 start*/
.mask-screen {
	width: 100vw;
	height: 100vh;
	position: fixed;
	top: 0;
	left: 0;
	background: rgba(0, 0, 0, 0.5);
	// opacity: 0.5;
	overflow: hidden;
	z-index: 10;
	
	.region-box {
		width: 100%;
		overflow: hidden;
		position: absolute;
		bottom: 0;
		left: 0;
		z-index: 20;
		background: #fff;
		padding: 20rpx;
		box-sizing: border-box;
		.stags{
			margin: 16rpx 10rpx 6rpx 10rpx;
			padding: 0 10rpx;
			font-size: 18rpx;
		}
		.cm_prize {
			margin-top: 20rpx;
		}
		.argueBox {
			width: 100%;
			// height: 300rpx;
			
			.cells {
				margin-bottom: 16rpx;
				line-height: 80rpx;
				height: 80rpx;
			}
			.argus {
				margin: 20rpx 10rpx;
				min-width: 100rpx;
				// &:extend(.flex);
				// &:extend(.flex_center);
				.icons {
					width: 40rpx;
					height: 40rpx;
					margin-right: 10rpx;
				}
			}
		}
		.pre {
			width: 200rpx;
			height: 200rpx;
			border-radius: 10rpx;
			margin-right: 20rpx;
		}
		.btnBox {
			width: 100%;
			height: 80rpx;
			border-radius: 40rpx;
			line-height: 80rpx;
			overflow: hidden;
			background: #d1a320;
			color: #fff;
			box-shadow: none;
			margin-top: 10rpx;
			.btns {
				width: 50%;
				height: 80rpx;
				line-height: 80rpx;
				background: #d1a320;
				color: #fff;
				border-radius: 0 !important;
			}
		}
	}
}
</style>
