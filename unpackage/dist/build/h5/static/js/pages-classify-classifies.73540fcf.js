(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-classify-classifies"],{"2a91":function(t,e,i){"use strict";i.r(e);var a=i("ff7a"),n=i.n(a);for(var r in a)"default"!==r&&function(t){i.d(e,t,(function(){return a[t]}))}(r);e["default"]=n.a},"511f":function(t,e,i){"use strict";var a=i("c5df"),n=i.n(a);n.a},"51c5":function(t,e,i){"use strict";i.r(e);var a=i("fed1"),n=i("2a91");for(var r in n)"default"!==r&&function(t){i.d(e,t,(function(){return n[t]}))}(r);i("511f");var s,o=i("f0c5"),c=Object(o["a"])(n["default"],a["b"],a["c"],!1,null,"49464182",null,!1,a["a"],s);e["default"]=c.exports},c5df:function(t,e,i){var a=i("f4b0");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var n=i("4f06").default;n("2cf1cf05",a,!0,{sourceMap:!1,shadowMode:!1})},f4b0:function(t,e,i){var a=i("24fb");e=a(!1),e.push([t.i,".page .header[data-v-49464182]{width:100%;line-height:%?88?%;font-size:%?32?%;color:#fff;background:#fff}.page .header .searchBar[data-v-49464182]{height:%?60?%;line-height:%?60?%;border-radius:%?30?%;background:#f5f5f5;padding:0 %?40?%;margin:0 %?20?%}.page .header .btns[data-v-49464182]{width:%?88?%;height:%?88?%;color:#333}.page .header .btns .iconfont[data-v-49464182]{font-size:%?40?%}.page-body[data-v-49464182]{display:-webkit-box;display:-webkit-flex;display:flex;background:#fff;overflow:hidden}.nav[data-v-49464182]{display:-webkit-box;display:-webkit-flex;display:flex;width:100%}.nav-left[data-v-49464182]{width:25%;background:#fff;top:%?88?%}.nav-left-item[data-v-49464182]{height:%?100?%;border-right:solid 1px #f1f1f1;border-bottom:solid 1px #f1f1f1;font-size:%?30?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center}.nav-left-item[data-v-49464182]:last-child{border-bottom:none}.nav-right[data-v-49464182]{width:75%;top:%?88?%;padding:%?20?%;background-color:#f4f4f4}.boxs[data-v-49464182]{display:block;overflow:hidden;margin-bottom:%?20?%;padding:%?20?%;border-radius:%?12?%;background:#fff\n  /* min-height: 100vh; */\n  /*若您的子分类过少想使得每个子分类占满屏请放开上边注视 */}.item-box[data-v-49464182]{-webkit-flex-wrap:wrap;flex-wrap:wrap;-webkit-box-pack:start;-webkit-justify-content:flex-start;justify-content:flex-start}.box[data-v-49464182]:last-child{border:none;min-height:100vh}.nav-right-item[data-v-49464182]{width:33%;height:%?220?%;float:left;text-align:center;padding:%?11?%;font-size:%?28?%;background:#fff}.nav-right-item-text[data-v-49464182]{font-size:%?20?%;margin-top:%?4?%;color:#666}.nav-right-item uni-image[data-v-49464182]{width:%?150?%;height:%?150?%}.nav-right-item2[data-v-49464182]{width:50%;height:%?340?%;float:left;text-align:center;padding:%?11?%;font-size:%?28?%;background:#fff}.nav-right-item-text2[data-v-49464182]{font-size:%?24?%;margin-top:%?4?%;color:#666;line-height:1.3}.nav-right-item2 uni-image[data-v-49464182]{width:%?220?%;height:%?220?%;border-radius:%?10?%}.price[data-v-49464182]{text-align:right;font-size:%?32?%;color:#dd3a30}.active[data-v-49464182]{border-right:0}.active .current[data-v-49464182]{color:#fff;background:#50ab9f;height:%?56?%;line-height:%?56?%;border-radius:%?28?%;padding:0 %?20?%}[data-v-49464182]::-webkit-scrollbar{\n  /*取消小程序的默认导航条样式*/width:0;height:0;color:transparent}",""]),t.exports=e},fed1:function(t,e,i){"use strict";i.d(e,"b",(function(){return n})),i.d(e,"c",(function(){return r})),i.d(e,"a",(function(){return a}));var a={cuCustom:i("2724").default,tuiIcon:i("9c13").default},n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"page"},[i("v-uni-view",{staticClass:"header flex flex_center",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.toSearchPage.apply(void 0,arguments)}}},[i("cu-custom",{attrs:{isBack:!1}},[i("template",{attrs:{slot:"content"},slot:"content"},[i("v-uni-view",{staticClass:"searchBar f1 flex flex_center"},[i("tui-icon",{attrs:{name:"search",size:20,color:"#999"}}),i("div",{staticClass:"f1 cm_des"},[t._v("请输入关键词")])],1)],1),i("template",{attrs:{slot:"right"},slot:"right"},[i("v-uni-view",{staticClass:"btns flex flex_center"},[t._v("搜索")])],1)],2)],1),i("v-uni-view",{staticClass:"page-body",style:"height:"+t.height+"px"},[i("v-uni-scroll-view",{staticClass:"nav-left",style:"height:"+t.height+"px",attrs:{"scroll-y":!0,"scroll-top":t.scrollLeftTop,"scroll-with-animation":!0}},t._l(t.classifyData,(function(e,a){return i("v-uni-view",{key:a,staticClass:"nav-left-item",class:a==t.categoryActive?"active":"",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.categoryClickMain(a)}}},[i("v-uni-text",{staticClass:"current"},[t._v(t._s(e.label))])],1)})),1),i("v-uni-scroll-view",{staticClass:"nav-right",style:"height:"+t.height+"px",attrs:{"scroll-y":!0,"scroll-top":t.scrollTop,"scroll-with-animation":!0},on:{scroll:function(e){arguments[0]=e=t.$handleEvent(e),t.scroll.apply(void 0,arguments)}}},t._l(t.classifyData,(function(e,a){return i("v-uni-view",{key:a,staticClass:"boxs"},[i("v-uni-view",{staticClass:"flex flex_center",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t._href("/pages/classify/products/products?type="+a)}}},[i("v-uni-view",{staticClass:"cm_title",staticStyle:{"font-size":"36rpx","line-height":"2"}},[t._v(t._s(e.label))]),i("v-uni-view",{staticClass:"f1"}),i("tui-icon",{attrs:{name:"arrowright",size:20,color:"#333"}})],1),1==e.is_child?i("v-uni-view",{staticClass:"item-box flex flex_center"},t._l(e.children,(function(a,n){return i("v-uni-view",{key:n,staticClass:"nav-right-item",attrs:{id:0==n?"first":""},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.cart(e.value,e.label)}}},[i("v-uni-image",{attrs:{src:a.img,mode:"aspectFit"}}),i("v-uni-view",{staticClass:"nav-right-item-text"},[t._v(t._s(a.label))])],1)})),1):i("v-uni-view",{staticClass:"item-box flex flex_center"},t._l(e.children,(function(e,a){return i("v-uni-navigator",{key:a,staticClass:"nav-right-item2 pro",attrs:{url:"/pages/main/details/details?code="+e.goods_code,id:0==a?"first":""}},[i("v-uni-image",{attrs:{src:e.goods_main_img,mode:"aspectFit"}}),i("v-uni-view",{staticClass:"nav-right-item-text2  cm_ellipsis2"},[t._v(t._s(e.goods_title))]),i("v-uni-view",{staticClass:"price"},[t._v("￥"+t._s(e.goods_price))])],1)})),1)],1)})),1)],1)],1)},r=[]},ff7a:function(t,e,i){"use strict";var a=i("4ea4");i("99af"),i("4160"),i("ac1f"),i("159b"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,i("96cf");var n=a(i("1da1")),r={data:function(){return{name:"wkiwi",height:0,categoryActive:0,scrollTop:0,scrollLeftTop:0,classifyData:[],arr:[0,584,1168,1752,2336,2805,3274,3858,4442,4911,5380,5734,6203,6672,7017],leftItemHeight:51,navLeftHeight:0,diff:0,tabBarHeight:0}},created:function(){this._loadHome()},onLoad:function(){this.height=uni.getSystemInfoSync().windowHeight-this.tabBarHeight-44},onReady:function(){},methods:{toSearchPage:function(){uni.navigateTo({url:"/pages/main/search/search"})},_loadHome:function(t){var e=this;return(0,n.default)(regeneratorRuntime.mark((function t(){var i,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return i=e,t.prev=1,t.next=4,e.$api.crm_getHome();case 4:a=t.sent,1==a.result?(e.classifyData=a.data.tree_class,e.$nextTick((function(){e.getHeightList()}))):e.$refs.uToast.show({title:a.msg,type:"error",position:"center"}),t.next=12;break;case 8:t.prev=8,t.t0=t["catch"](1),console.log("请求结果false : "+t.t0),i.pageLoading=!1;case 12:case"end":return t.stop()}}),t,null,[[1,8]])})))()},getHeightList:function(){var t=this,e=uni.createSelectorQuery();e.selectAll(".nav-left-item").boundingClientRect((function(e){t.leftItemHeight=e[0].height,t.navLeftHeight=t.leftItemHeight*t.classifyData.length,t.diff=t.navLeftHeight-t.height})),e.selectAll(".boxs").boundingClientRect((function(e){var i=[0],a=0;e.forEach((function(t){a+=t.height,i.push(a)})),console.log(i),t.arr=i})).exec()},scroll:function(t){var e=this;this.timeoutId&&clearTimeout(this.timeoutId),this.timeoutId=setTimeout((function(){e.scrollHeight=t.detail.scrollTop+1;for(var i=0;i<e.arr.length;i++){var a=e.arr[i],n=e.arr[i+1];if(!n||e.scrollHeight>=a&&e.scrollHeight<n)return e.categoryActive=i,e.diff>0&&(e.scrollLeftTop=Math.round(e.categoryActive*e.diff/(e.classifyData.length-1))),!1}e.categoryActive=0,e.timeoutId=void 0}),100)},categoryClickMain:function(t){this.categoryActive=t,this.scrollTop==this.arr[t]?this.scrollTop=this.scrollTop+1:this.scrollTop=this.arr[t]},cart:function(t,e){uni.navigateTo({url:"./products_s/products_s?code=".concat(t,"&title=").concat(e)})}},components:{}};e.default=r}}]);