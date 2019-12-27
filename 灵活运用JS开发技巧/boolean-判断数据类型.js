function DataType(tgt, type) {
  const dataType = Object.prototype.toString
    .call(tgt)
    .replace(/\[object (\w+)\]/, "$1")
    .toLowerCase();
  return type ? dataType === type : dataType;
}
DataType("young"); // "string"
DataType(20190214); // "number"
DataType(true); // "boolean"
DataType([], "array"); // true
DataType({}, "array"); // false

/**
 * 判断类型：undefined、null、string、number、boolean、array、
 *         object、symbol、date、regexp、function、asyncfunction、
 *         arguments、set、map、weakset、weakmap
 */