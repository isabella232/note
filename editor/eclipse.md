# eclipse 常见的问题

## 快捷键

- import 包
  - ctrl+shift+o
- override
  - ctrl+o
- 查看接口实现类
  - 选中类，然后 ctrl+t
- xml 查看属性
  - alt+/
- 返回贯标上一个位置 - alt+键盘左键

## 配置 tomcat

tomcat 的配置步骤

- preferences->service->runtime-envioronments->add tomcat-service
- 404 error
  - 默认的访问路径是 eclipse 的 webapps 文件
  - 编辑 service
  - 删除原始 tomcat 里面 webapps 的文件
  - 更改 eslipse 里面 setvice 的路劲映射
  - 修改完之后恢复 tomcat 里面的文件，重启服务器

## source not found

当查看源码的时候，出现 source 的问题。可能是反编译的问题，参考网上的方法如下：

- 下载 jad
  - http://varaneckas.com/jad/
- 下载 jadeclipse 插件
  - http://sourceforge.net/projects/jadclipse/
  - 将下载的插件放在 eclipse 的 plugins 目录下
- 关联 jad 编辑器
  - 下载完关联插件之后，需要配置关联
    - preferences->java->javaClipse
      - 这里设置 jad.exe 所在目录
- 关联源码反编译插件
  - preferences->general->editor->file associatior
    - 设置.class 的默认反编译为 jad
    - 设置.class without source 默认反编译为 jad
- 按照报名显示层级结构
  - window > Navigation > Show View Menu > Package Presentation > Hierachial.

## 关于 Creation of element failed(myEclipse)错误

可能是没有新建 xml 文件

## 变量名称自动加类型的解决方法

> 先找到相关的插件： window -> show view -> plug-ins

找到插件 org.eclipse.jface.text,右键点击,选择 import as Source Project,导入完成后,在你的 workspace 就可以看到这个 project 了

> 修改代码

在 src/org/eclipse/jface/text/contentassist/CompletionProposalPopup.java 文件中,找到这样一行代码
char[] triggers = t.getTriggerCharacter();
if(contains(triggers,key))
在那行 if 判断里面,eclipse 会判断 key(就是你按下的键)是否在 triggers 中,如果是,那就触发下面的第一行提示上屏的代码.所以我们要做的就是把空格和=号排除就可以了:
if(key != '=' && key != 0x20 &&contains(triggers,key)){
.........
}

> .把修改好的 org.eclipse.jface.text 导出

右键点击你的 workspace 里的 org.eclipse.jface.text,选择 export-->Deployable plugins and
fragments, next,destination 选择
archive file，然后 finish.你就可以在 zip 文件里看到生成好的 jar ,用它替换掉 eclipse/plugins 里面的同名 jar 包,就可以了。

## eclipse 默认编码方式是 GBK，修改编码方式 utf-8

- preferences->workspace-text file encoding

## could not create jvm

- 可能是 jdk 的版本和 eclipse 不支持，需要查看官方的通告

## maven 项目报错

> 没有 web.xml 文件

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

这是由于你的 Maven 编译级别是 jdk1.5 或以下，而你导入了 jdk1.6 以上的依赖包。解决办法：使用 maven-compiler-plugin 将 maven 编译级别改为 jdk1.6 以上,update maven：

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

## 快速生成 java bean 的 getter setter 方法

方法 1：

- 定义 Class 的私有属性和无参构造器
- 在源文件右键-source-generate getter and setter

## Cannot detect Web Project version. Please specify version of Web Project through Maven project property <webVersion>.

需要指定 war 的 maven 编译包

```xml
<build>
		<plugins>
			<plugin>
				<artifactId>maven-compiler-plugin</artifactId>
				<configuration>
					<source>1.7</source>
					<target>1.7</target>
				</configuration>
			</plugin>
			<plugin>
				<artifactId>maven-war-plugin</artifactId>
				<version>2.4</version>
				<configuration>
					<version>3.0</version>
					<failOnMissingWebXml>false</failOnMissingWebXml>
				</configuration>
			</plugin>

		</plugins>
	</build>
```
