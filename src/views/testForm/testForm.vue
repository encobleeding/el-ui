<template>
  <section class="form-section">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
      <el-form-item label="邮箱" prop="diy">
        <el-input 
        v-model="ruleForm.diy"
        placeholder="请输入内容">
        </el-input>
      </el-form-item>
      <el-form-item label="用户名" prop="name">
        <el-input 
        v-model="ruleForm.name"
        placeholder="请输入内容"
        clearable>
        </el-input>
      </el-form-item>
      <el-form-item label="密码" prop="passworld">
        <el-input 
        type="password"
        v-model="ruleForm.passworld"
        placeholder="请输入内容"
        clearable>
        </el-input>
      </el-form-item>
      <el-form-item label="身份证号" prop="id">
        <el-input 
        v-model="ruleForm.id"
        placeholder="请输入内容"
        clearable>
        </el-input>
      </el-form-item>
      <el-form-item label="计数器">
        <el-input-number v-model="ruleForm.num" :min="1" :max="10" label="描述文字"></el-input-number>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm', isChange)">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
        <el-button @click="changeForm()">新建/更改</el-button>
      </el-form-item>
    </el-form>
    <!-- <v-table class="demo-table"></v-table> -->
  </section>
</template>
<script>
  import axios from 'axios'
  import newtable from 'src/views/testForm/testTable'
  export default {
    data() {
/**
    var name = (rule, value, callback) => {
      let param = rule.param
      let required = rule.required
      if (required) {
        notNull(rule, value, callback)
      } else if (value) {

      } else {
        callback()
      }
    }
 */
      // let validateDiy = (rule, value, callback) => {
      //   this.$store.dispatch('validateDiy', {rule, value, callback})
      // }
      // let noMark = (rule, value, callback) => {
      //   this.$store.dispatch('noMark', {rule, value, callback})
      // }
      // let naturalNumber = (rule, value, callback) => {
      //   this.$store.dispatch('naturalNumber', {rule, value, callback})
      // }
      // let naturalNumberRange = (rule, value, callback) => {
      //   this.$store.dispatch('naturalNumberRange', {rule, value, callback})
      // }
      // let numeric = (rule, value, callback) => {
      //   this.$store.dispatch('numeric', {rule, value, callback})
      // }
      // let numericRange = (rule, value, callback) => {
      //   this.$store.dispatch('numericRange', {rule, value, callback})
      // }
      // var validateDiy = (rule, value, callback) => {
      //   let param = rule.param
      //   let required = rule.required
      //   if (required) {
      //     notNull(rule, value, callback)
      //     if (value < 18) {
      //       callback(new Error('必须年满18岁'))
      //     } else {
      //       callback()
      //     }
      //   } else if (value) {
      //     if (value < 18) {
      //       callback(new Error('必须年满18岁'))
      //     } else {
      //       callback()
      //     }
      //   } else {
      //     callback()
      //   }
      // }
      // 不能为空验证（公共使用）
      // var notNull = (rule, value, callback) => {
      //   let newTitle = rule.label ? rule.label : '此字节'
      //   if (!value) {
      //     return callback(new Error(newTitle + '不能为空'))
      //   }
      // }
      // 不能包含有单引号、双引号、分号
      // var noMark = (rule, value, callback) => {
      //   let param = rule.param
      //   let required = rule.required
      //   if (required) {
      //     notNull(rule, value, callback)
      //     if (!(/^[^"^;^']*$/.test(value))) {
      //       return callback(new Error('不能包含有单引号、双引号、分号'))
      //     } else {
      //       callback()
      //     }
      //   } else if (value) {
      //     if (!(/^[^"^;^']*$/.test(value))) {
      //       return callback(new Error('不能包含有单引号、双引号、分号'))
      //     } else {
      //       callback()
      //     }
      //   } else {
      //     callback()
      //   }
      // }
      // // 正确的自然数格式
      // var naturalNumber = (rule, value, callback) => {
      //   let param = rule.param
      //   let required = rule.required
      //   if (required) {
      //     notNull(rule, value, callback)
      //     if (!(/^[+]?[0-9]+\d*$/i.test(value))) {
      //       return callback(new Error('请输入正确的自然数格式'))
      //     } else {
      //       callback()
      //     }
      //   } else if (value) {
      //     if (!(/^[+]?[0-9]+\d*$/i.test(value))) {
      //       return callback(new Error('请输入正确的自然数格式'))
      //     } else {
      //       callback()
      //     }
      //   } else {
      //   callback()
      //   }
      // }
      // 正确的自然数格式且值在 {rule['param'][0]} 与 {rule['param'][1]} 之间 (需要在rule配置param:[])
      // var naturalNumberRange = (rule, value, callback) => {
      //   let param = rule.param
      //   let required = rule.required
      //   if (required) {
      //     notNull(rule, value, callback)
      //     let returnValue = false
      //     if (/^[+]?[1-9]+\d*$/i.test(value)) {
      //       returnValue = true
      //       value = parseInt(value)
      //       if (param[0] !== undefined) {
      //         returnValue = (value >= param[0]);
      //       }
      //       if (param[1] !== undefined) {
      //         returnValue = returnValue && (value <= param[1]);
      //       }
      //     }
      //     if (!returnValue) {
      //       return callback(new Error(`请输入正确的自然数格式且值在 ${param[0]} 与 ${param[1]} 之间`))
      //     } else {
      //       return callback()
      //     }
      //   } else if (value) {
      //     let returnValue = false
      //     if (/^[+]?[1-9]+\d*$/i.test(value)) {
      //       returnValue = true
      //       value = parseInt(value)
      //       if (param[0] !== undefined) {
      //         returnValue = (value >= param[0]);
      //       }
      //       if (param[1] !== undefined) {
      //         returnValue = returnValue && (value <= param[1]);
      //       }
      //     }
      //     if (!returnValue) {
      //       return callback(new Error(`请输入正确的自然数格式且值在 ${param[0]} 与 ${param[1]} 之间`))
      //     } else {
      //       return callback()
      //     }
      //   } else {
      //     callback()
      //   }
      // }
      // 请输入指定类型的数字格式
      // var numeric = (rule, value, callback) => {
      //   let param = rule.param
      //   let required = rule.required
      //   if (required) {
      //     notNull(rule, value, callback)
      //     if (param) {
      //       let returnValue = false
      //       switch (param[0]) {
      //         case "+": // 正数
      //           returnValue = /(^\+?|^\d?)\d*\.?\d+$/.test(value);
      //           break;
      //         case "-": // 负数
      //           returnValue = /^-\d*\.?\d+$/.test(value);
      //           break;
      //         case "i": // 整数
      //           returnValue = /(^-?|^\+?|\d)\d+$/.test(value);
      //           break;
      //         case "+i": // 正整数
      //           returnValue = /^\+?[1-9]\d*$/.test(value);
      //           break;
      //         case "-i": // 负整数
      //           returnValue = /^[-]\d+$/.test(value);
      //           break;
      //         case "f": // 浮点数
      //           returnValue = /(^-?|^\+?|^\d?)\d*\.?\d+$/.test(value);
      //           if (rule.param[1] !== undefined) {
      //             let dotPos = value.indexOf(".");
      //             if (dotPos !== -1 && value.length - dotPos - 1 > param[1]) {
      //               returnValue = false;
      //             }
      //           }
      //           break;
      //         case "+f": // 正浮点数
      //           returnValue = /(^\+?|^\d?)\d*\.?\d+$/.test(value);
      //           if (param[1] !== undefined) {
      //             let dotPos = value.indexOf(".");
      //             if (dotPos !== -1 && value.length - dotPos - 1 > param[1]) {
      //               returnValue = false;
      //             }
      //           }
      //           break;
      //         case "-f": // 负浮点数
      //           returnValue = /^[-]\d*\.?\d$/.test(value);
      //           if (param[1] !== undefined) {
      //             let dotPos = value.indexOf(".");
      //             if (dotPos !== -1 && value.length - dotPos - 1 > param[1]) {
      //               returnValue = false;
      //             }
      //           }
      //           break;
      //         default: // 缺省为整数
      //           returnValue = /(^-?|^\+?|\d)\d+$/.test(value);
      //           break;
      //       }
      //       if (!returnValue) {
      //         return callback(new Error('请输入指定类型的数字格式'))
      //       } else {
      //         callback()
      //       }
      //     } else {
      //       if (!/(^-?|^\+?|\d)\d+$/.test(value)) {
      //         return callback(new Error('请输入指定类型的数字格式'))
      //       } else {
      //         callback()
      //       }
      //     }
      //   } else if (value) {
      //     if (param) {
      //       let returnValue = false
      //       switch (param[0]) {
      //         case "+": // 正数
      //           returnValue = /(^\+?|^\d?)\d*\.?\d+$/.test(value);
      //           break;
      //         case "-": // 负数
      //           returnValue = /^-\d*\.?\d+$/.test(value);
      //           break;
      //         case "i": // 整数
      //           returnValue = /(^-?|^\+?|\d)\d+$/.test(value);
      //           break;
      //         case "+i": // 正整数
      //           returnValue = /^\+?[1-9]\d*$/.test(value);
      //           break;
      //         case "-i": // 负整数
      //           returnValue = /^[-]\d+$/.test(value);
      //           break;
      //         case "f": // 浮点数
      //           returnValue = /(^-?|^\+?|^\d?)\d*\.?\d+$/.test(value);
      //           if (rule.param[1] !== undefined) {
      //             let dotPos = value.indexOf(".");
      //             if (dotPos !== -1 && value.length - dotPos - 1 > param[1]) {
      //               returnValue = false;
      //             }
      //           }
      //           break;
      //         case "+f": // 正浮点数
      //           returnValue = /(^\+?|^\d?)\d*\.?\d+$/.test(value);
      //           if (param[1] !== undefined) {
      //             let dotPos = value.indexOf(".");
      //             if (dotPos !== -1 && value.length - dotPos - 1 > param[1]) {
      //               returnValue = false;
      //             }
      //           }
      //           break;
      //         case "-f": // 负浮点数
      //           returnValue = /^[-]\d*\.?\d$/.test(value);
      //           if (param[1] !== undefined) {
      //             let dotPos = value.indexOf(".");
      //             if (dotPos !== -1 && value.length - dotPos - 1 > param[1]) {
      //               returnValue = false;
      //             }
      //           }
      //           break;
      //         default: // 缺省为整数
      //           returnValue = /(^-?|^\+?|\d)\d+$/.test(value);
      //           break;
      //       }
      //       if (!returnValue) {
      //         return callback(new Error('请输入指定类型的数字格式'))
      //       } else {
      //         callback()
      //       }
      //     } else {
      //       if (!/(^-?|^\+?|\d)\d+$/.test(value)) {
      //         return callback(new Error('请输入指定类型的数字格式'))
      //       } else {
      //         callback()
      //       }
      //     }
      //   } else {
      //     callback()
      //   }
      // }
      return {
        isChange: false,
        num: 1,
		    url: 'static/json/formData.js',
        formData: {},            // 服务器拿回的表单的初始数据
        forceKey: ['diy', 'name'], // 强制上传的key值
        ruleForm: {              // 表单数据
          diy: '',
          name: '',
          passworld: '',
          id: '',
          num: 1
        },
        rules: {
          diy: [
            {required: true, validator: this.email, trigger: 'blur,change', label: '年龄', param: [3]}
          ],
          name: [
            {required: true, validator: this.naturalNumberRange, trigger: 'blur,change', param: [1, 10]}
          ],
          passworld: [
            {required: true, message: '请输入密码', trigger: 'blur,change'},
            {min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur,change'}
          ],
          id: [
            {required: false, validator: this.sfzh, trigger: 'blur,change'}
          ]
        }
      };
    },
    components: {
      'v-table': newtable
    },
    methods: {
      getData(isChange) {
        if (isChange) {
          console.log('Changing')
          axios.get(this.url).then((res) => {
            let datas = res.data
            for (let item in datas) {
              this.formData[item] = datas[item]
            }
            for (let item in datas) {
              this.ruleForm[item] = datas[item]
            }
            console.log(this.ruleForm, this.formData)
          })
        } else {
          this.ruleForm = {diy: '', name: '', passworld: '', id: ''}
          console.log('noChange')
        }
      },
      // isChange是否是更改数据
      // formData是表单原本的数据（要修改的数据）
      submitForm(formName, isChange) {
        this.$refs[formName].validate((valid) => {
          if (valid && isChange) {  // 更改数据
            let newpara = this.ruleForm
            let para = this.formData
            let update = {}
            // let newpara = Object.assign({}, this.ruleForm);
            // let para = Object.assign({}, this.formData);
            for (let i=0; i<this.forceKey.length; i++) {
              for (let item in newpara) {
                if (this.forceKey[i] === item) {
                  update[item] = newpara[item]
                } else {
                  if (newpara[item] !== para[item]) {
                    update[item] = newpara[item]
                  }
                }
              }
            }
            // console.log(update); // 提交修改和指定提交的数据
            this.$store.state.formValidate.formData.push(update)
            // console.log(this.$store.state.formValidate.formData)
            this.$message({
              message: "修改成功，请在控制台查看json!！",
              type: 'success'
            });
          } else if (valid && !isChange) {  // 填入新的数据
            let newpara = this.ruleForm
            let update = {}
            for (let i=0; i<this.forceKey.length; i++) {
              for (let item in newpara) {
                if (this.forceKey[i] === item) {
                  update[item] = newpara[item]
                } else if (newpara[item]) {
                  update[item] = newpara[item]
                }
              }
            }
            console.log(update);
            this.$store.state.formValidate.formData.push(update)
            this.$message({
              message: "提交成功，请在控制台查看json!！",
              type: 'success'
            });
          } else {
            this.$message({
              message: "请按照要求填写!！",
              type: 'error'
            });
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      changeForm() {
        this.isChange = !this.isChange
        this.getData(this.isChange)
      }
    },
    created() {
      this.getData(this.isChange)
    }
  }
</script>
<style>
  .form-section {
    padding: 10px;
    width: 100%;
  }
  .demo-ruleForm {
    widows: 500px;
    float: left;
  }
  .demo-table {
    width: 800px!important;
    float: left;
    margin-left: 100px;
  }
</style>
