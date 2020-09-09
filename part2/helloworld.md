## 第一个应用 : 搭建最简单的http服务器实现helloworld
[TOC]

### 1 使用node.js 执行hello_world.js脚本
- 创建helloworld.js文件，在文件中输入以下内容: 
    ```javascript
    console.log("hello world");
    ```

- 使用node.js来执行该文件
    ```node.js
    node helloworld.js
    ```
> 这个例子告诉我们js文件通过node打开当方法就是使用node + js文件名
> 下面介绍更加"有用"的hello world实现方案,使用http模块的方式实现

### 2 使用http模块实现hello world 
#### 目标
- 用户通过浏览器访问http://localhost:8800时可以看到一个显示hello wrold的网页文件

#### http模块介绍
- 我们需要建立一个简易的web server, 所以需要使用HTTP服务器，这里可以使用http模块
- [http模块官方api文档](https://nodejs.org/dist/latest-v12.x/docs/api/http.html)

#### 代码结构 
> 首先要确定一下代码的结构，自然不希望把所有的代码逻辑都放到一个js文件下(虽然这么做初学阶段也是可以的,但还是尽量规范一些), 把不同功能的代码放到不同的模块中，保持代码的相互隔离和逻辑层次是非常重要的，既保证了可读性，也保证了可扩展性。

> 在web中一般习惯上把主文件叫做index，Node.js将仅仅执行它，在index.js中调用其他模块, 比如说server.js, server.js 负责服务端逻辑的实现. 

### 正式写代码:
- 1 创建server.js文件, 输入以下代码:

```javascript
var http = require("http");

http.createServer(function(request, response) {
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("hello world");
    response.end();
}).listen(8800);

```
> 可以使用```node server.js```启动server，在浏览器中输入:localhost:8800,如果正确将会出现hello world.

- 2 修改server.js成模块
我们希望将server.js作为一个模块，使用**export**可以将其输出.
将server.js文件作出如下修改。

```javascript
let http = require("http");

function start() {
    http.createServer(function(request, response) {
      response.writeHead(200, {"Content-Type": "text/plain"});
      response.write("Hello world");
      response.end();
    }).listen(8800);
}

exports.start = start
```

- 3 创建index.js文件
在index文件中我们希望使用server.js文件中创建的server，使用**require**可以将其引用进来.
在index.js文件中添加以下代码:

```javascript
let server = require("./server");

server.start()
```

### 验证
执行```node index.js```，在浏览器输入[:localhost:8800](http://localhost:8800),观察效果

