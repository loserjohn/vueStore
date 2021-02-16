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
		let patrn =  /^([1-9]{1})(\d{15}|\d{18})$/;
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

		let str = val.replace(/\s/g,'')
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
	
	// 微信初始化
	
	
	
}
export default  Utils 