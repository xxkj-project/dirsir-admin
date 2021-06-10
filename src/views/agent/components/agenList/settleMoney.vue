<!--
 * @Author: wangshengxian
 * @Date: 2020-10-09 18:25:11
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-12-25 18:42:05
 * @Desc: 代理管理 - 结算金额 - dialog
-->
<template>
  <div class="dialog">
    <el-dialog title="结算金额" width="600px" center :visible.sync="dialogVisible" @closed="handleClosed">
      <el-form :model="formData" :rules="rules" ref="formRef" label-width="140px">
        <el-form-item label="结算金额" prop="settleFee">
          <el-input-number v-model="formData.settleFee" :min="0" :controls="false"></el-input-number>
        </el-form-item>

        <el-form-item label="可结算金额" prop="total">
          <el-input-number v-model="formData.total" :controls="false" disabled></el-input-number>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onConfirm">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { settlement } from '@/api/agent'
export default {
  name: '',
  data() {
    return {
      rules: {
        settleFee: [{ required: true, message: '请输入结算金额', trigger: 'blur' }]
      }
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: false
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

    onConfirm() {
      console.log('-save-', this.formData)
      const { total, settleFee, id } = this.formData
      this.validFunc(total, settleFee, () => {
        const params = { settleFee, agentId: id }
        console.log('-params-', params)
        settlement(params).then(res => {
          console.log('-res-', res)
          this.dialogVisible = false
          this.msgFunc('操作成功！', 'success')
          this.$emit('success')
        })
      })
    },
    validFunc(total, settleFee, callback) {
      this.$refs.formRef.validate(valid => {
        if (valid) {
          if (settleFee === 0) {
            this.msgFunc('结算金额需大于0！')
            return
          }
          if (total < settleFee) {
            this.msgFunc('结算金额不能大于总金额！')
            return
          }
          callback()
        } else {
          return false
        }
      })
    },
    // 重置
    handleReset() {
      this.$refs.formRef.resetFields()
    },
    msgFunc(msg, type = 'warning') {
      this.$message({
        message: msg,
        type
      })
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
