package main

import (
	"fmt"
	"time"
	"crypto/sha1"
	"math/rand"
	//"crypto/hmac"
	//"crypto/sha256"
	//"net/http"
	. "./http1"
	"./types/ticket"
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

func hamcsha1(secretKey string, source string) (string){
	hmacObj := hmac.New(sha1.New, []byte(secretKey))
	hmacObj.Write([]byte(source))
	sign:=""
	sign = base64.StdEncoding.EncodeToString(hmacObj.Sum(nil))
	return sign
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
	   "access_token":accessToken
   }
   r,_:=Get(u,d)
   b, _ := ioutil.ReadAll(r.Body)
   //fmt.Println("[contact]:",r.Status,string(b))
   return ticket.UnmarshalTopLevel(b)
}


func getSignPackage(r *jssdk.Raw) (*jssdk.TopLevel,error){
	//sort jntu
	s:= "jsapi_ticket=" + r.JsapiTicket + "&noncestr=" + r.NonceStr + "&timestamp=" + fmt.Sprintf("%v", r.Timestamp)  + "&url=" + r.URL 

	o:= jssdk.TopLevel{
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

	return &o,nil
}

Sign(token string,u string, appid string)(*jssdk.TopLevel,error){
	var r jssdk.Raw
    t,e:=getJsApiTicket(token)
	if e!=nil {
	    fmt.Println("ticket fail",e)
		return r,e
	}
	ts:=now()
	r= jssdk.Raw {
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
