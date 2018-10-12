# react

## note

> 默认组件方法不绑定this，方法里面访问this 为 undefined，并且如果需要传递参数，则事件对象作为最后一个参数传给方法

```javascript
//  in render func
<button className="test" onClick={this.testChange}>click</button>

//  methods
testChange(){
  console.log(this) // undefined
}

// in render bind this
// 在render方法中使用Function.prototype.bind会在每次组件渲染时创建一个新的函数，可能会影响性能（参见下文）
<button className="test" onClick={this.testChange.bind(this,1)}>click</button>

// a=1 , e is Event
testChange(a,e){
  console.log(this) // Component ins
}

// or in constructor
<button className="test" onClick={this.testChange}>click</button>
constructor(props){
  super(props)
  this.testChange=this.testChange.bind(this)
}
//  属性初始化器语法
testChange=()=>{
  console.log(this)
}

```