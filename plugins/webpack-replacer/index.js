const fs = require('fs');
const nodePath = require('path');

/**
 *
 * @param {*} src 输入目录
 * @param {*} dist 输出目录
 * @param {*} indentifier 标识
 * @param {*} replaceString 替换值
 * @param {*} callback
 */
function copyDir(src, dist, indentifier, replaceString, callback) {
  fs.access(dist, (err) => {
    if (err) {
      // 目录不存在时创建目录
      fs.mkdirSync(dist);
    }
    fs.readdir(src, (err, paths) => {
      if (err) {
        callback(err);
      } else {
        paths.forEach((path) => {
          const _src = `${src}/${path}`;
          const _dist = `${dist}/${path}`;

          fs.stat(_src, (err, stat) => {
            if (err) {
              callback(err);
              return;
            }
            // 判断是文件还是目录
            if (stat.isFile()) {
              const extname = nodePath.extname(_src);

              const isExit = ['.js'].indexOf(extname) !== -1;

              let files;

              if (isExit) {
                files = fs.readFileSync(_src, 'utf8');
              } else {
                files = fs.readFileSync(_src);
              }

              if (files) {
                let result = '';
                if (isExit) {
                  result = files.replace(indentifier, replaceString);
                } else {
                  result = files;
                }

                if (isExit) {
                  fs.writeFileSync(_dist, result, 'utf8');
                } else {
                  fs.writeFileSync(_dist, result);
                }
              }
            } else if (stat.isDirectory()) {
              // 当是目录时，递归复制
              copyDir(_src, _dist, callback);
            }
          });
        });
      }
    });
  });
}

/**
 * 文件标识替换插件
 * @param {*} options
 */
function ReplacerPlugin(options = {}) {
  this.filename = options.filename || []; // [{name:'500yl',value:'1'}]
  this.output = options.output; // 输出文件目录
  this.indentifier = options.indentifier; // 查找标识 正则对象
  this.name = options.name || function name() {}; // 输出文件夹重命名
}

ReplacerPlugin.prototype.apply = function apply(compiler) {
  // 输出磁盘后获取文件
  compiler.plugin('after-emit', (compilation) => {
    const filePath = compilation.outputOptions.path;

    this.filename.forEach((item) => {
      const name = this.name(item.name);
      // 拷贝文件，并且替换标识
      copyDir(filePath, `${this.output}/${name}`, this.indentifier, item.value, (err) => {
        if (err) {
          throw new Error(err);
        }
      });
      console.log(`${item.name} done`);
    });
  });
};

module.exports = ReplacerPlugin;
