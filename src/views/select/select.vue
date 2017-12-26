<template>
  <el-select v-model="value8" filterable multiple placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.id"
      :label="item.text"
      :value="item.id">
    </el-option>
  </el-select>
</template>


<script>
  import axios from 'axios'
  export default {
    data() {
      return {
        options: [
          {
            id: '',
            text: '',
            py: '',
            wb: ''
          }
        ],
        value5: [],
        value11: [],
        value8: ''
      }
    },
    methods: {
      convertData() {
        axios.get('static/json/BD_D_CJYJDM.js').then((res) => {
          this.options = res.data
        })
      }
    },
    created() {
      this.convertData()
    }
  }
</script>
