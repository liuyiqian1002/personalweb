/**
 * 基于当前时间的时间范围方法
 */
import moment from 'moment';

function getMonthStartDate() {
  const monthStartDate = new Date(nowYear, nowMonth, 1);
  return formatDate(monthStartDate);
}

function timeTypeFormat(type, initial) {
  const newDate = new Date();
  let beginDate = null;
  let endDate = null;
  const nowDay = newDate.getDate(); // 当前日
  const nowMonth = newDate.getMonth(); // 当前月
  const nowYear = newDate.getFullYear();
  function getMonthDays(myMonth) {
    const monthStartDate = new Date(nowYear, myMonth, 1);
    const monthEndDate = new Date(nowYear, myMonth + 1, 1);
    const days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
    return days;
  } // 当前年
  if (type === 'beforeYesterday') {
    // 获取前天时间
    beginDate = new Date(newDate - 2 * 24 * 3600 * 1000);
    endDate = new Date(newDate - 2 * 24 * 3600 * 1000);
  } else if (type === 'yesterday') {
    // 获取昨天时间
    beginDate = new Date(newDate - 1 * 24 * 3600 * 1000);
    endDate = new Date(newDate - 1 * 24 * 3600 * 1000);
  } else if (type === 'today') {
    // 获取今天时间
    beginDate = new Date();
    endDate = newDate;
  } else if (type === 'thisWeek') {
    // 获取本周时间
    const beginDayOfWeek = newDate.getDay() == 0 ? 6 : newDate.getDay() - 1;
    const endDayOfWeek = 7 - beginDayOfWeek;
    beginDate = new Date(newDate - beginDayOfWeek * 24 * 3600 * 1000);
    endDate = newDate;
  } else if (type === 'lastWeek') {
    // 获取上周时间

    // const beginDayOfWeek =0;

    const beginDayOfWeek = newDate.getDay() == 0 ? 7 : newDate.getDay() - 1;
    beginDate = new Date(newDate - (beginDayOfWeek + 7) * 24 * 3600 * 1000);
    endDate = new Date(newDate - (beginDayOfWeek + 1) * 24 * 3600 * 1000);

    // const beginDayOfWeek = newDate.getDay();
    // beginDate = new Date(newDate - (beginDayOfWeek + 7) * 24 * 3600 * 1000);
    // endDate = new Date(newDate - beginDayOfWeek * 24 * 3600 * 1000);
  } else if (type === 'thisMonth') {
    // 获取本月的时间
    beginDate = new Date(nowYear, nowMonth, 1);
    endDate = newDate;
  } else if (type === 'lastMonth') {
    // 获取上月的时间
    beginDate = new Date(nowYear, nowMonth - 1, 1);
    endDate = new Date(nowYear, nowMonth, 0);
  }
  const y1 = beginDate.getFullYear();
  let m1 = beginDate.getMonth() + 1;
  let d1 = beginDate.getDate();
  const y2 = endDate.getFullYear();
  let m2 = endDate.getMonth() + 1;
  let d2 = endDate.getDate();

  m1 = m1 >= 10 ? m1 : `0${m1}`;
  d1 = d1 >= 10 ? d1 : `0${d1}`;
  m2 = m2 >= 10 ? m2 : `0${m2}`;
  d2 = d2 >= 10 ? d2 : `0${d2}`;

  const formatBeginDate = `${y1}-${m1}-${d1}`;
  const formatEndDate = `${y2}-${m2}-${d2}`;
  if (initial) {
    return {
      beginTime: formatBeginDate,
      endTime: formatEndDate,
    };
  }
  return {
    beginTime: moment(formatBeginDate, 'YYYY-MM-DD'),
    endTime: moment(formatEndDate, 'YYYY-MM-DD'),
  };
}
// 将默认时间格式字符串转换成moment对象
function getMomentObject(formatDate, formatStr = 'YYYY-MM-DD') {
  // console.error(moment(formatDate));
  return moment(formatDate, formatStr);
}
function getMomentObjectFormat(formatDate, formatStr = 'YYYY-MM-DD') {
  return moment(formatDate, formatStr);
}

// 根据各种可能的时间类型返回moment对象
function getMomentByTime(time, formatStr = 'YYYY-MM-DD') {
  return time
    ? time._isAMomentObject
      ? time._isValid
        ? time
        : null
      : time.indexOf('-') !== -1
        ? getMomentObjectFormat(time, formatStr)
        : null
    : null;
}
// 根据各种可能的时间类型返回格式化时间YYYY-MM-DD
function getFormatByTime(time, formatStr = 'YYYY-MM-DD') {
  let result = '';
  if (time) {
    if (time._isAMomentObject) {
      result = time._isValid ? time.format(formatStr) : null;
    } else {
      result = time.indexOf('-') !== -1 ? time : null;
    }
  } else {
    result = null;
  }
  return result;
}

/**
 *
 * @param {Object} filterValue filter数据
 * @param {String} formatStr 格式化
 */
const formatTimeToString = (filterValue, formatStr = 'YYYY-MM-DD') => {
  return {
    beginTime: getFormatByTime(filterValue.beginTime, formatStr),
    endTime: getFormatByTime(filterValue.endTime, formatStr),
  };
};

/**
 * 获取默认时间配置值
 * */

function getDefaultTimetype(type) {
  return timeTypeFormat(type || 'today', 'initial');
}

/**
 * 获取默认禁用时间配置值:默认今天以前的日期
 * 7天以后的日期：current.isAfter(moment(Date.now()).add(6, 'days'));
 * */

function getDisabledDate(current) {
  return current && current.isBefore(moment(Date.now()).add(-1, 'days'));
}

/**
 * @desc 禁用日期规则,最多只能查询一个月的数据
 * 日期控件禁用规则，用户代理查询时校验，解决代理数据查询量大时数据库压力大的问题
 *  */
function disabledDate(date) {
  const now = new Date();
  if (date._i) {
    // console.error(moment(now).dayOfYear(),date.dayOfYear()); //
    return moment(now).dayOfYear() - 31 > date.dayOfYear();
  }
  return false;
}

export default timeTypeFormat;
export {
  getMomentObject,
  formatTimeToString,
  getMomentObjectFormat,
  getMomentByTime,
  getFormatByTime,
  getDefaultTimetype,
  getDisabledDate,
  disabledDate,
};
