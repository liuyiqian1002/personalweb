import API from 'api/api';
import { getMomentByTime } from './timeTypeFormat';
import store from '../store';

export const Util = {
  /**
   *保存本地数据
   */
  setItem(key, value) {
    value = typeof value == 'string' ? value : JSON.stringify(value);
    localStorage.setItem(key, value);
  },
  /**
   *获取本地数据
   */
  getItem(key) {
    const value = localStorage.getItem(key);
    try {
      return JSON.parseJSON(value);
    } catch (e) {
      return value || '';
    }
  },
  /**
   *删除本地数据
   */
  removeItem(key) {
    localStorage.removeItem(key);
  },
  /**
   *清除所有
   */
  clear() {
    localStorage.clear();
  },
  /**
   * 判断基本类型是否空
   */
  isEmpty(str) {
    str += '';
    if (str.length === 0 || str == 'undefined' || str == 'null') {
      return true;
    }
    return false;
  },
  /*
   * 用户名验证
   * */
  UserNameTest(value) {
    // 6-20位的中文、字母或数字的组合
    const reg = /^[A-Za-z0-9]{6,20}$/g;
    if (!reg.test(value)) {
      return false;
    } else {
      return true;
    }
  },
  /*
   * 手机号验证
   */
  IsPhoneTest(value) {
    // 11位数字，以1开头
    const reg = /^((13[0-9])|(14[5,7,9])|(15[^4])|(19[0-9])|(18[0-9])|(17[0,1,3,5,6,7,8]))\d{8}$/g;
    if (!reg.test(value)) {
      return false;
    } else {
      return true;
    }
  },
  /*
   * 密码验证
   */
  UserPwdTest(value) {
    // 6~16位字母、数字或其组合，其中，字母区分大小写
    const reg = /^(?!([a-zA-Z]+|\d+)$)[a-zA-Z\d]{6,16}$/;
    if (!reg.test(value)) {
      return false;
    } else {
      return true;
    }
  },
  /*
   * 邮箱验证
   */
  UserEmailTest(value) {
    const reg = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g;
    if (!reg.test(value)) {
      return false;
    } else {
      return true;
    }
  },
  /*
   * 判断数组里面是否有重复的
   */
  isRepeat(arr) {
    const hash = {};
    for (let i in arr) {
      if (hash[arr[i]]) {
        return true;
      }
      hash[arr[i]] = true;
    }
    return false;
  },
  trim: function trim(str) {
    return str.replace(/^\s+|\s+$/g, '');
  },

  ltrim: function ltrim(str) {
    return str.replace(/^\s+/, '');
  },

  rtrim: function rtrim(str) {
    return str.replace(/\s+$/, '');
  },
};

/**
 * 解析序列化参数
 */
export function parseQueryString(str) {
  const objURL = {};
  str.replace(new RegExp('([^?=&]+)(=([^&]*))?', 'g'), ($0, $1, $2, $3) => {
    objURL[$1] = $3;
  });
  return objURL;
}

/**
 * 以下为业务逻辑通用方法
 * */

/**
 * 下载流文件
 * @param {Blob} result
 * @param {String} fileName
 * @param {String} type
 */
export function downloadBlobFile(result, fileName, type = 'xls') {
  const blob = new Blob([result]);
  const downloadElement = document.createElement('a');
  const href = window.URL.createObjectURL(blob); // 创建下载的链接
  downloadElement.href = href;
  downloadElement.download = `${fileName}.${type}`; // 下载后文件名
  document.body.appendChild(downloadElement);
  downloadElement.click(); // 点击下载
  document.body.removeChild(downloadElement); // 下载完成移除元素
  window.URL.revokeObjectURL(href); // 释放掉blob对象
}

/**
 * @desc 数字取反
 * @param {Number} number
 */
export function reverseNumber(number) {
  if (number === 0) {
    return number;
  }

  if (number < 0) {
    return Math.abs(number);
  } else {
    return 0 - number;
  }
}

/**
 * 获取长度
 * @param {string}} string
 */
export function getStringLen(string = '') {
  let len = 0;
  for (let i = 0; i < string.length; i++) {
    if (string.charCodeAt(i) > 127 || string.charCodeAt(i) == 94) {
      len += 2;
    } else {
      len++;
    }
  }
  return len;
}

/**
 * 精度限制
 * @param {*} value
 * @param {*} decimal
 */
export function decimalLimit(value, decimal = 2) {
  const arr = value.split('.');
  if (arr[1] && arr[1].length > decimal) {
    return true;
  }
  return false;
}

/**
 *获取uid
 */
export function getUid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
/**
 *是否是PC
 */
export function IsPC() {
  const userAgentInfo = navigator.userAgent;
  const Agents = [
    'Android',
    'iPhone',
    'SymbianOS',
    'Windows Phone',
    'iPad',
    'iPod',
    'Mobile',
    'Linux',
    'linux',
  ];
  let flag = true;
  for (let v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = false;
      break;
    }
  }
  return flag;
}
/**
 * @desc localStorage 封装
 */
export const LS = {
  setItem(key, value) {
    value = typeof value == 'string' ? value : JSON.stringify(value);
    localStorage.setItem(key, value);
  },
  getItem(key) {
    const value = localStorage.getItem(key);
    try {
      return JSON.parseJSON(value);
    } catch (e) {
      return value || '';
    }
  },
  removeItem(key) {
    localStorage.removeItem(key);
  },
  clear() {
    localStorage.clear();
  },
};
/**
 * @desc 常用正则表达式
 */
export const Reg = {
  number: /^\d+$/,
  nonNum: /^\D+$/g,
  email: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
  bankFormat: /(\w{4})(?=.)/g,
  mobile: /^[1-9]\d{10}$/,
};
