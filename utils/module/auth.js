// 用户身份相关接口
// 我要积分
import http from '../http/interface'
const Auth = {
	// 获取全局配置
	crm_getShopSet: (data, ifLoad = false) => {
		return http.request({
			url: '/api/Shop/ShopHome/GetShopSetting',
			method: 'GET',
			data,
			// handle:true
		}, ifLoad)
	},
	// 获取全局配置
	crm_getSetConfig: (data, ifLoad = false) => {
		return http.request({
			url: '/api/Shop/ShopHome/GetShopConfig',
			method: 'GET',
			data,
			// handle:true
		}, ifLoad)
	},
	// 获取验证码
	getVerificateCode: (data, ifLoad = false) => {
		return http.request({
			url: '/api/Msg/SendVerificationCode',
			method: 'POST',
			data,
			// handle:true
		}, ifLoad)
	},
	// 微信api
	GetWxJsApiConfig:(data) => {
	    return http.request({
	        url: '/api/Auth/GetJsApiConfig',
	        method: 'POST', 
	        data,
			// handle:true
	    })
	},
	// code获取OpenId
	GetOpenId: (data, ifLoad = false) => {
		return http.request({
			url: '/api/Auth/GetOpenId', 
			method: 'POST',
			data,
			// handle:true
		}, ifLoad)
	},
	// 登录
	userLogin: (data, ifLoad = false) => {
		return http.request({
			url: '/api/Auth/GetApiToken',
			method: 'POST',
			data,
			// handle:true
		}, ifLoad)
	},
	// 快捷登录
	shortcutToken: (data, ifLoad = false) => {
		return http.request({
			url: '/api/Auth/ShortcutToken',
			method: 'GET',
			data,
			// handle:true
		}, ifLoad)
	},
	// OpenId登录
	WxTokenLogin: (data, ifLoad = false) => {
		return http.request({
			url: '/api/Auth/WxToken',
			method: 'POST',
			data,
			// handle:true
		}, ifLoad)
	},
	// 注册用户 
	userRegiste: (data, ifLoad = false) => {
		return http.request({
			url: '/api/Auth/Registe',
			method: 'POST',
			data,
			// handle:true
		}, ifLoad)
	},
	// 忘记密码
	findPassword: (data, ifLoad = false) => {
		return http.request({
			url: '/api/Crm/RzMyManage/SetLoginPwd',
			method: 'POST',
			data,
			// handle:true
		}, ifLoad)
	},
	// 获取用户信息
	getConsumer: (data, ifLoad = false) => {
		return http.request({
			url: '/api/Crm/RzMyManage/GetInfo',
			method: 'GET',
			data,
			// handle:true
		}, ifLoad)
	},
	
	//更新用户信息
	userInfoUpdate: (data, ifLoad = false) => {
		return http.request({
			url: '/api/Shop/ShopMyManage/SetUserInfo',
			method: 'POST',
			data,
			// handle:true
		}, ifLoad)
	},
	// 设置支付密码
	SettingPayPassword: (data, ifLoad = false) => {
		return http.request({
			url: '/api/Consumer/SettingPayPassword',
			method: 'POST',
			data,
			// handle:true
		}, ifLoad)
	},
	// 微信绑定手机号
	BindWxUserMobile: (data, ifLoad = false) => {
		return http.request({
			url: '/api/Auth/BindWxUserMobile',
			method: 'POST',
			data,
			// handle:true
		}, ifLoad)
	},
	
	// 支付
	toPayment: (data, ifLoad = false) => {
		return http.request({
			url: '/api/Shop/Pay/Payment',
			method: 'POST',
			data,
			// handle:true
		}, ifLoad)
	},
	
	
// 	=============商家部分\\\



	// 获取商家信息
	GetBusinessInfo: (data, ifLoad = false) => {
		return http.request({
			url: '/api/Shop/GetBusinessInfo',
			method: 'GET',
			data,
			// handle:true
		}, ifLoad)
	},
	// 修改商家信息
	BusinessEditor: (data, ifLoad = false) => {
		return http.request({
			url: '/api/Shop/BusinessEditor',
			method: 'POST',
			data,
			// handle:true
		}, ifLoad)
	},
	
	
	//=============== 全局=================
	
	// 获取全局配置
	getConfig: (data, ifLoad = false) => {
		return http.request({
			url: '/api/Service/Config',
			method: 'GET',
			data,
			// handle:true
		}, ifLoad)
	},
	
	// app更新
	VersionCheck: (data, ifLoad = false) => {
		return http.request({
			url: '/api/AppVersion/VersionCheck',
			method: 'POST',
			data,
			// handle:true
		}, ifLoad)
	},
	
	// 手机号登录
	MobileToken: (data, ifLoad = false) => {
		return http.request({
			url: '/api/Auth/MobileToken',
			method: 'POST',
			data,
			// handle:true
		}, ifLoad)
	},
}
export default Auth
