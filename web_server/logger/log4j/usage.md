# log4j 基本用法

## maven 导入包

```xml
<!-- 使用aliyun镜像 -->
<repositories>
  <repository>
      <id>aliyun</id>
      <name>aliyun</name>
      <url>http://maven.aliyun.com/nexus/content/groups/public</url>
  </repository>
</repositories>

<dependencies>
    <dependency>  
        <groupId>org.apache.logging.log4j</groupId>  
        <artifactId>log4j-api</artifactId>  
        <version>${log4j.version}</version>  
    </dependency>  
    <dependency>  
        <groupId>org.apache.logging.log4j</groupId>  
        <artifactId>log4j-core</artifactId>  
        <version>${log4j.version}</version>  
    </dependency>  
</dependencies>
```
