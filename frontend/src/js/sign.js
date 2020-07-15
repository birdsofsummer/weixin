var createNonceStr = function () {
  return Math.random().toString(36).substr(2, 15);
};

var createTimestamp = function () {
  return parseInt(new Date().getTime() / 1000) + '';
};

var raw = function (args) {
  var keys = Object.keys(args);
  keys = keys.sort()
  var newArgs = {};
  keys.forEach(function (key) {
    newArgs[key.toLowerCase()] = args[key];
  });

  var string = '';
  for (var k in newArgs) {
    string += '&' + k + '=' + newArgs[k];
  }
  string = string.substr(1);
  return string;
};

/**
* @synopsis 签名算法
*
* @param jsapi_ticket 用于签名的 jsapi_ticket
* @param url 用于签名的 url ，注意必须动态获取，不能 hardcode
*
* @returns
*/

//https://www.npmjs.com/package/jssha
// sha1('x')=='11f6ad8ec52a2984abaafd7c3b516503785c2072'
sha1=(s="")=>{
      //jsSHA = require('jssha');
      shaObj = new jsSHA("SHA-1", "TEXT", { encoding: "UTF8" });
      shaObj.update(s);
      let s1=shaObj.getHash("HEX");
      return s1
    // shaObj = new jsSHA(string, 'TEXT');
    //  s=shaObj.getHash('SHA-1', 'HEX');
}


// {
//    nonceStr,
//    timestamp,
//    url,
//    jsapi_ticket,
//  }
var sign = function (ret) {
  let s=sha1(raw(ret))
  ret.signature =s
  return ret;
};


sign1=(jsapi_ticket,url,)=>{
  var ret = {
    nonceStr: createNonceStr(),
    timestamp: createTimestamp(),
    url: url,
    jsapi_ticket: jsapi_ticket,
  };
  return sign(ret)
}
