const webpack = require('webpack');
const WebpackServer = require('webpack-dev-server');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const config = require('./webpack.dev.js');

const port = 9527;
const openUrl = `http://localhost:${port}/`;

config.entry.app.unshift(`webpack-dev-server/client?${openUrl}`);
config.plugins.push(new OpenBrowserPlugin({ url: openUrl }));
const compiler = webpack(config);
const server = new WebpackServer(compiler, {
  headers: {
    'X-Frame-Options': 'SAMEORIGIN',
  },
  publicPath: '',
  disableHostCheck: true,
  stats: {
    color: true,
  },
  open: true,
  proxy: {
    '/apis': {
      /* 与自己对应后台人员对接接口时，对应IP地址，切记不要上传， */
      // target: 'http://192.168.1.210:8020',
      // target: 'http://192.168.1.190:8020',
      // target: 'http://192.168.1.204/hallManage',
      // target: 'http://192.168.30.74:8020',
      // target: 'http://192.168.30.57:8020', // zn
      // target: 'http://192.168.30.67:8020', // cjm
      // target: 'http://192.168.1.195:8020',
      // target: 'http://192.168.30.69:8020/', // yq
      // target: 'http://192.168.1.204:8020', // xlj
      // target: 'http://192.168.30.46:8020', // cl
      // target: 'http://aws500.yscp88.top/hallManage/',
      // target: 'http://192.168.1.195/hallManage/',
      // target: 'http://192.168.30.66:8020', // tjj
      // target: 'http://192.168.30.17:8020/', // lz
      // target: 'http://13.228.94.33:8020', // 500zjw
      // target: 'https://caishenvip.net/hallManage', // csyl
      // target: 'http://47.90.125.51:8020', // lz wife
      // target: 'http://mt1088.com/hallManage/', // mtyl
      target: 'http://bms.88ycyl.cn', // dq
      // target: 'http://103.103.80.178:8020', // dq
      changeOrigin: true,
      pathRewrite: {
        '^/apis': '/hallManage',
      },
    },
  },
});
server.listen(port, () => {
  console.log('启动成功', port);
});
