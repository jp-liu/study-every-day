# HTTP 协议

## HTTP 报文结构是怎样的？

### 起始行

- 请求报文

  - GET /home HTTP/1.1
  - 方法 + 路径 + 协议/版本号

- 响应报文(状态行)

  - HTTP/1.1 200 OK
  - 协议/版本号 状态码 原因

### 头部

- 字段很多,不同特性,在下面分析
- 命名规范

  - 1.字段名不区分大小写
  - 2.字段名不允许出现空格和 \_
  - 3.字段名后面必须接冒号 :

### 空行

- 区分开头部和实体的重要部分

### 实体

- 请求报文

  - body: 请求参数信息

- 响应报文

  - body: 响应体信息

## 如何理解 HTTP 的请求方法？

### HTTP1.1 请求方法

- GET: 通常用来获取资源
- HEAD: 获取资源元信息
- POST: 提交数据, 既上传数据
- PUT: 修改数据
- DELETE: 删除资源(除了 RESTFUl 风格的 API,几乎用不到)
- CONNECT: 建立连接隧道, 用于代理服务器
- OPTIONS: 列出可对资源实行的请求方法,一般适用于跨域请求,复杂请求的预检
- TRACE: 追踪请求, 响应的传输路径,中间代理服务器信息

### GET 和 POST 有什么区别?

- 1.语义上的区别
- 2.缓存角度

  - GET 请求会被浏览器主动缓存,留下历史记录
  - POST 请求默认不会被缓存

- 3.编码角度

  - GET 请求只能进行 URL 编码,只接受 ASCLL 字符
  - POST 没有限制

- 4.参数角度

  - GET 一般放在 URL 中,不安全
  - POST 放在请求体中,相对安全

- 5.幂等性

  幂等表示执行相同的操作，结果也是相同的

  - GET 是幂等的
  - POST 不是幂等的

- 6.TCP 角度

  - GET 请求将报文一次性发出去
  - POST 则会分成两个 TCP 数据包, 第一个发送 header 部分,服务器响应 100(continue), 然后发送 body 部分, (火狐除外,它特殊)

## 如何理解 URI？

### 概念:

- URI (UniForm Resource Identifier): 全球统一资源标识符

### 作用:

- 区分互联网上不同的资源

### 区分:

- 平时说的网址都是 URL,URI 包含了 URL 和 URN
- URI: 全球统一资源标识符
- URL: 全球统一资源定位符
- URN: 全球统一资源名称

### 结构

- scheme

  - 协议名(http, https, file)

- user: password@

  - 表示登录主机用户信息, 不安全不推荐使用

- host: port

  - 主机名和端口号

- path

  - 请求路径,标记资源位置

- query

  - 表示查询参数

- fragment

  - 表示 URI 锁定为资源内的一个锚点

- 示例: https://www.baidu.com/s?wd=HTTP&rsv_spt=1

  - scheme: https
  - host: part: www.baidu.com

    - http 端口默认 80
    - https 端口默认 443

  - path: /s
  - query: wd=HTTP&rsv_spt
  - fragment: 没有
  - 子主题 6

### 编码

- URI 只能使用 ASCLL 字符, ASCLL 之外的字符是不支持显示的, 而且还有一部分符号是界定符, 如果不加以处理,就会导致解析错误
- 所以 URI 引入了 `编码` 机制, 将所有非 ASCLL 码和界定符转为 16 进制字节值, 然后在前面 + 一个 %
- 例如: 空格 => %20

## 如何理解 HTTP 状态码？

### RFC 规定 HTTP 状态码为 `三位数`, 被分为五类

- 1XX: 表示目前是协议处理的中间状态
- 2XX: 表示成功状态
- 3XX: 表示重定向状态,资源位置发生变动,需要重新请求
- 4XX: 请求报文有误
- 5XX: 服务器端发生错误

### 1XX

- 101 Switching Protocols

  - 在 HTTP 升级为 WebSocket 的时候, 如果服务器统一变更,则返回 101

### 2XX

- 200 OK

  - 最常见的请求成功状态码,通常在响应体中方有数据

- 204 No Content

  - 和 200 含义相同,但是响应通常响应体重没有数据

- 206 Partial Content

  - 部分内容,使用场景,分块下载,断点续传, 会携带对应的响应头 Content-Range

### 3XX

- 301 Moved Permanently

  - 永久重定向

- 302 Found

  - 临时重定向

- 304 Not Modified

  - 协商缓存命中

### 4XX

- 400 Bad Request

  - 笼统地提示了一下错误，并不知道哪里出错了。

- 403 Forbidden

  - 无权限,服务器禁止访问

- 404 Not Found

  - 资源未找到

- 405 Method Not Allowed

  - 请求方法不被服务器端允许

- 406 Not Acceptable

  - 资源无法满足客户端条件

- 408 Request Timeout

  - 服务器等待了太长时间

- 409 Conflict

  - 多个请求发生了冲突

- 413 Request Entity Too Large

  - 请求体的数据过大

- 414 Request-URI Too Long

  - 请求行的 URI 太大

- 429 Too Many Request

  - 客户端发送请求过多

- 431 Request Header Fields Too Large

  - 请求头字段内容太大

### 5XX

- 500 Internal Server Error

  - 服务器出错,具体啥错也不知道

- 501 Not Implemented

  - 表示客户端请求的功能还不支持

- 502 Bad Gateway

  - 服务器本身正常, 但是访问出错了,不知道为啥

- 503 Service Unavailable

  - 服务器繁忙,暂时无法响应

## 简要概括一下 HTTP 的特点？HTTP 有哪些缺点？

### 特点

- 1.灵活可拓展

  - 语义自由

    - 只规定了基本格式, 比如空格分隔单词, 换行分隔字段, 其他部分都没有严格限制

  - 传输多样性

    - 可以传输文本, 图片, 音频/视频等任意格式文件

- 2.可靠传输

  - 因为基于 TCP/IP

- 3.请求-应答

  - 一发一收,有来有回

- 4.无状态

  - 状态指的是: 通信过程的上下文信息, 每一个 HTTP 请求都是独立的,无关的,默认不需要保存状态信息

### 缺点

- 1.无状态

  - 成也无状态,败也无状态
  - 成: 在仅仅只需要获取一些数据的时候, 不需要保存连接上下文信息,这个时候无状态又是一个优点
  - 败: 在需要长链接的场景中,需要保留大量上下文信息,避免传递大量重复信息, 这个时候无状态就是一个大缺点

- 2.明文传输

  - 协议里的报文 (主要是头部) 不适用二进制数据, 而是文本形式
  - 为调试提供了遍历,但是将信息暴露给了外界

- 3.队头阻塞问题

  - 当 HTTP 开启长连接的时候,共用一个 tcp 连接, 统一时刻只能处理一个请求,那么当前的请求耗时过长,就会造成后面的请求处于阻塞状态,这就是著名的 队头阻塞 问题

## Accept 系列字段解析

### 数据格式

- 前提: 文件格式,数据类型

  - MIME(Multipurpose Internet Mail Extensions, 多用途互联网邮件扩展) 本来使用在邮件系统中, 让邮件可以发送任意格式数据, 这对于 HTTP 是通用的
  - HTTP 从 MIME type 中取了一部分来标记报文 body 的数据类型

- HTTP 可以传输任意格式的内容, 那么怎么知道我需要什么格式的呢? 所以我们需要指定接收格式,发送格式

  - 发出类型 Content-Type
  - 接收类型 Accept
  - 类型值分类

    - text： text/html, text/plain, text/css 等
    - image: image/gif, image/jpeg, image/png 等
    - audio/video: audio/mpeg, video/mp4 等
    - application: application/json, application/javascript, application/pdf, application/octet-stream

### 压缩方式

- 发出 Content-Encoding
- 接收 Accept-Encoding
- 取值分类

  - gzip

    - 当今最流行的压缩格式

  - deflate

    - 压缩格式

  - br

    - 专门为 HTTP 发明的压缩算法

### 支持语言

- 发出 Content-Language
- 接收 Accept-Language
- 取值分类

  - zh-CN, zh, en

### 字符集

- 发出 Content-Type: text/html; charset=utf-8
- 接收 Accept-Charset: charset=utf-8

## 对于定长和不定长的数据，HTTP 是怎么传输的？

### 定长包体

- Content-Length

      - 写几就是几,超过就无法显示
      - 如:

  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Content-Length', 10);
  res.write("helloworld");
  浏览器显示 helloworld

res.setHeader('Content-Length', 8);
浏览器显示 hellowor

res.setHeader('Content-Length', 12);
浏览器无法显示

### 不定长包体

- Content-Length 被忽略
- Transfer-Encoding: chunked 生效

  模拟

  const http = require('http');

  const server = http.createServer();

  server.on('request', (req, res) => {
  if(req.url === '/') {
  res.setHeader('Content-Type', 'text/html; charset=utf8');
  res.setHeader('Content-Length', 10);
  res.setHeader('Transfer-Encoding', 'chunked');
  res.write("<p>来啦</p>");
  setTimeout(() => {
  res.write("第一次传输<br/>");
  }, 1000);
  setTimeout(() => {
  res.write("第二次传输");
  res.end()
  }, 2000);
  }
  })

  server.listen(8009, () => {
  console.log("成功启动");
  })

      - chunk长度(16进制的数)

  第一个 chunk 的内容
  chunk 长度(16 进制的数)
  第二个 chunk 的内容
  ......
  0
  一个空行

## HTTP 如何处理大文件的传输？

### 对于几百 M 甚至上 G 的文件, 一口气传输是不现实的, 会有大量的等待时间, 严重影响用户体验, 所以为了这一个场景, 采取了 范围请求 的解决方案

### 范围请求

- 1.响应头增加 Accept-Ranges: none
  告知客户端, 表示服务器支持范围请求
- 2.请求头字段使用 Range

      - 字段描述

      	- 格式:  bytes=x-y
      	- 单段格式: Range: bytes=0-9
      	- 多段格式: Range: bytes=0-9, 30-39
      	- 0-499表示从开始到第 499 个字节。

  500- 表示从第 500 字节到文件终点。
  -100 表示文件的最后 100 个字节。

- 3.服务器处理

      - 验证

      	- 验证范围是否合法

      		- 合法: 返回 206 状态码
      		- 不合法: 返回 416 状态码

      - 合法回复

      	- 合法时, 添加 Content-Range 字段,并且根据请求头 Range 是单段数据,还是多段数据进行处理
      	- 单段数据

      		- HTTP/1.1 206 Partial Content

  Content-Length: 10
  Accept-Ranges: bytes
  Content-Range: bytes 0-9/100

i am xxxxx - 0-9 表示请求成功的返回, 100 表示总资源大小

    	- 多段数据

    		- HTTP/1.1 206 Partial Content

Content-Type: multipart/byteranges; boundary=00000010101
Content-Length: 189
Connection: keep-alive
Accept-Ranges: bytes

--00000010101
Content-Type: text/plain
Content-Range: bytes 0-9/96

i am xxxxx
--00000010101
Content-Type: text/plain
Content-Range: bytes 20-29/96

eex jspy e
--00000010101-- - 关键字段: Content-Type: multipart/byteranges;boundary= 00000010101

    			- 请求一定是多段数据请求
    			- 响应体的分隔符是 00000010101

    		- 各段数据之间使用指定分隔符分开,最后在末尾添加 -- 表示结束

## HTTP 中如何处理表单数据的提交？

### Content-Type

- application/x-www-form-urlencoded

  - 数据会被编码为以 & 符作为分割的键值对,和 URL 的 query 部分一样
  - 字符以 URL 编码方式进行编码

    // 转换过程: {a: 1, b: 2} -> a=1&b=2 -> 如下(最终形式)
    "a%3D1%26b%3D2"

- multipart/form-data

  - 数据会被分隔符分隔, 每部分均由 HTTP 头部描述子包体,最后在分隔符后面增加 -- 表示结束

    Content-Disposition: form-data;name="data1";
    Content-Type: text/plain
    data1
    ----WebkitFormBoundaryRRJKeWfHPGrS4LKe
    Content-Disposition: form-data;name="data2";
    Content-Type: text/plain
    data2
    ----WebkitFormBoundaryRRJKeWfHPGrS4LKe--

  - Content-Type 字段会包含 boundary 分隔符,由浏览器默认提供,如: Content-Type: multipart/form-data;boundary=----WebkitFormBoundaryRRJKeWfHPGrS4LKe

### 小结

- multipart/form-data 格式最大的特点在于:每一个表单元素都是独立的资源表述。另外，你可能在写业务的过程中，并没有注意到其中还有 boundary 的存在，如果你打开抓包工具，确实可以看到不同的表单元素被拆分开了，之所以在平时感觉不到，是以为浏览器和 HTTP 给你封装了这一系列操作。
- 在实际的场景中，对于图片等文件的上传，基本采用 multipart/form-data 而不用 application/x-www-form-urlencoded，因为没有必要做 URL 编码，带来巨大耗时的同时也占用了更多的空间。

## HTTP1.1 如何解决 HTTP 的队头阻塞问题？

### 问题

- 1.HTTP 传输基于 请求-应答 的模型,报文必须是一发一收
- 2.所有请求发过去,是放在一个任务队列中, 串行执行
- 3.队首任务太慢就会造成后面任务阻塞了

### 解决方案

- 1.并发请求

  - 一个阻塞就多发几个,创建多个任务队列处理
  - RFC 2616 规定一个域名最多并发 2 个请求,但是不同浏览器实现不同, 谷歌是 6 个请求,但是这还不够, 满足不了性能的需求

- 2.域名分片

  - 一个域名可以并发 6 个连接, 多分几个域名,并发长链接就更多了, 6n 的连接
  - 一个域名可以分出很多二级域名, 而他们都指向一台服务器,能够并发的连接数更多, 也就更好的解决 队头阻塞 的问题

## Cookie 有哪些属性和功能？

### 简介

- HTTP 是无状态的,默认不需要保留上下文信息,那如果需要保留一些信息呢? 所以 HTTP 引入了 Cookie.
- Cookie 本质是浏览器里面存的很小的文本文件,以键值对的方式存放.
- 响应头 Set-Cookie: xx=xx 进行设置
- 请求头 Cookie: xx=xx; 携带 Cookie

### 属性

- 生命周期

  - Expires

    - 过期时间

  - Max-Age

    - 多少秒后过期

  - 过期则不会携带

- 作用域

  - Domain

    - 域名

  - Path

    - 路径

  - 域名和路径不匹配,则不会携带

- 安全相关

  - Secure

    - 只能通过 HTTPS 传递 Cookie

  - HttpOnly

    - 不允许 JS 操作 Cookie, 防御 XSS

  - SameSite

    - Strict

      - 禁止第三方请求携带 Cookie

    - Lax

      - 相对 Strict 要宽松一点, 允许 GET 提交表单, a 标签发送 GET 请求下携带 Cookie

    - None

      - 不做限制,

### 缺点

- 容量缺陷

  - Cookie 的体积上限只有 4KB，只能用来存储少量的信息。

- 性能缺陷

  - Cookie 紧跟域名，不管域名下面的某一个地址需不需要这个 Cookie ，请求都会携带上完整的 Cookie，这样随着请求数的增多，其实会造成巨大的性能浪费的，因为请求携带了很多不必要的内容。但可以通过 Domain 和 Path 指定作用域来解决。

## 如何理解 HTTP 代理？

### 什么是代理服务器

- 代理服务器是 客户端 和 源服务器 的中间人, 作为客户端的访问服务器, 传递客户端的访问到源服务器,就像网关,负责转发一样

### 代理服务器功能

- 负载均衡

  - 客户端的请求只会先到达代理服务器, 后面有多少源服务器, IP 多少, 客户端都不知道, 代理服务器拿到这个请求后, 通过特定算法,分发给不同的源服务器,让各个服务器的负载尽量平均, 例如: 随机算法, 轮训, 一致性 hash, LRU

- 保障安全

  - 1.利用心跳机制监控后台服务器, 一旦发现故障机,立刻将其提出集群
  - 2.对于非法 IP 限流

- 缓存代理

  - 将内容缓存到代理服务器, 是客户端可以直接从代理服务器获取资源

### 相关头部字段

- Via

      - 作用: 标记自己的身份
      - 发送流程: 客户端 -> 代理1 -> 代理2 -> 源服务器

  源服务器: Via: proxy_server1, proxy_server2 - 响应流程: 源服务器 -> 代理 2 -> 代理 1 -> 客户端
  客户端: Via: proxy_server2, proxy_server1

- X-Forwarded-For

      - 记录请求方的 IP 地址
      - 问题

      	- 记录请求方的 IP 地址, 那么每经过一层代理,字段值都要变,例如: 从客户端到代理1，这个字段是客户端的 IP，从代理1到代理2，这个字段就变为了代理1的 IP。
      	- 1. 代理必须解析 HTTP 请求头, 然后修改此字段
      	- 2.在 HTTPS 通信加密的过程中, 原始报文不允许修改

      - 解决

      	- 代理协议
      	- // PROXY + TCP4/TCP6 + 请求方地址 + 接收方地址 + 请求端口 + 接收端口

  PROXY TCP4 0.0.0.1 0.0.0.2 1111 2222
  GET / HTTP/1.1
  ...

- X-Real-IP

  - 记录最初的客户端真实 IP

- X-Forwarded-Host

  - 客户端域名

- X-Forwarded-Proto

  - 客户端协议

## 如何理解 HTTP 缓存及缓存代理？

### 浏览器缓存

- 强缓存
- 协商缓存
- 总结

  - 1.首先通过 Cache-Control 验证强缓存是否可用
  - 2.如果强缓存可用，直接使用
  - 3.否则进入协商缓存，即发送 HTTP 请求，服务器通过请求头中的 If-Modified-Since 或者 If-None-Match 这些条件请求字段检查资源是否更新

    - 若资源更新，返回资源和 200 状态码
    - 否则，返回 304，告诉浏览器直接从缓存获取资源

### 缓存代理

- why?

  - 如果每次客户端缓存失效,都去源服务器获取,无疑对源服务器的压力是很大的

- what?

  - 让 代理服务器 接管一部分服务端 HTTP 缓存, 客户端缓存失效以后,到就近的代理服务器中取, 代理缓存过期之后,才对源服务器进行请求,为源服务器降压

- 控制

  - 源服务器的缓存控制(响应头)

    - Cache-Control

      - private

        - 禁止代理服务器缓存

      - public

        - 允许代理服务器缓存

      - proxy-revalidate

        - 代理缓存过期,采取请求源

      - must-revalidate

        - 客户端缓存过期,必须去源获取

      - s-maxage

        - 缓存在代理服务器存放多久过期, 与客户端的 maxage 不冲突

  - 客户端的缓存控制(请求头)

    - max-stale(宽容处理)

      - 代理服务器的缓存过期多久,还阔以使用
      - max-stale: 5 已过期, 但时间小于五秒,就还是继续用

    - min-fresh(限制处理)

      - 代理服务器的缓存时间要大于 min-fresh 才能使用
      - min-fresh: 5 剩余过期时间小于五秒,就不用了

    - only-if-cached

      - 仅接受代理缓存, 如果代理缓存无效,则返回 504

## 什么是跨域？浏览器如何拦截响应？如何解决？

### 为啥有跨域?

- 1.浏览器为了安全,遵循 同源协议
- 2.同源协议

  - scheme(协议)、host(主机)和 port(端口) 都相同则为同源

- 3.非同源站点有这样一些限制

  - 不能读取和修改对方的 DOM
  - 不能访问对方的 Cookie, IndexDB 和 LocalStorage
  - 限制 XMLHttpRequest 请求

### 什么是跨域?

- 当浏览器向目标 URI 发 Ajax 请求时，只要当前 URL 和目标 URL 不同源，则产生跨域，被称为跨域请求。

### 浏览器如何拦截响应?

- 请求求正常发出, 在服务端处理完数据后，将响应返回，主进程检查到跨域，且没有 cors(后面会详细说)响应头，将响应体全部丢掉，并不会发送给渲染进程。这就达到了拦截数据的目的。

### 如何解决?

- CORS

      - 一个 W3C 标准, 全称: 跨域资源共享
      - 简单请求

      	- 什么是简单请求?

      		- 请求方法为 GET、POST 或者 HEAD
      		- 请求头的取值范围: Accept、Accept-Language、Content-Language、Content-Type(只限于三个值application/x-www-form-urlencoded、multipart/form-data、text/plain)

      	- 响应字段信息

      		- Access-Control-Allow-Origin 必须,决定是否拦截
      		- Access-Control-Allow-Credentials 是否携带 Cookie

      			- 需要 withCredentials 支持

      		- Access-Control-Expose-Headers 赋能,增加基础响应字段之外的响应头字段

      			- Access-Control-Expose-Headers: aaa
      			- XMLHttpRequest.getResponseHeader('aaa')

      	- 简单请求的处理

      		- 1.自动在请求头中添加 Origin 字段,说明来源,让服务器决定响应头
      		- 2.浏览器根据服务器返回的 Access-Control-Allow-Origin, 判断是否将响应拦截

      - 非简单请求

      	- 不是简单请求都会走这里
      	- 响应头字段信息

      		- Access-Control-Allow-Origin

      			- 表示可以允许请求的源，可以填具体的源名，也可以填*表示允许任意源请求。

      		- Access-Control-Allow-Methods

      			- 表示允许的请求方法列表。

      		- Access-Control-Allow-Credentials

      			- 是否允许携带 Cookie

      		- Access-Control-Allow-Headers

      			- 允许发送的请求头字段

      		- Access-Control-Max-Age

      			- 预检请求有效期

      	- 非简单请求处理

      		- 1. 发送 OPTIONS 预检请求

      			- OPTIONS / HTTP/1.1

  Origin: 当前地址
  Host: xxx.com
  Access-Control-Request-Method: PUT
  Access-Control-Request-Headers: X-Custom-Header

      		- 2. 预检响应

      			- 满足响应头条件,也就是服务器支持发送该请求

      				- 将真请求发出去,就和 简单请求 一样处理了

      			- 不满足响应头条件

      				- 触发 error 方法, 真正请求不会被发出去

- JSONP

  - script 标签不遵循同源策略

    客户端:
    const jsonp = ({ url, params, callbackName }) => {
    const generateURL = () => {
    let dataStr = '';
    for(let key in params) {
    dataStr += `${key}=${params[key]}&`;
    }
    dataStr += `callback=${callbackName}`;
    return `${url}?${dataStr}`;
    };
    return new Promise((resolve, reject) => {
    // 初始化回调函数名称
    callbackName = callbackName || Math.random().toString.replace(',', '');
    // 创建 script 元素并加入到当前文档中
    let scriptEle = document.createElement('script');
    scriptEle.src = generateURL();
    document.body.appendChild(scriptEle);
    // 绑定到 window 上，为了后面调用
    window[callbackName] = (data) => {
    resolve(data);
    // script 执行完了，成为无用元素，需要清除
    document.body.removeChild(scriptEle);
    }
    });
    }
    服务器:
    let express = require('express')
    let app = express()
    app.get('/', function(req, res) {
    let { a, b, callback } = req.query
    console.log(a); // 1
    console.log(b); // 2
    // 注意哦，返回给 script 标签，浏览器直接把这部分字符串执行
    res.end(`${callback}('数据包')`);
    })
    app.listen(3000)

- Nginx

  - ng 服务是和客户端同源, 转发到对应服务器即可,后端之间不存在跨域
  - tips:

    - 正向代理

      - 帮助客户端访问客户端自己访问不到的服务器，然后将结果返回给客户端。

    - 反向代理

      - 拿到客户端的请求，将请求转发给其他的服务器，主要的场景是维持服务器集群的负载均衡，换句话说，反向代理帮其它的服务器拿到请求，然后选择一个合适的服务器，将请求转交给它。

## HTTPS

### 为什么需要 HTTPS

- HTTP 是明文传输协议, 报文完全透明, 非常不安全

### 什么是 HTTPS

- HTTPS 不是一个新协议, 而是在 HTTP 下面增加了一层 SSL/TLS 协议(安全套接层), 位于 OSI 七层模型中的第五层,会话层
- HTTPS = HTTP + SSL/TLS

### TLS1.2 握手的过程是怎样的？

- 过程

  - 1.  浏览器发送 client_random, TLS 版本, 加密套件列表到服务器

    - client_random: 用来生成 secret 最终加密的一个参数
    - 加密套件列表: TLS_ECDHE_WITH_AES_128_GCM_SHA256

      - 意思是 TLS 握手过程中，使用 ECDHE 算法生成 pre_random(这个数后面会介绍)，128 位的 AES 算法进行对称加密，在对称加密的过程中使用主流的 GCM 分组模式，因为对称加密中很重要的一个问题就是如何分组。最后一个是哈希摘要算法，采用 SHA256 算法

  - 2.服务器回复 server_random, server_params, 确认 TLS 版本,使用加密套件列表,服务器使用的证书

    - server_random: 最后生成 secret 的一个参数
    - server_params: 椭圆曲线的公钥

  - 3.客户端验证服务器 证书 和 签名 是否通过, 通过则传递 client_params 给服务器, 然后使用 ECDHE 算法,传入参数 server_params, client_params, 生成 pre_random, 然后客户端将 client_random, server_random, pre_random 通过为随机函数生成最终 secret

    - 由于 ECDHE 基于椭圆曲线离散对数，这 server_pramas, client_params, 两个参数也称作椭圆曲线的公钥。

  - 4.服务器根据客户端传递的 clint_params, 加上自己的 server_params, 生成 pre_random, 然后和客户端采用同样的伪随机函数,生成 secret

- 注意:

  - 1.TLS 是双向认证过程
  - 2.客户端和服务端在生成 secret 之后都会发送一个收尾消息, 通知后面采用对称加密传输

    - 收尾消息包括两部分

      - 1.  Change Cipher Spec 后面加密传输
      - 2.  Finished 对之前发送的数据进行摘要, 对摘要进行加密,让对方验证一下

  - 3.双方都验证通过之后, 握手才正式结束, 后面的 HTTP 正式采用加密报文

### TLS 1.3 做了哪些改进？

- 1. 强化安全

  - 废除多余加密算法,仅留下五个加密套件
  - 加密套件

    - TLS_AES_128_GCM_SHA256
    - TLS_AES_256_GCM_SHA384
    - TLS_CHACHA20_POLY1305_SHA256
    - TLS_AES_128_GCM_SHA256
    - TLS_AES_128_GCM_8_SHA256

- 2.提升性能

  - 1.握手改进(1-RTT)

    - 第一次就传递 client_params, 不必等待返回验证

  - 2.会话复用(节省生成密钥的算法消耗 1-RTT)

    - Session ID

      - 做法: 连接后,双方均存放 ID, 然后再次连接传递 ID,存在则直接使用之前的会话状态
      - 缺点: 服务器存储压力大

    - Session Ticket

      - 做法: 服务器加密会话信息,给客户端存放, 下次重连, 服务器解密验证时效,判断是否恢复会话状态
      - 缺点: 安全问题,密钥破解会破解历史记录, 需要定期更换密钥

  - 3.PSK ( Pre-Shared Key, 0-RTT)

    - 做法: 服务端在发送 Session Ticket 的同时携带应用数据,就不用在请求获取,不用等到服务端确认
    - 缺点: 安全问题, PSK 被截获,不断向服务器重发,类似于 TCP 第一次握手携带数据，增加了服务器被攻击的风险。

## HTTP/2 有哪些改进？

### 1.头部压缩

- 采用 哈夫曼编码, 在客户端和服务端建立一张哈希表

  - 哈夫曼编码:不定长编码
  - 会让出现次数多的请求头尽可能出现在表的上面,这样编码长度也会更短

- 传递的时候只传递索引序列, 对方拿到只需要查表即可, 达到非常高的压缩率
- tips: 在 HTTP/2 废除了起始行的概念,将起始行中的方法,URI,状态码转换成了头字段, 用 ":" 前缀,用来跟别的请求头区分

### 2.多路复用

- 什么是多路复用?

  - 通信双方都可以给对方发送二进制帧, 这种二进制帧是 双向传输的序列, 也叫做 流(Stream). HTTP/2 用流在一个 TCP 连接上进行多个数据帧的通信, 这就是 多路复用 的概念.

- 作用: 解决了 HTTP 队头阻塞的问题
- 如何解决的?

  - 二进制分帧

    - 1.不用 HTTP1.1 的文本格式传输, 采用二进制格式传输,方便机器解析
    - 2.用 Headers 帧存放头部字段, 用 Date 帧 存放请求体数据
    - 3.分帧之后,服务器接收的就是乱序的二进制帧,二进制帧不存在先后关系, 所以也就不会排队等待, 也就没有了 队头阻塞 问题.

- 二进制帧的 "乱序"

  - 1.  乱序值得是不同 ID 的 Stream 是乱序的, 同一个 Stream ID 的帧是通过一定顺序进行传输的
  - 2.二进制帧到达之后, 双方会将同一个 Stream ID 的二进制帧组装成为完整的请求报文,响应报文.

### 3.设置请求优先级

### 4.服务器推送(Server Push)

- HTTP/2 是一个双向传输的序列, 服务器不用被动的接受请求,响应请求, 可以自己新建 Stream 给客户端发送消息
- 例如: 在 TCP 连接建立之后, 比如浏览器请求一个 HTML 文件, 服务器可以再返回 HTML 的基础上,将 HTML 中引用的其他资源一起返回给客户端,减少客户端等待

## HTTP/2 中的二进制帧是如何设计的？

### 每一帧分为 帧头 和 帧体

- 帧头

  - 帧长度: 3 字节 ,也就是帧体的长度
  - 帧类型

    - 数据帧: 存放 HTTP 报文
    - 控制帧: 控制管理 流 的传输

  - 帧标志: 八个标志位

    - 常用的有

      - END_HEADERS: 头数据结束
      - END_STREAM: 单方向数据结束

  - 流标识符 (Stream ID): 4 个字节

    - 有了标识符, 才能在乱序的二进制帧中找出相同 ID 的帧,组装请求/响应报文

- 帧体

  - 用于存放实际传输数据,也就是 Date 帧

### 流的状态变化

- 1.客户端发送 Headers 帧之后, 开始分配 Stream ID, 此时客户端的 流 打开, 服务端接收之后 流 也打开, 然后就可以互相传递数据帧和控制帧了
- 2.客户端传输完毕,要关闭的时候, 向服务端发送 END_STREAM 帧, 进入半关闭状态, 这个时候只能接收不能发送
- 3.服务端接收到 END_STREAM 帧之后,也进入 半关闭状态, 只能发送不能接收
- 4.服务端传输完毕,想客户端发送 END_STREAM 帧, 表示传输完毕, 然后双方均进入关闭状态
- 如果要开启下一个 流, 流 ID 需要自增,直到上线位置, 到上限之后开一个新的 TCP 连接重头开始处理, 流 ID 字段长度为 4 字节,也就是 32 位,最高位保留, 所以范围是 0~2 的 31 次方,约 21 亿个

### 流的特性

- 1.并发性: 一个 HTTP/2 连接可以同时发送多个帧, 这是多路复用的基础
- 2.自增行: 流 ID 不可复用,会按顺序递增,到达上线之后开启新的 TCP 连接从头开始
- 3.双向性: 客户端和服务端都可以创建流,互不干扰
- 4.可设置优先级: 可以设置数据帧的优先级,让服务端优先处理重要资源,优化用户体验
