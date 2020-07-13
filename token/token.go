package token

import (
	"io/ioutil"
	"fmt"
	"../types/token"
	"../config"
	. "../types/config"
	"time"
	. "../http1"
)

// 7200s
// 2000/d

func GetToken(c *AppConfig)(token.TopLevel, error){
	u:="https://api.weixin.qq.com/cgi-bin/token"
	d:=map[string]interface{}{
		"grant_type" : "client_credential",
		"appid" : c.Appid,
		"secret" : c.Appsecret,
	}
	r,_:=Get(u,d)
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
