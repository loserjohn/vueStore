(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-role-replacePhone-replacePhone"],{"19be":function(e,t,n){"use strict";n.r(t);var a=n("414d"),o=n("dd9f");for(var i in o)"default"!==i&&function(e){n.d(t,e,(function(){return o[e]}))}(i);n("a543");var r,s=n("f0c5"),u=Object(s["a"])(o["default"],a["b"],a["c"],!1,null,"4621a000",null,!1,a["a"],r);t["default"]=u.exports},"1a1f":function(e,t,n){var a=n("24fb");t=a(!1),t.push([e.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.pages[data-v-4621a000]{padding:%?30?%;background:#fff}.pages .title[data-v-4621a000]{font-size:%?34?%;color:#333;text-align:center;font-weight:600;margin:%?32?% auto %?40?% auto}.pages .formBox[data-v-4621a000]{margin-bottom:%?80?%}.pages .formBox .noteBox[data-v-4621a000]{height:%?60?%;padding:0 %?20?%}.pages .footer[data-v-4621a000]{position:absolute;width:100%;left:0;bottom:0}.pages .footer .line[data-v-4621a000]{width:%?50?%;height:%?2?%;color:#333;background:#333}.pages .footer .wxLogin[data-v-4621a000]{margin:%?40?% auto %?50?% auto;width:%?90?%;height:%?90?%;border-radius:50%}.pages .footer .wxLogin .wxLoginIcon[data-v-4621a000]{width:%?90?%;height:%?90?%}',""]),e.exports=t},"414d":function(e,t,n){"use strict";n.d(t,"b",(function(){return o})),n.d(t,"c",(function(){return i})),n.d(t,"a",(function(){return a}));var a={InputGrouds:n("923f").default,tuiIcon:n("9c13").default,tuiButton:n("a2ae").default},o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-uni-view",{staticClass:"pages"},[n("v-uni-view",{staticClass:"input-group"},[n("v-uni-view",{staticClass:"formBox"},[n("InputGrouds",{ref:"formInputs",attrs:{inputsArray:e.inputsArray,markWord:!1},on:{focusHandle:function(t){arguments[0]=t=e.$handleEvent(t),e._focusHandle.apply(void 0,arguments)}}}),n("v-uni-view",{staticClass:"flex flex_center noteBox"},[n("tui-icon",{attrs:{name:"circle-fill",color:e.agree?"red":"#666",size:16},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e._agree.apply(void 0,arguments)}}}),n("v-uni-navigator",{staticClass:"note f1",attrs:{url:"/pages/main/note/note?type=0"}},[e._v("《洁利来商城隐私政策》")])],1)],1),n("tui-button",{attrs:{type:"primary",shape:"circle",disabled:!1,loading:e.loading},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.bindBund.apply(void 0,arguments)}}},[e._v("立即更换")])],1)],1)},i=[]},"6d7d":function(e,t,n){"use strict";var a=n("4ea4");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,n("96cf");var o=a(n("1da1")),i=a(n("923f")),r=a(n("4d41")),s={data:function(){return{loading:!1,inputsArray:[{type:"phone",id:"mobile",defaultValue:"",iconPic:"../../../static/img/inpus/zc_icon_sj.png",placeholder:"请输入您的手机号"},{type:"phone",id:"nowmobile",defaultValue:"",iconPic:"../../../static/img/inpus/zc_icon_sj.png",placeholder:"请输入您的新手机号"},{type:"verify",id:"vilidate",relevantId:"mobile",iconPic:"../../../static/img/inpus/zc_icon_yzm.png",codeType:1,placeholder:"请输入短信验证码",buttonStyle:"block"}],type:1,agree:!0}},onLoad:function(e){this.inputsArray[0].defaultValue=this.accountInfo.consumer_mobile,this.inputsArray[0].readOnly=!0},components:{InputGrouds:i.default},methods:{_focusHandle:function(){this.hide=!0},bindBund:function(){var e=this;return(0,o.default)(regeneratorRuntime.mark((function t(){var n,a,o,i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e.agree){t.next=3;break}return e.$ui.toast("请您阅读并同意《洁利来商城隐私政策》有关事项"),t.abrupt("return");case 3:if(n=e.$refs.formInputs.verify(),a=e,o={mobile:"",nowmobile:"",vilidate:""},!n.status){t.next=23;break}return o.mobile=n.data.mobile,o.vilidate=n.data.vilidate,o.nowmobile=n.data.nowmobile,t.prev=10,a.loading=!0,t.next=14,e.$api.ReplaceMobile(o,!0);case 14:i=t.sent,a.loading=!1,1==i.result?(a.$ui.toast("修改成功"),a.$store.dispatch("refreshUser"),uni.navigateBack()):(a.$ui.toast(i.msg),a.loading=!1),t.next=23;break;case 19:t.prev=19,t.t0=t["catch"](10),console.log("请求结果false : "+t.t0),a.loading=!1;case 23:case"end":return t.stop()}}),t,null,[[10,19]])})))()},wxlogin:function(e){var t=this;return(0,o.default)(regeneratorRuntime.mark((function n(){var a,o;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return a=t,n.prev=1,a.loading=!0,n.next=5,t.$api.WxTokenLogin({openId:e},!1);case 5:o=n.sent,a.loading=!1,console.log(o),1==o.result?(a.$ui.toast("登陆成功"),o.data.hp&&uni.setStorageSync(r.default.tokenName,o.data.hp),a.$store.commit("login"),setTimeout((function(){uni.navigateBack({})}),1e3)):(a.$ui.toast(o.msg),a.loading=!1),n.next=15;break;case 11:n.prev=11,n.t0=n["catch"](1),console.log("请求结果false : "+n.t0),a.loading=!1;case 15:case"end":return n.stop()}}),n,null,[[1,11]])})))()},login:function(e){var t=this;return(0,o.default)(regeneratorRuntime.mark((function n(){var a,o,i;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return a=t,o={username:e.mobile,password:e.password,vilidate:"000000"},n.prev=2,a.loading=!0,n.next=6,t.$api.userLogin(o,!1);case 6:i=n.sent,a.loading=!1,console.log(i),1==i.result?(a.$ui.toast("登陆成功"),i.data.hp&&uni.setStorageSync(r.default.tokenName,i.data.hp),uni.setStorageSync("user",o),a.$store.commit("login"),setTimeout((function(){uni.navigateBack({delta:2})}),1e3)):(a.$ui.toast(i.msg),a.loading=!1),n.next=16;break;case 12:n.prev=12,n.t0=n["catch"](2),console.log("请求结果false : "+n.t0),a.loading=!1;case 16:case"end":return n.stop()}}),n,null,[[2,12]])})))()},sendMessage:function(){}}};t.default=s},a543:function(e,t,n){"use strict";var a=n("ffc3"),o=n.n(a);o.a},dd9f:function(e,t,n){"use strict";n.r(t);var a=n("6d7d"),o=n.n(a);for(var i in a)"default"!==i&&function(e){n.d(t,e,(function(){return a[e]}))}(i);t["default"]=o.a},ffc3:function(e,t,n){var a=n("1a1f");"string"===typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);var o=n("4f06").default;o("78b153b3",a,!0,{sourceMap:!1,shadowMode:!1})}}]);