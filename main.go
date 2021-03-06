package main

import (
	"strings"
	"fmt"
    "xorm.io/xorm"
    "context"
	//"encoding/json"
	"time"
	//"net/url"
	. "github.com/tencentyun/scf-go-lib/cloudevents/scf"
    "github.com/tencentyun/scf-go-lib/cloudfunction"
	"./token"
	"./db"
	"./config"
	config1 "./types/config"
	jssdk1 "./jssdk"
	"./types/jssdk"
	"./types/ticket"
	. "./scf"
)

var (
	config_file="config.pro.toml"
	Config *config1.AppConfig 
	engine *xorm.EngineGroup 
)




type Tokens []db.Token
type Jssdks []jssdk.TopLevel

func AddToken(d *db.Token) (int64,error){
	affected, err := engine.Insert(d)

	if err!=nil{
		println("token add fail",err.Error())
	}
	println(affected, err)
	return affected, err
}


func ListToken() Tokens{
	var d Tokens
	err := engine.Find(&d)
	if err!=nil{
		fmt.Println("token list fail",err.Error())
	}
	return d
}

func AddJssdk(d *jssdk.TopLevel)(int64,error){
	affected, err := engine.Insert(d)

	if err!=nil{
		println("jssdk add fail ",err.Error())
	}
	println(affected, err)
	return affected, err
}

func ListJssdk(u string) Jssdks{
	var d Jssdks
	err := engine.Desc("expires_in").Where("url = ? ",u).Find(&d)
	if err!=nil{
		fmt.Println("jssdk list fail",err.Error())
	}
	return d
}

func list_ticket(a string)([]ticket.Ticket,error){
	var d []ticket.Ticket
	err := engine.Desc("expires_in").Where("access_token = ? ",a).Where("expires_in > ?", time.Now().Unix()+180).Find(&d)
	if err!=nil{
		fmt.Println("ticket list fail",err.Error())
		return d,err
	}
	return d,nil
}

func remove_invalid_ticket(){
	var exp []ticket.Ticket
	a,e:=engine.Where("expires_in < ?", time.Now().Unix()).Delete(exp)
	if e!=nil {
		fmt.Println("delete ticket fail",a,e)
	}else{
		fmt.Println("delete ticket done!",a,e)
	}
}

func remove_ticket(a string){
	var exp []ticket.Ticket
	affected,e:=engine.Where("access_token = ?", a).Delete(exp)
	if e!=nil {
		fmt.Println("delete ticket fail",affected,e)
	}else{
		fmt.Println("delete ticket done!",affected,e)
	}
}

func add_ticket(d *ticket.Ticket) (int64,error){
	affected, err := engine.Insert(d)
	if err!=nil{
		println("ticket add fail",err.Error())
	}else{
		println("ticket add success")
	}
	println(affected, err)
	return affected, err
}

























func refresh_token()(error,db.Token){
	var tk1 db.Token
	tk,e:=token.GetToken(Config)
	if e!=nil {
		fmt.Println("fail to fetch token",e)
		return e,tk1
	}
	now:=time.Now().Unix()
	exp:=now+ tk.ExpiresIn 
	
	fmt.Println(now,"+7200=",exp)
	//fmt.Println("dddd",tk)

	tk1.AccessToken=tk.AccessToken
    tk1.ExpiresIn=exp

	fmt.Println("new token is:",tk)
	fmt.Println("new token is:",tk1)

	return e,tk1
}


func refresh_save() (error,db.Token){
	//affected, err := engine.Delete(&tk)
	//if err!=nil {
	//	fmt.Println("[db]del fail",tk)
	//}
	var tk db.Token
	var e error

	session := engine.NewSession()
	defer session.Close()

	if _, e := session.Exec("delete from token where  expires_in > 0"); e != nil {
		return e,tk
	}
	fmt.Println("del old token sucess",tk)

	e,tk=refresh_token()
	if e!=nil {
		return e,tk
	}
	fmt.Println("save new tk ",tk)
	n,e:=AddToken(&tk)
	if e!=nil {
		fmt.Println("token save fail")
		return e,tk
	}
	fmt.Println("token save done",n)
	return e,tk
}


func init_db(){
	var e error
	e,Config=config.GetConfig(config_file)
	if e!=nil {
		fmt.Println("get config fail",e)
		return
	}
	s:= Config.DB.Server
	e,engine=db.Conn(s)
	if e!=nil {
		fmt.Println("init db fail",e)
		return
	}
}

func weixin_token()(error,db.Token){
	d:=ListToken()
	fmt.Println("[db]:",d)
	if len(d) == 0 {
		fmt.Println("nothing in db,wait to get")
		return refresh_save()
	}else{
		var e error

		tk:=d[0]
		exp:=tk.ExpiresIn
		now:=time.Now().Unix()
		du:= exp -now
		fmt.Println(exp,now,du)

		if du > 180 {
			fmt.Println("exist valid token",exp,now,(exp-now)/60,"min",tk)
			return e,tk
		}else{
			fmt.Println("exist invalid token,wait to refresh",tk)
			return refresh_save()
		}
	}
}


func refresh_ticket (a string) (ticket.Ticket,error){
	var e error
	var d []ticket.Ticket
	var d1 ticket.Ticket

	d,e=list_ticket(a)
	if e!=nil {
		fmt.Println("list ticket fail",e)
	}
	if len(d) > 0 {
		d1=d[0]
		fmt.Println("exist valid ticket",d1)
		return d1,nil
	}else{
		remove_invalid_ticket()
		remove_ticket(a)

		fmt.Println("fetch a new ticket")
		n,e:=jssdk1.GetJsApiTicket(a)
		if e!=nil  {
			fmt.Println("fetch new ticket fail")
			return d1,e
		}else{
			//if n.Errcode == 
			d1=ticket.Ticket{
				AccessToken : a,
				Ticket : n.Ticket   ,
				ExpiresIn : n.ExpiresIn + time.Now().Unix(),
			}
			fmt.Println("fetch new ticket success")
			add_ticket(&d1)
			return d1,nil
		}
	}
}


func refresh_jssdk(u string, appid string)(error,jssdk.TopLevel){
	var d jssdk.TopLevel
	var tk db.Token
	var e error

	e,tk=weixin_token()
	if e!=nil {
		fmt.Println("get token fail",d)
		return e,d
	}

	fmt.Println("get token success",tk)
	t,_:=tk.Marshal()
	fmt.Println("token string",string(t))


    var exp []jssdk.TopLevel
	a,e:=engine.Where("expires_in < ?", time.Now().Unix()).Delete(exp)
	if e!=nil {
		fmt.Println("delete jssdk fail",a,e)
	}else{
		fmt.Println("delete jssdk done!",a,e)
	}

	ti,err:=refresh_ticket(tk.AccessToken)
	if err!=nil {
		fmt.Println("refresh ticket fail")
		return e,d
	}
	d,e=jssdk1.Sign1(tk.AccessToken,u,appid,ti)
	//d,e=jssdk1.Sign(tk.AccessToken,u,appid)

	if e!=nil {
		return e,d
	}
	fmt.Println("save new jssdk ",d)
	n,e:=AddJssdk(&d)
	if e!=nil {
		return e,d
	}
	fmt.Println("save new jssdk done",n)
	return e,d
}



func get_jssdk(u string, appid string)(error,jssdk.TopLevel){
   d:=ListJssdk(u)
   fmt.Println("old jssdk",d)
   if len(d) == 0 {
		fmt.Println("no jssdk in db,wait to get")
		return refresh_jssdk(u,appid)
   }else{
		var e error
		d1:=d[0]
		exp:=d1.ExpiresIn
		now:=time.Now().Unix()
		du:= exp -now
		fmt.Println("old jssdk 111111111111111111",exp,now,du)
		if du > 180 {
			fmt.Println("exist valid jssdk",exp,now,(exp-now)/60,"min",d1)
			return e,d1
		}else{
			fmt.Println("exist invalid jssdk,wait to refresh",d1)
			return refresh_jssdk(u,appid)
		}
   }
}


func test(){
	init_db()
	fmt.Println(engine)
	e,tk:=weixin_token()
	if e!=nil {
		fmt.Println("eeee",e)
		return
	}
	fmt.Println("zzz",tk)
	t,_:=tk.Marshal()
	fmt.Println("token string",string(t))
}

func test1(){
	init_db()
	e,tk:=refresh_save()
	if e!=nil {
		fmt.Println("eeee",e)
		return
	}
	fmt.Println("zzz",tk)
	t,_:=tk.Marshal()
	fmt.Println("token string",string(t))
}


func test3(){
	init_db()
	appid:=Config.Appid

    u:="https://weixin-1252957949.cos-website.ap-guangzhou.myqcloud.com/?nsukey=xlGATjrnQusW%2B3HtcxkteNG%2BN2Id0YHuSGCVMjzDGkk%2F2%2Fb5vU%2FwPZSw5olrS2WHTiftdhOUtQqqaah0nUhhOcXAN92gl6Qo3hwNa9WlINej8VvdTvujiK1UXXEAjcSbgfuoePk6sNG%2Bewz%2FlbahXnwI6jEPLkgckS0%2BsU5C8gz2ONOrMKezteGGXRWHOPWk06E5JRYmdSan8s260Bh6gg%3D%3D"
	//u:="https://www.baidu.com"  /////event
    e,d:=get_jssdk(u,appid)
	if e!=nil {
		fmt.Println("111 jssdk fail",e)
		return 
	}
	fmt.Println("zzz",d)
	t,_:=d.Marshal()
	body:=string(t)
	fmt.Println("jssdk string",body)
}




func WeixinToken(ctx context.Context, event APIGatewayProxyRequest) (string,error) {
	//s,_:=json.Marshal(event)
	e,tk:=weixin_token()
	if e!=nil {
		fmt.Println("eeee",e)
		return "",e
	}
	fmt.Println("zzz",tk)
	t,_:=tk.Marshal()
	body:=string(t)
	fmt.Println("token string",body)
	return body,nil
}



/*

注意 URL 一定要动态获取，不能 hardcode.
$protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";
$url = "$protocol$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";


$GOPATH/src/github.com/tencentyun/scf-go-lib/cloudevents/scf/apigw.go
headers:{
    "origin": "https://tieba.baidu.com",
    "referer": "https://tieba.baidu.com/index.html",
}


event.Headers["origin"]
event.Headers["referer"]

"https://tieba.baidu.com/?x=1&y=2#123" 
这种需要去掉#123

直接取浏览器的refer会自动丢弃#123

*/

func Jssdk(ctx context.Context, event APIGatewayProxyRequest) (string,error) {
	//s,_:=json.Marshal(event)
	appid:=Config.Appid
	u:="https://www.baidu.com"  /////event


//	_,ok1:=event.Headers["origin"]	
//	if ok1 {
//		u=event.Headers["origin"]
//	}

	_,ok:=event.Headers["referer"]	
	if ok {
		u=event.Headers["referer"]
	}
	
	fmt.Println("url:",u)

    e,d:=get_jssdk(u,appid)

	if e!=nil {
		fmt.Println("get jssdk fail",e)
		return "",e
	}
	fmt.Println("zzz",d)
	t,_:=d.Marshal()
	body:=string(t)
	fmt.Println("jssdk string",body)
	return body,nil
}



func app(ctx context.Context, event APIGatewayProxyRequest)(APIGatewayProxyResponse,error){
	init_db()
	fmt.Println(engine)
	r:=make(map[string]func(context.Context,APIGatewayProxyRequest) (string,error))
	r["/"]=WeixinToken
	r["/jssdk"]=Jssdk

	fmt.Println(event)
	p1:=event.RequestContext.Path
	p2:=event.Path
    p:=strings.Replace(p2, p1, "", -1 ) 
    f, ok := r[p] 
    if (!ok) {
		f=Echo
    }
	return Format_res(f(ctx,event)),nil
}




func start(){
	cloudfunction.Start(app)
}

func main(){
    //test()
    //test1()
	//test3()
	start()
}

