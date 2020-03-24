import axios from 'axios';
import { Message, message } from 'antd';
import store from 'store';
import { commonConstants } from '../store/reducers/commons.js';
import configs from './config';
// import { encrypt, decrypt } from './aesEcb';
// 请求实列
let http = null;
// 加载数
let loadingNum = 0;

// 创建实列方法
const install = (baseURL) => {
  const options = {
    baseURL: baseURL || configs.baseUrl,
    message: '加载中...', // {string}变更Toast中提示文字，默认 加载中
    isMessage: true, // {boolean}是否显示加载中，默认显示
    addtoken: true, // {boolean} 接口访问是否需要添加token，默认添加true
    timeout: 30000, // {number} 请求超时时间 默认 30000
    params: null, // {object}  get方式传参key值
    headers: null, // {string} 指定请求头信息
    withCredentials: true, // {boolean} 请求是否携带本地cookies信息默认开启
  };
  http = axios.create(options);
};

install();

function cancelLoading() {
  loadingNum === 0 &&
    store.dispatch({
      type: commonConstants.loading,
      payload: false,
    });
}

// 添加请求拦截器
http.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    // 添加请求头
    // config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    if (loadingNum === 0) {
      console.log(config.noLoading, loadingNum, commonConstants.loading);
      !config.noLoading &&
        store.dispatch({
          type: commonConstants.loading,
          payload: true,
        });
    }
    if (!config.noLoading) loadingNum++;

    config.headers.token = '546yt454654';
    config.headers.appkey = 'mayi';
    let uid = '';
    try {
      uid = JSON.parse(window.localStorage.getItem('x-hall-ID'));
    } catch (error) {
      console.error(error);
    }

    config.headers['x-x-x'] = uid;
    if (config.headers['Content-Type']) {
      config.headers['Content-Type'] = config.headers['Content-Type'];
    } else {
      config.headers['Content-Type'] = 'application/json';
      // config.data = encrypt(config.data);
    }
    // console.log(config, '请求config');
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    loadingNum > 0 && loadingNum--;
    cancelLoading();
    return Promise.reject(error);
  }
);

// 添加响应拦截器
http.interceptors.response.use(
  (response) => {
    // const response = JSON.parse(decrypt(res.data));
    // 对响应数据做点什么
    // console.log(response,"响应成功数据");
    loadingNum > 0 && loadingNum--;
    cancelLoading();
    if (response && response.data.code === 200) {
      // return response.data;
    } else {
      // throw response.data.message;
    }

    if (response.status == 401) {
      Message.destroy();
    }

    return response.data;
  },
  (error) => {
    if (error.code === 'ECONNABORTED' && !error.response) {
      message.error('系统繁忙，请稍后再操作！');
      window.console.error('请求超时');
    }
    // 对响应错误做点什么
    loadingNum > 0 && loadingNum--;
    cancelLoading();
    return Promise.reject(error);
  }
);
export { http, install };
