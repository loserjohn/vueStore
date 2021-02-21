import http from '@/utils/http/index.js';

import {
	mapState
} from 'vuex'
import SET from '@/SET.js'

module.exports = {
	data() {
		return {
			loadStatus:'0',
			ifWx: false,
			lock:false,
			
			
			pageFixTop: '0rpx',
			backTop:0,
			
			
			// 通用列表使用参数
			formParams: {
				"pageIndex": 1, //页
				"pageSize": 10 //条
			},
			form:{},
			lists:[],
			onBottom: false,
			onTop: false,
			hasRow: 'rows',
			baseKey: 'GetGoodsList',
			total:0,
			
		}
	},
	onPageScroll(e) {
		this.backTop = e.scrollTop;
	},
	onLoad() {
		// getRect挂载到$u上，因为这方法需要使用in(this)，所以无法把它独立成一个单独的文件导出
		// alert(1)
		this.ifWx = uni.getStorageSync('ifWx')
		// alert(this.ifWx)
		// #ifdef H5
		this.pageFixTop = '88rpx'
		// #endif
	},
	computed: {
		// 将vuex的state中的所有变量，解构到全局混入的mixin中
		...mapState(['hasLogin','accountInfo','currentOrder','currentCoupon'])
	},
	filters: {
		encryptPhone(val) {
			return val ? val.replace(/(\d{3})\d*(\d{4})/, "$1****$2") : ''
		},
		timeFilter(val){
			return val?val.replace('T',' '):''
		}
	},
	onPullDownRefresh() {
		if (!this.onTop){
			uni.stopPullDownRefresh();
			return
		} ;
		this.formParams.pageIndex = 1;
		// this.lists = [];
		this._getList('refresh');
	},
	// 上拉加载
	onReachBottom() {
		if (!this.onBottom) return;
		// console.log(this.loadStatus)
		if (this.loadStatus == 'noMore') {
			return;
		}
		this.formParams.pageIndex += 1;
		this.loadStatus = 'loading';
		this._getList('add');
		// uni.$emit('uOnReachBottom')
	},
	
	methods: {
		// ************通用列表部分start************
		// 获取条目
		async _getList(type='refresh') {
			let that = this
			let params = this._getListBefore({...this.formParams})
			// alert(0)
			if (type == 'add') {
				this.loadStatus = 'loading';
			} else {
				that.formParams.pageIndex=1
				that.loadStatus = 'loading';
				uni.stopPullDownRefresh();
			}
			
			// uni.showLoading({})
			const res = await this.$api[this.baseKey](params)
			// uni.hideLoading()
		
			if (res.result === 1) {
				// this.lists = res.data.rows;
				this.total = res.data.total
				
				if (type == 'add') {
					// 加载更多
					if (that.hasRow) {
						that.lists = that.lists.concat(res.data[that.hasRow]);
						if (res.data[that.hasRow].length < that.formParams.pageSize) {
							that.loadStatus = 'noMore';
							// 没有数据了
						} else {
							that.loadStatus = 'more';
						}
					} else {
						that.lists = that.lists.concat(res.data);
						if (res.data.length < that.formParams.pageSize) {
							that.loadStatus = 'noMore';
							// 没有数据了
						} else {
							that.loadStatus = 'more';
						}
					}
				} else {
					// 刷新
					if (that.hasRow) {
						that.lists = res.data[that.hasRow];
						if (res.data[that.hasRow].length < that.formParams.pageSize) {
							that.loadStatus = 'noMore';
							// 没有数据了
						} else {
							that.loadStatus = 'more';
						}
					} else {
						that.lists = res.data
						if (res.data.length < that.formParams.pageSize) {
							that.loadStatus = 'noMore';
							// 没有数据了
						} else {
							that.loadStatus = 'more';
						}
					}
					that.refreshing = false
				}
			}
			this._getListAfter()
		},
		_getListBefore(params){return params},
		_getListAfter(){},
		imageLoad(index) {
			if (this.lists[index]) {
				this.$set(this.lists[index], 'load', true);
			}
		},
		loadError(index) {
			// console.log('图片未找到');
			this.lists[index].goods_main_img = '/static/img/noPic.jpg';
		},
		
		
		
		
		
		//************通用列表end************
		
		
		
		
		encryptPhone(val) {
			return val ? val.replace(/(\d{3})\d*(\d{4})/, "$1****$2") : ''
		},
		
		_back(){
			uni.navigateBack({
				
			})
		},
		_config_href(item) {
			let type = item.link_url_type
			let url = item.link_url
			
			if (!type || !url) return;
			// debugger
			switch (type) {
				case 'href':
					uni.navigateTo({
						url: url
					});
					break;
				case 'inWeb':
					this.$store.commit('setWebviewUrl', url)
					uni.navigateTo({
						url: '/pages/webview/webview'
					})
					break;
				case 'mini':
					uni.navigateToMiniProgram({
						appId: url,
						path: 'pages/index/index',
						extraData: {
							'data1': 'test'
						},
						success(res) {
							// 打开成功
						}
					})
					break;
				default:
					break;
			}
		},
		_auth_href(url) {
			if (!this.hasLogin) {
				// #ifdef H5
				if (this.ifWx) {
					// debugger
					uni.navigateTo({
						url: '/pages/role/wxLogin/wxLogin',
						animationType: 'pop-in',
						animationDuration: 200
					})
				} else {
					uni.navigateTo({
						url: '/pages/role/pLogin/pLogin',
						animationType: 'pop-in',
						animationDuration: 200
					})
				}
				// #endif
				// #ifdef MP
				uni.navigateTo({
					url: '/pages/role/wxLogin/wxLogin',
					animationType: 'pop-in',
					animationDuration: 200
				})
				// #endif
			} else {
				// alert(url)
				uni.navigateTo({
					url: url
				})
			}
		},
		// 普通跳转
		_href(url,type) {
			if(type=="redirect"){
				uni.redirectTo({
					url: url,
					animationType: 'pop-in',
					animationDuration: 200
				})
			}else{
				uni.navigateTo({
					url: url,
					animationType: 'pop-in',
					animationDuration: 200
				})
			}
		
		},
		// 先登录
		_login() {
			// alert(1)
			// #ifdef H5
			if (this.ifWx) {
				uni.navigateTo({
					url: '/pages/role/wxLogin/wxLogin'
				})
			} else {
				uni.navigateTo({
					url: '/pages/role/pLogin/pLogin'
				})
			}
			// #endif
			// #ifdef MP
			uni.navigateTo({
				url: '/pages/role/wxLogin/wxLogin',
				animationType: 'pop-in',
				animationDuration: 200
			})
			// #endif

		},
		
		_lock() {
			this.lock = true
		},
		_unlock() {
			this.lock = false
		},
		_upload(tempFilePaths) {
			let that = this;
			return new Promise((resolve, reject) => {
				uni.uploadFile({
					url: SET.baseUrl + '/api/Upload/UploadImg', //仅为示例，非真实的接口地址
					filePath: tempFilePaths[0],
					name: 'folder',
					formData: {
						// 'folder': 'tempFilePaths[0]',
						setting:'up_crm_images',
					},
					success: (uploadFileres) => {
						// console.log(uploadFileres.data);
						let res = JSON.parse(uploadFileres.data);
						if (res.result===1) {
							resolve(res.data)
						} else {
							reject(res.msg)
						}
					}
				});
			})
		}
		,

		_call(number){
			if(!number)return;
			
			uni.makePhoneCall({
				phoneNumber:'number'
			})
		}
	}
}
