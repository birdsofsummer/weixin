# [微信公众号](https://developers.weixin.qq.com/doc/offiaccount/Basic_Information/Get_access_token.html)token server

+ token有效期7200秒
+ 公众号需设置ip白名单


## 配置 .env

```
# secret for credential
TENCENT_APP_ID=123456
TENCENT_SECRET_ID=1111
TENCENT_SECRET_KEY=2222
# global config
REGION=ap-guangzhou
ZONE=ap-guangzhou-3
```

## [初始化数据库](https://cloud.tencent.com/document/product/583/45363) 得到connectionString


+ [数据库配置文档](https://github.com/serverless-components/tencent-postgresql/blob/master/docs/configure.md)

```bash
npm i -g serverless
sls --debug
```

## config.toml复制为config.pro.toml,修改config.pro.toml中数据库地址
```bash 
cp config.toml config.pro.toml

```

```toml
[database]
server = "postgres://postgres:postgres@localhost:5432/chat1?sslmode=disable"
```
server改为上一步得到的connectionString + `?sslmode=disable`

## 打包

```
./build.sh
ls /tmp/1.zip

```

## 部署

+ 新建云函数,上传打包好的zip文件
+ 勾选固定ip出口,得到固定ip
+ apigateway触发/集成响应
+ 复制固定ip,粘贴到[微信公众号后台](https://mp.weixin.qq.com/advanced/advanced?action=dev&t=advanced/dev)p白名单
+ 手机微信扫码确认


## 测试

```bash
curl https://service-qsqxa5fo-1252957949.gz.apigw.tencentcs.com/release/weixin-token/

curl 'https://service-qsqxa5fo-1252957949.gz.apigw.tencentcs.com/release/weixin-token/jssdk' -H 'referer: https://tieba.baidu.com/index.html' -H 'Origin: https://tieba.baidu.com/' 

```

```json
{
  "access_token": "35_ZSs1S_3-xP4AqVF_sDCqXSsbtSrus7mPIoQd8Vm8CqUoD6tYwtfqlAIocS67KhgB0F8D_icwEj1VfYxjj9OkYtYqFZI9-6MfaZyYGWdQzo1eoBoLclC98d4tXoRhm7KLGUrRb96vSUqJq8qdOOGiAFAFFX",
  "expires_in": 1594706754
}
```

```json

{
  "appId": "wx0f713af1c8799df9",
  "nonceStr": "mgcdkfbkhcahboid",
  "jsapi_ticket": "sM4AOVdWfPE4DxkXGEs8VMdpedBBeAe0I5SLCr-9y-7SAUmTDPVMYOjPqns8dRZsAGT-KAEc-ecVmiNEWCIeqA",
  "signature": "a43364e41f29d05acb4be266933d5214581fc9ae",
  "url": "https://tieba.baidu.com/",
  "rawString": "jsapi_ticket=sM4AOVdWfPE4DxkXGEs8VMdpedBBeAe0I5SLCr-9y-7SAUmTDPVMYOjPqns8dRZsAGT-KAEc-ecVmiNEWCIeqA&noncestr=mgcdkfbkhcahboid&timestamp=1594700144&url=https://tieba.baidu.com/",
  "timestamp": 1594700144,
  "expires_in": 1594707344,
  "token": "35_ZSs1S_3-xP4AqVF_sDCqXSsbtSrus7mPIoQd8Vm8CqUoD6tYwtfqlAIocS67KhgB0F8D_icwEj1VfYxjj9OkYtYqFZI9-6MfaZyYGWdQzo1eoBoLclC98d4tXoRhm7KLGUrRb96vSUqJq8qdOOGiAFAFFX"
}

```


### frontend


[配置JS接口安全域名](https://mp.weixin.qq.com/cgi-bin/settingpage?t=setting/function&action=function&lang=zh_CN)


```bash
cd frontend
sls --debug

```










### 已知问题


+ 数据库需要关闭ssl

```
db sync fail pq: SSL is not enabled on the server
eeee pq: SSL is not enabled on the server

```
解决办法
```
server = "postgresql://xxx:xxxx@postgres-xxxx.sql.tencentcdb.com:8224/xxxxx?sslmode=disable"
```


+  如果不是常见域名，微信会改写url,变得特别长

```
referer: https://weixin-1252957949.cos-website.ap-guangzhou.myqcloud.com/?nsukey=TFacnjZgZUc2NyLkqaHYiVsJeeSFHsal3cgENWhxneMPRptMiNnsGGr%2BJKQM2hLiAQJQfTkIufWIlW2auWQfF5YJGAS4w8V%2FVDV8fV1AP59qkpjybInsLGvjS0fUkFr9LKCr92Om1gTSd4blRbVraVuPx9hPMtZGpwadPDZMzyGku4VPDEVPB5jZTV7cWajETMKG1ENJ5J3vMZ%2FJYL1%2F5w%3D%3D

这种太长的会查询保存失败
因为默认类型是character varying(255)

jssdk fail pq: value too long for type character varying(255)
jssdk list fail pq: column "url" does not exist


https://gobook.io/read/gitea.com/xorm/manual-en-US/chapter-02/1.mapping.html

类型要改一下

`xorm:"varchar(4000)"`
`xorm:"Text"`

```

```go

type TopLevel struct {
	AppID       string `json:"appId"`       
	NonceStr    string `json:"nonceStr"`    
	JsapiTicket string `json:"jsapi_ticket"`
	Signature   string `json:"signature"`   
	URL         string `xorm:"Text" json:"url"`         //很长
	RawString   string `xorm:"Text" json:"rawString"`   //很长
	Timestamp   int64  `json:"timestamp"`   
	ExpiresIn   int64  `json:"expires_in"`  
	Token       string `json:"token"`       
}

```
