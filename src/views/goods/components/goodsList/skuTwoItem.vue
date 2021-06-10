<!--
 * @Author: wangshengxian
 * @Date: 2020-11-03 10:32:10
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-12-07 15:46:31
 * @Desc: 两种规格 - components
-->
<template>
  <div class="sku-two-components">
    <el-form :model="skuData" ref="formRef" :label-width="formConfig.smallLabelWidth">
      <el-form-item label="规格一名称" prop="skuOneName" :rules="rules.skuName">
        <el-input v-model="skuData.skuOneName" clearable placeholder="请输入规格名称"></el-input>
      </el-form-item>

      <div class="skuBox">
        <el-form-item
          :label="index === 0 ? '规格一类型' : ''"
          :label-width="index === 0 ? formConfig.smallLabelWidth : formConfig.minLabelWidth"
          v-for="(item, index) in skuData.skuOneList"
          :key="item.key"
        >
          <el-form-item class="skuItem" :prop="'skuOneList.' + index + '.value'" :rules="rules.skuType">
            <el-input
              v-model="item.value"
              clearable
              placeholder="请输入规格类型名"
              @change="onChange(index)"
            ></el-input>
          </el-form-item>
        </el-form-item>
      </div>

      <el-form-item>
        <el-button type="primary" size="mini" @click="onAdd('one')">添加</el-button>
        <el-button type="primary" size="mini" @click="onDel('one')">删除</el-button>
      </el-form-item>

      <!-- 规格类型二 -->
      <el-form-item label="规格二名称" prop="skuTwoName" :rules="rules.skuName">
        <el-input v-model="skuData.skuTwoName" clearable placeholder="请输入规格名称"></el-input>
      </el-form-item>

      <div class="skuBox">
        <el-form-item
          :label="index === 0 ? '规格二类型' : ''"
          :label-width="index === 0 ? formConfig.smallLabelWidth : formConfig.minLabelWidth"
          v-for="(item, index) in skuData.skuTwoList"
          :key="item.key"
        >
          <el-form-item class="skuItem" :prop="'skuTwoList.' + index + '.value'" :rules="rules.skuType">
            <el-input
              v-model="item.value"
              clearable
              placeholder="请输入规格类型名"
              @change="onChange(index)"
            ></el-input>
          </el-form-item>
        </el-form-item>
      </div>
      <el-form-item>
        <el-button type="primary" size="mini" @click="onAdd('two')">添加</el-button>
        <el-button type="primary" size="mini" @click="onDel('two')">删除</el-button>
      </el-form-item>

      <!-- sku详情 -->
      <div class="skuBox stockBox">
        <el-form-item label-width="0" v-for="(item, index) in skuData.skuDetailList" :key="index">
          <el-form-item
            class="skuItem"
            :label="item.label ? item.label + '库存' : '库存'"
            :prop="'skuDetailList.' + index + '.stock'"
            :rules="rules.stock"
          >
            <el-input v-model="item.stock" clearable placeholder="请输入库存数量"></el-input>
          </el-form-item>

          <el-form-item
            class="skuItem"
            :label="item.label ? item.label + '原价' : '原价'"
            :prop="'skuDetailList.' + index + '.showPrice'"
            :rules="rules.showPrice"
          >
            <el-input v-model="item.showPrice" clearable placeholder="请输入原价"></el-input>
          </el-form-item>

          <el-form-item
            class="skuItem"
            :label="item.label ? item.label + '售价' : '售价'"
            :prop="'skuDetailList.' + index + '.price'"
            :rules="rules.price"
          >
            <el-input v-model="item.price" clearable placeholder="请输入售价"></el-input>
          </el-form-item>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
import tools from '@/utils/tools'
export default {
  name: '',
  data() {
    return {
      formConfig: {
        minLabelWidth: '10px',
        smallLabelWidth: '120px',
        maxLabelWidth: '140px'
      },
      rules: {
        skuName: {
          required: true,
          message: '规格名不能为空',
          trigger: 'blur'
        },
        skuType: {
          required: true,
          message: '规格类型不能为空',
          trigger: 'blur'
        },
        stock: {
          required: true,
          message: '库存不能为空',
          trigger: 'blur'
        },
        price: {
          required: true,
          message: '售价不能为空',
          trigger: 'blur'
        },
        showPrice: {
          required: true,
          message: '原价不能为空',
          trigger: 'blur'
        }
      }
    }
  },
  props: {
    skuData: {
      type: Object,
      defualt() {
        return {}
      }
    }
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    onChange(index) {
      console.log('-change-', index)
      this.skuData.skuDetailList = this.setSkuDetailList()
    },
    // 设置sku详情
    setSkuDetailList() {
      let result = []
      const { skuOneList, skuTwoList, skuDetailList } = this.skuData
      console.log('-skudetaillist-', skuDetailList)
      skuOneList.map((oneVal, oneIdx) => {
        let labelOne = oneVal.value ? `${oneVal.value}-` : ''
        // console.log('-label-one-', labelOne)
        skuTwoList.map((twoVal, twoIdx, arr) => {
          let labelTwo = twoVal.value ? `${twoVal.value}-` : ''
          // console.log('-label-two-', labelTwo)
          let index = arr.length * oneIdx + twoIdx
          // console.log('-index-', index, skuTwoList[index])
          let obj = !skuDetailList[index] ? { price: '', showPrice: '', stock: '' } : skuDetailList[index]
          // console.log('-obj-', obj)
          obj.label = `${labelOne}${labelTwo}`
          result.push(obj)
        })
      })
      console.log('-result-list-', result)
      return result
    },
    onAdd(type) {
      console.log('-add-type-', type)
      if (type === 'one') {
        this.skuData.skuOneList.push({ value: '', key: tools.createUniqueString() })
      } else {
        this.skuData.skuTwoList.push({ value: '', key: tools.createUniqueString() })
      }
      this.skuData.skuDetailList = this.setSkuDetailList()
    },
    onDel(type) {
      console.log('-del-type-', type)
      if (type === 'one') {
        if (this.skuData.skuOneList.length <= 1) {
          this.$message({
            message: '规格一不能再删除了！',
            type: 'warning'
          })
          return
        }
        this.skuData.skuOneList.pop()
        const len = this.skuData.skuTwoList.length
        for (let i = 0; i < len; i++) {
          this.skuData.skuDetailList.pop()
        }
      } else {
        if (this.skuData.skuTwoList.length <= 1) {
          this.$message({
            message: '规格二不能再删除了！',
            type: 'warning'
          })
          return
        }
        const { skuOneList, skuTwoList } = this.skuData
        let len = skuOneList.length
        let midLen = skuTwoList.length
        for (let i = 0; i < len; i++) {
          let index = i * midLen + midLen - 1 - i
          // console.log(index)
          this.skuData.skuDetailList.splice(index, 1)
        }
        this.skuData.skuTwoList.pop()
      }
    },
    handleValideFunc(callback) {
      this.$refs.formRef.validate(valid => {
        if (valid) {
          callback()
        } else {
          return false
        }
      })
    },
    handleReset() {
      console.log('重置规格二')
      this.$refs.formRef.resetFields()
    }
  },
  components: {}
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类

.skuBox {
  display: flex;
  flex-wrap: wrap;
}
.skuItem {
  display: inline-block;
}
.el-input {
  width: 120px;
}
</style>
