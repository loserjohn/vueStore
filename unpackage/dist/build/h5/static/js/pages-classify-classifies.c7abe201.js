(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-classify-classifies"],{"0bf0":function(t,e,a){"use strict";var i=a("4678"),n=a.n(i);n.a},"2a3e":function(t,e,a){"use strict";a.d(e,"b",(function(){return n})),a.d(e,"c",(function(){return r})),a.d(e,"a",(function(){return i}));var i={cuCustom:a("1833").default,tuiIcon:a("1b57").default},n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-uni-view",{staticClass:"page"},[a("v-uni-view",{staticClass:"header flex flex_center",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.toSearchPage.apply(void 0,arguments)}}},[a("cu-custom",{attrs:{isBack:!1}},[a("template",{attrs:{slot:"content"},slot:"content"},[a("v-uni-view",{staticClass:"searchBar f1 flex flex_center"},[a("tui-icon",{attrs:{name:"search",size:20,color:"#999"}}),a("div",{staticClass:"f1 cm_des"},[t._v("请输入关键词")])],1)],1),a("template",{attrs:{slot:"right"},slot:"right"},[a("v-uni-view",{staticClass:"btns flex flex_center"},[t._v("搜索")])],1)],2)],1),a("v-uni-view",{staticClass:"page-body",style:"height:"+t.height+"px"},[a("v-uni-scroll-view",{staticClass:"nav-left",style:"height:"+t.height+"px",attrs:{"scroll-y":!0,"scroll-top":t.scrollLeftTop,"scroll-with-animation":!0}},t._l(t.classifyData,(function(e,i){return a("v-uni-view",{key:i,staticClass:"nav-left-item",class:i==t.categoryActive?"active":"",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.categoryClickMain(i)}}},[a("v-uni-text",{staticClass:"current"},[t._v(t._s(e.label))])],1)})),1),a("v-uni-scroll-view",{staticClass:"nav-right",style:"height:"+t.height+"px",attrs:{"scroll-y":!0,"scroll-top":t.scrollTop,"scroll-with-animation":!0},on:{scroll:function(e){arguments[0]=e=t.$handleEvent(e),t.scroll.apply(void 0,arguments)}}},t._l(t.classifyData,(function(e,i){return a("v-uni-view",{key:i,staticClass:"boxs"},[a("v-uni-view",{staticClass:"flex flex_center",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t._href("/pages/classify/products/products?type="+i)}}},[a("v-uni-view",{staticClass:"cm_title",staticStyle:{"font-size":"36rpx","line-height":"2"}},[t._v(t._s(e.label))]),a("v-uni-view",{staticClass:"f1"}),a("tui-icon",{attrs:{name:"arrowright",size:20,color:"#333"}})],1),1==e.is_child?a("v-uni-view",{staticClass:"item-box flex flex_center"},t._l(e.children,(function(i,n){return a("v-uni-view",{key:n,staticClass:"nav-right-item",attrs:{id:0==n?"first":""},on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.cart(e.value,e.label)}}},[a("v-uni-image",{attrs:{src:i.img,mode:"aspectFit"}}),a("v-uni-view",{staticClass:"nav-right-item-text"},[t._v(t._s(i.label))])],1)})),1):a("v-uni-view",{staticClass:"item-box flex flex_center"},t._l(e.children,(function(e,i){return a("v-uni-navigator",{key:i,staticClass:"nav-right-item2 pro",attrs:{url:"/pages/main/details/details?code="+e.goods_code,id:0==i?"first":""}},[a("v-uni-image",{attrs:{src:e.goods_main_img,mode:"aspectFit"}}),a("v-uni-view",{staticClass:"nav-right-item-text2  cm_ellipsis2"},[t._v(t._s(e.goods_title))]),a("v-uni-view",{staticClass:"price"},[t._v("￥"+t._s(e.goods_price))])],1)})),1)],1)})),1)],1)],1)},r=[]},"35ce":function(t,e,a){"use strict";a.r(e);var i=a("2a3e"),n=a("b2ce");for(var r in n)"default"!==r&&function(t){a.d(e,t,(function(){return n[t]}))}(r);a("0bf0");var o,s=a("f0c5"),c=Object(s["a"])(n["default"],i["b"],i["c"],!1,null,"152a023a",null,!1,i["a"],o);e["default"]=c.exports},4678:function(t,e,a){var i=a("5818");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var n=a("4f06").default;n("6b9e359f",i,!0,{sourceMap:!1,shadowMode:!1})},5818:function(t,e,a){var i=a("24fb");e=i(!1),e.push([t.i,".page .header[data-v-152a023a]{width:100%;line-height:%?88?%;font-size:%?32?%;color:#fff;background:#fff}.page .header .searchBar[data-v-152a023a]{height:%?60?%;line-height:%?60?%;border-radius:%?30?%;background:#f5f5f5;padding:0 %?40?%;margin:0 %?20?%}.page .header .btns[data-v-152a023a]{width:%?88?%;height:%?88?%;color:#333}.page .header .btns .iconfont[data-v-152a023a]{font-size:%?40?%}.page-body[data-v-152a023a]{display:flex;background:#fff;overflow:hidden}.nav[data-v-152a023a]{display:flex;width:100%}.nav-left[data-v-152a023a]{width:25%;background:#fff;top:%?88?%}.nav-left-item[data-v-152a023a]{height:%?100?%;border-right:solid 1px #f1f1f1;border-bottom:solid 1px #f1f1f1;font-size:%?30?%;display:flex;align-items:center;justify-content:center}.nav-left-item[data-v-152a023a]:last-child{border-bottom:none}.nav-right[data-v-152a023a]{width:75%;top:%?88?%;padding:%?20?%;background-color:#f4f4f4}.boxs[data-v-152a023a]{display:block;overflow:hidden;margin-bottom:%?20?%;padding:%?20?%;border-radius:%?12?%;background:#fff\n  /* min-height: 100vh; */\n  /*若您的子分类过少想使得每个子分类占满屏请放开上边注视 */}.item-box[data-v-152a023a]{flex-wrap:wrap;justify-content:flex-start}.box[data-v-152a023a]:last-child{border:none;min-height:100vh}.nav-right-item[data-v-152a023a]{width:33%;height:%?220?%;float:left;text-align:center;padding:%?11?%;font-size:%?28?%;background:#fff}.nav-right-item-text[data-v-152a023a]{font-size:%?20?%;margin-top:%?4?%;color:#666}.nav-right-item uni-image[data-v-152a023a]{width:%?150?%;height:%?150?%}.nav-right-item2[data-v-152a023a]{width:50%;height:%?340?%;float:left;text-align:center;padding:%?11?%;font-size:%?28?%;background:#fff}.nav-right-item-text2[data-v-152a023a]{font-size:%?24?%;margin-top:%?4?%;color:#666;line-height:1.3}.nav-right-item2 uni-image[data-v-152a023a]{width:%?220?%;height:%?220?%;border-radius:%?10?%}.price[data-v-152a023a]{text-align:right;font-size:%?32?%;color:#dd3a30}.active[data-v-152a023a]{border-right:0}.active .current[data-v-152a023a]{color:#fff;background:#50ab9f;height:%?56?%;line-height:%?56?%;border-radius:%?28?%;padding:0 %?20?%}[data-v-152a023a]::-webkit-scrollbar{\n  /*取消小程序的默认导航条样式*/width:0;height:0;color:transparent}",""]),t.exports=e},b2ce:function(t,e,a){"use strict";a.r(e);var i=a("e3a8"),n=a.n(i);for(var r in i)"default"!==r&&function(t){a.d(e,t,(function(){return i[t]}))}(r);e["default"]=n.a},e3a8:function(t,e,a){"use strict";(function(t){var i=a("4ea4");a("99af"),a("4160"),a("ac1f"),a("159b"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,a("96cf");var n=i(a("1da1")),r={data:function(){return{name:"wkiwi",height:0,categoryActive:0,scrollTop:0,scrollLeftTop:0,classifyData:[],arr:[0,584,1168,1752,2336,2805,3274,3858,4442,4911,5380,5734,6203,6672,7017],leftItemHeight:51,navLeftHeight:0,diff:0,tabBarHeight:0}},created:function(){this._loadHome()},onLoad:function(){this.height=uni.getSystemInfoSync().windowHeight-this.tabBarHeight-44},onReady:function(){},methods:{toSearchPage:function(){uni.navigateTo({url:"/pages/main/search/search"})},_loadHome:function(e){var a=this;return(0,n.default)(regeneratorRuntime.mark((function e(){var i,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return i=a,e.prev=1,e.next=4,a.$api.crm_getHome();case 4:n=e.sent,1==n.result?(a.classifyData=n.data.tree_class,a.$nextTick((function(){a.getHeightList()}))):a.$refs.uToast.show({title:n.msg,type:"error",position:"center"}),e.next=12;break;case 8:e.prev=8,e.t0=e["catch"](1),t.log("请求结果false : "+e.t0),i.pageLoading=!1;case 12:case"end":return e.stop()}}),e,null,[[1,8]])})))()},getHeightList:function(){var e=this,a=uni.createSelectorQuery();a.selectAll(".nav-left-item").boundingClientRect((function(t){e.leftItemHeight=t[0].height,e.navLeftHeight=e.leftItemHeight*e.classifyData.length,e.diff=e.navLeftHeight-e.height})),a.selectAll(".boxs").boundingClientRect((function(a){var i=[0],n=0;a.forEach((function(t){n+=t.height,i.push(n)})),t.log(i),e.arr=i})).exec()},scroll:function(t){var e=this;this.timeoutId&&clearTimeout(this.timeoutId),this.timeoutId=setTimeout((function(){e.scrollHeight=t.detail.scrollTop+1;for(var a=0;a<e.arr.length;a++){var i=e.arr[a],n=e.arr[a+1];if(!n||e.scrollHeight>=i&&e.scrollHeight<n)return e.categoryActive=a,e.diff>0&&(e.scrollLeftTop=Math.round(e.categoryActive*e.diff/(e.classifyData.length-1))),!1}e.categoryActive=0,e.timeoutId=void 0}),100)},categoryClickMain:function(t){this.categoryActive=t,this.scrollTop==this.arr[t]?this.scrollTop=this.scrollTop+1:this.scrollTop=this.arr[t]},cart:function(t,e){uni.navigateTo({url:"./products_s/products_s?code=".concat(t,"&title=").concat(e)})}},components:{}};e.default=r}).call(this,a("5a52")["default"])}}]);