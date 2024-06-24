---
title: 插件开发-新建插件
---
# 新建插件
开发新的插件时,我们需要在perfree-plugins模块下新增插件子模块,以idea为例,右键perfree-plugins=>new=>module,如图:


![目录](/assets/plugin/newModule.jpg)

选择maven模块,点击下一步:

![目录](/assets/plugin/maven.jpg)

输入插件名称,注意插件名称必须唯一,否则会安装失败:


![目录](/assets/plugin/pluginName.jpg)

创建完成后,插件模块的pom.xml如下:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <parent>
        <artifactId>perfree-plugins</artifactId>
        <groupId>com.perfree</groupId>
        <version>1.0.0</version>
    </parent>
    <modelVersion>4.0.0</modelVersion>

    <artifactId>plugin-test</artifactId>

    <properties>
        <maven.compiler.source>8</maven.compiler.source>
        <maven.compiler.target>8</maven.compiler.target>
    </properties>

</project>
```

接下来我们需要修改pom.xml文件,修改后的pom.xml应该如下:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <parent>
        <artifactId>perfree-plugins</artifactId>
        <groupId>com.perfree</groupId>
        <version>1.0.0</version>
    </parent>
    <modelVersion>4.0.0</modelVersion>
    <version>1.0.0</version>
    <groupId>com.perfree</groupId>
    <artifactId>plugin-test</artifactId>

    <dependencies>
        <dependency>
            <groupId>com.perfree</groupId>
            <artifactId>perfree-core</artifactId>
            <version>1.0.0</version>
            <scope>provided</scope>
        </dependency>
    </dependencies>

    <build>
        <plugins>

            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <version>${maven-compiler-plugin.version}</version>
                <configuration>
                    <source>1.8</source>
                    <target>1.8</target>
                    <encoding>UTF-8</encoding>
                </configuration>
            </plugin>

            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-assembly-plugin</artifactId>
                <version>3.1.1</version>
                <configuration>
                    <descriptorRefs>
                        <descriptorRef>jar-with-dependencies</descriptorRef>
                    </descriptorRefs>
                    <appendAssemblyId>false</appendAssemblyId>
                    <archive>
                        <manifest>
                            <addDefaultImplementationEntries>true</addDefaultImplementationEntries>
                            <addDefaultSpecificationEntries>true</addDefaultSpecificationEntries>
                        </manifest>
                    </archive>
                </configuration>
                <executions>
                    <execution>
                        <id>make-assembly</id>
                        <phase>package</phase>
                        <goals>
                            <goal>single</goal>
                        </goals>
                    </execution>
                </executions>
            </plugin>
        </plugins>
    </build>

</project>
```

之后在插件的resources目录下新建plugin.properties配置文件,便于程序读取,如没有此文件,在安装时会出错


配置文件格式详解:
```
# 插件id,保持不重复
plugin.id=example-plugin
# 插件的主类地址
plugin.class=com.exam.Plugin
# 插件版本
plugin.version=1.0.0
# 插件所需PerfreeBlog的最低版本
plugin.minimal.version=2.2.0
# 插件所支持的数据库类型,可配置sqlite/mysql,如未配置,则表示全部支持
plugin.database=sqlite,mysql
# 插件作者
plugin.provider=Perfree
# 插件描述
plugin.description=描述
# 插件的mapper文件地址,下边的配置对应的就是resource/exam-mapper中的xml文件
mybatis.mapper.location=classpath:/exam-mapper/*.xml
# 插件的静态资源地址,下边的配置对应的就是resource/exam-static/中的静态文件
static.locations=classpath:/exam-static/
```

接下来创建插件的主类，继承BasePlugin
```java
package com.exam;

import com.perfree.plugin.BasePlugin;
import org.pf4j.PluginWrapper;

/**
 * @description 插件示例: 插件主类
 * @author Perfree
 * @date 2021/11/10 9:54
 */
public class Plugin extends BasePlugin {
    public Plugin(PluginWrapper wrapper) {
        super(wrapper);
    }
}

```

至此,插件的创建工作完毕,接下来就可以开始插件的编码了,以下是插件目录示例


![目录](/assets/plugin/exam.jpg)