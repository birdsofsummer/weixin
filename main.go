package main

import (
	"strings"
	"fmt"
    "xorm.io/xorm"
    "context"
	//"encoding/json"
	"time"
	. "github.com/tencentyun/scf-go-lib/cloudevents/scf"
    "github.com/tencentyun/scf-go-lib/cloudfunction"
	"./token"
	"./db"
	"./config"
	config1 "./types/config"
	. "./scf"
)

var (
	config_file="config.pro.toml"
	Config *config1.AppConfig 
	engine *xorm.EngineGroup 
)

type Tokens []db.Token


func Add(d *db.Token) (int64,error){
	affected, err := engine.Insert(d)

	if err!=nil{
		println("eeee",err.Error())
	}
	println(affected, err)

	return affected, err
}


func List() Tokens{
	var d Tokens
	err := engine.Find(&d)
	if err!=nil{
		fmt.Println("oo",err.Error())
	}
	return d
}


func refresh_token()(error,db.Token){
	var tk1 db.Token
	tk,e:=token.GetToken(Config)
	if e!=nil {
		fmt.Println("eeee",e)
		return e,tk1
	}
	now:=time.Now().Unix()
	exp:=now+ tk.ExpiresIn 
	
	fmt.Println(now,"+7200=",exp)
	//fmt.Println("dddd",tk)

	tk1.AccessToken=tk.AccessToken
    tk1.ExpiresIn=exp
	
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
	fmt.Println("[db]del sucess",tk)

	e,tk=refresh_token()
	if e!=nil {
		return e,tk
	}
	fmt.Println("save new tk ",tk)
	n,e:=Add(&tk)
	if e!=nil {
		return e,tk
	}
	fmt.Println("save done",n)
	return e,tk
}


func init_db(){
	var e error
	e,Config=config.GetConfig(config_file)
	if e!=nil {
		fmt.Println("eeee",e)
		return
	}
	s:= Config.DB.Server
	e,engine=db.Conn(s)
	if e!=nil {
		fmt.Println("eeee",e)
		return
	}
}

func weixin_token()(error,db.Token){
	init_db()
	fmt.Println(engine)
	d:=List()
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

func test(){
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

func app(ctx context.Context, event APIGatewayProxyRequest)(APIGatewayProxyResponse,error){
    //test()
    //test1()

	r:=make(map[string]func(context.Context,APIGatewayProxyRequest) (string,error))
	r["/"]=WeixinToken
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

func main(){
	cloudfunction.Start(app)
}

