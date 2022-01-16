# == 和 === 的区别,类型转换

### [MDN 相等运算符](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators#相等运算符)

如果相等，操作符返回的是布尔类型的 true，否则是 false。

- [`==` (en-US)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators)

  相等 运算符.

- [`!=` (en-US)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators)

  不等 运算符.

- [`===` (en-US)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators)

  全等 运算符.

- [`!==` (en-US)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators)

  非全等 运算符.

相等运算符（`==`和`!=`）使用[抽象相等比较算法](https://www.ecma-international.org/ecma-262/5.1/#sec-11.9.3)比较两个操作数。可以大致概括如下：

- 如果两个操作数都是对象，则仅当两个操作数都引用同一个对象时才返回`true`。
- 如果一个操作数是`null`，另一个操作数是`undefined`，则返回`true`。
- 如果两个操作数是不同类型的，就会尝试在比较之前将它们转换为相同类型：
  - 当数字与字符串进行比较时，会尝试将字符串转换为数字值。
  - 如果操作数之一是`Boolean`，则将布尔操作数转换为 1 或 0。
    - 如果是`true`，则转换为`1`。
    - 如果是 `false`，则转换为`0`。
  - 如果操作数之一是对象，另一个是数字或字符串，会尝试使用对象的`valueOf()`和`toString()`方法将对象转换为原始值。
- 如果操作数具有相同的类型，则将它们进行如下比较：
  - `String`：`true`仅当两个操作数具有相同顺序的相同字符时才返回。
  - `Number`：`true`仅当两个操作数具有相同的值时才返回。`+0`并被`-0`视为相同的值。如果任一操作数为`NaN`，则返回`false`。
  - `Boolean`：`true`仅当操作数为两个`true`或两个`false`时才返回`true`。

此运算符与[严格等于](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Strict_equality)（`===`）运算符之间最显着的区别在于，严格等于运算符不尝试类型转换。相反，严格相等运算符始终将不同类型的操作数视为不同。

**简而言之，在比较两个值，双等号将不同类型值执行类型转换之后比较; 三等号直接类型比较和值相同的比较，而不进行类型转换 (如果类型不同, 只是总会返回 false );**

## == 隐式转换步骤

一、首先看双等号前后有没有 NaN，如果存在 NaN，一律返回 false。

二、再看双等号前后有没有布尔，有布尔就将布尔转换为数字。（false 是 0，true 是 1）

三、接着看双等号前后有没有字符串, 有三种情况：

```
1、另一个是对象，对象使用toString()或者valueOf()进行转换；

2、另一个是数字，字符串转数字；

3、另一个也是字符串，直接比较；

4、其他返回false
```

四、如果是数字，对方是对象，对象取 valueOf()或者 toString()进行比较, 其他一律返回 false

五、null, undefined 不会进行类型转换, 但它们俩相等

![相等性规范](/src/assets/image/基础系列/相等性规范.png)

## 数据类型转换

在 JS 中类型转换只有三种情况，分别是：

- 转换为布尔值（调用`Boolean()`方法）
- 转换为数字（调用`Number()`、`parseInt()`和`parseFloat()`方法）
- 转换为字符串（调用`.toString()`或者`String()`方法）

**`null`和`underfined`没有`.toString()`方法**

![相等性规范](/src/assets/image/基础系列/类型转换.png)
