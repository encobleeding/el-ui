<template>
  <v-tree :fiterID="fiterID"></v-tree>
</template>

<script>
  import newtree from 'src/views/tree/tree.vue';
  export default {
    data () {
      return {
        fiterID: {
          "filterid": ['0400', '0800'], // 过滤后,仅首次生效
          "url": "static/json/GA_D_XSAJLBDM.js", // 数据url
          "searchlabel": ['id', 'txt', 'wb', 'py'], // 搜索条件ID,文本,五笔,拼音
          "labeltxt": ['id', 'text'], // 显示文字,id+文字
          "checkattr": "checkbox", // 单选radio,多选checkbox,未解决
          "defaultcheck": ['01000500'], // 默认选择
          "defaultopen": ['02000000'], // 默展开
          "defaultdisabled": ['01000700'], // 默认禁用
          "onLeaf": "true" // 根节点是否可选,true不可,false可选
        }
      };
    },
    components: {
      'v-tree': newtree
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

