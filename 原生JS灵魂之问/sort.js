/**
 * v8 引擎的思路分析：
 *
 * 当 n<=10 时采用插入排序
 * 当 n>10 时采用三路快速排序
 *   10<n<=1000 采用中位数作为哨兵元素
 *   n>1000 每隔 200~215 个元素挑出一个元素放到新数组，然后对它排序，找到中间位置的数，以此作为中位数
 *
 *
 * 需要搞清楚的问题：
 *
 * 第一：为什么元素个数少的时候要采用插入排序？
 *
 * 插入排序 O(n^2)  快速排序 O(nlogn)
 * 在实际情况中两者的算法复杂度前面都会有一个系数的，当n足够小的时候，快读排序 nlogn 的又是会越来越小
 * 倘若插入排序 O(n^2) 前面的系数足够小，那么就会超过快排
 * 而事实上正是如此，插入排序经过优化以后对于小数据集的排序会有非常优越的性能，很多时候甚至会超过快排
 * 因此，对于很小的数据量，应用插入排序是一个不错的选择
 *
 * 第二：为什么要花这么大力气选择哨兵元素？
 *
 * 因为快速排序的性能瓶颈在于递归的深度，最坏的情况是每次哨兵都是最小元素或者最大元素
 * 那么进行 partition (一边是小于哨兵的元素，一边是大于哨兵的元素)时，就会有一边是空的
 * 这么排下去，递归的层数就达到了n，而每一层的复杂度是 O(n)
 * 因此快排这时候会退化成 O(n^2) 级别
 *
 * 如何避免以上情况？
 *
 * 就是让哨兵元素尽可能地处于数组的中间位置，让最大或最小的情况尽可能少
 */

const sort = (arr, comparefn) => {
  let array = Object(arr);
  let length = array.length >>> 0;
  return InnerArraySort(array, length, comparefn);
};

const InnerArraySort = (array, length, comparefn) => {
  // 比较函数未传入
  if (Object.prototype.toString.call(comparefn) !== "[object Function]") {
    comparefn = function(x, y) {
      if (x === y) return 0;
      x = x.toString();
      y = y.toString();
      if (x == y) return 0;
      else return x < y ? -1 : 1;
    };
  }
  const insertSort = (arr, start = 0, end) => {
    end = end || arr.length;
    for (let i = start; i < end; i++) {
      let e = arr[i];
      let j;
      for (j = i; j > start && comparefn(arr[j - 1], e) > 0; j--)
        arr[j] = arr[j - 1];
      arr[j] = e;
    }
    return;
  };
  const getThirdIndex = (a, from, to) => {
    let tmpArr = [];
    // 递增量，200~215 之间，因为任何正数和15做与操作，不会超过15，当然是大于0的
    let increment = 200 + ((to - from) & 15);
    let j = 0;
    from += 1;
    to -= 1;
    for (let i = from; i < to; i += increment) {
      tmpArr[j] = [i, a[i]];
      j++;
    }
    // 把临时数组排序，取中间的值，确保哨兵的值接近平均位置
    tmpArr.sort(function(a, b) {
      return comparefn(a[1], b[1]);
    });
    let thirdIndex = tmpArr[tmpArr.length >> 1][0];
    return thirdIndex;
  };

  const _sort = (a, b, c) => {
    let arr = [];
    arr.push(a, b, c);
    insertSort(arr, 0, 3);
    return arr;
  };

  const quickSort = (a, from, to) => {
    //哨兵位置
    let thirdIndex = 0;
    while (true) {
      if (to - from <= 10) {
        insertSort(a, from, to);
        return;
      }
      if (to - from > 1000) {
        thirdIndex = getThirdIndex(a, from, to);
      } else {
        // 小于1000 直接取中点
        thirdIndex = from + ((to - from) >> 2);
      }
      let tmpArr = _sort(a[from], a[thirdIndex], a[to - 1]);
      a[from] = tmpArr[0];
      a[thirdIndex] = tmpArr[1];
      a[to - 1] = tmpArr[2];
      // 现在正式把 thirdIndex 作为哨兵
      let pivot = a[thirdIndex];
      [a[from], a[thirdIndex]] = [a[thirdIndex], a[from]];
      // 正式进入快排
      let lowEnd = from + 1;
      let highStart = to - 1;
      a[thirdIndex] = a[lowEnd];
      a[lowEnd] = pivot;
      // [lowEnd, i)的元素是和pivot相等的
      // [i, highStart) 的元素是需要处理的
      for (let i = lowEnd + 1; i < highStart; i++) {
        let element = a[i];
        let order = comparefn(element, pivot);
        if (order < 0) {
          a[i] = a[lowEnd];
          a[lowEnd] = element;
          lowEnd++;
        } else if (order > 0) {
          do {
            highStart--;
            if (highStart === i) break;
            order = comparefn(a[highStart], pivot);
          } while (order > 0);
          // 现在 a[highStart] <= pivot
          // a[i] > pivot
          // 两者交换
          a[i] = a[highStart];
          a[highStart] = element;
          if (order < 0) {
            // a[i] 和 a[lowEnd] 交换
            element = a[i];
            a[i] = a[lowEnd];
            a[lowEnd] = element;
            lowEnd++;
          }
        }
      }
      // 永远切分大区间
      if (lowEnd - from > to - highStart) {
        // 单独处理小区间
        quickSort(a, highStart, to);
        // 继续切分lowEnd ~ from 这个区间
        to = lowEnd;
      } else if (lowEnd - from <= to - highStart) {
        quickSort(a, from, lowEnd);
        from = highStart;
      }
    }
  };
  quickSort(array, 0, length);
};
