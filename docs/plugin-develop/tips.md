---
title: 插件开发-小技巧
---
在使用idea开发插件时, 可以配置自动编译插件包至插件目录,从而节省每次写完代码都要打包在后台安装的步骤,配置如下:
```
1. 开发插件,首先需要将插件打包然后在后台安装
2. 停止程序,删除resources/plugins中对应的插件jar包
3. 在idea选择 File->Project Structure->Project Settings->Artifacts->点击+号->JAR->From modules whith dependencies->选择对应的插件包->将output directory修改为项目路径/resources/plugins ->确认
4. 在Run/Debug Configurations->Before launch 下-> 点击小+号 -> Build ->Artifacts -> 选择上一步新增的>Artifacts
```
之后每次启动程序,都会保持为最新的插件jar包~

::: tip
更快捷的插件开发方式正在研究中...
::: 

