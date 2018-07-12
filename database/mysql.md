# msyql

## 账号密码

修改账号密码，默认密码是否为空？对于新安装的 mysql，需要删除系统默认的空账户，保证数据库的安全，删除之后需要重启 mysql 的服务，才能完成。添加新账号也需要重启服务才能生效。而且生辰密码需要用到 password('password');用常规的 mysql 语法去更新用户表，需要重启服务才能生效，而用下面的语句则不需要--。应该是内部缓存的问题。

```java
mysql -u root// 登录
set password for 'root'@'localhost'=password('password')

//  删除账号
show databases;
use mysql;
select * from user ;  //  查看系统中的账户
delete from user where password=''; // 删除系统账户中密码为空的用户
```

如果是忘记了 root 的密码

1.  关闭正在运行的 MySQL 服务。
2.  打开 DOS 窗口，转到 mysql\bin 目录。
3.  输入 mysqld --skip-grant-tables 回车。--skip-grant-tables 的意思是启动 MySQL 服务的时候跳过权限表认证。
    1.  mysqld --defaults-file="C:\ProgramData\MySQL\MySQL Server 5.7\my.ini" --skip-grant-tables
    2.  配置文件可能和安装目录不在同一个文件夹内，需要全局查找
4.  再开一个 DOS 窗口（因为刚才那个 DOS 窗口已经不能动了），转到 mysql\bin 目录。
5.  输入 mysql 回车，如果成功，将出现 MySQL 提示符 >。
6.  连接权限数据库： use mysql; 。
7.  改密码：update user set password=password("password") where user="root";（别忘了最后加分号）| update user set authentication_string=password('newpassword') where user='root';
8.  刷新权限（必须步骤）：flush privileges;　。
9.  退出 quit。
10. 注销系统，再进入，使用用户名 root 和刚才设置的新密码登录。

## 定义语句

```sql
-- 创建用户 localhost 表示本机 %表示任何域名
create user 'test'@'localhost' identified by '123456';
--给用户创建数据库
create database test;
--给用户授权制定数据库 全部数据库 *.*
grant all privileges on database.* to 'username'@'localhost' identified by 'password';
--部分授权
grant select,update privileges on database.* to 'username'@localhost identified by 'password';

--删除用户
Delete FROM user Where User='test' and Host='localhost';
flush privileges;
--删除用户的数据库
drop database testDB;
--删除权限
drop user 用户名@'%';
drop user 用户名@ localhost;
```

## 操作语句

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
<sql>create table tableName (columnName dataType (auto_increment [primary key]),,[primary key(columnname)])</sql>
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

## 视图

一个虚拟表，没有正式存在，不能做操作，除非是一对一的表。当查询语句国语复杂，又在多出有引用，则可以考虑使用视图来简化操作。

```java
//  创建视图
create view viewName sql statement

//  使用视图
select * from viewName;
```

## 锁

### 事务

#### 基本要素

ACID

- A (原子性- Atomicity)
  - 一次事务要么全部成功，要么全部失败
- C （一致性- Consistency）
  - 事务的开始和结束，数据库的结构没有被破坏
- I （隔离性- Isolation）
  - 同一时间，只允许一个失误操作一条数据，对于数据 D，当 A 事务对其操作的时候，B 事务不能对其操作。
- D （持久性- Durability）
  - 事务操作完成之后，数据保存到数据库，没有回滚操作。

### 事务并发产生的问题

可能是事务不会锁表的问题导致的，可能产生几个问题。脏读，幻读，不可重复读等问题。

- 脏读
  - 事务 A 更新了数据，然后事务 B 读取更新之后的数据，之后事务 A 回滚，导致事务 B 读取的是假的数值，不是当前数据库存在的数值，称为脏读
- 幻读
  - 在操作数据库的时候，事务 B 插入一条和事务 A 不一致的数据，当事务 A 再次读取数据的时候，出现数据不一致的问题。主要针对对数据的插入和产出操作。
- 不可重复读
  - 事务 A 多次读取数据的过程中，事务 B 对数据做出了修改，导致事务 A 多次读取数据不一致的情况出现。主要针对对数据的修改

### 事务的隔离级别

mysql 的默认隔离级别为可重复读

```java
//  查看当前数据库的隔离级别
select @@tx_isolation
//  修改当前的隔级别
set session transaction isolation level read uncommitted

//  开始事务
start transaction
//  提交事务
commit;
//  回滚事务
rollback
```

| 事务的隔离级别               | 脏读 | 幻读 | 不可重复读 |
| ---------------------------- | ---- | ---- | ---------- |
| 读未提交（read uncommitted） | 是   | 是   | 是         |
| 读已提交（read commited）    | 否   | 是   | 是         |
| 可重复读（repeatable read）  | 否   | 否   | 是         |
| 串行化（serializable）       | 否   | 否   | 否         |

#### 读未提交

每个事务某条 sql 语句提交的数据都会在数据库中得到体现，因此当某个事务操作数据之后其他事务读取了操作过的数据，之后该事务由于某种原因发生回滚的时候，导致其他事务读取的数据的脏值。

- 事务 A 修改了数据没有提交，事务 B 查询到了数据并且在程序中缓存了数据，然后事务 A 回滚会最初值。事务 B 还在用事务 A 更新之后的值。（脏读）
- 事务 A 更新了数据没有提交，事务 B 读取了数据，之后事务 A 再次更新数据，事务 B 再次读取数据，两次读取的数据不一致。（不可重复读）
- 事务 A 读取数据没结果没有提交，事务 B 插入一条新数据，事务 A 再次读取数据，发现新数据。（幻读）

#### 读已提交

每个事务色 sql 语句操作的变化都是实时的发生在数据库里面的，丙炔最后的提交了事务。这里不会发生脏读，因为事务 A 是提交了所在事务的所有。导致数据没有失真。

- 事务 A 更新了数据没有提交，事务 B 读取了数据，做出修改，事务 A 提交事务，事务 B 提交事务。数据真实存在，不发生脏读。
- 事务 A 读取了数据没有提交，发现没有记录，事务 B 插入一条新数据提交，事务 A 再次读物数据，发现新纪录。（幻读）
- 同上

#### 可重复读

开始事务之后，是不是所在事务会保存一张开始事务时候的快照？每次读取数据都是从这个快照里面的数据中读取，事务之间的操作不会相互干扰。但是当两个事务先后都提交了的话，就会发生冲突，需要怎么去结局？如果是用数据库里面的值做迭代修改，事务之间的修改会相互影响吗？

#### 串行化

是不是锁了整张表？

## 其他

1.  mysql 中默认事务隔离级别是可重复读时并不会锁住读取到的行

2.  事务隔离级别为读提交时，写数据只会锁住相应的行

3.  事务隔离级别为可重复读时，如果有索引（包括主键索引）的时候，以索引列为条件更新数据，会存在间隙锁间隙锁、行锁、下一键锁的问题，从而锁住一些行；如果没有索引，更新数据时会锁住整张表。

4.  事务隔离级别为串行化时，读写数据都会锁住整张表

5.  隔离级别越高，越能保证数据的完整性和一致性，但是对并发性能的影响也越大，鱼和熊掌不可兼得啊。对于多数应用程序，可以优先考虑把数据库系统的隔离级别设为 Read Committed，它能够避免脏读取，而且具有较好的并发性能。尽管它会导致不可重复读、幻读这些并发问题，在可能出现这类问题的个别场合，可以由应用程序采用悲观锁或乐观锁来控制。
