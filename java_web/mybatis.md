# mybatis 使用

## 配置文件

- 配置文件需要放置在 classpath 比较好
- 元素类型为 "configuration" 的内容必须匹配 "(properties?,settings?,typeAliases?,typeHandlers?,objectFactory?,objectWrapperFactory?,plugins?,environments?,databaseIdProvider?,mappers?)
- 暂定目录结构
- org.mytabis
- mytabis-config.xml
- map
  - map.xml
  - 各种映射文件

```xml
<!-- mytabis-config.xml -->
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
  PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
  "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
	<typeAliases>
		<package name="com.wholler.dk.model" />
	</typeAliases>
	<environments default="development">
		<environment id="development">
			<transactionManager type="JDBC" />
			<dataSource type="POOLED">
				<property name="driver" value="com.mysql.jdbc.Driver" />
				<property name="url" value="jdbc:mysql://localhost:3306/di" />
				<property name="username" value="ltww" />
				<property name="password" value="123456wf" />
			</dataSource>
		</environment>
	</environments>
	<mappers>
		<mapper resource="org/mybatis/map/UserMapper.xml" />
	</mappers>
</configuration>

<!-- map -->
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
  PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
  "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="org.mybatis.map.UserMapper">
  <select id="selectUser" resultType="User">
    select * from user where id = #{id}
  </select>
</mapper>
```

## 注意点

- 如果使用包作为 map 的值，如果没有配置注解，默认别名为类名的小写
