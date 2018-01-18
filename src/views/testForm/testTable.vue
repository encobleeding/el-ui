<template>
    <el-table
      :data="$store.state.formValidate.formData"
      style="width: 100%">
      <el-table-column
        prop="diy"
        label="邮箱"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="id"
        label="身份证号">
      </el-table-column>
			<el-table-column
        prop="num"
        label="数目">
      </el-table-column>
			<el-table-column
        prop="passworld"
        label="密码">
      </el-table-column>
    </el-table>
  </template>

	<script>
    export default {
      data() {
        return {
        }
      }
    }
  </script>