<!-- eslint-disable @typescript-eslint/explicit-function-return-type -->
<!--  -->
<script setup>
import { reactive } from 'vue'
import ajax from '@renderer/lib/axios'
import { useRouter } from 'vue-router'
import abpUtil from '../lib/abp/abpUtil'
const router = useRouter()
const form = reactive({
  tenancyName: '',
  userName: '',
  password: '',
  mac: window.api.mac,
  programType: 'elecalc'
})
const doSubmit = async () => {
  const res = await ajax.post(
    `https://www.imouldyun.com/api/auth/programmacinfo/applymacfrobinding`,
    {
      userName: form.userName,
      password: form.password,
      tenancyName: form.tenancyName,
      mac: form.mac,
      programType: form.programType,
      ExpirationDate: '2023-11-28 14:38:00'
    }
  )
  abpUtil.setToken(res)
  abpUtil.getAbpConfig().then(() => {
    router.push('/')
  })
}
</script>

<template>
  <div>
    <div style="text-align: center">
      <img src="../assets/images/logo_horizontal.png" alt="模来模往" class="mlmw-logo" />
    </div>
    <div class="form-wrap">
      <el-form :model="form" label-width="120px">
        <el-form-item label="账套">
          <el-input v-model="form.tenancyName" size="large" name="tenancyName" />
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="form.userName" size="large" name="userName" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input
            v-model="form.password"
            size="large"
            type="password"
            name="password"
            @keyup.enter="doSubmit"
          />
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" style="width: 100%" @click="doSubmit">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style scoped>
.mlmw-logo {
  width: 300px;
  margin: 50px auto;
}
.form-wrap {
  width: 400px;
  margin: 0 auto;
}
</style>
