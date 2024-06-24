---
title: 主题开发-api接口
---
## 简介
从PerfreeBlog 2.0.0版本开始,基本完善了对API接口进行了支持,可以按照下文方式查看swagger接口文档
## 开启Swagger文档
将config目录下application.yml配置文件中的swagger.enable改为true即可,如下:
```
swagger:
  enable: true
  application-name: PerfreeBlog
  application-version: ${version}
  application-description: PerfreeBlog接口文档
  try-host: http://localhost:${server.port}
```
开启后重启项目访问/doc.html即可进行查看