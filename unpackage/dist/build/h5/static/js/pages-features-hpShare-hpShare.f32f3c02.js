(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-features-hpShare-hpShare"],{"057c":function(t,e,n){"use strict";var i;n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return r})),n.d(e,"a",(function(){return i}));var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",[n("v-uni-canvas",{style:{width:t.canvasW+"px",height:t.canvasH+"px"},attrs:{"canvas-id":t.CanvasID}})],1)},r=[]},"1e51":function(t,e,n){t.exports=n.p+"static/img/wx@1.5x.fbba922b.png"},"438d":function(t,e,n){"use strict";var i=n("6cf7"),o=n.n(i);o.a},"47bb":function(t,e,n){"use strict";var i;n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return r})),n.d(e,"a",(function(){return i}));var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"tki-qrcode"},[n("v-uni-image",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"show"}],style:{width:t.cpSize+"px",height:t.cpSize+"px"},attrs:{src:t.result}}),n("v-uni-canvas",{staticClass:"tki-qrcode-canvas",style:{width:t.cpSize+"px",height:t.cpSize+"px"},attrs:{"canvas-id":t.cid}})],1)},r=[]},"4e8b":function(t,e,n){"use strict";n.r(e);var i=n("e754"),o=n.n(i);for(var r in i)"default"!==r&&function(t){n.d(e,t,(function(){return i[t]}))}(r);e["default"]=o.a},"505d":function(t,e,n){"use strict";n.r(e);var i=n("057c"),o=n("bdb4");for(var r in o)"default"!==r&&function(t){n.d(e,t,(function(){return o[t]}))}(r);var a,s=n("f0c5"),u=Object(s["a"])(o["default"],i["b"],i["c"],!1,null,"87aa767a",null,!1,i["a"],a);e["default"]=u.exports},"542d":function(t,e,n){"use strict";var i=n("23e7"),o=n("d039"),r=n("408a"),a=1..toPrecision,s=o((function(){return"1"!==a.call(1,void 0)}))||!o((function(){a.call({})}));i({target:"Number",proto:!0,forced:s},{toPrecision:function(t){return void 0===t?a.call(r(this)):a.call(r(this),t)}})},"556d":function(t,e,n){var i=n("24fb");e=i(!1),e.push([t.i,".tki-qrcode[data-v-1c5c9cec]{position:relative}.tki-qrcode-canvas[data-v-1c5c9cec]{position:fixed;top:%?-99999?%;left:%?-99999?%;z-index:-99999}",""]),t.exports=e},"66f7":function(t,e,n){var i=n("d6da");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var o=n("4f06").default;o("d0fe2e32",i,!0,{sourceMap:!1,shadowMode:!1})},6923:function(t,e,n){t.exports=n.p+"static/img/pyq@1.5x.3cad13d9.png"},"6cf7":function(t,e,n){var i=n("556d");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var o=n("4f06").default;o("5cd30f5a",i,!0,{sourceMap:!1,shadowMode:!1})},"6e3a":function(t,e,n){"use strict";n.r(e);var i=n("47bb"),o=n("d26a");for(var r in o)"default"!==r&&function(t){n.d(e,t,(function(){return o[t]}))}(r);n("438d");var a,s=n("f0c5"),u=Object(s["a"])(o["default"],i["b"],i["c"],!1,null,"1c5c9cec",null,!1,i["a"],a);e["default"]=u.exports},"89af":function(t,e,n){"use strict";n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return r})),n.d(e,"a",(function(){return i}));var i={tkiQrcode:n("6e3a").default},o=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"pages flex flex_center flex_y"},[i("v-uni-view",{staticClass:"bg"}),i("v-uni-view",{staticClass:"f1 content"},[i("v-uni-view",{staticClass:"box flex flex_center flex_y"},[i("v-uni-view",{staticClass:"title"},[t._v("推广者: "+t._s(t.accountInfo.consumer_nick_name))]),i("v-uni-view",{staticClass:"sqrBox"},[i("tki-qrcode",{ref:"qrcode",attrs:{cid:"qrcode",val:t.shareUrl,unit:"rpx",size:400,onval:!0,loadMake:!0},on:{result:function(e){arguments[0]=e=t.$handleEvent(e),t.qrR.apply(void 0,arguments)}}})],1),i("v-uni-view",{staticClass:"bBox flex flex_center"},[i("v-uni-view",{staticClass:"btns",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t._save.apply(void 0,arguments)}}},[t._v("保存二维码")]),i("v-uni-view",{staticClass:"btns",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.sharurl.apply(void 0,arguments)}}},[t._v("复制推广链接")])],1),i("v-uni-view",{staticClass:"tBox flex flex_center"},[i("v-uni-text",{staticClass:"blanks"}),i("v-uni-text",{staticClass:"cm_title"},[t._v("分享到")]),i("v-uni-text",{staticClass:"blanks"})],1),i("v-uni-view",{staticClass:"sBox flex flex_center ",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.share.apply(void 0,arguments)}}},[i("v-uni-view",{staticClass:"pics"},[i("v-uni-image",{staticStyle:{width:"86rpx",height:"86rpx","border-radius":"50%"},attrs:{src:n("6923"),mode:"aspectFill"}})],1),i("v-uni-view",{staticStyle:{width:"120rpx",height:"1rpx"}}),i("v-uni-view",{staticClass:"pics"},[i("v-uni-image",{staticStyle:{width:"86rpx",height:"86rpx","border-radius":"50%"},attrs:{src:n("1e51"),mode:"aspectFill"}})],1)],1)],1),i("v-uni-view",{staticStyle:{padding:"20rpx"}},[i("v-uni-view",{staticClass:"text"},[t._v("1、好友识别二维码通过手机号进行注册")]),i("v-uni-view",{staticClass:"text"},[t._v("2、也可以分享此页面到微信，朋友圈邀请注册好友")]),i("v-uni-view",{staticClass:"text"},[t._v("3、注册完即可获得相应的奖品")])],1)],1)],1)},r=[]},9771:function(t,e,n){"use strict";var i=n("4ea4");n("d3b7"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,n("96cf");var o,r=i(n("1da1")),a={name:"wm-poster",props:{CanvasID:{Type:String,default:"PosterCanvas"},imgSrc:{Type:String,default:""},QrSrc:{Type:String,default:""},Title:{Type:String,default:""},TitleColor:{Type:String,default:"#333333"},LineType:{Type:[String,Boolean],default:!0},PriceTxt:{Type:String,default:"99.99"},PriceColor:{Type:String,default:"#e31d1a"},OriginalTxt:{Type:String,default:"199.99"},OriginalColor:{Type:String,default:"#b8b8b8"},Width:{Type:String,default:750},CanvasBg:{Type:String,default:"#ffffff"},Referrer:{Type:String,default:"quitter推荐给你"},ViewDetails:{Type:String,default:"长按或扫描识别二维码"}},data:function(){return{canvasW:0,canvasH:0,canvasImgSrc:"",ctx:null}},methods:{OnCanvas:function(){var t=this;return(0,r.default)(regeneratorRuntime.mark((function e(){var n,i,r,a,s,u,c,l,f,d,h,p,g;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return o.ctx=uni.createCanvasContext(o.CanvasID,t),n=uni.rpx2px(o.Width),i=uni.rpx2px(30),r=uni.rpx2px(150),a=0,e.next=5,o.getImageInfo({imgSrc:o.imgSrc});case 5:return s=e.sent,e.next=8,o.getImageInfo({imgSrc:o.QrSrc});case 8:u=e.sent,c=[s.width,s.height],l=[u.width,u.height],f=n-2*i,c[0]!=f&&(c[1]=Math.floor(f/c[0]*c[1]),c[0]=f),l[0]!=r&&(l[1]=Math.floor(r/l[0]*l[1]),l[0]=r),o.canvasW=n,o.canvasH=c[1]+l[1]+128,o.ctx.setFillStyle(o.CanvasBg),o.ctx.fillRect(0,0,n,o.canvasH),o.ctx.drawImage(s.path,i,i,c[0],c[1]),o.ctx.setFontSize(uni.rpx2px(28)),o.ctx.setFillStyle(o.TitleColor),d=0,h=c[1]+2*i+10,p=1,g=0;case 25:if(!(g<o.Title.length)){e.next=47;break}if(a+=o.ctx.measureText(o.Title[g]).width,!(a>c[0])){e.next=43;break}if(2!=p||!o.LineType){e.next=36;break}return o.ctx.fillText(o.Title.substring(d,g-8)+"...",i,h),a=0,d=g,p++,e.abrupt("break",47);case 36:o.ctx.fillText(o.Title.substring(d,g),i,h),a=0,h+=20,d=g,p++;case 41:e.next=44;break;case 43:g==o.Title.length-1&&(o.ctx.fillText(o.Title.substring(d,g+1),i,h),a=0);case 44:g++,e.next=25;break;case 47:a=i,h+=uni.rpx2px(60),1==p&&(h+=20),""!=o.PriceTxt&&(o.ctx.setFillStyle(o.PriceColor),o.ctx.setFontSize(uni.rpx2px(38)),o.ctx.fillText(o.PriceTxt,a,h),a+=o.ctx.measureText(o.PriceTxt).width+uni.rpx2px(10)),""!=o.PriceTxt&&""!=o.OriginalTxt&&(o.ctx.setFillStyle(o.OriginalColor),o.ctx.setFontSize(uni.rpx2px(24)),o.ctx.fillText(o.OriginalTxt,a,h)),o.ctx.strokeStyle=o.OriginalColor,o.ctx.moveTo(a,h-uni.rpx2px(10)),o.ctx.lineTo(a+o.ctx.measureText(o.OriginalTxt).width,h-uni.rpx2px(10)),o.ctx.stroke(),h+=uni.rpx2px(20),o.ctx.drawImage(u.path,c[0]-l[0]+i,h,l[0],l[1]),o.ctx.setFillStyle(o.TitleColor),o.ctx.setFontSize(uni.rpx2px(30)),o.ctx.fillText(o.Referrer,i,h+l[1]/2),o.ctx.setFillStyle(o.OriginalColor),o.ctx.setFontSize(uni.rpx2px(24)),o.ctx.fillText(o.ViewDetails,i,h+l[1]/2+20),setTimeout((function(){o.ctx.draw(!0,(function(t){o.getNewImage()}))}),600);case 65:case"end":return e.stop()}}),e)})))()},getImageInfo:function(t){return(0,r.default)(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return n=t.imgSrc,e.abrupt("return",new Promise((function(t,e){uni.getImageInfo({src:n,success:function(e){t(e)},fail:function(t){e(t)}})})));case 2:case"end":return e.stop()}}),e)})))()},getNewImage:function(){uni.canvasToTempFilePath({canvasId:o.CanvasID,quality:1,complete:function(t){console.log(t.tempFilePath),o.$emit("success",t)}},this)}},mounted:function(){o=this,o.OnCanvas()}};e.default=a},bdb4:function(t,e,n){"use strict";n.r(e);var i=n("9771"),o=n.n(i);for(var r in i)"default"!==r&&function(t){n.d(e,t,(function(){return i[t]}))}(r);e["default"]=o.a},cb29:function(t,e,n){var i=n("23e7"),o=n("81d5"),r=n("44d2");i({target:"Array",proto:!0},{fill:o}),r("fill")},d26a:function(t,e,n){"use strict";n.r(e);var i=n("ec22"),o=n.n(i);for(var r in i)"default"!==r&&function(t){n.d(e,t,(function(){return i[t]}))}(r);e["default"]=o.a},d50f:function(t,e,n){"use strict";var i=n("66f7"),o=n.n(i);o.a},d6da:function(t,e,n){var i=n("24fb");e=i(!1),e.push([t.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.pages[data-v-eca50866]{width:100%;height:100vh;background-size:contain;background-repeat:no-repeat}.pages .bg[data-v-eca50866]{width:100%;height:%?420?%}.pages .content[data-v-eca50866]{width:100%;background:#c37916;padding:%?40?% %?20?%}.pages .content .box[data-v-eca50866]{background:#fff;width:100%;border-radius:%?20?%;padding:%?40?% %?20?%}.pages .content .box .sqrBox[data-v-eca50866]{width:%?400?%;height:%?400?%;margin:%?32?% auto %?48?% auto}.pages .content .box .bBox[data-v-eca50866]{width:80%}.pages .content .box .bBox .btns[data-v-eca50866]{width:%?278?%;height:%?66?%;border-radius:%?33?%;background:var(--cl_primary);text-align:center;line-height:%?66?%;color:#333;margin:0 %?18?%}.pages .content .box .tBox[data-v-eca50866]{margin-top:%?56?%}.pages .content .box .tBox .blanks[data-v-eca50866]{width:%?108?%;height:%?4?%;background:#333;margin:0 %?20?%}.pages .content .box .sBox[data-v-eca50866]{margin-top:%?32?%}.pages .text[data-v-eca50866]{color:#fff;line-height:2;font-size:%?24?%}',""]),t.exports=e},dd4e:function(t,e,n){"use strict";n("cb29"),n("a9e3"),n("b680"),n("542d"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={};(function(){function t(t){var e,n,i;return t<128?[t]:t<2048?(e=192+(t>>6),n=128+(63&t),[e,n]):(e=224+(t>>12),n=128+(t>>6&63),i=128+(63&t),[e,n,i])}function e(e){for(var n=[],i=0;i<e.length;i++)for(var o=e.charCodeAt(i),r=t(o),a=0;a<r.length;a++)n.push(r[a]);return n}function n(t,n){this.typeNumber=-1,this.errorCorrectLevel=n,this.modules=null,this.moduleCount=0,this.dataCache=null,this.rsBlocks=null,this.totalDataCount=-1,this.data=t,this.utf8bytes=e(t),this.make()}n.prototype={constructor:n,getModuleCount:function(){return this.moduleCount},make:function(){this.getRightType(),this.dataCache=this.createData(),this.createQrcode()},makeImpl:function(t){this.moduleCount=4*this.typeNumber+17,this.modules=new Array(this.moduleCount);for(var e=0;e<this.moduleCount;e++)this.modules[e]=new Array(this.moduleCount);this.setupPositionProbePattern(0,0),this.setupPositionProbePattern(this.moduleCount-7,0),this.setupPositionProbePattern(0,this.moduleCount-7),this.setupPositionAdjustPattern(),this.setupTimingPattern(),this.setupTypeInfo(!0,t),this.typeNumber>=7&&this.setupTypeNumber(!0),this.mapData(this.dataCache,t)},setupPositionProbePattern:function(t,e){for(var n=-1;n<=7;n++)if(!(t+n<=-1||this.moduleCount<=t+n))for(var i=-1;i<=7;i++)e+i<=-1||this.moduleCount<=e+i||(this.modules[t+n][e+i]=0<=n&&n<=6&&(0==i||6==i)||0<=i&&i<=6&&(0==n||6==n)||2<=n&&n<=4&&2<=i&&i<=4)},createQrcode:function(){for(var t=0,e=0,n=null,i=0;i<8;i++){this.makeImpl(i);var o=a.getLostPoint(this);(0==i||t>o)&&(t=o,e=i,n=this.modules)}this.modules=n,this.setupTypeInfo(!1,e),this.typeNumber>=7&&this.setupTypeNumber(!1)},setupTimingPattern:function(){for(var t=8;t<this.moduleCount-8;t++)null==this.modules[t][6]&&(this.modules[t][6]=t%2==0,null==this.modules[6][t]&&(this.modules[6][t]=t%2==0))},setupPositionAdjustPattern:function(){for(var t=a.getPatternPosition(this.typeNumber),e=0;e<t.length;e++)for(var n=0;n<t.length;n++){var i=t[e],o=t[n];if(null==this.modules[i][o])for(var r=-2;r<=2;r++)for(var s=-2;s<=2;s++)this.modules[i+r][o+s]=-2==r||2==r||-2==s||2==s||0==r&&0==s}},setupTypeNumber:function(t){for(var e=a.getBCHTypeNumber(this.typeNumber),n=0;n<18;n++){var i=!t&&1==(e>>n&1);this.modules[Math.floor(n/3)][n%3+this.moduleCount-8-3]=i,this.modules[n%3+this.moduleCount-8-3][Math.floor(n/3)]=i}},setupTypeInfo:function(t,e){for(var n=o[this.errorCorrectLevel]<<3|e,i=a.getBCHTypeInfo(n),r=0;r<15;r++){var s=!t&&1==(i>>r&1);r<6?this.modules[r][8]=s:r<8?this.modules[r+1][8]=s:this.modules[this.moduleCount-15+r][8]=s;s=!t&&1==(i>>r&1);r<8?this.modules[8][this.moduleCount-r-1]=s:r<9?this.modules[8][15-r-1+1]=s:this.modules[8][15-r-1]=s}this.modules[this.moduleCount-8][8]=!t},createData:function(){var t=new f,e=this.typeNumber>9?16:8;t.put(4,4),t.put(this.utf8bytes.length,e);for(var i=0,o=this.utf8bytes.length;i<o;i++)t.put(this.utf8bytes[i],8);t.length+4<=8*this.totalDataCount&&t.put(0,4);while(t.length%8!=0)t.putBit(!1);while(1){if(t.length>=8*this.totalDataCount)break;if(t.put(n.PAD0,8),t.length>=8*this.totalDataCount)break;t.put(n.PAD1,8)}return this.createBytes(t)},createBytes:function(t){for(var e=0,n=0,i=0,o=this.rsBlock.length/3,r=new Array,s=0;s<o;s++)for(var u=this.rsBlock[3*s+0],l=this.rsBlock[3*s+1],f=this.rsBlock[3*s+2],d=0;d<u;d++)r.push([f,l]);for(var h=new Array(r.length),p=new Array(r.length),g=0;g<r.length;g++){var v=r[g][0],m=r[g][1]-v;n=Math.max(n,v),i=Math.max(i,m),h[g]=new Array(v);for(s=0;s<h[g].length;s++)h[g][s]=255&t.buffer[s+e];e+=v;var x=a.getErrorCorrectPolynomial(m),w=new c(h[g],x.getLength()-1),b=w.mod(x);p[g]=new Array(x.getLength()-1);for(s=0;s<p[g].length;s++){var T=s+b.getLength()-p[g].length;p[g][s]=T>=0?b.get(T):0}}var y=new Array(this.totalDataCount),C=0;for(s=0;s<n;s++)for(g=0;g<r.length;g++)s<h[g].length&&(y[C++]=h[g][s]);for(s=0;s<i;s++)for(g=0;g<r.length;g++)s<p[g].length&&(y[C++]=p[g][s]);return y},mapData:function(t,e){for(var n=-1,i=this.moduleCount-1,o=7,r=0,s=this.moduleCount-1;s>0;s-=2){6==s&&s--;while(1){for(var u=0;u<2;u++)if(null==this.modules[i][s-u]){var c=!1;r<t.length&&(c=1==(t[r]>>>o&1));var l=a.getMask(e,i,s-u);l&&(c=!c),this.modules[i][s-u]=c,o--,-1==o&&(r++,o=7)}if(i+=n,i<0||this.moduleCount<=i){i-=n,n=-n;break}}}}},n.PAD0=236,n.PAD1=17;for(var o=[1,0,3,2],r={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7},a={PATTERN_POSITION_TABLE:[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],G15:1335,G18:7973,G15_MASK:21522,getBCHTypeInfo:function(t){var e=t<<10;while(a.getBCHDigit(e)-a.getBCHDigit(a.G15)>=0)e^=a.G15<<a.getBCHDigit(e)-a.getBCHDigit(a.G15);return(t<<10|e)^a.G15_MASK},getBCHTypeNumber:function(t){var e=t<<12;while(a.getBCHDigit(e)-a.getBCHDigit(a.G18)>=0)e^=a.G18<<a.getBCHDigit(e)-a.getBCHDigit(a.G18);return t<<12|e},getBCHDigit:function(t){var e=0;while(0!=t)e++,t>>>=1;return e},getPatternPosition:function(t){return a.PATTERN_POSITION_TABLE[t-1]},getMask:function(t,e,n){switch(t){case r.PATTERN000:return(e+n)%2==0;case r.PATTERN001:return e%2==0;case r.PATTERN010:return n%3==0;case r.PATTERN011:return(e+n)%3==0;case r.PATTERN100:return(Math.floor(e/2)+Math.floor(n/3))%2==0;case r.PATTERN101:return e*n%2+e*n%3==0;case r.PATTERN110:return(e*n%2+e*n%3)%2==0;case r.PATTERN111:return(e*n%3+(e+n)%2)%2==0;default:throw new Error("bad maskPattern:"+t)}},getErrorCorrectPolynomial:function(t){for(var e=new c([1],0),n=0;n<t;n++)e=e.multiply(new c([1,s.gexp(n)],0));return e},getLostPoint:function(t){for(var e=t.getModuleCount(),n=0,i=0,o=0;o<e;o++)for(var r=0,a=t.modules[o][0],s=0;s<e;s++){var u=t.modules[o][s];if(s<e-6&&u&&!t.modules[o][s+1]&&t.modules[o][s+2]&&t.modules[o][s+3]&&t.modules[o][s+4]&&!t.modules[o][s+5]&&t.modules[o][s+6]&&(s<e-10?t.modules[o][s+7]&&t.modules[o][s+8]&&t.modules[o][s+9]&&t.modules[o][s+10]&&(n+=40):s>3&&t.modules[o][s-1]&&t.modules[o][s-2]&&t.modules[o][s-3]&&t.modules[o][s-4]&&(n+=40)),o<e-1&&s<e-1){var c=0;u&&c++,t.modules[o+1][s]&&c++,t.modules[o][s+1]&&c++,t.modules[o+1][s+1]&&c++,0!=c&&4!=c||(n+=3)}a^u?r++:(a=u,r>=5&&(n+=3+r-5),r=1),u&&i++}for(s=0;s<e;s++)for(r=0,a=t.modules[0][s],o=0;o<e;o++){u=t.modules[o][s];o<e-6&&u&&!t.modules[o+1][s]&&t.modules[o+2][s]&&t.modules[o+3][s]&&t.modules[o+4][s]&&!t.modules[o+5][s]&&t.modules[o+6][s]&&(o<e-10?t.modules[o+7][s]&&t.modules[o+8][s]&&t.modules[o+9][s]&&t.modules[o+10][s]&&(n+=40):o>3&&t.modules[o-1][s]&&t.modules[o-2][s]&&t.modules[o-3][s]&&t.modules[o-4][s]&&(n+=40)),a^u?r++:(a=u,r>=5&&(n+=3+r-5),r=1)}var l=Math.abs(100*i/e/e-50)/5;return n+=10*l,n}},s={glog:function(t){if(t<1)throw new Error("glog("+t+")");return s.LOG_TABLE[t]},gexp:function(t){while(t<0)t+=255;while(t>=256)t-=255;return s.EXP_TABLE[t]},EXP_TABLE:new Array(256),LOG_TABLE:new Array(256)},u=0;u<8;u++)s.EXP_TABLE[u]=1<<u;for(u=8;u<256;u++)s.EXP_TABLE[u]=s.EXP_TABLE[u-4]^s.EXP_TABLE[u-5]^s.EXP_TABLE[u-6]^s.EXP_TABLE[u-8];for(u=0;u<255;u++)s.LOG_TABLE[s.EXP_TABLE[u]]=u;function c(t,e){if(void 0==t.length)throw new Error(t.length+"/"+e);var n=0;while(n<t.length&&0==t[n])n++;this.num=new Array(t.length-n+e);for(var i=0;i<t.length-n;i++)this.num[i]=t[i+n]}c.prototype={get:function(t){return this.num[t]},getLength:function(){return this.num.length},multiply:function(t){for(var e=new Array(this.getLength()+t.getLength()-1),n=0;n<this.getLength();n++)for(var i=0;i<t.getLength();i++)e[n+i]^=s.gexp(s.glog(this.get(n))+s.glog(t.get(i)));return new c(e,0)},mod:function(t){var e=this.getLength(),n=t.getLength();if(e-n<0)return this;for(var i=new Array(e),o=0;o<e;o++)i[o]=this.get(o);while(i.length>=n){var r=s.glog(i[0])-s.glog(t.get(0));for(o=0;o<t.getLength();o++)i[o]^=s.gexp(s.glog(t.get(o))+r);while(0==i[0])i.shift()}return new c(i,0)}};var l=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]];function f(){this.buffer=new Array,this.length=0}n.prototype.getRightType=function(){for(var t=1;t<41;t++){var e=l[4*(t-1)+this.errorCorrectLevel];if(void 0==e)throw new Error("bad rs block @ typeNumber:"+t+"/errorCorrectLevel:"+this.errorCorrectLevel);for(var n=e.length/3,i=0,o=0;o<n;o++){var r=e[3*o+0],a=e[3*o+2];i+=a*r}var s=t>9?2:1;if(this.utf8bytes.length+s<i||40==t){this.typeNumber=t,this.rsBlock=e,this.totalDataCount=i;break}}},f.prototype={get:function(t){var e=Math.floor(t/8);return this.buffer[e]>>>7-t%8&1},put:function(t,e){for(var n=0;n<e;n++)this.putBit(t>>>e-n-1&1)},putBit:function(t){var e=Math.floor(this.length/8);this.buffer.length<=e&&this.buffer.push(0),t&&(this.buffer[e]|=128>>>this.length%8),this.length++}};var d=[];i=function(t){if(this.options={text:"",size:256,correctLevel:3,background:"#ffffff",foreground:"#000000",pdground:"#000000",image:"",imageSize:30,canvasId:t.canvasId,context:t.context,usingComponents:t.usingComponents,showLoading:t.showLoading,loadingText:t.loadingText},"string"===typeof t&&(t={text:t}),t)for(var e in t)this.options[e]=t[e];for(var i=null,o=(e=0,d.length);e<o;e++)if(d[e].text==this.options.text&&d[e].text.correctLevel==this.options.correctLevel){i=d[e].obj;break}e==o&&(i=new n(this.options.text,this.options.correctLevel),d.push({text:this.options.text,correctLevel:this.options.correctLevel,obj:i}));var r=function(t){var e=t.options;return e.pdground&&(t.row>1&&t.row<5&&t.col>1&&t.col<5||t.row>t.count-6&&t.row<t.count-2&&t.col>1&&t.col<5||t.row>1&&t.row<5&&t.col>t.count-6&&t.col<t.count-2)?e.pdground:e.foreground},a=function(t){t.showLoading&&uni.showLoading({title:t.loadingText,mask:!0});for(var e=uni.createCanvasContext(t.canvasId,t.context),n=i.getModuleCount(),o=t.size,a=t.imageSize,u=(o/n).toPrecision(4),c=(o/n).toPrecision(4),l=0;l<n;l++)for(var f=0;f<n;f++){var d=Math.ceil((f+1)*u)-Math.floor(f*u),h=Math.ceil((l+1)*u)-Math.floor(l*u),p=r({row:l,col:f,count:n,options:t});e.setFillStyle(i.modules[l][f]?p:t.background),e.fillRect(Math.round(f*u),Math.round(l*c),d,h)}if(t.image){var g=function(e,n,i,o,r,a,s,u,c){e.setLineWidth(s),e.setFillStyle(t.background),e.setStrokeStyle(t.background),e.beginPath(),e.moveTo(n+a,i),e.arcTo(n+o,i,n+o,i+a,a),e.arcTo(n+o,i+r,n+o-a,i+r,a),e.arcTo(n,i+r,n,i+r-a,a),e.arcTo(n,i,n+a,i,a),e.closePath(),u&&e.fill(),c&&e.stroke()},v=Number(((o-a)/2).toFixed(2)),m=Number(((o-a)/2).toFixed(2));g(e,v,m,a,a,2,6,!0,!0),e.drawImage(t.image,v,m,a,a)}setTimeout((function(){e.draw(!0,(function(){setTimeout((function(){uni.canvasToTempFilePath({width:t.width,height:t.height,destWidth:t.width,destHeight:t.height,canvasId:t.canvasId,quality:Number(1),success:function(e){t.cbResult&&(s(e.tempFilePath)?s(e.apFilePath)?t.cbResult(e.tempFilePath):t.cbResult(e.apFilePath):t.cbResult(e.tempFilePath))},fail:function(e){t.cbResult&&t.cbResult(e)},complete:function(){}},t.context)}),t.text.length+100)}))}),t.usingComponents?0:150)};a(this.options);var s=function(t){var e=typeof t,n=!1;return"number"==e&&""==String(t)||"undefined"==e?n=!0:"object"==e?"{}"!=JSON.stringify(t)&&"[]"!=JSON.stringify(t)&&null!=t||(n=!0):"string"==e?""!=t&&"undefined"!=t&&"null"!=t&&"{}"!=t&&"[]"!=t||(n=!0):"function"==e&&(n=!1),n}},i.prototype.clear=function(t){var e=uni.createCanvasContext(this.options.canvasId,this.options.context);e.clearRect(0,0,this.options.size,this.options.size),e.draw(!1,(function(){t&&t()}))}})();var o=i;e.default=o},ddf3:function(t,e,n){"use strict";n.r(e);var i=n("89af"),o=n("4e8b");for(var r in o)"default"!==r&&function(t){n.d(e,t,(function(){return o[t]}))}(r);n("d50f");var a,s=n("f0c5"),u=Object(s["a"])(o["default"],i["b"],i["c"],!1,null,"eca50866",null,!1,i["a"],a);e["default"]=u.exports},e754:function(t,e,n){"use strict";var i=n("4ea4");n("d81d"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=i(n("505d")),r=i(n("6e3a")),a={data:function(){return{parentId:"",QrSrcL:"",ewmPic:"",shareUrl:"http://hp.fjhjc.net/page/index.html",providerList:[],formParams:{website:"",invitation:""},shareAuth:!1,title:"爱心",logo:"http://hp.fjhjc.net/logo/hp_logo.png",accountInfo:""}},computed:{levelAccount:function(){return this.$store.state.levelAccount}},components:{tkiQrcode:r.default,wmPoster:o.default},onLoad:function(){var t=this;this.accountInfo=this.$store.state.accountInfo,uni.getProvider({service:"share",success:function(e){for(var n=[],i=0;i<e.provider.length;i++)switch(e.provider[i]){case"weixin":n.push({name:"分享到微信好友",id:"weixin"}),n.push({name:"分享到微信朋友圈",id:"weixin",type:"WXSenceTimeline"});break;default:break}t.providerList=n},fail:function(t){console.log("获取登录通道失败"+JSON.stringify(t))}})},methods:{share:function(t){var e=this;if(0!==this.providerList.length){var n=this.providerList.map((function(t){return t.name}));uni.showActionSheet({itemList:n,success:function(t){"qq"==e.providerList[t.tapIndex].id?e.type=1:e.type=0,uni.share({provider:e.providerList[t.tapIndex].id,scene:e.providerList[t.tapIndex].type&&"WXSenceTimeline"===e.providerList[t.tapIndex].type?"WXSenceTimeline":"WXSceneSession",type:0,title:"睿众商城",summary:"睿众商城诚邀您加入",imageUrl:e.logo,href:e.shareUrl,success:function(t){console.log("success:"+JSON.stringify(t))},fail:function(t){uni.showModal({content:t.errMsg,showCancel:!1})}})}})}else uni.showModal({title:"当前环境无分享渠道!",showCancel:!1})},qrR:function(t){this.ewmPic=t},_navBack:function(){uni.navigateBack({})},_menus:function(){var t=this;uni.showActionSheet({itemList:["立即分享"],success:function(e){var n=e.tapIndex;switch(n){case 1:t.toshare();break;default:break}},fail:function(t){console.log(t.errMsg)}})},_save:function(){var t=this,e=this;uni.showActionSheet({itemList:["保存图片到相册"],success:function(){uni.saveImageToPhotosAlbum({filePath:t.ewmPic,success:function(){e.$ui.toast("保存成功")}})}})},_cancel:function(){this.QrSrcL="",this.inbanner=!0},sharurl:function(t){var e=this.shareUrl;uni.setClipboardData({data:e,success:function(){console.log("success"),uni.showModal({title:"复制成功",content:"推广链接已复制到粘贴板",showCancel:!1,success:function(t){t.confirm||t.cancel}})}})}}};e.default=a},ec22:function(t,e,n){"use strict";var i=n("4ea4");n("a9e3"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o,r=i(n("dd4e")),a={name:"tki-qrcode",props:{cid:{type:String,default:"tki-qrcode-canvas"},size:{type:Number,default:200},unit:{type:String,default:"rpx"},show:{type:Boolean,default:!0},val:{type:String,default:""},background:{type:String,default:"#ffffff"},foreground:{type:String,default:"#000000"},pdground:{type:String,default:"#000000"},icon:{type:String,default:""},iconSize:{type:Number,default:40},lv:{type:Number,default:3},onval:{type:Boolean,default:!1},loadMake:{type:Boolean,default:!1},usingComponents:{type:Boolean,default:!0},showLoading:{type:Boolean,default:!0},loadingText:{type:String,default:"二维码生成中"}},data:function(){return{result:""}},methods:{_makeCode:function(){var t=this;this._empty(this.val)?uni.showToast({title:"二维码内容不能为空",icon:"none",duration:2e3}):o=new r.default({context:t,canvasId:t.cid,usingComponents:t.usingComponents,showLoading:t.showLoading,loadingText:t.loadingText,text:t.val,size:t.cpSize,background:t.background,foreground:t.foreground,pdground:t.pdground,correctLevel:t.lv,image:t.icon,imageSize:t.iconSize,cbResult:function(e){t._result(e)}})},_clearCode:function(){this._result(""),o.clear()},_saveCode:function(){var t=this;""!=this.result&&uni.saveImageToPhotosAlbum({filePath:t.result,success:function(){uni.showToast({title:"二维码保存成功",icon:"success",duration:2e3})}})},_result:function(t){this.result=t,this.$emit("result",t)},_empty:function(t){var e=typeof t,n=!1;return"number"==e&&""==String(t)||"undefined"==e?n=!0:"object"==e?"{}"!=JSON.stringify(t)&&"[]"!=JSON.stringify(t)&&null!=t||(n=!0):"string"==e?""!=t&&"undefined"!=t&&"null"!=t&&"{}"!=t&&"[]"!=t||(n=!0):"function"==e&&(n=!1),n}},watch:{size:function(t,e){var n=this;t==e||this._empty(t)||(this.cSize=t,this._empty(this.val)||setTimeout((function(){n._makeCode()}),100))},val:function(t,e){var n=this;this.onval&&(t==e||this._empty(t)||setTimeout((function(){n._makeCode()}),0))}},computed:{cpSize:function(){return"rpx"==this.unit?uni.rpx2px(this.size):this.size}},mounted:function(){var t=this;this.loadMake&&(this._empty(this.val)||setTimeout((function(){t._makeCode()}),0))}};e.default=a}}]);