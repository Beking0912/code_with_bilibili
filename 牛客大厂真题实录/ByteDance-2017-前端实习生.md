### 下面标签嵌套正确的是
- [ ] `<ul><p>牛客网</p></ul>`
- [ ] `<a href="#"><a href="#">牛客网</a></a>`
- [ ] `<dl><li>牛客网</li></dl>`
- [x] `<ol><li>牛客网</li></ol>`

  解析：`ul`只能紧挨着`li`；`a`中不能再嵌套`a`；`dl` `dt`；`ol` `li`是有序排列

### 下面哪些是HTML5 新增的表单元素？
- [x] `datalist`
- [ ] `optgroup`
- [x] `output`
- [ ] `legend`

  解析：`datalist`规定输入域的选项列表，通过`option`创建！ `keygen`提供一种验证用户的可靠方法，密钥对生成器，私钥存于客户端，公钥发到服务器，用于之后验证客户端证书！ `output`元素用于不同类型的输出！

### 在HTML中，（ ）可以在网页上通过链接直接打开邮件客户端发送邮件。
- [ ] `<a href=”telnet:ming.zhou@nowcoder.com”>发送邮件</a>`
- [ ] `<a href=”mail:ming.zhou@nowcoder.com”>发送邮件</a>`
- [x] `<a href=”mailto:ming.zhou@nowcoder.com”>发送邮件</a>`
- [ ] `<a href=”ftp:ming.zhou@nowcoder.com”>发送邮件</a>`

### 请选出所有的置换元素（）
- [x] `img`
- [x] `input`
- [x] `textarea`
- [x] `select`

  解析：html中 的`<img>`、`<input>`、`<textarea>`、`<select>`、`<object>` 都是置换元素。这些元素往往没有实际的内容，即是一个空元素。

### 下面哪条声明能固定背景图片（）
- [x] `background-attachment:fixed;`
- [ ] `background-attachment:scroll;`
- [ ] `background-origin: initial;`
- [ ] `background-clip: initial;`

  解析：`background-attachment`有三个值:
  1. scroll是默认值，背景图像会随着页面其余部分的滚动而移动。
  2. fixed当页面的其余部分滚动时，背景图像不会移动。
  3. inherit规定应该从父元素继承 `background-attachment` 属性的设置。
  - `background-origin` 属性规定 `background-position` 属性相对于什么位置来定位。
  - `background-clip` 属性规定背景的绘制区域。

### 下列说法正确的是（）
- [x] `display: none;`不为被隐藏的对象保留其物理空间；
- [x] `visibility:hidden;`所占据的空间位置仍然存在,仅为视觉上的完全透明；
- [ ] `visibility:hidden;`产生reflow和repaint(回流与重绘)；
- [ ] `visibility:hidden;`与`display: none;`两者没有本质上的区别；

    解析：`display: none`和`visibility:hidden`的区别就是`visibility:hidden`会保留元素的空间

    `repaint`(重绘) ，`repaint`发生更改时，元素的外观被改变，且在没有改变布局的情况下发生，如改变`outline`,`visibility`,`background color`，不会影响到dom结构渲染。

    `reflow`(渲染)，与`repaint`区别就是他会影响到dom的结构渲染，同时他会触发`repaint`，他会改变他本身与所有父辈元素(祖先)，这种开销是非常昂贵的，导致性能下降是必然的，页面元素越多效果越明显。

    所以`display:none`才会产生`reflow`

    `visibility:hidden`只会出发`repaint`

### 以下关于盒子模型描述正确的是：
- [x] 标准盒子模型中：盒子的总宽度 ＝ 左右`margin` + 左右`border` + 左右`padding` + `width`
- [ ] IE盒子模型中：盒子总宽度 ＝ 左右`margin` + 左右`border` + `width`
- [ ] 标准盒子模型中：盒子的总宽度 ＝ 左右`margin` + 左右`border` + `width`
- [ ] IE盒子模型中：盒子总宽度 ＝ `width`

    解析:标准盒子模型 ＝ `margin` + `border` + `padding` + `content` （`content` =  `width` | `height`）
    IE盒子模型 ＝ `margin` + `content` （`content` = `border` + `padding` + `width` | `height`）

### 下面哪个属性不会让 div 脱离文档流（normal flow）？
- [ ]  `position: absolute;`
- [ ]  `position: fixed;`
- [x]  `position: relative;`
- [ ]  `float: left;`

解析:
A：`position: absolute;`生成绝对定位的元素，相对于 `static` 定位以外的第一个父元素进行定位；都绝对定位了，肯定脱离了文档流。。

B:`position: fixed;`生成绝对定位的元素，相对于浏览器窗口进行定位;相对于浏览器了，也和正常顺序排下来没什么关系。。

C:`position: relative;`生成相对定位的元素，相对于其正常位置进行定位。生成相对定位，也就是说还在原本的上下左右之间，上下左右的元素都不变，so这个没有能脱离文档流。。就这个了

D:`float: left;`都浮动出去了，还上哪保持原位置去。

### 英文字母全部转为大写正确的是（）
- [ ]   `text-transform: capitalize;`
- [ ]   `text-transform: lowercase;`
- [x]   `text-transform: uppercase;`
- [ ]   `font-weight: bold;`

### 假设在今日头条里面,有很多工作人员检查新闻是不是属于虚假新闻,所有新闻真实率到达了98%,工作人员在检验一个真实的新闻把它检验为一个虚假的新闻的概率为2%,而一个虚假的新闻被检验为真实的新闻的概率为5%.那么,一个被检验为真实的新闻确实是真实的新闻的概率是多大?
- [ ] 0.9991
- [x] 0.9989
- [ ] 0.9855
- [ ] 0.96

  解析:假设总共100个新闻，那么真实新闻为98个，虚假新闻为2个，检验为真实的新闻 总个数为真实的检验为真实的 和虚假的检验为真实的 之和：98x(1-2%)+2x5%=96.14个，其中检验为真实的真实新闻个数即是真实的检验为真实的 个数：98x(1-2%)=96.04个，所以其真实概率为96.04/96.14=0.9989

### 现在有两堆石子,小今与小条玩游戏,2个人都足够聪明,两个人规定:每次每人只能从其中一堆中取走1个或2个或3个石子,最后将石子全部取完的人胜利.现在两堆石子的个数为8和9,请问如何安排才能让小今必胜?
- [x]  让小今先取
- [ ]  让小条先取
- [ ]  没有策略能够让小今必胜
- [ ]  以上说法都不正确

    解析：首先要明白一点，只要是去取得时候正好的4的倍数，取得那个人就输了，比如4，不管取走几个，剩下的都可以直接拿走；再比如8，不管取走几个，另一个人拿的时候都可以给对方留下4个，所以只要给对方留下4的倍数，对方就输了

    所以，小今先去取9个的那一堆拿走一个，接下来小条去哪堆取，小今也去哪堆取，根据小今取得个数，给小条留下4的倍数(实际问题是4个)就行了

### 以下描述正确的：
- [ ] Http协议所使用的运输层协议是UDP
- [x] Https的端口号是443
- [x] TCP注重数据可靠性，UDP注重数据传输快
- [x] 传输层提供端到端的可靠报文传递和错误恢复

表toutiao_tb
| title | data | auther | type |
| --- | --- | --- | --- |
| abc | 2016.2.23 | bob | 1 |
| bcv | 2016.3.3 | http | 1 |
| cvt | 2016.3.3 | http | 1 |
| bcvvcm | 2016.3.5 | js | 2 |
| nmhh | 2016.2.3 | html | 2 |
| hhj | 2016.3.3 | java | 3 |
| rrr | 2016.3.2 | cc | 1 |
查询title中包含cv且type是1的记录
- [ ] `select * from toutiao_tb where title = 'cv' and type='1'`
- [x] `select * from toutiao_tb where title like '%cv%' and type=1`
- [ ] `select * from toutiao_tb where title like '*cv' and type=1`
- [ ] `select * from toutiao_tb where title ='*cv*' and type='1‘`

### 下列关于操作系统进程与线程的区别正确的是：
- [x]  进程是资源分配的基本单位
- [ ] 线程是资源分配的基本单位
- [ ] 进程是资源调度的基本单位
- [x]  线程是资源调度的基本单位

### 下面那个页面调度算法,当进程分配到的页面数增加时,缺页中断的次数可能增加也可能减少
- [x]  FIFO算法
- [ ] LRU算法
- [ ] Clock算法
- [ ] LFU算法

### 下列排序算法不稳定的有?
- [ ] 插入排序
- [x] 希尔排序
- [ ] 冒泡排序
- [x] 堆排序
- [ ] 归并排序
- [x] 快速排序
- [x] 选择排序

    解析:
    不稳定：快选堆希；稳定：插冒归基

### 运行以下程序
```html
<script> 
    var m= 1, j = k = 0; 
    function add(n) { 
        return n = n+1; 
　 } 
    y = add(m); 
    function add(n) { 
        return n = n + 3; 
    } 
z = add(m); 
</script> 
```
### y和z的最终结果为:
- [ ] 2,4
- [x] 4,4
- [ ] 2,2
- [ ] 报异常

    解析：js里面没有函数重载的概念，在其他语言中（如java）java中，可以存在同名函数，
    只要传入的参数数量或者类型不同即可。在js中，定义了两个同名函数后，
    后面的函数会覆盖前面定义的函数。结合这道题来说，由于函数声明提升，
    所以函数声明会提前，由于存在同名函数，后面的add函数将覆盖第一个add函数，
    所以两次调用add()返回的值是相同的。也就是y,z都为4.


```js
(function() {
      var a = b = 5;
  })();   
console.log(b);
console.log(a);
```
### 上面的输出结果:
- [ ] 5，5
- [ ] undefined，undefined
- [ ] 5，undefined
- [x]  5，Uncaught ReferenceError: a is not defined

    解析:第一个考点在于var a=b=5相当于拆解成var a=b; b=5; 然后，b=5前面没有var，相当于声明为全局变量（这种方式在严格模式下会报错，此题不考虑)。所以就相当于： 
    ```js
    var b; 
    (function{ var a=b; b=5; })(); console.log(b); //5 
    console.log(a); //报错 
    ```

    此处报错也就是另一个考点，a声明的是函数的局部变量，在函数结束是就销毁了，所以在全局下找不到a，于是报错。 

### 页面有一个按钮button id为 button1，通过原生的js如何禁用？(IE 考虑IE 8.0以上版本)
- [ ] `document.getElementById("button1").readolny= true;`
- [ ] `document.getElementById("button1").setAttribute(“readolny”,”true”);`
- [x] `document.getElementById("button1").disabled = true;`
- [x] `document.getElementById("button1").setAttribute(“disabled”,”true”);`

### 页面有一个按钮button id为 button1，通过原生的js 设置背景色为红色？
- [x] `document.getElementById('button1').style.backgroundColor="red";`
- [ ] `document.getElementById('button1').style.backgroundcolor="red";`
- [ ] `document.getElementById('button1').style.backGroundColor="red";`
- [ ] `document.getElementById('button1').style.bgcolor="red";`

