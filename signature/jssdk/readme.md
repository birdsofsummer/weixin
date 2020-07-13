## doc

+  [doc](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html#2)
+  [wiki](http://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html)
+  [demo](https://www.weixinsxy.com/jssdk/)
+  [demo](https://www.weixinsxy.com/jssdk/js/demo.js)
+  [sample](http://demo.open.weixin.qq.com/jssdk/sample.zip)



## import 

```bash
npm install weixin-js-sdk --save-dev

```

```javascript 

import wx from 'weixin-js-sdk'

```


```html
<script src="https://res.wx.qq.com/open/js/jweixin-1.6.0.js" defer></script>
<script src="https://res2.wx.qq.com/open/js/jweixin-1.6.0.js " defer></script>
<script>
    wx.config({
      debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: '', // 必填，公众号的唯一标识
      timestamp: , // 必填，生成签名的时间戳
      nonceStr: '', // 必填，生成签名的随机串
      signature: '',// 必填，签名
      jsApiList: [] // 必填，需要使用的JS接口列表
    });

    wx.ready(function(){
      // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
    });

    wx.error(function(res){
      // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
    });



////////////////////////////////////////////////////////////////////////////////////
// 接口
    //即将废弃
    wx.onMenuShareTimeline
    wx.onMenuShareAppMessage
    wx.onMenuShareQQ

    wx.updateAppMessageShareData
    wx.updateTimelineShareData
    wx.onMenuShareWeibo
    wx.onMenuShareQZone
    wx.startRecord
    wx.stopRecord
    wx.onVoiceRecordEnd
    wx.playVoice
    wx.pauseVoice
    wx.stopVoice
    wx.onVoicePlayEnd
    wx.uploadVoice
    wx.downloadVoice
    wx.chooseImage
    wx.previewImage
    wx.uploadImage
    wx.downloadImage
    wx.translateVoice
    wx.getNetworkType
    wx.openLocation
    wx.getLocation
    wx.hideOptionMenu
    wx.showOptionMenu
    wx.hideMenuItems
    wx.showMenuItems
    wx.hideAllNonBaseMenuItem
    wx.showAllNonBaseMenuItem
    wx.closeWindow
    wx.scanQRCode
    wx.chooseWXPay
    wx.openProductSpecificView
    wx.addCard
    wx.chooseCard
    wx.openCard

</script>

```

```javascript

  wx.config({
      debug: false,
      appId: 'wxf8b4f85f3a794e77', //...
      timestamp: 1594610458,       //
      nonceStr: 'zRjmHbYBHZ3kACxC',//
      signature: 'bb3bef01a685b5c90e687679339421dbf15548b4', //
      jsApiList: [
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
        'openCard'
      ]
  });


/*
config
ready
error
checkJsApi
onMenuShareTimeline
onMenuShareAppMessage
onMenuShareQQ
onMenuShareWeibo
onMenuShareQZone
startRecord
stopRecord
onVoiceRecordEnd
playVoice
pauseVoice
stopVoice
onVoicePlayEnd
uploadVoice
downloadVoice
translateVoice
chooseImage
previewImage
uploadImage
downloadImage
getNetworkType
openLocation
getLocation
hideOptionMenu
showOptionMenu
closeWindow
hideMenuItems
showMenuItems
hideAllNonBaseMenuItem
showAllNonBaseMenuItem
scanQRCode
openProductSpecificView
addCard
chooseCard
openCard
chooseWXPay
*/

```


## server

### 卡券getticket

https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=ACCESS_TOKEN&type=jsapi

```json
{
  "errcode":0,
  "errmsg":"ok",
  "ticket":"bxLdikRXVbTPdHSM05e5u5sUoXNKd8-41ZO3MhKoyN5OfkWITDGgnr2fwJ0m9E8NYzWKVZvdVtaUgWvsdshFKA",
  "expires_in":7200
}
```

### signature

```javascript

    const qs=require('qs')
    const sort=(o={})=>Object.fromEntries(Object.keys(o).sort().map(x=>[x,o[x]]))
    const get_sig=(o={})=>sha1(qs.stringify(sort(o)))

    const o={
      timestamp: 1594610458,       //
      nonceStr: 'zRjmHbYBHZ3kACxC',//
      jsapi_ticket:"sM4AOVdWfPE4DxkXGEs8VMCPGGVi4C3VM0P37wVUCFvkVAy_90u5h9nbSlYy3-Sl-HhTdfl2fzFy1AOcHKP7qg", //
       url: 'http://example.com',
      //signature: 'bb3bef01a685b5c90e687679339421dbf15548b4', //
    }
    const o1={
          ...o,
          signature:get_sig(o),
          appId: 'wxf8b4f85f3a794e77', //...
          debug: true, 
          jsApiList: [
               //...
          ], 
    }
    wx.config(o1)
```









