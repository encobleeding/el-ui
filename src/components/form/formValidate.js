export default {
  state: {
    formData: [],
    sfzh: '',
    checkSfzh18Bit: ''
  },
  mutations: {
    // 18位身份证号码校验位检查
    // 验证通过赋值 checkSfzh18Bit 状态值true,否则赋值false
    getSfzh18(state, {sfzh15}) {
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
	    state.sfzh = tempSfzh;
    },
    checkSfzh18Bit(state, {sfzh18}) {
      console.log(checkSfzh18Bit)
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
          state.checkSfzh18Bit = true;
        } else {
          state.checkSfzh18Bit = false;
        }
      } catch (err) {
        state.checkSfzh18Bit = false;
      }
    },
    // 判断是否为一个有效的日期
    // curDate 日期字符串，格式如：2008-05-12，也可以校验紧凑型日期格式：20080512
    // splitLength 分隔符（日期时间分隔符长度，只能为 1）
    // 验证通过返回true,否则返回false
    isValidDate(state, {curDate, splitLength}) {
      var valid = false;
      if ((typeof splitLength !== "undefined") && (splitLength === 1)) {
        if (curDate.length === 10) {
          valid = checkDate(curDate.substring(0, 4), curDate.substring(5, 7), curDate.substring(8));
        }
      } else {
        if (curDate.length === 8) {
          valid = checkDate(curDate.substring(0, 4), curDate.substring(4, 6), curDate.substring(6));
        }
      }
      return valid;
    }
  },
  actions: {
    validateDiy({dispatch, commit}, {rule, value, callback}) {
      let param = rule.param
      let required = rule.required
      if (required) {
        dispatch('notNull', {rule, value, callback})
        if (value < 18) {
          callback(new Error('必须年满18岁'))
        } else {
          callback()
        }
      } else if (value) {
        if (value < 18) {
          callback(new Error('必须年满18岁'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    },
    // 不能为空验证（公共使用）
    notNull({dispatch, commit}, {rule, value, callback}) {
      let param = rule.param
      let required = rule.required
      let newTitle = rule.label ? rule.label : '此字节'
      if (!value) {
        return callback(new Error(newTitle + '不能为空'))
      }
    },
    // 不能包含有单引号、双引号、分号
    noMark({dispatch, commit}, {rule, value, callback}) {
      let param = rule.param
      let required = rule.required
      if (required) {
        dispatch('notNull', {rule, value, callback})
        if (!(/^[^"^;^']*$/.test(value))) {
          return callback(new Error('不能包含有单引号、双引号、分号'))
        } else {
          callback()
        }
      } else if (value) {
        if (!(/^[^"^;^']*$/.test(value))) {
          return callback(new Error('不能包含有单引号、双引号、分号'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    },
    // 正确的自然数格式
    naturalNumber({dispatch, commit}, {rule, value, callback}) {
      let param = rule.param
      let required = rule.required
      if (required) {
        dispatch('notNull', {rule, value, callback})
        if (!(/^[+]?[0-9]+\d*$/i.test(value))) {
          return callback(new Error('请输入正确的自然数格式'))
        } else {
          callback()
        }
      } else if (value) {
        if (!(/^[+]?[0-9]+\d*$/i.test(value))) {
          return callback(new Error('请输入正确的自然数格式'))
        } else {
          callback()
        }
      } else {
      callback()
      }
    },
    // 正确的自然数格式且值在 {rule['param'][0]} 与 {rule['param'][1]} 之间 (需要在rule配置param:[])
    naturalNumberRange({dispatch, commit}, {rule, value, callback}) {
      let param = rule.param
      let required = rule.required
      if (required) {
        if (param) {
          dispatch('notNull', {rule, value, callback})
          let returnValue = false
          if (/^[+]?[1-9]+\d*$/i.test(value)) {
            returnValue = true
            value = parseInt(value)
            if (param[0] !== undefined) {
              returnValue = (value >= param[0]);
            }
            if (param[1] !== undefined) {
              returnValue = returnValue && (value <= param[1]);
            }
          }
          if (!returnValue) {
            return callback(new Error(`请输入正确的自然数格式且值在 ${param[0]} 与 ${param[1]} 之间`))
          } else {
            return callback()
          }
        } else {
          dispatch('notNull', {rule, value, callback})
          if (!(/(^-?|^\+?|\d)\d+$/.test(value))) {
            return callback(new Error(`请输入整数类型的数字格式`))
          } else {
            callback()
          }
        }
      } else if (value) {
        if (param) {
          let returnValue = false
          if (/^[+]?[1-9]+\d*$/i.test(value)) {
            returnValue = true
            value = parseInt(value)
            if (param[0] !== undefined) {
              returnValue = (value >= param[0]);
            }
            if (param[1] !== undefined) {
              returnValue = returnValue && (value <= param[1]);
            }
          }
          if (!returnValue) {
            return callback(new Error(`请输入正确的自然数格式且值在 ${param[0]} 与 ${param[1]} 之间`))
          } else {
            return callback()
          }
        } else {
          if (!(/(^-?|^\+?|\d)\d+$/.test(value))) {
            return callback(new Error(`请输入整数类型的数字格式`))
          } else {
            callback()
          }
        }
      } else {
        callback()
      }
    },
    // 请输入指定类型的数字格式 param:["+","2"] param[1]为浮点数小数点后位数
    numeric({dispatch, commit}, {rule, value, callback}) {
      let param = rule.param
      let required = rule.required
      if (required) {
        dispatch('notNull', {rule, value, callback})
        if (param) {
          let returnValue = false
          switch (param[0]) {
            case "+": // 正数
              returnValue = /(^\+?|^\d?)\d*\.?\d+$/.test(value);
              break;
            case "-": // 负数
              returnValue = /^-\d*\.?\d+$/.test(value);
              break;
            case "i": // 整数
              returnValue = /(^-?|^\+?|\d)\d+$/.test(value);
              break;
            case "+i": // 正整数
              returnValue = /^\+?[1-9]\d*$/.test(value);
              break;
            case "-i": // 负整数
              returnValue = /^[-]\d+$/.test(value);
              break;
            case "f": // 浮点数
              returnValue = /(^-?|^\+?|^\d?)\d*\.?\d+$/.test(value);
              if (rule.param[1] !== undefined) {
                let dotPos = value.indexOf(".");
                if (dotPos !== -1 && value.length - dotPos - 1 > param[1]) {
                  returnValue = false;
                }
              }
              break;
            case "+f": // 正浮点数
              returnValue = /(^\+?|^\d?)\d*\.?\d+$/.test(value);
              if (param[1] !== undefined) {
                let dotPos = value.indexOf(".");
                if (dotPos !== -1 && value.length - dotPos - 1 > param[1]) {
                  returnValue = false;
                }
              }
              break;
            case "-f": // 负浮点数
              returnValue = /^[-]\d*\.?\d$/.test(value);
              if (param[1] !== undefined) {
                let dotPos = value.indexOf(".");
                if (dotPos !== -1 && value.length - dotPos - 1 > param[1]) {
                  returnValue = false;
                }
              }
              break;
            default: // 缺省为整数
              returnValue = /(^-?|^\+?|\d)\d+$/.test(value);
              break;
          }
          if (!returnValue) {
            return callback(new Error('请输入指定类型的数字格式'))
          } else {
            callback()
          }
        } else {
          if (!/(^-?|^\+?|\d)\d+$/.test(value)) {
            return callback(new Error('请输入指定类型的数字格式'))
          } else {
            callback()
          }
        }
      } else if (value) {
        if (param) {
          let returnValue = false
          switch (param[0]) {
            case "+": // 正数
              returnValue = /(^\+?|^\d?)\d*\.?\d+$/.test(value);
              break;
            case "-": // 负数
              returnValue = /^-\d*\.?\d+$/.test(value);
              break;
            case "i": // 整数
              returnValue = /(^-?|^\+?|\d)\d+$/.test(value);
              break;
            case "+i": // 正整数
              returnValue = /^\+?[1-9]\d*$/.test(value);
              break;
            case "-i": // 负整数
              returnValue = /^[-]\d+$/.test(value);
              break;
            case "f": // 浮点数
              returnValue = /(^-?|^\+?|^\d?)\d*\.?\d+$/.test(value);
              if (rule.param[1] !== undefined) {
                let dotPos = value.indexOf(".");
                if (dotPos !== -1 && value.length - dotPos - 1 > param[1]) {
                  returnValue = false;
                }
              }
              break;
            case "+f": // 正浮点数
              returnValue = /(^\+?|^\d?)\d*\.?\d+$/.test(value);
              if (param[1] !== undefined) {
                let dotPos = value.indexOf(".");
                if (dotPos !== -1 && value.length - dotPos - 1 > param[1]) {
                  returnValue = false;
                }
              }
              break;
            case "-f": // 负浮点数
              returnValue = /^[-]\d*\.?\d$/.test(value);
              if (param[1] !== undefined) {
                let dotPos = value.indexOf(".");
                if (dotPos !== -1 && value.length - dotPos - 1 > param[1]) {
                  returnValue = false;
                }
              }
              break;
            default: // 缺省为整数
              returnValue = /(^-?|^\+?|\d)\d+$/.test(value);
              break;
          }
          if (!returnValue) {
            return callback(new Error('请输入指定类型的数字格式'))
          } else {
            callback()
          }
        } else {
          if (!/(^-?|^\+?|\d)\d+$/.test(value)) {
            return callback(new Error('请输入指定类型的数字格式'))
          } else {
            callback()
          }
        }
      } else {
        callback()
      }
    },
    // 指定类型的数字格式且值在 param[2] 与 param[3] 之间 param:["+", "2", "1", "10"] param[1]为浮点数小数点后位数
    numericRange({dispatch, commit}, {rule, value, callback}) {
      let param = rule.param
      let required = rule.required
      if (required) {
        dispatch('notNull', {rule, value, callback})
        if (param) {
					let returnValue = false;
					switch (param[0]) {
						case "+": // 正数
							returnValue = /(^\+?|^\d?)\d*\.?\d+$/.test(value);
							break;
						case "-": // 负数
							returnValue = /^-\d*\.?\d+$/.test(value);
							break;
						case "i": // 整数
							returnValue = /(^-?|^\+?|\d)\d+$/.test(value);
							break;
						case "+i": // 正整数
							returnValue = /(^\d+$)|(^\+?\d+$)/.test(value);
							break;
						case "-i": // 负整数
							returnValue = /^[-]\d+$/.test(value);
							break;
            case "f": // 浮点数
              returnValue = /(^-?|^\+?|^\d?)\d*\.?\d+$/.test(value);
              if (returnValue) {
                if (param[1] !== undefined) {
                  let dotPos = value.indexOf(".");
                  if (dotPos !== -1 && value.length - dotPos - 1 > param[1]) {
                    returnValue = false;
                  }
                }
              }
              break;
            case "+f": // 正浮点数
							returnValue = /(^\+?|^\d?)\d*\.?\d+$/.test(value);
							if (returnValue) {
								if (param[1] !== undefined) {
									let dotPos = value.indexOf(".");
									if (dotPos !== -1 && value.length - dotPos - 1 > param[1]) {
										returnValue = false;
									}
								}
							}
              break;
            case "-f": // 负浮点数
							returnValue = /^[-]\d*\.?\d$/.test(value);
							if (returnValue) {
								if (param[1] !== undefined) {
									let dotPos = value.indexOf(".");
									if (dotPos !== -1 && value.length - dotPos - 1 > param[1]) {
										returnValue = false;
									}
								}
							}
							break;
						default: // 缺省为整数
							returnValue = /(^-?|^\+?|\d)\d+$/.test(value);
              break;
          }
          if (returnValue) {
						value = Number(value);
						if (param[2] !== undefined) {
							returnValue = (value >= param[2]);
						}
						if (param[3] !== undefined) {
							returnValue = returnValue && (value <= param[3]);
						}
          }
          if (!returnValue) {
            return callback(new Error(`请输入指定类型的数字格式且值在 ${param[2]} 与 ${param[3]} 之间`))
          } else {
            callback()
          }
        } else {
          dispatch('notNull', {rule, value, callback})
          if (!(/(^-?|^\+?|\d)\d+$/.test(value))) {
            return callback(new Error(`请输入整数类型的数字格式`))
          } else {
            callback()
          }
        }
      } else if (value) {
        if (param) {
					let returnValue = false;
					switch (param[0]) {
						case "+": // 正数
							returnValue = /(^\+?|^\d?)\d*\.?\d+$/.test(value);
							break;
						case "-": // 负数
							returnValue = /^-\d*\.?\d+$/.test(value);
							break;
						case "i": // 整数
							returnValue = /(^-?|^\+?|\d)\d+$/.test(value);
							break;
						case "+i": // 正整数
							returnValue = /(^\d+$)|(^\+?\d+$)/.test(value);
							break;
						case "-i": // 负整数
							returnValue = /^[-]\d+$/.test(value);
							break;
            case "f": // 浮点数
              returnValue = /(^-?|^\+?|^\d?)\d*\.?\d+$/.test(value);
              if (returnValue) {
                if (param[1] !== undefined) {
                  let dotPos = value.indexOf(".");
                  if (dotPos !== -1 && value.length - dotPos - 1 > param[1]) {
                    returnValue = false;
                  }
                }
              }
              break;
            case "+f": // 正浮点数
							returnValue = /(^\+?|^\d?)\d*\.?\d+$/.test(value);
							if (returnValue) {
								if (param[1] !== undefined) {
									let dotPos = value.indexOf(".");
									if (dotPos !== -1 && value.length - dotPos - 1 > param[1]) {
										returnValue = false;
									}
								}
							}
              break;
            case "-f": // 负浮点数
							returnValue = /^[-]\d*\.?\d$/.test(value);
							if (returnValue) {
								if (param[1] !== undefined) {
									let dotPos = value.indexOf(".");
									if (dotPos !== -1 && value.length - dotPos - 1 > param[1]) {
										returnValue = false;
									}
								}
							}
							break;
						default: // 缺省为整数
							returnValue = /(^-?|^\+?|\d)\d+$/.test(value);
              break;
          }
          if (returnValue) {
						value = Number(value);
						if (param[2] !== undefined) {
							returnValue = (value >= param[2]);
						}
						if (param[3] !== undefined) {
							returnValue = returnValue && (value <= param[3]);
						}
          }
          if (!returnValue) {
            return callback(new Error(`请输入指定类型的数字格式且值在 ${param[2]} 与 ${param[3]} 之间`))
          } else {
            callback()
          }
        } else {
          if (!(/(^-?|^\+?|\d)\d+$/.test(value))) {
            return callback(new Error(`请输入整数类型的数字格式`))
          } else {
            callback()
          }
        }
      } else {
        callback()
      }
    },
    // 身份证验证
    sfzh({dispatch, commit, state}, {rule, value, callback}) {
      let param = rule.param
      let required = rule.required
      if (required) {
        dispatch('notNull', {rule, value, callback})
        var sfzh18 = value
        if (sfzh18 !== "" && sfzh18.length === 15) { // 15位身份证转换为18位身份证
          commit('getSfzh18', {sfzh15: sfzh18})
          sfzh18 = state.sfzh
        }
        if (sfzh18 !== "" && sfzh18.length === 18) {
          for (var i = 0; i < 17; i++) {
            var bitChar = sfzh18.substring(i, i + 1);
            if (bitChar < "0" || bitChar > "9") {
              return callback(new Error('请输入正确的身份证号码'))
            }
          }
          var birthday = sfzh18.substring(6, 14);
          return (isValidDate(birthday, 0) && checkSfzh18Bit({sfzh18}));
        }
        console.log(sfzh18)
      } else if (value) {
      } else {
        callback()
      }
    }
  }
}
