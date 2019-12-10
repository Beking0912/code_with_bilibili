## [编程题]手串
作为一个手串艺人，有金主向你订购了一条包含n个杂色串珠的手串——每个串珠要么无色，要么涂了若干种颜色。为了使手串的色彩看起来不那么单调，金主要求，手串上的任意一种颜色（不包含无色），在任意连续的m个串珠里至多出现一次（注意这里手串是一个环形）。手串上的颜色一共有c种。现在按顺时针序告诉你n个串珠的手串上，每个串珠用所包含的颜色分别有哪些。请你判断该手串上有多少种颜色不符合要求。即询问有多少种颜色在任意连续m个串珠中出现了至少两次。

### 输入描述:
第一行输入n，m，c三个数，用空格隔开。(1 <= n <= 10000, 1 <= m <= 1000, 1 <= c <= 50) 接下来n行每行的第一个数num_i(0 <= num_i <= c)表示第i颗珠子有多少种颜色。接下来依次读入num_i个数字，每个数字x表示第i颗柱子上包含第x种颜色(1 <= x <= c)

### 输出描述:
一个非负整数，表示该手链上有多少种颜色不符需求。

### 输入例子1:
```
5 2 3
3 1 2 3
0
2 2 3
1 2
1 3
```

### 输出例子1:
2

### 例子说明1:
第一种颜色出现在第1颗串珠，与规则无冲突。
第二种颜色分别出现在第 1，3，4颗串珠，第3颗与第4颗串珠相邻，所以不合要求。
第三种颜色分别出现在第1，3，5颗串珠，第5颗串珠的下一个是第1颗，所以不合要求。
总计有2种颜色的分布是有问题的。 
这里第2颗串珠是透明的。

```js
// 初始化串珠总个数，连续的串珠个数，颜色种类数，所有串珠的颜色信息数组, 同一颜色的串珠数组, 不合格的颜色个数
let ballNums, linkNums, colorNums, ballColor = [], sameColorBall = [], count = 0;
[ballNums, linkNums, colorNums] = readline().split(' ').map(item => Number(item));
  
// 依次保存每个串珠所用颜色信息
// 数组的每个元素都是一个数组，元素数组的第一位代表颜色个数，后续代表所用颜色
for(let i = 0; i < ballNums; ++i) {
    ballColor[i] = readline().split(' ').map(item => Number(item))
}
  
// 将同一颜色出现的串珠序号进行收集
ballColor.forEach((item, index) => {
    // 若该串珠所用颜色种类大于0
    // console.log(item, 'item');
    if(item[0] > 0) {
        let colorArr = item.slice(1)
        // 下面的item代表不同的颜色种类
        colorArr.forEach(color => {
            // 如果之前已经保存过使用某颜色的串珠序号，则直接将其添加到数组中去
            if(sameColorBall[color]) {
                sameColorBall[color].push(index + 1)
            } else {
               sameColorBall[color] = [index + 1]
            }
        })
    }
     
})
sameColorBall.forEach(item => {
    // sameColorBall[0]代表使用‘0’这种颜色的所有串珠的序号数组,这里的序号是按顺序排列的
    for(let i = 0; i < item.length - 1; ++i) {
        if(item[i+1] - item[i] < linkNums) {
            ++count;
            break;
        }
        if(ballNums - item[item.length - 1] + item[0] < linkNums) {
            ++count;
            break;
        }
    }
})
 
console.log(count);
```