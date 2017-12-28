<template>
  <v-tree :fiterID="fiterID"></v-tree>
</template>

<script>
  import newtree from 'src/views/tree/tree.vue';
  export default {
    data () {
      return {
        fiterID: {"id": "01000000"}
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

