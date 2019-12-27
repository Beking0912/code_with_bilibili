const Func = function(name) {
    return "I Love " + name;
};
// 换成
const Func = name => "I Love " + name;

// 只能用于单语句返回值箭头函数，如果返回值是对象必须使用()包住