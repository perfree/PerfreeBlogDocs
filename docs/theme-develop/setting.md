---
title: 主题开发-主题设置页
---
## 简介
您可在主题根目录创建setting.html,来进行主题设置页的开发,可以很方便的让用户自定义一些功能,比如可以让用户在主题页设置某些内容是否展示/网站的布局等等,下边将介绍设置页的开发案例

## 示例
这是一个简单的主题设置页,可以让用户在主题设置里设置个性签名,当用户在此处设置完毕后,主题就可以通过#option("P_SIGN")或配置项API接口取得用户设置的签名了~
```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>主题设置</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no"/>
    <meta name="renderer" content="webkit"/>
    <meta name="force-rendering" content="webkit"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
    <link rel="stylesheet" href="/static/public/libs/layui-v2.5.6/layui/css/layui.css">
    <link href="/static/public/libs/font-awesome-4.7.0/css/font-awesome.min.css" rel="stylesheet"/>
    <link href="/static/admin/static/css/main.css?v=#(version)" rel="stylesheet"/>
    <link href="/static/themes/perfree/static/css/setting.css?v=#(version)" rel="stylesheet">
</head>
<body class="layui-layout-body">
<div class="p-container">
    <div class="layui-card">
        <div class="layui-card-body">
            <form class="layui-form" action="">
                <div class="layui-form-item">
                    <label class="layui-form-label">个性签名</label>
                    <div class="layui-input-block">
                        <input type="text" value="#option('P_SIGN')" name="P_SIGN" placeholder="个性签名" autocomplete="off" class="layui-input">
                    </div>
                </div>

                <div class="layui-form-item">
                    <div class="layui-input-block">
                        <button class="layui-btn" lay-submit lay-filter="optionForm">保存设置</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>

<script src="/static/public/libs/jquery/jquery-3.5.1.min.js"></script>
<script src="/static/public/libs/layui-v2.5.6/layui/layui.js"></script>
<script src="/static/public/js/main.js?v=#(version)"></script>
<script>
    let layer,form;
    layui.use(['layer','form'], function() {
        layer = layui.layer;
        form = layui.form;
        form.on('submit(optionForm)', function(data){
            $.ajax({
                type: "POST",
                url: "/admin/setting/save",
                contentType:"application/json",
                data: JSON.stringify(data.field),
                success:function(d){
                    if (d.code === 200){
                        parent.layer.msg("保存成功", {icon: 1})
                    } else {
                        layer.msg(d.msg, {icon: 2});
                    }
                },
                error: function (data) {
                    layer.msg("保存失败", {icon: 2});
                }
            });
            return false;
        });
    });
</script>
</body>
</html>
```
## 图片选择
设置页如需进行图片选择,可按照以下方式编写,写完就可以用了~
```html
 <div class="layui-form-item">
    <label class="layui-form-label">选择图片:</label>
    <div class="layui-input-block">
        <div class="layui-input-inline" style="width: calc(100% - 70px);">
            <input type="text" value="#option('DEMO_IMG')" placeholder="选择图片" name="DEMO_IMG" class="layui-input">
        </div>
        <div class="layui-inline" style="left: -11px;">
            <div id="DEMO_IMG" class="p-upload-input-box">
                <i class="fa fa-photo" aria-hidden="true"></i>
            </div>
        </div>
    </div>
</div>
```

## 视频选择
设置页如需进行视频选择,可按照以下方式编写,写完就可以用了~
```html
 <div class="layui-form-item">
    <label class="layui-form-label">选择视频:</label>
    <div class="layui-input-block">
        <div class="layui-input-inline" style="width: calc(100% - 70px);">
            <input type="text" value="#option('DEMO_VIDEO')" placeholder="选择视频" name="DEMO_VIDEO" class="layui-input">
        </div>
        <div class="layui-inline" style="left: -11px;">
            <div id="DEMO_VIDEO" class="p-upload-video-input-box">
                <i class="fa fa-video-camera" aria-hidden="true"></i>
            </div>
        </div>
    </div>
</div>
```

## 附件选择
设置页如需进行附件选择,可按照以下方式编写,写完就可以用了~
```html
<div class="layui-form-item">
    <label class="layui-form-label">选择附件:</label>
    <div class="layui-input-block">
        <div class="layui-input-inline" style="width: calc(100% - 70px);">
            <input type="text" value="#option('DEMO_ATTACH')" placeholder="选择附件" name="DEMO_ATTACH" class="layui-input">
        </div>
        <div class="layui-inline" style="left: -11px;">
            <div id="DEMO_ATTACH" class="p-upload-attach-input-box">
                <i class="fa fa-file" aria-hidden="true"></i>
            </div>
        </div>
    </div>
</div>
```