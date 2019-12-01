/**
 * @author Vince
 * @desc:面包屑组件
 * */

import React, { Component } from 'react';
import { getFormatByTime } from 'utils/timeTypeFormat';
import { Icon } from 'antd';
import API from 'api/api';

export default class Crumbs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      historyArr: [],
      link: location.hash.slice(1), // getRouterStrByUrl(location.hash.slice(1)) //当前浏览器hash值
    };
  }

  // 关闭标签
  close(e, itemInfo) {
    e.stopPropagation();
    let nowArr = JSON.parse(localStorage.getItem('historyPath'));
    // console.error(JSON.parse(JSON.stringify(nowArr)));
    if (nowArr && nowArr.length > 1) {
      nowArr = nowArr.filter((item) => {
        return item.path.indexOf(itemInfo.url) === -1;
      });
      // console.error(JSON.parse(JSON.stringify(nowArr)));
      // 如果删除的是当前url，跳转路由
      if (itemInfo.url == this.state.link) {
        this.props.history.push(nowArr[0].path);
      }
    } else if (nowArr.length == 1) {
      // 最后一个不能删除
      return;
    }
    localStorage.setItem('historyPath', JSON.stringify(nowArr));
    const menu = JSON.parse(localStorage.getItem('menu'));
    if (menu && menu.length > 0) {
      this.getFilter(menu);
    } else {
      this.queryMenuList();
    }
  }

  // 删除所有标签
  closeAll() {
    let nowArr = this.state.historyArr;
    const historyPath = [];
    nowArr = nowArr.filter((item) => {
      return item.url === '/index/datareport/todaySurvey';
    });
    historyPath.push({
      path: '/index/datareport/todaySurvey',
      state: {},
    });
    this.setState({
      historyArr: nowArr,
      link: '/index/datareport/todaySurvey',
    });
    this.props.history.push('/index/datareport/todaySurvey');
    window.localStorage.setItem('historyPath', JSON.stringify(historyPath));
  }

  // 链接标签
  link = (item) => {
    this.setState({
      link: item.url,
    });
    this.props.history.push(item.url);
  };

  renderItem(data) {
    // console.error(data);
    // 渲染列表
    const { link } = this.state;
    const items = data.map((item, index) => {
      let classNames = 'crumbs-li';
      link && link.indexOf(item.url) !== -1 && (classNames = 'crumbs-li active');
      return (
        <div
          key={index.toString()}
          onClick={() => {
            this.link(item, index);
          }}
          className={classNames}
        >
          <span> {item.menuName} </span>
          <Icon
            type="close"
            theme="outlined"
            onClick={(e) => {
              this.close(e, item);
            }}
          />
        </div>
      );
    });
    return items;
  }

  addHistory(state) {
    const nowPath = { path: this.props.location.pathname, state };
    if (nowPath.path == '/index') {
      nowPath.path = '/index/datareport/todaySurvey';
      nowPath.state = {};
      this.setState({
        link: '/index/datareport/todaySurvey',
      });
    }
    let nowArr = JSON.parse(localStorage.getItem('historyPath'));

    let isExist = false;
    if (nowArr && nowArr.length > 0) {
      for (let i = 0; i < nowArr.length; i++) {
        if (nowArr[i].path.indexOf(nowPath.path) !== -1) {
          // 判断在数组中是否存在，不存在则push到数组中
          isExist = true;
        }
      }
      if (!isExist) {
        nowArr.push(nowPath);
      }
    } else {
      const arr = [];
      arr.push(nowPath);
      nowArr = arr;
    }
    localStorage.setItem('historyPath', JSON.stringify(nowArr));
  }

  queryMenuList = async () => {
    const res = await API.role_Menus();
    localStorage.setItem('menu', JSON.stringify(res));
    this.getFilter(res);
  };

  getFilter(menu) {
    const historyPath = JSON.parse(localStorage.getItem('historyPath'));
    // 筛选路由
    const arr = [];
    if (menu && historyPath && historyPath.length > 0) {
      for (let i = historyPath.length - 1; i >= 0; i--) {
        const filterArr = menu.filter((item) => {
          return item.url == historyPath[i].path;
        });

        if (filterArr && filterArr.length == 1) {
          arr.push(filterArr[0]);
        }
      }
    }
    this.setState({
      historyArr: arr,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.state) {
      const localPath = this.props.location.pathname;

      const state = nextProps.state;
      // 如果state里面由loading，存入需要存false
      if (state && state.loading) {
        state.loading = false;
      }
      // 将本地状态存到本地
      const historyPath = JSON.parse(window.localStorage.getItem('historyPath'));
      historyPath
        && historyPath.map((item) => {
          if (item.path === localPath) {
            // 如果filterValue里面有时间值，则需要转换成YYYY-MM-DD格式
            if (
              Object.keys(state).length !== 0
              && state.filterValue
              && state.filterValue.beginTime
            ) {
              state.filterValue.beginTime = getFormatByTime(state.filterValue.beginTime);
              state.filterValue.endTime = getFormatByTime(state.filterValue.endTime);
            }
            if (Object.keys(state).length !== 0 && state.filterValue && state.filterValue['1']) {
              state.filterValue['1'].beginTime = getFormatByTime(state.filterValue['1'].beginTime);
              state.filterValue['1'].endTime = getFormatByTime(state.filterValue['1'].endTime);
            }
            if (Object.keys(state).length !== 0 && state.filterValue && state.filterValue['2']) {
              state.filterValue['2'].beginTime = getFormatByTime(state.filterValue['2'].beginTime);
              state.filterValue['2'].endTime = getFormatByTime(state.filterValue['2'].endTime);
            }
            item.state = state;
          }
          return item;
        });
      // console.error(JSON.parse(JSON.stringify(historyPath)));
      window.localStorage.setItem('historyPath', JSON.stringify(historyPath));
    }
  }

  componentWillMount() {
    // console.error('willMount');
    this.addHistory(this.props.state);
    const menu = JSON.parse(localStorage.getItem('menu'));
    if (menu && menu.length > 0) {
      this.getFilter(menu);
    } else {
      this.queryMenuList();
    }
  }

  componentWillUnmount() {
    this.setState(() => {});
  }

  render() {
    return (
      <div className="crumbs-head noti-head">
        {this.renderItem(this.state.historyArr)}
        <span className="close-all">
          <Icon
            type="close"
            theme="outlined"
            onClick={(e) => {
              this.closeAll(e);
            }}
          />
        </span>
      </div>
    );
  }
}
