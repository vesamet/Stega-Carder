(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{352:function(t,e,o){"use strict";e.a={data:function(){return{cardWidth:300,cardHeight:400,padding:30,textOffset:10}},methods:{getDataAreaBounds:function(){return{start:[this.padding+this.textOffset,this.padding+70],end:[this.cardWidth-this.padding-this.textOffset,this.cardHeight-this.padding-30],width:this.cardWidth-this.padding-this.textOffset-(this.padding+this.textOffset),height:this.cardHeight-this.padding-30-(this.padding+70)}},clone:function(object){return JSON.parse(JSON.stringify(object))}}}},396:function(t,e){},397:function(t,e){},406:function(t,e){},407:function(t,e){},426:function(t,e){},428:function(t,e){},431:function(t,e){},432:function(t,e){},437:function(t,e){},444:function(t,e){},455:function(t,e,o){var content=o(573);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(22).default)("19e972a8",content,!0,{sourceMap:!1})},460:function(t,e,o){var content=o(601);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(22).default)("1a69c3f2",content,!0,{sourceMap:!1})},466:function(t,e,o){var content=o(631);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(22).default)("f1ce5c8e",content,!0,{sourceMap:!1})},472:function(t,e,o){"use strict";o.r(e);o(361),o(11),o(55),o(478),o(367),o(368),o(369),o(370),o(371),o(372),o(373),o(374),o(375),o(376),o(377),o(378),o(379),o(380),o(381),o(382),o(383),o(384),o(385),o(386),o(387),o(388),o(389);var n=o(390),r=o(391),l=o.n(r),c=o(352),d=o(473),f={mixins:[c.a],components:{ColorPicker:d.default},data:function(){return{animateCard:!1,title:"Nani Poems",titleColor:"#000000FF",subtitle:"Feed Scavenger",subtitleColor:"#AAFDFFFF",input:"\n      The little red birds have all flown away 🐦\n      The tapestry of threads of conversation 🧵\n      Dusty and rolled up in a corner 🧹\n      The photos lie scattered on the floor 🖼️\n      The algorithms still remember 🖥️\n      And still remind me of you 🧝\n      ",textIsEncoded:!1,author:"Nina Abramovic",number:194,secret:"",cardType:"small",cardTypes:[{text:"Nano",value:"small"},{text:"Standard",value:"medium"},{text:"Large",value:"large"},{text:"Mega",value:"xlarge"},{text:"Giga",value:"xxlarge"}],backgroundColor:"#5958C5FF"}},methods:{render:function(){var t=this;switch(this.cardWidth=350+this.padding,this.cardType){case"small":this.cardHeight=150+this.padding;break;case"medium":this.cardHeight=250+this.padding;break;case"large":this.cardHeight=350+this.padding;break;case"xlarge":this.cardHeight=550+this.padding;break;case"xxlarge":this.cardHeight=850+this.padding}this.$nextTick((function(){var e=t.$refs.card.getContext("2d");e.clearRect(0,0,t.cardWidth,t.cardHeight),e.shadowColor=t.backgroundColor,e.shadowOffsetX=0,e.shadowOffsetY=0,e.shadowBlur=15,e.fillRect(t.padding/2,t.padding/2,t.cardWidth-t.padding,t.cardHeight-t.padding),e.fillStyle=t.backgroundColor,e.fillRect(t.padding/2,t.padding/2,t.cardWidth-t.padding,t.cardHeight-t.padding),e.strokeStyle=t.titleColor;e.strokeRect(t.padding/2+6,t.padding/2+6,t.cardWidth-t.padding-12,t.cardHeight-t.padding-12),e.textAlign="left",e.shadowBlur=0,e.font="bold 25px Courier New",e.fillStyle=t.titleColor,e.fillText(t.title,t.padding+t.textOffset,t.padding+25),e.font="bold 20px Courier New",e.fillStyle=t.subtitleColor,e.fillText(t.subtitle,t.padding+t.textOffset,t.padding+50),e.font="bold 17px Courier New",e.textAlign="right",e.fillText("— "+t.author,t.cardWidth-t.padding-t.textOffset,t.cardHeight-t.padding),t.number&&(e.font="bold 12px Courier New",e.fillText("#"+t.number,t.cardWidth-t.padding-t.textOffset,t.padding+20)),e.font="bold 12px Courier New",e.textAlign="left",e.fillText("Stega Card",t.padding+t.textOffset,t.cardHeight-t.padding);var o=t.clone(t.getDataAreaBounds());e.fillStyle=t.subtitleColor,e.fillRect(o.start[0],o.start[1],o.width,o.height),e.font="bold 20px Courier New",e.textAlign="center",e.fillStyle=t.backgroundColor,e.fillText("No Data",t.cardWidth/2,t.cardHeight/2+26),e.putImageData(new ImageData(new Uint8ClampedArray([0,0,0,254]),1,1),o.start[0],o.start[1])})),this.textIsEncoded=!1},encode:function(){var t=this;this.input&&(this.render(),this.$nextTick((function(){var e=t.$refs.card.getContext("2d"),o=t.secret?l.a.encrypt(t.input,t.secret).toString():t.input,r=n.a.deflate(o),c=t.clone(t.getDataAreaBounds()),d=e.createLinearGradient(0,0,c.start[0]+c.width+t.padding,0);d.addColorStop(0,t.titleColor),d.addColorStop(.3,t.backgroundColor),d.addColorStop(.5,t.subtitleColor),d.addColorStop(.7,t.backgroundColor),d.addColorStop(1,t.titleColor),e.fillStyle=d,e.fillRect(c.start[0],c.start[1],c.width,c.height);for(var f={x:c.start[0],y:c.start[1]},h=0;h<r.length;)if(e.putImageData(new ImageData(new Uint8ClampedArray([r[h],r[h+1],r[h+2],255]),1,1),f.x,f.y),h+=3,f.x++,f.x===c.end[0]&&(f.x=c.start[0],f.y++),h>=r.length){var v=t.secret?253:254;e.putImageData(new ImageData(new Uint8ClampedArray([0,0,0,v]),1,1),f.x,f.y);break}t.textIsEncoded=!0,t.animateCard=!0})))},reset:function(){var t=this;this.cardType="small",this.input="",this.number="001",this.author="Anonymous",this.backgroundColor="#DCDCE7FF",this.subtitle="template",this.subtitleColor="#062525FF",this.textIsEncoded=!1,this.title="Blank",this.titleColor="#0F2274FF",this.$nextTick((function(){t.render(),t.animateCard=!0}))}},mounted:function(){this.encode()}},h=(o(600),o(44)),v=o(64),m=o.n(v),C=o(281),x=o(653),y=o(285),w=o(461),_=o(457),k=o(286),S=o(656),T=o(328),O=o(654),component=Object(h.a)(f,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("v-card",{attrs:{flat:""}},[o("v-row",[o("v-col",{staticClass:"px-10",attrs:{cols:"12",md:"6"}},[o("h2",{staticClass:"primary--text text-left mb-4 alt-font"},[t._v("Define cartridge")]),t._v(" "),o("v-row",[o("v-col",{staticClass:"pa-1",attrs:{cols:"12",md:"10"}},[o("v-text-field",{attrs:{label:"Title",outlined:"",dense:"",counter:"",maxlength:"17"},on:{input:function(e){return t.render()}},model:{value:t.title,callback:function(e){t.title=e},expression:"title"}})],1),t._v(" "),o("v-col",{staticClass:"pa-2 pt-1 d-none d-md-flex",attrs:{cols:"2"}},[o("ColorPicker",{attrs:{color:t.titleColor},on:{"update:color":function(e){t.titleColor=e,t.render()}}})],1)],1),t._v(" "),o("v-row",[o("v-col",{staticClass:"pa-2",attrs:{cols:"12",md:"10"}},[o("v-row",[o("v-col",{staticClass:"pa-2",attrs:{cols:"12",md:"6"}},[o("v-text-field",{attrs:{dense:"",label:"Subtitle",outlined:"",counter:"",maxlength:"21"},on:{input:function(e){return t.render()}},model:{value:t.subtitle,callback:function(e){t.subtitle=e},expression:"subtitle"}})],1),t._v(" "),o("v-col",{staticClass:"pa-2",attrs:{cols:"12",md:"6"}},[o("v-text-field",{attrs:{dense:"",label:"Author",outlined:"",counter:"",maxlength:"19"},on:{input:function(e){return t.render()}},model:{value:t.author,callback:function(e){t.author=e},expression:"author"}})],1)],1)],1),t._v(" "),o("v-col",{staticClass:"pa-2 pt-1 d-none d-md-flex",attrs:{cols:"12",md:"2"}},[o("ColorPicker",{attrs:{color:t.subtitleColor},on:{"update:color":function(e){t.subtitleColor=e,t.render()}}})],1)],1),t._v(" "),o("v-row",[o("v-col",{staticClass:"pa-2",attrs:{cols:"12",md:"10"}},[o("v-row",[o("v-col",{staticClass:"pa-2"},[o("v-select",{attrs:{items:t.cardTypes,label:"Stega card size",outlined:"",dense:""},on:{input:function(e){return t.render()}},model:{value:t.cardType,callback:function(e){t.cardType=e},expression:"cardType"}})],1),t._v(" "),o("v-col",{staticClass:"pa-2"},[o("v-text-field",{attrs:{dense:"",type:"number",label:"Card number",outlined:"",counter:"",maxlength:"4"},on:{input:function(e){return t.render()}},model:{value:t.number,callback:function(e){t.number=e},expression:"number"}})],1)],1)],1),t._v(" "),o("v-col",{staticClass:"pa-2 pt-1 d-none d-md-flex",attrs:{cols:"2"}},[o("ColorPicker",{attrs:{color:t.backgroundColor},on:{"update:color":function(e){t.backgroundColor=e,t.render()}}})],1)],1),t._v(" "),o("v-row",{staticClass:"d-md-none d-lg-none d-xl-none px-0 text-left"},[o("v-col",{staticClass:"pa-1",attrs:{cols:"12"}},[o("v-card",{staticClass:"px-3 py-2 mb-3 outlined-card",attrs:{outlined:""}},[o("v-row",{staticClass:"pa-0"},[o("v-col",{staticClass:"text-left"},[o("p",{staticClass:"pb-0 mb-0 pt-2"},[t._v("Title :")])]),t._v(" "),o("v-col",{staticClass:"text-right mr-2"},[o("ColorPicker",{attrs:{color:t.titleColor},on:{"update:color":function(e){t.titleColor=e,t.render()}}})],1)],1)],1)],1),t._v(" "),o("v-col",{staticClass:"pa-1",attrs:{cols:"12"}},[o("v-card",{staticClass:"px-3 py-2 mb-3 outlined-card",attrs:{outlined:""}},[o("v-row",{staticClass:"pa-0"},[o("v-col",{staticClass:"text-left"},[o("p",{staticClass:"pb-0 mb-0 pt-2"},[t._v("Subtitle :")])]),t._v(" "),o("v-col",{staticClass:"text-right mr-2"},[o("ColorPicker",{attrs:{color:t.subtitleColor},on:{"update:color":function(e){t.subtitleColor=e,t.render()}}})],1)],1)],1)],1),t._v(" "),o("v-col",{staticClass:"pa-1",attrs:{cols:"12"}},[o("v-card",{staticClass:"px-3 py-2 mb-3 outlined-card",attrs:{outlined:""}},[o("v-row",{staticClass:"pa-0"},[o("v-col",{staticClass:"text-left"},[o("p",{staticClass:"pb-0 mb-0 pt-2"},[t._v("Background :")])]),t._v(" "),o("v-col",{staticClass:"text-right mr-2"},[o("ColorPicker",{attrs:{color:t.backgroundColor},on:{"update:color":function(e){t.backgroundColor=e,t.render()}}})],1)],1)],1)],1)],1),t._v(" "),o("v-divider",{staticClass:"mt-2 mb-5"}),t._v(" "),o("v-row",[o("v-col",{staticClass:"pa-1",attrs:{cols:"12",md:"10"}},[o("v-textarea",{attrs:{outlined:"",dense:"",label:"Text to encode"},on:{input:function(e){t.textIsEncoded=!1}},model:{value:t.input,callback:function(e){t.input=e},expression:"input"}})],1),t._v(" "),o("v-col",{staticClass:"pa-2",attrs:{cols:"12",md:"2","align-self":"center"}},[o("v-btn",{staticClass:"encode-btn mb-4 py-3 elevation-6",style:t.textIsEncoded?"opacity:0.5;":"",attrs:{color:"primary",block:""},on:{click:function(e){!t.textIsEncoded&&t.encode()}}},[t.textIsEncoded?[t._v("\n              Text"),o("br"),t._v("\n              encoded\n            ")]:[o("br"),t._v("\n              Encode"),o("br"),t._v("\n              text\n            ")]],2),t._v(" "),o("v-btn",{attrs:{color:"cancel",small:"",block:""},on:{click:function(e){t.render(),t.animateCard=!0,t.input=""}}},[t._v("\n            Clear\n          ")])],1)],1),t._v(" "),o("v-row",[o("v-col",{staticClass:"pa-1",attrs:{cols:"12",md:"10"}},[o("v-text-field",{attrs:{dense:"",label:"Encryption password (optional)",outlined:"","prepend-icon":"mdi-key","persistent-hint":"",placeholder:"Leave empty for no encryption.",hint:"Military-grade AES encryption. \n            Your recipient will need this password to read the card if you set one. Note that encryption can take up to 40 times more space."},on:{input:function(e){return t.render()}},model:{value:t.secret,callback:function(e){t.secret=e},expression:"secret"}})],1)],1)],1),t._v(" "),o("v-col",{staticClass:"pa-2",attrs:{cols:"12",md:"6","align-self":"center"}},[o("div",{staticClass:"card-box"},[o("canvas",{ref:"card",staticClass:"card",class:t.animateCard?"animate__animated animate__headShake":"",attrs:{width:t.cardWidth,height:t.cardHeight},on:{animationend:function(e){t.animateCard=!1}}})]),t._v(" "),o("br"),t._v(" "),o("v-btn",{staticClass:"mx-3",attrs:{color:"cancel"},on:{click:function(e){return t.reset()}}},[o("v-icon",{staticClass:"mr-2 mt-1"},[t._v("mdi-close")]),t._v(" Reset\n      ")],1),t._v(" "),t.$refs.card?o("a",{attrs:{download:t.title+"-"+t.subtitle+"-"+t.number+".png",href:t.$refs.card.toDataURL("image/png")}},[o("v-btn",{staticClass:"mx-3 mt-1",attrs:{color:"secondary"},on:{click:function(e){t.animateCard=!0}}},[t._v("\n          Obtain card "),o("v-icon",{staticClass:"ml-2"},[t._v("mdi-download-circle")])],1)],1):t._e()],1)],1)],1)}),[],!1,null,"02e0627a",null);e.default=component.exports;m()(component,{ColorPicker:o(473).default}),m()(component,{VBtn:C.a,VCard:x.a,VCol:y.a,VDivider:w.a,VIcon:_.a,VRow:k.a,VSelect:S.a,VTextField:T.a,VTextarea:O.a})},473:function(t,e,o){"use strict";o.r(e);var n={props:{color:{type:String,default:""}},data:function(){return{isOpen:!1}}},r=(o(572),o(44)),l=o(64),c=o.n(l),d=o(281),f=o(653),h=o(657),v=o(457),m=o(474),component=Object(r.a)(n,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("v-menu",{attrs:{"close-on-content-click":!1,"nudge-width":200,"offset-x":"","nudge-right":13},scopedSlots:t._u([{key:"activator",fn:function(e){var n=e.on,r=e.attrs;return[o("v-btn",t._g(t._b({staticClass:"menu-btn",attrs:{color:"primary",small:"",fab:""}},"v-btn",r,!1),n),[o("v-icon",[t._v("mdi-palette")]),t._v(" "),o("div",{staticClass:"pill",style:"background-color: "+t.color+";"})],1)]}}]),model:{value:t.isOpen,callback:function(e){t.isOpen=e},expression:"isOpen"}},[t._v(" "),o("v-card",[o("v-color-picker",{attrs:{value:t.color,"dot-size":"25",mode:"hexa","hide-mode-switch":""},on:{input:function(e){return t.$emit("update:color",e)}}})],1)],1)}),[],!1,null,"232986dd",null);e.default=component.exports;c()(component,{VBtn:d.a,VCard:f.a,VColorPicker:h.a,VIcon:v.a,VMenu:m.a})},572:function(t,e,o){"use strict";o(455)},573:function(t,e,o){(e=o(21)(!1)).push([t.i,"@import url(https://fonts.googleapis.com/css2?family=Eczar:wght@400;700&family=Ubuntu+Mono:wght@400;700&display=swap);"]),e.push([t.i,".menu-btn[data-v-232986dd]{position:relative}.pill[data-v-232986dd]{position:absolute;border-radius:50%;width:12px;height:12px;top:-10px;right:-10px}",""]),t.exports=e},600:function(t,e,o){"use strict";o(460)},601:function(t,e,o){(e=o(21)(!1)).push([t.i,"@import url(https://fonts.googleapis.com/css2?family=Eczar:wght@400;700&family=Ubuntu+Mono:wght@400;700&display=swap);"]),e.push([t.i,".card-box[data-v-02e0627a]{overflow:auto;position:relative;margin:auto}.card[data-v-02e0627a],.card-box[data-v-02e0627a]{text-align:center}.card[data-v-02e0627a]{margin:30px}.encode-btn[data-v-02e0627a]{height:100%!important}.outlined-card[data-v-02e0627a]{border:1px solid #9e9e9e}",""]),t.exports=e},630:function(t,e,o){"use strict";o(466)},631:function(t,e,o){(e=o(21)(!1)).push([t.i,"@import url(https://fonts.googleapis.com/css2?family=Eczar:wght@400;700&family=Ubuntu+Mono:wght@400;700&display=swap);"]),e.push([t.i,".main-col[data-v-7546b63d]{max-width:1500px}",""]),t.exports=e},658:function(t,e,o){"use strict";o.r(e);var n={components:{Carder:o(472).default}},r=(o(630),o(44)),l=o(64),c=o.n(l),d=o(281),f=o(653),h=o(285),v=o(461),m=o(457),C=o(286),component=Object(r.a)(n,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("v-row",{attrs:{justify:"center",align:"center"}},[o("v-col",{staticClass:"main-col text-center"},[o("v-card",{staticClass:"py-6 px-9 mt-3"},[o("h1",{staticClass:"main-title"},[t._v("Stega Carder")]),t._v(" "),o("v-divider",{staticClass:"py-3"}),t._v(" "),o("v-btn",{attrs:{color:"accent",fab:"",small:"",absolute:"",top:"",right:""},on:{click:function(e){return t.$router.push({path:"/"})}}},[o("v-icon",[t._v("mdi-home")])],1),t._v(" "),o("Carder")],1)],1)],1)}),[],!1,null,"7546b63d",null);e.default=component.exports;c()(component,{Carder:o(472).default}),c()(component,{VBtn:d.a,VCard:f.a,VCol:h.a,VDivider:v.a,VIcon:m.a,VRow:C.a})}}]);