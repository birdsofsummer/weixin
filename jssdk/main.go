package jssdk

import (
	"fmt"
	"time"
	"crypto/sha1"
	"math/rand"
	//"crypto/hmac"
	//"crypto/sha256"
	//"net/http"
	. "../http1"
	"../types/ticket"
	jssdk1 "../types/jssdk"
	"io/ioutil"
)

func random(i int) int{
	rand.Seed(time.Now().UnixNano())
	return rand.Intn(i)
}


//l=16
func createNonceStr(l int)(string){
	chars := "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
	s:=""
	for i:=0;i<l;i++{
		n:=random(l-1)
		s1:=chars[n:n+1]
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



// hashlib.sha1(string).hexdigest()
func _sha1(s string) (string){
	h := sha1.New()
	h.Write([]byte(s))
    l := fmt.Sprintf("%x", h.Sum(nil))
    //fmt.Println(l)
	return l
}


func getJsApiTicket(accessToken string) (ticket.TopLevel,error){
   u:="https://api.weixin.qq.com/cgi-bin/ticket/getticket"
   d:=map[string]interface{}{
	   "type":"jsapi",
	   "access_token":accessToken,
   }
   r,_:=Get(u,d)
   b, _ := ioutil.ReadAll(r.Body)
   fmt.Println("[http]:",r.Status,string(b))
   return ticket.UnmarshalTopLevel(b)
}


func getSignPackage(r *jssdk1.Raw) (jssdk1.TopLevel,error){
	//sort jntu
	s:= "jsapi_ticket=" + r.JsapiTicket + "&noncestr=" + r.NonceStr + "&timestamp=" + fmt.Sprintf("%v", r.Timestamp)  + "&url=" + r.URL 

	o:= jssdk1.TopLevel{
		AppID : r.AppID,
		NonceStr : r.NonceStr,
		Timestamp : r.Timestamp,
		URL : r.URL,
		JsapiTicket : r.JsapiTicket,
		RawString : s,
		Signature : _sha1(s),
		Token : r.Token,
		ExpiresIn : r.ExpiresIn,
	}

	return o,nil
}

func Sign(token string,u string, appid string)(jssdk1.TopLevel,error){
	fmt.Println("sign with token",token)
	var r jssdk1.Raw
	var o jssdk1.TopLevel
    t,e:=getJsApiTicket(token)
	if e!=nil {
	    fmt.Println("ticket fail",e)
		return o,e
	}
	ts:=now()
	r= jssdk1.Raw {
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
    //fmt.Println(123)
}
