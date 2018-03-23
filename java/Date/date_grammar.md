# java.util.Date 记录

## constructor

```java

//  无参数构造函数
Date()

//  long参数
Date(long date)

//  以下构造函数废弃
Date(String s)
Date(int year,int month,int date)   // 使用 Calendar.set(year+1900,month,date)代替
Date(int year,int month,int date,int hour,int minute);  //同上
Date(int year,int month,int date,int hour,int minute,int second); //同上
```