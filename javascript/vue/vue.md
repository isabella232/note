# vue

- [生命周期](#生命周期)
- [循环](#循环)
- [插槽](#插槽)

## 生命周期

```javascript {.line-numbers}
const component = {
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {}
};
```

## 循环

```html {.line-numbers}
<!-- Array -->
<li v-for="(item,index) in list"></li>
<!-- Object -->
<li v-for="(value,key,index) in object"></li>
```

> 数组方法

```javascript
// 变异方法，调用以下方法会同步更新视图
push();
pop();
shift();
unshift();
splice();
sort();
reverse();

//  非变异方法 slice concat filter map 返回一个新数组，可以使之替换旧的数据实现数据更新
//  你可能认为这将导致 Vue 丢弃现有 DOM 并重新渲染整个列表。幸运的是，事实并非如此。Vue 为了使得 DOM 元素得到最大范围的重用而实现了一些智能的、启发式的方法，所以用一个含有相同元素的数组去替换原来的数组是非常高效的操作。
example1.items = example1.items.filter(function(item) {
  return item.message.match(/Foo/);
});

//  更新
//  当你利用索引直接设置一个项时，例如：vm.items[indexOfItem] = newValue
//  当你修改数组的长度时，例如：vm.items.length = newLength
//  数组没有检查数据变更的方法，无法发布订阅通知

// Vue.set
Vue.set(vm.items, indexOfItem, newValue);
vm.items.splice(indexOfItem, 1, newValue);
vm.$set(vm.items, indexOfItem, newValue);
vm.$set(vm.obj, key, value);

//  清空Array
vm.items.splice(newLength);
```

> key

==2.2.0+ 的版本里，当在组件中使用 v-for 时，key 现在是必须的。==

## 插槽

### 作用域插槽

> 当子组件需要根据数据来渲染多种 ui 的时，并且需要复用该组件的时候使用。配合【slot】使用。

==在 2.5.0+，slot-scope 不再限制在 <template> 元素上使用，而可以用在插槽内的任何元素或组件上。==

```html
<!-- 定义一个todoList组件，默认情况下值显示text字段 -->
<!--
  现有status字段，需要根据status字段来显示其他不一致的内容，可以使用作用于插槽
-->
<template>
  <ul class="todo-list">
    <li v-for="(item,index) in todoList" @click="complete(index)" :key="index">
      <!-- 定义父组件接收的变量名为【todo】 -->
      <slot :todo="item"> {{item.text}} </slot>
    </li>
  </ul>
</template>
<!-- 父组件 -->
<template>
  <todo-list>
    <!-- 父组件来自由组合需要展示的内容 -->
    <!-- 定义子组件在父组件中的命名控件为【scope】 -->
    <!-- scope.todo===todo===子组件的item -->
    <!-- 结构语法 slot-scope="{ todo }" -->
    <template slot-scope="scope">
      <span v-if="scope.todo.isRight">+</span>{{scope.todo.text}}
    </template>
  </todo-list>
</template>
```
