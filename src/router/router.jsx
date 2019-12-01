import React, { Component } from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import API from 'api/api';
import { connect } from 'react-redux';
// import { hallIdentifier } from 'utils/config';
// 登录路由
import Login from 'page/login/Login';
// 首页
import Index from 'page/index/index';

import config from 'utils/config';


class RouteConfig extends Component {
  componentDidMount() {
  }

  render() {
    return (
      <HashRouter>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/index" component={Index} />
          <Redirect to="/login" />
        </Switch>
      </HashRouter>
    );
  }
}

export default connect(
  (state) => {
    return {};
  },
  (dispatch) => {
    return { dispatch };
  }
)(RouteConfig);
