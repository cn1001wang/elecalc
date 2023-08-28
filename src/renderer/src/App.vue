<script setup lang="ts">
import { ref, Ref } from 'vue'
import getTimeMapByExcel from './core/getTimeMapByExcel'
import timeCalc from './core/timeCalc'

const inputValue: Ref<string> = ref('')
const outputValue: Ref<string> = ref('')
const totalHour: Ref<number> = ref(0)
const totalNum: Ref<number> = ref(0)
// @ts-ignore (define in dts)
const myAlert = window.api.alert
function doCalc(): void {
  const str = inputValue.value.trim()
  if (str === '') {
    myAlert('无数据！')
    return
  }

  const allData = str.split('\n').map((o) => o.split('\t'))
  if (allData[0].length !== 6) {
    myAlert('数据长度错误！')
    return
  }

  const objData = allData.map((row) => {
    const length = Number(row[1])
    const width = Number(row[2])
    const height = Number(row[4])
    const time = Number(row[5])
    return {
      type: row[0],
      // 长边为长，短边为宽
      length: length > width ? length : width,
      width: length > width ? width : length,
      height: height,
      time: time
    }
  })
  const result: Array<number> = timeCalc(objData)
  totalHour.value = Number(result.reduce((a, b) => a + b, 0).toFixed(2))
  totalNum.value = result.length
  outputValue.value = result.join('\r\n')

  inInput.value!.scrollTop = 0
}

function doSetting(): void {
  const str = inputValue.value.trim()
  if (str === '') {
    myAlert('无数据！')
    return
  }
  const allData = str.split('\n').map((o) => o.split('\t'))
  // console.log(allData)
  const result = getTimeMapByExcel(allData)
  outputValue.value = JSON.stringify(result)
  // console.log(JSON.stringify(result))
}
const inInput = ref<null | HTMLInputElement>(null)
const outInput = ref<null | HTMLInputElement>(null)
function handleScroll(e): void {
  // e.target.scrollTop
  if (e.target === outInput.value) {
    inInput.value!.scrollTop = e.target.scrollTop
  } else {
    outInput.value!.scrollTop = e.target.scrollTop
  }
}
// 清除数据
function doClear(): void {
  inputValue.value = ''
  outputValue.value = ''
}
</script>

<template>
  <button v-show="false" @click="doSetting">配置</button>
  <div class="input-wrap">
    <div class="input-left">
      <p>输入区</p>
      <textarea ref="inInput" v-model="inputValue" rows="35" @scroll="handleScroll"></textarea>
    </div>
    <div class="input-space">
      <button class="r-btn btn-15" @click="doCalc">计算</button>
      <button class="r-btn btn-15 btn-red" style="margin-top: 200px" @click="doClear">清除</button>
    </div>
    <div class="input-right">
      <p>输出区</p>
      <textarea
        ref="outInput"
        v-model="outputValue"
        cols="30"
        rows="35"
        @scroll="handleScroll"
      ></textarea>
    </div>
  </div>
  <p class="total-p">
    一共 <b>{{ totalNum }}</b> 个任务，合计需 <b>{{ totalHour }}</b> h
  </p>
</template>

<style lang="less">
@import './assets/css/styles.less';
.input-wrap {
  display: flex;
  max-width: 840px;
  margin: 0 auto;
  padding: 15px 30px 0 30px;
}
.input-space {
  width: 48px;
  flex-shrink: 0;
  .r-btn {
    margin: 0 5px;
  }
}
.input-left {
  flex: 1;
}
.input-right {
  max-width: 300px;
}
.input-left,
.input-right {
  p {
    text-align: center;
  }
  textarea {
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
  }
}
.total-p {
  text-align: center;
}
</style>
