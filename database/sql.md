# sql 语法

## 执行顺序的问题

```sql
--  mysql的执行顺序
(8)select (9)distinct <select_list>
(1)from <left_table>
(3)<join_type> join <right_table>
(2)on <join_condition>
(4)where <where_condition>
(5)group by <group_by_list>
(6)with [cube|roolup]
(7)having <havind_condition>
(10)order by <order_by_list>
(11)limit <limit_number>
```

> 下面我们来具体分析一下查询处理的每一个阶段

1.  FORM: 首先对 from 子句中的前两个表执行一个笛卡尔乘积，此时生成虚拟表 vt1（选择相对小的表做基础表）
2.  ON: 对虚表 VT1 进行 ON 筛选，只有那些符合<join-condition>的行才会被记录在虚表 VT2 中。
3.  JOIN： 如果指定了 OUTER JOIN（比如 left join、 right join），那么保留表中未匹配的行就会作为外部行添加到虚拟表 VT2 中，产生虚拟表 VT3, 如果 from 子句中包含两个以上的表的话，那么就会对上一个 join 连接产生的结果 VT3 和下一个表重复执行步骤 1~3 这三个步骤，一直到处理完所有的表为止。
4.  WHERE： 对虚拟表 VT3 进行 WHERE 条件过滤。只有符合<where-condition>的记录才会被插入到虚拟表 VT4 中。
5.  GROUP BY: 根据 group by 子句中的列，对 VT4 中的记录进行分组操作，产生 VT5.如果应用了 group by，那么后面的所有步骤都只能得到的 vt5 的列或者是聚合函数（count、sum、avg 等）。原因在于最终的结果集中只为每个组包含一行
6.  CUBE | ROLLUP: 对表 VT5 进行 cube 或者 rollup 操作，产生表 VT6.
7.  HAVING： 对虚拟表 VT6 应用 having 过滤，只有符合<having-condition>的记录才会被 插入到虚拟表 VT7 中。对分组数据捷星逻辑操作，HAVING 语法与 WHERE 语法类似，但 HAVING 可以包含聚合函数。
8.  SELECT： 执行 select 操作，选择指定的列，插入到虚拟表 VT8 中。
9.  DISTINCT： 对 VT8 中的记录进行去重。产生虚拟表 VT9.
10. ORDER BY: 将虚拟表 VT9 中的记录按照<order_by_list>进行排序操作，产生虚拟表 VT10.
11. LIMIT：取出指定行的记录，产生虚拟表 VT11, 并将结果返回。

## 排序的问题

> order by

```sql
select
  column_1
from
  table_name
order by column_1 [,column_2...] [asc|desc][nulls first|nulls last]
```

- 默认升序
  - asc 升序
  - desc 降序

* 可对函数使用排序
  - upper(column_1)

## 连接的问题

### 连个表的连接

> inner join（简写 table1,table2===talbe1 inner table2）

两个连接表都符合的才会选出

> left join

左表全部选出，右边表符合条件的选出

> right join

右表全部选出，左表符合条件的选出

### 结果接的连接

> union

连接两个表的数据，oracle 中 select 的数据列必须是一样的并且列的数据类型也必须是一样的！默认会去除重复的行，使用 union all 可以返回所有的行。（并集）

### 自连接

同一个表格的数据对比操作。自连接对比较表中的行或查询分层数据非常有用。

```sql
-- 查询同一天入职的同事
create table employees(id int unsigned auto_increment primary key,enter_date date,name varchar(16) not null)

select e1.name first,e2.name ,e1.enter_date from employees e1 left join employees e2 on e1.id<>e2.id and e1.enter_date=e2.enter_date;
```

## 分组的问题

> group by

分完组之后，选出的字段只能是 group by 后面的列，或则使用聚合函数生成的

```sql
-- 查询每个用户的订单数量和花费金额
select
-- 此处筛选的列名只能是uid 或使用聚合函数
  uid,count(*) cnt,sum(price) total_price
from
  order
group by
  uid
```

> rollup

配合 group by 使用。如果使用 group by rollup(A,B,C)，首先会对(A、B、C)进行 GROUP BY，然后对(A、B)进行 GROUP BY，然后是(A)进行 GROUP BY，最后对全表进行 GROUP BY 操作。roll up 的意思是“卷起”，这也可以帮助我们理解 group by rollup 就是对选择的列从右到左以一次少一列的方式进行 grouping 直到所有列都去掉后的 grouping(也就是全表 grouping)，对于 n 个参数的 rollup，有 n+1 次的 grouping。以下 2 个 sql 的结果集是一样的：

```sql
Select A,B,C,sum(E) from test group by rollup(A,B,C)

-- 和下面结果一致 分组次数为3次

Select A,B,C,sum(E) from test group by A,B,C

union all

Select A,B,null,sum(E) from test group by A,B

union all

Select A,null,null,sum(E) from test group by A

union all

Select null,null,null,sum(E) from test
```

> cube

cube 的意思是立方，对 cube 的每个参数，都可以理解为取值为参与 grouping 和不参与 grouping 两个值的一个维度，然后所有维度取值组合的集合就是 grouping 的集合，对于 n 个参数的 cube，有 2^n 次的 grouping。如果使用 group by cube(A,B,C),，则首先会对(A、B、C)进行 GROUP BY，然后依次是(A、B)，(A、C)，(A)，(B、C)，(B)，(C)，最后对全表进行 GROUP BY 操作，一共是 2^3=8 次 grouping。同 rollup 一样，也可以用基本的 group by 加上结果集的 union all 写出一个与 group by cube 结果集相同的 sql：

```sql
Select A,B,C,sum(E) from test group by cube(A,B,C);

-- 同下面结果一致

Select A,B,C,sum(E) from test group by A,B,C

union all

Select A,B,null,sum(E) from test group by A,B

union all

Select A,null,C,sum(E) from test group by A,C

union all

Select A,null,null,sum(E) from test group by A

union all

Select null,B,C,sum(E) from test group by B,C

union all

Select null,B,null,sum(E) from test group by B

union all

Select null,null,C,sum(E) from test group by C

union all

Select null,null,null,sum(E) from test;
```

> rollup sets(params1,param2)

grouping sets 就是对参数中的每个参数做 grouping，也就是有几个参数做几次 grouping,例如使用 group by grouping sets(A,B,C)，则对(A),(B),(C)进行 group by，如果使用 group by grouping sets((A,B),C),则对(A,B),(C)进行 group by。甚至 grouping by grouping set(A,A)都是语法允许的，也就是对(A)进行 2 次 group by,grouping sets 的参数允许重复
