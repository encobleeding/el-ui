<template>
  <v-tree :fiterID="fiterID"></v-tree>
</template>

<script>
  import newtree from 'src/views/tree/tree.vue';
  export default {
    data () {
      return {
        fiterID: {
          "filterid": "['0400']",
          "url": "static/json/GA_D_XSAJLBDM.js",
          "searchlabel": "['id', 'txt', 'wb', 'py']",
          "labeltxt": "['id', 'text']",
          "checkattr": "checkbox",
          "defaultcheck": "[]",
          "defaultopen": "[]",
          "defaultdisabled": "[]"
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

