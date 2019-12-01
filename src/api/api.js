/**
 * @author Vince
 * @desc:所有API接口
 * */
// 登陆接口
import login from './login';
// 查询入账出账未处理的单数
import index from '.';


export default Object.assign(
  login,
  index
);
