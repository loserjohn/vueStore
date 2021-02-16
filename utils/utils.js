import SET from '../SET.js'
const Utils = {
	phoneCheck(value) {
		const reg = /^1\d{10}$/
		const r = reg.test(value)
		return r
	},
	passCheck(val) {
		let patrn = /^(\w){6,20}$/;
		if (!patrn.exec(val)) return false
		return true
	},
	// 银行卡校验
	bankCardCheck(val) {
		let patrn = /^([1-9]{1})(\d{15}|\d{18})$/;
		if (!patrn.test(val)) return false
		return true
	},
	// 中文字符
	chineseCheck(val) {
		let patrn = /^[\u4E00-\u9FA5]{2,4}/;

		if (!patrn.test(val)) return false
		return true
	},
	// 银行卡数字加密
	encryptBankCode(val) {

		let str = val.replace(/\s/g, '')
		console.log(str)
		let reg = /^(\d{4})\d+(\d{4})$/;
		str.replace(reg, "$1 **** **** $2");
		console.log(str)
		return str
	},


	/**
	 * Parse the time to string
	 * @param {(Object|string|number)} time
	 * @param {string} cFormat
	 * @returns {string}
	 */
	parseTime(time, cFormat) {
		if (arguments.length === 0) {
			return null
		}
		const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
		let date
		if (typeof time === 'object') {
			date = time
		} else {
			if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
				time = parseInt(time)
			}
			if ((typeof time === 'number') && (time.toString().length === 10)) {
				time = time * 1000
			}
			date = new Date(time)
		}
		const formatObj = {
			y: date.getFullYear(),
			m: date.getMonth() + 1,
			d: date.getDate(),
			h: date.getHours(),
			i: date.getMinutes(),
			s: date.getSeconds(),
			a: date.getDay()
		}
		const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
			let value = formatObj[key]
			// Note: getDay() returns 0 on Sunday
			if (key === 'a') {
				return ['日', '一', '二', '三', '四', '五', '六'][value]
			}
			if (result.length > 0 && value < 10) {
				value = '0' + value
			}
			return value || 0
		})
		return time_str
	},

	/**
	 * @param {number} time
	 * @param {string} option
	 * @returns {string}
	 */
	formatTime(time, option) {
		if (('' + time).length === 10) {
			time = parseInt(time) * 1000
		} else {
			time = +time
		}
		const d = new Date(time)
		const now = Date.now()

		const diff = (now - d) / 1000

		if (diff < 30) {
			return '刚刚'
		} else if (diff < 3600) {
			// less 1 hour
			return Math.ceil(diff / 60) + '分钟前'
		} else if (diff < 3600 * 24) {
			return Math.ceil(diff / 3600) + '小时前'
		} else if (diff < 3600 * 24 * 2) {
			return '1天前'
		}
		if (option) {
			return parseTime(time, option)
		} else {
			return (
				d.getMonth() +
				1 +
				'月' +
				d.getDate() +
				'日' +
				d.getHours() +
				'时' +
				d.getMinutes() +
				'分'
			)
		}
	},
	/**
	 * @param {string} type
	 * @returns {Date}
	 */
	getTime(type) {
		if (type === 'start') {
			return new Date().getTime() - 3600 * 1000 * 24 * 90
		} else {
			return new Date(new Date().toDateString())
		}
	},

	// 记录本地足迹
	// setTrace(item) {
	// 	let list = uni.getStorageSync('kxTraceList');
	// 	if (list) {
	// 		list = JSON.parse(list)
	// 	} else {
	// 		list = {}
	// 	}
	// 	console.log('存入足迹')
	// 	// 判断该记录书是否存在
	// 	let time = new Date().getTime()
	// 	let id = item.code
	// 	item.time = time
	// 	list[id] = item
	// 	uni.setStorageSync('kxTraceList', JSON.stringify(list));
	// },
	// // 获取足迹
	// getTrace() {
	// 	let list = uni.getStorageSync('kxTraceList');
	// 	if (list) {
	// 		return (JSON.parse(list))
	// 	} else {
	// 		return []
	// 	}

	// },
	// // 清除所有足迹
	// clearTrace() {
	// 	uni.removeStorageSync('kxTraceList');
	// },

	// 支付宝支付
	AliPay(strData, callback, failFun) {
		if (!strData) {
			uni.showToast({
				icon: 'none',
				title: '支付参数无效'
			})
			return
		}
		uni.requestPayment({
			provider: "alipay",
			orderInfo: strData,
			success: function(res) {
				plus.nativeUI.toast('支付成功');
				if (callback) callback()
			},
			fail: function(res) {
				if (failFun) {
					failFun();
					return;
				}
				uni.showToast({
					title: '支付失败',
					icon: "none",
					duration: 2000,
					complete: function() {
						uni.redirectTo({
							url: '/pages/features/order/order?current=1'
						})
					}
				});
			}
		});
	},

	// 微信支付
	WxPay(orderinfo, callback, failFun) {
		if (!orderinfo) {
			uni.showToast({
				icon: 'none',
				title: '支付参数无效'
			})
			return
		}
		// console.log(JSON.stringify(orderinfo));
		uni.requestPayment({
			provider: "wxpay",
			timeStamp: orderinfo.timestamp,
			nonceStr: orderinfo.noncestr,
			package: orderinfo.package,
			signType: "MD5",
			paySign: orderinfo.paySign,
			orderInfo: {
				appid: orderinfo.appid,
				noncestr: orderinfo.noncestr,
				package: orderinfo.package,
				partnerid: orderinfo.mchid,
				prepayid: orderinfo.prepayid,
				timestamp: orderinfo.timestamp,
				sign: orderinfo.sign,
			},
			success: function(res) {
				plus.nativeUI.toast('支付成功');
				if (callback) callback()
			},
			fail: function(res) {
				console.log(JSON.stringify(res));
				if (failFun) {
					failFun();
					return;
				}
				uni.showToast({
					title: '支付失败',
					icon: "none",
					duration: 2000,
					complete: function() {
						uni.redirectTo({
							url: '/pages/features/order/order?current=1'
						})
					}
				});
			}
		});
	},
	// 判断是否可以指纹解锁
	// 判断当前机型是否支持指纹
	checkFinger() {
		if (!plus.fingerprint.isSupport()) {
			plus.nativeUI.toast('此设备不支持指纹识别');
			// this.supportFinger = false;
			return false
		} else if (!plus.fingerprint.isKeyguardSecure()) {
			plus.nativeUI.toast('此设备未设置密码锁屏');
			// this.supportFinger = false;
			return false
		} else if (!plus.fingerprint.isEnrolledFingerprints()) {
			plus.nativeUI.toast('此设备未录入指纹');
			// this.supportFinger = false;
			return false
		} else {
			// this.supportFinger = true;
			return true
		}

	},
	// 是否微信浏览器
	is_weixn() {
		var ua = navigator.userAgent.toLowerCase();
		if (ua.match(/MicroMessenger/i) == "micromessenger") {
			return true;
		} else {
			return false;
		}
	},
	// 是否受过权
	// 返回code
	ifAuth(success){
		let url = window.location.href;
		let s = url.match(/code=(.*)&state/)				
		if (s) {
			// 是授权后的页面,则做opnegid判断 使用code获取pid
			// return s[1]
			// 换取oid
			success(s[1])		
		} else {
			// 不是授权的页面，重定向进行授权
		
			this.wxauth()
		}	
	},

	// wx授权跳转
	wx_auth() {
		// alert(1)
		let set = {
			appid: SET.wx_appid, //测试环境
			redirect_uri: SET.wx_redirect_url,
		}
		let url = window.location.href;
		let loca = url.split('#')[1]
		if(loca){
			uni.setStorageSync('path',loca)
		}
		window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + set.appid + '&redirect_uri=' +
			set.redirect_uri + '&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect'
	},
	
}
export default Utils
