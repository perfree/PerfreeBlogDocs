---
title: 插件开发-开发语法
---
# 开发语法
扩展插件开发语法与普通SpringBoot程序基本一致,可以参考程序附带的两款示例插件,在perfree-plugin模块下,以下讲解了插件支持的语法
## 插件初始化事件类
我们可以在插件模块里新建一个任意类来实现BasePluginEvent接口,该类会在插件发生状态变化时调用,如启动时,安装时,卸载时以及更新时调用
```java
package com.exam.service;

import com.perfree.plugin.BasePluginEvent;
import com.perfree.plugin.PluginEvent;
import org.springframework.stereotype.Service;

/**
 * @description 插件示例: 插件启动,停止,安装,更新,卸载事件
 * @author Perfree
 * @date 2021/11/10 9:53
 */
@Service
public class PluginEventService implements BasePluginEvent {
    @Override
    public void onStart() {
        System.out.println("onStart");
    }

    @Override
    public void onStop() {
        System.out.println("onStop");
    }

    @Override
    public void onUpdate() {
        System.out.println("onUpdate");
    }

    @Override
    public void onInstall() {
        System.out.println("onInstall");
    }

    @Override
    public void onUnInstall() {
        System.out.println("onUnInstall");
    }
}

```
## 注解支持
```
组件注解:
@Component、@Service
接口注解:
@Controller、@RestController、@RequestMapping、@XXMapping、...等等
注入注解:
Spring各种注入注解，比如:@Autowired
Mybatis注解:
Mapper接口注解: @Mapper
拦截器注解:
@InterceptPath("/**")
模板指令注解:
@TemplateDirective("subs")
菜单注解:
@AdminGroups,@AdminMenu
```

## Controller
扩展插件支持@RestController,@Controller注解,以下为开发示例
```java
package com.exam.controller;

import com.exam.model.Article;
import com.exam.service.HelloWorldService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * @description 示例插件: controller
 * @author Perfree
 * @date 2021/8/17 15:08
 */
@Controller
public class HelloWorldController{

    @Autowired
    private HelloWorldService helloWorldService;

    /** 
     * @description 返回字符串
     * @return java.lang.String
     * @author Perfree
     */ 
    @RequestMapping("/plugin/testStr")
    @ResponseBody
    public String testStr () {
        return "插件测试:返回字符串";
    }

    /**
     * @description 查询数据库所有文章
     * @return java.util.List<com.exam.model.Article>
     * @author Perfree
     */
    @RequestMapping("/plugin/testQueryArticle")
    @ResponseBody
    public List<Article> testQueryArticle() {
        return helloWorldService.testQueryArticle();
    }

    /**
     * @description 返回Html
     * @return java.lang.String
     * @author Perfree
     */
    @RequestMapping("/plugin/testHtml")
    public String testHtml (Model model) {
        model.addAttribute("article", "插件测试: 返回html");
        return "/exam-static/index.html";
    }
}
```
## Service
```java
package com.exam.service;

import com.exam.mapper.HelloWorldMapper;
import com.exam.model.Article;
import com.perfree.commons.SpringBeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @description 插件示例: Service
 * @author Perfree
 * @date 2021/8/17 15:08
 */
@Service
public class HelloWorldService{

    @Autowired
    private HelloWorldMapper helloWorldMapper;

    /**
     * @description 查询所有文章
     * @return java.util.List<com.exam.model.Article>
     * @author Perfree
     */
    public List<Article> testQueryArticle() {
        return helloWorldMapper.testQueryArticle();
    }
}

```

## Mapper
扩展插件提供了对mybatis的支持,在使用时,建议Mapper文件目录命名为插件id-mapper的形式,否则可能会出现mapper覆盖问题
```java
package com.exam.mapper;

import com.exam.model.Article;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * @description 插件示例: Mapper
 * @author Perfree
 * @date 2021/8/17 15:08
 */
@Mapper
public interface HelloWorldMapper{

    /**
     * @description 查询所有文章
     * @return java.util.List<com.exam.model.Article>
     * @author Perfree
     */
    List<Article> testQueryArticle();
}

```

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd" >
<mapper namespace="com.exam.mapper.HelloWorldMapper" >
    <!-- 插件示例: Mapper.xml  查询所有文章 -->
    <select id="testQueryArticle" resultType="com.exam.model.Article">
        select * from `p_article`
    </select>
</mapper>

```

## 拦截器
扩展插件拦截器需要使用自定义注解@InterceptPath("/**"),值为拦截的路径
```java
package com.exam.interceptor;

import com.perfree.plugin.annotation.InterceptPath;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * @description 示例插件: 拦截器
 * @author Perfree
 * @date 2021/11/10 9:48
 */
@InterceptPath("/**")
public class ExamInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
       System.out.println("preHandle");
        return true;
    }
}
```

## 自定义模板指令
扩展插件同时支持自定义模板指令供页面使用,开发自定义模板指令需要继承BaseDirective类,同时使用@TemplateDirective()注解,如下:
```java
package com.exam.directive;

import com.jfinal.template.Env;
import com.jfinal.template.expr.ast.ExprList;
import com.jfinal.template.io.Writer;
import com.jfinal.template.stat.Scope;
import com.perfree.directive.BaseDirective;
import com.perfree.directive.TemplateDirective;
import org.springframework.stereotype.Component;

/**
 * @description 插件示例: 自定义模板指令subs,截取字符串
 * @author Perfree
 * @date 2021/8/17 15:08
 */
@TemplateDirective("subs")
public class SubDirective extends BaseDirective {
    public void setExprList(ExprList exprList) {
        super.setExprList(exprList);
    }

    @Override
    public void exec(Env env, Scope scope, Writer writer) {
        String str = getParam(0, scope).toString();
        int maxLength = getParamToInt(1, scope, 0);
        String result;
        if (str.length() > maxLength) {
            result = str.substring(0, maxLength);
        } else {
            result = str;
        }
        write(writer, result);
    }
}

```

## 静态资源访问
扩展插件如需要静态资源的访问,需要在插件配置文件编写静态资源文件路径,如
```
static.locations=classpath:/exam-static/
```
配置完毕后访问路径为ip:port/static-plugin/插件ID/资源文件路径,假设在exam-plugin插件的exam-static目录有1.txt文件,那么访问路径就是ip:port/static-plugin/exam-plugin/1.txt

## 插件菜单
插件支持菜单注解@AdminGroups,@AdminMenu,其中AdminGroups为菜单组,AdminMenu为菜单项,可以理解为AdminGroups为一级菜单,AdminMenu为二级菜单,
@AdminGroups推荐在插件主类使用,@AdminMenu则是在controller具体的方法上边使用
```
@AdminGroups(groups = {
     @AdminGroup(name = "菜单名", groupId = "菜单组id", icon = "菜单图标(fontawesome)", url = "菜单url", role = {菜单所属角色1,菜单所属角色2}, seq= 菜单序号),
     @AdminGroup(name = "菜单名2", groupId = "菜单组id2", icon = "菜单图标(fontawesome)", url = "菜单url", role = {菜单所属角色1,菜单所属角色2}, seq= 菜单序号)
})

@AdminMenu(
    groupId = "菜单组ID,对应@AdminGroups中的组Id", name = "菜单名称", role = {菜单所属角色1,菜单所属角色2}, seq= 菜单序号, target = 菜单打开方式
)

菜单所属角色可选:
Constants.ROLE_ADMIN (管理员)
Constants.ROLE_USER (普通用户)
Constants.ROLE_EDITOR (文章编辑)
Constants.ROLE_CONTRIBUTE (文章贡献)

菜单打开方式可选:
Constants.MENU_TARGET_SELF (本页)
Constants.MENU_TARGET_BLANK(新窗口)
```

<br>
1. 假设我们要在后台页面新增一个访问统计的菜单,不需要子菜单,那么新增的方法如下:

```java
package com.access;

import com.perfree.permission.AdminGroup;
import com.perfree.permission.AdminGroups;
import com.perfree.plugin.BasePlugin;
import org.pf4j.PluginWrapper;

/**
 * 插件主类
 */
@AdminGroups(groups = {
        @AdminGroup(name = "访问统计", groupId = "plugin-access", icon = "fa-line-chart", url = "/plugin/access")
})
public class PluginMain extends BasePlugin {
    public PluginMain(PluginWrapper wrapper) {
        super(wrapper);
    }
}
```
这样插件安装启动后,后台页面就会新增一个访问统计的菜单,地址为/plugin/access<br><br>


2. 假设我们要在后台页面增加一个文章管理菜单,且文章管理内包含两个子菜单为文章列表,新增文章,写法如下:<br>
插件主类
```java
package com.access;

import com.perfree.permission.AdminGroup;
import com.perfree.permission.AdminGroups;
import com.perfree.plugin.BasePlugin;
import org.pf4j.PluginWrapper;

/**
 * 插件主类
 */
@AdminGroups(groups = {
        @AdminGroup(name = "文章管理", groupId = "plugin-article", icon = "fa-line-chart")
})
public class PluginMain extends BasePlugin {
    public PluginMain(PluginWrapper wrapper) {
        super(wrapper);
    }
}
```
Controller类渲染页面的方法
```java
@AdminMenu(name="新增文章", groupId = "plugin-article", seq = 1)
@RequestMapping("/plugin/xxx")
public String index(){
    return "/access-static/xxx.html";
}


@AdminMenu(name="文章列表", groupId = "plugin-article", seq = 2)
@RequestMapping("/plugin/xxx")
public String index(){
    return "/access-static/xxx.html";
}
```

## WebSocket
从PerfreeBlog2.2.1版本开始,插件支持定义websocket,不需要做任何配置,只需参考以下写法即可:
```java
package com.access.controller;

import org.springframework.stereotype.Component;

import javax.websocket.*;
import javax.websocket.server.ServerEndpoint;
import java.util.concurrent.atomic.AtomicInteger;

@ServerEndpoint("/webSocket/test")
@Component
public class WebSocketTest {
    private static final AtomicInteger onlineCount = new AtomicInteger(0);

    @OnOpen
    public void onOpen(Session session) {
        onlineCount.incrementAndGet(); // 在线数+1
        System.out.println("有新连接加入，当前在线人数为：" + onlineCount.get());
    }

    @OnClose
    public void onClose(Session session) {
        onlineCount.decrementAndGet(); // 在线数减1
        System.out.println("有一连接关闭，当前在线人数为：" + onlineCount.get());
    }

    @OnMessage
    public void onMessage(String message, Session session) {
        System.out.println("服务端收到客户端的消息：" + message);
        this.sendMessage("Hello, " + message, session);
    }

    @OnError
    public void onError(Session session, Throwable error) {
        System.out.println("发生错误");
        error.printStackTrace();
    }

    private void sendMessage(String message, Session toSession) {
        try {
            System.out.println("服务端给客户端发送消息：" + message);
            toSession.getBasicRemote().sendText(message);
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("服务端给客户端发送消息失败：" + e.getMessage());
        }
    }
}

```
## 主题资源渲染
当插件写完之后,如果想要支持主题开发时定义页面与插件交互,可以这样写
```java
@RequestMapping("/photos")
public String frontIndex(){
    return pluginView("/photos.html", "/photos.html", "/photos-static/index.html");
}
```
程序会默认先去主题里边查找photos.html,如果主题内不存在该文件,则会访问插件内的/photos-static/index.html