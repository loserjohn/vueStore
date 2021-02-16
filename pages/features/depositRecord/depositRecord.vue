<template>
	<view class="pages">
		<view class="tabBar">
			<sun-tab :value.sync="current" @change="objectChange" :tabList="type==1?tabObjectList1:tabObjectList2" rangeKey="name"
			 activeColor="#039798"></sun-tab>
		</view>
		<swiper class="swiper banners" :indicator-dots="false" :autoplay="false" :current.sync="current" @change="_change">
			<swiper-item class="swiper-item ">
				<itemList :detail_type="detailType1" ref="list1" @agreeRefund="agreeRefund"></itemList>
			</swiper-item>
			<swiper-item class="swiper-item ">
				<itemList :detail_type="detailType2" ref="list2" @agreeRefund="agreeRefund"></itemList>
			</swiper-item>
		</swiper>
		<tui-modal :show="modal" @click="handleClick" @cancel="hide" content="确定该退款订单么？" :maskClosable="false" color="#333"
		 :size="32"></tui-modal>

	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';

	import sunTab from '@/components/sun-tab/sun-tab.vue';
	import itemList from './itemList/itemList.vue';
	export default {
		data() {
			return {

				tabObjectList1: [
					//对象数组赋值
					{
						name: '转入',
						value: 0
					},
					{
						name: '转出',
						value: 1
					}
				],
				tabObjectList2: [
					//对象数组赋值
					{
						name: '收入',
						value: 0
					},
					{
						name: '支出',
						value: 1
					}
				],
				detailType1:0,
				detailType2:1,
				current: 0,
				type: 1,
				modal: false,
				currentCode: '' //当前操作的条目code
			};
		},
		computed: mapState(['hasLogin']),
		components: {
			sunTab,
			itemList
		},
		onLoad(options) {
			// alert(options.type)
			this.type = options.type
				
			// type==1 余额  type==2 购物券明细
			if(this.type==2){
				this.detailType1 = 2
				this.detailType2 = 3
				uni.setNavigationBarTitle({
					title:'购物券明细'
				})
			}
		},

		methods: {
			objectChange(e) {
				this.current = parseInt(e.tab.value)
			},
			_change(event) {
				this.current = parseInt(event.detail.current);
			}
		}
	};
</script>

<style lang="scss" scoped>
	.pages {
		.note {
			width: 100%;
			height: 66rpx;
			line-height: 66rpx;
			color: #fff;
			background: #333;
			padding: 0 20rpx;
		}

		.tabBar {
			line-height: 72rpx;
			height: 72rpx;
			background: #fff;
			overflow: hidden;
		}

		.banners {
			width: 100%;
			height: calc(100vh - 72rpx);

			// background: red;
			.swiper-item {
				width: 100%;
				// height: 100%;
				height: calc(100vh - 72rpx);
				// background: #0000FF;
			}
		}
	}
</style>
