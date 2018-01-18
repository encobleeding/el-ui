export default {
	install: function(Vue, opt) {
		// 清除两边的空格
		Vue.prototype.trim = (string) => {
  		return string.replace(/(^\s*)|(\s*$)/g, '')
		}
		// 判断是否为正确的身份证号码
		// 验证通过返回true,否则返回false
		Vue.prototype.isCorrectSfzh = (sfzh18) => {
			if (sfzh18 !== "" && sfzh18.length === 15) {
				sfzh18 = Vue.prototype.getSfzh18(sfzh18);
			}
			if (sfzh18 !== "" && sfzh18.length === 18) {
				for (var i = 0; i < 17; i++) {
					var bitChar = sfzh18.substring(i, i + 1);
					if (bitChar < "0" || bitChar > "9") {
						return false;
					}
				}
				var birthday = sfzh18.substring(6, 14);
				return (Vue.prototype.isValidDate(birthday, 0) && Vue.prototype.checkSfzh18Bit(sfzh18));
			}
			return false;
		}
		// 15位身份证号码转成18位
		Vue.prototype.getSfzh18 = (sfzh15) => {
			var tempSfzh = sfzh15;
			if ((typeof sfzh15 !== "undefined") && (sfzh15 !== "")) {
				if (sfzh15.length === 15) {
					var tempStr = sfzh15.substring(0, 6) + "19" + sfzh15.substring(6);
					var lastAt = 0;
					for (var i = 0; i < 17; i++) {
						var bitInt = parseInt(tempStr.substring(i, i + 1));
						var bitIntTemp = 1;
						for (var j = 0; j < 17 - i; j++) {
							bitIntTemp = (bitIntTemp * 2) % 11;
						}
						lastAt += bitInt * bitIntTemp;
					}
					lastAt %= 11;
					tempSfzh = tempStr + "10X98765432".substring(lastAt, lastAt + 1);
				}
			}
			return tempSfzh;
		}
		// 18位身份证号码校验位检查
		// 验证通过返回true,否则返回false
		Vue.prototype.checkSfzh18Bit = (sfzh18) => {
			try {
				var tempStr = sfzh18;
				var lastAt = 0;
				for (var i = 0; i < 17; i++) {
					var bitInt = parseInt(tempStr.substring(i, i + 1));
					var bitIntTemp = 1;
					for (var j = 0; j < 17 - i; j++) {
						bitIntTemp = (bitIntTemp * 2) % 11;
					}
					lastAt += bitInt * bitIntTemp;
				}
				lastAt %= 11;
				var lastChar = sfzh18.substring(17);
				if (lastChar === 'x') {
					lastChar = 'X';
				}
				if ("10X98765432".substring(lastAt, lastAt + 1) === lastChar) {
					return true;
				} else {
					return false;
				}
			} catch (err) {
				return false;
			}
		}
		// 判断是否为一个有效的日期
		// curDate 日期字符串，格式如：2008-05-12，也可以校验紧凑型日期格式：20080512
		// splitLength 分隔符（日期时间分隔符长度，只能为 1）
		// 验证通过返回true,否则返回false
		Vue.prototype.isValidDate = (curDate, splitLength) => {
			var valid = false;
			if ((typeof splitLength !== "undefined") && (splitLength === 1)) {
				if (curDate.length === 10) {
					valid = Vue.prototype.checkDate(curDate.substring(0, 4), curDate.substring(5, 7), curDate.substring(8));
				}
			} else {
				if (curDate.length === 8) {
					valid = Vue.prototype.checkDate(curDate.substring(0, 4), curDate.substring(4, 6), curDate.substring(6));
				}
			}
			return valid;
		}
		// 日期检查
		// year 年字符串，month 月字符串，day 日字符串
		// 年月日可以有0的前缀
		Vue.prototype.checkDate = (year, month, day) => {
			try {
				year = year.replace(/(^0*)/g, "");
				month = month.replace(/(^0*)/g, "");
				day = day.replace(/(^0*)/g, "");
				var regExp = new RegExp("^\\d+$");
				if (!regExp.test(year) || !regExp.test(month) || !regExp.test(day)) {
					return false;
				}
				var yearInt = parseInt(year);
				var monthInt = parseInt(month);
				var dayInt = parseInt(day);
				if ((yearInt < 1900 || yearInt > 3000) || (monthInt < 1 || monthInt > 12) || (dayInt < 1 || dayInt > 31)) {
					return false;
				}
				if (dayInt === 31 && (monthInt===4 || monthInt===6 || monthInt===9 || monthInt===11)) {
					return false;
				}
				if (monthInt === 2) {
					if ((yearInt % 4 === 0 && yearInt % 100 !== 0) || yearInt % 400 === 0) {
						if (dayInt > 29) {
							return false;
						}
					} else {
						if (dayInt > 28) {
							return false;
						}
					}
				}
			} catch (err) {
				return false;
			}
			return true;
		}
	}
}
