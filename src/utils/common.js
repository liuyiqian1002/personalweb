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
        let hash = {};
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
 * 判断当前页面是否在导航历史记录里面
 * @params currentPath 当前路由hash值
 * @return
   isHistory 是否在记录里面
   state     state值
 *
 *
 * */
export function isHistoryPath() {
    // console.error(window.location.hash.substring(1));
    const historyPath = JSON.parse(window.localStorage.getItem('historyPath'));
    const currentPath = window.location.hash.substring(1);
    let isHistory = false;
    let state = {};
    historyPath
        && historyPath.map((item) => {
            if (item.path === currentPath || currentPath.indexOf(item.path) !== -1) {
                isHistory = true;
                state = item.state || {};
                if (state && state.loading) {
                    state.loading = false;
                }
                // 如果过滤值（查询条件）中有时间对象，需要转换成moment对象，以便查询条件日期框中的值能正常显示
                if (state && Object.keys(state).length !== 0 && state.filterValue) {
                    if (state.filterValue.beginTime) {
                        state.filterValue.beginTime = getMomentByTime(state.filterValue.beginTime);
                    }
                    if (state.filterValue.endTime) {
                        state.filterValue.endTime = getMomentByTime(state.filterValue.endTime);
                    }
                } else if (!state || Object.keys(state).length === 0) {
                    // 如果state为空
                    isHistory = false;
                }
            }
            return item;
        });
    return { isHistory, state };
}

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
 * 根据常量key获取常量值
 * @param {string} key
 * @code {string} code 常量代号
 * */
export function filterConstantsValueByKey(key, code) {
    const constants = store.getState().constants;
    if (!constants || Object.keys(constants).length === 0) return;
    let result = null;
    constants[code]
        && constants[code].constants.map((item) => {
            if (item.key == key) {
                result = item.value;
            }
        });
    return result;
}

/**
 * 按照key筛选，返回数组
 * @param {*} key
 * @returns {Array}
 */
export function filterConstantsByKey(key) {
    const constants = store.getState().constants;
    if (!constants || Object.keys(constants).length === 0) return [];
    if (constants[key]) {
        return constants[key].constants;
    }
    return [];
}

// 根据url获取纯路由
export function getRouterStrByUrl(url) {
    return url.indexOf('?') !== -1 ? url.substring(0, url.indexOf('?')) : url;
}

/**
 *
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
 *
 * @param {*} name
 */
export function getLocalInfo(name = 'LOGININFO') {
    const value = JSON.parse(localStorage.getItem(name));
    if (value && value.username) {
        return value;
    } else {
        window.location.hash = '/login';
    }
}

/**
 * @desc 前端常量定义
 */
export const constants = {
    gameTypeList: [
        // { key: '盈亏总报表', value: 0 },
        { name: '棋牌盈亏表', gameType: '1' },
        { name: '电竞盈亏表', gameType: '2' },
        { name: '彩票盈亏表', gameType: '3' },
        { name: '电子盈亏表', gameType: '4' },
        { name: '体育盈亏表', gameType: '5' },
        { name: '真人盈亏表', gameType: '6' },
    ],
    gameMap: {
        1: 'avia',
        2: 'jinlong',
        3: 'fungame',
        4: 'hc',
        5: 'sport',
    },
    operateTypeMap: {
        1: '自动转入额度',
        2: '自动回收金额',
        3: '转入',
        4: '转出',
        5: '一键回收',
    }
};

// 跟业务逻辑挂钩的通用函数

/**
 *@desc 获取平台列表/游戏分类
 * @param {*} that 组件指针
 * @param {*} needLottery 是否显示彩票类
 */
export const getGameType = (that, hideLottery, allHide) => {
    API.get_gameType_ist().then((res) => {
        console.error(res);
        if (res.code === 200) {
            let tmp = res.data;
            if (res.data) {
                if (hideLottery) {
                    tmp = tmp.filter((item) => {
                        return item.gameType !== '3';
                    });
                }
                that.setState({
                    gameTypeList: !allHide ? [{ name: '总盈亏', gameType: '0', platform: [] }, ...tmp] : tmp,
                    platFormList: tmp[0].platform,
                    // filterValue,
                });
            }
            // that.setState({ lists: res.data });
        }
    });
};
