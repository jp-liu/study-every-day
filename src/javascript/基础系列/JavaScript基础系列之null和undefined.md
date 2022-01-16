# null 和 undefined

## undefined

对声明但未赋值的变量返回类型为 undefined 表示值未定义。

```js
let hd
console.log(typeof hd)
```

对未声明的变量使用会报错，但判断类型将显示 `undefined`。

未赋值与未定义的变量值都为 undefined ，建议声明变量设置初始值，这样就可以区分出变量状态了。

函数参数或无返回值是为 undefined

```js
function hd(web) {
  console.log(web) //undefined
  return web
}
console.log(hd()) //undefined
```

## null

null 用于定义一个空对象，即如果变量要用来保存引用类型，可以在初始化时将其设置为 null。

```js
var hd = null
console.log(typeof hd)
```

## 总结

- **undefined:** 表示声明,没有赋值
- **null:** 表示空对象,可以用于初始化引用类型,和清理不用的对象用于垃圾回收

```js
undefined == null // true
```

个人理解,`null` 空对象是声明了,但是没有赋值,也是 `undefined`,哈哈

还是看下规范吧

![相等性规范](/src/assets/image/基础系列/相等性规范.png)
