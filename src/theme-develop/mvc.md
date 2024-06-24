---
title: 主题开发-使用Vue/Angular/React开发
---
## 简介
从PerfreeBlog 3.0.0版本开始,支持使用Vue/Angular/React开发主题
## 示例项目
您可参考提供的angular开发主题的示例项目,进行主题的开发,Vue/React同理[https://github.com/perfree/perfree-ng-theme](https://github.com/perfree/perfree-ng-theme)
## 开发主题注意事项
1. 要保证项目打包后根目录存在index.html和theme.properties文件
2. 路由尽量和后台保持一致
3. theme.properties中type属性配置为angular或者vue
4. 如前端项目定义后端没有的路由,要以/html/开头,否则会404
5. 后台页面管理添加的自定义页面如友链页,需要在根目录创建page目录并在里边存放一个对应url的空html文件,如link.html
6. 如主题有一些用户可以自定义的功能,可在根目录增加setting.html文件,以便用户设置,用户设置完毕后可通过配置相关接口获取用户设置的信息