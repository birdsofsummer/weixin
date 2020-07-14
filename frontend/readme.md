

```bash

sls --debug        
#   Initializing...
#   Action: "deploy" - Stage: "dev" - App: "weixin" - Instance: "weixin"
#   the code will be uploaded to https://sp-ins-prod-1300963013.cos.ap-guangzhou.myqcloud.com/c7a78452-5aca-4ccf-9958-aa26771652b7.zip?q-sign-algorithm=sha1&q-ak=AKID1qcBe1cVaOwSmtn67y7pJJIAVj4jftBE&q-sign-time=1594712985;1594713585&q-key-time=1594712985;1594713585&q-header-list=&q-url-param-list=&q-signature=6274f3bf8cc4becb3448792fcbc8b76354ceb0dc
#   Deploying...
#   region:  ap-guangzhou
#   website: https://weixin-1252957949.cos-website.ap-guangzhou.myqcloud.com
#   Full details: https://serverless.cloud.tencent.com/instances/weixin%3Adev%3Aweixin
#   11s › weixin › Success
curl https://weixin-1252957949.cos-website.ap-guangzhou.myqcloud.com

```
