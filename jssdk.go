package main

import (
	"fmt"
	"time"
	"crypto/sha1"
	//"crypto/hmac"
	//"crypto/sha256"
	"net/http"
	. "./http1"
)

func random(i int64) int{
	rand.Seed(time.Now().UnixNano())
	return rand.Int(i)
}


//l=16
func createNonceStr(l int64)(string){
	chars := "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
	s:=""
	for i:=0;i<l;i++{
		n:=random(l-1)
		s1:=chars[n,n+1]
		s+=s1
	}
	return s
}

func now() (int64){
	return time.Now().Unix()
}
func now1() string{
    return fmt.Sprintf("%v", time.Now().Unix())
}

func hamcsha1(secretKey string, source string) (string){
	hmacObj := hmac.New(sha1.New, []byte(secretKey))
	hmacObj.Write([]byte(source))
	sign:=""
	sign = base64.StdEncoding.EncodeToString(hmacObj.Sum(nil))
	return sign
}

// hashlib.sha1(string).hexdigest()
func sha1(){





}



func getJsApiTicket(accessToken string) (*http.Response,error){
   u:="https://api.weixin.qq.com/cgi-bin/ticket/getticket"
   d:=map[string]interface{}{
	   "type":"jsapi",
	   "access_token":accessToken
   }
   return Get(u,d)
}


func getSignPackage(r *jssdk.Raw) (*jssdk.TopLevel,error){
	//sort jntu
	s:= "jsapi_ticket=" + r.JsapiTicket + "&noncestr=" + r.NonceStr + "&timestamp=" + fmt.Sprintf("%v", r.Timestamp)  + "&url=" + r.URL 

	o:= jssdk.TopLevel{
		AppID:r.AppID,
		NonceStr:r.NonceStr,
		Timestamp:r.Timestamp,
		URL:r.URL,
		JsapiTicket:r.JsapiTicket,
		RawString:s,
		Signature:_sha1(s),
		Token:r.Token,
		ExpiresIn:r.ExpiresIn,
	}
	return &o
}

Sign(token string,u string, appid string)(*jssdk.TopLevel,error){
    t:=getJsApiTicket(token)
	ts:=now()
	r:= jssdk.Raw {
		Token : token,
		AppID : appid,
		Timestamp : ts,
		ExpiresIn : t.ExpiresIn+ts,
		JsapiTicket :  t.Ticket,
		NonceStr : createNonceStr(16),
		URL : u,
	}
	return getSignPackage(&r)
}


func main() {


}
