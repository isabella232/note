# vue

## 初始化

加载 vue.js 会运行的几个函数，其中上面几个是 Vue 构造函数的增加原型方法。

```javascript
initMixin(Vue)
stateMixin(Vue)
eventsMixin(Vue)
lifecycleMixin(Vue)
renderMixin(Vue)
```

### initMixin

* 定义\_init(options)原型方法
  * 该方法会在 Vue 构造函数里面调用，作为 Vue 的初始化以及入口
