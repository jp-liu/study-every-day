# vue-next

> 为了更加深入社区, 做些准备工作
>
> 我们要做的事情:
>
>     1. 阅读贡献指南:  [贡献指南](https://github.com/vuejs/vue-next/blob/ccb6651b12af6d1b43e2391cef77fd0bb73e49bd/.github/contributing.md)
>
> 2. 知悉 **labels** : [Labels](https://github.com/vuejs/vue-next/labels?page=1&sort=name-asc)
> 3. 提升自己吧!~
> 4. 提升自己吧!~
> 5. 提升自己吧!~

## 贡献指南翻译

@TODO

## Labels 翻译

> labels 是什么?
>
> 我的理解是
>
> 1. 为不同模块分类,接收大家的想法, 让大家可以追踪自己在意的模块是否更新
> 2. 为项目接下来的方向定义优先级, 让贡献者可以朝着重点方向贡献

目前 **vue-next** 的 **labels** 有 **44** 个,分别分布在一下几个模块

### 1.bug 缺陷类

按照优先级分布

1. [🐞 bug](<https://github.com/vuejs/vue-next/labels/%3Alady_beetle%3A> bug)
   - 一些错误点

### 2. 任务优先级

1. [🧹 p1-chore](<https://github.com/vuejs/vue-next/labels/%3Abroom%3A> p1-chore)
   - 优先级 1: 不能改变代码行为
2. [🍰 p2-nice-to-have](<https://github.com/vuejs/vue-next/labels/%3Acake%3A> p2-nice-to-have)
   - 优先级 2: 这并不会破坏原有逻辑执行, 但是处理之后更好理解
3. [🔨 p3-minor-bug](<https://github.com/vuejs/vue-next/labels/%3Ahammer%3A> p3-minor-bug)
   - 优先级 3: 修复一个错误,但是这涉及到一个边缘情况的具体用法,不会影响大体逻辑用法
4. [❗ p4-important](<https://github.com/vuejs/vue-next/labels/%3Aexclamation%3A> p4-important)
   - 优先级 4: 修复违反记录行为的错误,或者显著提高平台性能 `中高风险的bug,或者大型性能优化`
5. [🔥 p5-urgent](<https://github.com/vuejs/vue-next/labels/%3Afire%3A> p5-urgent)
   - 优先级 5: 修复影响大多数用的破坏性 bug,应尽快修复并上线

### 3. feat 特性

1. [✨ enhancement](<https://github.com/vuejs/vue-next/labels/%3Asparkles%3A> enhancement)
   - 新功能,或者新请求(默认 label)
2. [feat: compiler](<https://github.com/vuejs/vue-next/labels/feat%3A> compiler)
   - 编译器相关
3. [feat: custom elements](<https://github.com/vuejs/vue-next/labels/feat%3A> custom elements)
   - 自定义元素
4. [feat: hmr](<https://github.com/vuejs/vue-next/labels/feat%3A> hmr)
   - 热更新
5. [feat: keep-alive](<https://github.com/vuejs/vue-next/labels/feat%3A> keep-alive)
   - `keep-alive`缓存组件相关
6. [feat: reactivity](<https://github.com/vuejs/vue-next/labels/feat%3A> reactivity)
   - 响应式系统
7. [feat: script-setup](<https://github.com/vuejs/vue-next/labels/feat%3A> script-setup)
   - setup 语法糖, 与 RFC #227 试验性功能有关 => 不是说在版本 3.2 开始就确定了,不算试验性特性了吗
8. [feat: sfc](<https://github.com/vuejs/vue-next/labels/feat%3A> sfc)
   - 单文件组件处理
9. [feat: sfc-style-vars](<https://github.com/vuejs/vue-next/labels/feat%3A> sfc-style-vars)
   - 状态驱动的动态 `css` 在 `style` 使用双向绑定
10. [feat: slots](<https://github.com/vuejs/vue-next/labels/feat%3A> slots)
    - 插槽相关
11. [feat: ssr](<https://github.com/vuejs/vue-next/labels/feat%3A> ssr)
    - 服务端渲染相关
12. [feat: suspense](<https://github.com/vuejs/vue-next/labels/feat%3A> suspense)
    - `suspense` 异步组件相关
13. [feat: teleport](<https://github.com/vuejs/vue-next/labels/feat%3A> teleport)
    - `teleport` 组件相关, 可以指定插入点的组件
14. [feat: transition](<https://github.com/vuejs/vue-next/labels/feat%3A> transition)
    - `transition` 动画组件相关
15. [feat: types](<https://github.com/vuejs/vue-next/labels/feat%3A> types)
    - `typescript` 类型相关
16. [feat: v2 compat](<https://github.com/vuejs/vue-next/labels/feat%3A> v2 compat)
    - 兼容 `vue2.x` 相关
17. [feat: v-model](<https://github.com/vuejs/vue-next/labels/feat%3A> v-model)
    - 双向数据绑定特性
18. [feat: v-on](<https://github.com/vuejs/vue-next/labels/feat%3A> v-on)
    - 事件相关

### 4.其他

1. [browser specific](<https://github.com/vuejs/vue-next/labels/browser> specific)

   - 浏览器专用

2. [comment or text update](<https://github.com/vuejs/vue-next/labels/comment> or text update)

   - PR 不更改代码，只更改代码注释或文本文件。

3. [dependencies](https://github.com/vuejs/vue-next/labels/dependencies)

   - 更新依赖项文件的请求

4. [has PR](<https://github.com/vuejs/vue-next/labels/has> PR)

   - 已经有一个 `PR` 来解决这个 `issues` 了

5. [has workaround](<https://github.com/vuejs/vue-next/labels/has> workaround)

   - 为了避免这个 `issue` 问题，已经找到了一种解决办法

6. [need guidance](<https://github.com/vuejs/vue-next/labels/need> guidance)

   - PR 中的解决方案尚不清楚,还需要贡献者指导进一步进行

7. [need more info](<https://github.com/vuejs/vue-next/labels/need> more info)

   - 需要进一步的信息

8. [need test](<https://github.com/vuejs/vue-next/labels/need> test)

   - PR 中缺少测试用例

9. [🛑 on hold](<https://github.com/vuejs/vue-next/labels/>🛑 on hold)

   - PR 无法合并,需要等待其他工作完成才能合并进来

10. [🔩 p2-edge-case](<https://github.com/vuejs/vue-next/labels/>🔩 p2-edge-case)

    - 边界情况

11. [planned: 3.2](<https://github.com/vuejs/vue-next/labels/planned%3A> 3.2)

    - 3.2 版本计划内容

12. [ready to merge](<https://github.com/vuejs/vue-next/labels/ready> to merge)

    - PR 将被合并

13. [🔍 review needed](<https://github.com/vuejs/vue-next/labels/>🔍 review needed)

    - PR 需要审核

14. [security](https://github.com/vuejs/vue-next/labels/security)

    - 提出解决安全漏洞的 PR

15. [sfc-playground](https://github.com/vuejs/vue-next/labels/sfc-playground)

    - 单文件相关,练习场

### 5.github 默认 labels

1. [duplicate](https://github.com/vuejs/vue-next/labels/duplicate)
   - 这个问题已经存在了
2. [invalid](https://github.com/vuejs/vue-next/labels/invalid)
   - 这似乎不对
3. [wontfix](https://github.com/vuejs/vue-next/labels/wontfix)
   - 不计划修复
4. [help wanted](<https://github.com/vuejs/vue-next/labels/help> wanted)
   - 需要特别关注的点
