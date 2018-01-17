export default {
  state: {
    show: false
  },
  mutations: {
  },
  actions: {
    validateDiy2({dispatch, commit}, {rule, value, callback}) {
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
    noMark2({dispatch, commit}, {rule, value, callback}) {
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
    naturalNumber2({dispatch, commit}, {rule, value, callback}) {
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
    }
  }
}
