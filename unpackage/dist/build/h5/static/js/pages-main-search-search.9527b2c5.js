(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-main-search-search"],{"391d":function(t,e,o){"use strict";o.r(e);var i=o("a8e9"),a=o("3fff");for(var n in a)"default"!==n&&function(t){o.d(e,t,(function(){return a[t]}))}(n);o("c960");var s,r=o("f0c5"),c=Object(r["a"])(a["default"],i["b"],i["c"],!1,null,"abac6bae",null,!1,i["a"],s);e["default"]=c.exports},"3fff":function(t,e,o){"use strict";o.r(e);var i=o("b0b0"),a=o.n(i);for(var n in i)"default"!==n&&function(t){o.d(e,t,(function(){return i[t]}))}(n);e["default"]=a.a},"4fd6":function(t,e,o){"use strict";var i=o("4ea4");o("c975"),o("e25e"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=i(o("391d")),n={data:function(){return{StatusBar:this.StatusBar,CustomBar:this.CustomBar,sliderHeight:64,localWordList:[],list:[],show:!1,loadStatus:"more",formParams:{key:"",type:"0",sort:"desc",class_code:"",pageIndex:1,pageSize:10},onBottom:!0,onTop:!0}},components:{tuiCountdown:a.default},filters:{parse:function(t){return parseInt(t)}},computed:{},onLoad:function(t){var e=this,o=t.keyword;o&&(e.formParams.key=o,e._toSearch()),this._initLocal()},onNavigationBarSearchInputConfirmed:function(t){var e=t.text;this.formParams.key=e,this._toSearch()},onNavigationBarSearchInputChanged:function(t){var e=t.text;this.formParams.key=e,e||(this.show=!1)},onNavigationBarButtonTap:function(t){t.index,this._toSearch()},methods:{_initLocal:function(){var t=uni.getStorageSync("localWords");t=t||[],this.localWordList=t},_removeAll:function(){uni.removeStorageSync("localWords"),this.localWordList=[]},_choose:function(t){console.log(t),this.formParams.key=t,this._toSearch()},_toSearch:function(){if(!this.formParams.key)return this.$ui.toast("请输入关键字"),void(this.show=!1);this._getList();var t=uni.getStorageSync("localWords"),e=this.formParams.key;t||(t=[]),t.indexOf(e)<0&&(t.unshift(this.formParams.key),this.localWordList=t,uni.setStorageSync("localWords",t))},_getListAfter:function(){this.show=!0}}};e.default=n},"577d":function(t,e,o){var i=o("a4c4");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var a=o("4f06").default;a("17212f3d",i,!0,{sourceMap:!1,shadowMode:!1})},"5d49":function(t,e,o){"use strict";o.r(e);var i=o("7785"),a=o("d1a1");for(var n in a)"default"!==n&&function(t){o.d(e,t,(function(){return a[t]}))}(n);o("aad4");var s,r=o("f0c5"),c=Object(r["a"])(a["default"],i["b"],i["c"],!1,null,"149b5482",null,!1,i["a"],s);e["default"]=c.exports},7785:function(t,e,o){"use strict";o.d(e,"b",(function(){return a})),o.d(e,"c",(function(){return n})),o.d(e,"a",(function(){return i}));var i={tuiTag:o("cadd").default},a=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("v-uni-view",{staticClass:"page flex_y flex_center"},[o("v-uni-view",{staticClass:"content"},[o("v-uni-view",{staticClass:"flex",staticStyle:{"align-items":"center"}},[o("v-uni-view",{staticClass:"cm_title"},[t._v("最近搜索")]),o("tui-tag",{attrs:{padding:"10rpx 16rpx",size:"22rpx",shape:"circle",plain:!0,type:"black"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t._removeAll()}}},[t._v("清除历史")])],1),o("v-uni-view",{staticClass:"labelBox flex",staticStyle:{"margin-bottom":"10rpx"}},[t._l(t.localWordList,(function(e,i){return i<=6?[o("tui-tag",{key:i+"_0",attrs:{size:"small",type:"white"},on:{click:function(o){arguments[0]=o=t.$handleEvent(o),t._choose(e)}}},[t._v(t._s(e))])]:t._e()}))],2)],1),t.show?o("v-uni-view",{staticClass:"animated fadeIn"},[o("v-uni-view",{staticClass:"f1 "},[o("v-uni-view",{staticClass:"mainContent"},[o("v-uni-view",{staticClass:"hotItemBar "},[t._l(t.lists,(function(e,i){return[o("v-uni-navigator",{key:i+"_0",staticClass:"proItemsBox flex flex_around",attrs:{url:"/pages/main/details/details?code="+e.goods_code}},[o("v-uni-view",{staticClass:"picBox"},[o("v-uni-image",{staticClass:"pre animated",class:e.load?"fadeIn":"",attrs:{"lazy-load":"true",src:e.goods_main_img,mode:"aspectFill"},on:{load:function(e){arguments[0]=e=t.$handleEvent(e),t.imageLoad(i)},error:function(e){arguments[0]=e=t.$handleEvent(e),t.loadError(i)}}})],1),o("v-uni-view",{staticClass:" f1 msgBox cm_bdb"},[o("v-uni-view",{staticClass:" cm_ellipsis2  ",staticStyle:{"line-height":"1.3"}},[t._v(t._s(e.goods_title))]),o("v-uni-view",{staticClass:"cm_prize",staticStyle:{"margin-top":"10rpx"}},[t._v("￥"+t._s(e.goods_price))]),o("v-uni-view",{staticClass:"cm_des",staticStyle:{"margin-top":"10rpx"}},[t._v(t._s(e.buy_count)+"人购买")])],1)],1)]}))],2),o("LoadMore",{attrs:{status:t.loadStatus}})],1)],1)],1):t._e()],1)},n=[]},"7d5f":function(t,e,o){var i=o("24fb");e=i(!1),e.push([t.i,".tui-countdown-box[data-v-abac6bae]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.tui-countdown-box[data-v-abac6bae]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.tui-countdown-item[data-v-abac6bae]{border:%?1?% solid;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;padding:%?1?% %?10?%;border-radius:%?6?%;white-space:nowrap;-webkit-transform:translateZ(0);transform:translateZ(0)}.tui-countdown-time[data-v-abac6bae]{margin:0;padding:0}.tui-countdown-colon[data-v-abac6bae]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;padding:0 %?5?%;font-size:%?28?%}.tui-colon-pad[data-v-abac6bae]{padding:0!important}.tui-countdown-scale[data-v-abac6bae]{-webkit-transform:scale(.9);transform:scale(.9);-webkit-transform-origin:center center;transform-origin:center center}",""]),t.exports=e},"80b6":function(t,e,o){var i=o("7d5f");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var a=o("4f06").default;a("8d3ec72a",i,!0,{sourceMap:!1,shadowMode:!1})},a4c4:function(t,e,o){var i=o("24fb");e=i(!1),e.push([t.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.page .fixed[data-v-149b5482]{position:fixed;width:100%;left:0;top:0;z-index:100}.page .fixed .search[data-v-149b5482]{padding:%?10?% 0}.page .fixed .search .search-form[data-v-149b5482]{height:%?68?%;border-radius:%?34?%}.page .content[data-v-149b5482]{box-sizing:border-box;padding:%?20?%;background:#fff!important;margin-bottom:%?20?%}.page .content .cm_title[data-v-149b5482]{line-height:1;margin-right:%?20?%}.page .content .labelBox[data-v-149b5482]{-webkit-flex-wrap:wrap;flex-wrap:wrap;margin-top:%?10?%}.page .content .labelBox .label[data-v-149b5482]{background:#fff;padding:%?18?% %?38?%;font-size:%?24?%;margin-right:%?30?%}.page .content .labelBox .active[data-v-149b5482]{background:#f4f4f4}.page .content .labelBox .latest[data-v-149b5482]{margin-bottom:%?20?%;padding:0 %?18?%;max-width:%?120?%;width:%?120?%;text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.page .hotItemBar[data-v-149b5482]{width:100%;-webkit-flex-wrap:wrap;flex-wrap:wrap;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between}.page .hotItemBar .proItemsBox[data-v-149b5482]{width:100%;background:#fff;padding:0 %?20?%;overflow:hidden}.page .hotItemBar .proItemsBox .picBox[data-v-149b5482]{padding:%?20?% 0;width:%?180?%;height:%?180?%;position:relative;border-radius:%?14?%;margin-right:%?10?%}.page .hotItemBar .proItemsBox .picBox .pre[data-v-149b5482]{width:%?160?%;height:%?160?%;opacity:0}.page .hotItemBar .proItemsBox .msgBox[data-v-149b5482]{padding:%?20?% 0;width:60%}.page .hotItemBar .proItemsBox .msgBox .protitle[data-v-149b5482]{height:%?84?%;overflow:hidden;line-height:1.4;margin-bottom:%?12?%}.page .hotItemBar .proItemsBox .msgBox .cm_ellipsis[data-v-149b5482]{margin-top:%?8?%}.page .hotItemBar .proItemsBox .msgBox .cm_text[data-v-149b5482]{line-height:%?64?%;-webkit-box-pack:start;-webkit-justify-content:flex-start;justify-content:flex-start}.page .hotItemBar .proItemsBox .msgBox .has[data-v-149b5482]{margin-top:%?14?%;line-height:1;font-size:%?24?%}.page .hotItemBar .proItemsBox .msgBox .timeBox[data-v-149b5482]{line-height:%?36?%;height:%?36?%;border-radius:%?18?%;background:#e82324;color:#fff;padding:0 %?16?%}',""]),t.exports=e},a8e9:function(t,e,o){"use strict";var i;o.d(e,"b",(function(){return a})),o.d(e,"c",(function(){return n})),o.d(e,"a",(function(){return i}));var a=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("v-uni-view",{staticClass:"tui-countdown-box"},[t.days?o("v-uni-view",{staticClass:"tui-countdown-item",style:{background:t.bgcolor,borderColor:t.bcolor,width:t.width+"rpx",height:t.height+"rpx"}},[o("v-uni-view",{staticClass:"tui-countdown-time",class:[t.scale?"tui-countdown-scale":""],style:{fontSize:t.size+"rpx",color:t.color,lineHeight:t.size+"rpx"}},[t._v(t._s(t.d))])],1):t._e(),t.days?o("v-uni-view",{staticClass:"tui-countdown-colon",class:{"tui-colon-pad":"transparent"==t.bcolor},style:{lineHeight:t.colonSize+"rpx",fontSize:t.colonSize+"rpx",color:t.colonColor}},[t._v(t._s(t.isColon?":":"天"))]):t._e(),t.hours?o("v-uni-view",{staticClass:"tui-countdown-item",style:{background:t.bgcolor,borderColor:t.bcolor,width:t.width+"rpx",height:t.height+"rpx"}},[o("v-uni-view",{staticClass:"tui-countdown-time",class:[t.scale?"tui-countdown-scale":""],style:{fontSize:t.size+"rpx",color:t.color,lineHeight:t.size+"rpx"}},[t._v(t._s(t.h))])],1):t._e(),t.hours?o("v-uni-view",{staticClass:"tui-countdown-colon",class:{"tui-colon-pad":"transparent"==t.bcolor},style:{lineHeight:t.colonSize+"rpx",fontSize:t.colonSize+"rpx",color:t.colonColor}},[t._v(t._s(t.isColon?":":"时"))]):t._e(),t.minutes?o("v-uni-view",{staticClass:"tui-countdown-item",style:{background:t.bgcolor,borderColor:t.bcolor,width:t.width+"rpx",height:t.height+"rpx"}},[o("v-uni-view",{staticClass:"tui-countdown-time",class:[t.scale?"tui-countdown-scale":""],style:{fontSize:t.size+"rpx",color:t.color,lineHeight:t.size+"rpx"}},[t._v(t._s(t.i))])],1):t._e(),t.minutes?o("v-uni-view",{staticClass:"tui-countdown-colon",class:{"tui-colon-pad":"transparent"==t.bcolor},style:{lineHeight:t.colonSize+"rpx",fontSize:t.colonSize+"rpx",color:t.colonColor}},[t._v(t._s(t.isColon?":":"分"))]):t._e(),t.seconds&&t.minutes?o("v-uni-view",{staticClass:"tui-countdown-item",style:{background:t.bgcolor,borderColor:t.bcolor,width:t.width+"rpx",height:t.height+"rpx"}},[o("v-uni-view",{staticClass:"tui-countdown-time",class:[t.scale?"tui-countdown-scale":""],style:{fontSize:t.size+"rpx",color:t.color,lineHeight:t.size+"rpx"}},[t._v(t._s(t.s))])],1):t._e(),t.seconds&&!t.isColon&&t.minutes?o("v-uni-view",{staticClass:"tui-countdown-colon",class:{"tui-colon-pad":"transparent"==t.bcolor},style:{lineHeight:t.colonSize+"rpx",fontSize:t.colonSize+"rpx",color:t.colonColor}},[t._v("秒")]):t._e()],1)},n=[]},aad4:function(t,e,o){"use strict";var i=o("577d"),a=o.n(i);a.a},b0b0:function(t,e,o){"use strict";var i=o("4ea4");o("a9e3"),o("e25e"),o("ac1f"),o("5319"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a,n=i(o("ade3")),s=(a={name:"tuiCountdown",props:{width:{type:Number,default:24},height:{type:Number,default:24},bcolor:{type:String,default:"#333"},bgcolor:{type:String,default:"#fff"},size:{type:Number,default:24},color:{type:String,default:"#333"},scale:{type:Boolean,default:!1},colonSize:{type:Number,default:24},colonColor:{type:String,default:"#333"},time:{type:[Number,String],default:0},days:{type:Boolean,default:!1},hours:{type:Boolean,default:!0},minutes:{type:Boolean,default:!0},seconds:{type:Boolean,default:!0},isColon:{type:Boolean,default:!0}},data:function(){return{countdown:null,h:"00",i:"00",s:"00"}},watch:{time:function(t){clearInterval(this.countdown),this.doLoop()}}},(0,n.default)(a,"data",(function(){return{countdown:null,d:"0",h:"00",i:"00",s:"00"}})),(0,n.default)(a,"created",(function(){this.doLoop()})),(0,n.default)(a,"beforeDestroy",(function(){clearInterval(this.countdown),this.countdown=null})),(0,n.default)(a,"methods",{endOfTime:function(){clearInterval(this.countdown),this.countdown=null,this.$emit("end",{})},doLoop:function(){var t=this,e=0;if("string"==typeof this.time){var o=this.time.replace(/-/g,"/"),i=(new Date).getTime(),a=new Date(o).getTime(),n=(a-i)/1e3;e=parseInt(n)}else e=this.time;this.countDown(e),this.countdown=setInterval((function(){e--,e<0?t.endOfTime():t.countDown(e)}),1e3)},countDown:function(t){var e=0,o=0,i=0,a=0;t>0?(e=this.days?Math.floor(t/86400):0,o=Math.floor(t/3600)-24*e,i=Math.floor(t/60)-60*o-24*e*60,a=Math.floor(t)-24*e*60*60-60*o*60-60*i):this.endOfTime(),o=o<10?"0"+o:o,i=i<10?"0"+i:i,a=a<10?"0"+a:a,this.d=e,this.h=o,this.i=i,this.s=a}}),a);e.default=s},c960:function(t,e,o){"use strict";var i=o("80b6"),a=o.n(i);a.a},d1a1:function(t,e,o){"use strict";o.r(e);var i=o("4fd6"),a=o.n(i);for(var n in i)"default"!==n&&function(t){o.d(e,t,(function(){return i[t]}))}(n);e["default"]=a.a}}]);