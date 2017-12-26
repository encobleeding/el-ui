<template>
  <el-transfer
    filterable
    :filter-method="filterMethod"
    filter-placeholder="请输入拼音"
    v-model="value2"
    :data="data2">
  </el-transfer>
</template>

<script>
  import axios from 'axios'
  export default {
    data() {
      const generateData2 = _ => {
        let data = [];
        axios.get('static/json/BD_D_CJYJDM.js').then((res) => {
          let citys = res.data;
          let cities1 = [];
          let pinyin = [];
          citys.forEach((index) => {
            cities1.push(index.text)
            pinyin.push(index.py.toLowerCase())
          });
          cities1.forEach((city, index) => {
            data.push({
              label: city,
              key: index,
              pinyin: pinyin[index]
            });
          });
        });
        return data;
      };
      return {
        data2: generateData2(),
        value2: [],
        filterMethod(query, item) {
          return item.pinyin.indexOf(query) > -1;
        }
      };
    }
  }
</script>
