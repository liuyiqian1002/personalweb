

const isProduction = process.env.NODE_ENV;
let baseUrl = '/apis';
const appid = process.env.HALL_IDENTIFIER; // 厅识别号（厅ID）
const appType = 'APP';
let imAddress = 'http://192.168.1.210:9000/v1/im/url';
const pageSize = 10;
const testHallId = 2;
const hallIdentifier = process.env.NODE_ENV ? 'HALL_IDENTIFIER_TEST' : testHallId;
// console.log(appid);

if (isProduction) {
  baseUrl = `${window.location.origin}/hallManage/`;
  if (window.location.origin != 'http://192.168.1.210' && window.location.origin != 'http://192.168.1.190' && window.location.origin != 'http://192.168.1.191') {
    imAddress = 'http://45.249.92.91:9000/v1/im/url';
  }
}
const Reg = {
  number: /^\d+$/,
  nonNum: /^\D+$/g,
  email: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
  bankFormat: /(\w{4})(?=.)/g,
  mobile: /^[1-9]\d{10}$/,
};
function IsPC() {
  const userAgentInfo = navigator.userAgent;
  const Agents = ['Android', 'iPhone',
    'SymbianOS', 'Windows Phone',
    'iPad', 'iPod', 'Mobile', 'Linux', 'linux'];
  let flag = true;
  for (let v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = false;
      break;
    }
  }
  return flag;
}

const LS = {
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
console.warn(hallIdentifier, 'config');
// module.exports = {
export default {
  debug: isProduction, // isProduction原先为debug
  baseUrl,
  imAddress,
  appid,
  appType,
  isPC: IsPC(),
  Reg,
  LS,
  pageSize,
  hallId: hallIdentifier,
  testHallId,
};
