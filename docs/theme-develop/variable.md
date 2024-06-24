---
title: 主题开发-全局变量
---
## 介绍
全局变量,指在任意页面都可使用,如#(SEO_TITLE??)
名称|类型|描述
---|:--:|---:
SEO_TITLE|字符串|网站SEO标题(如文章标题)
SEO_KEYWORD|字符串|网站SEO关键字(如文章关键字)
SEO_DESC|字符串|网站SEO描述(如文章描述)
WEB_TITLE|字符串|网站标题(网站设置中设置的网站标题)
WEB_META_KEYWORD|字符串|网站关键字(网站设置中设置的网站关键字)
WEB_META_DESC|字符串|网站描述(网站设置中设置的网站描述)
version|字符串|当前版本
WEB_SITE|字符串|网站地址
loginUser|User对象|当前登录用户
## SEO_TITLE
用于输出网站SEO标题
```html
#(SEO_TITLE??)
```
## SEO_KEYWORD
用于输出网站SEO关键字
```html
#(SEO_KEYWORD??)
```
## SEO_DESC
用于输出网站SEO描述
```html
#(SEO_DESC??)
```
## WEB_TITLE
用于输出网站标题
```html
#(WEB_TITLE??)
```
## WEB_META_KEYWORD
用于输出网站关键字
```html
#(WEB_META_KEYWORD??)
```
## WEB_META_DESC
用于输出网站描述
```html
#(WEB_META_DESC??)
```
## version
用于输出当前版本
```html
#(version??)
```
## WEB_SITE
用于输出网站地址,如果未在后台设置网站地址则会显示ip+port的方式
```html
#(WEB_SITE??)
```
## loginUser
当前登录的用户,如果未登录则为空
```html
#if(loginUser)
    #(loginUser.userName)已登录
#else
   未登录
#end
```
常用属性描述:
名称|类型|描述
---|:--:|---:
loginUser.userName|字符串|用户名
loginUser.id|字符串|用户id
loginUser.account|字符串|账户
loginUser.status|数字|状态0正常,1禁用
loginUser.avatar|字符串|头像地址
loginUser.website|字符串|网站地址
loginUser.email|字符串|邮箱地址
loginUser.hasAdmin()|字符串|是否为管理员