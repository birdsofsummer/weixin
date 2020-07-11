package token

import (
	"net/url"
	"io/ioutil"
	"net/http"
	"fmt"
	"../types/token"
	"../config"
	. "../types/config"
	"time"
)


var (
	HEADERS=map[string]string{
		"User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:76.0) Gecko/20100101 Firefox/76.0",
        "Accept": "application/json, text/plain, */*",
        "Accept-Language": "zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2",
		"DNT":	"1",
        "Pragma": "no-cache",
        "Cache-Control": "no-cache",
        "Sec-Fetch-Dest":"empty",
        "Sec-Fetch-Mode":"cors",
        "Sec-Fetch-Site":"same-origin",
  //		"Host":	"api.weibo.com",
  //      "Referer": "https://api.weibo.com/chat/",
   //     "Cookie":"",
		//"Accept-Encoding": "gzip, deflate, br",
	}

)



func get(u string,d map[string]interface{}) (*http.Response,error){
     client := http.Client{}
	 p:=url.Values{}
	 for k, v := range d{
	 	p.Add(fmt.Sprintf("%v", k), fmt.Sprintf("%v", v))
	 }
	 qs:=p.Encode()
	 u1:=u+"?"+qs
	 fmt.Println("get",u1)
     req, _ := http.NewRequest("GET", u1,nil)
     //h:=get_headers()
     for k,v := range HEADERS{
 	    req.Header.Add(k, v)
     }
	 //fmt.Println("hhhhhhhhh",h)
	 return client.Do(req)
}

// 7200s
// 2000/d

func GetToken(c *AppConfig)(token.TopLevel, error){
	u:="https://api.weixin.qq.com/cgi-bin/token"
	d:=map[string]interface{}{
		"grant_type" : "client_credential",
		"appid" : c.Appid,
		"secret" : c.Appsecret,
	}
	r,_:=get(u,d)
	b, _ := ioutil.ReadAll(r.Body)
	//fmt.Println("[contact]:",r.Status,string(b))
	return token.UnmarshalTopLevel(b)
}


func TestGetToken(){
	_,c:=config.GetConfig("config.toml")
	t,e:=GetToken(c)
	if e != nil {
		fmt.Println("eeee",e)
		return
	}
	now:=time.Now().UnixNano()/1e6 //ms
	exp:=now+t.ExpiresIn * 1e3
	fmt.Println(now,exp)
	fmt.Println(t)
}

func main() {
	//TestGetToken()
}
