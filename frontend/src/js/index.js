
/*
参考

https://www.weixinsxy.com/jssdk/
https://www.weixinsxy.com/jssdk/js/demo.js
https://vant-contrib.gitee.io/vant/#/zh-CN/cell


验签名
https://mp.weixin.qq.com/debug/cgi-bin/sandbox?t=jsapisign

o= {
  "appId": "wx0f713af1c8799df9",
  "nonceStr": "fafecjbomelanndg",
  "jsapi_ticket": "sM4AOVdWfPE4DxkXGEs8VMdpedBBeAe0I5SLCr-9y-5fDKLsLSZ6pu_XFLnO3wHDK7OZZnWg8hXQYE8XoXR-Lg",
  "signature": "8e8259fabb6eb8398c45edfac45e4f2a6f18aa05",
  "url": "https://weixin-1252957949.cos-website.ap-guangzhou.myqcloud.com",
  "rawString": "jsapi_ticket=sM4AOVdWfPE4DxkXGEs8VMdpedBBeAe0I5SLCr-9y-5fDKLsLSZ6pu_XFLnO3wHDK7OZZnWg8hXQYE8XoXR-Lg&noncestr=fafecjbomelanndg&timestamp=1594719045&url=https://weixin-1252957949.cos-website.ap-guangzhou.myqcloud.com",
  "timestamp": 1594719045,
  "expires_in": 1594726245,
  "token": "35_xRHmLhoT_m12gUYak51bbcpi7WOILN9c1jb_7eCm2ZmdyhPqYqnWzSb2hjjEYB7HG7783VobRBoHG1cZszbB9qBndbEsxPbmG57SMkkQhcsjavmXLfOh5qJKVANAJoe9XQh8l5HbeGYPo9t1ZHXjAGALTJ"
}


s='jsapi_ticket=sM4AOVdWfPE4DxkXGEs8VMdpedBBeAe0I5SLCr-9y-5fDKLsLSZ6pu_XFLnO3wHDK7OZZnWg8hXQYE8XoXR-Lg&noncestr=fafecjbomelanndg&timestamp=1594719045&url=https://weixin-1252957949.cos-website.ap-guangzhou.myqcloud.com'

sign(s) == '8e8259fabb6eb8398c45edfac45e4f2a6f18aa05'



o= {
  "appId": "wx0f713af1c8799df9",
  "nonceStr": "lnihbfokhheenblk",
  "jsapi_ticket": "sM4AOVdWfPE4DxkXGEs8VMdpedBBeAe0I5SLCr-9y-6pJ6IF1cmOTqjMl5qREtXstnTX1za-7BZqKHTKiCxi4w",
  "signature": "c8da7cac6f40ac0a6f72a804886c51d65451f660",
  "url": "https://www.baidu.com",
  "rawString": "jsapi_ticket=sM4AOVdWfPE4DxkXGEs8VMdpedBBeAe0I5SLCr-9y-6pJ6IF1cmOTqjMl5qREtXstnTX1za-7BZqKHTKiCxi4w&noncestr=lnihbfokhheenblk&timestamp=1594694353&url=https://www.baidu.com",
  "timestamp": 1594694353,
  "expires_in": 1594701553,
  "token": "35_uu8a-DngMD28gRTAv-xcwgl6wxSyfm2cT6miOxgP-z9H18vSA8Snbi4c8gZOjlmbaH70Qg45_koZMuD-2Uq-yTHTPhow6n2kjlmKCRd_EpH3bK1ft3Af3Wti7_uSa_gqOHU71q03_7dWTbkhGQVjABAZJO"
}
*/

const jsApiList=[
        'checkJsApi',
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
        'onMenuShareQQ',
        'onMenuShareWeibo',
        'onMenuShareQZone',
        'hideMenuItems',
        'showMenuItems',
        'hideAllNonBaseMenuItem',
        'showAllNonBaseMenuItem',
        'translateVoice',
        'startRecord',
        'stopRecord',
        'onVoiceRecordEnd',
        'playVoice',
        'onVoicePlayEnd',
        'pauseVoice',
        'stopVoice',
        'uploadVoice',
        'downloadVoice',
        'chooseImage',
        'previewImage',
        'uploadImage',
        'downloadImage',
        'getNetworkType',
        'openLocation',
        'getLocation',
        'hideOptionMenu',
        'showOptionMenu',
        'closeWindow',
        'scanQRCode',
        'chooseWXPay',
        'openProductSpecificView',
        'addCard',
        'chooseCard',
        'openCard',
]

vcomponents=[
	"ActionSheet",
	"AddressEdit",
	"AddressList",
	"Area",
	"Button",
	"Calendar",
	"Card",
	"Cell",
	"CellGroup",
	"Checkbox",
	"CheckboxGroup",
	"Circle",
	"Col",
	"Collapse",
	"CollapseItem",
	"ContactCard",
	"ContactEdit",
	"ContactList",
	"CountDown",
	"Coupon",
	"CouponCell",
	"CouponList",
	"DatetimePicker",
	"Dialog",
	"Divider",
	"DropdownItem",
	"DropdownMenu",
	"Empty",
	"Field",
	"Form",
	"GoodsAction",
	"GoodsActionButton",
	"GoodsActionIcon",
	"Grid",
	"GridItem",
	"Icon",
	"Image",
	"ImagePreview",
	"IndexAnchor",
	"IndexBar",
	"Info",
	"Lazyload",
	"List",
	"Loading",
	"Locale",
	"NavBar",
	"NoticeBar",
	"Notify",
	"NumberKeyboard",
	"Overlay",
	"Pagination",
	"Panel",
	"PasswordInput",
	"Picker",
	"Popup",
	"Progress",
	"PullRefresh",
	"Radio",
	"RadioGroup",
	"Rate",
	"Row",
	"Search",
	"ShareSheet",
	"Sidebar",
	"SidebarItem",
	"Skeleton",
	"Sku",
	"Slider",
	"Step",
	"Stepper",
	"Steps",
	"Sticky",
	"SubmitBar",
	"Swipe",
	"SwipeCell",
	"SwipeItem",
	"Switch",
	"SwitchCell",
	"Tab",
	"Tabbar",
	"TabbarItem",
	"Tabs",
	"Tag",
	"Toast",
	"TreeSelect",
	"Uploader"
]


get=(u)=>fetch(u).then(x=>x.json())

wx.ready(function(e){
    console.log('rrrrrrr',e)
});
wx.error(function(res){
    console.log('111111',res)
});


init=async()=>{
    let u="https://service-qsqxa5fo-1252957949.gz.apigw.tencentcs.com/release/weixin-token/jssdk"
    let o=await get(u)
    localStorage.config=JSON.stringify(o)
    let o1={
      ...o,
      debug: true,
      jsApiList,
    }
    wx.config(o1)
    return o
}


Vue.use(vant.Lazyload);
vcomponents.forEach(x=>Vue.use(vant[x]))

events={
    openLocation:{
        latitude: 22.545538,
        longitude: 114.054565,
        name: 'aaa',
        address: 'bbb',
        scale: 10,
    },
    checkJsApi:{
      jsApiList: ['chooseImage'],
      success: function(res) {
         vant.Toast(res);
      // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
      }
    },
    updateAppMessageShareData:{
        title: 'aa', // 分享标题
        desc: 'bb', // 分享描述
        link: 'cc', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: 'dd', // 分享图标
        success: function () {
             vant.Toast("share success");
        },
    },
    updateTimelineShareData:{
        title: 'aa', // 分享标题
        link: 'cc', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: 'dd', // 分享图标
        success: function () {
             vant.Toast("share success");
        },
    },
    onMenuShareTimeline:{
        title: 'aa', // 分享标题
        link: 'cc', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: 'dd', // 分享图标
        success: function () {
             vant.Toast("share success");
        },

    },

    //...
}



app= new Vue({
    el: '#app',
  //  template: `<van-button>按钮</van-button>`,
    created(){
    },
    methods:{
     say(x){
         console.log(x)
         vant.Toast(x);
         if (events[x]) {
            wx[x](events[x])
         }
     },
    },
    mounted(){
       init().then(x=>{
           this.config=x
       })
    },
    data(){
      return {
            href:window.location.href,
            config:{},
            config_keys:[
                  'appId',
                  'nonceStr',
                  'jsapi_ticket',
                  'signature',
                  'url',
                  'rawString',
                  'timestamp',
                  'expires_in',
                  'token',
            ],
            events,
            jsApiList,
            buttons:[
                "default",
                "primary",
                "info",
                "warning",
                "danger",
            ],
      }

    }
  });



