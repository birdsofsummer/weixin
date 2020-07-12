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
	err = engine.Sync2(new(Token))
	if err!=nil{
		println("db sync fail",err.Error())
		return err,engine
	}
	return err,engine
}

