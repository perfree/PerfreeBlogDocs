---
title: 主题开发-共享方法
---
## 介绍
共享方法可以在任意页面进行使用,简单的来说就是系统提供的一系列开放给模板使用的java方法,使用方法为`#(方法名(参数))`,比如现在有一个option方法,java代码如下:
```java
    /**
     * @description 根据key获取字典值
     * @param key  key
     * @return java.lang.String
     * @author Perfree
     */
    public String option(String key) {
        String value = OptionCacheUtil.getValue(key);
        if (StringUtils.isBlank(value)) {
            return null;
        }
        return value;
    }
```
那么对应的使用方法就是:
```bash
#(option("xxxx"))
```
## 方法汇总
目前项目内置共享了两个类TplMethodShared及StrUtil,其中StrUtil为hutool的字符串工具类,可进行一系列的字符串操作如判空/截取等,您可参考hutool的官方文档进行查看,TplMethodShared目前内置了两个方法,如下:
```bash
# 根据key获取字典值
String option(String key)
# 传入字典key和要比较的值进行比对字典值
boolean optionCompare(String key, String compareValue)
# 传入插件ID,判断插件是否启动
boolean pluginIsStart(String pluginId)
```