package db

import (
	//. "./spider"
   // _ "github.com/go-sql-driver/mysql"
  _ "github.com/lib/pq"
    "xorm.io/xorm"
	"math/rand"
	"time"
	"fmt"
	"../types/jssdk"
	"../types/ticket"
)



func Random() string{
	rand.Seed(time.Now().UnixNano())
	return fmt.Sprintf("%v", rand.Intn(254))
}

//var engine *xorm.Engine
var engine *xorm.EngineGroup 

func Conn(s string)(error, *xorm.EngineGroup){
	var engine *xorm.EngineGroup 
    var err error
	conns := []string{
		s,
	}

  //  engine, err = xorm.NewEngine("mysql", "root:123456@/test?charset=utf8")
    engine, err = xorm.NewEngineGroup("postgres", conns, xorm.RoundRobinPolicy())

	if err != nil {
		println("db connect fail",err.Error())
		return err,engine
	}
	//engine.SetMapper(names.SameMapper{})
	//engine.SetTableMapper(names.SameMapper{})
	//engine.SetColumnMapper(names.SnakeMapper{})

	//m,e:=engine.DBMetas()
	//println("meta",m,e)

    t:=new(Token)
	j:=new(jssdk.TopLevel)
	ti:=new (ticket.Ticket)


//	engine.IsTableEmpty(t)
//	a,e:=engine.IsTableExist(j)
//	println("exist?",a,e)
//	if !a{
//		r:=engine.CreateTables(t)
//		println("create table",r)
//	}
//	engine.DropTables(t)

//	err=engine.DropTables(j)
//	if err!=nil{
//		println("drop jssdk fail",err.Error())
//	}


	err = engine.Sync2(t)
	if err!=nil{
		println("table token sync fail",err.Error())
		return err,engine
	}

	err = engine.Sync2(j)
	if err!=nil{
		println("table jssdk sync fail",err.Error())
		return err,engine
	}

	err = engine.Sync2(ti)
	if err!=nil{
		println("table ticket sync fail",err.Error())
		return err,engine
	}

	println("db connected")
	return err,engine
}

