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

```bash
npm i -g serverless
sls --debug
```

## config.toml,修改config.pro.toml中数据库地址
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
+ 复制固定ip,粘贴到微信公众号后台ip白名单
+ 手机微信扫码确认


## 测试

```bash
curl https://service-xxxx-xxx.gz.apigw.tencentcs.com/release/weixin-token/  
```
```json
{
  "access_token": "35_zekS2770iEXcIXj5LzAGue7IsS7zpWSmWq3crHZ7718L5R---e9AbdATZ7zSSxVT96GJ_-AdIYeJcQRm0qm8_M-Wnmtw654cVDSUiny1pxoPVziwUNqRdH6A_88O5gCgcjdVUIYn_8mo7t3IOGEfAIAFXV",
  "expires_in": 1594549433
}





```

### 已知问题

```
db sync fail pq: SSL is not enabled on the server
eeee pq: SSL is not enabled on the server

```
解决办法
```
server = "postgresql://xxx:xxxx@postgres-xxxx.sql.tencentcdb.com:8224/xxxxx?sslmode=disable"
```

