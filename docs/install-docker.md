---
title: 文档-Docker安装
---
## 安装
```
docker run --name perfree -d -p 8080:8080 perfree/perfree:v2.3.0
```
> PerfreeBlog提供版本号及latest标签的镜像,其中latest始终为最新的,但如果配置了镜像源,避免出现缓存的现象,还是推荐您使用版本号进行下载,查看最新镜像版本: [https://hub.docker.com/r/perfree/perfree](https://hub.docker.com/r/perfree/perfree)


> 执行完该命令后,您就可以访问8080端口进行体验了,但实际生产环境中,建议您备份并挂载资源目录,防止docker更新造成数据丢失,建议您做以下操作

## 资源映射

> 注意: 只需要在第一次安装时执行1-3步骤,更新时启动只需要执行执行步骤4即可

1. 在您本机(宿主机)创建Perfree资源目录(任意路径):
```
mkdir /perfree
```
2. 将资源从容器中拷贝至创建的目录
```
docker cp perfree:/resources/ /perfree/
docker cp perfree:/config/ /perfree/
```
命令解析: <br>
docker cp perfree:/resources/ [创建的资源目录]<br>
docker cp perfree:/config/ [创建的资源目录]<br>

3. 停止并删除容器
```
docker stop perfree 
docker rm perfree 
```

4. 挂载资源启动(这样后期更新所有的数据都会在宿主机内,不会造成文件丢失)
```
docker run -v /perfree/config:/config -v /perfree/resources:/resources --name perfree -d -p 8080:8080 perfree/perfree
```
命令解析:docker run -v [创建的资源目录]/config:/config -v [创建的资源目录]/resources:/resources --name perfree -d -p 8080:8080 perfree/perfree