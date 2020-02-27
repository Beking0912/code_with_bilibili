# transition 动画
1. transition-property  设置过度效果的css属性
- 取值：none | all | property
- 示例：transition-property: width; 过度宽度变化

2. transition-duration  完成过度需要的时间
- 取值：ns | ms  默认0
- 示例：transition-duration: 1s;

3. transition-timing-function  速度曲线
- 取值：linear | ease | ease-in | ease-out | ease-in-out | cubic-bezier(n,n,n,n)
- 示例：transition: all 4s ease-in; 渐出
- 属性：steps(步骤数, 第一个步骤是否占一帧)
- 示例：transition-timing-function: steps(3, start);  开始值占一帧

4. transition-delay  开始时间
- 取值：ns | ms  默认0
- 示例：transition: all 4s ease 1s;  一秒钟后触发效果

# transform 变换动画
- transform: none | transform-functions;
- transform-functions:
1. translate(x, y)       2D转换
- 示例：transform: translate(100px, 100px);  向右100px 向下100px
  
2. translate3d(x, y, z)  3D转换

3. scale(x, y)           2D缩放
- 示例：transform: scale(1.5);  宽高放大1.5倍

4. scale3d(x, y, z)      3D缩放

5. rotate(angle)         旋转
- 示例：transform: rotate(45deg);  向右向下旋转45度

6. skew(x, y)            2D倾斜变换
- 示例：skew(-20deg, 0);  x轴向左倾斜20度 y轴不变

7. perspective(n)        透视视图
- 取值：number | none
- 示例：transform: perspective(100px) rotateY(40deg); 倾斜

8. none                  无变化