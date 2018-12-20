# servlet

Servlet 运行于支持 Java 的应用服务器中（tomcat）。从原理上讲，Servlet 可以响应任何类型的请求，但绝大多数情况下 Servlet 只用来扩展基于 HTTP 协议的 Web 服务器。实现一个 servlet 一般可以通过三种方式：

1.  实现 Servlet 接口
1.  继承 GenericServlet 类
1.  继承 HttpServlet 类其中以继承 HttpServlet 类最常见，因为它提供了常用的 http 请求方法，如 doGet，doPost 等方法。创建一个 tomcat 容器的 servlet 应用如下：
1.  创建一个工程目录
1.  创建一个 Servlet 类
1.  编译 Servlet 类
1.  创建一个部署服务
1.  启动服务器并且部署项目
1.  访问该 Servlet
    servlet 实例的距离工作流程：
1.  如果是第一次访问 servlet 实例

- 加载 servlet 类
- 实例化该类
- 调用 init()方法，并且把 servletConfig 对象作为参数传进去

2.  如果不是第一次访问
1.  直接调用 servlet 的 service 方法，并且把组装好的 request 对象和 response 对象作为参数传进去

## 注意点

1.  要是 xml 和注解都配置了，会优先使用注解的配置
2.  url 大小写的问题--会区分

## 问题

- 不知道为什么在 web.xml 里面配置 servlet 出现 404，用注解就可以。 ------2018-04-26
- 在浏览器里面执行 get 方法 会调用两次 servlet 一次是 option 请求一次是其他 get，post 请求--，尝试用其他调试工具--postman 谷歌扩展工具
- mysql The server time zone value 异常

> url=jdbc:mysql://localhost:3306/test?useUnicode=true$characterEncoding=utf8
> 改为
> url=jdbc:mysql://localhost:3306/test?serverTimezone=UTC

- Java 连接 Mysql 数据库警告：Establishing SSL connection without server's identity verification is not recommend

> 原因是 MySQL 在高版本需要指明是否进行 SSL
> 连接在 mysql 连接字符串 url 中加入 ssl=true 或者 false 即可，如下所示。
> url=jdbc:mysql://127.0.0.1:3306/framework?characterEncoding=utf8&useSSL=true

## servlet 的生命周期

- 加载 servlet 的 class
- 实例化 servlet
- 初始化 serclet
- 每次请求过来都会执行 service 方法
- 销毁的时候执行 destroy 方法

## web.xml 文件

### welcome-file-list 标签

是 web-app 的子元素，它的直接子元素是 welcome-file 用来定义应用首页的（如果我们没有指定的访问资源）,如果没有指定该资源，则首页显示 404

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

## exlipse 部署 servlet（不用 maven 部署）

### 需要先配置 tomcat

- 打开 servers 的 tab 栏目
- 配置 tomcat 的静态文件的映射位置，默认映射位置是 eclipse 的内置文件，可以把映射位置配到 tomcat 的 webapp 目录下，配置完成开启服务器即可

### 配置 servlet

- 加载依赖包。
  - 右键项目
  - build path-config path- add external jars
- 新建一个 servlet
  - 右键 java resources-new servlet

### 初始化参数

> init-param 作为 servlet 的直接子元素，可以设置针对 servlet 的初始化参数，获取 ServletConfig，getServletConfig()

```xml
<servlet>
  <init-param>
    <param-name></param-name>
    <param-value></param-value>
  </init-param>
</servlet>
```

> context-param 作为整个 application 的 context 上下文，里面的参数对所有 servlet 实例共享，是 web-app 的直接子元素.获取，getServletContext()

```xml
  <context-param>
    <param-name></param-name>
    <param-value></param-value>
  </context-param>
```

## session 追踪

http 的连接无状态性，因此无法识别请求的用户。

- cookies
  - g 给 response 写 cookies，下次请求会自动带上 cookie，可以根据嗯哈这个来识别用户
- hidden input
  - 在页面设置一个隐藏域，每次提交请求带上隐藏域的值
- url 重写
  - 在 url 后面接上识别字符，然后在连接页面取出
- httpSession
  - 在服务器生成

## 配置 json

- 导入 json 解析包
  - fastjson
- 这只 content-type
  - application/json
- 设置 encode-type
  - utf-8

## 配置数据库驱动

- 去数据库官网下载对应的驱动
- 把驱动导入到包里即可
