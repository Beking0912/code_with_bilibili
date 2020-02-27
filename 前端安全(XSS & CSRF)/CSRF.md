# CSRF (Cross Site Request Forgery) 跨站请求伪造
- 攻击者盗用用户身份(登陆状态) 以用户的名义发送恶意请求
- 防御：
1. 尽量使用 POST  (但不可避免攻击者利用 iframe 伪造 form 提交表单)
2. 加入验证码
3. 验证 refer  (若请求不是指定网站发起的 就直接拒绝 但 refer 可能伪造或篡改)
4. anti CSRF token  (在 form 表单或头信息中加入随机产生的 token 这个 token 会存储在服务端 服务端通过拦截器验证有效性 校验失败的拒绝请求)
5. 加入自定义 header  (自定义 header 也可以随机产生 token)