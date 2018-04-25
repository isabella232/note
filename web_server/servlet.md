# servlet

Servlet运行于支持Java的应用服务器中（tomcat）。从原理上讲，Servlet可以响应任何类型的请求，但绝大多数情况下Servlet只用来扩展基于HTTP协议的Web服务器。
实现一个servlet一般可以通过三种方式：
1. 实现Servlet接口
1. 继承GenericServlet类
1. 继承HttpServlet类
其中以继承HttpServlet类最常见，因为它提供了常用的http请求方法，如doGet，doPost等方法。
创建一个tomcat容器的servlet应用如下：
1. 创建一个工程目录
1. 创建一个Servlet类
1. 编译Servlet类
1. 创建一个部署服务
1. 启动服务器并且部署项目
1. 访问该Servlet
servlet实例的距离工作流程：
1. 如果是第一次访问servlet实例
  + 加载servlet类
  + 实例化该类
  + 调用init()方法，并且把servletConfig对象作为参数传进去
2. 如果不是第一次访问
  1. 直接调用servlet的service方法，并且把组装好的request对象和response对象作为参数传进去

## servlet的生命周期

+ 加载servlet的class
+ 实例化servlet
+ 初始化serclet
+ 每次请求过来都会执行service方法
+ 销毁的时候执行destroy方法

## web.xml文件

### welcome-file-list标签

是web-app的子元素，它的直接子元素是welcome-file用来定义应用首页的（如果我们没有指定的访问资源）,如果没有指定该资源，则首页显示404
```xml
<web-app>
  <welcome-file-list>
    <welcome-file>index.html</welcome-file>
    <welcome-file>index.jsp</welcome-file>
  </welcome-file-list>

  <servlet>  
    <servlet-name>servlet1</servlet-name>  
    <servlet-class>com.javatpoint.FirstServlet</servlet-class>  
    <!-- 预加载 部署的时候直接加载的servlet 大小为加载顺序 -->
    <load-on-startup>0</load-on-startup>  
  </servlet> 
</web-app>

```

## exlipse部署servlet（不用maven部署）

### 需要先配置tomcat

+ 打开servers的tab栏目
+ 配置tomcat的静态文件的映射位置，默认映射位置是eclipse的内置文件，可以把映射位置配到tomcat的webapp目录下，配置完成开启服务器即可

### 配置servlet

+ 加载依赖包。
  + 右键项目
  + build path-config path- add external jars
+ 新建一个servlet
  + 右键 java resources-new servlet

### 初始化参数

> init-param作为servlet的直接子元素，可以设置针对servlet的初始化参数，获取ServletConfig，getServletConfig()
```xml
<servlet>
  <init-param>
    <param-name></param-name>
    <param-value></param-value>
  </init-param>
</servlet>
```

> context-param作为整个application的context上下文，里面的参数对所有servlet实例共享，是web-app的直接子元素.获取，getServletContext()
```xml
  <context-param>
    <param-name></param-name>
    <param-value></param-value>
  </context-param>
```

## session追踪

http的连接无状态性，因此无法识别请求的用户。
+ cookies
  + g给response写cookies，下次请求会自动带上cookie，可以根据嗯哈这个来识别用户
+ hidden input
  + 在页面设置一个隐藏域，每次提交请求带上隐藏域的值
+ url重写 
  + 在url后面接上识别字符，然后在连接页面取出
+ httpSession
  + 在服务器生成

## 配置json

+ 导入json解析包
  + fastjson 
+ 这只content-type 
  + application/json
+ 设置encode-type
  + utf-8

## 配置数据库驱动

+ 去数据库官网下载对应的驱动
+ 把驱动导入到包里即可