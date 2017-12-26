<template>
  <el-cascader
    :options="options"
    filterable
    change-on-select
    :props="defaultProps"
    :show-all-levels="false">
  </el-cascader>
</template>


<script>
  import axios from 'axios'
  export default {
    data() {
      return {
        options: [{
          value: '',
          label: '',
          children: []
        }],
        defaultProps: {
          value: 'id',
          label: 'text',
          children: 'children'
        }
      }
    },
    methods: {
      convertData() {
        axios.get('static/json/GB_D_NEWXZQHDM.js').then((res) => {
          this.options = res.data
        })
      }
    },
    created() {
      this.convertData()
    }
  }
</script>
