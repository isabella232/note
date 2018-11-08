# oracle

## 函数

[引用地址](https://www.cnblogs.com/bbliutao/archive/2017/11/08/7804263.html)

### 日期函数

```sql
-- 字符串
-- 连接字符串
concat(str1,str2) == str1||str2
-- 填充 用str2填充str1，指导str1长度满足len
lpad(str1,len,str2) -- rpad
```

### 其他函数

```sql
-- 如果str1为空，返回str2，否则返回str1.str1和str2同类型
nvl(str1,str2)
-- 如果str1为空返回str3，否则返回str2
nvl2(str1,str2,str3)
```

## 条件判断

### when then else end

```sql
--简单Case函数  

CASE sex  
WHEN '1' THEN '男'  
WHEN '2' THEN '女'  
ELSE '其他' END  

--Case搜索函数  

CASE
WHEN sex = '1' THEN '男'  
WHEN sex = '2' THEN '女'  
ELSE '其他' END  
```

### if  else

```sql
-- 配合聚合函数
-- 如果返回不是空则集合函数加1否则不做处理
select sum(case sex where '1' then 1 else null end) 男 

-- 如果value=if1 则值为then1 ...
DECODE(VALUE, IF1, THEN1, IF2, THEN2, IF3, THEN3, ......, OTHER);

--
if a=... then 
...
end if;

if a=... then
...
elsif a=... then    --这里是elsif，不是else if.
...
end if;
``` 