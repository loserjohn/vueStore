(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-features-createOrder-createOrder"],{"02b9":function(e,t,i){"use strict";var s=i("4ea4");i("4160"),i("a15b"),i("d81d"),i("13d5"),i("a9e3"),i("b680"),i("07ac"),i("159b"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,i("96cf");var r=s(i("1da1")),a=s(i("5530")),n=s(i("ade3")),o=s(i("7798")),c=s(i("f084")),u=s(i("6bc7")),l=s(i("a2de")),d=s(i("0955")),A=(s(i("11bd")),i("2f62")),f={data:function(){var e;return e={payWay:0,skeletonShow:!0,currentAddress:"",orderParams:{remark:""},allEms:0,modal:!1,oderId:"",payOrders:[],activeCoupon:"",allAccount:0,couponList:"",create_order_type:0},(0,n.default)(e,"couponList",[]),(0,n.default)(e,"title","睿众商城提醒您"),(0,n.default)(e,"content",""),e},filters:{differenceText:function(e){return e.length?e.join(","):""}},onLoad:function(e){var t=this;this.create_order_type=e.type,this.payOrders=this._filterOrder(this.currentOrder),uni.$on("refresh_sureAuction",(function(e){t.currentAddress=e,t.calcEms()}))},onShow:function(){this.loadAddress()},components:{tuiListView:c.default,tuiListCell:u.default,tuiNumberbox:l.default,tuiSkeleton:o.default,PayPanel:d.default},computed:(0,a.default)((0,a.default)({},(0,A.mapState)(["currentOrder"])),{},{allPrize:function(){var e=0;return this.proPriceArr.forEach((function(t){e+=t})),e.toFixed(2)},servePay:function(){var e=0;if(1==this.create_order_type&&this.currentCoupon)for(var t in this.couponList)e+=Number(this.couponList[t].goods_service_price);else 0==this.create_order_type&&this.activeCoupon&&(e=this.activeCoupon.goods_service_price);return e},proPriceArr:function(){var e=[];return this.payOrders.forEach((function(t){var i=0;t.list.forEach((function(e){i+=e.origin_price})),e.push(i)})),e},shopIdArr:function(){var e=[];return this.payOrders.forEach((function(t){e.push(t.shop_id)})),e},numArr:function(){var e=[];return this.payOrders.forEach((function(t){var i=0;t.list.forEach((function(e){i+=e.goods_num})),e.push(i)})),e},allNum:function(){return this.numArr.reduce((function(e,t){return e+t}))}}),methods:{calcAllAccount:function(){var e=Number(this.allEms)+Number(this.allPrize)+Number(this.servePay);1==this.create_order_type&&this.currentCoupon?e-=this.currentCoupon.sum_sale_price:0==this.create_order_type&&this.activeCoupon&&(e-=this.activeCoupon.sale_price),this.allAccount=e.toFixed(2)},getOrderCoupon:function(e){var t=this;return(0,r.default)(regeneratorRuntime.mark((function i(){var s,r;return regeneratorRuntime.wrap((function(i){while(1)switch(i.prev=i.next){case 0:return s=t,i.next=3,t.$api.GetOrderCouponInfo(e);case 3:r=i.sent,1==r.result&&(s.activeCoupon=r.data,s.calcAllAccount());case 5:case"end":return i.stop()}}),i)})))()},validCoupon:function(e){var t=this;return(0,r.default)(regeneratorRuntime.mark((function i(){var s,r,a;return regeneratorRuntime.wrap((function(i){while(1)switch(i.prev=i.next){case 0:return s=t,r={coupon_code:t.currentCoupon.coupon_code},i.next=4,t.$api.ReceiveCoupon(r);case 4:a=i.sent,1==a.result&&(s.formParams.coupon_code=e,s.creatOrder());case 6:case"end":return i.stop()}}),i)})))()},creatOrder:function(){var e=this,t=[];this.payOrders.forEach((function(i,s){var r={shop_id:i.shop_id,create_order_type:e.create_order_type,order_type:"0",user_address_code:e.currentAddress.address_code,coupon_code:1==e.create_order_type?e.currentCoupon.coupon_code:e.activeCoupon.coupon_code};r.list=i.list.map((function(t){return{goods_code:t.goods_code,skus_code:t.goods_spec.skus_code,cart_code:t.cart_code?t.cart_code:"",goods_num:t.goods_num,child_coupon_code:1==e.create_order_type?e.couponList[t.cart_code].child_coupon_code:e.activeCoupon.coupon_code,goods_service:t.goods_service}})),t.push(r)})),this._sure({create_order_data:t})},_filterOrder:function(e){var t={};return e.map((function(e,i){t[e.user_id]?(e.index=i,t[e.user_id].list.push(e)):(t[e.user_id]={},t[e.user_id].shop_id=e.shop_id,t[e.user_id].shop_name=e.shop_name,t[e.user_id].shop_logo=e.shop_logo,t[e.user_id].list=[],e.index=i,t[e.user_id].list.push(e)),e.checked=!1})),Object.values(t)},calcEms:function(){var e=this;return(0,r.default)(regeneratorRuntime.mark((function t(){var i,s,r,a,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return i=e,t.prev=1,s={shop_id:e.shopIdArr.join(","),address_code:e.currentAddress.address_code,order_count:e.numArr.join(","),order_price:e.proPriceArr.join(",")},t.next=5,e.$api.GetEmsPrice(s);case 5:r=t.sent,1==r.result?(i.allEms=r.data.ems_price,1==e.create_order_type&&i.currentCoupon?(i.couponList={},i.currentCoupon.cart_sale_list.forEach((function(e){i.couponList[e.cart_code]=e})),i.calcAllAccount()):(a=i.currentOrder[0],n={shop_id:a.shop_id,goods_code:a.goods_code,goods_num:a.goods_num,skus_code:a.skus_code?a.skus_code:i.currentOrder.goods_spec.skus_code,goods_service:a.goods_service},i.getOrderCoupon(n))):i.$ui.toast(r.msg),t.next=12;break;case 9:t.prev=9,t.t0=t["catch"](1),console.log("请求结果false : "+t.t0);case 12:case"end":return t.stop()}}),t,null,[[1,9]])})))()},handleClick:function(e){var t=e.index;0===t||this._sure(),this.modal=!1},loadAddress:function(e,t){var i=this;return(0,r.default)(regeneratorRuntime.mark((function e(){var s,r,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return s=i,e.prev=1,e.next=4,i.$api.GetAddressList({pageIndex:1,pageSize:100});case 4:r=e.sent,1==r.result?(a=r.data.rows,a.length>0?(s.currentAddress=a[0],s.currentAddress&&s.calcEms()):s.currentAddress="",s.skeletonShow=!1):s.$ui.toast(r.msg),e.next=11;break;case 8:e.prev=8,e.t0=e["catch"](1),console.log("请求结果false : "+e.t0);case 11:t&&t();case 12:case"end":return e.stop()}}),e,null,[[1,8]])})))()},_switchAddress:function(){uni.navigateTo({url:"/pages/features/adress/adress?action=switch"})},submit:function(e){var t=this;return(0,r.default)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t.currentAddress){e.next=3;break}return t.$ui.toast("请选择地址"),e.abrupt("return");case 3:1==t.create_order_type?t.validCoupon():t.creatOrder();case 5:case"end":return e.stop()}}),e)})))()},_sure:function(e){var t=this;return(0,r.default)(regeneratorRuntime.mark((function i(){var s,r;return regeneratorRuntime.wrap((function(i){while(1)switch(i.prev=i.next){case 0:return s=t,i.prev=1,t.$ui.showloading("订单生成中"),i.next=5,t.$api.CreateOrder(e,!1);case 5:r=i.sent,t.$ui.hideloading(),1==r.result?(s.$ui.toast("订单创建成功"),setTimeout((function(){1==s.create_order_type&&uni.$emit("refresh_cart"),s._readyToPay(r.data[0].order_code)}),500)):(s.$ui.toast(r.msg),uni.redirectTo({url:"/pages/features/order/orderList/orderList"})),i.next=13;break;case 10:i.prev=10,i.t0=i["catch"](1),console.log("请求结果false : "+i.t0);case 13:case"end":return i.stop()}}),i,null,[[1,10]])})))()},_readyToPay:function(e){this.oderId=e;this.$refs.payPanel._show()},success:function(e){e?uni.redirectTo({url:e}):uni.redirectTo({url:"/pages/features/order/order"})},cancel:function(e){uni.redirectTo({url:"/pages/features/order/orderDetail/orderDetail?code="+this.oderId})}}};t.default=f},"0584":function(e,t,i){var s=i("a3c2");"string"===typeof s&&(s=[[e.i,s,""]]),s.locals&&(e.exports=s.locals);var r=i("4f06").default;r("59b1fe62",s,!0,{sourceMap:!1,shadowMode:!1})},"1c9c":function(e,t,i){var s=i("24fb");t=s(!1),t.push([e.i,'@font-face{font-family:numberbox;src:url(data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAAASQAA0AAAAABtwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABGRlRNAAAEdAAAABoAAAAciBpnRUdERUYAAARUAAAAHgAAAB4AKQALT1MvMgAAAZwAAABDAAAAVjxzSINjbWFwAAAB9AAAAEYAAAFK5zLpOGdhc3AAAARMAAAACAAAAAj//wADZ2x5ZgAAAkgAAACHAAAAnIfIEjxoZWFkAAABMAAAAC8AAAA2FZWEOWhoZWEAAAFgAAAAHAAAACQH3gOFaG10eAAAAeAAAAARAAAAEgwAAAFsb2NhAAACPAAAAAwAAAAMADAATm1heHAAAAF8AAAAHwAAACABEAAobmFtZQAAAtAAAAFJAAACiCnmEVVwb3N0AAAEHAAAAC0AAABV/+8iFXjaY2BkYGAA4gVmC5Tj+W2+MnCzMIDATWsFOQT9v5GFgbkeyOVgYAKJAgDrogf+AHjaY2BkYGBu+N/AEMPCAAJAkpEBFbAAAEcKAm142mNgZGBgYGWQYQDRDAxMQMwFhAwM/8F8BgALpAE5AHjaY2BkYWCcwMDKwMDUyXSGgYGhH0IzvmYwYuQAijKwMjNgBQFprikMDs9Yn01kbvjfwBDD3MDQABRmBMkBAOXpDHEAeNpjYYAAFghmZGAAAACdAA4AAAB42mNgYGBmgGAZBkYGEHAB8hjBfBYGDSDNBqQZGZiesT6b+P8/AwOElvwnWQxVDwSMbAxwDiMTkGBiQAWMDMMeAABRZwszAAAAAAAAAAAAAAAwAE542iWKQQrCMBBF5xNpd0pQ7EIoTEnahSCTUNqdWz2A9TrieXKeXCc1qcPn/zfzh0BYv2pVH7oQgbvqdG5Yt/DTrNlPYz+wHvuuqhFSME4sFshTgKUsKfhH5lg8BSul3i5bS3mQdd0RIh2IjnvUrkXDd8zuhuFt86tY9fonIsSYgsXpB+cCGosAeNp9kD1OAzEQhZ/zByQSQiCoXVEA2vyUKRMp9Ailo0g23pBo1155nUg5AS0VB6DlGByAGyDRcgpelkmTImvt6PObmeexAZzjGwr/3yXuhBWO8ShcwREy4Sr1F+Ea+V24jhY+hRvUf4SbuFUD4RYu1BsdVO2Eu5vSbcsKZxgIV3CKJ+Eq9ZVwjfwqXMcVPoQb1L+EmxjjV7iFa2WpDOFhMEFgnEFjig3jAjEcLJIyBtahOfRmEsxMTzd6ETubOBso71dilwMeaDnngCntPbdmvkon/mDLgdSYbh4FS7YpjS4idCgbXyyc1d2oc7D9nu22tNi/a4E1x+xRDWzU/D3bM9JIbAyvkJI18jK3pBJTj2hrrPG7ZynW814IiU68y/SIx5o0dTr3bmniwOLn8owcfbS5kj33qBw+Y1kIeb/dTsQgil2GP5PYcRkAAAB42mNgYoAALjDJyIAOWMGiTIxMjMwiWZmJQJRXVQoigTgjMd9QGIsgAFDsEBsAAAAAAAAB//8AAgABAAAADAAAABYAAAACAAEAAwAEAAEABAAAAAIAAAAAeNpjYGBgZACCq0vUOUD0TWsFORgNADPBBE4AAA==) format("woff");font-weight:400;font-style:normal}.tui-numbox-icon[data-v-0d9fd0f4]{font-family:numberbox!important;font-style:normal;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;padding:%?10?%}.tui-icon-reduce[data-v-0d9fd0f4]:before{content:"\\e691"}.tui-icon-plus[data-v-0d9fd0f4]:before{content:"\\e605"}.tui-numberbox[data-v-0d9fd0f4]{display:-webkit-inline-flex;display:-webkit-inline-box;display:inline-flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.tui-num-input[data-v-0d9fd0f4]{text-align:center;margin:0 %?12?%;font-weight:400}.tui-disabled[data-v-0d9fd0f4]{color:#ededed!important}',""]),e.exports=t},"4e16":function(e,t,i){"use strict";var s=i("0584"),r=i.n(s);r.a},"58a5":function(e,t,i){"use strict";i("c975"),i("a9e3"),i("8ba4"),i("ac1f"),i("1276"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var s={name:"tuiNumberbox",props:{value:{type:Number,default:1},min:{type:Number,default:1},max:{type:Number,default:99},step:{type:Number,default:1},disabled:{type:Boolean,default:!1},iconSize:{type:Number,default:26},iconColor:{type:String,default:"#666666"},height:{type:Number,default:42},width:{type:Number,default:80},size:{type:Number,default:28},bgcolor:{type:String,default:"#F5F5F5"},color:{type:String,default:"#333"},index:{type:Number,default:0}},created:function(){this.inputValue=+this.value},data:function(){return{inputValue:0}},watch:{value:function(e){this.inputValue=+e}},methods:{getScale:function(){var e=1;return Number.isInteger(this.step)||(e=Math.pow(10,(this.step+"").split(".")[1].length)),e},calcNum:function(e){if(!this.disabled){var t=this.getScale(),i=this.value*t,s=this.step*t;"reduce"===e?i-=s:"plus"===e&&(i+=s);var r=i/t;r<this.min||r>this.max||this.handleChange(r,e)}},plus:function(){this.calcNum("plus")},reduce:function(){this.calcNum("reduce")},blur:function(e){var t=e.detail.value;t?(~t.indexOf(".")&&Number.isInteger(this.step)&&(t=t.split(".")[0]),t=Number(t),t>this.max?t=this.max:t<this.min&&(t=this.min)):t=this.min,t==this.value&&t!=this.inputValue&&(this.inputValue=t),this.handleChange(t,"blur")},handleChange:function(e,t){this.disabled||this.$emit("change",{value:e,type:t,index:this.index})}}};t.default=s},"5e89":function(e,t,i){var s=i("861d"),r=Math.floor;e.exports=function(e){return!s(e)&&isFinite(e)&&r(e)===e}},"7a39":function(e,t,i){"use strict";i.r(t);var s=i("58a5"),r=i.n(s);for(var a in s)"default"!==a&&function(e){i.d(t,e,(function(){return s[e]}))}(a);t["default"]=r.a},"8ba4":function(e,t,i){var s=i("23e7"),r=i("5e89");s({target:"Number",stat:!0},{isInteger:r})},a2de:function(e,t,i){"use strict";i.r(t);var s=i("f7e4"),r=i("7a39");for(var a in r)"default"!==a&&function(e){i.d(t,e,(function(){return r[e]}))}(a);i("ff3d");var n,o=i("f0c5"),c=Object(o["a"])(r["default"],s["b"],s["c"],!1,null,"0d9fd0f4",null,!1,s["a"],n);t["default"]=c.exports},a3c2:function(e,t,i){var s=i("24fb");t=s(!1),t.push([e.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.pages[data-v-980b9dca]{padding:%?20?%;padding-bottom:%?120?%}.pages .addressBox[data-v-980b9dca]{z-index:1;position:relative;text-align:left}.pages .addressBox .icon[data-v-980b9dca]{width:%?50?%;height:%?50?%;margin-right:%?26?%}.pages .addressBox .cm_title[data-v-980b9dca]{margin-bottom:%?10?%}.pages .addressBox .cm_text[data-v-980b9dca]{text-align:left;color:#999;margin-right:%?20?%}.pages .addressBox .top[data-v-980b9dca]{height:%?54?%;line-height:%?54?%;padding-right:%?20?%}.pages .addressBox .adress[data-v-980b9dca]{margin-top:%?10?%;font-size:%?28?%}.pages .addressBox .noItems[data-v-980b9dca]{line-height:%?100?%;text-align:center}.pages .itemBoxTop[data-v-980b9dca]{padding:%?24?% %?20?%;background:#fff}.pages .lists[data-v-980b9dca]{margin-top:%?16?%;border-radius:%?12?%;overflow:hidden}.pages .footer[data-v-980b9dca]{position:fixed;width:100%;min-height:%?100?%;left:0;bottom:0;background:#fff;z-index:200}.pages .footer .submit[data-v-980b9dca]{padding:0 %?40?%;line-height:%?68?%;height:%?68?%;border-radius:%?34?%;background:#da1a0f;color:#fff;margin-left:%?40?%}',""]),e.exports=t},bfff:function(e,t,i){var s=i("1c9c");"string"===typeof s&&(s=[[e.i,s,""]]),s.locals&&(e.exports=s.locals);var r=i("4f06").default;r("570b40b6",s,!0,{sourceMap:!1,shadowMode:!1})},cfe5:function(e,t,i){"use strict";i.d(t,"b",(function(){return r})),i.d(t,"c",(function(){return a})),i.d(t,"a",(function(){return s}));var s={tuiIcon:i("9c13").default,tuiListView:i("3c51").default,tuiListCell:i("0106").default,tuiModal:i("5a57").default,PayPanel:i("0955").default},r=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("v-uni-view",{staticClass:"pages"},[s("v-uni-view",{},[s("v-uni-view",{staticClass:"proItemsBox addressBox "},[e.currentAddress?s("v-uni-view",{staticClass:"flex flex_center buyer tui-skeleton-fillet",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e._switchAddress.apply(void 0,arguments)}}},[s("v-uni-image",{staticClass:"icon",attrs:{src:i("f699"),mode:"widthFix"}}),s("v-uni-view",{staticClass:"f1 addreass tui-skeleton-rect"},[s("v-uni-view",{staticClass:"cm_title "},[e._v(e._s(e.currentAddress.detailed_address))]),s("v-uni-view",{staticClass:"flex flex_center"},[s("v-uni-text",{staticClass:"cm_text "},[e._v(e._s(e.currentAddress.receiving_user))]),s("v-uni-text",{staticClass:"cm_text "},[e._v(e._s(e.currentAddress.receiving_mobile))]),s("v-uni-view",{staticClass:"f1"})],1)],1),s("tui-icon",{attrs:{name:"arrowright",size:16}})],1):s("v-uni-view",{staticClass:"flex flex_center buyer tui-skeleton-fillet"},[s("v-uni-navigator",{staticClass:"f1 noItems",attrs:{url:"/pages/features/newAdress/newAdress?type=switch"}},[e._v("尚未添加地址,立即添加")]),s("tui-icon",{attrs:{name:"arrowright",size:16}})],1)],1),s("v-uni-view",{staticStyle:{"margin-top":"16rpx","border-radius":"12rpx",overflow:"hidden"}},[e._l(e.payOrders,(function(t,i){return[s("v-uni-view",{key:i+"_0",staticClass:"proItemsBoxgray  tui-skeleton-fillet"},[s("v-uni-view",{staticClass:"flex flex_center itemBoxTop"},[s("v-uni-image",{staticClass:"shopIcon",attrs:{src:t.shop_logo,mode:"aspectFill"}}),s("v-uni-view",{staticClass:"cm_title f1"},[e._v(e._s(t.shop_name))])],1),e._l(t.list,(function(t,i){return[s("v-uni-view",{key:i+"_0",staticClass:"picBox flex  flex_center tui-skeleton-fillet"},[t.goods_main_img?s("v-uni-image",{staticClass:"avatar ",attrs:{src:t.goods_main_img,mode:"aspectFill"}}):e._e(),s("v-uni-view",{staticClass:"f1 "},[s("v-uni-view",{staticClass:" cm_title  cm_ellipsis2 tui-skeleton-fillet"},[e._v(e._s(t.goods_title))]),s("v-uni-view",{staticClass:"cm_des cm_ellipsis2 "},[e._v(e._s(e._f("differenceText")(t.goods_spec.skus_difference)))]),1==e.create_order_type&&e.couponList[t.cart_code]&&e.couponList[t.cart_code].goods_service_txt?s("v-uni-view",{staticClass:"cm_des cm_ellipsis2 serviceText"},[e._v(e._s(e.couponList[t.cart_code].goods_service_txt))]):e._e(),0==e.create_order_type&&e.activeCoupon.goods_service_txt?s("v-uni-view",{staticClass:"cm_des cm_ellipsis2",staticStyle:{"margin-top":"4rpx",color:"#E56D00"}},[e._v(e._s(e.activeCoupon.goods_service_txt))]):e._e(),s("v-uni-view",{staticClass:" tui-skeleton-fillet flex flex_center",staticStyle:{"margin-top":"10rpx"}},[t.goods_spec?s("v-uni-text",{staticClass:"cm_des cm_t_32",staticStyle:{"margin-right":"20rpx",color:"#e02e24"}},[e._v("￥"+e._s(t.goods_spec.skus_price))]):e._e(),s("v-uni-view",{staticClass:"f1"}),s("v-uni-view",{staticClass:"cm_des flex-y flex_center"},[s("tui-icon",{attrs:{name:"shut",size:14,color:"#999"}}),s("v-uni-text",[e._v(e._s(t.goods_num))])],1)],1)],1)],1)]}))],2)]}))],2),s("v-uni-view",[s("tui-list-view",{staticClass:"tui-list-view tui-skeleton-fillet lists",attrs:{unlined:"all"}},[s("tui-list-cell",{attrs:{arrow:!1}},[s("v-uni-view",{staticClass:"tui-list-cell-name "},[e._v("配送费用")]),s("v-uni-view",{staticClass:"cm_des f1 ",staticStyle:{"padding-left":"10rpx"}},[e._v("普通配送")]),s("v-uni-view",{staticClass:"tui-right"},[e._v(e._s(e.currentAddress?"￥"+e.allEms:"请先选择收货地址"))])],1),s("tui-list-cell",{attrs:{arrow:!1}},[s("v-uni-view",{staticClass:"tui-list-cell-name f1"},[e._v("配送时间")]),s("v-uni-view",{staticClass:"tui-right"},[e._v("付款后48小时内发货")])],1),s("tui-list-cell",{attrs:{arrow:!1}},[s("v-uni-view",{staticClass:"tui-list-cell-name f1"},[e._v("售后服务")]),s("v-uni-view",{staticClass:"tui-right"},[e._v("￥"+e._s(e.servePay))])],1),e.activeCoupon&&e.activeCoupon.coupon_code?s("tui-list-cell",{attrs:{arrow:!1}},[s("v-uni-view",{staticClass:"tui-list-cell-name "},[e._v("优惠金额")]),s("v-uni-view",{staticClass:"cm_des f1 ",staticStyle:{"padding-left":"10rpx"}},[e._v(e._s(""+e.activeCoupon.coupon_name))]),s("v-uni-view",{staticClass:"tui-right",staticStyle:{color:"red"}},[e._v("-"+e._s("￥"+e.activeCoupon.sale_price))])],1):e._e(),!e.activeCoupon&&e.currentCoupon.sum_sale_price?s("tui-list-cell",{attrs:{arrow:!1}},[s("v-uni-view",{staticClass:"tui-list-cell-name "},[e._v("优惠金额")]),s("v-uni-view",{staticClass:"cm_des f1 ",staticStyle:{"padding-left":"10rpx"}},[e._v(e._s(""+e.currentCoupon.coupon_name))]),s("v-uni-view",{staticClass:"tui-right",staticStyle:{color:"red"}},[e._v("-"+e._s("￥"+e.currentCoupon.sum_sale_price))])],1):e._e(),s("tui-list-cell",{attrs:{arrow:!1}},[s("v-uni-view",{staticClass:"tui-list-cell-name f1"},[e._v("商品金额")]),s("v-uni-view",{staticClass:"tui-right"},[e._v("￥"+e._s(e.allPrize))])],1),s("tui-list-cell",{attrs:{arrow:!1}},[s("v-uni-view",{staticClass:"tui-list-cell-name f1"},[e._v("支付金额")]),s("v-uni-view",{staticClass:"tui-right cm_prize"},[e._v("￥"+e._s(e.allAccount))])],1),s("tui-list-cell",{attrs:{arrow:!1,last:!0}},[s("v-uni-view",{staticClass:"tui-list-cell-name f1"},[e._v("买家备注")])],1),s("tui-list-cell",{attrs:{hover:!1}},[s("v-uni-view",{staticClass:"tui-line-cell "},[s("v-uni-textarea",{attrs:{placeholder:"请输入买家备注"},model:{value:e.orderParams.remark,callback:function(t){e.$set(e.orderParams,"remark",t)},expression:"orderParams.remark"}})],1)],1)],1)],1)],1),s("v-uni-view",{staticClass:"footer savebottom  "},[s("v-uni-view",{staticClass:"flex flex_center ",staticStyle:{padding:"0 30rpx",height:"100rpx"}},[s("v-uni-view",{staticClass:"f1"}),s("v-uni-view",{staticClass:" flex flex_center"},[s("v-uni-text",{staticClass:"cm_des"},[e._v("共"+e._s(e.allNum)+"件，")]),s("v-uni-view",{},[s("v-uni-text",[e._v("合计:")])],1),s("v-uni-text",{staticClass:"cm_prize"},[e._v("￥"+e._s(e.allAccount))])],1),s("v-uni-button",{staticClass:"submit",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.submit.apply(void 0,arguments)}}},[e._v("提交订单")])],1)],1),s("tui-modal",{attrs:{show:e.modal,title:e.title,content:e.content,maskClosable:!1,color:"#333",size:32},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.handleClick.apply(void 0,arguments)},cancel:function(t){arguments[0]=t=e.$handleEvent(t),e.hide.apply(void 0,arguments)}}}),s("PayPanel",{ref:"payPanel",attrs:{oderId:e.oderId,amout:e.allAccount},on:{success:function(t){arguments[0]=t=e.$handleEvent(t),e.success.apply(void 0,arguments)},cancel:function(t){arguments[0]=t=e.$handleEvent(t),e.cancel.apply(void 0,arguments)}}})],1)},a=[]},e829:function(e,t,i){"use strict";i.r(t);var s=i("02b9"),r=i.n(s);for(var a in s)"default"!==a&&function(e){i.d(t,e,(function(){return s[e]}))}(a);t["default"]=r.a},f427:function(e,t,i){"use strict";i.r(t);var s=i("cfe5"),r=i("e829");for(var a in r)"default"!==a&&function(e){i.d(t,e,(function(){return r[e]}))}(a);i("4e16");var n,o=i("f0c5"),c=Object(o["a"])(r["default"],s["b"],s["c"],!1,null,"980b9dca",null,!1,s["a"],n);t["default"]=c.exports},f7e4:function(e,t,i){"use strict";var s;i.d(t,"b",(function(){return r})),i.d(t,"c",(function(){return a})),i.d(t,"a",(function(){return s}));var r=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("v-uni-view",{staticClass:"tui-numberbox-class tui-numberbox"},[i("v-uni-view",{staticClass:"tui-numbox-icon tui-icon-reduce ",class:[e.disabled||e.min>=e.value?"tui-disabled":""],style:{color:e.iconColor,fontSize:e.iconSize+"rpx"},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.reduce.apply(void 0,arguments)}}}),i("v-uni-input",{staticClass:"tui-num-input",style:{color:e.color,fontSize:e.size+"rpx",background:e.bgcolor,height:e.height+"rpx",width:e.width+"rpx"},attrs:{type:"number",disabled:e.disabled},on:{blur:function(t){arguments[0]=t=e.$handleEvent(t),e.blur.apply(void 0,arguments)}},model:{value:e.inputValue,callback:function(t){e.inputValue=t},expression:"inputValue"}}),i("v-uni-view",{staticClass:"tui-numbox-icon tui-icon-plus",class:[e.disabled||e.value>=e.max?"tui-disabled":""],style:{color:e.iconColor,fontSize:e.iconSize+"rpx"},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.plus.apply(void 0,arguments)}}})],1)},a=[]},ff3d:function(e,t,i){"use strict";var s=i("bfff"),r=i.n(s);r.a}}]);