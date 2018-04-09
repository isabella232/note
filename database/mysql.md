# msyql

## cli

```xml
<!-- 数据库操作 -->
<!-- 显示数据库 -->
<sql>show databases</sql>
<!-- 新增数据表 -->
<sql>create database name</sql>
<!-- 切换数据库 -->
<sql>use database name</sql>
<!-- 删除数据库 -->
<sql>drop database name</sql>


<!-- 数据表 -->
<!-- 判断数据表存在与否 -->
<sql>drop table if exits tableName</sql>
<!-- 新增数据表 -->
<sql>create table tableName (columnName dataType (auto_increament primary key))</sql>
<!-- 删除数据表 -->
<sql>drop table tableName</sql>
<!-- 插入数据 -->
<!-- 如果省略行，则按照数据表定义的顺序，如果是数据格式不对，则插入失败 -->
<sql>insert into tableName (column1,column2...)values(value1,value2),(value1,value2)</sql>
<!-- 查询数据-->
<sql>select * from tableName where columnName='condition'</sql>
<!--  模糊查询 -->
<sql>select * from tableName where  columnName like'%keywords'</sql>
<!-- 更新数据 -->
<sql>update tableName set columnName='value' where columnName='condition'</sql>
<!-- 删除数据 如果条件为空 删除整个数据表内容 -->
<sql>delete from tableName where columnName='condition'</sql>
```
