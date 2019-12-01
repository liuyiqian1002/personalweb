/*获取今天的时间*/


export function today() {
	var now = new Date();
	var year = now.getFullYear(); //getFullYear getYear
	var month = now.getMonth();
	var date = now.getDate();
	month = month + 1;
	if (month < 10) month = "0" + month;
	if (date < 10) date = "0" + date;
	var time = year + "-" + month + "-" + date;
	var stime = time + " 00:00:00";
	var etime = time + " 23:59:59";
	return [stime, etime];
}

// 获取昨天的时间
export function yesterday() {
	var time = new Date();
	time.setDate(time.getDate() - 1);
	var date = time.toLocaleDateString();
	if (/\d{4}-\d{1,2}-\d{1,2}$/.test(date)) {
		date = date.split("-");
	} else {
		date = date.split("/");
	}

	if (date[1] < 10) {
		date[1] = '0' + date[1];
	}
	if (date[2] < 10) {
		date[2] = '0' + date[2];
	}
	var stime = date[0] + "-" + date[1] + "-" + date[2] + " 00:00:00";
	var etime = date[0] + "-" + date[1] + "-" + date[2] + " 23:59:59";
	return [stime, etime];
}

// 获取上周第一天和最后一天的时间
export function getlastweek() {
	var time = new Date();
	if (time.getDay() == 0) {
		time.setDate(time.getDate() - 13);
	} else {
		time.setDate(time.getDate() - time.getDay() - 6);
	}
	var mondays = time.toLocaleDateString();
	var monday;
	if (/\d{4}-\d{1,2}-\d{1,2}$/.test(mondays)) {
		mondays = mondays.split("-");
	} else {
		mondays = mondays.split("/");

	}
	if (mondays[1] < 10) {
		mondays[1] = '0' + mondays[1];
	}
	if (mondays[2] < 10) {
		mondays[2] = '0' + mondays[2];
	}
	monday = mondays[0] + "-" + mondays[1] + "-" + mondays[2] + " 00:00:00";
	time.setDate(time.getDate() + 6);
	var sundays = time.toLocaleDateString();
	var sunday;
	if (/\d{4}-\d{1,2}-\d{1,2}$/.test(sundays)) {
		sundays = sundays.split("-");;
	} else {

		sundays = sundays.split("/");
	}
	if (sundays[1] < 10) {
		sundays[1] = '0' + sundays[1];
	}
	if (sundays[2] < 10) {
		sundays[2] = '0' + sundays[2];
	}
	sunday = sundays[0] + "-" + sundays[1] + "-" + sundays[2] + " 23:59:59";
	return [monday, sunday];
}

// 获取上月第一天和最后一天的时间
export function getlastmonth() {
	var today = new Date();
	var l_month = today.getMonth();
	var year = today.getFullYear();
	if (l_month < 10) {
		if (l_month == 0) {
			l_month = 12;
			year -= 1;
		} else {
			l_month = "0" + l_month;
		}
	}
	var endDate = new Date(year, l_month, 0).getDate();
	var stime = year + "-" + l_month + "-" + "01 00:00:00";
	var etime = year + "-" + l_month + "-" + endDate + " 23:59:59";
	return [stime, etime];
}

// 获取本周第一天和最后一天的时间
export function thisweek() {
	var time = new Date();
	if (time.getDay() == 0) {
		time.setDate(time.getDate() - 6);
	} else {
		time.setDate(time.getDate() - time.getDay() + 1);
	}
	var year = time.getFullYear(); //getFullYear getYear
	var month = time.getMonth();
	var date = time.getDate();
	month = month + 1;
	if (month < 10) {
		month = '0' + month;
	}
	if (date < 10) {
		date = '0' + date;
	}
	var monday = year + "-" + month + "-" + date + " 00:00:00";
	time.setDate(time.getDate() + 6);
	var year1 = time.getFullYear(); //getFullYear getYear
	var month1 = time.getMonth();
	var date1 = time.getDate();
	month1 = month1 + 1;
	if (month1 < 10) {
		month1 = '0' + month1;
	}
	if (date1 < 10) {
		date1 = '0' + date1;
	}
	var sunday = year1 + "-" + month1 + "-" + date1 + " 23:59:59";
	return [monday, sunday];
}

// 获取本月第一天和最后一天的时间
export function thismonth() {
	var myDate = new Date();
	var year = myDate.getFullYear();
	var month = myDate.getMonth() + 1;
	if (month < 10) {
		month = "0" + month;
	}
	var firstDay = year + "-" + month + "-" + "01" + " 00:00:00";
	myDate = new Date(year, month, 0);
	var lastDay = year + "-" + month + "-" + myDate.getDate() + " 23:59:59";
	return [firstDay, lastDay];
}


export const SetTime = (time) => {
	if (time == '今天') {
		const data = today()
		return data
	}
	if (time == '昨天') {
		const data = yesterday()
		return data
	}
	if (time == '本周') {
		const data = thisweek()
		return data
	}
	if (time == "上周") {
		const data = getlastweek()
		return data
	}
	if (time == '本月') {
		const data = thismonth()
		return data
	}
	if (time == '上月') {
		const data = getlastmonth()
		return data
	}

}