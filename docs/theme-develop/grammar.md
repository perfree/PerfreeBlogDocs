---
title: 主题开发-语法
---
## 简介
Perfree采用Jfinal 的 Enjouy模板引擎,在此之前使用了freemarker和thymeleaf模板引擎,最终的对比下,还是使用Enjoy模板引擎,该模板引擎具有极简设计、独创算法、极爽的开发体验,具体可查看官网介绍[Jfinal Enjoy](https://jfinal.com/doc/6-1),接下来将简单的介绍该模板引擎的语法,以便主题开发使用
> 详细文档请查看[Jfinal Enjoy](https://jfinal.com/doc/6-1)
## 输出
所有的取值输出方式都是以#(key)的方式
```html
#(key)
```
示例
```html
<!-- 输出SEO_TITLE -->
#(SEO_TITLE)
<!-- 输出文章的标题 -->
#(article.title)
```
## 安全输出
在开发过程中,可能会遇到某个值为空的情况,这个时候就需要使用安全输出
```html
#(key??)
```
当然还可以指定当值为空的情况下输出定义的默认值
```html
#(key??'default')
```
## 表达式
表达式与java基本一致,以下摘抄至[https://jfinal.com/doc/6-3](https://jfinal.com/doc/6-3)
* 算术运算： +   -   *   /   %   ++   --
* 比较运算： >  >=   <   <=  ==   != 
* 逻辑运算： !   &&   ||
* 三元表达式： ? :
* Null 值常量: null
* 字符串常量： "jfinal club"
* 布尔常量：true false
* 数字常量： 123  456F  789L  0.1D  0.2E10
* 数组存取：array[i]
* 属性取值：object.field
* 方法调用：object.method(p1, p2…, pn) (支持可变参数)
* 逗号表达式：123, 1>2, null, "abc", 3+6 (逗号表达式的值为最后一个表达式的值)
## if判断
if指令需要一个 cond 表达式作为参数，并且以 #end 为结尾符，当 cond 求值为 true 时，执行 if 分支之中的代码
```html
#if(cond)
  ...
#end
```
```html
#if(c1)
  ...
#else if(c2)
  ...
#else if (c3)
  ...
#else
  ...
#end
```
## switch判断
switch 指令和java 语言的 switch 语句基本用法一致
```html
#switch (month)
  #case (1, 3, 5, 7, 8, 10, 12)
    #(month) 月有 31 天
  #case (2)
    #(month) 月平年有28天，闰年有29天
  #default
    月份错误: #(month ?? "null")
#end
```
## for循环
Enjoy Template Engine 对 for 指令进行了极为人性化的扩展，可以对任意类型数据进行迭代输出，包括支持 null 值迭代
```html
#for(x : list)
  #(x.field)
#end
 
#for(x : map)
  #(x.key)
  #(x.value)
#end

#for(x : listAaa)
   #(for.size)    被迭代对象的 size 值
   #(for.index)   从 0 开始的下标值
   #(for.count)   从 1 开始的记数值
   #(for.first)   是否为第一次迭代
   #(for.last)    是否为最后一次迭代
   #(for.odd)     是否为奇数次迭代
   #(for.even)    是否为偶数次迭代
   #(for.outer)   引用上层 #for 指令状态
#end
```
for 指令还支持 #else 分支语句,在for指令迭代次数为0时，将执行 #else 分支内部的语句
```html
#for(blog : blogList)
   #(blog.title)
#else
   您还没有写过博客，点击此处<a href="/blog/add">开博</a>
#end
```
## include包含
include指令用于将外部模板内容包含进来，被包含的内容会被解析成为当前模板中的一部分进行使用
```html
#include("sidebar.html")
```
## 更多
> Jfinal Enjoy更多详细的语法指令请参考[Jfinal Enjoy](https://jfinal.com/doc/6-1)