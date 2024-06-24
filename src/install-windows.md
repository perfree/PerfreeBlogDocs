---
title: 文档-windows安装
---
## 下载
首先将PerfreeBlog下载至本地备用,以便后续步骤,Linux推荐下载tar.gz安装包,Windows推荐下载zip安装包

* 下载地址一: github [https://github.com/perfree/PerfreeBlog/releases](https://github.com/perfree/PerfreeBlog/releases)
* 下载地址二: gitee [https://gitee.com/perfree/PerfreeBlog/releases](https://gitee.com/perfree/PerfreeBlog/releases)

## 环境配置
安装java运行环境(已安装的请忽略),参考教程[Java 环境配置](https://www.runoob.com/java/java-environment-setup.html)
> PerfreeBlog支持mysql和sqlite数据库,推荐数据库为mysql数据库,可参考[MySQL 安装](https://www.runoob.com/w3cnote/windows10-mysql-installer.html),当然也可以选择使用sqlite数据库,无需安装

## 安装PerfreeBlog
将下载好的PerfreeBlog安装包进行解压,解压后会得到如下目录

![目录](/assets/doc/10.png)

## 启动
双击start.bat,会弹出cmd窗口,出现如下界面即可

![目录](/assets/doc/11.png)

## 访问
> 默认端口8080,如访问不到请查看服务器防火墙是否开启8080端口的访问权限,如需更改默认端口请查看[更换端口]()

启动完成后,访问http://服务器ip:8080进入安装页,按照提示进行配置即可

![安装页](/assets/doc/9.png)