---
title: 文档-linux安装
---
## 下载

> 本教程以 CentOS 7.x 为例，其他 Linux 发行版基本一致。

首先将PerfreeBlog下载至本地备用,以便后续步骤,Linux推荐下载tar.gz安装包,Windows推荐下载zip安装包

* 下载地址一: github [https://github.com/perfree/PerfreeBlog/releases](https://github.com/perfree/PerfreeBlog/releases)
* 下载地址二: gitee [https://gitee.com/perfree/PerfreeBlog/releases](https://gitee.com/perfree/PerfreeBlog/releases)

## 环境配置
请确保服务器的软件包为最新
```bash
sudo yum update -y
```
安装java运行环境(已安装的请忽略)
```bash
# 安装 OpenJRE
sudo yum install java-1.8.0-openjdk -y

# 检测是否安装成功
java -version
```
> PerfreeBlog支持mysql和sqlite数据库,推荐数据库为mysql数据库,可参考[MySQL 安装](https://www.runoob.com/mysql/mysql-install.html),当然也可以选择使用sqlite数据库,无需安装
## 安装PerfreeBlog
将下载的Perfree安装包上传至服务器,解压压缩包
```bash
 tar zxvf perfree-web-xxx.tar.gz
```
进入解压后的目录
```bash
cd perfree-web
ls
```
将会看到目录内有如下文件

![目录](/assets/doc/7.png)

## 启动
```bash
./start.sh start
```
如遇到`-bash: ./start.sh: /bin/bash^M: 坏的解释器: 没有那个文件或目录`错误,则执行以下命令
```bash
sed -i 's/\r//' ./start.sh
./start.sh start
```
执行完毕会在终端显示如下信息

![安装成功](/assets/doc/8.png)

常用命令
```bash
# 运行
./start.sh start

# 查看运行状态
./start.sh status

# 重新启动
./start.sh restart

# 停止
./start.sh stop
```
## 访问
> 默认端口8080,如访问不到请查看服务器防火墙是否开启8080端口的访问权限,如需更改默认端口请查看基础配置

启动完成后,访问http://服务器ip:8080进入安装页,按照提示进行配置即可

![安装页](/assets/doc/9.png)