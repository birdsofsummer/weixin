package config

import (
	"fmt"
    "github.com/BurntSushi/toml"
	. "../types/config"
)

func GetConfig(f string) (error,*AppConfig){
	var c *AppConfig=new (AppConfig)
    _, err := toml.DecodeFile(f,c)
    if err!=nil{
        fmt.Println(err)
		return err,c
    }
	//fmt.Println(c.DB.Server)
	return err,c
}


