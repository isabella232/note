# react

## note

+ 由于 JSX 编译后会调用 React.createElement 方法，所以在你的 JSX 代码中必须首先声明 React 变量。
+ 首字母必须大写，否则会被编译器认定为html标签
+ false、true、null 或 undefined不会渲染，0会渲染
+ props
  + children
    + 该属性为包含在组件内部的子组件
    + 如果只有一个子组件，则children表示子组件，否则所有子组件集合成一个数组，如下
    + 顺序从上到下依次为children[0],children[1]...

## 事件绑定

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

## 模块化css

1. css文件名，[filename].module.css
2. 引用，import style from 'css_path'
3. 使用，className={style.className}

### sass

1. npm install --save node-sass or yarn add node-sass
2. 格式化 - install plugin 【Beautify css/sass/scss/less】


## react-router-dom

> react官方的路由管理库

1. 在根组建下面使用 <Router><App/></Router>即可，不需要每个组件下面使用
  1. Router作为记录历史记录的组件，作为app组件的wapper，记录浏览历史记录

note:::

```javascript
//  重定向
<Route exact path="/" render={() => (
  loggedIn ? (
    <Redirect to="/dashboard"/>
  ) : (
    <PublicHomePage/>
  )
)}/>

//  页面之间传递参数
//  search 在 location对象中
Route component as this.props.location
Route render as ({ location }) => ()
Route children as ({ location }) => ()
withRouter as this.props.location

//  params 在match对象中
Route component as this.props.match
Route render as ({ match }) => ()
Route children as ({ match }) => ()
withRouter as this.props.match
matchPath as the return value
```

### react-transition-group

> react-router的路由转换动画组件

## react-redux

### redux

> 全局数据管理中心

1. action
  1. 定义types和actions
2. reducers
  1. 定义接收action的动作
  2. combineReducers
    1. 把所有reducers集中成一个
      1. combineReducers({reducer1,reducer2})
3. store
  1. import {createStore } from 'redux'
  2. const store= createStore(reducers)
  3. export store

### react-redux

> react官方的readux注入仓库

1. 注入store
  1. import {Provider} from 'react-redux'
  2. import store from '/store/store.js'
  3. index.js
    1. <Provider store={store}><App/></Provider>
2. 注入state和action到组件
  1. connect(function(state){return {state:state}},{addAction})(componentName)
  2. 注入到组件的props属性上

## react-motion

> react动画组件

### spring

- spring: (val: number, config?: SpringHelperConfig) => OpaqueConfig
  - number 期望值
  - config 配置项
    - stiffness 刚性 值越大 刚醒越大
    - damping 振幅 值越大幅度越小
    - precision 精度值
### presets

```javascript
export default {
  noWobble: {stiffness: 170, damping: 26}, // the default, if nothing provided
  gentle: {stiffness: 120, damping: 14}, // 缓和
  wobbly: {stiffness: 180, damping: 12},  // 
  stiff: {stiffness: 210, damping: 20},  
};
```
### Motion

- style
- defaultStyle:?
- children
- onRest:?

### StaggeredMotion

### TransitionMotion

## react-transition-group