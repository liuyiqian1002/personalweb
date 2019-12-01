import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Bundle from 'utils/bundle';

/* 数据统计 */
// import Statistics from 'page/statistics/statistics';
/* 数据排行 */
// import RankData from 'page/statistics/rankData/rankData';

// import Todaysummary from 'page/statistics/todaysummary';

/** 数据报表 今日概括 */
// import TodaySurvey from 'page/datareport/todaySurvey/todaySurvey';
const TodaySurvey = (props) => (
    <Bundle load={() => import('page/home')}>
        {(Param) => <Param {...props} />}
    </Bundle>
);

// 数据报表路由（运营统计）
// import RouteDataReport from './routerDataReport';
// desc：运营管理
export default class RouterSider extends Component {
    render() {
        return (
            <Switch>
                {/* 数据报表路由（运营统计） */}
                <Route exact path="/index" component={TodaySurvey} />
                <Redirect to="/index" />
            </Switch>
        );
    }
}
