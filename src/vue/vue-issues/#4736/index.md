## **emits 造成的$attrs 中的 v-on 事件深层传递失败**

> 对应 `issues` 号为: [#4736](https://github.com/vuejs/vue-next/issues/4736)
>
> 地址: [emits property blocks $attrs injection](https://github.com/vuejs/vue-next/issues/4736)

### 1.问题

问题: `v-bind:$attrs` 没有透传

Parent:

```vue
<template>
  <div>
    <Mid @myEvent="myEventHandler" />
  </div>
</template>

<script>
import Mid from './Mid.vue'

export default {
  components: { Mid },
  methods: {
    myEventHandler() {
      console.log('triggered')
    }
  }
}
</script>
```

Mid:

```vue
<template>
  <div>
    <Child v-bind="$attrs" />
  </div>
</template>

<script>
import Child from './Child.vue'

export default {
  emits: ['myEvent'],
  inheritAttrs: false,
  components: { Child },
  mounted() {
    console.log('Mid: ', this.$attrs)
  }
}
</script>
```

Child:

```vue
<template>
  <button @click="$emit('myEvent')">Emit Child</button>
</template>

<script>
export default {
  mounted() {
    console.log('Child: ', this.$attrs)
  }
}
</script>
```

以上点击 Child 的 Emit Child 按钮不会触发 myEventHandler，以下是当前的输出：

```js
Child:  Proxy {__vInternal: 1}
Mid.vue:17 Mid:  Proxy {__vInternal: 1}
```

### 2.问题解析

其实这不是一个 `bug` 是一个需求

在我们封装高级组件/二次封装组件的时候,很多时候,需要利用 `v-bind="$attrs"` 绑定到子组件,继承传递 `非 prop 的属性`

在`vue2`的时候, 非声明属性继承,是分为两类, `属性: $attrs`和`事件: $listeners ` 所以,在 `V2` 中,分开传递给子组件没有什么问题,

但是在 `V3` 去除了 `$listeners` 这个 `API` ,使得所有非声明属性和事件传递,都会在 `$attrs` 里面进行传递,详情可以看 **尤大** 的文档 [**0031-attr-fallthrough.md**](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0031-attr-fallthrough.md)

为了区分原生`DOM`事件和自定义事件, `V3` 提供了 `emits` 声明当前组件,对外暴露的事件

```js
{
  emits: ['xxx']
}
```

这个时候, `$attrs` 里面需要排除 `props` 和 `emits` 两个部分的声明

官方文档声明 [禁用 Attribute 继承](https://v3.cn.vuejs.org/guide/component-attrs.html#%E7%A6%81%E7%94%A8-attribute-%E7%BB%A7%E6%89%BF)

> 通过将 `inheritAttrs` 选项设置为 `false`，你可以使用组件的 `$attrs` property 将 attribute 应用到其它元素上，该 property 包括组件 `props` 和 `emits` property 中未包含的所有属性 (例如，`class`、`style`、`v-on` 监听器等)。

### 3.解答

1. 通过`props` 代替`emits`
   [emits property blocks $attrs injection vuejs/vue-next#4736 (comment)](https://github.com/vuejs/vue-next/issues/4736#issuecomment-934156497)
2. 再次 emit 事件
   [emits property blocks $attrs injection vuejs/vue-next#4736 (comment)](https://github.com/vuejs/vue-next/issues/4736#issuecomment-934191738)

这个 `issues` 的作者,是想在扩展组件的时候,可以通过 `v-bind="$attrs"` 处理子组件属性和事件

作者想通过 `$attrs` 访问祖先节点透传的事件, 但是被 `emits` 截胡了,想官方能够提供一种方式,所以产生了一个 讨论,大家可以去围观一下

- [$attrs no longer contains events declared in the emits option](https://github.com/vuejs/rfcs/discussions/397)
