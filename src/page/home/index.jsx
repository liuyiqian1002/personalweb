/**
 * @author Vince
 * @desc:今日概括
 * */

import React, { Component } from 'react';
import API from 'api/api';

export default class TodaySurvey extends Component {
    constructor(props) {
        super(props);

        this.state = {
            statistics: {
                loading: false,
            },
        };
    }

    componentDidMount() {
    }


    render() {
        return (
            <div className="today-survey">
                <div className="today-summary-center">
                    首页
                </div>
            </div>
        );
    }
}
