
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
        'onVoiceRecordEnd', //
        'playVoice',
        'onVoicePlayEnd',  //
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
        'scanQRCode', //
        'chooseWXPay',
        'openProductSpecificView',
        'addCard',
        'chooseCard',
        'openCard',
]

api_name= {
	"checkJsApi": "是否支持指定JS",
	"onMenuShareTimeline": "分享到朋友圈",
	"onMenuShareAppMessage": "分享给朋友",
	"onMenuShareQQ": "分享到QQ",
	"onMenuShareWeibo": "分享到腾讯微博",
	"onMenuShareQZone": "分享到QZone",
	"chooseImage": "拍照或从手机相册中选图",
	"previewImage": "预览图片",
	"uploadImage": "上传图片",
	"downloadImage": "下载图片",
	"startRecord": "开始录音",
	"stopRecord": "停止录音",
	"playVoice": "播放语音",
	"pauseVoice": "暂停播放",
	"stopVoice": "停止播放",
	"uploadVoice": "上传语音",
	"downloadVoice": "下载语音",
	"translateVoice": "识别音频并返回识别结果",
	"getNetworkType": "获取网络状态",
	"openLocation": "使用微信内置地图查看位置",
	"getLocation": "获取地理位置",
	"hideOptionMenu": "隐藏右上角菜单",
	"showOptionMenu": "显示右上角菜单",
	"closeWindow": "关闭当前网页窗口",
	"hideMenuItems": "批量隐藏功能按钮",
	"showMenuItems": "批量显示功能按钮",
	"hideAllNonBaseMenuItem": "隐藏所有非基础按钮",
	"showAllNonBaseMenuItem": "显示所有功能按钮",
	"scanQRCode": "调起微信扫一扫",
	"openProductSpecificView": "跳转微信商品页",
	"addCard": "批量添加卡券",
	"chooseCard": "调起适用于门店的卡券列表并获取用户选择列表",
	"openCard": "查看微信卡包中的卡券",
	"chooseWXPay": "发起一个微信支付请求",
}



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


get=(u,d={})=>axios.get(u,d).then(x=>x.data)

wx.ready(function(e){
    vant.Toast("ready");
    console.log('rrrrrrr',e)
});
wx.error(function(res){
    vant.Toast("error");
    console.log('111111',res)
});

now=()=>Math.ceil(moment.now()/1e3)

init_weixin=(o={})=>{
        let o1={
          ...o,
          debug: true,
          jsApiList,
        }
        wx.config(o1)
}

get_config=async ()=>{
    let u="https://service-qsqxa5fo-1252957949.gz.apigw.tencentcs.com/release/weixin-token/jssdk"
    let o=await get(u)
    window.config=o
    localStorage.config=JSON.stringify(o)
    init_weixin(o)
    return o
}

init=async()=>{
    if (localStorage.config) {
        let c=JSON.parse(localStorage.config)
        let valid = (c.expires_in-now()>10) && (location.href==c.url) //微信每次都会改写url，每次都不一样
        if (valid) {
            window.config=c
            init_weixin(c)
            return c
        }else{
            return get_config()
        }
    }else{
        return get_config()
    }
}


Vue.use(vant.Lazyload);
vcomponents.forEach(x=>Vue.use(vant[x]))



  // 3 智能接口
  var voice = {
    localId: '',
    serverId: ''
  };





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
    onMenuShareAppMessage:{
              title: '互联网之子',
              desc: '在长大的过程中，我才慢慢发现，我身边的所有事，别人跟我说的所有事，那些所谓本来如此，注定如此的事，它们其实没有非得如此，事情是可以改变的。更重要的是，有些事既然错了，那就该做出改变。',
              link: 'http://movie.douban.com/subject/25785114/',
              imgUrl: 'http://demo.open.weixin.qq.com/jssdk/images/p2166127561.jpg',
              trigger: function (res) {
                    alert('用户点击发送给朋友');
              },
              success: function (res) {
                alert('已分享');
              },
              cancel: function (res) {
                alert('已取消');
              },
              fail: function (res) {
                alert(JSON.stringify(res));
              }
        },
        onMenuShareTimeline:{
              title: '互联网之子',
              link: 'http://movie.douban.com/subject/25785114/',
              imgUrl: 'http://demo.open.weixin.qq.com/jssdk/images/p2166127561.jpg',
              trigger: function (res) {
                // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
                alert('用户点击分享到朋友圈');
              },
              success: function (res) {
                alert('已分享');
              },
              cancel: function (res) {
                alert('已取消');
              },
              fail: function (res) {
                alert(JSON.stringify(res));
              },
        },
        onMenuShareQQ:{
              title: '互联网之子',
              desc: '在长大的过程中，我才慢慢发现，我身边的所有事，别人跟我说的所有事，那些所谓本来如此，注定如此的事，它们其实没有非得如此，事情是可以改变的。更重要的是，有些事既然错了，那就该做出改变。',
              link: 'http://movie.douban.com/subject/25785114/',
              imgUrl: 'http://img3.douban.com/view/movie_poster_cover/spst/public/p2166127561.jpg',
              trigger: function (res) {
                alert('用户点击分享到QQ');
              },
              complete: function (res) {
                alert(JSON.stringify(res));
              },
              success: function (res) {
                alert('已分享');
              },
              cancel: function (res) {
                alert('已取消');
              },
              fail: function (res) {
                alert(JSON.stringify(res));
              }
        },
        onMenuShareWeibo:{
              title: '互联网之子',
              desc: '在长大的过程中，我才慢慢发现，我身边的所有事，别人跟我说的所有事，那些所谓本来如此，注定如此的事，它们其实没有非得如此，事情是可以改变的。更重要的是，有些事既然错了，那就该做出改变。',
              link: 'http://movie.douban.com/subject/25785114/',
              imgUrl: 'http://img3.douban.com/view/movie_poster_cover/spst/public/p2166127561.jpg',
              trigger: function (res) {
                alert('用户点击分享到微博');
              },
              complete: function (res) {
                alert(JSON.stringify(res));
              },
              success: function (res) {
                alert('已分享');
              },
              cancel: function (res) {
                alert('已取消');
              },
              fail: function (res) {
                alert(JSON.stringify(res));
              }

        },
        onMenuShareQZone:{
              title: '互联网之子',
              desc: '在长大的过程中，我才慢慢发现，我身边的所有事，别人跟我说的所有事，那些所谓本来如此，注定如此的事，它们其实没有非得如此，事情是可以改变的。更重要的是，有些事既然错了，那就该做出改变。',
              link: 'http://movie.douban.com/subject/25785114/',
              imgUrl: 'http://img3.douban.com/view/movie_poster_cover/spst/public/p2166127561.jpg',
              trigger: function (res) {
                alert('用户点击分享到QZone');
              },
              complete: function (res) {
                alert(JSON.stringify(res));
              },
              success: function (res) {
                alert('已分享');
              },
              cancel: function (res) {
                alert('已取消');
              },
              fail: function (res) {
                alert(JSON.stringify(res));
              }
        },
}





translateVoice=function () {
        if (voice.localId == '') {
          alert('请先使用 startRecord 接口录制一段声音');
          return;
        }
        wx.translateVoice({
          localId: voice.localId,
          complete: function (res) {
            if (res.hasOwnProperty('translateResult')) {
              alert('识别结果：' + res.translateResult);
            } else {
              alert('无法识别');
            }
          }
        });
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
            api_name,
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



