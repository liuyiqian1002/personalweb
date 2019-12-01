/**
 * @author Vince
 * @desc:登录API接口方法
 * @tip: 所有命名以 login_(name) 开头 , 以便区分不同方法
 * */

import { http } from 'utils/ajax';

export default {
  /**
	   *  @desc：用户登录
	   *  @url '/user/uc/account/login'
	   *  @method post
	   *  params:{
	   *  	account (string): 账号|用户名(必填) ,
			appid (string): APPID|域名 ,客户端类型为APP 传递APP对应的ID如果PC、H5 传递域名 用于获取厅主(必填) ,
			clientType (string): 客户端类型（PC、H5、APP分类）(必填) = ['APP', 'H5', 'PC'],
			password (string): 登录密码(必填) ,
			terminalId (string): 终端设备号(必填)
	   *  }
	   *  @return {promise}
	   */

  async login_UserLogin(params = {}) {
    try {
      const result = await http.post('/login', params);
      // .then(function (response) {
      //   console.log(response,"页面相应数据");
      //   return response.data;
      // })
      // .catch(function (error) {
      //   console.log(error,"页面报错数据");
      // });
      if (result && result.data instanceof Object && result.code === 200) {
        return result.data;
      }
    } catch (err) {
      throw err;
    }
  },
  /**
   * 退出登录
   * @param {*}
   * url '/logout'
   * @method get
   * params{}
   */
  async login_LoginOut(params = {}) {
    try {
      const result = await http.get('/logout', params);
      if (result && result.code === 200) {
        return result.data;
      }
    } catch (err) {
      throw err;
    }
  },
  /**
   * 退出登录
   * @param {*}
   * url '/dataStat/hallOverall/create28'
   * @method get
   * params{}
   */
  async test(params = {}) {
    try {
      const result = await http.post('/dataStat/hallOverall/create28', params);
      if (result && result.code === 200) {
        return result.data;
      }
    } catch (err) {
      throw err;
    }
  },
};
