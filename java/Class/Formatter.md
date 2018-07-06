# java 格式化

## 字符串格式化语法

语法格式（[doc](https://docs.oracle.com/javase/8/docs/api/)）

> %[argument_index$][flags][width][.precision]conversion

参数说明：

- argument_index$
  - 可选。 十进制整数，后置参数的格式化位置。 1& => 标识第一位 , 2& => 标识第二位
- flags
  - 可选。格式化的占位符（当后置参数不满 width 时候补充的字符），如果指定了这个值，则必须指定 width 参数。
- width
  - 可选。填充宽度。当参数位数不满 width 设置的值时候，会填充 flags 的值，默认为空格。
- precision
  - 可选。限制精度
- conversion
  - 必须。如何格式化的一个设置。formatter 根据这个值来格式化
