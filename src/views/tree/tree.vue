<template id="treenews">
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
    v-show="seen"
    @keyup.up.native="keyupEvent()"
    class="newinput">
  </el-input>

  <el-tree
    class="filter-tree"
    :data="data2"
    node-key="id"
    :default-expanded-keys="getopenid"
    :default-checked-keys="getchekcid"
    show-checkbox
    :check-strictly="false"
    render-after-expand
    highlight-current
    :props="defaultProps"
    :filter-node-method="filterNode"
    ref="tree"
    @check-change="handleNodeCheckClick"
    v-show="seen"
    :render-content="renderContent">
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
        this.$refs.tree.filter(val)
      }
    },
    computed: {
      fullName(){
        return  this.id  + " " +this.text;
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
      convertData2(id) {
        axios.get(this.fiterID.url).then((res) => {
          let datas = res.data
          this.ddget3(id,datas)
          this.data2 = datas
        })
      },
      filterNode(value, data) {
        if (!value) return true;
        let ssjg = []
        let fillterCondients = this.fiterID.searchlabel
        if (fillterCondients[0]) ssjg.push(data.id)
        if (fillterCondients[1]) ssjg.push(data.text)
        if (fillterCondients[2]) ssjg.push(data.py)
        if (fillterCondients[3]) ssjg.push(data.wb)
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
            this.result = data.id + ',' + this.result
            this.trueresult = data.id + ',' + this.trueresult
          }
        } else {
          let hasCheckText = node.data.text + ","
          let nowTxt = this.result
          const reg = new RegExp(hasCheckText)
          let newResult = nowTxt.replace(reg, "")
          this.result = newResult
          let hasCheckText2 = node.data.id + ","
          let nowTxt2 = this.trueresult
          const reg2 = new RegExp(hasCheckText2)
          let newResult2 = nowTxt2.replace(reg2, "")
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
      handleNodeCheckClick(node, data, store) { // 复选框事件
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
          if(this.fiterID.onLeaf == "true"){
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
          } else {
            if(!node.justmeClick) {
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
            } else {
              node.justmeClick = 'false'
            }
          }
        }
      },
      justme(node, data) { //右侧只选择根节点
        data.justmeClick = true
        event.cancelBubble = true;
        // const parent = node.childNodes
        // const children = parent.data.children || parent.data;
        // const index = children.findIndex(d => d.id === data.id);
        let nowstate = node.checked
        let nowindeterminate = node.indeterminate
        let nowChildState = node.childNodes[0].checked
        let childNode = node.childNodes
        if (nowChildState){
            node.checked = true
            node.indeterminate = false
            this.value5.push(data.text)
            this.value5id.push({'txt':data.text, 'id':data.id})
          } else if (!nowstate) {
          node.checked = true
          node.indeterminate = false
          let parentNode = node.parent
          for (let i=0; i<node.level-1; i++) {
            if(!parentNode.disabled)
              parentNode.indeterminate = true
              parentNode = parentNode.parent
          }
          this.value5.push(data.text)
          this.value5id.push({'txt':data.text, 'id':data.id})
        } else {
          node.checked = false
          let parentNode = node.parent
          let nodeNum = 0
          node.parent.childNodes.forEach((value, index, array) => {
            if (value.checked || value.indeterminate){
              nodeNum++
            }
          });
          if (!nodeNum) {
            for (let i=0; i<node.level-1; i++) {
              parentNode.indeterminate = false
              parentNode = parentNode.parent
            }
          }
          let haschecArr = node.data.text
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
        this.forEachChild(node.childNodes)
      },
      forEachChild(node) {
        node.forEach((value, index, array) => {
          if (value.checked || value.indeterminate){
            value.checked = false
            value.indeterminate = false
          }
          if (value.childNodes) {
            this.forEachChild(value.childNodes)
          }
        });
      },
      removeTag(data) { //移除文本框标签
        let tabTxt = data.value
        for(let i = 0; i < this.value5id.length; i++){
          if(this.value5id[i].txt == tabTxt){
            this.$refs.tree.setChecked (this.value5id[i].id, false)
            this.value5id.splice(i, 1)
          }
        }
      },
      keyupEvent: function () {
        this.open("tips","你按了上键！")
      },
      renderContent(h, { node, data, store, fitter}) {
        fitter = this.fiterID.filterid
        fitter.forEach((value, index, array) => {
          let patt1 = RegExp("^(?=(" + fitter[index] + "))");
          if(patt1.test(data.id)) {
            node.visible = false
          }
        });
        let showlabeltxt = this.fiterID.labeltxt
        if(showlabeltxt[0] == 'id' && showlabeltxt[1] == 'text'){
          if(data.disabled){
            return (
              <span style="width:85%; flex: 1; display:inline-flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
                <span style="width:90%;overflow:hidden;">
                  <span>{data.id} &#166; {data.text}</span>
                </span>
              </span>);
          }
          else if(node.isLeaf){
            return (
              <span style="width:85%; flex: 1; display:inline-flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
                <span style="width:90%;overflow:hidden;">
                  <span>{data.id} &#166; {data.text}</span>
                </span>
              </span>);
          }
          else{
            if(this.fiterID.onLeaf == "false"){
            return (
              <span style="width:85%; flex: 1; display:inline-flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
                <span style="width:90%;overflow:hidden;">
                  <span>{data.id} &#166; {data.text}</span>
                </span>
                <span style="width:10%; text-align:right;">
                  <el-button type="text" on-click={ () => this.justme(node, data) }><i class="el-icon-check"></i></el-button>
                </span>
              </span>);
            }
            else {
              return (
              <span style="width:85%; flex: 1; display:inline-flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
                <span style="width:90%;overflow:hidden;">
                  <span>{data.id} &#166; {data.text}</span>
                </span>
              </span>);
            }
          }
        }
        else {
          if(data.disabled){
            return (
              <span style="width:85%; flex: 1; display:inline-flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
                <span style="width:90%;overflow:hidden;">
                  <span>{data.text}</span>
                </span>
              </span>);
          }
          else if(node.isLeaf){
            return (
              <span style="width:85%; flex: 1; display:inline-flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
                <span style="width:90%;overflow:hidden;">
                  <span>{data.text}</span>
                </span>
              </span>);
          }
          else{
            return (
              <span style="width:85%; flex: 1; display:inline-flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
                <span style="width:90%;overflow:hidden;">
                  <span>{data.text}</span>
                </span>
                <span style="width:10%; text-align:right;">
                  <el-button type="text" on-click={ () => this.justme(node, data) }><i class="el-icon-check"></i></el-button>
                </span>
              </span>);
          }
        }
      },
      idtoObj(firstdata){ //通过ID查询文本
        axios.get(this.fiterID.url).then((res) => {
          let data2 = res.data
          this.ddget(firstdata,data2)
        });
      },
      ddget(firstdata,newdata2) { // 默认选中
        newdata2.forEach((value, index, array) => {
          for(let j = 0; j< firstdata.length; j++) {
              if(value.id == firstdata[j]) {
                this.value5id.push({'txt':value.text, 'id':value.id})
                this.value5.push(value.text)
                this.getchekcid.push(value.id)
              }
          }
          if(value.children !== '' && value.children !== undefined) {
            this.ddget(firstdata,value.children)
          }
        });
      },
      idtoObj2(firstdata){ // 通过ID查询文本
        axios.get(this.fiterID.url).then((res) => {
          let data2 = res.data
          this.ddget2(firstdata,data2)
        });
      },
      ddget2(firstdata,newdata2) { // 默认展开
        newdata2.forEach((value, index, array) => {
          for(let j = 0; j< firstdata.length; j++) {
              if(value.id == firstdata[j]) {
                this.getopenid.push(firstdata[j])
              }
          }
          if(value.children !== '' && value.children !== undefined) {
            this.ddget2(firstdata,value.children)
          }
        });
      },
      idtoObj3(firstdata){ // 通过ID查询文本
        axios.get(this.fiterID.url).then((res) => {
          let data2 = res.data
          this.ddget3(firstdata,data2)
        })
      },
      ddget3(firstdata,newdata2) { // 默认禁用
        newdata2.forEach((value, index, array) => {
          for(let j = 0; j< firstdata.length; j++) {
              if(value.id == firstdata[j]) {
                this.getdisableid.push(value.id)
                value.disabled = true
              }
          }
          if(value.children !== '' && value.children !== undefined) {
            this.ddget3(firstdata,value.children)
          }
        });
      },
      open(title,content) {
        const h = this.$createElement;
        this.$notify({
          title: title,
          message: h('i', { style: 'color: teal'}, content)
        });
      }
    },
    props: [
      "fiterID"
    ],
    data() {
      return {
        filterText: '',
        data2: [],
        defaultProps: {
          children: 'children',
          label: 'newval',
          isLeaf: 'leaf'
        },
        result: '',
        trueresult: '',
        seen: false,
        value5: [],
        value5id: [],
        getchekcid: [],
        getopenid: [],
        getdisableid: []
      };
    },
    created() {
      this.idtoObj(this.fiterID.defaultcheck) //默认选中
      this.idtoObj2(this.fiterID.defaultopen) //默认展开
      this.convertData2(this.fiterID.defaultdisabled) //初始化数据
      // this.idtoObj3(this.fiterID.defaultdisabled) // 默认禁用
    }
  };
</script>
