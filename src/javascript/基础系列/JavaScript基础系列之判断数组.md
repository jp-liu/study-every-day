## JavaScript 基础系列之判断数组

- **通过 Object.prototype.toString.call()做判断**

```js
Object.prototype.toString.call(obj).slice(8, -1) === 'Array'
```

- **constructor**

```js
obj.constructor === Array
```

- **通过 ES6 的 Array.isArray()做判断**

```js
Array.isArray(obj)
```

- **通过 instanceof 做判断**

```js
obj instanceof Array
```

- **通过 Array.prototype.isPrototypeOf**

```js
Array.prototype.isPrototypeOf(obj)
```

测试一下上面总结的五种方法：

```js
var obj = {}
var arr = [1, 2, 3]

// instanceof
var instanceofObj = obj instanceof Array
console.log(instanceofObj) // false

var instanceofArr = arr instanceof Array
console.log(instanceofArr) // true

// Array.isArray()
var objout2 = Array.isArray(obj)
console.log(objout2) // false

var arrout2 = Array.isArray(arr)
console.log(arrout2) // true

// Array.prototype.isPrototypeOf()

var objout3 = Array.prototype.isPrototypeOf(obj)
console.log(objout3) // false

var arrout3 = Array.prototype.isPrototypeOf(arr)
console.log(arrout3) // true

// constructor
var objout4 = obj.constructor === Array
console.log(objout4) // false

var arrout4 = arr.constructor === Array
console.log(arrout4) // true

// obj.prototype.toString.call()
var objout5 = Object.prototype.toString.call(obj)
console.log(objout5) // [object Object]

var arrout5 = Object.prototype.toString.call(arr)
console.log(arrout5) // [object Array]
```
