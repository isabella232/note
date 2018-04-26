# eclipse常见的问题

##  source not found

当查看源码的时候，出现source的问题。可能是反编译的问题，参考网上的方法如下：
+ 下载jad
  + http://varaneckas.com/jad/
+ 下载jadeclipse插件
  + http://sourceforge.net/projects/jadclipse/
  + 将下载的插件放在eclipse的plugins目录下
+ 关联jad编辑器
  + 下载完关联插件之后，需要配置关联
    + preferences->java->javaClipse
      + 这里设置jad.exe所在目录
+ 关联源码反编译插件
  + preferences->general->editor->file associatior
    + 设置.class的默认反编译为jad
    + 设置.class without source默认反编译为jad

## 快捷键

+ import包
  + ctrl+shift+o
+ override
  + ctrl+o

## eclipse默认编码方式是GBK，修改编码方式utf-8

+ preferences->workspace-text file encoding

## could not create jvm

+ 可能是jdk的版本和eclipse不支持，需要查看官方的通告

## maven项目报错

> 没有web.xml文件

```xml
<!-- 创建web.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<web-app
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xmlns="http://java.sun.com/xml/ns/javaee"
	xsi:schemaLocation="http://java.sun.com/xml/ns/javaee http://java.sun.com/xml/ns/javaee/web-app_3_0.xsd"
	id="WebApp_ID"
	version="3.0">
</web-app>
<!-- 在pom.xml文件里面加入 -->
	<build>
		<plugins>
			<plugin>
				<groupId>org.apache.maven.plugins</groupId>
				<artifactId>maven-war-plugin</artifactId>
				<version>2.6</version>
				<configuration>
					<failOnMissingWebXml>false</failOnMissingWebXml>
				</configuration>
			</plugin>
		</plugins>
	</build>
<!--项目右键 update maven -->
```

## Eclipse Maven 编译错误 Dynamic Web Module 3.0 requires Java 1.6 or newer 解决方案

这是由于你的 Maven 编译级别是 jdk1.5 或以下，而你导入了 jdk1.6 以上的依赖包。
解决办法：
使用 maven-compiler-plugin 将 maven 编译级别改为 jdk1.6 以上,update maven：
```xml
<build>  
    <plugins>  
        <!-- define the project compile level -->  
        <plugin>  
            <groupId>org.apache.maven.plugins</groupId>  
            <artifactId>maven-compiler-plugin</artifactId>  
            <version>2.3.2</version>  
            <configuration>  
                <source>1.7</source>  
                <target>1.7</target>  
            </configuration>  
        </plugin>  
    </plugins>  
</build>  
```