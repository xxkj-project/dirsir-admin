<!--
 * @Author: wangshengxian
 * @Date: 2020-10-09 18:25:11
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-12-08 14:11:07
 * @Desc: 代理管理 - 添加/编辑商代理
-->
<template>
  <div class="dialog">
    <el-dialog
      :title="(type === 'add' ? '添加' : '编辑') + '代理'"
      width="600px"
      center
      :visible.sync="dialogVisible"
      @closed="handleClosed"
    >
      <el-form :model="formData" :rules="rules" ref="formRef" label-width="100px">
        <el-form-item label="代理名称" prop="agentName">
          <el-input v-model="formData.agentName" clearable></el-input>
        </el-form-item>

        <el-form-item label="渠道号" prop="agentCode">
          <el-input v-model="formData.agentCode" clearable :disabled="type === 'edit'"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSave">保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { addOrEditAgent } from '@/api/agent'
export default {
  name: '',
  data() {
    return {
      rules: {
        agentName: [{ required: true, message: '请输入代理名称', trigger: 'blur' }],
        agentCode: [{ required: true, message: '请输入渠道号', trigger: 'blur' }]
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
    // 父级代理人id
    parentId: {
      type: Number,
      rerquired: true
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
        // console.log('-watch-edit-', data)
      },
      deep: true
    }
  },
  created() {},
  mounted() {},
  methods: {
    handleClosed() {
      console.log('-closed-')
      this.handleReset()
    },

    onSave() {
      console.log('-save-', this.parentId)
      this.$refs.formRef.validate(valid => {
        if (valid) {
          console.log(this.formData, this.type)
          let params = { parentId: this.parentId, ...this.formData }
          if (this.type === 'edit') {
            delete params.agentCode
          }
          console.log('-params-', params)
          addOrEditAgent(params, this.type)
            .then(res => {
              console.log('-res-', res)
              this.dialogVisible = false
              this.$message({
                message: '操作成功',
                type: 'success'
              })
              this.$emit('success')
            })
            .catch(err => {
              // console.log(err)
              this.$message({
                message: err.data,
                type: 'error'
              })
            })
        } else {
          return false
        }
      })
    },
    // 重置
    handleReset() {
      this.$refs.formRef.resetFields()
    }
  },
  components: {}
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
.el-input {
  width: 160px;
}
</style>
