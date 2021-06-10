<!--
 * @Author: wangshengxian
 * @Date: 2020-10-09 18:25:11
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-12-17 17:06:05
 * @Desc: 代理管理 - 添加商代理
-->
<template>
  <div class="dialog">
    <el-dialog
      :title="(type === 'add' ? '添加' : '编辑') + '支付账号'"
      width="40%"
      :visible.sync="dialogVisible"
      @closed="handleClosed"
    >
      <el-form :model="formData" :rules="rules" ref="formRef" label-width="100px">
        <el-form-item label="微信号" prop="account">
          <el-input v-model="formData.account" clearable></el-input>
        </el-form-item>

        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="formData.mobile" clearable></el-input>
        </el-form-item>

        <el-form-item label="昵称" prop="name">
          <el-input v-model="formData.name" clearable></el-input>
        </el-form-item>

        <el-form-item label="微信二维码" prop="pic">
          <imgUpload ref="wxUploadRef" v-model="formData.pic" :limit="1" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSave">保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import imgUpload from '@/components/imgUpload'
import { addOrEditPayAccount } from '@/api/pay'
export default {
  name: '',
  data() {
    return {
      isInit: true,
      initObj: {},
      rules: {
        account: [{ required: true, message: '请输入微信号', trigger: 'blur' }],
        mobile: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
        name: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
        pic: [{ required: true, message: '请上传微信二维码', trigger: 'change' }]
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
        // console.log('-watch-edit-', data)
        // console.log('-is-init-', this.isInit)
        if (this.isInit) {
          this.initObj = { ...data }
          this.initObj.pic = data.pic[0]
          this.isInit = false
        }
        // console.log('-init-data-', this.initObj)
      },
      deep: true
    }
  },
  created() {},
  mounted() {},
  methods: {
    initData() {
      this.isInit = true
      this.initObj = {}
      this.$refs.wxUploadRef.syncElUpload([])
      // TODO: 不能重置。只能清除验证，否则initObj获取不到初始化的formData值
      this.$refs.formRef.clearValidate()
    },
    // closed
    handleClosed() {
      this.initData()
    },
    // 保存
    onSave() {
      this.validateFunc(params => {
        console.log('-params-', params, '-type-', this.type)
        addOrEditPayAccount(params, this.type)
          .then(res => {
            this.dialogVisible = false
            this.$message({
              message: '操作成功',
              type: 'success'
            })
            this.$emit('success')
          })
          .catch(err => {
            console.log('-err-', err)
            this.$message({
              message: err.data,
              type: 'error'
            })
          })
      })
    },
    validateFunc(callback) {
      this.$refs.formRef.validate(valid => {
        if (valid) {
          let mid = { ...this.formData }
          mid.pic = mid.pic[0]
          // console.log('-mid-', mid)
          let params = this.type === 'add' ? mid : this.setEditParams(mid)
          // console.log('-params-', params)
          if (JSON.stringify(params) === '{}') {
            this.$message({
              message: '请选择修改的选项!',
              type: 'warning'
            })
            return
          }
          callback(params)
        } else {
          return false
        }
      })
    },
    // 设置编辑参数(修改了哪个属性值，获取哪个属性值)
    setEditParams(formObj) {
      // console.log('-init-obj-', this.initObj, '-form-obj-', formObj)
      let result = {}
      Object.keys(this.initObj).forEach(key => {
        // console.log('-key-', key, '-value-', formObj[key])
        if (this.initObj[key] !== formObj[key]) {
          result[key] = formObj[key]
        }
      })
      if (JSON.stringify(result) !== '{}') {
        result.id = formObj.id
      }
      return result
    }
  },
  components: { imgUpload }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
.el-input {
  width: 160px;
}
</style>
