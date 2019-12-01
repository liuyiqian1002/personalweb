import React, { Component } from 'react';
import { Button, Row, Form, Input, Icon, InputNumber, Spin } from 'antd';
import headImg from 'img/head.png';
import passwordImg from 'img/Password.png';
import checkbox from 'img/Checkbox4.png';
import checkboxTrue from 'img/Checkbox3.png';
import API from 'api/api';
import { connect } from 'react-redux';
import config from 'utils/config';
import { commonConstants } from '../../store/reducers/commons';

console.log(process.env);
const hallIdentifier = process.env.NODE_ENV ? 'HALL_IDENTIFIER_TEST' : config.testHallId;

const FormItem = Form.Item;

class LoginForm extends Component {
    state = {
        remeberMe: false,
        showError: false,
        errorMsg: '',
        isLogin: false,
        loading: false,
    };

    componentDidMount() {
        const _this = this;
        const userInfo = JSON.parse(sessionStorage.getItem('USER_INFO'));
        if (userInfo && userInfo instanceof Object) {
            const loginInfo = JSON.parse(localStorage.getItem('LOGININFO'));
            if (loginInfo) {
                this.props.form.setFieldsValue({
                    username: loginInfo.username,
                    password: loginInfo.password,
                });
            }
        }

        document.onkeydown = function onkeydown(e) {
            const keyNum = window.event ? e.keyCode : e.which;
            if (keyNum == 13) {
                _this.doLogin();
            }
        };
        //测试saga
        // this.props.dispatch({ type: `${commonConstants.loading}`, payload: true })
        // this.props.dispatch({type:`${commonConstants.loading}_ASYNC`})
    }

    componentWillUnmount() {
        document.onkeydown = null;
    }

    handleOk = () => {
        const { form } = this.props;
        console.log(form);
    };

    changeRemeberMe() {
        const remeberMe = this.state.remeberMe;
        this.setState({
            remeberMe: !remeberMe,
        });
    }

    loginQuery = async (data) => {
        this.setState({ loading: true });
        const res = await API.login_UserLogin({
            ...data,
            hallIdentifier,
        });
        // res.then(data => {
        //   console.error(data);
        // }).catch(err => {
        //   console.error(err);
        // });
        this.setState({ loading: false });
        if (res) {
            localStorage.setItem('USER_INFO', JSON.stringify(res));
            this.props.history.push('/index');
        }
    };

    doLogin = () => {
        window.localStorage.setItem('historyPath', null);
        const { form } = this.props;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            if (!this.state.remeberMe) {
                localStorage.setItem('LOGININFO', JSON.stringify(values));
            } else {
                localStorage.removeItem('LOGININFO');
            }
            this.loginQuery(values);
        });
    };

    keypress = (e) => {
        console.log(e);
        this.doLogin();
    };

    goIn = () => {
        this.props.history.push('/index');
    };

    render() {
        const { isLogin } = this.state;
        const {
            commons,
            form: { getFieldDecorator, getFieldError, getFieldValue }
        } = this.props;
        const { loading } = commons;
        const usernameError = getFieldError('username');
        const username = getFieldValue('username');
        const password = getFieldValue('password');
        const passwordError = getFieldError('password');
        return (
            <Spin spinning={loading}>
                <div>
                    {isLogin == true ? (
                        <Button
                            onClick={this.goIn}
                            style={{ marginTop: '150px' }}
                            className="login-button login-button-allow"
                        >
                            进入（已登录）
            </Button>
                    ) : (
                            <form>
                                <FormItem hasFeedback>
                                    {getFieldDecorator('username', {
                                        rules: [
                                            {
                                                required: true,
                                                message: '请输入用户名',
                                            },
                                        ],
                                    })(
                                        <Input
                                            placeholder="请输入用户名"
                                            name="username"
                                            prefix={<img src={headImg} alt="请输入用户名" />}
                                            className="login-input"
                                        />
                                    )}
                                </FormItem>
                                <FormItem hasFeedback>
                                    {getFieldDecorator('password', {
                                        rules: [
                                            {
                                                required: true,
                                                message: '请输入密码',
                                            },
                                        ],
                                    })(
                                        <Input
                                            placeholder="请输入密码"
                                            name="password"
                                            prefix={<img src={passwordImg} alt="请输入密码" />}
                                            type="password"
                                            className="login-input"
                                        />
                                    )}
                                </FormItem>
                                <Input
                                    style={{ marginBottom: '20px' }}
                                    disabled
                                    prefix={
                                        <span className="pointer" onClick={this.changeRemeberMe.bind(this)}>
                                            {this.state.remeberMe ? (
                                                <img className="login-remeber-logo" src={checkbox} />
                                            ) : (
                                                    <img className="login-remeber-logo" src={checkboxTrue} />
                                                )}
                                            <span className="login-remeber-span">记住登录名</span>
                                        </span>
                                    }
                                    type="password"
                                    className="login-input login-remeber"
                                    suffix={
                                        this.state.showError ? (
                                            <span className="login-error-word"> *{this.state.errorMsg}</span>
                                        ) : (
                                                ''
                                            )
                                    }
                                />
                                <div>
                                    {!(username && !usernameError) || !(password && !passwordError) ? (
                                        <Button
                                            disabled={!(username && !usernameError) || !(password && !passwordError)}
                                            type="primary"
                                            className="login-button"
                                        >
                                            登录
                  </Button>
                                    ) : (
                                            <Button onClick={this.doLogin} className="login-button login-button-allow">
                                                登录
                  </Button>
                                        )}
                                </div>
                            </form>
                        )}
                </div>
            </Spin>
        );
    }
}
export default connect((state => {
    console.error(state)
    return {
        commons: state.commons
    };
}))(Form.create()(LoginForm));
