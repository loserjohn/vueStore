(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-user-person-person"],{"08bf":function(e,n,t){var a=t("ee71");"string"===typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);var r=t("4f06").default;r("4ef95cd9",a,!0,{sourceMap:!1,shadowMode:!1})},3898:function(e,n,t){"use strict";t.d(n,"b",(function(){return r})),t.d(n,"c",(function(){return s})),t.d(n,"a",(function(){return a}));var a={tuiIcon:t("1b57").default,tuiButton:t("2de0").default},r=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("v-uni-view",{staticClass:"pages"},[t("v-uni-view",{staticClass:"main"},[t("v-uni-view",{staticClass:"cu-form-group flex flex_center",on:{click:function(n){arguments[0]=n=e.$handleEvent(n),e._chooseAvatar.apply(void 0,arguments)}}},[t("v-uni-view",{staticClass:"title f1"},[e._v("头像")]),t("v-uni-image",{staticClass:"avatar",attrs:{src:e.accountInfo.consumer_head,mode:"aspectFill"}}),t("tui-icon",{attrs:{name:"arrowright",size:16}})],1),t("v-uni-view",{staticClass:"cu-form-group flex flex_center"},[t("v-uni-view",{staticClass:"title"},[e._v("微信昵称")]),t("v-uni-input",{staticClass:"cm_tex_r f1",attrs:{placeholder:"请输入新昵称",name:"input",type:"text"},model:{value:e.formParams.consumer_nick_name,callback:function(n){e.$set(e.formParams,"consumer_nick_name",n)},expression:"formParams.consumer_nick_name"}})],1),t("v-uni-view",{staticClass:"cu-form-group flex flex_center"},[t("v-uni-view",{staticClass:"title"},[e._v("手机号")]),t("v-uni-view",{staticClass:"cm_tex_r f1"},[e._v(e._s(e.usrMsg.consumer_mobile))])],1)],1),t("v-uni-view",{staticStyle:{"margin-top":"72rpx",padding:"0 20rpx"}},[t("tui-button",{attrs:{type:"primary",shape:"circle",loading:e.loading},on:{click:function(n){arguments[0]=n=e.$handleEvent(n),e._updateUserInfo.apply(void 0,arguments)}}},[e._v("保存修改")])],1)],1)},s=[]},"497a":function(e,n,t){"use strict";t.r(n);var a=t("3898"),r=t("c8e7");for(var s in r)"default"!==s&&function(e){t.d(n,e,(function(){return r[e]}))}(s);t("8438e");var i,o=t("f0c5"),c=Object(o["a"])(r["default"],a["b"],a["c"],!1,null,"2359b9d2",null,!1,a["a"],i);n["default"]=c.exports},"8438e":function(e,n,t){"use strict";var a=t("08bf"),r=t.n(a);r.a},bc1a:function(e,n,t){"use strict";(function(e){var a=t("4ea4");Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0,t("96cf");var r=a(t("1da1")),s=(a(t("8ee3")),{data:function(){return{formParams:{consumer_nick_name:"",consumer_head:""},loading:!1}},onLoad:function(){var e=this.$store.state.accountInfo;this.formParams.consumer_nick_name=e.consumer_nick_name,this.formParams.consumer_head=e.consumer_head},computed:{usrMsg:function(){return this.$store.state.accountInfo}},methods:{updatedPhone:function(){uni.navigateTo({url:"/pages/role/replacePhone/replacePhone"})},_chooseAvatar:function(){var e=this;uni.chooseImage({count:1,sizeType:["original","compressed"],success:function(n){e._upload(n.tempFilePaths).then((function(n){e.updatedUser({consumer_head:n})})).catch((function(n){e.$ui.toast("上传失败")}))}})},_updateUserInfo:function(){this.updatedUser({consumer_nick_name:this.formParams.consumer_nick_name})},updatedUser:function(e){var n=this;return(0,r.default)(regeneratorRuntime.mark((function t(){var a,r,s;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return a=n,r=Object.assign({},n.formParams,e),t.prev=2,a.$ui.showloading(),t.next=6,n.$api.userInfoUpdate(r);case 6:if(s=t.sent,a.$ui.hideloading(),1!==s.result){t.next=13;break}a.$ui.toast("更新成功"),a.$store.dispatch("refreshUser"),t.next=14;break;case 13:throw new Error(s.msg);case 14:t.next=19;break;case 16:t.prev=16,t.t0=t["catch"](2),a.$ui.toast(t.t0);case 19:case"end":return t.stop()}}),t,null,[[2,16]])})))()},_sureUpdated:function(){var n=this;uni.showModal({title:"邵氏消防商城提醒你",content:"是否提交修改",success:function(t){t.confirm?n._updateUserInfo():t.cancel&&e.log("用户点击取消")}})},_loginOut:function(){}}});n.default=s}).call(this,t("5a52")["default"])},c8e7:function(e,n,t){"use strict";t.r(n);var a=t("bc1a"),r=t.n(a);for(var s in a)"default"!==s&&function(e){t.d(n,e,(function(){return a[e]}))}(s);n["default"]=r.a},ee71:function(e,n,t){var a=t("24fb");n=a(!1),n.push([e.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.pages .main[data-v-2359b9d2]{background:#fff;padding:0 %?20?%}.pages .main .cu-form-group[data-v-2359b9d2]{border-bottom:%?1?% solid #e5e5e5;min-height:%?88?%;line-height:%?88?%}.pages .main .cu-form-group .avatar[data-v-2359b9d2]{width:%?70?%;height:%?70?%;border-radius:50%}.pages .main .cu-form-group[data-v-2359b9d2]:last-child{border-bottom:none}',""]),e.exports=n}}]);