import { Layout, Message } from 'antd';
import './index.less';
import React, { Component } from 'react';

import RouterSider from 'router/routerSider';

const { Header, Content } = Layout;
class Index extends Component {
  componentDidMount() {
    console.log('componentDidMount---index');
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps---index');
  }

  render() {
    // const RouterSiderProps = {
    //   ...this.props,
    //   query_hallVoicePrompt: this.query_hallVoicePrompt,
    // };
    return (
      <div className="home-page">
        <Layout>
          <Layout className="main-body">
            <Layout style={{ padding: '0 24px 24px' }}>
              <Content
                style={{
                  margin: 0,
                }}
              >
                <RouterSider {...this.props} />
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </div>
    );
  }
}
export default Index;
