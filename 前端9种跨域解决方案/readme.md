## 跨域(非同源策略请求)
- 同源策略请求 ajax/fetch
- 跨域传输

协议 域名 端口 三者都一直就是同源 有一个不同就是跨域

## JSONP
必要条件：
1. 使用没有跨域请求限制的标签 script img link iframe
2. func 必须是全局函数
3. 需要服务端支持 JSONP

流程：
1. 客户端向服务器发起请求 同时会把本地一个函数传递给服务器
2. 服务器接收请求 同时拿到callback=func
3. 服务器准备数据 给客户端返回数据 字符串'fun('+JSON.stringify(data'+)'
4. 浏览器把字符串作为js执行

问题：
1. JSONP 只能处理 GET 请求
2. 安全性差


## CORS 跨域资源共享
流程：
1. 客户端发送 ajax/fetch 请求
2. 服务器设置相关的头信息 需要处理 options 试探性请求

问题：
1. 服务器源只能写一个 若写 * 则不能允许携带 cookie


## http proxy + webpack webpack-dev-server
