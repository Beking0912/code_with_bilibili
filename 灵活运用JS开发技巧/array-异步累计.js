async function Func(deps) {
  return deps.reduce(async (t, v) => {
    const dep = await t;
    const version = await Todo(v);
    dep[v] = version;
    return dep;
  }, Promise.resolve({}));
}
const result = await Func(); // 需在async包围下使用
