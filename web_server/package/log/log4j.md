# log4j 2

## 资源文件

1. 首先去检查有没有系统设置"log4j.configurationFile"，如果有会首先加载。
2. 如果没有系统设置，会在classpath目录下面找 log4j2-test.properties文件。
3. 如果没有properties配置文件，会在classpath目录下查找 log4j2-test.yaml or log4j2-test.yml 文件。
4. 如果没有yml文件，会在classpath下面找 log4j2-test.json or log4j2-test.jsn文件。
5. 如果没有json文件，会在classpath文件下面找 log4j2-test.xml文件
6. 如果test文件没有找到，会试着去找非test文件- log4j2.properties文件
7. log4j2.yaml or log4j2.yml
8. log4j2.json or log4j2.jsn
9. log4j2.xml
10. 如果以上配置文件都没有找到，会启动默认的配置文件，默认打印在控制台上。
11. 默认的配置文件属性
    + A ConsoleAppender attached to the root logger.
    + A PatternLayout set to the pattern "%d{HH:mm:ss.SSS} [%t] %-5level %logger{36} - %msg%n" attached to the ConsoleAppender
    + Note that by default Log4j assigns the root logger to Level.ERROR.
    + 默认显示的级别是error，error级别一下的不会显示！

## logger级别

从上往下，级别越来越低，在配置文件定义级别之上的都会显示

1. FATAL
2. ERROR
3. WARN
4. INFO
5. DEBUG
6. TRACE

## 简单实用

> 定义一个静态的logger

```java  {.line-numbers}
public class MyApp {
 
    // Define a static logger variable so that it references the
    // Logger instance named "MyApp".
    private static final Logger logger = LogManager.getLogger(MyApp.class);
 
    public static void main(final String... args) {
 
        // Set up a simple configuration that logs on the console.
        //  如果没有找到配置文件，使用默认的配置的话，下面只会输出error级别的日志。
        logger.trace("Entering application.");
        Bar bar = new Bar();
        if (!bar.doIt()) {
            logger.error("Didn't do it.");
        }
        logger.trace("Exiting application.");
    }
}
```

> 定义一个简单的xml配置

``` xml {.line-numbers}
<?xml version="1.0" encoding="UTF-8"?>
<!-- 根元素 -->
<Configuration status="WARN">
<!--  -->
  <Appenders>
    <Console name="Console" target="SYSTEM_OUT">
    <!-- layout -->
      <PatternLayout pattern="%d{HH:mm:ss.SSS} [%t] %-5level %logger{36} - %msg%n"/>
    </Console>
  </Appenders>
  <!--  -->
  <Loggers>
  <!-- 可以单独配置某个类的显示级别 -->
    <Logger name="com.foo.Bar" level="TRACE"/>
  <!-- level 显示级别？ -->
    <Root level="error">
      <AppenderRef ref="Console"/>
    </Root>
  </Loggers>
</Configuration>

<!-- 配置 -->
<!-- filter表示过滤条件吧？ -->
<?xml version="1.0" encoding="UTF-8"?>;
<Configuration>
  <Properties>
    <Property name="name1">value</property>
    <Property name="name2" value="value2"/>
  </Properties>
  <filter  ... />
  <Appenders>
    <appender ... >
      <filter  ... />
    </appender>
    ...
  </Appenders>
  <Loggers>
    <Logger name="name1">
      <filter  ... />
    </Logger>
    ...
    <Root level="level">
      <AppenderRef ref="name"/>
    </Root>
  </Loggers>
</Configuration>
```

## log4j的几种配置语法

### xml

``` xml {.line-numbers}
<?xml version="1.0" encoding="UTF-8"?>
<Configuration status="debug" strict="true" name="XMLConfigTest"
               packages="org.apache.logging.log4j.test">
  <Properties>
    <Property name="filename">target/test.log</Property>
  </Properties>
  <Filter type="ThresholdFilter" level="trace"/>
 
  <Appenders>
    <Appender type="Console" name="STDOUT">
      <Layout type="PatternLayout" pattern="%m MDC%X%n"/>
      <Filters>
        <Filter type="MarkerFilter" marker="FLOW" onMatch="DENY" onMismatch="NEUTRAL"/>
        <Filter type="MarkerFilter" marker="EXCEPTION" onMatch="DENY" onMismatch="ACCEPT"/>
      </Filters>
    </Appender>
    <Appender type="Console" name="FLOW">
      <Layout type="PatternLayout" pattern="%C{1}.%M %m %ex%n"/><!-- class and line number -->
      <Filters>
        <Filter type="MarkerFilter" marker="FLOW" onMatch="ACCEPT" onMismatch="NEUTRAL"/>
        <Filter type="MarkerFilter" marker="EXCEPTION" onMatch="ACCEPT" onMismatch="DENY"/>
      </Filters>
    </Appender>
    <Appender type="File" name="File" fileName="${filename}">
      <Layout type="PatternLayout">
        <Pattern>%d %p %C{1.} [%t] %m%n</Pattern>
      </Layout>
    </Appender>
  </Appenders>
 
  <Loggers>
    <Logger name="org.apache.logging.log4j.test1" level="debug" additivity="false">
      <Filter type="ThreadContextMapFilter">
        <KeyValuePair key="test" value="123"/>
      </Filter>
      <AppenderRef ref="STDOUT"/>
    </Logger>
 
    <Logger name="org.apache.logging.log4j.test2" level="debug" additivity="false">
      <AppenderRef ref="File"/>
    </Logger>
 
    <Root level="trace">
      <AppenderRef ref="STDOUT"/>
    </Root>
  </Loggers>
 
</Configuration>
```

### json

``` json {.line-numbers}
{ "configuration": { "status": "debug", "name": "RoutingTest",
                      "packages": "org.apache.logging.log4j.test",
      "properties": {
        "property": { "name": "filename",
                      "value" : "target/rolling1/rollingtest-$${sd:type}.log" }
      },
    "ThresholdFilter": { "level": "debug" },
    "appenders": {
      "appender": [
         { "type": "Console", "name": "STDOUT", "PatternLayout": { "pattern": "%m%n" }, "ThresholdFilter": { "level": "debug" }},
         { "type": "Routing",  "name": "Routing",
          "Routes": { "pattern": "$${sd:type}",
            "Route": [
              {
                "RollingFile": {
                  "name": "Rolling-${sd:type}", "fileName": "${filename}",
                  "filePattern": "target/rolling1/test1-${sd:type}.%i.log.gz",
                  "PatternLayout": {"pattern": "%d %p %c{1.} [%t] %m%n"},
                  "SizeBasedTriggeringPolicy": { "size": "500" }
                }
              },
              { "AppenderRef": "STDOUT", "key": "Audit"}
            ]
          }
        }
      ]
    },
    "loggers": {
      "logger": [
        { "name": "EventLogger", "level": "info", "additivity": "false",
          "AppenderRef": { "ref": "Routing" }},
        { "name": "com.foo.bar", "level": "error", "additivity": "false",
          "AppenderRef": { "ref": "STDOUT" }}
      ],
      "root": { "level": "error", "AppenderRef": { "ref": "STDOUT" }}
    }
  }
}
```