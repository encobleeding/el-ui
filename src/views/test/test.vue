<template>
  <v-tree :fiterID="fiterID"></v-tree>
</template>

<script>
  import newtree from 'src/views/tree/tree.vue';
  export default {
    data () {
      return {
        fiterID: {
          "filterid": ['0400', '0700'], // 过滤后，仅首次生效
          "url": "static/json/GA_D_XSAJLBDM.js",
          "searchlabel": ['id', 'txt', 'wb', 'py'],
          "labeltxt": ['id', 'text'],
          "checkattr": "checkbox", // 未解决
          "defaultcheck": ['01000500'],
          "defaultopen": ['01000600'],
          "defaultdisabled": ['01000700'],
          "onLeaf": "ture" // 根节点是否可选,true不可false可选
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

