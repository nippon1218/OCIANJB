## http服务与request

#### http服务器
简短的分析一下server.js打造的http服务器。

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
- 1 请求模块
```javascript
let http = require("http");
```
> 请求node.js自带的http模块，并将其赋值给变量http

- 2 创建函数
``` javascript
function start() {
    ....
}
```
> 创建函数，名称为start, 等下会将该函数暴露出去，供index.js调用

- 3 调用http模块内置函数createServer,
```javascript
http.createServer( ... ).listen(8800);
```

该写法等价于,相信这个很好理解：  
```javascript
let http = require("http");
let server = http.createServer( ... );
server.listen(8800);
```

**http.createServer([options][, requestListener])**, requestListener是一个函数, 具体用法可以参考[htttp.createServer用法](https://nodejs.org/dist/latest-v12.x/docs/api/http.html#http_http_createserver_options_requestlistener)。

```server.listen(8800)```这段代码的功能是侦听8800端口的服务器

- 4 实现http.createServer中的requestListener匿名函数
```javascript
function(request, response) {
      response.writeHead(200, {"Content-Type": "text/plain"});
      response.write("Hello world");
      response.end();
}
```
> 我们通过向http.createServer()传递匿名函数的方式，告诉了http.createServer()创建出来的结果，你在侦听某个端口服务的时候，当该服务端接受到http请求时，请按我这个函数说的去做！！这个就跟C/C++语言里面的回调函数一样。

> 当端口有请求发生，匿名回调函数被执行，该函数有2个参数：request 和 response。
和字面表述一样，request 是请求的url细节, respond是响应的结果。
response.writeHead() 函数用来发送填充response的头，response.write()函数用来完成响应结果的主体部分，最后调用response.end()函数完成响应。

- 4 使用exports创建最近的模块
> 最后添上exports.start();就可以将模块导出，在index.js中使用 ` require("./server") ` 就可以使用该自制模块了。

#### request 


