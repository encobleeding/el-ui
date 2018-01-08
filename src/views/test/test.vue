<template>
<section>
  <v-tree :fiterID="fiterID"></v-tree>
  <v-tree2 :fiterID="fiterID2"></v-tree2>
</section>
</template>

<script>
  import newtree from 'src/views/tree/tree.vue';
  export default {
    data () {
      return {
        fiterID: {
          "filterid": '^(0700|0800)', // 过滤I正则表达式
          "url": "static/json/GA_D_XSAJLBDM.js", // 数据url
          "searchlabel": ['id', 'txt', 'wb', 'py'], // 搜索条件ID,文本,五笔,拼音
          "labeltxt": ['id', 'text'], // 显示文字,id+文字
          "defaultcheck": ['01000100'], // 默认选择'01000500'
          "defaultopen": [], // 默认展开'02000000'
          "defaultdisabled": ['01000700', '^(0200|0300)'], // 默认禁用'01000700'
          "onLeaf": false, // true为不可单独选根节点,false为可单独选根节点,仅在checkbox生效
          "leafCheck": false, // true为提交根节点，false为不可提交，,仅在checkbox生效
          'isCheck': true, // true为复选框,false为单选框
          'id': 'testid',
          'seen': false
        },
        fiterID2: {
          "filterid": '^(0200)', // 过滤I正则表达式
          "url": "static/json/myjson.js", // 数据url
          "searchlabel": ['id', 'txt'], // 搜索条件ID,文本,五笔,拼音
          "labeltxt": ['id', 'text'], // 显示文字,id+文字
          "defaultcheck": [], // 默认选择'01000500'
          "defaultopen": [], // 默认展开'02000000'
          "defaultdisabled": ['01000402'], // 默认禁用'01000700'
          "onLeaf": true, // true为不可单独选根节点,false为可单独选根节点,仅在checkbox生效
          "leafCheck": false, // true为提交根节点，false为不可提交，,仅在checkbox生效
          'isCheck': false, // true为复选框,false为单选框
          'id': 'testid2',
          'seen': false
        }
      };
    },
    methods: {},
    components: {
      'v-tree': newtree,
      'v-tree2': newtree
    },
    beforeCreate: function () {
    },
    created: function () {
    },
    beforeMount: function () {
    },
    mounted: function () {
    },
    beforeUpdate: function () {
    },
    updated: function () {
    },
    beforeDestroy: function () {
    },
    destroyed: function () {
    }
  };
</script>

