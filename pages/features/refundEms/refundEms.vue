<template>
	<view class="pages">
		<tui-list-view  unlined="all" class="tui-list-view tui-skeleton-fillet" >
			<tui-list-cell :arrow="false"  @tap="chooseKD">
				<view class="tui-list-cell-name f1">物流公司</view>
				<view class="tui-right">{{ formParams.ems_company_name?formParams.ems_company_name:'请选择物流公司'}}</view>
				<tui-icon name="arrowright" :size="14" color="#999"></tui-icon>
			</tui-list-cell>
			<tui-list-cell :arrow="false" >
				<view class="tui-list-cell-name f1">物流单号</view>
				<input class="tui-right cm_tex_r"  v-model="formParams.ems_number " placeholder="请输入物流单号" />
				
			</tui-list-cell>			
		</tui-list-view>
		<view class=" tui-skeleton-fillet" style="margin-top: 72rpx;padding: 0 20rpx;">
			<tui-button type="primary" shape="circle"  @tap="_submit" >确认发货</tui-button>
			</tui-button>
		</view>
	</view>
</template>

<script>
	import tuiListView from '@/components/list-view/list-view';
	import tuiListCell from '@/components/list-cell/list-cell';
	export default {
		data() {
			return {
				formParams:{
					"refund_code": "",
					"ems_company_name": "",
					"ems_number": ""
				},
				kdList:[{
					"com": "申通快递",
					"no": "shentong"
				},
				{
					"com": "EMS",
					"no": "ems"
				},
				{
					"com": "顺丰速运",
					"no": "shunfeng"
				},
				{
					"com": "韵达快递",
					"no": "yunda"
				},
				{
					"com": "圆通速递",
					"no": "yuantong"
				},
				{
					"com": "中通快递",
					"no": "zhongtong"
				},
				{
					"com": "百世汇通",
					"no": "huitongkuaidi"
				},
				{
					"com": "天天快递",
					"no": "tiantian"
				},
				{
					"com": "宅急送",
					"no": "zhaijisong"
				},]
			};
		},
		computed:{
			list(){
				
				return this.kdList.map(item=>{
					return item.com
				})
			
			}
		},
		components: {
			tuiListCell,
			tuiListView
		},
		onLoad(options) {
			this.formParams.refund_code = options.code;
		},
		methods:{
			chooseKD(){
				let that = this;
				uni.showActionSheet({
					itemList: that.list,
					success: function(res) {
						let i = res.tapIndex;
						that.formParams.ems_company_name = that.list[res.tapIndex]
						// console.log(res)
					},
					fail: function(res) {
						console.log(res.errMsg);
					}
				});
			},
			async _submit(){
				let that = this;
				console.log(that.formParams)
				if(!this.formParams.ems_company_name || !this.formParams.ems_number ){
					this.$ui.toast('请完善物流信息')
					return
				}
				
				try {
					that.$ui.showloading()
					let res = await this.$api.RefundEms(that.formParams);
					that.$ui.hideloading()
					if (res.result==1) {
				
						that.$ui.toast('提交成功')
						setTimeout(()=>{
							uni.$emit('refresh_refundList')
							// uni.$emit('refresh_detail')
							uni.$emit('refresh_refundDetail')
							uni.navigateBack({
								
							})
						},500)
					} else {
						that.$ui.toast(res.msg)
					}
				} catch (err) {
					console.log('请求结果false : ' + err);
				}
			}
		}
	}
</script>

<style lang="scss">

</style>
