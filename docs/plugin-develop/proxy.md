---
title: 插件开发-插件代理
---
# 插件代理
从PerfreeBlog2.2.0版本开始,插件支持了一系列代理方法供插件使用,提高插件的灵活性,在开发过程中,只需继承指定的代理类,并增加`@Component`注解,就可以在特定的时机执行插件的自定义代码,比如修改渲染后的html,评论过滤等
## Html渲染代理
Html渲染代理类HtmlRenderProxy: 插件可继承该类重写其中的方法,获取渲染的html Document对象进行操作, 内置代理方法如下:
```java
package com.perfree.plugin.proxy;

import org.jsoup.nodes.Document;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Html渲染代理: 插件可继承该类,获取渲染的html Document对象进行操作
 */
public abstract class HtmlRenderProxy {

    /**
     * 修改渲染后的html Document
     *
     * @param document html document对象
     * @param response HttpServletResponse
     * @param request  HttpServletRequest
     * @return 修改后的 html Document
     */
    public Document editDocument(Document document, HttpServletResponse response, HttpServletRequest request) {
        return document;
    }

    /**
     * 修改渲染后的html Document(该方法只有访问地址非/admin起始时才会调用)
     *
     * @param document html document对象
     * @param response HttpServletResponse
     * @param request  HttpServletRequest
     * @return 修改后的 html Document
     */
    public Document editFrontDocument(Document document, HttpServletResponse response, HttpServletRequest request) {
        return document;
    }

    /**
     * 修改渲染后的html Document(该方法只有访问地址为/admin起始时才会调用)
     *
     * @param document html document对象
     * @param response HttpServletResponse
     * @param request  HttpServletRequest
     * @return 修改后的 html Document
     */
    public Document editAdminDocument(Document document, HttpServletResponse response, HttpServletRequest request) {
        return document;
    }
}
```

示例(在渲染后的前台html的head中追加自定义js代码):
```java
package com.copy;

import com.perfree.plugin.proxy.HtmlRenderProxy;
import org.jsoup.nodes.Document;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;

@Component
public class CopyHandle extends HtmlRenderProxy {

    @Override
    public Document editFrontDocument(Document document, HttpServletResponse response, HttpServletRequest request) {
        document.head().append("<script>console.log('插件追加的js代码')</script>");
        return document;
    }
}
```
## 评论代理
评论代理类CommentProxy: 插件可继承该类重写其中的方法,对评论事件进行操作,内置方法如下:
```java
package com.perfree.plugin.proxy;

import com.perfree.commons.ResponseBean;
import com.perfree.model.Comment;

/**
 * 评论代理: 插件可继承该类,对评论事件进行操作
 */
public abstract class CommentProxy {

    /**
     * 评论保存之后操作
     * @param comment 评论内容信息对象
     * @return Comment
     */
    public Comment commentSaveAfter(Comment comment) {
        return comment;
    }

    /**
     * 是否允许存库,如允许存库则返回null,反之返回对应的响应信息
     * @param comment 评论内容信息对象
     * @return Comment
     */
    public ResponseBean commentIsSave(Comment comment) {
        return null;
    }

    /**
     * 评论保存之前操作
     * @param comment 评论内容信息对象
     * @return Comment
     */
    public Comment commentSaveBefore(Comment comment) {
        return comment;
    }
}

```
## 附件代理
附件代理类AttachProxy: 插件可继承该类重写其中的方法,对附件上传等事件进行操作,内置方法如下
```java
package com.perfree.plugin.proxy;

import com.perfree.model.Attach;

/**
 * 附件代理: 插件可继承该类,对附件上传等事件进行操作
 */
public abstract class AttachProxy {

    /**
     * 附件存库之前的操作
     * @param attach 附件信息对象
     * @return Comment
     */
    public Attach attachSaveBefore(Attach attach) {
        return attach;
    }

    /**
     * 附件存库之后的操作
     * @param attach 附件信息对象
     * @return Comment
     */
    public Attach attachSaveAfter(Attach attach) {
        return attach;
    }
}

```


> 更多插件代理正在持续增加中...