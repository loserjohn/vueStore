(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-land-land"],{"0550":function(e,t,a){"use strict";var n;a.d(t,"b",(function(){return i})),a.d(t,"c",(function(){return r})),a.d(t,"a",(function(){return n}));var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-uni-view",{staticClass:"pages"},[n("v-uni-view",{staticClass:"flex flex_center header"},[n("v-uni-image",{staticClass:"logo",attrs:{src:a("7965"),mode:"scaleToFill"}}),n("v-uni-view",{staticClass:"cm_title f1"},[e._v("洁利来商城")]),n("v-uni-button",{staticClass:"tapIn",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e._href(3,"")}}},[e._v("进入商城")])],1),e._l(e.tops,(function(t,a){return[n("v-uni-view",{key:a+"_0",staticClass:"blocks",class:{top1:0==a},on:{click:function(a){arguments[0]=a=e.$handleEvent(a),e._href(4,t)}}},[n("v-uni-image",{staticClass:"blocks",attrs:{src:t.link_file,mode:"widthFix"}})],1)]}))],2)},r=[]},"0cc1":function(e,t,a){var n=a("ac19");"string"===typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);var i=a("4f06").default;i("5abb2a34",n,!0,{sourceMap:!1,shadowMode:!1})},"4d2b":function(e,t,a){"use strict";a.r(t);var n=a("c4a2"),i=a.n(n);for(var r in n)"default"!==r&&function(e){a.d(t,e,(function(){return n[e]}))}(r);t["default"]=i.a},7965:function(e,t,a){e.exports=a.p+"static/img/logo.79d9b6e9.jpg"},"82de":function(e,t,a){"use strict";a.r(t);var n=a("0550"),i=a("4d2b");for(var r in i)"default"!==r&&function(e){a.d(t,e,(function(){return i[e]}))}(r);a("896a");var o,s=a("f0c5"),c=Object(s["a"])(i["default"],n["b"],n["c"],!1,null,"c9d517e2",null,!1,n["a"],o);t["default"]=c.exports},"896a":function(e,t,a){"use strict";var n=a("0cc1"),i=a.n(n);i.a},ac19:function(e,t,a){var n=a("24fb");t=n(!1),t.push([e.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.pages .top1[data-v-c9d517e2]{margin-top:0}.pages .header[data-v-c9d517e2]{height:%?100?%;line-height:%?100?%;padding:0 %?20?%;margin-bottom:1vw}.pages .header .logo[data-v-c9d517e2]{width:%?80?%;height:%?80?%;border-radius:50%;margin-right:%?20?%}.pages .header .tapIn[data-v-c9d517e2]{height:%?60?%;line-height:%?60?%;padding:0 %?40?%;border-radius:%?30?%;background:-webkit-linear-gradient(45deg,#ec6434,#eb4434);background:linear-gradient(45deg,#ec6434,#eb4434);color:#fff}.pages .blocks[data-v-c9d517e2]{width:%?750?%;height:auto;margin-top:-1vw}.pages .itemBox .itemTop[data-v-c9d517e2]{width:%?750?%;height:%?160?%}.pages .itemBox .itemPic[data-v-c9d517e2]{width:100%;height:100%}.pages .itemBox .price[data-v-c9d517e2]{font-size:%?56?%;font-weight:bolder;margin-right:%?28?%}.pages .itemBox .textBox[data-v-c9d517e2]{height:%?160?%;padding:0 %?30?%;background:#fff}.pages .cm_tags[data-v-c9d517e2]{width:%?264?%;height:%?80?%;line-height:%?80?%}.pages .cm_tags.hot[data-v-c9d517e2]{background:#ea3333;border-color:#ea3333}.pages .asideBar[data-v-c9d517e2]{width:%?90?%;height:%?90?%;border-radius:50%;background:var(--cl_primary);position:fixed;left:%?40?%;top:%?40?%;z-index:50}',""]),e.exports=t},c4a2:function(e,t,a){"use strict";var n=a("4ea4");a("99af"),a("ac1f"),a("466d"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("96cf");var i=n(a("1da1")),r={data:function(){return{tops:[],list:[],formParams:{pageIndex:1,pageSize:100}}},onLoad:function(){this._loadData()},computed:{hasLogin:function(){return!!this.$store.state.hasLogin&&this.$store.state.hasLogin}},methods:{is_weixn:function(){var e=navigator.userAgent.toLowerCase();return"micromessenger"==e.match(/MicroMessenger/i)},ifAuth:function(){var e=window.location.href,t=e.match(/code=(.*)&state/);t?this._getAuth(t[1]):Utils.wx_auth()},_href:function(e,t){1==e?uni.navigateTo({url:"/pages/classify/products_s/products_s?code=".concat(t.project_class_code,"&title=").concat(t.class_name)}):2==e?uni.navigateTo({url:"/pages/main/details/details?code="+t.project_code}):3==e?uni.switchTab({url:"/pages/main/main"}):t.link_url&&uni.navigateTo({url:t.link_url}),uni.removeStorageSync("hrefAction"),uni.removeStorageSync("hrefItem")},_getAuth:function(e){var t=this;return(0,i.default)(regeneratorRuntime.mark((function a(){var n,i;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(n=t,e){a.next=3;break}return a.abrupt("return");case 3:return a.prev=3,a.next=6,t.$api.userRegiste({mobile:"",password:"",type:"0",invitation:"",website:"",vilidate:"",wx_code:e},!0);case 6:i=a.sent,1==i.result?(uni.setStorageSync(SET.opIdName,i.data.openId),n._oIdLogin(i.data.openId)):(uni.showToast({icon:"none",title:"获取身份失败，请手动登录"}),uni.navigateTo({url:"/pages/role/pLogin/pLogin"})),a.next=13;break;case 10:a.prev=10,a.t0=a["catch"](3),console.log("请求结果false_getAuth : "+a.t0);case 13:case"end":return a.stop()}}),a,null,[[3,10]])})))()},_oIdLogin:function(e){var t=this;return(0,i.default)(regeneratorRuntime.mark((function a(){var n,i,r,o,s;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(n=t,e){a.next=3;break}return a.abrupt("return");case 3:return i={openId:e},a.prev=4,a.next=7,t.$api.WxTokenLogin(i,!1);case 7:r=a.sent,1==r.result?(n.$ui.toast("登陆成功"),console.log("登陆成功"),r.data.hp&&uni.setStorageSync(SET.tokenName,r.data.hp),n.$store.commit("login"),o=uni.getStorageSync("hrefItem"),s=uni.getStorageSync("hrefAction"),1==s?uni.navigateTo({url:"/pages/classify/products_s/products_s?code=".concat(o.project_class_code,"&title=").concat(o.class_name)}):2==s?uni.navigateTo({url:"/pages/main/details/details?code="+o.project_code}):uni.switchTab({url:"/pages/main/main"}),uni.removeStorageSync("hrefAction"),uni.removeStorageSync("hrefItem")):uni.navigateTo({url:"/pages/role/bund/bund"}),a.next=14;break;case 11:a.prev=11,a.t0=a["catch"](4),console.log("请求结果false _oIdLogin: "+a.t0);case 14:case"end":return a.stop()}}),a,null,[[4,11]])})))()},_loadData:function(e,t){var a=this;return(0,i.default)(regeneratorRuntime.mark((function e(){var n,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return n=a,e.prev=1,e.next=4,a.$api.crm_getHome();case 4:i=e.sent,console.log(i),1==i.result&&(n.tops=i.data.lst_page_detail),e.next=13;break;case 9:e.prev=9,e.t0=e["catch"](1),n.loadStatus="more",t&&t();case 13:t&&t();case 14:case"end":return e.stop()}}),e,null,[[1,9]])})))()}}};t.default=r}}]);