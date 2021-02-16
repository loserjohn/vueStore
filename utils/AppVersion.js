import SET from '../SET.js'
import autoUpdater from '@/utils/autoUpdater.min.js';
const AppVersion = {
	updatedInfo:'',
	
	// 检查更新
	async checkVersion() {
		let that = this;
		const app = uni.getSystemInfoSync()
		const Platform = app.platform
		// let this.updatedInfo = ''
		let data = {
			version: app.version
		};
		// alert(0)
		try {
			uni.request({
				url: SET.baseUrl + SET.versionUrl, //仅为示例，并非真实接口地址。
				method: 'POST',
				data: data,
				header: {
					'Content-Type': 'application/json'
				},
				success: response => {
					// alert(2)
					// console.log(response.data);
					let statusCode = response.statusCode;
					if (statusCode == 200 && response.data.Success) {
						let res = {};
						res.data = response.data.Data;
						// 记录app状态
						if (Platform == 'android' && res.data.android_update_type != 1) {
							that.updatedInfo = {
								packageUrl: res.data.android_url_net,
								content: '发现新版本:' + res.data.android_Version + '\n' + res.data.android_update_info ? res.data.android_update_info :
									''
							};
							// 1是不更新 2是强制更新 3可选择更新 4//appstore更新
							if (res.data.android_update_type == 2) {
								that.initUpdated(true);
							} else if (res.data.android_update_type == 3) {
								that.initUpdated(false);
							} else if (res.data.android_update_type == 4) {
								// 使用appstore更新
								that.initUpdated(false, true);
							}
						} else if (Platform == 'ios' && res.data.ios_update_type != 1) {
							that.updatedInfo = {
								packageUrl: res.data.ios_url_net,
								content: '发现新版本' + res.data.ios_Version + '\n' + res.data.ios_update_info ? res.data.ios_update_info : ''
							};
							// 1是不更新 2是强制更新 3可选择更新 4//appstore更新
							if (res.data.ios_update_type == 2) {
								that.initUpdated(true);
							} else if (res.data.ios_update_type == 3) {
								that.initUpdated(false);
							} else if (res.data.ios_update_type == 4) {
								// 使用appstore更新
								that.initUpdated(false, true);
							}
						} else {
							// that.autoLogin();
						}
					} else {
						// that.autoLogin();
					}
					that.autoLogin();
				},
				fail(err) {
					// console.log(err);
					that.autoLogin();
				}
			});
		} catch (e) {
			that.autoLogin();
		}
	},
	initUpdated(ifForce, browser) {
		// #ifdef APP-PLUS
		autoUpdater.init({
			packageUrl: this.updatedInfo.packageUrl,
			content: this.updatedInfo.content,
			browser: browser,
			ifForce: ifForce
		});
		autoUpdater.show(ifForce);
		// #endif
	},

}
export default AppVersion
