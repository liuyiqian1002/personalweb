import { http } from 'utils/ajax';

export default {
  /*
      @desc: 获取IM的websocket地址
      @method：get
      @params:{}
    */
  async getIMServer() {
    try {
      const result = await http.get('/im/selectConfInfo');
      return result;
    } catch (err) {
      throw err;
    }
  },
};
