(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-land-land"],{"00e57":function(e,t,a){"use strict";var n;a.d(t,"b",(function(){return r})),a.d(t,"c",(function(){return i})),a.d(t,"a",(function(){return n}));var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-uni-view",{staticClass:"pages"},[n("v-uni-view",{staticClass:"flex flex_center header"},[n("v-uni-image",{staticClass:"logo",attrs:{src:a("14e6"),mode:"scaleToFill"}}),n("v-uni-view",{staticClass:"cm_title f1"},[e._v("邵氏消防商城")]),n("v-uni-button",{staticClass:"tapIn",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e._href(3,"")}}},[e._v("进入商城")])],1),e._l(e.tops,(function(t,a){return[n("v-uni-view",{key:a+"_0",staticClass:"blocks",class:{top1:0==a},on:{click:function(a){arguments[0]=a=e.$handleEvent(a),e._href(4,t)}}},[n("v-uni-image",{staticClass:"blocks",attrs:{src:t.link_file,mode:"widthFix"}})],1)]}))],2)},i=[]},"0368":function(e,t,a){"use strict";a.r(t);var n=a("00e57"),r=a("a024");for(var i in r)"default"!==i&&function(e){a.d(t,e,(function(){return r[e]}))}(i);a("3f05");var o,s=a("f0c5"),c=Object(s["a"])(r["default"],n["b"],n["c"],!1,null,"47ff4d7a",null,!1,n["a"],o);t["default"]=c.exports},"14e6":function(e,t,a){e.exports=a.p+"static/img/logo.79d9b6e9.jpg"},"3f05":function(e,t,a){"use strict";var n=a("5fe3"),r=a.n(n);r.a},"5fe3":function(e,t,a){var n=a("d9ad");"string"===typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);var r=a("4f06").default;r("b0385498",n,!0,{sourceMap:!1,shadowMode:!1})},a024:function(e,t,a){"use strict";a.r(t);var n=a("ea8b"),r=a.n(n);for(var i in n)"default"!==i&&function(e){a.d(t,e,(function(){return n[e]}))}(i);t["default"]=r.a},d9ad:function(e,t,a){var n=a("24fb");t=n(!1),t.push([e.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.pages .top1[data-v-47ff4d7a]{margin-top:0}.pages .header[data-v-47ff4d7a]{height:%?100?%;line-height:%?100?%;padding:0 %?20?%;margin-bottom:1vw}.pages .header .logo[data-v-47ff4d7a]{width:%?80?%;height:%?80?%;border-radius:50%;margin-right:%?20?%}.pages .header .tapIn[data-v-47ff4d7a]{height:%?60?%;line-height:%?60?%;padding:0 %?40?%;border-radius:%?30?%;background:linear-gradient(45deg,#ec6434,#eb4434);color:#fff}.pages .blocks[data-v-47ff4d7a]{width:%?750?%;height:auto;margin-top:-1vw}.pages .itemBox .itemTop[data-v-47ff4d7a]{width:%?750?%;height:%?160?%}.pages .itemBox .itemPic[data-v-47ff4d7a]{width:100%;height:100%}.pages .itemBox .price[data-v-47ff4d7a]{font-size:%?56?%;font-weight:bolder;margin-right:%?28?%}.pages .itemBox .textBox[data-v-47ff4d7a]{height:%?160?%;padding:0 %?30?%;background:#fff}.pages .cm_tags[data-v-47ff4d7a]{width:%?264?%;height:%?80?%;line-height:%?80?%}.pages .cm_tags.hot[data-v-47ff4d7a]{background:#ea3333;border-color:#ea3333}.pages .asideBar[data-v-47ff4d7a]{width:%?90?%;height:%?90?%;border-radius:50%;background:var(--cl_primary);position:fixed;left:%?40?%;top:%?40?%;z-index:50}',""]),e.exports=t},ea8b:function(e,t,a){"use strict";(function(e){var n=a("4ea4");a("99af"),a("ac1f"),a("466d"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("96cf");var r=n(a("1da1")),i={data:function(){return{tops:[],list:[],formParams:{pageIndex:1,pageSize:100}}},onLoad:function(){this._loadData()},computed:{hasLogin:function(){return!!this.$store.state.hasLogin&&this.$store.state.hasLogin}},methods:{is_weixn:function(){var e=navigator.userAgent.toLowerCase();return"micromessenger"==e.match(/MicroMessenger/i)},ifAuth:function(){var e=window.location.href,t=e.match(/code=(.*)&state/);t?this._getAuth(t[1]):Utils.wx_auth()},_href:function(e,t){1==e?uni.navigateTo({url:"/pages/classify/products_s/products_s?code=".concat(t.project_class_code,"&title=").concat(t.class_name)}):2==e?uni.navigateTo({url:"/pages/main/details/details?code="+t.project_code}):3==e?uni.switchTab({url:"/pages/main/main"}):t.link_url&&uni.navigateTo({url:t.link_url}),uni.removeStorageSync("hrefAction"),uni.removeStorageSync("hrefItem")},_getAuth:function(t){var a=this;return(0,r.default)(regeneratorRuntime.mark((function n(){var r,i;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(r=a,t){n.next=3;break}return n.abrupt("return");case 3:return n.prev=3,n.next=6,a.$api.userRegiste({mobile:"",password:"",type:"0",invitation:"",website:"",vilidate:"",wx_code:t},!0);case 6:i=n.sent,1==i.result?(uni.setStorageSync(SET.opIdName,i.data.openId),r._oIdLogin(i.data.openId)):(uni.showToast({icon:"none",title:"获取身份失败，请手动登录"}),uni.navigateTo({url:"/pages/role/pLogin/pLogin"})),n.next=13;break;case 10:n.prev=10,n.t0=n["catch"](3),e.log("请求结果false_getAuth : "+n.t0);case 13:case"end":return n.stop()}}),n,null,[[3,10]])})))()},_oIdLogin:function(t){var a=this;return(0,r.default)(regeneratorRuntime.mark((function n(){var r,i,o,s,c;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(r=a,t){n.next=3;break}return n.abrupt("return");case 3:return i={openId:t},n.prev=4,n.next=7,a.$api.WxTokenLogin(i,!1);case 7:o=n.sent,1==o.result?(r.$ui.toast("登陆成功"),e.log("登陆成功"),o.data.hp&&uni.setStorageSync(SET.tokenName,o.data.hp),r.$store.commit("login"),s=uni.getStorageSync("hrefItem"),c=uni.getStorageSync("hrefAction"),1==c?uni.navigateTo({url:"/pages/classify/products_s/products_s?code=".concat(s.project_class_code,"&title=").concat(s.class_name)}):2==c?uni.navigateTo({url:"/pages/main/details/details?code="+s.project_code}):uni.switchTab({url:"/pages/main/main"}),uni.removeStorageSync("hrefAction"),uni.removeStorageSync("hrefItem")):uni.navigateTo({url:"/pages/role/bund/bund"}),n.next=14;break;case 11:n.prev=11,n.t0=n["catch"](4),e.log("请求结果false _oIdLogin: "+n.t0);case 14:case"end":return n.stop()}}),n,null,[[4,11]])})))()},_loadData:function(t,a){var n=this;return(0,r.default)(regeneratorRuntime.mark((function t(){var r,i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return r=n,t.prev=1,t.next=4,n.$api.crm_getHome();case 4:i=t.sent,e.log(i),1==i.result&&(r.tops=i.data.lst_page_detail),t.next=13;break;case 9:t.prev=9,t.t0=t["catch"](1),r.loadStatus="more",a&&a();case 13:a&&a();case 14:case"end":return t.stop()}}),t,null,[[1,9]])})))()}}};t.default=i}).call(this,a("5a52")["default"])}}]);