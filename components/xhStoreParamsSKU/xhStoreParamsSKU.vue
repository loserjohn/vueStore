<!-- skulist算法 实现多规格商品 -->
<template>
	<!--底部抽屉-->
	<view class="mask-screen " @touchmove.stop.prevent="_none" @click="hideModal" :class="showModalStatus?'showScreen':'hideScreen'">

		<view class="region-box animated  " :class="showModalStatus?'slideInUp':'slideOutDown'" 
		 @tap.stop="_none" >
			<view class="flex flex_center " style="padding-bottom: 20rpx;">
				<image :src="nowPreImg" mode="widthFix" class="pre"></image>
				<view class="f1">
					<view class="cm_title">{{ title }}</view>
					<view class="flex flex_center flex_wrap" style="justify-content: flex-start;height: 40rpx">
						<block v-for="(its, inds) in selectArr" :key="inds+'s'">
							<text class=" stags">{{ its }}</text>
						</block>
					</view>
					<view class="flex flex_center flex_wrap" style="justify-content: flex-start;height: 40rpx;margin-bottom: 10rpx;">
						<block v-for="(its, inds) in selectPropertice" :key="inds+'p'">
							<text class=" stags" style="color: #E56D00;">{{ its.service_name }}</text>
						</block>
					</view>

					<view class="flex flex_center" style="justify-content: flex-start;">
						<!-- <view class="cm_price f1" style="color: #E93F37;" v-if="selectshop.is_activity==1">折扣价￥{{ sum }}</view>	 -->
						<view class="cm_price " style="color: #E93F37;font-size: 32rpx;">￥{{sum }}</view>
						<tui-tag type="danger" padding="10rpx 20rpx" shape="circle" v-show="mostCoupon" size="24rpx">券后价{{`${mostCoupon}`}}</tui-tag>
						<view class="f1"></view>
						<text class="cm_des cm_t_20" v-show="selectshop">库存:{{nowStock}}</text>
					</view>
				</view>
			</view>
			<view class="lines"></view>
			<scroll-view scroll-y="true" class="argueBox">
				<view>
					<block v-for="(item, index) in specifications" :key="index">
						<view v-show="item.checked">
							<view class="cm_title cm_t_24" style="margin-top:20rpx ;">{{ item.name }} </view>
							<view class=" flex flex_center" style="justify-content: flex-start;flex-wrap: wrap;">
								<block v-for="(it, ind) in item.list" :key="ind">
									<button size="mini" v-show="it.checked" :plain="subIndex[index] == ind ? true:false  " :type="subIndex[index] == ind ? 'warn': 'default'"
									 class="argus " @tap.stop.prevent="skuClick(it, index, $event, ind)" :disabled="it.ishow ? false : true">
										<image :src="it.pic" mode="" v-if="it.pic" style="width: 20px;height: 20px;float: left;margin-top: 4px;margin-right: 4px;"></image>
										{{ it.name  }}
									</button>
								</block>
							</view>
						</view>

					</block>
				</view>
				<view class="lines"></view>
				<view v-if="perParams.length">
					<block v-for="(it, idx) in perParams" :key="idx">
						<view class="cm_title cm_t_24" style="margin-top:20rpx ;">
						<text style="color: red;" v-show="it.required">*</text>{{it.service_type_name}}<text> {{it.multiple?'（多选）':''}}</text></view>
						<view class=" flex flex_center" style="justify-content: flex-start;flex-wrap: wrap;">
							<block v-for="(item, ind) in it.list" :key="ind">
								<button size="mini" :plain="item.is_checked? true:false  "  :type="item.is_checked ? 'warn': 'default'" class="argus "
								 @tap.stop.prevent="serve(idx,ind,item.service_code)">
								
								 {{ item.service_name  }}(￥{{item.service_price}})
								</button>
							</block>
						</view>
					</block>

				</view>

				<view class=" cells flex flex_center">
					<text class="cm_title cm_t_24">数量:</text>
					<view class="f1"></view>
					<Numberbox :min="1" :value="selectNum" @change="change"></Numberbox>
				</view>
				<!-- </view> -->
			</scroll-view>
			<view class="footer savebottom">
				<view class="btnBox flex flex_center">
					<button class="btns" v-show="action=='card'" @tap.stop.prevent="_addCard">加入购物车</button>
					<view class="btns hot flex flex_y flex_center" v-if="action=='buy'&&  ifActive" @tap.stop.prevent="_creatOrder">
						<view class="">马上抢</view>
					</view>
					<button class="btns" @tap.stop.prevent="_creatOrder" v-if="action=='buy'&&  !ifActive" :style="{ background: '#50AB9F' }">立即购买</button>
				</view>
			</view>
			<view :style="{'height':bottom?`${bottom}rpx`:'0rpx'}"></view>
		</view>
	</view>
</template>

<script>
	import Numberbox from './numberbox/numberbox';
	export default {
		data() {
			return {
				lock: false,
				paramsList: [], //
				
				num: 1,
				issafariBrowser: false,
				nowprice: 0,
				nowPreImg: '',
				showModalStatus: false, //显示选
				nowStock: 0,
				shopItemInfo: {}, //存放要和选中的值进行匹配的数据
				selectArr: [], //存放被选中的值
				subIndex: [], //是否选中 因为不确定是多规格还是但规格，所以这里定义数组来判断
				selectshop: {}, //存放最后选中的商品
				selectNum: 1, //选中数量
				specifications: [],
				perParams: [], //存放所有售后服务项
				// properties: [
					// {
					// 	title:'保修',
					// 	key:'bx',
					// 	required:false,
					// 	multiple:false,					
					// 	default:'342dfadsf',
					// 	children:[
					// 		{
					// 			label:'一年',
					// 			value:'342dfadsf',
					// 			per_price:35,
					// 		},
					// 		{
					// 			label:'两年',
					// 			value:'56gsdf',
					// 			per_price:58
					// 		}
					// 	]
					// },
					// {
					// 	title:'安装',
					// 	key:'az',
					// 	required:true,
					// 	multiple:true,
					// 	children:[
					// 		{
					// 			label:'上门安装',
					// 			value:'2134fgsd',
					// 			per_price:30
					// 		},
					// 		{
					// 			label:'预约安装',
					// 			value:'4325gd',
					// 			per_price:50
					// 		},
					// 		{
					// 			label:'售后',
					// 			value:'122131',
					// 			per_price:20
					// 		}
					// 	]
					// }
				// ]
			};
		},
		components: {
			Numberbox
		},
		computed: {
			// 总额计算
			sum() {
				let ps = 0
				// this.selectPropertice.map(item => {
				// 	ps += item.service_price
				// })
				// console.log(ps)
				return (this.selectNum * this.nowprice + ps).toFixed(2);
			},
			// 选中的售后服务
			selectPropertice() {
				let res = []
				this.perParams.map(it => {
					if (it.list.length) {
						it.list.map(item => {
							if (item.is_checked) {
								res.push(item)
							}
						})
					}
				})
				return res
			},
			// 最优商品券的判断
			mostCoupon(){
				let spList = {}
				if(!this.couponList.length){
					return 0
				}
				let  hasSP = this.couponList.some(item=>{
					if(item.use_area==1){
						spList[item.order_amount] = item
					}
					return item.use_area==1?true:false
				})
				if(hasSP){
					// 有商品券
					let arr= {}
					let sum = this.selectNum * this.nowprice
					this.couponList.map(it=>{
						if(it.use_area==1 && sum>=Number(it.order_amount) ){
							arr[it.price] = it
						}						
					}) 
					console.log(77,arr)
					if(Object.keys(arr).length){
						let k = Math.max(...Object.keys(arr))
						// console.log(777,k)
						return sum?sum - arr[k].price:0
					}else{
						return ''
					}		
				}else{
					return '' //没有优惠价
				}
			}
		},

		props: {
			couponList:{
				//参数选项
				Type: Array,
				default: function() {
					return [];
				}
			},
			bottom:{
				Type: Number,
				default: 0
			},
			platform: {
				Type: String,
				default: "android"
			},
			action: {
				Type: String,
				default: "buy"
			},
			// 是或活动价
			ifActive: {
				Type: Boolean,
				default: false
			},
			singlePro: {
				//是否是统一规格
				Type: Boolean,
				default: false
			},
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

			defaultprice: {
				Type: Number,
				default: 0
			},
			defaultstock: {
				Type: Number,
				default: 100
			},
			propertyList: {
				//参数选项
				Type: Array,
				default: function() {
					return [];
				}
			},
			parameter: {
				//参数选项
				Type: Array,
				default: function() {
					return [
						// {
						// 	name: '尺寸',
						// 	item: [
						// 		{
						// 			name: '100'
						// 		},
						// 		{
						// 			name: '200'
						// 		}
						// 	]
						// },
						// {
						// 	name: '颜色',
						// 	item: [
						// 		{
						// 			name: '白色'
						// 		},
						// 		{
						// 			name: '黑色'
						// 		},
						// 		{
						// 			name: '绿色'
						// 		}
						// 	]
						// }
					];
				}
			},
			difference: {
				Type: Array,
				default: function() {
					return [
						// {
						// 	id: '19',
						// 	price: 200,
						// 	stock: 19,
						// 	img:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584610581049&di=0feb46ee2a027f4e9405be8c293860b7&imgtype=0&src=http%3A%2F%2Fpic1.zhimg.com%2F50%2Fv2-ede9473ddcbd84fe7c1e363953ed7410_hd.jpg',
						// 	difference: ['100', '白色', 'X', '豪华']
						// },
						// {
						// 	id: '21',
						// 	price: 300,
						// 	stock: 10,
						// 	img:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584610581049&di=0feb46ee2a027f4e9405be8c293860b7&imgtype=0&src=http%3A%2F%2Fpic1.zhimg.com%2F50%2Fv2-ede9473ddcbd84fe7c1e363953ed7410_hd.jpg',
						// 	difference: ['100', '黑色', 'XL', '低调']
						// }
					];
				}
			}
		},

		created() {
			this.issafariBrowser = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
			// console.log(issafariBrowser)
			this.nowprice = this.defaultprice
			this.nowStock = this.defaultstock
			this.nowPreImg = this.preImg

		},
		watch: {
			propertyList(n, o) {
				if(!n.length)return;
				this.perParams=[]
				n.forEach(it => {
					// let ret = {}
					let arr = []
					if (it.list.length) {
						
						it.list.forEach(item => {
							
							item.is_checked = true
							if(item.checked){
								item.is_checked = false
								arr.push(item)
							}else{
								
							}
						})
					}
					it.list = [...arr]
					this.perParams.push(it)
				})
				console.log(this.perParams)
			},

			parameter(n, o) {
		
				if (!n.length) return;
				this.specifications = []
				n.map(item => {
					if (item.checked) {
						this.selectArr.push('');
						this.subIndex.push(-1);
						this.specifications.push(item)
					}
				});
				// console.log(-1,this.selectArr)
				this.checkItem(); //计算sku里面规格形成路径
				this.checkInpath(-1);
				// if(this.specList.length==1){
				// 	this.selectshop = this.difference[0]
				// }
			},
			
			preImg(n, o) {
				// console.log(n)
				this.nowPreImg = n;
			},
			defaultstock(n, o) {
				// console.log(n)
				this.nowStock = n;
			},
			defaultprice(n, o) {
				// console.log(n)
				this.nowprice = n;
			},
		},
		methods: {
			_none(){},
			// 选择特色服务
			serve(index1, index2, value) {

				let {
					key,
					multiple,
					required
				} = this.perParams[index1];
				let check = this.perParams[index1].list[index2].is_checked
				if (multiple) {
					// 多选		
					this.perParams[index1].list[index2].is_checked = !check
					this.$set(this.perParams[index1].list, index2, this.perParams[index1].list[index2]);
				} else {
					this.perParams[index1].list.map(item => {
						item.is_checked = false
					})
					// // 单选
					if (!check) {
						// 选中
						this.perParams[index1].list[index2].is_checked = true
					}
					this.perParams[index1] = { ...this.perParams[index1]
					}
					this.$set(this.perParams, index1, this.perParams[index1]);
				}
			},
			skuClick(value, index1, event, index2) {
				if (this.lock) return;
				this.lock = true
				// console.log(value, index1, event, index2)
				if (value.ishow) {
					if (this.selectArr[index1] != value.name) {
						this.$set(this.selectArr, index1, value.name);
						this.$set(this.subIndex, index1, index2);
					} else {
						this.$set(this.selectArr, index1, '');
						this.$set(this.subIndex, index1, -1);
					}
					// console.log( this.subIndex)
					this.checkInpath(index1);
					// console.log(0, this.selectArr)
					//如果全部选完
					if (this.selectArr.every(item => item != '')) {
						this.selectshop = this.shopItemInfo[this.selectArr];
						// console.log(1,this.selectshop)
						// this.selectNum = 1;
						this.nowprice = this.selectshop.skus_price
						this.nowStock = this.selectshop.skus_stock
						if (value.pic) {
							this.nowPreImg = value.pic
						}
					}
				}

				setTimeout(() => {
					this.lock = false
				}, 500)
			},
			checkInpath(clickIndex) {
				// console.time('筛选可选路径需要的时间是');
				//循环所有属性判断哪些属性可选
				//当前选中的兄弟节点和已选中属性不需要循环
				// console.log("a"+clickIndex)
				for (let i = 0, len = this.specifications.length; i < len; i++) {
					if (i == clickIndex || !this.specifications[i].checked) {
						continue;
					}
					let len2 = this.specifications[i].list.length;
					for (let j = 0; j < len2; j++) {
						// console.log("b"+ this.subIndex[i],j)
						if (this.subIndex[i] != -1 && j == this.subIndex[i]) {
							continue;
						}
						let choosed_copy = [...this.selectArr];

						this.$set(choosed_copy, i, this.specifications[i].list[j].name);

						let choosed_copy2 = choosed_copy.filter(item => item !== '' && typeof item !== 'undefined');

						// console.log(choosed_copy2)
						// console.log(this.shopItemInfo[choosed_copy2]) 
						if (this.defaultstock > 0 && this.shopItemInfo.hasOwnProperty(choosed_copy2) && this.shopItemInfo[choosed_copy2].skus_stock >
							0) {
							this.$set(this.specifications[i].list[j], 'ishow', true);
						} else {
							this.$set(this.specifications[i].list[j], 'ishow', false);
						}
					}
				}
				// console.log(this.specifications)
				// console.timeEnd('筛选可选路径需要的时间是');
			},
			checkItem() {
				// console.time('计算有多小种可选路径需要的时间是');
				//计算有多小种可选路径
				// console.log(this.difference)
				let result = this.difference.reduce(
					(arrs, items) => {
						return arrs.concat(
							items.skus_difference.reduce(
								(arr, item) => {
									return arr.concat(
										arr.map(item2 => {
											//利用对象属性的唯一性实现二维数组去重
											if (!this.shopItemInfo.hasOwnProperty([...item2, item])) {
												this.shopItemInfo[[...item2, item]] = items;
											}
											return [...item2, item];
										})
									);
								},
								[
									[]
								]
							)
						);
					},
					[
						[]
					]
				);

				// console.log(0,this.shopItemInfo)
			},
			// 创建订单
			_creatOrder() {
				uni.showToast({
					title: '创建订单'
				});
				if (this.selectArr.length && this.selectArr.every(item => item != '')) {
					
					// 判断服务想是否选中
					let bool = true
					this.perParams.forEach(it=>{
						if(it.required){
							let res = it.list.some(item=>{
								return item.is_checked?true:false
							})
							if(!res)bool=false
						}
					})
					if(!bool){
						uni.showToast({
							icon: 'none',
							title: '请选择星号服务项'
						});
						return 
					}
					// let arr = []
					// this.selectPropertice.map(item=>{
					// 	arr.push(item.service_code) 
					// })
					
					this.selectshop.selectNum = this.selectNum
					this.selectshop.skus_img = this.nowPreImg
					// this.selectshop.goods_service_code = this.formParams
					this.selectshop.goods_service = this.selectPropertice
					// console.log('购买回调数据', this.selectshop);
					// return
					this.$emit('creatOrder', this.selectshop);
					this.hide();
				} else {
					uni.showToast({
						icon: 'none',
						title: '请选择商品规格'
					});
				}

			},
			// 购物车
			_addCard() {
				if (this.selectArr.every(item => item != '')) {
					// console.log('添加购物车回调数据',  this.selectshop);
					this.selectshop.selectNum = this.selectNum
					// let a = []
					// if(this.formParams.serve1){a.push(this.formParams.serve1.service_code)}
					// if(this.formParams.serve2){a.push(this.formParams.serve2.service_code)}
					// if(this.formParams.serve3){a.push(this.formParams.serve3.service_code)}
					let arr = []
					this.selectPropertice.map(item=>{
						arr.push(item.service_code) 
					})
					this.selectshop.goods_service = arr.join(',')
					this.$emit('addCard', this.selectshop);
					this.hide();
				} else {
					uni.showToast({
						icon: 'none',
						title: '请选择商品规格'
					});
				}

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
				// console.log(e, v);
				this.selectNum = v;
			}
		}
	};
</script>

<style lang="less" scoped>
	/*底部抽屉样式 start*/
	.mask-screen {
		width: 100vw;
		// height: 100vh;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
		transition: opacity 0.3s ease-in-out; 
		overflow: hidden;
		z-index: 100;

		.region-box {
			width: 100%;
			overflow: hidden;
			position: fixed;
			bottom: 0;
			left: 0;
			z-index: 20;
			background: #fff;
			padding: 20rpx;
			padding-bottom: 10rpx;
			box-sizing: border-box;
			border-radius: 20rpx 20rpx 0 0;
			transition: all .5s ease;

			.stags {
				margin-right: 10rpx;
				padding: 0 10rpx;
				font-size: 22rpx;
				color: #999;
			}

			.cm_price {
				margin-right: 20rpx;
				// margin-top: 20rpx
			}

			.cm_des {
				margin-right: 20rpx;
				// margin-top: 20rpx
			}

			.lines {
				width: 100%;
				height: 1rpx;
				background-color: #f1f1f1;
			}

			.argueBox {
				width: 100%;
				max-height: 40vh;
				overflow-y: auto;

				.cells {
					margin-bottom: 16rpx;
					line-height: 80rpx;
					height: 80rpx;
				}

				.argus {
					// transform: scale(.8);
					margin: 20rpx 10rpx;
					min-width: 100rpx;
					overflow: hidden;
					border-radius: 8rpx;
					font-size: 24rpx;
					;

					// border: none;
					.icons {
						width: 40rpx;
						height: 40rpx;
						margin-right: 10rpx;
					}
				}

				uni-button[type=default] {
					color: #333333;
					background-color: #F6F6F6;
					border: 1rpx solid #eee;

					&:after {
						border: none
					}
				}

				uni-button[disabled=true] {
					color: #d3d3d3;
					background-color: #fff;
					border: 1rpx solid #d3d3d3;

					&:after {
						border: none
					}
				}

				uni-button[plain=true] {
					color: #dc3b38;
					background-color: #ffebea;
					border: 1rpx solid #dc3b38;

					&:after {
						border: none
					}
				}
			}

			.pre {
				width: 188rpx;
				height: 188rpx;
				border-radius: 10rpx;
				margin-right: 20rpx;
			}

			.footer {

				// padding-bottom: env(safe-area-inset-bottom);
				// padding-bottom: 20rpx;
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
						flex:1;
						height: 80rpx;
						line-height: 80rpx;
						background: #DDB152;
						color: #fff;
						border-radius: 40rpx !important;
					}
				}

				.btns.hot {
					background-color: #E93F37;
				}
			}

		}

	}

	.showScreen {
		opacity: 1;
		pointer-events: auto;
	}

	.hideScreen {
		opacity: 0;
		pointer-events: none;
	}
</style>
