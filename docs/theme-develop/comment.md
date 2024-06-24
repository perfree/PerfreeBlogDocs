---
title: 主题开发-评论插件
---
## 简介
为了更方便的进行主题开发,特地提供了简单快捷的评论插件供主题开发者使用,您也可以参考此插件自定义开发您自己的评论插件

## 使用方法
在使用时,需要引入提供的js/css资源,之后可参照下方提供的案例进行使用
```html
<link href="/static/public/libs/perfree-comment/perfree-comment.css" rel="stylesheet">
<script src="/static/public/libs/perfree-comment/perfree-comment.js"></script>
```

### 案例一: 显示评论框及评论列表
```html
<div class="perfree-comment" data-article-id="1"></div>
```

### 案例二: 不显示评论列表
```html
<div class="perfree-comment" data-article-id="1" data-show-comment-list="false"></div>
```

### 案例三: 不显示评论框
```html
<div class="perfree-comment" data-article-id="1" data-show-comment="false"></div>
```

### 案例四: 指定容器加载评论
```html
<div id="comment-custom" data-article-id="1"></div>
<script>
    let comment = new perfreeComment();
    comment.customInit($('#comment-custom'));
</script>
```