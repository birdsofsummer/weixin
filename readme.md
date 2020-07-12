# 微信公众号token server

+ [文档](https://developers.weixin.qq.com/doc/offiaccount/Basic_Information/Get_access_token.html)
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

## 初始化数据库

```bash
sls --debug
```

## 打包

```
./build.sh
```









todo

```
db sync fail pq: SSL is not enabled on the server
eeee pq: SSL is not enabled on the server

```

