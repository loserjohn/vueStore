(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-role-login-login"],{"4aee":function(t,a,n){var e=n("a17f");"string"===typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);var i=n("4f06").default;i("e370cbc6",e,!0,{sourceMap:!1,shadowMode:!1})},"554f":function(t,a,n){"use strict";n.r(a);var e=n("afea"),i=n.n(e);for(var o in e)"default"!==o&&function(t){n.d(a,t,(function(){return e[t]}))}(o);a["default"]=i.a},"70e6":function(t,a,n){"use strict";n.r(a);var e=n("b314"),i=n("554f");for(var o in i)"default"!==o&&function(t){n.d(a,t,(function(){return i[t]}))}(o);n("8aa1");var r,u=n("f0c5"),s=Object(u["a"])(i["default"],e["b"],e["c"],!1,null,"37a98a33",null,!1,e["a"],r);a["default"]=s.exports},"8aa1":function(t,a,n){"use strict";var e=n("4aee"),i=n.n(e);i.a},a17f:function(t,a,n){var e=n("24fb");a=e(!1),a.push([t.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.pages[data-v-37a98a33]{padding:%?30?%;background:#fff}.pages .input-group[data-v-37a98a33]{padding-top:%?60?%}.pages .input-group .cm_title[data-v-37a98a33]{line-height:2;font-size:%?40?%}.pages .input-group .inputs[data-v-37a98a33]{border-bottom:%?1?% solid #f1f1f1;margin-top:%?100?%;margin-bottom:%?80?%;line-height:%?88?%;height:%?88?%}.pages .logo[data-v-37a98a33]{width:%?146?%;height:%?146?%;border-radius:%?16?%;margin-top:%?56?%}.pages .title[data-v-37a98a33]{font-size:%?34?%;color:#333;text-align:center;font-weight:600;margin:%?24?% auto %?54?% auto}.pages .formBox[data-v-37a98a33]{margin-bottom:%?80?%}.pages .formBox .noteBox[data-v-37a98a33]{height:%?60?%;padding:0 %?20?%}.pages .footer[data-v-37a98a33]{position:absolute;width:100%;left:0;bottom:0}.pages .footer .line[data-v-37a98a33]{width:%?50?%;height:%?2?%;color:#333;background:#333}.pages .footer .wxLogin[data-v-37a98a33]{margin:%?40?% auto %?50?% auto;width:%?90?%;height:%?90?%;border-radius:50%}.pages .footer .wxLogin .wxLoginIcon[data-v-37a98a33]{width:%?90?%;height:%?90?%}',""]),t.exports=a},afea:function(t,a,n){"use strict";var e=n("4ea4");Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0,n("96cf");var i=e(n("1da1")),o=e(n("923f")),r=e(n("11bd")),u={data:function(){return{inputsArray:[{type:"phone",id:"username",defaultValue:"",iconPic:"../../../static/img/inpus/zc_icon_sj.png",placeholder:"请输入您的手机号"},{type:"verify",id:"vilidate",relevantId:"mobile",iconPic:"../../../static/img/inpus/zc_icon_yzm.png",codeType:1,placeholder:"请输入短信验证码",buttonStyle:"block"}],set:{appid:"wxbb1e69472b847c6e",redirect_uri:"http://jf.fjdmll.com/index.html"},loading:!1,agree:!0,phone:""}},components:{InputGrouds:o.default},onLoad:function(){uni.getStorageSync("user")},methods:{_agree:function(){this.agree=!this.agree},_focusHandle:function(){},bindLogin:function(){var t=this;return(0,i.default)(regeneratorRuntime.mark((function a(){return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(r.default.phoneCheck(t.phone)){a.next=3;break}return uni.showToast({icon:"none",title:"请输入正确手机号"}),a.abrupt("return");case 3:uni.navigateTo({url:"../loginNext/loginNext?phone="+t.phone});case 4:case"end":return a.stop()}}),a)})))()}}};a.default=u},b314:function(t,a,n){"use strict";n.d(a,"b",(function(){return i})),n.d(a,"c",(function(){return o})),n.d(a,"a",(function(){return e}));var e={tuiButton:n("a2ae").default},i=function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("v-uni-view",{staticClass:"pages"},[n("v-uni-view",{staticClass:"input-group"},[n("v-uni-view",{staticClass:"cm_title"},[t._v("欢迎登陆睿众商城")]),n("v-uni-view",{staticClass:"cm_des"},[t._v("通过手机号验证码登录")]),n("v-uni-view",{staticClass:"formBox"},[n("v-uni-input",{staticClass:"inputs",attrs:{type:"number",placeholder:"请输入手机号码"},model:{value:t.phone,callback:function(a){t.phone=a},expression:"phone"}})],1),n("tui-button",{attrs:{type:"primary",shape:"circle",disabled:!1,loading:t.loading},on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.bindLogin.apply(void 0,arguments)}}},[t._v("手机号登录")]),n("v-uni-view",{staticClass:"flex",staticStyle:{"margin-top":"32rpx"}},[n("v-uni-view",{staticClass:"f1 "},[n("v-uni-navigator",{attrs:{url:"../pLogin/pLogin"}},[t._v("密码登录")])],1),n("v-uni-view",{staticClass:"f1 cm_tex_r"},[n("v-uni-navigator",{attrs:{url:"../reg/reg"}},[t._v("注册账户")])],1)],1)],1)],1)},o=[]}}]);