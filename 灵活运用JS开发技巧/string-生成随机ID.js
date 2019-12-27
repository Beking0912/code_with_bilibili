const RandomId = len => Math.random().toString(36).substr(3, len);
const id = RandomId(10);
// id => "jg7zpgiqva"

/**
 * 理解：Math.random()随机生成16位小数，toString(36)转36进制生成0-9a-Z 的字符串，
 *      substr(3, len)从第三位开始截取 len 长度
 */