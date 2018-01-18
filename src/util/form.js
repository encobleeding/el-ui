/**
    Vue.prototype.naturalNumberRange = (rule, value, callback) => {
      let param = rule.param
      let required = rule.required
      if (required) {
        if (param) {
          Vue.prototype.notNull(rule, value, callback)
        } else {
        }
      } else if (value) {
        if (param) {
        } else {
        }
      } else {
        callback()
      }
    }
    return callback(new Error(newTitle + '不能为空11'))
*/
export default {
  install: function(Vue, opt) {
		// 不能为空验证（公共使用）
		Vue.prototype.notNull = (rule, value, callback) => {
			let newTitle = rule.label ? rule.label : '此字节'
			if (!value) {
				return callback(new Error(newTitle + '不能为空11'))
			}
		}
		// 不能包含有单引号、双引号、分号
		Vue.prototype.noMark = (rule, value, callback) => {
			let param = rule.param
			let required = rule.required
			if (required) {
				Vue.prototype.notNull(rule, value, callback)
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
		}
		// 正确的自然数格式
    Vue.prototype.naturalNumber = (rule, value, callback) => {
      let param = rule.param
      let required = rule.required
      if (required) {
        Vue.prototype.notNull(rule, value, callback)
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
		}
		// 正确的自然数格式且值在 {rule['param'][0]} 与 {rule['param'][1]} 之间 (需要在rule配置param:["1" ,"2"])
    Vue.prototype.naturalNumberRange = (rule, value, callback) => {
      let param = rule.param
      let required = rule.required
      if (required) {
        if (param) {
          Vue.prototype.notNull(rule, value, callback)
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
          Vue.prototype.notNull(rule, value, callback)
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
		}
		// 请输入指定类型的数字格式 param:["+","2"] param[1]为浮点数小数点后位数
    Vue.prototype.numeric = (rule, value, callback) => {
      let param = rule.param
      let required = rule.required
      if (required) {
        Vue.prototype.notNull(rule, value, callback)
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
		}
		// 指定类型的数字格式且值在 param[2] 与 param[3] 之间 param:["+", "2", "1", "10"] param[1]为浮点数小数点后位数
    Vue.prototype.numericRange = (rule, value, callback) => {
      let param = rule.param
      let required = rule.required
      if (required) {
        Vue.prototype.notNull(rule, value, callback)
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
    // 请输入正确的 email 地址
    Vue.prototype.email = (rule, value, callback) => {
      let param = rule.param
      let required = rule.required
      let reg = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i
      if (required) {
          Vue.prototype.notNull(rule, value, callback)
          if (reg.test(value)) {
            callback()
          } else {
            return callback(new Error('请输入正确的 email 地址'))
          }
      } else if (value) {
        if (reg.test(value)) {
          callback()
        } else {
          return callback(new Error('请输入正确的 email 地址'))
        }
      } else {
        callback()
      }
    }
    // 请输入正确的 url 地址
    Vue.prototype.url = (rule, value, callback) => {
      let param = rule.param
      let required = rule.required
      let reg = /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i
      if (required) {
          Vue.prototype.notNull(rule, value, callback)
          if (reg.test(value)) {
            callback()
          } else {
            return callback(new Error('请输入正确的 url 地址'))
          }
      } else if (value) {
        if (reg.test(value)) {
          callback()
        } else {
          return callback(new Error('请输入正确的 url 地址'))
        }
      } else {
        callback()
      }
    }
    // 输入正确的电话号码（固定电话或移动电话）
    Vue.prototype.phone = (rule, value, callback) => {
      let required = rule.required
			if (required) {
				Vue.prototype.notNull(rule, value, callback)
        if (/(^([0][1-9]{1}[0-9]{1,2}[-]?)?\d{7,8}(-\d{1,4})?$)|(^[1][3|4|5|6|7|8|9]{1}\d{9}$)/.test(value)) {
          callback()
        } else {
          return callback(new Error('请输入正确的电话号码（固定电话或移动电话）'))
        }
			} else if (value) {
        if (/(^([0][1-9]{1}[0-9]{1,2}[-]?)?\d{7,8}(-\d{1,4})?$)|(^[1][3|4|5|6|7|8|9]{1}\d{9}$)/.test(value)) {
          callback()
        } else {
          return callback(new Error('请输入正确的电话号码（固定电话或移动电话）'))
        }
			} else {
				callback()
			}
    }
    // 输入正确的电话号码（多个号码之间用'/'分隔）
    Vue.prototype.manyPhones = (rule, value, callback) => {
      let param = rule.param
      let required = rule.required
      if (required) {
        Vue.prototype.notNull(rule, value, callback)
        var pattern=/(^([0][1-9]{1}[0-9]{1,2}[-]?)?\d{7,8}(-\d{1,4})?$)|(^[1][3|4|5|6|7|8|9]{1}\d{9}$)|(^\d{3,8}$)/;
				var phoneArray=value.split('/');
				var bSuccess=true;
				for (var i=0; i<phoneArray.length; i++) {
					if (!pattern.test(phoneArray[i])) {
						bSuccess=false;
						break;
					}
				}
				if (bSuccess) {
          callback()
        } else {
          return callback(new Error("请输入正确的电话号码（多个号码之间用'/'分隔）"))
        }
      } else if (value) {
        var pattern=/(^([0][1-9]{1}[0-9]{1,2}[-]?)?\d{7,8}(-\d{1,4})?$)|(^[1][3|4|5|6|7|8|9]{1}\d{9}$)|(^\d{3,8}$)/;
				var phoneArray=value.split('/');
				var bSuccess=true;
				for (var i=0; i<phoneArray.length; i++) {
					if (!pattern.test(phoneArray[i])) {
						bSuccess=false;
						break;
					}
				}
				if (bSuccess) {
          callback()
        } else {
          return callback(new Error("请输入正确的电话号码（多个号码之间用'/'分隔）"))
        }
      } else {
        callback()
      }
    }
    // 输入正确的移动电话
    Vue.prototype.mobile = (rule, value, callback) => {
      let param = rule.param
      let required = rule.required
      if (required) {
          Vue.prototype.notNull(rule, value, callback)
          if (/(^[1][3|4|5|6|7|8|9]{1}\d{9}$)/.test(value)) {
            callback()
          } else {
            return callback(new Error('请输入正确的移动电话'))
          }
      } else if (value) {
        if (/(^[1][3|4|5|6|7|8|9]{1}\d{9}$)/.test(value)) {
          callback()
        } else {
          return callback(new Error('请输入正确的移动电话'))
        }
      } else {
        callback()
      }
    }
    // 输入正确的移动电话（多个号码之间用'/'分隔）
    Vue.prototype.manyMobils = (rule, value, callback) => {
      let param = rule.param
      let required = rule.required
      if (required) {
          Vue.prototype.notNull(rule, value, callback)
          var pattern=/(^[1][3|4|5|6|7|8|9]{1}\d{9}$)/;
          var phoneArray=value.split('/'); //
          var bSuccess=true;
          for (var i=0; i<phoneArray.length; i++) {
            if (!pattern.test(phoneArray[i])) {
              bSuccess=false;
              break;
            }
          }
          if (bSuccess) {
            callback()
          } else {
            return callback(new Error("请输入正确的移动电话（多个号码之间用'/'分隔）"))
          }
      } else if (value) {
        var pattern=/(^[1][3|4|5|6|7|8|9]{1}\d{9}$)/;
        var phoneArray=value.split('/'); //
        var bSuccess=true;
        for (var i=0; i<phoneArray.length; i++) {
          if (!pattern.test(phoneArray[i])) {
            bSuccess=false;
            break;
          }
        }
        if (bSuccess) {
          callback()
        } else {
          return callback(new Error("请输入正确的移动电话（多个号码之间用'/'分隔）"))
        }
      } else {
        callback()
      }
    }
    // 请输入正确的邮政编码
    Vue.prototype.zipCode = (rule, value, callback) => {
      let param = rule.param
      let required = rule.required
      if (required) {
          Vue.prototype.notNull(rule, value, callback)
          if (/^[\d]{6}$/.test(value)) {
            callback()
          } else {
            return callback(new Error('请输入正确的邮政编码'))
          }
      } else if (value) {
        if (/^[\d]{6}$/.test(value)) {
          callback()
        } else {
          return callback(new Error('请输入正确的邮政编码'))
        }
      } else {
        callback()
      }
    }
    // 输入长度在 {0} 与 {1} 之间的字符
    Vue.prototype.charLength = (rule, value, callback) => {
      let param = rule.param
      let required = rule.required
      if (required) {
          Vue.prototype.notNull(rule, value, callback)
          if (param[2]) {
            var arr = value.split(param[2]);
            if (arr.length >= param[0] && arr.length <= param[1]) {
              callback()
            } else {
              return callback(new Error(`输入长度在 ${param[0]} 与 ${param[1]} 之间的字符`))
            }
          }
          var len = Vue.prototype.trim(value).length;
          if (len >= param[0] && len <= param[1]) {
            callback()
          } else {
            return callback(new Error(`输入长度在 ${param[0]} 与 ${param[1]} 之间的字符`))
          }
      } else if (value) {
        if (param[2]) {
          var arr = value.split(param[2]);
          if (arr.length >= param[0] && arr.length <= param[1]) {
            callback()
          } else {
            return callback(new Error(`输入长度在 ${param[0]} 与 ${param[1]} 之间的字符`))
          }
        }
        var len = Vue.prototype.trim(value).length;
        if (len >= param[0] && len <= param[1]) {
          callback()
        } else {
          return callback(new Error(`输入长度在 ${param[0]} 与 ${param[1]} 之间的字符`))
        }
      } else {
        callback()
      }
    }
    // 输入长度在 {0} 与 {1} 之间的字符,一个汉字等于三个字符
    Vue.prototype.lengthThreeChart = (rule, value, callback) => {
      let param = rule.param
      let required = rule.required
      if (required) {
          Vue.prototype.notNull(rule, value, callback)
          if (param[2]) {
            var arr = value.split(param[2]);
            if (arr.length >= param[0] && arr.length <= param[1]) {
              callback()
            } else {
              return callback(new Error(`输入长度在 ${param[0]} 与 ${param[1]} 之间的字符,一个汉字等于三个字符`))
            }
          }
          var len = value.replace(/[^\x00-\xff]/g, 'aaa').length;
          if (len >= param[0] && len <= param[1]) {
            callback()
          } else {
            return callback(new Error(`输入长度在 ${param[0]} 与 ${param[1]} 之间的字符,一个汉字等于三个字符`))
          }
      } else if (value) {
        if (param[2]) {
          var arr = value.split(param[2]);
          if (arr.length >= param[0] && arr.length <= param[1]) {
            callback()
          } else {
            return callback(new Error(`输入长度在 ${param[0]} 与 ${param[1]} 之间的字符,一个汉字等于三个字符`))
          }
        }
        var len = value.replace(/[^\x00-\xff]/g, 'aaa').length;
        if (len >= param[0] && len <= param[1]) {
          callback()
        } else {
          return callback(new Error(`输入长度在 ${param[0]} 与 ${param[1]} 之间的字符,一个汉字等于三个字符`))
        }
      } else {
        callback()
      }
    }
    // 输入长度在 {0} 与 {1} 之间的无空格字符,一个汉字等于三个字符
    Vue.prototype.noSpaceLength = (rule, value, callback) => {
      let param = rule.param
      let required = rule.required
      if (required) {
          Vue.prototype.notNull(rule, value, callback)
          // 根据第三位字符串来分割验证 //检测空格(/\s/.test('as df')
					if (param[2]) {
						var arr = value.split(param[2]);
						if (arr.length >= param[0] && arr.length <= param[1]) {
              callback()
            } else {
              return callback(new Error(`输入长度在 ${param[0]} 与 ${param[1]} 之间的无空格字符,一个汉字等于三个字符`))
            }
					}
					var len = Vue.prototype.trim(value.replace(/[^\x00-\xff]/g, 'aaa')).length;
          if (len >= param[0] && len <= param[1]) {
            callback()
          } else {
            return callback(new Error(`输入长度在 ${param[0]} 与 ${param[1]} 之间的无空格字符,一个汉字等于三个字符`))
          }
      } else if (value) {
        if (param[2]) {
          var arr = value.split(param[2]);
          if (arr.length >= param[0] && arr.length <= param[1]) {
            callback()
          } else {
            return callback(new Error(`输入长度在 ${param[0]} 与 ${param[1]} 之间的无空格字符,一个汉字等于三个字符`))
          }
        }
        var len = Vue.prototype.trim(value.replace(/[^\x00-\xff]/g, 'aaa')).length;
        if (len >= param[0] && len <= param[1]) {
          callback()
        } else {
          return callback(new Error(`输入长度在 ${param[0]} 与 ${param[1]} 之间的无空格字符,一个汉字等于三个字符`))
        }
      } else {
        callback()
      }
    }
    // 最少输入 {0} 个字符
    Vue.prototype.minLength = (rule, value, callback) => {
      let param = rule.param
      let required = rule.required
      if (required) {
        if (param) {
          Vue.prototype.notNull(rule, value, callback)
          if (param[0] !== undefined) {
						if (value.length < param[0]) {
							return callback(new Error(`最少输入 ${param[0]} 个字符`))
						}
					}
        } else {
          callback()
        }
      } else if (value) {
        if (param) {
          if (param[0] !== undefined) {
						if (value.length < param[0]) {
							return callback(new Error(`最少输入 ${param[0]} 个字符`))
						}
					}
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    // 最多输入 {0} 个字符
    Vue.prototype.maxLength = (rule, value, callback) => {
      let param = rule.param
      let required = rule.required
      if (required) {
        if (param) {
          Vue.prototype.notNull(rule, value, callback)
          if (param[0] !== undefined) {
						if (value.length > param[0]) {
              return callback(new Error(`最多输入 ${param[0]} 个字符`))
						}
					}
        }
        callback()
      } else if (value) {
        if (param) {
          if (param[0] !== undefined) {
						if (value.length > param[0]) {
              return callback(new Error(`最多输入 ${param[0]} 个字符`))
						}
					}
        }
        callback()
      } else {
        callback()
      }
    }
    // 最多输入 {0} 个字符,一个汉字等于三个字符
    Vue.prototype.maxLengthThreeChart = (rule, value, callback) => {
      let param = rule.param
      let required = rule.required
      if (required) {
          Vue.prototype.notNull(rule, value, callback)
          var len = value.replace(/[^\x00-\xff]/g, 'aaa').length;
          if (len<=param[0]) {
            callback()
          } else {
            return callback(new Error(`最多输入 ${param[0]} 个字符,一个汉字等于三个字符`))
          }
      } else if (value) {
        var len = value.replace(/[^\x00-\xff]/g, 'aaa').length;
        if (len<=param[0]) {
          callback()
        } else {
          return callback(new Error(`最多输入 ${param[0]} 个字符,一个汉字等于三个字符`))
        }
      } else {
        callback()
      }
    }
    // 输入最多输入 {0} 个字符,无空格
    Vue.prototype.noSpaceMaxLength = (rule, value, callback) => {
      let param = rule.param
      let required = rule.required
      if (required) {
          Vue.prototype.notNull(rule, value, callback)
          var spaceRe = /\s/g;
          if (spaceRe.test(value)) {
            return callback(new Error(`输入最多输入 ${param[0]} 个字符,无空格`))
          } else if (param) {
            if (param[0] !== undefined) {
              if (value.length > param[0]) {
                return callback(new Error(`输入最多输入 ${param[0]} 个字符,无空格`))
              }
            }
          }
          callback()
      } else if (value) {
        var spaceRe = /\s/g;
        if (spaceRe.test(value)) {
          return callback(new Error(`输入最多输入 ${param[0]} 个字符,无空格`))
        } else if (param) {
          if (param[0] !== undefined) {
            if (value.length > param[0]) {
              return callback(new Error(`输入最多输入 ${param[0]} 个字符,无空格`))
            }
          }
        }
        callback()
      } else {
        callback()
      }
    }
    // 身份证验证
    Vue.prototype.sfzh = (rule, value, callback) => {
      let param = rule.param
      let required = rule.required
      if (required) {
        Vue.prototype.notNull(rule, value, callback)
        if (Vue.prototype.isCorrectSfzh(value)) {
          callback()
        } else {
          return callback(new Error('请输入正确的身份证号码'))
        }
      } else if (value) {
				if (Vue.prototype.isCorrectSfzh(value)) {
          callback()
        } else {
          return callback(new Error('请输入正确的身份证号码'))
        }
      } else {
        callback()
      }
    }
    // 请输入正确的日期，日期格式为 {0}
    Vue.prototype.date = (rule, value, callback) => {
      let param = rule.param
      let required = rule.required
      if (required) {
        if (param) {
          Vue.prototype.notNull(rule, value, callback)
          if (param[0]) {
						switch (param[0]) {
							case "yyyy":
								if (isValidDate(value + "0101", 0)) {
                  callback()
                } else {
                  return callback(new Error('请输入正确的日期，日期格式为 {0}'))
                }
                break;
							case "yyyyMM":
                if (isValidDate(value + "01", 0)) {
                  callback()
                } else {
                  return callback(new Error('请输入正确的日期，日期格式为 {0}'))
                }
                break;
							case "yyyy-MM":
                if (isValidDate(value + "-01", 1)) {
                  callback()
                } else {
                  return callback(new Error('请输入正确的日期，日期格式为 {0}'))
                }
                break;
							case "yyyyMMdd":
                if (isValidDate(value, 0)) {
                  callback()
                } else {
                  return callback(new Error('请输入正确的日期，日期格式为 {0}'))
                }
                break;
							case "yyyy-MM-dd":
                if (isValidDate(value, 1)) {
                  callback()
                } else {
                  return callback(new Error('请输入正确的日期，日期格式为 {0}'))
                }
                break;
							case "yyyyMMddHH":
                if (isValidDateTime(value + "0000", 0)) {
                  callback()
                } else {
                  return callback(new Error('请输入正确的日期，日期格式为 {0}'))
                }
                break;
							case "yyyy-MM-dd HH":
                if (isValidDateTime(value + ":00:00", 1)) {
                  callback()
                } else {
                  return callback(new Error('请输入正确的日期，日期格式为 {0}'))
                }
                break;
							case "yyyyMMddHHmm":
                if (isValidDateTime(value + "00", 0)) {
                  callback()
                } else {
                  return callback(new Error('请输入正确的日期，日期格式为 {0}'))
                }
                break;
							case "yyyy-MM-dd HH:mm":
                if (isValidDateTime(value + ":00", 1)) {
                  callback()
                } else {
                  return callback(new Error('请输入正确的日期，日期格式为 {0}'))
                }
                break;
							case "yyyyMMddHHmmss":
                if (isValidDateTime(value, 0)) {
                  callback()
                } else {
                  return callback(new Error('请输入正确的日期，日期格式为 {0}'))
                }
                break;
							case "yyyy-MM-dd HH:mm:ss":
                if (isValidDateTime(value, 1)) {
                  callback()
                } else {
                  return callback(new Error('请输入正确的日期，日期格式为 {0}'))
                }
                break;
						}
					}
        }
        callback()
      } else if (value) {
        if (param) {
          if (param[0]) {
						switch (param[0]) {
							case "yyyy":
								if (isValidDate(value + "0101", 0)) {
                  callback()
                } else {
                  return callback(new Error('请输入正确的日期，日期格式为 {0}'))
                }
                break;
							case "yyyyMM":
                if (isValidDate(value + "01", 0)) {
                  callback()
                } else {
                  return callback(new Error('请输入正确的日期，日期格式为 {0}'))
                }
                break;
							case "yyyy-MM":
                if (isValidDate(value + "-01", 1)) {
                  callback()
                } else {
                  return callback(new Error('请输入正确的日期，日期格式为 {0}'))
                }
                break;
							case "yyyyMMdd":
                if (isValidDate(value, 0)) {
                  callback()
                } else {
                  return callback(new Error('请输入正确的日期，日期格式为 {0}'))
                }
                break;
							case "yyyy-MM-dd":
                if (isValidDate(value, 1)) {
                  callback()
                } else {
                  return callback(new Error('请输入正确的日期，日期格式为 {0}'))
                }
                break;
							case "yyyyMMddHH":
                if (isValidDateTime(value + "0000", 0)) {
                  callback()
                } else {
                  return callback(new Error('请输入正确的日期，日期格式为 {0}'))
                }
                break;
							case "yyyy-MM-dd HH":
                if (isValidDateTime(value + ":00:00", 1)) {
                  callback()
                } else {
                  return callback(new Error('请输入正确的日期，日期格式为 {0}'))
                }
                break;
							case "yyyyMMddHHmm":
                if (isValidDateTime(value + "00", 0)) {
                  callback()
                } else {
                  return callback(new Error('请输入正确的日期，日期格式为 {0}'))
                }
                break;
							case "yyyy-MM-dd HH:mm":
                if (isValidDateTime(value + ":00", 1)) {
                  callback()
                } else {
                  return callback(new Error('请输入正确的日期，日期格式为 {0}'))
                }
                break;
							case "yyyyMMddHHmmss":
                if (isValidDateTime(value, 0)) {
                  callback()
                } else {
                  return callback(new Error('请输入正确的日期，日期格式为 {0}'))
                }
                break;
							case "yyyy-MM-dd HH:mm:ss":
                if (isValidDateTime(value, 1)) {
                  callback()
                } else {
                  return callback(new Error('请输入正确的日期，日期格式为 {0}'))
                }
                break;
						}
					}
        }
        callback()
      } else {
        callback()
      }
    }
    // 请输入正确的车牌号码
    Vue.prototype.cphm = (rule, value, callback) => {
      let param = rule.param
      let required = rule.required
      let re=/^[\u4e00-\u9fa5]{1}[A-Z]{1}[A-Z_0-9]{5}$/
      if (required) {
          Vue.prototype.notNull(rule, value, callback)
          if (re.test(value)) {
            callback()
          } else {
            return callback(new Error('请输入正确的车牌号码'))
          }
      } else if (value) {
        if (re.test(value)) {
          callback()
        } else {
          return callback(new Error('请输入正确的车牌号码'))
        }
      } else {
        callback()
      }
    }
    // 请输入正确的(VIN)车架号
    Vue.prototype.cjh = (rule, value, callback) => {
      let param = rule.param
      let required = rule.required
      let re=/^[A-Z0-9]{17}$/
      if (required) {
          Vue.prototype.notNull(rule, value, callback)
          if (re.test(value)) {
            callback()
          } else {
            return callback(new Error('请输入正确的(VIN)车架号'))
          }
      } else if (value) {
        if (re.test(value)) {
          callback()
        } else {
          return callback(new Error('请输入正确的(VIN)车架号'))
        }
      } else {
        callback()
      }
    }
    // 请输入正确的发动机号(30位内的数字和大写字母)
    Vue.prototype.fdjh = (rule, value, callback) => {
      let param = rule.param
      let required = rule.required
      let re=/^[0-9A-Z]{0,30}$/
      if (required) {
          Vue.prototype.notNull(rule, value, callback)
          if (re.test(value)) {
            callback()
          } else {
            return callback(new Error('请输入正确的发动机号(30位内的数字和大写字母)'))
          }
      } else if (value) {
        if (re.test(value)) {
          callback()
        } else {
          return callback(new Error('请输入正确的发动机号(30位内的数字和大写字母)'))
        }
      } else {
        callback()
      }
    }
    // 输入正确的16位或者19位银行卡号!
    Vue.prototype.yhkh = (rule, value, callback) => {
      let param = rule.param
      let required = rule.required
      let re=/^([0-9]{16}|[0-9]{19})$/
      if (required) {
        Vue.prototype.notNull(rule, value, callback)
        if (re.test(value)) {
          callback()
        } else {
          return callback(new Error('请输入正确的16位或者19位银行卡号!'))
        }
      } else if (value) {
        if (re.test(value)) {
          callback()
        } else {
          return callback(new Error('请输入正确的16位或者19位银行卡号!'))
        }
      } else {
        callback()
      }
    }
    // 输入正确的(15位数字(英文字母))IMEI号!
    Vue.prototype.imei = (rule, value, callback) => {
      let param = rule.param
      let required = rule.required
      let re=/^([A-Za-z0-9]{15})$/
      if (required) {
        Vue.prototype.notNull(rule, value, callback)
        if (re.test(value)) {
          callback()
        } else {
          return callback(new Error('请输入正确的(15位数字(英文字母))IMEI号!'))
        }
      } else if (value) {
        if (re.test(value)) {
          callback()
        } else {
          return callback(new Error('请输入正确的(15位数字(英文字母))IMEI号!'))
        }
      } else {
        callback()
      }
    }
    // 输入正确的(15位数字)IMSI号!
    Vue.prototype.imsi = (rule, value, callback) => {
      let param = rule.param
      let required = rule.required
      let re=/^([0-9]{15})$/
      if (required) {
        Vue.prototype.notNull(rule, value, callback)
        if (re.test(value)) {
          callback()
        } else {
          return callback(new Error('请输入正确的(15位数字)IMSI号!'))
        }
      } else if (value) {
        if (re.test(value)) {
          callback()
        } else {
          return callback(new Error('请输入正确的(15位数字)IMSI号!'))
        }
      } else {
        callback()
      }
    }
    // 序列号必须是50位以下的数字或大写字母!
    Vue.prototype.xlh = (rule, value, callback) => {
      let param = rule.param
      let required = rule.required
      let re=/^[0-9A-Z]{0,50}$/
      if (required) {
        Vue.prototype.notNull(rule, value, callback)
        if (re.test(value)) {
          callback()
        } else {
          return callback(new Error('序列号必须是50位以下的数字或大写字母!'))
        }
      } else if (value) {
        if (re.test(value)) {
          callback()
        } else {
          return callback(new Error('序列号必须是50位以下的数字或大写字母!'))
        }
      } else {
        callback()
      }
    }
    // 现场勘验编号输入不合法（23位字符组成，首字母为K,其他字符为数字）！
    Vue.prototype.xckybh = (rule, value, callback) => {
      let param = rule.param
      let required = rule.required
      let re=/^K[0-9]{22}$/
      if (required) {
        Vue.prototype.notNull(rule, value, callback)
        if (re.test(value)) {
          callback()
        } else {
          return callback(new Error('现场勘验编号输入不合法（23位字符组成，首字母为K,其他字符为数字）！'))
        }
      } else if (value) {
        if (re.test(value)) {
          callback()
        } else {
          return callback(new Error('现场勘验编号输入不合法（23位字符组成，首字母为K,其他字符为数字）！'))
        }
      } else {
        callback()
      }
    }
    // 电机或钢印号输入不合法（20位以内的大写字母、数字或-）！
    Vue.prototype.djhgyh = (rule, value, callback) => {
      let param = rule.param
      let required = rule.required
      let re=/^[A-Z|0-9|\-]{0,20}$/
      if (required) {
        Vue.prototype.notNull(rule, value, callback)
        if (re.test(value)) {
          callback()
        } else {
          return callback(new Error('电机或钢印号输入不合法（20位以内的大写字母、数字或-）！'))
        }
      } else if (value) {
        if (re.test(value)) {
          callback()
        } else {
          return callback(new Error('电机或钢印号输入不合法（20位以内的大写字母、数字或-）！'))
        }
      } else {
        callback()
      }
    }
    // ICCID输入不合法（89860+15位数字和大写字母组合）！
    Vue.prototype.iccid = (rule, value, callback) => {
      let param = rule.param
      let required = rule.required
      let re=/^[8][9][8][6][0][A-Z0-9]{15}$/
      if (required) {
        Vue.prototype.notNull(rule, value, callback)
        if (re.test(value)) {
          callback()
        } else {
          return callback(new Error('ICCID输入不合法（89860+15位数字和大写字母组合）！'))
        }
      } else if (value) {
        if (re.test(value)) {
          callback()
        } else {
          return callback(new Error('ICCID输入不合法（89860+15位数字和大写字母组合）！'))
        }
      } else {
        callback()
      }
    }
  }
}
