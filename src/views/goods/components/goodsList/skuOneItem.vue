<!--
 * @Author: wangshengxian
 * @Date: 2020-11-03 10:32:10
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-12-07 15:44:34
 * @Desc: 一种规格 - components
-->
<template>
  <div class="sku-one-components">
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
        <el-button type="primary" size="mini" @click="onAdd">添加</el-button>
        <el-button type="primary" size="mini" @click="onDel">删除</el-button>
      </el-form-item>

      <!-- sku详情 -->
      <div class="skuBox ">
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
      let skuLabel = this.skuData.skuOneList[index].value
      // console.log('-label-', skuLabel)
      this.skuData.skuDetailList[index].label = skuLabel ? `${skuLabel}-` : ''
    },

    onAdd() {
      console.log('-add-')
      this.skuData.skuOneList.push({ value: '', key: tools.createUniqueString() })
      this.skuData.skuDetailList.push({ price: '', showPrice: '', stock: '', label: '' })
    },

    onDel() {
      console.log('-del-first')
      if (this.skuData.skuOneList.length <= 1) {
        this.$message({
          message: '不能再删除了！',
          type: 'warning'
        })
        return
      }
      this.skuData.skuOneList.pop()
      this.skuData.skuDetailList.pop()
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
      console.log('重置规格一')
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
