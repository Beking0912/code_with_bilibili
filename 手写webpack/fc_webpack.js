/**
 * 1. 拿到入口文件的内容   fs
 * 2. 将 es6 代码解析成 AST   @babel/parser
 * 3. 操作 AST 分析出依赖文件   @babel/traverse
 * 4. 将 es6 代码转成 es5   @babel/core
 * 5. 循环分析 依赖层级关系 队列循环
 * 6. 实现 CMD API 整合模块化代码
 */

const fs = require("fs");
const path = require("path");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const babel = require("@babel/core");

let ID = 0;

function createAsset(filename) {
  // 1. 拿到入口文件的内容
  const content = fs.readFileSync(filename, "utf-8");

  // 2. es6 => AST
  const ast = parser.parse(content, {
    sourceType: "module"
  });

  // 3. 操作 AST 分析出依赖文件
  const dependencies = [];
  traverse(ast, {
    ImportDeclaration: ({ node }) => {
      dependencies.push(node.source.value);
    }
  });

  // 4. 将 es6 代码转成 es5
  const { code } = babel.transformFromAstAsync(ast, null, {
    presets: ["@babel/preset-env"]
  });

  let id = ID++;

  return {
    id,
    filename,
    code,
    dependencies
  };
}

function createGraph(entry) {
  const mainAsset = createAsset(entry);
  const queue = [mainAsset];

  // 5. 循环分析 依赖层级关系 队列循环
  for (let asset of queue) {
    const dirname = path.dirname(asset.filename);
    asset.mapping = {};
    asset.dependencies.forEach(relativePath => {
      const absolutePath = path.join(dirname, relativePath);
      const child = createAsset(absolutePath);
      asset.mapping[relativePath] = child.id; // 依赖文件及其对应id
      queue.push(child);
    });
  }
  return queue;
}

function bundle(graph) {
  let modules = "";
  graph.forEach(mod => {
    modules += `
      ${mod.id}:[
          function(require, module, exports) {
              ${mod.code}
          },
          ${JSON.stringify(mod.mapping)}
      ],
      `;
  });
  const result = `
    (function(modules) {
        function require(id) {
            const [fn, mapping] = modules[id];
            function localRequire(relativePath) {
                return require(mapping[relativePath]);
            }
            
            const module = {
                exports :{}
            }

            fn(localRequire, module, module.exports)

            return module.exports;
        }

        require(0);
    })({${modules}})
  `;
  console.log(result)
}

const graph = createGraph("./src/index.js");
const result = bundle(graph);
