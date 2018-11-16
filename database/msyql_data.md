# mysql 数据类型

## 数字

### bit

- bit(M)
  - M 表示位长度
  - insert----insert into table(bitColumn) values(b'value'/B'value'/0b[binary])
  - select----select bin(key)[二进制]/key+0[十进制]/hex(key)[十六进制] from table

### 精确数字

- dec(M,D)
  - 适用于需要精确值的存储。商品价格，薪水等。
  - M 精确值
  - D 小数位数
  - 范围 -999.99~999.99
  - 整数位超过 M 位会报错，小数位超过 D 位会四舍五入
