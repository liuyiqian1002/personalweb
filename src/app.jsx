import React, { Component } from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import RouteConfig from './router/router';
import 'less/reset.less';
import 'less/base.less';
import config from 'utils/config';
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import store from './store';

if (!config.isPC) {
  import('utils/setRem.js');
}

ReactDOM.render(
  <LocaleProvider locale={zh_CN}>
    <Provider store={store}>
      <RouteConfig />
    </Provider>
  </LocaleProvider>,

  document.getElementById('app')
);
