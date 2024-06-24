---
title: 文档-基础配置
---
## 目录结构
PerfreeBlog的安装目录结构如下:

```bash
perfree-web  # 安装目录
├── config  # 配置文件目录
│    └── application.yml  # 配置文件
├── logs  # 日志输出目录
├── perfree-web.jar  # jar包
├── resources  # 资源目录
│   ├── db  # 数据库目录(如果使用mysql数据库,则没有此目录)
│   │   └── perfree.db  # sqlite数据库
│   ├── db.properties  # 数据库连接信息配置
│   ├── Perfree-sqlite.sql  # sqlite初始化脚本
│   ├── Perfree.sql  # mysql初始化脚本
│   ├── plugins  # 插件目录
│   └── static  # 静态资源目录
│       ├── admin  # 后台管理相关页面
│       ├── public  # 公共的静态资源
│       └── themes  # 主题
├── start.bat  # win启动脚本
└── start.sh   # Linux启动脚本
```

## 端口号
PerfreeBlog默认端口号为8080,如需修改则可以打开安装目录内config/application.yml对port进行修改
```yaml
server:
  # 端口
  port: 8080

# 默认文件上传地址
web.upload-path: resources/upload/
spring:
  devtools:
    restart:
      enabled: false
  servlet:
    multipart:
      # 单个文件上传允许最大大小,默认-1为不限制,如需限制大小改为具体的大小即可,如100MB
      max-file-size: -1
      # 总上传的数据大小,默认-1为不限制,如需限制大小改为具体的大小即可,如100MB
      max-request-size: -1

logging:
  level:
    com.perfree: error
  file:
    # 日志文件输出路径
    name: ./logs/Perfree.log
    # 日志最多保存多少天
    max-history: 7
    # 单个日志文件最大大小
    max-size: 10MB
cache:
  ehcache:
    config: ehcache.xml
shiro:
  loginUrl: /login
  enabled: true
  # 会话超时时间(分钟)
  timeout: 120
```
## 数据库信息
如需更换数据库密码/信息等操作,可以安装目录内resources/db.properties进行修改
```bash
#Sat Dec 26 20:24:40 CST 2020
url=jdbc\:sqlite\:resources/db/perfree.db?date_string_format\=yyyy-MM-dd HH\:mm\:ss
driverClassName=org.sqlite.JDBC
type=sqlite
installStatus=success
```