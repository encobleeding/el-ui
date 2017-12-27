<template>
  <section class="form-section">
  <el-select
    v-model="value5"
    multiple
    @remove-tag="removeTag"
    popper-class="hidden"
    @visible-change="showtree"
    default-first-option
    placeholder="请选择以下条目"
    class="inputWidth">
  </el-select>

  <!-- <el-input v-model="result" @focus="showtree"></el-input> -->

  <el-input
    placeholder="输入ID,汉字，拼音字母，五笔字母可以查询"
    v-model="filterText"
    v-if="seen"
    @keyup.up.native="keyupEvent()"
    class="newinput">
  </el-input>

  <el-tree
    class="filter-tree"
    :data="data2"
    node-key="id"
    show-checkbox
    :check-strictly="false"
    render-after-expand
    highlight-current
    :props="defaultProps"
    :filter-node-method="filterNode"
    ref="tree"
    @node-click="handleNodeoneClick"
    @check-change="handleNodeCheckClick"
    v-if="seen"
    default-expand-all
    :render-content="renderContent"
    :expand-on-click-node="false">
  </el-tree>
  </section>
</template>

<style>
.inputWidth{width:500px;}
.el-tree{max-height: 500px; overflow-y: auto;}
.newinput{margin-top:20px; margin-bottom:-1px;}
.hidden,.el-input__icon.el-icon-caret-top{display:none;}
</style>
<script type="text/jsx">
  import axios from 'axios'
  import _ from 'lodash'
  let id = 1000;
  export default {
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      }
    },
    methods: {
      diguidata(data2) {
        this.data2.forEach((value, index, array) => {
          value.newval = value.id + ' | ' + value.text
          if(value.children !== '' && value.children !==undefined) {
            //this.diguidata(value.children)
          }
          else{
            return false;
          }
        });
        return data2
      },
      convertData2() {
        axios.get('static/json/GA_D_XSAJLBDM.js').then((res) => {
          let datas = res.data
          this.data2 = datas
          //this.diguidata(this.data2)
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
      keyupEvent: function () {
        alert('你按了上键！');
      },
      renderContent(h, { node, data, store }) {
        return (
          <span style="width:85%; flex: 1; display:inline-flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
            <span>
              <span>{data.id} &#166; {data.text}</span>
            </span>
          </span>);
      }
    },
    data() {
      return {
        filterText: '',
        data2: [],
        defaultProps: {
          children: 'children',
          label: 'newval'
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
