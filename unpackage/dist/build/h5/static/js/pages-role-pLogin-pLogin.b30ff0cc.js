(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-role-pLogin-pLogin"],{"03b4":function(t,e,n){"use strict";n.r(e);var a=n("daf8"),i=n.n(a);for(var s in a)"default"!==s&&function(t){n.d(e,t,(function(){return a[t]}))}(s);e["default"]=i.a},"6b13":function(t,e,n){var a=n("912d");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var i=n("4f06").default;i("46f59de3",a,!0,{sourceMap:!1,shadowMode:!1})},"6b2d":function(t,e,n){"use strict";n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return s})),n.d(e,"a",(function(){return a}));var a={tuiIcon:n("9c13").default,tuiButton:n("a2ae").default,tuiToast:n("1c18").default,tuiTips:n("a1de").default},i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"pages"},[n("v-uni-view",{staticClass:"input-group"},[n("v-uni-view",{staticClass:"cm_title"},[t._v("欢迎登陆睿众商城")]),n("v-uni-view",{staticClass:"cm_des"},[t._v("账户密码登录")]),n("v-uni-view",{staticClass:"formBox"},[n("v-uni-input",{staticClass:"inputs",attrs:{type:"number",placeholder:"请输入手机号码"},model:{value:t.form.username,callback:function(e){t.$set(t.form,"username",e)},expression:"form.username"}}),n("v-uni-input",{staticClass:"inputs",attrs:{type:"password",cleable:!0,placeholder:"请输入密码"},model:{value:t.form.password,callback:function(e){t.$set(t.form,"password",e)},expression:"form.password"}}),n("v-uni-view",{staticClass:"flex flex_center noteBox"},[n("tui-icon",{attrs:{name:"circle-fill",color:t.agree?"#50ab9f":"#666",size:16},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t._agree.apply(void 0,arguments)}}}),n("v-uni-navigator",{staticClass:"note f1",attrs:{url:"/pages/main/note/note?type=1"}},[t._v("《睿众商城隐私政策》")])],1)],1),n("tui-button",{staticStyle:{"margin-top":"80rpx"},attrs:{type:"primary",shape:"circle",disabled:!1,loading:t.loading},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.bindLogin.apply(void 0,arguments)}}},[t._v("登录")]),n("v-uni-view",{staticClass:"flex",staticStyle:{"margin-top":"32rpx"}},[n("v-uni-view",{staticClass:"f1"},[n("v-uni-navigator",{attrs:{url:"../reg/reg"}},[t._v("注册账户")])],1),n("v-uni-view",{staticClass:"f1 cm_tex_r"},[n("v-uni-navigator",{attrs:{url:"../pwd/pwd"}},[t._v("忘记密码?")])],1)],1)],1),n("v-uni-view",{staticClass:"footer  "},[n("v-uni-view",{staticClass:"flex flex_center"},[n("v-uni-view",{staticClass:"line"}),n("v-uni-view",{staticStyle:{margin:"0 16rpx"}},[t._v("快捷登录")]),n("v-uni-view",{staticClass:"line"})],1),n("v-uni-view",{staticClass:"flex flex_center"},[n("v-uni-view",{staticClass:"wxLogin",attrs:{"hover-class":"cm_hover_m"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.wxAuth.apply(void 0,arguments)}}},[n("v-uni-image",{staticClass:"wxLoginIcon",attrs:{src:"/static/img/weact.png",mode:"scaleToFill"}})],1),n("v-uni-view",{staticClass:"wxLogin",attrs:{"hover-class":"cm_hover_m"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t._yzmLogin.apply(void 0,arguments)}}},[n("v-uni-image",{staticClass:"wxLoginIcon",attrs:{src:"/static/img/sy_tx.png",mode:"scaleToFill"}})],1)],1)],1),n("tui-toast",{ref:"toast"}),n("tui-tips",{ref:"tips",attrs:{position:"top"}})],1)},s=[]},"832b":function(t,e,n){"use strict";n.r(e);var a=n("6b2d"),i=n("03b4");for(var s in i)"default"!==s&&function(t){n.d(e,t,(function(){return i[t]}))}(s);n("f5d0");var o,r=n("f0c5"),u=Object(r["a"])(i["default"],a["b"],a["c"],!1,null,"62204ee9",null,!1,a["a"],o);e["default"]=u.exports},"912d":function(t,e,n){var a=n("24fb");e=a(!1),e.push([t.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.pages[data-v-62204ee9]{padding:%?30?%;position:absolute;left:0;right:0;top:0;bottom:0;background:#fff}.pages .input-group[data-v-62204ee9]{padding-top:%?60?%}.pages .input-group .formBox[data-v-62204ee9]{padding-top:%?40?%}.pages .input-group .cm_title[data-v-62204ee9]{line-height:2;font-size:%?40?%}.pages .input-group .inputs[data-v-62204ee9]{border-bottom:%?1?% solid #f1f1f1;margin-top:%?20?%;margin-bottom:%?20?%;line-height:%?60?%;height:%?88?%}.pages .input-group .noteBox[data-v-62204ee9]{margin-top:%?60?%}.pages .footer[data-v-62204ee9]{position:absolute;width:100%;left:0;bottom:0}.pages .footer .line[data-v-62204ee9]{width:%?50?%;height:%?2?%;color:#333;background:#333}.pages .footer .wxLogin[data-v-62204ee9]{margin:%?50?%;width:%?90?%;height:%?90?%;border-radius:50%}.pages .footer .wxLogin .wxLoginIcon[data-v-62204ee9]{width:%?90?%;height:%?90?%}',""]),t.exports=e},daf8:function(t,e,n){"use strict";var a=n("4ea4");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,n("96cf");var i=a(n("1da1")),s=a(n("4d41")),o={data:function(){return{form:{username:"15959131219",password:"",vilidate:"000000",openId:"",wx_code_type:"0"},rule:[{name:"username",rule:["isMobile"],msg:["请输入正确的手机号"]},{name:"password",rule:["required"],msg:["请输入有效密码"]}],loading:!1,agree:!0}},components:{},onLoad:function(){},methods:{_yzmLogin:function(){uni.redirectTo({url:"/pages/role/login/login"})},wxAuth:function(){uni.redirectTo({url:"/pages/role/wxLogin/wxLogin"})},_agree:function(){this.agree=!this.agree},_focusHandle:function(){},bindLogin:function(){var t=this;return(0,i.default)(regeneratorRuntime.mark((function e(){var n,a,i,o,r,u,c;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(n=t,t.agree){e.next=5;break}return a={msg:"请您阅读并同意《睿众商城隐私协议》有关事项",duration:2e3,type:"danger"},t.$refs.tips.showTips(a),e.abrupt("return");case 5:if(i=t.$form.validation(t.form,t.rule),!i.status){e.next=22;break}return e.prev=7,n.loading=!0,e.next=11,t.$api.userLogin(t.form,!1);case 11:o=e.sent,n.loading=!1,1==o.result?(r={title:"登录成功",imgUrl:"/static/img/toast/check-circle.png",icon:!0},n.$refs.toast.show(r),o.data&&uni.setStorageSync(s.default.tokenName,o.data),n.$store.commit("login"),n.$store.dispatch("refreshUser"),setTimeout((function(){uni.navigateBack({})}),1e3)):(u={msg:o.msg,duration:2e3,type:"danger"},n.$refs.tips.showTips(u),n.loading=!1),e.next=20;break;case 16:e.prev=16,e.t0=e["catch"](7),console.log("请求结果false : "+e.t0),n.loading=!1;case 20:e.next=24;break;case 22:c={msg:i.msg,duration:2e3,type:"danger"},t.$refs.tips.showTips(c);case 24:case"end":return e.stop()}}),e,null,[[7,16]])})))()}}};e.default=o},f5d0:function(t,e,n){"use strict";var a=n("6b13"),i=n.n(a);i.a}}]);