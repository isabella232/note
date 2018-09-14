# 内置对象

## Object

### 属性描述符

如果是对象字面量创建的对象 writable configurable enumberable 三哥属性都是 true
如果是Object.defainedProperty(obj,property,{
  value,
  [writable default false]
  [cinfigurable default false]
  [enumberable default false]
})

数据描述符和存取描述符均具有以下可选键值：

> configurable
当且仅当该属性的 configurable 为 true 时，该属性描述符才能够被改变，同时该属性也能从对应的对象上被删除。默认为 false。

> enumerable
当且仅当该属性的enumerable为true时，该属性才能够出现在对象的枚举属性中。默认为 false。

> Writable 属性
当且仅当该属性的Writable为true时，该属性才能够出现在对象的枚举属性中。默认为 false

数据描述符同时具有以下可选键值：

> value
该属性对应的值。可以是任何有效的 JavaScript 值（数值，对象，函数等）。默认为 undefined。
writable
当且仅当该属性的writable为true时，value才能被赋值运算符改变。默认为 false。
存取描述符同时具有以下可选键值：

> get
一个给属性提供 getter 的方法，如果没有 getter 则为 undefined。当访问该属性时，该方法会被执行，方法执行时没有参数传入，但是会传入this对象（由于继承关系，这里的this并不一定是定义该属性的对象）。
默认为 undefined。
> set
一个给属性提供 setter 的方法，如果没有 setter 则为 undefined。当属性值修改时，触发执行该方法。该方法将接受唯一参数，即该属性新的参数值。
默认为 undefined。

```javascript {.line-number}

/**
 * 对象拷贝
 * 只是线拷贝，如果对象的属性也是一个对象，则两个对象的属性指向同一个对象
 * */
Object.assign(target,source1[,source2])
```

### instanceof and isPropertyOf

isPrototypeOf() 与 instanceof 运算符不同。在表达式 "object instanceof AFunction"中，object 的原型链是针对 AFunction.prototype 进行检查的，而不是针对 AFunction 本身。

```javascript
let a=[]
Array.prototype.isPrototype(a)  // true
a instanceof  Array // true
```