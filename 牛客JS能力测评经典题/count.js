/**
 * 实现一个打点计时器，要求：
 *
 * 1、从 start 到 end（包含 start 和 end），每隔 100 毫秒 console.log 一个数字，每次数字增幅为 1
 * 2、返回的对象中需要包含一个 cancel 方法，用于停止定时操作
 * 3、第一个数需要立即输出
 * 
 * setInterval() 按照指定周期不停地调用函数，直到 clearInterval() 被调用或窗口被关闭。
 * 由 setInterval() 返回的 ID 值可用作 clearInterval() 方法的参数。
 * 注意第一个数需要立即输出即可。
 */

function count(start, end) {
  //立即输出第一个值
  console.log(start++);
  var timer = setInterval(function() {
    if (start <= end) {
      console.log(start++);
    } else {
      clearInterval(timer);
    }
  }, 100);
  //返回一个对象
  return {
    cancel: function() {
      clearInterval(timer);
    }
  };
}
