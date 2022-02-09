# 对 JSON 的理解

可以查看 [MDN 的 JSON](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON) 的介绍

`JSON` 是一种基于文本的轻量级的数据交换格式。它可以被任何的编程语言读取和作为数据格式来传递。

`JSON` 对象包含两个方法: 用于解析 `JSON` 的 `parse()` 方法，以及将对象/值转换为 `JSON` 字符串的 `stringify()` 方法。除了这两个方法, `JSON` 这个对象本身并没有其他作用，也不能被调用或者作为构造函数调用。

◾ `JSON.parse()` 方法用来解析 `JSON` 字符串，构造由字符串描述的 `JavaScript` 值或对象。

```js
const json = '{ "name":"runoob", "alexa":10000, "site":"www.runoob.com" }'
const obj = JSON.parse(json) // {name: 'runoob', alexa: 10000, site: 'www.runoob.com'}
```

◾ `JSON.stringify()` 方法将一个 JavaScript 对象或值转换为 JSON 字符串。

```js
console.log(JSON.stringify({ x: 5, y: 6 })) // {"x":5,"y":6}
```

### 参数

这两个方法,都能接受三个参数,分别是

- `value`

  将要序列化成 一个 `JSON` 字符串的值。

- `replacer` 可选

  如果该参数是一个函数，则在序列化过程中，被序列化的值的每个属性都会经过该函数的转换和处理；如果该参数是一个数组，则只有包含在这个数组中的属性名才会被序列化到最终的 `JSON` 字符串中；如果该参数为 null 或者未提供，则对象所有的属性都会被序列化。

- `space` 可选

  指定缩进用的空白字符串，用于美化输出（pretty-print）；如果参数是个数字，它代表有多少的空格；上限为 10。该值若小于 1，则意味着没有空格；如果该参数为字符串（当字符串长度超过 10 个字母，取其前 10 个字母），该字符串将被作为空格；如果该参数没有提供（或者为 null），将没有空格。

```js
function replacer(key, value) {
  if (typeof value === 'string') {
    return undefined
  }
  return value
}

var foo = {
  foundation: 'Mozilla',
  model: 'box',
  week: 45,
  transport: 'car',
  month: 7
}

// '{"week":45,"month":7}'
var jsonString = JSON.stringify(foo, replacer)

// '{
//     "uno": 1,
//     "dos": 2
//  }'
var jsonString = JSON.stringify(foo, replacer, '\t')
```

### 转换规则

`JSON.stringify()`将值转换为相应的 JSON 格式：

- 转换值如果有 `toJSON()` 方法，该方法定义什么值将被序列化。
- 非数组对象的属性不能保证以特定的顺序出现在序列化后的字符串中。
- 布尔值、数字、字符串的包装对象在序列化过程中会自动转换成对应的原始值。
- `undefined`、任意的函数以及 `symbol` 值，在序列化过程中会被忽略（出现在非数组对象的属性值中时）或者被转换成 `null`（出现在数组中时）。函数、undefined 被单独转换时，会返回 `undefined`，如 `JSON.stringify(function(){})` or `JSON.stringify(undefined)`.
- 对包含循环引用的对象（对象之间相互引用，形成无限循环）执行此方法，会抛出错误。
- 所有以 `symbol` 为属性键的属性都会被完全忽略掉，即便 `replacer` 参数中强制指定包含了它们。
- Date 日期调用了 `toJSON()` 将其转换为了 `string` 字符串（同 `Date.toISOString())`，因此会被当做字符串处理。
- `NaN` 和 `Infinity` 格式的数值及 `null` 都会被当做 `null`。
- 其他类型的对象，包括 `Map/Set/WeakMap/WeakSet`，仅会序列化可枚举的属性。

在项目开发中，使用 `JSON` 作为前后端数据交换的方式。在前端通过将一个符合 `JSON` 格式的数据结构序列化为 `JSON` 字符串，然后将它传递到后端，后端通过 `JSON` 格式的字符串解析后生成对应的数据结构，以此来实现前后端数据的一个传递。

因为 `JSON` 的语法是基于 `js` 的，因此很容易将 `JSON` 和 `js` 中的对象弄混，但是应该注意的是 `JSON` 和 `js` 中的对象不是一回事，`JSON` 中对象格式更加严格，比如说在 `JSON` 中属性值不能为函数，不能出现 `NaN` 这样的属性值等，因此大多数的 `js` 对象是不符合 `JSON` 对象的格式的。

因为它转换为 `JSON` 字符串和 `parse` 转换成为 `js` 对象的功能, 所以可以用来作为对象的深拷贝使用, 缺点就是,他不识别 `NaN` 和函数,所以转换会丢失
