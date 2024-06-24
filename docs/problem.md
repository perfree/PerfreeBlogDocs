---
title: 文档-常见问题
---
## 访问的用户如何修改头像
项目默认采用gravatar进行头像处理,访问的用户可去https://en.gravatar.com进行修改头像

## 头像加载失败
项目默认采用gravatar进行头像处理,您可以在网站设置中配置gravatar镜像源,网上收集的常用镜像源如下:
```
zeruns's Blog的镜像源：//gravatar.zeruns.tech/avatar/
gravatar官方的www源 //www.gravatar.com/avatar/
gravatar官方的cn源 //cn.gravatar.com/avatar/
gravatar官方的en源 //en.gravatar.com/avatar/
gravatar官方的secure源 //secure.gravatar.com/avatar/
V2EX源 //cdn.v2ex.com/gravatar/
Loli源 //gravatar.loli.net/avatar/
极客族 //sdn.geekzu.org/avatar/
```

## 菜单图标在哪找
菜单图标是根据主题来定义的,目前的几款主题都是fontawesome图标,网址: https://fontawesome.dashgame.com

## 如何自定义页面
如主题中附带page.html,可在后台管理->页面管理->新增页面

## 如何将自定义的页面添加进菜单
在菜单管理中,将创建的页面的url添加进去即可

## 如何配置nginx
```
http {
    include       mime.types;
    default_type  application/octet-stream;
    sendfile        on;
    keepalive_timeout  1800;
    map $http_upgrade $connection_upgrade {
        default upgrade;
        ''      close;
    }
    server {
            listen       80;
            server_name  www.yinpengfei.com;
            gzip  on;
            gzip_disable "MSIE [1-6].";
            client_max_body_size    1000m;
            location / {
                    proxy_redirect off;
                    proxy_set_header Host $host;
                    proxy_set_header X-Forwarded-Host $host;
                    proxy_set_header X-Forwarded-Server $host;
                    proxy_set_header X-Real-IP $remote_addr;
                    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                    proxy_buffering on;
                    proxy_pass http://127.0.0.1:8080;
                    # websocket support
                    proxy_http_version 1.1;
                    proxy_set_header Upgrade $http_upgrade;
                    proxy_set_header Connection "upgrade";
            }
            error_page   500 502 503 504  /50x.html;
            location = /50x.html {
                root   html;
            }
    }
}
```
## 如何配置https
```
http {
    include       mime.types;
    default_type  application/octet-stream;
    sendfile        on;
    keepalive_timeout  1800;
    map $http_upgrade $connection_upgrade {
        default upgrade;
        ''      close;
    }

    server {
        listen       80;
        server_name  www.yinpengfei.com;
        rewrite ^(.*) https://www.yinpengfei.com$1 permanent;
    }

    server {
        listen       443 ssl;
        server_name  www.yinpengfei.com;
		ssl on;
        ssl_certificate      xxxx.pem;
        ssl_certificate_key   xxxx.key;
		gzip  on;
		gzip_disable "MSIE [1-6].";
		client_max_body_size    1000m;
		location / {  
			proxy_redirect off;  
			proxy_set_header Host $host;  
			proxy_set_header X-Forwarded-Host $host;  
			proxy_set_header X-Forwarded-Server $host;  
			proxy_set_header X-Real-IP $remote_addr;  
			proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;  
			proxy_buffering on;  
            proxy_pass http://127.0.0.1:8089;
            # websocket support
			proxy_http_version 1.1;
			proxy_set_header Upgrade $http_upgrade;
			proxy_set_header Connection "upgrade";
		}
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
		
    }
}
```

## 如何安装及更新主题
安装主题可在后台管理->主题管理->所有主题中安装,更新主题直接安装即可

## 如何安装及更新插件
可在后台管理->插件管理->插件列表中安装,更新插件直接安装即可

## 编辑器预览样式与实际主题样式不一致
与主题相关,主题样式写的什么,最终渲染就是什么样式,编辑器预览样式仅作为参考

## mysql5.6安装失败
```
1. 进入linux终端输入mysql -u root -p
2. 输入mysql数据库的root用户密码并回车
3. set global innodb_file_format = BARRACUDA;
4. 回车出现OK即可
5. set global innodb_large_prefix = ON;
6. 回车出现OK即可
```
之后进行正常安装就可以了

## 网站根目录
项目目录resources/static文件夹

## 主题安装失败
当出现该问题时,您可排查以下几点:
```
1. 如果使用了Nginx,看下是否配置了文件上传最大大小,nginx默认为1m
2. 主题包是否完整
3. 程序是否有文件读写权限
```

## 插件安装失败
当出现该问题时,您可排查以下几点:
```
1. 如果使用了Nginx,看下是否配置了文件上传最大大小,nginx默认为1m
2. 程序是否有文件读写权限
```

## 未配置邮箱服务如何找回密码
未配置邮箱服务找回密码时,您可在服务器项目目录内logs文件夹中的Perfree.log文件查看邮箱验证码