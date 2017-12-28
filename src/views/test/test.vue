<template>
  <v-tree :user="user"></v-tree>
</template>

<script>
  import newtree from 'src/views/tree/tree.vue';
  export default {
    data () {
      return {
        user: {"id": "1001"}
      };
    },
    components: {
      'v-tree': newtree
    }
  };
</script>

