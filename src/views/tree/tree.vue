<template id="treenews">
  <section class="form-section" @click.self="clickcourse()" :id="fiterID.id">
  <el-select
    v-model="value5"
    multiple
    @remove-tag="removeTag"
    popper-class="hidden"
    @visible-change="showtree"
    @change="showtree"
    @focus="showtree"
    default-first-option
    placeholder="请选择以下条目"
    class="inputWidth">
  </el-select>

  <!-- <el-input v-model="result" @focus="showtree"></el-input>  -->

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
    :show-checkbox="fiterID.isCheck"
    :check-strictly="fiterID.leafCheck"
    render-after-expand
    default-expand-all
    highlight-current
    :props="defaultProps"
    :filter-node-method="filterNode"
    ref="tree"
    @current-change="currentClick"
    @check-change="handleNodeCheckClick"
    v-show="seen"
    @node-click="radiohandleNodeClick"
    :render-content="renderContent">
  </el-tree>
   <el-button type="primary"  @click.stop="clickcourse()" v-show="seen">完成</el-button>
  </section>
</template>

<style>
.inputWidth{width:500px; height:44px;overflow: auto; border:1px solid #e4e4e4; background-color: #fff;}
.inputWidth .el-input input{border:0;}
.el-select__tags{top:50%;}
.el-tag.el-tag--primary{display:inline;}
.el-tree{max-height: 500px; overflow-y: auto;}
.newinput{margin-top:20px; margin-bottom:-1px;}
.hidden,.el-input__icon.el-icon-caret-top{display:none;}
.el-icon-check,.el-icon-circle-check{opacity: 0;}
.el-tree-node__content:hover .el-icon-check{opacity: 100;}
.el-tree-node__content:hover .el-icon-circle-check{opacity: 100;}
.el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content{background-color: #e4e8f1;}
.el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content .el-icon-circle-check{color:#20a0ff; opacity: 100;}
.el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content .el-icon-check{color:#20a0ff; opacity: 100;}
.bgclass{background-color:#fff;}
.bgclasshover{background-color:#20afff;}
.iconcehck{opacity: 100; color:#20afff;}
.form-section{float: left;}
</style>
<script type="text/jsx">
  import axios from 'axios'
  import _ from 'lodash'
  export default {
    watch: {
      filterText(val) {
        if(this.fiterID.filterid !== "" && this.fiterID.filterid !== undefined) {
            let reg = new RegExp(this.fiterID.filterid);
            if(reg.test(val)){
              return false
            }
            else{
              this.$refs.tree.filter(val)
            }
        }
        else{
          this.$refs.tree.filter(val)
        }
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
          if(value.children !== '' && value.children !== undefined) {
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
          var isArry = typeof datas === 'object' && datas.constructor == Array
          this.seen = false
          let aa =  _.indexOf(datas,"0100")
          
        })
      },
      filterNode(value, data) {
        let reg = new RegExp(this.fiterID.filterid);
        if(reg.test(value)){
            return false
        }
        else{
        if (!value) return true;
        let ssjg = []
        let fillterCondients = this.fiterID.searchlabel
        if (fillterCondients[0] == "id") ssjg.push(data.id)
        if (fillterCondients[1] == "txt") ssjg.push(data.text)
        if (fillterCondients[2] == "wb") {
          ssjg.push(data.wb)
          if(data.wb !== undefined) ssjg.push(data.wb.toLowerCase())
          if(data.wb !== undefined) ssjg.push(data.wb.toUpperCase())
        }
        if (fillterCondients[3] == "py") {
          ssjg.push(data.py)
          if(data.py !== undefined) ssjg.push(data.py.toLowerCase())
          if(data.py !== undefined) ssjg.push(data.py.toUpperCase())
        }
        // if (fillterCondients.indexOf("id") !== -1){}
        // if (fillterCondients.indexOf("txt") !== -1){}
        // if (fillterCondients.indexOf("wb") !== -1){}
        // if (fillterCondients.indexOf("py") !== -1){}
        return ssjg.toString().indexOf(value) !== -1
        }
      },
      handleNodeClick(data, node) { //节点点击
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
      radiohandleNodeClick(data, node) { //节点点击
        if(this.fiterID.isCheck){ //复选
          if(data.children){}
          else{
            if(node.checked){
              node.checked = false
            }
            else{
              node.checked = true
            }
          }
        }
        else{ //单选模式 
          let _divArr = document.getElementsByClassName('el-tree-node');
          let divLength = _divArr.length-1;  
          for(let i = 0; i <= divLength; i++){
           //  _divArr[i].firstChild.childNodes[3].childNodes[1].firstChild.firstChild.class=""
          }
          this.value5 = []
          this.value5.push(data.text)
          this.value5id = []
          this.value5id.push({'txt':data.text, 'id':data.id})
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
        let isleafCheck = this.fiterID.leafCheck
        if(isleafCheck){ //根节点需要提交
          if(data) {
            if (this.value5.indexOf(node.text) == -1){
            this.value5.push(node.text)
            this.value5id.push({'txt':node.text, 'id':node.id})
            }
          }
          else{
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
        }
        else{ // 根节点不需要提交
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
            if(this.fiterID.onLeaf){
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
            if(this.value5.indexOf(data.text) == -1){
                this.value5.push(data.text)
                this.value5id.push({'txt':data.text, 'id':data.id})
            }
          } else if (!nowstate) {
          node.checked = true
          node.indeterminate = false
          let parentNode = node.parent
          for (let i=0; i<node.level-1; i++) {
            if(!parentNode.disabled)
              parentNode.indeterminate = true
              parentNode = parentNode.parent
          }
          if(this.value5.indexOf(data.text) == -1){
            this.value5.push(data.text)
            this.value5id.push({'txt':data.text, 'id':data.id})
          }
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
         // this.open("tips","你按了上键！")
      },
      renderContent(h, { node, data, store, fitter}) {
        fitter = RegExp(this.fiterID.filterid)
        if(fitter.test(data.id)) {
          node.visible = false //过滤ID隐藏
        }
        let showlabeltxt = this.fiterID.labeltxt
        if (this.fiterID.isCheck) { //复选框模式
          if(showlabeltxt[0] == 'id' && showlabeltxt[1] == 'text'){ //ID加文本
            if(data.disabled){ //是否禁用
              return (
                <span style="width:85%; flex: 1; display:inline-flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
                  <span style="width:90%;overflow:hidden;">
                    <span title={data.id}>{data.id} &#166; {data.text}</span>
                  </span>
                </span>);
            }
            else if(node.isLeaf){ //是否叶节点
              return (
                <span style="width:85%; flex: 1; display:inline-flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
                  <span style="width:90%;overflow:hidden;">
                    <span title={data.id}>{data.id} &#166; {data.text}</span>
                  </span>
                </span>);
            }
            else{
              if(!this.fiterID.onLeaf){ //根节点可单选
                return (
                <span style="width:85%; flex: 1; display:inline-flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
                  <span style="width:90%;overflow:hidden;">
                    <span title={data.id}>{data.id} &#166; {data.text}</span>
                  </span>
                  <span style="width:10%; text-align:right;">
                    <p on-click={ () => this.justme(node, data) }><i class="el-icon-check"></i></p>
                  </span>
                </span>);
              } else { //根节点不可选
                return (
                <span style="width:85%; flex: 1; display:inline-flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
                  <span style="width:90%;overflow:hidden;">
                    <span title={data.id}>{data.id} &#166; {data.text}</span>
                  </span>
                </span>);
              }
            }
          }
          else { // 只有文本情况
            if(data.disabled){ //禁用
              return (
                <span style="width:85%; flex: 1; display:inline-flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
                  <span style="width:90%;overflow:hidden;">
                    <span title={data.id}>{data.text}</span>
                  </span>
                </span>);
            }
            else if(node.isLeaf){ //叶节点 不显示 右侧图标
              return (
                <span style="width:85%; flex: 1; display:inline-flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
                  <span style="width:90%;overflow:hidden;">
                    <span title={data.id}>{data.text}</span>
                  </span>
                </span>);
            }
            else{ //正常情况渲染
              return (
                <span style="width:85%; flex: 1; display:inline-flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
                  <span style="width:90%;overflow:hidden;">
                    <span title={data.id}>{data.text}</span>
                  </span>
                  <span style="width:10%; text-align:right;">
                    <el-button type="text" on-click={ () => this.justme(node, data) }><i class="el-icon-check"></i></el-button>
                  </span>
                </span>);
            }
          }
        } else { //单选框模式
          if(this.fiterID.labeltxt[0] == 'id' && this.fiterID.labeltxt[1] == 'text'){  //显示id与文本
            if(node.checked){
              return (
              <span style="width:92%; flex: 1; display:inline-flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
                <span style="width:90%;overflow:hidden;">
                  <span title={data.id}>{data.id} &#166; {data.text}</span>
                </span>
                <span style="width:10%; text-align:right;">
                  <p on-click={ () => this.radioClick(node, data) }><i class="el-icon-circle-check"></i></p>
                </span>
              </span>
              );
            }
            else{
              return (
              <span style="width:92%; flex: 1; display:inline-flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
                <span style="width:90%;overflow:hidden;">
                  <span title={data.id}>{data.id} &#166; {data.text}</span>
                </span>
                <span style="width:10%; text-align:right;">
                  <p on-click={ () => this.radioClick(node, data) }> <i class="el-icon-circle-check"></i></p>
                </span>
              </span>
              );
            }
          }
          else{ //只显示文本
            return (
              <span style="width:92%; flex: 1; display:inline-flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
                <span style="width:90%;overflow:hidden;">
                  <span title={data.id}>{data.text}</span>
                </span>
                <span style="width:10%; text-align:right;">
                  <p on-click={ () => this.radioClick(node, data) }> <i class="el-icon-circle-check"></i></p>
                </span>
              </span>
              );
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
      },
      radioClick(node, data) {
        data.checked = true
        let _divArr = document.getElementsByClassName('el-tree-node');
        let divLength = _divArr.length-1;  
        for(let i = 0; i <= divLength; i++){
          _divArr[i].firstChild.childNodes[3].childNodes[1].firstChild.firstChild.class = "el-icon-circle-check"
        }
        this.value5 = []
        this.value5.push(data.text)
        this.value5id = []
        this.value5id.push({'txt':data.text, 'id':data.id})
      },
      clickcourse() {
        this.seen = false
      },
      currentClick(data, node) {
        // this.ddgetclear(this.data2)
        // node.checked = true
      },
      ddgetclear(fun) {
        fun.forEach((value, index, array) => {
          for(let j = 0; j< fun.length; j++) {
            value.ischecked = false
          }
          if(value.children !== '' && value.children !== undefined) {
            this.ddgetclear(value.children)
          }
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
    },
    mounted () {
      let tdIndex = 0; 
      this.bodyListener = (e) => {
        if (e.target == document.body.getElementsByClassName("content-wrapper")[0]){
          this.seen = false
          tdIndex = 0
          let _divArr = document.getElementsByClassName('el-tree-node');
          let divLength = _divArr.length-1; 
          for (var i=0;i<=divLength;i++) {
            document.querySelectorAll('.el-tree-node')[i].firstChild.style.backgroundColor = '#fff'
          }
        }
      }
      document.body.addEventListener('click', this.bodyListener, false)
      // let i=0;
       
      this.bodyKeyListener = (e) => {
        let isqd = this.seen
        if(isqd){
        let _divArr = document.getElementsByClassName('el-tree-node');
        let divLength = _divArr.length-1;  
        for(let i = 0; i <= divLength; i++){
          _divArr[i].setAttribute("id","set" + i)  
        }
         if (e.keyCode === 38){
           
          for (var i=0;i<=divLength;i++) {
            document.getElementById('set'+ i).firstChild.style.backgroundColor = '#fff'
          }
          if (tdIndex==0) {
            document.getElementById("set" + 0).firstChild.style.backgroundColor = "#e4e8f1"
            this.open("tips","已经到顶了！")
            return false;
          }
          else {
            tdIndex -= 1; 
            document.getElementById('set'+ tdIndex).firstChild.style.backgroundColor = '#e4e8f1'
          }
         }
         if (e.keyCode === 40){
           
            for (var i=0;i<=divLength;i++) {
               document.getElementById('set'+ i).firstChild.style.backgroundColor = '#fff'
            }
            if (tdIndex>=divLength) {
              this.open("tips","已经到底了！")
              document.getElementById("set" + divLength).firstChild.style.backgroundColor = "#e4e8f1"
              return false
            }
            else {
              tdIndex += 1 
              document.getElementById('set'+ tdIndex).firstChild.style.backgroundColor = '#e4e8f1'
            }

            // let Zdom = document.getElementsByClassName("el-tree")[0]
            // let childlen = Zdom.childNodes.length
            // if(i<=1){
            //   let getids = Zdom.innerText.split("¦")[0].replace(/^\s\s*/, '').replace(/\s\s*$/, '')
            //   if(this.getopenid.indexOf(getids) == -1) this.getopenid.push(getids)
            //   Zdom.firstChild.firstChild.style.backgroundColor = "#FFCC80";
            // }
            // else{
            //   Zdom.firstChild.firstChild.style.backgroundColor = "#fff";
            //   if(i-childlen>childlen){
            //     Zdom.firstChild.childNodes[1].childNodes[childlen-1].style.backgroundColor = "#FFCC80";
            //   }
            //   else{
            //     Zdom.firstChild.childNodes[1].childNodes[i-childlen].style.backgroundColor = "#FFCC80";
            //     Zdom.firstChild.childNodes[1].childNodes[i-childlen-1].style.backgroundColor = "#fff";
            //   }
            // }
         }
         if (e.keyCode === 13){
           if(this.fiterID.isCheck){
              let checkbg = document.querySelectorAll('.el-tree-node');
              let checkbglen = checkbg.length-1
              for(let i=0; i <= checkbglen; i++){
                // let hasenter = false
                let haschecked = checkbg[i].firstChild.childNodes[1].firstChild.classList.contains("is-checked")
                  if(checkbg[i].firstChild.style.backgroundColor == "rgb(228, 232, 241)"){
                    let hasenter = checkbg[i].firstChild.getAttribute("has") == "has" ? true : false
                    let checktxt = checkbg[i].firstChild.childNodes[3].firstChild.firstChild.firstChild
                    let checkdom=[]
                    checkdom.push(checktxt)
                    let convTxt = checkdom[0].data
                    if(convTxt.indexOf("¦") > 0){
                      let getids = convTxt.split("¦")[0].replace(/^\s\s*/, '').replace(/\s\s*$/, '')
                      if(hasenter){
                        checkbg[i].firstChild.setAttribute("has","no")
                        // let index = this.getchekcid.indexOf(getids);
                        // if (index > -1)  this.getchekcid.splice(index, 1)
                        // let newarry = this.getchekcid
                        // this.$refs.tree.setCheckedKeys(newarry);

                        for(let i = 0; i < this.getchekcid.length; i++){
                          if(this.getchekcid[i] == getids){
                            this.$refs.tree.setChecked (this.getchekcid[i], false)
                            this.getchekcid.splice(i, 1)
                          }
                        }
                        
                      }
                      else{
                        let ishaschild=checkbg[i].childNodes[1].firstChild //有子点则无法双击回车
                        if(ishaschild == null) {
                          checkbg[i].firstChild.setAttribute("has","has")
                          if(this.getchekcid.indexOf(getids) == -1) this.getchekcid.push(getids)
                          this.$refs.tree.setChecked (getids, true)
                        }
                        else{
                        }
                        // this.$refs.tree.setCheckedKeys(this.getchekcid);
                      }
                    }
                    else{
                      //没有ID情况
                    }
                  }
                  else{
                    //没有选中
                  }
              }
           }
           else{
             // 单选模式
              let checkbg = document.querySelectorAll('.el-tree-node');
              let checkbglen = checkbg.length-1
              for(let i=0; i <= checkbglen; i++){
                if(checkbg[i].firstChild.style.backgroundColor == "rgb(228, 232, 241)"){
                  let checktxt = checkbg[i].firstChild.childNodes[3].firstChild.firstChild.firstChild
                  let checkdom=[]
                  checkdom.push(checktxt)
                  let convTxt = checkdom[0].data
                  if(convTxt.indexOf("¦") > 0){
                    let ishaschild=checkbg[i].childNodes[1].firstChild //有子点则无法双击回车
                    let getids = convTxt.split("¦")[0].replace(/^\s\s*/, '').replace(/\s\s*$/, '')
                    let getidstxt = convTxt.split("¦")[1].replace(/^\s\s*/, '').replace(/\s\s*$/, '')
                    if(ishaschild == null){
                      this.getchekcid = []
                      this.value5 = []
                      this.value5.push(getidstxt)
                      this.value5id = []
                      this.getchekcid.push(getids)
                      this.$refs.tree.setChecked (getids, true)
                      // this.$refs.tree.setCheckedKeys(this.getchekcid);
                    }
                    else{
                      this.value5 = []
                      this.value5.push(getidstxt)
                      this.value5id = []
                      this.value5id.push({'txt':getidstxt, 'id':getids})
                    }
                  }
                  else{
                    //没有获取到ID情况
                  }
                }
                else{
                  //没有进入键盘选中事件
                }
              }
           }
         }
      }
      }
      document.body.addEventListener('keyup', this.bodyKeyListener, false)
    },
    beforeDestroy() {
      document.body.removeEventListener('click', this.bodyListener)
     //  document.body.removeEventListener('keyup', this.bodyKeyListener)
    },
  };
</script>
