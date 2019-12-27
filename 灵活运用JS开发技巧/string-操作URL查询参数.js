const params = new URLSearchParams(location.search.replace(/\?/gi, ""));
// location.search = "?name=young&sex=male"
params.has("young"); // true
params.get("sex"); // "male"

/**
 * 理解: URLSearchParams 接口定义了一些实用的方法来处理 URL 的查询字符串。
 *      URLSearchParams.has() 返回 Boolean 判断是否存在此搜索参数。
 *      URLSearchParams.get() 获取指定搜索参数的第一个值。
 * 
 *  gi: 全局匹配 + 忽略大小写
 */