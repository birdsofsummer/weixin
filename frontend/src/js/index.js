
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




 var shareData = {
    title: '微信JS-SDK Demo',
    desc: '微信JS-SDK,帮助第三方为用户提供更优质的移动web服务',
    link: 'http://demo.open.weixin.qq.com/jssdk/',
    imgUrl: 'http://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRt8Qia4lv7k3M9J1SKqKCImxJCt7j9rHYicKDI45jRPBxdzdyREWnk0ia0N5TMnMfth7SdxtzMvVgXg/0'
  };

  wx.onMenuShareAppMessage(shareData);
  wx.onMenuShareTimeline(shareData);



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
  voice = {
    localId: '',
    serverId: ''
  }
  images={
        serverId:[],  //下载
        localId:[],   //上传
  }
  codes = [];
  cardList=[]





function decryptCode(code) {
    get('/jssdk/decrypt_code.php?code=' + encodeURI(code)).then(res=>{
      if (res.errcode == 0) {
        codes.push(res.code);
        cardList.push({
            cardId: 'pDF3iY9tv9zCGCj4jTXFOo1DxHdo',
            code: x
        })
      }
    })
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

        // 3.1 识别音频并返回识别结果
        translateVoice:{
              localId: voice.localId,
              complete: function (res) {
                if (res.hasOwnProperty('translateResult')) {
                  alert('识别结果：' + res.translateResult);
                } else {
                  alert('无法识别');
                }
              }
        },
        // 4 音频接口
        // 4.2 开始录音
        startRecord:{
              cancel: function () {
                alert('用户拒绝授权录音');
              }
        },
        // 4.3 停止录音
        stopRecord:{
              success: function (res) {
                voice.localId = res.localId;
              },
              fail: function (res) {
                alert(JSON.stringify(res));
              }

        },
        // 4.4 监听录音自动停止
        onVoiceRecordEnd:{
            complete: function (res) {
              voice.localId = res.localId;
              alert('录音时间已超过一分钟');
            }
        },
        // 4.5 播放音频
        playVoice:{
              localId: voice.localId
        },
        // 4.6 暂停播放音频
        pauseVoice:{
              localId: voice.localId
        },
        stopVoice:{
              localId: voice.localId
        },
        // 4.8 监听录音播放停止
        onVoicePlayEnd:{
            complete: function (res) {
              alert('录音（' + res.localId + '）播放结束');
            }
        },
        // 4.8 上传语音
        uploadVoice:{
              localId: voice.localId,
              success: function (res) {
                alert('上传语音成功，serverId 为' + res.serverId);
                voice.serverId = res.serverId;
              }
        },
        // 4.9 下载语音
        downloadVoice:{
              serverId: voice.serverId,
              success: function (res) {
                alert('下载语音成功，localId 为' + res.localId);
                voice.localId = res.localId;
              }
        },
       // 5 图片接口
        // 5.1 拍照、本地选图
        chooseImage:{
              success: function (res) {
                images.localId = res.localIds;
                alert('已选择 ' + res.localIds.length + ' 张图片');
              }
        },
       // 5.2 图片预览
        previewImage:{
          current: 'http://img5.douban.com/view/photo/photo/public/p1353993776.jpg',
          urls: [
            'http://img3.douban.com/view/photo/photo/public/p2152117150.jpg',
            'http://img5.douban.com/view/photo/photo/public/p1353993776.jpg',
            'http://img3.douban.com/view/photo/photo/public/p2152134700.jpg'
          ]
        },
       // 5.3 上传图片
       // 递归
        uploadImage:{
            localId: images.localId[0],
            isShowProgressTips: 1,
            success: function (res) {
              alert('已上传：' + i + '/' + length);
              images.serverId.push(res.serverId);
            },
            fail: function (res) {
              alert(JSON.stringify(res));
            }
        },
       // 5.4 下载图片
       // 递归
        downloadImage:{
            serverId: images.serverId[0],
            success: function (res) {
              i++;
              length = images.serverId.length;
              alert('已下载：',res.localId);
              images.localId.push(res.localId);
            }
        },
        // 6 设备信息接口
        // 6.1 获取当前网络状态
        getNetworkType:{
              success: function (res) {
                alert(res.networkType);
              },
              fail: function (res) {
                alert(JSON.stringify(res));
              }
        },
        // 7 地理位置接口
        // 7.1 查看地理位置
        openLocation:{
              latitude: 23.099994,
              longitude: 113.324520,
              name: 'TIT 创意园',
              address: '广州市海珠区新港中路 397 号',
              scale: 14,
              infoUrl: 'http://weixin.qq.com'
        },
      // 7.2 获取当前地理位置
        getLocation:{
              success: function (res) {
                alert(JSON.stringify(res));
              },
              cancel: function (res) {
                alert('用户拒绝授权获取地理位置');
              }
        },
        // 8 界面操作接口
        // 8.1 隐藏右上角菜单
        hideOptionMenu:{},

        // 8.2 显示右上角菜单
        showOptionMenu:{},

        // 8.3 批量隐藏菜单项
        hideMenuItems:{
              menuList: [
                'menuItem:readMode', // 阅读模式
                'menuItem:share:timeline', // 分享到朋友圈
                'menuItem:copyUrl' // 复制链接
              ],
              success: function (res) {
                alert('已隐藏“阅读模式”，“分享到朋友圈”，“复制链接”等按钮');
              },
              fail: function (res) {
                alert(JSON.stringify(res));
              }
        },
        // 8.4 批量显示菜单项
        showMenuItems:{
              menuList: [
                'menuItem:readMode', // 阅读模式
                'menuItem:share:timeline', // 分享到朋友圈
                'menuItem:copyUrl' // 复制链接
              ],
              success: function (res) {
                alert('已显示“阅读模式”，“分享到朋友圈”，“复制链接”等按钮');
              },
              fail: function (res) {
                alert(JSON.stringify(res));
              }
        },
        hideAllNonBaseMenuItem:{
              success: function () {
                alert('已隐藏所有非基本菜单项');
              }
        },

        showAllNonBaseMenuItem:{
          success: function () {
            alert('已显示所有非基本菜单项');
          }
        },

        scanQRCode:{
          needResult: 1,
          desc: 'scanQRCode desc',
          success: function (res) {
            alert(JSON.stringify(res));
          }
        },
        chooseWXPay:{
              timestamp: 1414723227,
              nonceStr: 'noncestr',
              package: 'addition=action_id%3dgaby1234%26limit_pay%3d&bank_type=WX&body=innertest&fee_type=1&input_charset=GBK&notify_url=http%3A%2F%2F120.204.206.246%2Fcgi-bin%2Fmmsupport-bin%2Fnotifypay&out_trade_no=1414723227818375338&partner=1900000109&spbill_create_ip=127.0.0.1&total_fee=1&sign=432B647FE95C7BF73BCD177CEECBEF8D',
              signType: 'SHA1', // 注意：新版支付接口使用 MD5 加密
              paySign: 'bd5b1933cda6e9548862944836a9b52e8c9a2b69'
        },

        openProductSpecificView:{
              productId: 'pDF3iY_m2M7EQ5EKKKWd95kAxfNw',
              extInfo: '123'
        },
        addCard:{
              cardList: [
                {
                  cardId: 'pDF3iY9tv9zCGCj4jTXFOo1DxHdo',
                  cardExt: '{"code": "", "openid": "", "timestamp": "1418301401", "signature":"f6628bf94d8e56d56bfa6598e798d5bad54892e5"}'
                },
                {
                  cardId: 'pDF3iY9tv9zCGCj4jTXFOo1DxHdo',
                  cardExt: '{"code": "", "openid": "", "timestamp": "1418301401", "signature":"f6628bf94d8e56d56bfa6598e798d5bad54892e5"}'
                }
              ],
              success: function (res) {
                alert('已添加卡券：' + JSON.stringify(res.cardList));
              },
              cancel: function (res) {
                alert(JSON.stringify(res))
              }
        },
        chooseCard:{
          cardSign: '1fdb2640c60e41f8823e9f762e70c531d161ae76',
          timestamp: 1437997723,
          nonceStr: 'k0hGdSXKZEj3Min5',
          success: function (res) {
            res.cardList = JSON.parse(res.cardList);
            encrypt_code = res.cardList[0]['encrypt_code'];
            alert('已选择卡券：' + JSON.stringify(res.cardList));
            decryptCode(encrypt_code);

          },
          cancel: function (res) {
            alert(JSON.stringify(res))
          }
        },
        openCard:{
            cardList: window.cardList,
              cancel: function (res) {
                alert(JSON.stringify(res))
              }
        },




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
            //events,
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



