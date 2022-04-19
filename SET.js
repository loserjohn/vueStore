
// 全局设置

let m = window.location.origin
console.log('gloabal',window.location,window.location.origin)
export default {
	// baseUrl:'http://model.fjdmll.com',
	baseUrl:'http://h5.gllo.com.cn',
	// baseUrl:'http://gbb_1.fjdmll.com:7000',
	// baseUrl:'http://www.shaoshifire.com',
	// baseUrl:'',
	// mainUrl:'http://model.fjdmll.com'
	mainUrl:m,
	
	
	// wx_appid: 'wx2180dbc186281a90',    //微信授权 洁利来商城appid  
	// wx_appid: 'wx650fd9ebbb6de069',  //洁利来商城
	wx_appid: 'wx73ea2c1ca903ba43',   //jjl
	// wx_redirect_url: 'http://model.fjdmll.com/store/index.html',   //微信授权 回调页地址
	wx_redirect_url: m+'/store/index.html',
	   
	   
	// 测试环境
	// wx_appid: 'wx09daee2f47e178aa',    //微信授权 appid  測試公衆號
	// wx_redirect_url:'http://192.168.1.6:8080',
	
	
	tokenName:'rz_token', //储存的token名字
	opIdName:'rz_opendId',
	wxInfoName:'rz_wxInfo',
	globalSetName:'rz_globalSet',	
	
	
	versionUrl:'/api/AppVersion/VersionCheck'   //app版本检测url   // 1是不更新 2是强制更新 3可选择更新 4//appstore更新
}