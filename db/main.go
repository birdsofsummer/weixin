package db

import (
	//. "./spider"
   // _ "github.com/go-sql-driver/mysql"
  _ "github.com/lib/pq"
    "xorm.io/xorm"
	"math/rand"
	"time"
	"fmt"
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
//	engine.IsTableEmpty(t)
//	a,e:=engine.IsTableExist(t)
//	println("exist?",a,e)
//	if !a{
//		r:=engine.CreateTables(t)
//		println("create table",r)
//	}
//	engine.DropTables(t)

	err = engine.Sync2(t)

	if err!=nil{
		println("db sync fail",err.Error())
		return err,engine
	}


	return err,engine
}

