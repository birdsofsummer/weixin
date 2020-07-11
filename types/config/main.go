package config


type AppConfig struct {
	Appid     string `toml:"appid"`    
	Appsecret string `toml:"appsecret"`
	DB  database `toml:"database"`
}

type database struct {
	Server  string
	Ports   []int
	ConnMax int `toml:"connection_max"`
	Enabled bool
}

