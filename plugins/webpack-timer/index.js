function TimerPlugin(options = {}) {}

TimerPlugin.prototype.apply = function apply(compiler) {
  compiler.plugin('compile', function(params) {
    console.log('===================compile================');
  });

  compiler.plugin('compilation', function(compilation) {
    console.log('===================compilation================');

    compilation.plugin('optimize', function() {
      console.log('===================optimize================');
    });
  });

  // 异步的事件钩子
  compiler.plugin('emit', function(compilation, callback) {
    console.log('================emit==============');
    callback();
  });

  // 异步的事件钩子
  compiler.plugin('done', function(compilation, callback) {
    console.log('===========done============');
    callback();
  });
};

module.exports = TimerPlugin;
