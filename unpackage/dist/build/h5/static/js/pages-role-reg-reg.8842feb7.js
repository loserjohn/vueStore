(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-role-reg-reg"],{4864:function(e,t,n){var a=n("8901");"string"===typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);var i=n("4f06").default;i("1abe7715",a,!0,{sourceMap:!1,shadowMode:!1})},"7f8f":function(e,t,n){"use strict";var a=n("4ea4");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,n("96cf");var i=a(n("1da1")),o=a(n("923f")),r=a(n("4d41")),s={data:function(){return{loading:!1,inputsArray:[{type:"phone",id:"mobile",defaultValue:"",iconPic:"../../../static/img/inpus/zc_icon_sj.png",placeholder:"请输入您的手机号"},{type:"password",id:"password",markWord:!0,iconPic:"../../../static/img/inpus/zc_icon_mm.png",placeholder:"请输入您的密码"},{type:"verify",id:"vilidate",relevantId:"mobile",iconPic:"../../../static/img/inpus/zc_icon_yzm.png",codeType:1,placeholder:"请输入短信验证码",buttonStyle:"block"}],type:1,agree:!0}},onLoad:function(e){2==e.type&&(this.type=2)},components:{InputGrouds:o.default},methods:{_focusHandle:function(){this.hide=!0},bindRegiste:function(){var e=this;return(0,i.default)(regeneratorRuntime.mark((function t(){var n,a,i,o;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e.agree){t.next=3;break}return e.$ui.toast("请您阅读并同意《洁利来商城隐私政策》有关事项"),t.abrupt("return");case 3:if(n=e.$refs.formInputs.verify(),a=e,uni.getStorageSync(r.default.opIdName),i={mobile:"",password:"",registe_type:"0",user_type:"3",invitation:"",vilidate:"",openId:"",wx_code_type:"0",nickname:"",headimgurl:""},!n.status){t.next=24;break}return i.mobile=n.data.mobile,i.password=n.data.password,i.vilidate=n.data.vilidate,t.prev=11,a.loading=!0,t.next=15,e.$api.userRegiste(i,!0);case 15:o=t.sent,a.loading=!1,1==o.result?(console.log(o),a.$ui.toast("注册成功，欢迎使用"),o.data&&uni.setStorageSync(r.default.tokenName,o.data),a.$store.commit("login"),a.$store.dispatch("refreshUser"),setTimeout((function(){uni.switchTab({url:"/pages/user/user"})}),1e3)):(a.$ui.toast(o.msg),a.loading=!1),t.next=24;break;case 20:t.prev=20,t.t0=t["catch"](11),console.log("请求结果false : "+t.t0),a.loading=!1;case 24:case"end":return t.stop()}}),t,null,[[11,20]])})))()},sendMessage:function(){}}};t.default=s},8901:function(e,t,n){var a=n("24fb");t=a(!1),t.push([e.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.pages[data-v-36bf5e50]{padding:%?30?%;background:#fff}.pages .title[data-v-36bf5e50]{font-size:%?34?%;color:#333;text-align:center;font-weight:600;margin:%?32?% auto %?40?% auto}.pages .formBox[data-v-36bf5e50]{margin-bottom:%?80?%}.pages .formBox .noteBox[data-v-36bf5e50]{height:%?60?%;padding:0 %?20?%}.pages .footer[data-v-36bf5e50]{position:absolute;width:100%;left:0;bottom:0}.pages .footer .line[data-v-36bf5e50]{width:%?50?%;height:%?2?%;color:#333;background:#333}.pages .footer .wxLogin[data-v-36bf5e50]{margin:%?40?% auto %?50?% auto;width:%?90?%;height:%?90?%;border-radius:50%}.pages .footer .wxLogin .wxLoginIcon[data-v-36bf5e50]{width:%?90?%;height:%?90?%}',""]),e.exports=t},b314:function(e,t,n){"use strict";var a=n("4864"),i=n.n(a);i.a},bb73:function(e,t,n){"use strict";n.r(t);var a=n("ee13"),i=n("d84d");for(var o in i)"default"!==o&&function(e){n.d(t,e,(function(){return i[e]}))}(o);n("b314");var r,s=n("f0c5"),u=Object(s["a"])(i["default"],a["b"],a["c"],!1,null,"36bf5e50",null,!1,a["a"],r);t["default"]=u.exports},d84d:function(e,t,n){"use strict";n.r(t);var a=n("7f8f"),i=n.n(a);for(var o in a)"default"!==o&&function(e){n.d(t,e,(function(){return a[e]}))}(o);t["default"]=i.a},ee13:function(e,t,n){"use strict";n.d(t,"b",(function(){return i})),n.d(t,"c",(function(){return o})),n.d(t,"a",(function(){return a}));var a={InputGrouds:n("923f").default,tuiIcon:n("9c13").default,tuiButton:n("a2ae").default},i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-uni-view",{staticClass:"pages"},[n("v-uni-view",{staticClass:"input-group"},[n("v-uni-view",{staticClass:"formBox"},[n("InputGrouds",{ref:"formInputs",attrs:{inputsArray:e.inputsArray,markWord:!1},on:{focusHandle:function(t){arguments[0]=t=e.$handleEvent(t),e._focusHandle.apply(void 0,arguments)}}}),n("v-uni-view",{staticClass:"flex flex_center noteBox"},[n("tui-icon",{attrs:{name:"circle-fill",color:e.agree?"#50ab9f":"#666",size:16},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e._agree.apply(void 0,arguments)}}}),n("v-uni-navigator",{staticClass:"note f1",attrs:{url:"/pages/main/note/note?type=0"}},[e._v("《洁利来商城隐私政策》")])],1)],1),n("tui-button",{attrs:{type:"primary",shape:"circle",disabled:!1,loading:e.loading},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.bindRegiste.apply(void 0,arguments)}}},[e._v("注册")])],1)],1)},o=[]}}]);