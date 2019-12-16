/**
 * 正则表达式中点.匹配除回车外的任何单字符，标记s改变这种行为，允许行终止符的出现，
 * 例如：
 */
/hello.world/.test("hello\nworld"); // false
/hello.world/s.test("hello\nworld"); // true
