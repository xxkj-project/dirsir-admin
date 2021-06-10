<!--
 * @Author: wangshengxian
 * @Date: 2020-11-24 16:00:28
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-12-08 14:01:08
 * @Desc: 添加/修改类别 - components
-->
<template>
  <div class="dialog-components">
    <el-dialog
      :title="(type === 'add' ? '添加' : '编辑') + '类别'"
      width="600px"
      top="200px"
      center
      :visible.sync="dialogVisible"
      @closed="handleClosed"
    >
      <el-form :model="formData" :rules="rules" ref="formRef" label-width="100px">
        <el-form-item label="类别名称" prop="name">
          <el-input v-model="formData.name" clearable></el-input>
        </el-form-item>

        <el-form-item>
          <el-button size="large" type="primary" @click="onUploadGoods">保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { addCategory, updateCategory } from '@/api/goods'
export default {
  name: '',
  data() {
    return {
      rules: {
        name: [{ required: true, message: '请输入类别名称', trigger: 'blur' }]
      }
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'add'
    },
    formData: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    dialogVisible: {
      get() {
        return this.visible
      },
      set(val) {
        this.$emit('update:visible', val)
      }
    }
  },
  watch: {
    formData: {
      handler(data) {
        console.log('-watch-formdata-', data)
      },
      deep: true
    }
  },
  created() {},
  mounted() {},
  methods: {
    initData() {
      this.handleReset()
    },
    handleClosed() {
      console.log('-close-')
      this.initData()
    },
    onUploadGoods() {
      console.log('-save-', this.formData, this.type)
      this.$refs.formRef.validate(valid => {
        if (valid) {
          this.type === 'add' ? this.addReqFunc() : this.updateReqFunc()
        } else {
          return false
        }
      })
    },
    // TODO: 暂时没有添加该功能
    addReqFunc() {
      const params = { pId: 0, pic: '', icon: '', name: this.formData.name }
      addCategory(params).then(res => {
        console.log('-add-res-', res)
        this.dialogVisible = false
        this.$emit('success')
        this.$message({
          message: '添加成功!',
          type: 'success'
        })
        this.initData()
      })
    },
    updateReqFunc() {
      const { id, name } = this.formData
      const params = { id, name, pId: 0, pic: '', icon: '' }
      console.log('-params-', params)
      updateCategory(params).then(res => {
        console.log('-update-res-', res)
        this.dialogVisible = false
        this.$emit('success')
        this.$message({
          message: '编辑成功!',
          type: 'success'
        })
        this.initData()
      })
    },
    // 重置
    handleReset() {
      console.log('-重置-')
      this.$refs.formRef.resetFields()
    }
  },
  components: {}
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
.el-input {
  width: 220px;
}
</style>
