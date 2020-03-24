/**
 * @author
 * @desc:登录页面
 *
 * */
import React, { Component } from 'react';
import 'page/login/login.less';
import logo from 'img/default.png';
import config from 'utils/config';
import API from 'api/api';
import { connect } from 'react-redux';
import LoginForm from './loginForm';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      remeberMe: false,
      username: '',
      password: '',
      verification: '',
    };
  }

  componentDidMount() {
    document.title = 'Vince personal sweb';
    const { dispatch } = this.props;
    dispatch({ type: 'INCREASE' });
  }

  // 登录中
  _Logining = async () => {
    // let result = await API.login_UserLogin({
    //   account:'zhangsan',
    //   password:'111111',
    //   terminalId:"1",
    //   clientType:"APP",
    //   appid:"1",
    // })
    const res = await API.login_UserLogin({
      password: '123',
      username: 'fuxiang',
    });
    console.log(res);
  };

  render() {
    return (
      <div className={`app ${config.isPC ? 'pc' : 'mobile'}`}>
        <div className="login">
          <div className="login-inner">
            <img id="loginLogo" className="login-logo" src={logo} alt="商户管理后台" />
            <div className="login-content">
              <div className="login-content-list">
                <p className="login-title">登录</p>
                <LoginForm history={this.props.history} />
              </div>
            </div>
            <p className="login-copy">Copyright &copy;2020</p>
          </div>
        </div>
      </div>
    );
  }
}

export default connect((state) => {
  return {
    app: state.app,
  };
})(Login);
