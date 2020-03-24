const isProduction = process.env.NODE_ENV;
let baseUrl = '/apis';
const appType = 'APP';
let imAddress = 'http://192.168.1.210:9000/v1/im/url';
const pageSize = 10;
// console.log(appid);

if (isProduction) {
  baseUrl = `${window.location.origin}`;
  if (window.location.origin != 'http://192.168.1.210') {
    imAddress = 'http://45.249.92.91:9000/v1/im/url';
  }
}

// module.exports = {
export default {
  debug: isProduction, // isProduction原先为debug
  baseUrl,
  imAddress,
  appType,
  pageSize,
};
