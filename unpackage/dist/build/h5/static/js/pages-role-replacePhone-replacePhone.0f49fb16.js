(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-role-replacePhone-replacePhone"],{"1a0d":function(e,t,n){"use strict";n.d(t,"b",(function(){return i})),n.d(t,"c",(function(){return r})),n.d(t,"a",(function(){return a}));var a={InputGrouds:n("3735").default,tuiIcon:n("1b57").default,tuiButton:n("2de0").default},i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-uni-view",{staticClass:"pages"},[n("v-uni-view",{staticClass:"input-group"},[n("v-uni-view",{staticClass:"formBox"},[n("InputGrouds",{ref:"formInputs",attrs:{inputsArray:e.inputsArray,markWord:!1},on:{focusHandle:function(t){arguments[0]=t=e.$handleEvent(t),e._focusHandle.apply(void 0,arguments)}}}),n("v-uni-view",{staticClass:"flex flex_center noteBox"},[n("tui-icon",{attrs:{name:"circle-fill",color:e.agree?"red":"#666",size:16},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e._agree.apply(void 0,arguments)}}}),n("v-uni-navigator",{staticClass:"note f1",attrs:{url:"/pages/main/note/note?type=0"}},[e._v("《邵氏消防商城隐私政策》")])],1)],1),n("tui-button",{attrs:{type:"primary",shape:"circle",disabled:!1,loading:e.loading},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.bindBund.apply(void 0,arguments)}}},[e._v("立即更换")])],1)],1)},r=[]},3708:function(e,t,n){"use strict";var a=n("8515"),i=n.n(a);i.a},"488f":function(e,t,n){"use strict";(function(e){var a=n("4ea4");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,n("96cf");var i=a(n("1da1")),r=a(n("3735")),o=a(n("4722")),u={data:function(){return{loading:!1,inputsArray:[{type:"phone",id:"mobile",defaultValue:"",iconPic:"../../../static/img/inpus/zc_icon_sj.png",placeholder:"请输入您的手机号"},{type:"phone",id:"nowmobile",defaultValue:"",iconPic:"../../../static/img/inpus/zc_icon_sj.png",placeholder:"请输入您的新手机号"},{type:"verify",id:"vilidate",relevantId:"mobile",iconPic:"../../../static/img/inpus/zc_icon_yzm.png",codeType:1,placeholder:"请输入短信验证码",buttonStyle:"block"}],type:1,agree:!0}},onLoad:function(e){this.inputsArray[0].defaultValue=this.accountInfo.consumer_mobile,this.inputsArray[0].readOnly=!0},components:{InputGrouds:r.default},methods:{_focusHandle:function(){this.hide=!0},bindBund:function(){var t=this;return(0,i.default)(regeneratorRuntime.mark((function n(){var a,i,r,o;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(t.agree){n.next=3;break}return t.$ui.toast("请您阅读并同意《邵氏消防商城隐私政策》有关事项"),n.abrupt("return");case 3:if(a=t.$refs.formInputs.verify(),i=t,r={mobile:"",nowmobile:"",vilidate:""},!a.status){n.next=23;break}return r.mobile=a.data.mobile,r.vilidate=a.data.vilidate,r.nowmobile=a.data.nowmobile,n.prev=10,i.loading=!0,n.next=14,t.$api.ReplaceMobile(r,!0);case 14:o=n.sent,i.loading=!1,1==o.result?(i.$ui.toast("修改成功"),i.$store.dispatch("refreshUser"),uni.navigateBack()):(i.$ui.toast(o.msg),i.loading=!1),n.next=23;break;case 19:n.prev=19,n.t0=n["catch"](10),e.log("请求结果false : "+n.t0),i.loading=!1;case 23:case"end":return n.stop()}}),n,null,[[10,19]])})))()},wxlogin:function(t){var n=this;return(0,i.default)(regeneratorRuntime.mark((function a(){var i,r;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return i=n,a.prev=1,i.loading=!0,a.next=5,n.$api.WxTokenLogin({openId:t},!1);case 5:r=a.sent,i.loading=!1,e.log(r),1==r.result?(i.$ui.toast("登陆成功"),r.data.hp&&uni.setStorageSync(o.default.tokenName,r.data.hp),i.$store.commit("login"),setTimeout((function(){uni.navigateBack({})}),1e3)):(i.$ui.toast(r.msg),i.loading=!1),a.next=15;break;case 11:a.prev=11,a.t0=a["catch"](1),e.log("请求结果false : "+a.t0),i.loading=!1;case 15:case"end":return a.stop()}}),a,null,[[1,11]])})))()},login:function(t){var n=this;return(0,i.default)(regeneratorRuntime.mark((function a(){var i,r,u;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return i=n,r={username:t.mobile,password:t.password,vilidate:"000000"},a.prev=2,i.loading=!0,a.next=6,n.$api.userLogin(r,!1);case 6:u=a.sent,i.loading=!1,e.log(u),1==u.result?(i.$ui.toast("登陆成功"),u.data.hp&&uni.setStorageSync(o.default.tokenName,u.data.hp),uni.setStorageSync("user",r),i.$store.commit("login"),setTimeout((function(){uni.navigateBack({delta:2})}),1e3)):(i.$ui.toast(u.msg),i.loading=!1),a.next=16;break;case 12:a.prev=12,a.t0=a["catch"](2),e.log("请求结果false : "+a.t0),i.loading=!1;case 16:case"end":return a.stop()}}),a,null,[[2,12]])})))()},sendMessage:function(){}}};t.default=u}).call(this,n("5a52")["default"])},7852:function(e,t,n){"use strict";n.r(t);var a=n("1a0d"),i=n("e1a0");for(var r in i)"default"!==r&&function(e){n.d(t,e,(function(){return i[e]}))}(r);n("3708");var o,u=n("f0c5"),s=Object(u["a"])(i["default"],a["b"],a["c"],!1,null,"cf7a9838",null,!1,a["a"],o);t["default"]=s.exports},8515:function(e,t,n){var a=n("8b5d");"string"===typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);var i=n("4f06").default;i("e7c5c4b4",a,!0,{sourceMap:!1,shadowMode:!1})},"8b5d":function(e,t,n){var a=n("24fb");t=a(!1),t.push([e.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.pages[data-v-cf7a9838]{padding:%?30?%;background:#fff}.pages .title[data-v-cf7a9838]{font-size:%?34?%;color:#333;text-align:center;font-weight:600;margin:%?32?% auto %?40?% auto}.pages .formBox[data-v-cf7a9838]{margin-bottom:%?80?%}.pages .formBox .noteBox[data-v-cf7a9838]{height:%?60?%;padding:0 %?20?%}.pages .footer[data-v-cf7a9838]{position:absolute;width:100%;left:0;bottom:0}.pages .footer .line[data-v-cf7a9838]{width:%?50?%;height:%?2?%;color:#333;background:#333}.pages .footer .wxLogin[data-v-cf7a9838]{margin:%?40?% auto %?50?% auto;width:%?90?%;height:%?90?%;border-radius:50%}.pages .footer .wxLogin .wxLoginIcon[data-v-cf7a9838]{width:%?90?%;height:%?90?%}',""]),e.exports=t},e1a0:function(e,t,n){"use strict";n.r(t);var a=n("488f"),i=n.n(a);for(var r in a)"default"!==r&&function(e){n.d(t,e,(function(){return a[e]}))}(r);t["default"]=i.a}}]);