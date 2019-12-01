const base = require('./webpack.base.js');
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');
base.devtool = 'cheap-module-eval-source-map';
base.plugins.push(new FilterWarningsPlugin({
    exclude: /mini-css-extract-plugin[^]*Conflicting order between:/,
}));
base.mode = 'development';
// base.plugins.push(...plugins);
module.exports = base;
