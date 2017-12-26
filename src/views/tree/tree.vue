<template>
  <section class="form-section">
  <el-select v-model="value5" multiple @remove-tag="removeTag" popper-class="hidden"  @visible-change="showtree"></el-select>

  <el-input v-model="result" @focus="showtree"></el-input>

  <el-input placeholder="输入ID,汉字，拼音字母，五笔字母进行过滤" v-model="filterText" v-if="seen" class="newinput"></el-input>

  <el-tree
    class="filter-tree"
    :data="data2"
    node-key="id"
    show-checkbox
    :check-strictly="false"
    highlight-current
    :props="defaultProps"
    :filter-node-method="filterNode"
    ref="tree"
    @node-click="handleNodeoneClick"
    @check-change="handleNodeCheckClick"
    v-if="seen"
    default-expand-all
    :expand-on-click-node="false">
  </el-tree>
  </section>
</template>

<style>
.newinput{margin-top:20px; margin-bottom:-1px;border-left-bottom-radius:0;border-right-bottom-radius:0;}
.hidden,.el-input__icon.el-icon-caret-top{display:none;}
</style>
<script type="text/jsx">
  import axios from 'axios'
  let id = 1000;
  export default {
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      }
    },
    methods: {
      convertData2() {
        axios.get('static/json/GA_D_XSAJLBDM.js').then((res) => {
          let datas = res.data
          this.data2 = datas
          this.data2.forEach((index, value, array) => {});
          // 第一个参数是遍历的数组内容，第二个参数是对应的数组索引，第三个参数是数组本身
        })
      },
      dataHandle(data, node) {},
      filterNode(value, data) {
        if (!value) return true;
        let ssjg = []
        ssjg.push(data.id)
        ssjg.push(data.text)
        ssjg.push(data.py)
        ssjg.push(data.wb);
        return ssjg.toString().indexOf(value) !== -1
      },
      handleNodeClick(data, node) {
        if (node.isLeaf) {
          if (!node.checked) {
            node.checked = true
          } else {
            node.checked = false
          }
        }
        if (node.checked) {
          let isexits = this.result.indexOf(data.text)
          if (isexits === -1 && node.isLeaf === true) {
            this.result = data.id + ',' + this.result;
            this.trueresult = data.id + ',' + this.trueresult;
          }
        } else {
          let hasCheckText = node.data.text + ","
          let nowTxt = this.result
          const reg = new RegExp(hasCheckText);
          let newResult = nowTxt.replace(reg, "");
          this.result = newResult
          let hasCheckText2 = node.data.id + ","
          let nowTxt2 = this.trueresult
          const reg2 = new RegExp(hasCheckText2);
          let newResult2 = nowTxt2.replace(reg2, "");
          this.trueresult = newResult2
        }
      },
      handleNodeoneClick(obj, node, data) {
        let nowstate = node.checked
        if (nowstate) {
          node.checked = false
        } else {
          node.checked = true
        }
      },
      showtree() {
        this.seen = true
      },
      handleNodeCheckClick(node, data, store) {
        if (data && !store) {}
        if (!node.children && data) {
          let isexits = this.result.indexOf(node.text)
          if (isexits === -1) {
            this.result = node.text + ',' + this.result;
          }
          let arryexits = this.value5.indexOf(node.text)
          if (arryexits === -1) {
            this.value5.push(node.text)
            this.value5id.push({'txt':node.text, 'id':node.id})
          }
        } else {
          let hasCheckText = node.text + ","
          let nowTxt = this.result
          const reg = new RegExp(hasCheckText);
          let newResult = nowTxt.replace(reg, "");
          this.result = newResult
          let haschecArr = node.text
          let index = this.value5.indexOf(haschecArr);
          if (index > -1) {
            this.value5.splice(index, 1)
          }
          let hasidchecArr = node.id
          this.value5id.forEach((value, index, array) => {
            let idindex = value.id.indexOf(hasidchecArr)
            if (idindex > -1) {
              this.value5id.splice(index, 1)
            }
          });
        }
      },
      removeTag(data) {
        let tabTxt = data.value
        for(let i = 0; i < this.value5id.length; i++){
          if(this.value5id[i].txt == tabTxt){
            this.$refs.tree.setChecked (this.value5id[i].id, false)
            this.value5id.splice(i, 1)
          }
        }
      },
    },
    data() {
      return {
        filterText: '',
        data2: [],
        defaultProps: {
          children: 'children',
          label: 'text'
        },
        result: '',
        trueresult: '',
        seen: false,
        value5: [],
        value5id: []
      };
    },
    created() {
      this.convertData2()
    }
  };
</script>
