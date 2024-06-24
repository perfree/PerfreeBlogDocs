---
title: 插件开发
---
# 简介
PerfreeBlog对扩展插件的支持,极大的提升了PerfreeBlog的灵活性,您可以通过扩展插件来实现各种自定义功能,同时扩展插件的开发也极为简便,与开发普通的SpringBoot程序基本一致。在插件开发完毕后打包为jar包,通过PerfreeBlog后台管理中的插件管理可直接在线安装使用。PerfreeBlog基于SpringBoot和pf4j实现了扩展插件功能,在基于pf4j的基础上,做到了插件bean的动态注入,支持SpringBoot大部分注解,支持Mybatis等功能

以下为插件管理页面:

![目录](/assets/plugin/plugin.jpg)