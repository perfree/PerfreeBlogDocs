---
title: 主题开发
---
## 开发准备
在开发PerfreeBlog主题前,建议先在本机安装好PerfreeBlog
* [windows安装](/install-windows.html)
* [Linux安装](/)
## 创建主题
在开发主题时,先要在PerfreeBlog安装目录resources/static/themes下新建你的主题文件夹,如myTheme。目录如下所示
```bash
myTheme # 主题目录
├── index.html # 首页
├── theme.properties # 主题信息
```
在新建一个主题时,index.html和theme.properties为必须文件,一个主题至少由这两个文件组成。
theme.properties内容如下:
```bash
name=myTheme # 主题名字
version=1.0.0 # 主题版本
author=Perfree # 主题作者
author.web.site=https://yinpengfei.com # 主题作者网址
description=描述 # 主题描述
screenshots=screenshots.jpg # 截图
```
::: tip
您也可以直接在PerfreeBlog后台管理界面->主题管理进行新建主题,之后利用新建的主题进行开发
::: 

## 主题结构
在做完以上操作后,您的主题就可以在后台进行启用然后访问了,当然,这个主题只有首页才能访问,其他页面的文件还没创建,以下是完整的主题目录结构

```bash
myTheme # 主题目录
├── static # 静态资源目录如css/js/image(目录名不一定是必须是static,您可以任意起名)
├── archive.html # 文章归档页
├── article.html # 文章详情页
├── articleList.html # 文章列表页(当首页使用了文章分页指令时,默认翻页会采用该页面,同时如您访问某个分类或标签的url,也会采用该页面展示文章列表)
├── journalList.html # 动态列表页
├── journal.html # 动态详情页
├── page # 自定义页面存放目录(如用户在后台创建了访问别名slug为link的页面,当用户访问时,系统就会优先展示改目录下link.html,如不存在同名的html,则会展示通用的page.html)
├── ── link.html # 友链页
├── ── html # 自定义静态页面文件夹(当该目录存在html文件,如test.html,那么用户就可以访问/html/test)
├── index.html # 首页
├── login.html # 登录页(如不存在则使用默认的)
├── register.html # 注册页(如不存在则使用默认的)
├── screenshots.jpg # 主题截图,会在后台管理所有主题显示当前截图(如不存在则显示默认图片)
├── search.html # 搜索结果页
├── categories.html # 分类页
├── tags.html # 标签页
├── page.html # 通用page页(如果未在page目录下存在对应自定义页面同名slug(访问别名)的html,则自定义页面会展示该页面)
├── 403.html # 自定义forbidden错误页(如不存在则使用默认的)
├── 404.html # 自定义404页(如不存在则使用默认的)
├── 500.html # 自定义500页(如不存在则使用默认的)
├── setting.html # 设置页,会在后台管理主题设置显示(如不存在则显示当前主题无设置项)
├── theme.properties # 主题信息
```
## 主题开发须知
目前PerfreeBlog提供了丰富的模板指令以及接口,建议您两者结合进行开发,更加方便快速