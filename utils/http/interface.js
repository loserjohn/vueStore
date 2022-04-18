/**
 * 通用uni-app网络请求
 * 基于 Promise 对象实现更简单的 request 使用方式，支持请求和响应拦截
 */
import store from '../../store/index.js'
import SET from '../../SET.js'
let ifWx = uni.getStorageSync('ifWx')
export default {
	config: {
		// baseUrl: "https://hp.fjhjc.net/Data",
		baseUrl: SET.baseUrl,

		// baseUrl: "https://testapi.kuxiong999.com",   //测试连接
		header: {
			'Content-Type': 'application/json;charset=UTF-8',
			// 'Content-Type':'application/x-www-form-urlencoded'
		},
		data: {},
		method: "GET",
		dataType: "json",
		/* 如设为json，会对返回的数据做一次 JSON.parse */
		responseType: "text",
		success() {},
		fail() {},
		complete() {

		}
	},
	interceptor: {
		request: function(config, ifLoad) {
			const value = uni.getStorageSync(SET.tokenName);
			// console.log(value)
			if (value) {
				config.header.Authorization = value
			}
			return config;
		},
		response: function(response, ifLoad) {
			let statusCode = response.statusCode
			let that = this
			// console.log(response)
			// 一般在这里做全局的错误事件处理
			if (statusCode === 200) { //成功
				return response.data
			} else if (statusCode === 401) {
				// if (true) {	
				// if(!store.state.hasLogin)return
				// alert(0)
				// uni.showModal({
				// 	title: ' 邵氏消防商城提醒您',
				// 	content: '登陆状态失效,请重新登陆',
				// 	showCancel:false,
				// 	success: function (res) {
				// 		if (res.confirm) {
				// 			uni.removeStorageSync(SET.tokenName);
				// 			uni.removeStorageSync('user');
				// 			if (ifWx) {
				// 				uni.redirectTo({
				// 					url: '/pages/role/wxLogin/wxLogin'
				// 				})
				// 			} else {
				// 				uni.redirectTo({
				// 					url: '/pages/role/pLogin/pLogin'
				// 				})
				// 			}
				// 		}
				// 	}
				// });	
				// alert(1)
				return '权限失效'
			} else if (response.errMsg == "request:fail abort") {

				// #ifdef APP-PLUS
				plus.nativeUI.toast('请检查网络')
				plus.nativeUI.closeWaiting()
				// #endif

				let ifLock = uni.getStorageSync('errlock')
				console.log(ifLock)
				// uni.setStorageSync('errlock',false)
				if (!ifLock) {
					uni.setStorageSync('errlock', true)
					setTimeout(() => {
						uni.navigateTo({
							url: '/pages/errors/errors',
						})

					}, 1000)

				}


				return '请检查网络'
			} else {

				return '未知错误'
			}

		}
	},
	request(options, ifLoad) {
		let that = this
		if (!options) {
			options = {}
		}
		options.baseUrl = options.baseUrl || this.config.baseUrl
		options.dataType = options.dataType || this.config.dataType
		options.url = options.baseUrl + options.url
		options.data = options.data || {}
		options.method = options.method || this.config.method
		options.timeout = 10000
		// console.log('执行')

		return new Promise((resolve, reject) => {
			let _config = null

			options.complete = (response) => {
				let statusCode = response.statusCode
				// console.log(response)
				// response.config = _config
				if (this.interceptor.response) {
					// reject('没有权限')
					let re = this.interceptor.response(response, ifLoad)
					// console.log(re)
					// alert(re)
					if (re === '权限失效') {
						store.commit('logout')
						uni.showToast({
							title: '身份过期，请重新登录',
							duration: 800
						})
						setTimeout(function() {
							uni.switchTab({
								url: '/pages/main/main'
							})
						}, 800);



						// uni.showModal({
						// 	title: ' 邵氏消防商城提醒您',
						// 	content: '登陆状态失效,请重新登陆',
						// 	showCancel:false,
						// 	success: function (res) {
						// 		if (res.confirm) {
						// 			uni.removeStorageSync(SET.tokenName);
						// 			uni.removeStorageSync('user');
						// 			if (ifWx) {
						// 				uni.redirectTo({
						// 					url: '/pages/role/wxLogin/wxLogin'
						// 				})
						// 			} else {
						// 				uni.redirectTo({
						// 					url: '/pages/role/pLogin/pLogin'
						// 				})
						// 			}
						// 		}
						// 	}
						// });	
						resolve('权限失效');
						// return;
					} else if (re === '请检查网络') {
						reject('请检查网络');
						return;
					} else if (re === '未知错误') {
						reject('未知错误');
						return;
					} else {
						resolve(re);
					}
				}

			}

			_config = Object.assign({}, this.config, options)
			_config.requestId = new Date().getTime()
			// console.log(_config)
			if (this.interceptor.request) {
				let re = this.interceptor.request(_config, ifLoad)
				_config = re
			}


			uni.request(_config);
		});
	}
}


/**
 * 请求接口日志记录
 */
function _reqlog(req) {
	if (process.env.NODE_ENV === 'development') {
		// console.log("【" + req.requestId + "】 地址：" + req.url)
		if (req.data) {
			// console.log("【" + req.requestId + "】 请求参数：" + JSON.stringify(req.data))
		}
	}
	//TODO 调接口异步写入日志数据库
}

/**
 * 响应接口日志记录
 */
function _reslog(res) {
	let _statusCode = res.statusCode;
	if (process.env.NODE_ENV === 'development') {
		// console.log("【" + res.config.requestId + "】 地址：" + res.config.url)
		if (res.config.data) {
			// console.log("【" + res.config.requestId + "】 请求参数：" + JSON.stringify(res.config.data))
		}
		// console.log("【" + res.config.requestId + "】 响应结果：" + JSON.stringify(res))
	}
	//TODO 除了接口服务错误外，其他日志调接口异步写入日志数据库
	switch (_statusCode) {
		case 200:
			break;
		case 401:
			break;
		case 404:
			break;
		default:
			break;
	}
}
