---
title: 主题开发-自定义指令
---
## 介绍
自定义指令,使用方法类似于`#for #end`,如标识了不需要end结束符,则为`#mdToHtml()`
名称|是否需要end结束符|可用页面|描述
- | - | - | - 
articlePage|是|任意|获取文章列表(分页)
archivePage|是|任意|获取文章归档列表(分页)
categories|是|任意|获取所有分类
commentPage|是|文章页(article.html)或自定义页面|获取评论列表(分页)
hotArticle|是|任意|获取N条热门文章
hotTag|是|任意|获取N条热门标签 
latestArticle|是|任意|获取N条最新文章
linkPage|是|任意|获取友链列表(分页)
mdSummary|否|任意|获取指定文章指定长度简介
mdToHtml|否|任意|markdown转html
menus|是|任意|获取所有菜单
nextArticle|是|文章页(article.html)|获取下一篇文章
preArticle|是|文章页(article.html)|获取上一篇文章
option|否|任意|获取任意配置项
pageRender|否|任意,需配合articlePage等带page的分页列表指令|根据分页信息自动渲染分页html
statistics|是|任意|获取文章,标签分类等统计信息
timeAgo|否|任意|根据日期获取人性化时间,如1小时前
articleImage|是|任意|根据文章内容获取文章内图片
recentComment|是|任意|获取最新回复
subStr|否|任意|截取字符串
pages|是|任意|获取所有自定义页面
categoriesPage|是|任意|获取分类列表(分页)
tagsPage|是|任意|获取标签列表(分页)
plugins|是|任意|获取所有插件
journalPage|是|任意|获取动态列表(分页)
## articlePage
该指令用于获取文章分页列表,参数pageSize为每页多少条
```html
#articlePage(pageSize=5)
#end
```
属性说明
名称|类型|描述
---|:--:|---:
articlePage.data|集合List|文章列表数据
articlePage.pagers|集合List|分页数据
示例:
```html
#articlePage(pageSize=5)
    #for(article: articlePage.data)
        <div class="article-box">
            <h2 class="article-title">
                <a href="#(article.url)">#(article.title)</a>
            </h2>
            <div class="article-info">
                <span>作者:#(article.user.userName ??)</span>
                <span>时间:#date(article.createTime, "yyyy-MM-dd")</span>
                <span>浏览:#(article.viewCount ??)</span>
                <span>评论:#(article.commentCount ??)</span>
            </div>
            <div class="article-content">
                #mdSummary(article.content,200)...
            </div>
        </div>
    #else
        暂无文章
    #end

    #pageRender(articlePage, preText="上一页",nextText="下一页")
#end
```
## archivePage
文章归档列表数据分页,参数pageSize为每页多少条
```html
#archivePage(pageSize=12)
#end
```
属性说明
名称|类型|描述
---|:--:|---:
archivePage.data|集合List|文章列表数据
archivePage.pagers|集合List|分页数据
示例:
```html
#archivePage(pageSize=12)
    #for(archive: archivePage.data)
        #for(archiveArticle: archive.articles)
            <a href="#(archiveArticle.url)" class="m-archive-link">
                #date(archiveArticle.createTime, "MM/dd")：&nbsp;#(archiveArticle.title)
            </a>
        #end
    #else
        暂无文章
    #end
    #pageRender(archivePage, preText="上一页",nextText="下一页")
#end
```
## categories
获取所有分类
```html
 #categories()
 #end
```
示例:
```html
#categories()
    #for(category: categories)
        <dd lay-unselect>
            <a href="#(category.url)">
                #(category.name ??)
                <span class="empty"></span>
                <span class="layui-badge-rim">#(category.count ??)</span>
            </a>
        </dd>
    #end
#end
```
## commentPage
获取评论列表分页数据,该指令只能在文章页(article.html)或自定义页面使用,参数pageSize为每页多少条
```html
#commentPage(pageSize=6)
#end
```
属性说明
名称|类型|描述
---|:--:|---:
commentPage.data|集合List|评论列表数据
commentPage.pagers|集合List|分页数据
示例:
```html
#commentPage(pageSize=6)
     #for(comment : commentPage.data)
        #for(comment : commentPage.data)
        #end
     #else
        暂无评论
     #end
    #pageRender(commentPage, anchor="#commentList",preText="上一页",nextText="下一页")
#end
```
> 引入评论的话建议使用提供的评论js插件 

## hotArticle
获取热门文章参数count获取多少条,type热门文章类型0按照评论数,1按照浏览量
```html
#hotArticle(count=10,type=0)
#end
```
示例
```html
 #hotArticle(count=10,type=0)
    #for(article : articles)
        <li class="m-right-article">
            <a href="#(article.url)">#(article.title)</a>
        </li>
    #else
        暂无文章
    #end
#end
```
## hotTag
获取热门标签,参数count获取多少条
```html
#hotTag(count=10)
#end
```
示例
```html
#hotTag(count=10)
    #for(tag : tags)
        <a href="#(tag.url)" class="m-right-tag" title="共#(tag.articleCount ??)篇文章">#(tag.name)</a>
    #end
#end
```
## latestArticle
获取最新文章,参数count获取多少条
```html
#latestArticle(count=10)
#end
```
示例:
```html
#latestArticle(count=10)
    #for(article : articles)
        <li class="m-right-article">
            <a href="#(article.url)">#(article.title)</a>
        </li>
    #else
        暂无文章
    #end
#end
```
## linkPage
获取友链分页列表数据,参数pageSize为每页多少条
```html
#linkPage(pageSize=12)
#end
```
属性说明
名称|类型|描述
---|:--:|---:
linkPage.data|集合List|文章列表数据
linkPage.pagers|集合List|分页数据
示例:
```html
#linkPage(pageSize=12)
    #for(link: linkPage.data)
    #else
        暂无数据
    #end
    #pageRender(linkPage, preText="上一页",nextText="下一页")
#end
```
## mdSummary
获取指定文章指定长度简介,需要传入文章内容和获取简介的长度
```html
#mdSummary(article.content,200)
```
## mdToHtml
将markdown转为html,需要传入markdown内容
```html
#mdToHtml(article.content ??)
```
## menus
获取菜单列表
```html
#menus()
    #for(menu : menus)
        <li class="layui-nav-item">
            <a href="#(menu.url ??)"><i class="fa #(menu.icon ??)"></i> #(menu.name ??)</a>
        </li>
        #if(menu.childMenu && menu.childMenu)
            #for(childMenu: menu.childMenu)
                子菜单
            #end
        #end
    #end
#end
```
## nextArticle
获取下一篇文章,该指令需要在文章页使用
```html
#nextArticle()
    #if(nextArticle)
        <a class="a-next-article" href="#(nextArticle.url)" title="#(nextArticle.title)">下一篇 <i class="fa fa-angle-right"></i></a>
    #end
#end
```
## preArticle
获取上一篇文章,该指令需要在文章页使用
```html
 #preArticle()
    #if(preArticle)
        <a class="a-pre-article" href="#(preArticle.url)" title="#(preArticle.title)">
                <i class="fa fa-angle-left"></i> 上一篇
        </a>
    #end
#end
```
## option
用于读取指定的配置信息,可配合主题setting.html实现自由配置网站,setting.html保存option,前台读取option,该指令需要传入需要读取的key以及默认值
```html
#option('WEB_NAME','未设置')
```
## pageRender
用于分页渲染,在前边几个分页列表指令中已经演示了怎么使用,这里描述下具体的参数
```html
 #pageRender(articlePage, preText="上一页",nextText="下一页")
```
第一个参数为当前分页指令数据,preText为上一页的文字,nextText为下一页的文字,另外还有一些可选参数,如下
```
pagerBoxClass: 渲染出来的分页html的盒子css类名
pagerClass: 页码的css类名
pagerDisabledClass: 禁用样式的css类名
pagerActiveClass: 激活样式的css类名
```
## statistics
用于获取统计信息
```html
 #statistics()
    <div class="m-info-other">
        <span>文章</span>
        <span>#(statistics.articleCount)篇</span>
    </div>
    <div class="m-info-other">
        <span>评论</span>
        <span>#(statistics.commentCount)条</span>
    </div>
    <div class="m-info-other">
        <span>标签</span>
        <span>#(statistics.tagCount)个</span>
    </div>
#end
```
## timeAgo
获取人性化时间,如两小时前,一天前等
```html
#timeAgo(comment.createTime)
```

## articleImage
获取文章内所有图片
```html
#articleImage(article.content ??)
    #for(image: images)
    <a class="f-article-list-thumbnail">
        <img src="#(image)">
    </a>
#end
```
## recentComment
获取最新回复
```html
#recentComment(count=5)
    #if(comments.size() > 0)
        <div class="f-side-new-comment">
            <div class="f-new-comment-title">
                <i class="iconfont icon-pinglun"></i>
                <span>最新回复</span>
            </div>
            <ul>
                #for(comment : comments)
                    <li>
                        <div class="f-user-box">
                            <img src="/static/themes/fly/static/images/lazyload.jpg" class="lazyload" data-src="#(isBlank(comment.avatar) ? '/static/public/images/user.png' : comment.avatar)">
                            <div class="f-user-info">
                                <div class="f-user-info-name">#(comment.userName??)</div>
                                <span class="f-user-info-time">#timeAgo(comment.createTime)</span>
                            </div>
                        </div>
                        <div class="f-comment-msg">
                            <a href="#(comment.article.url??)#comment-#(comment.id??)">#(comment.content ??)</a>
                        </div>
                    </li>
                #end
            </ul>
        </div>
    #end
#end
```

## subStr
截取字符串
```html
#subStr(link.name, 20)
```

## pages
获取所有自定义页面
```html
 #pages()
 #end
```
示例:
```html
#pages()
    #for(page: pages)
        #(page)
    #end
#end
```
## categoriesPage
获取分类列表分页
```html
#categoriesPage(pageSize=5)
#end
```
示例:
```html
#categoriesPage(pageSize=5)
    #for(category: categoriesPage.data)
        #(category.name)
    #else
        暂无分类
    #end

    #pageRender(categoriesPage, preText="上一页",nextText="下一页")
#end
```
## tagsPage
获取标签列表分页
```html
#tagsPage(pageSize=5)
#end
```
示例:
```html
#tagsPage(pageSize=5)
    #for(tag: tagsPage.data)
        #(tag.name)
    #else
        暂无分类
    #end

    #pageRender(tagsPage, preText="上一页",nextText="下一页")
#end
```

## plugins
获取所有插件
```html
 #plugins()
 #end
```
示例:
```html
#plugins()
    #for(plugin: plugins)
        #(plugin)
    #end
#end
```

## journalPage
该指令用于获取动态分页列表,参数pageSize为每页多少条
```html
#journalPage(pageSize=5)
#end
```
属性说明
名称|类型|描述
---|:--:|---:
journalPage.data|集合List|文章列表数据
journalPage.pagers|集合List|分页数据
示例:
```html
#journalPage(pageSize=5)
    #for(article: journalPage.data)
        <div class="article-box">
             #mdToHtml(article.content ??)
        </div>
    #else
        暂无文章
    #end

    #pageRender(journalPage, preText="上一页",nextText="下一页")
#end
```