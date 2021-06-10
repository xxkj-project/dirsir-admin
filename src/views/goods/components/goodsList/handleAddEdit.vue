<!--
 * @Author: wangshengxian
 * @Date: 2020-10-09 18:25:11
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-12-08 14:06:31
 * @Desc: 商品管理 - 添加商品
-->
<template>
  <div class="dialog-components">
    <el-dialog
      :title="(type === 'add' ? '添加' : '编辑') + '商品'"
      width="900px"
      top="40px"
      center
      :visible.sync="dialogVisible"
      @closed="handleClosed"
    >
      <el-form :model="formData" :rules="rules" ref="formRef" label-width="100px">
        <el-form-item label="商品名称" prop="productName">
          <el-input v-model="formData.productName" clearable></el-input>
        </el-form-item>

        <el-form-item label="所属类别" prop="categoryId">
          <el-cascader
            v-model="formData.categoryId"
            :options="categoryList"
            :props="{ expandTrigger: 'hover' }"
            @change="onCategorySel"
          >
          </el-cascader>
        </el-form-item>

        <!-- <el-form-item label="所属类别" prop="categoryId">
          <el-select v-model="formData.categoryId" placeholder="所属类别">
            <el-option
              :label="item.label"
              :value="item.value"
              v-for="item in categoryList"
              :key="item.value"
            ></el-option>
          </el-select>
        </el-form-item> -->

        <el-form-item label="商品描述" prop="description">
          <el-input v-model="formData.description" clearable></el-input>
        </el-form-item>

        <el-form-item label="服务说明" prop="note">
          <el-input v-model="formData.note" clearable placeholder="默认7天无理由换货"></el-input>
        </el-form-item>

        <el-form-item label="商品轮播图" prop="pics">
          <imgUpload
            v-model="formData.pics"
            :limit="99"
            @delete="handleBannerImgDelete"
            @success="handleBannerImgSuccess"
          ></imgUpload>
        </el-form-item>

        <el-form-item label="商品详情图" prop="detailPics">
          <imgUpload
            v-model="formData.detailPics"
            :limit="99"
            @delete="handleDetailImgDelete"
            @success="handleDetailImgSuccess"
          ></imgUpload>
        </el-form-item>

        <el-form-item label="商品规格和库存" label-width="120px">
          <!-- <p>商品规格与库存</p> -->
        </el-form-item>

        <el-tabs v-model="activeName" type="card">
          <el-tab-pane label="一种规格" name="first">
            <skuOneItem ref="skuOneRef" :skuData="skuTabData" />
          </el-tab-pane>

          <el-tab-pane label="两种规格" name="second">
            <skuTwoItem ref="skuTwoRef" :skuData="skuTabData" />
          </el-tab-pane>
        </el-tabs>

        <el-form-item>
          <el-button size="large" type="primary" @click="onUploadGoods">上传商品</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import imgUpload from '@/components/imgUpload'
import skuOneItem from './skuOneItem'
import skuTwoItem from './skuTwoItem'
import tools from '@/utils/tools'
import { addOrEditGoods } from '@/api/goods'
export default {
  name: '',
  data() {
    return {
      picsData: {
        addBannerPics: [],
        addDetailPics: [],
        delBannerPicIds: [], // 删除的商品轮播图id集合
        delDetailPicIds: [] // 删除的商品详情图id集合
      },
      skuTabData: {
        skuOneName: '',
        skuOneList: [{ value: '', key: tools.createUniqueString() }],
        skuDetailList: [{ stock: '', price: '', showPrice: '', label: '' }]
      },
      rules: {
        productName: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
        categoryId: [{ required: true, message: '请选择类别', trigger: 'blur' }],
        description: [{ required: true, message: '请输入商品描述', trigger: 'blur' }],
        pics: [{ type: 'array', required: true, message: '请上传图片', trigger: 'change' }],
        detailPics: [{ type: 'array', required: true, message: '请上传图片', trigger: 'change' }]
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
    },
    categoryList: {
      type: Array,
      default() {
        return []
      }
    },
    // 当前的规格类型(默认一种规格)
    currSkuType: {
      type: String,
      default: ''
    },
    // 规格/库存数据
    skuData: {
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
    },
    activeName: {
      get() {
        // console.log('-get-', this.currSkuType)
        return this.currSkuType
      },
      set(val) {
        // console.log('-set-', val)
        this.$emit('update:currSkuType', val)
      }
    },
    initActiveName() {
      return this.skuData.skuTwoName ? 'second' : 'first'
    }
  },
  watch: {
    formData: {
      handler(data) {
        // console.log('-watch-formdata-', data)
      },
      deep: true
    },
    currSkuType(val) {
      // console.log('-watch-curr-sku-type-', val)
      if (this.type === 'add') {
        this.skuTabData = this.initSkuData()
      } else {
        console.log('-tab-act-', this.activeName, '-tab-init-act-', this.initActiveName)
        this.skuTabData = this.initActiveName === this.activeName ? this.skuData : this.initSkuData()
        // console.log('-sku-tab-data-', this.skuTabData)
      }
    },
    visible(data) {
      // console.log('-watch-visible-', data)
      data && this.initPics()
    }
  },
  created() {},
  mounted() {},
  methods: {
    // 初始化图片参数
    initPics() {
      this.picsData = {
        addBannerPics: [],
        addDetailPics: [],
        delBannerPicIds: [],
        delDetailPicIds: []
      }
    },
    initSkuData() {
      let result = {
        skuOneName: '',
        skuOneList: [{ value: '', key: tools.createUniqueString() }],
        skuDetailList: [{ stock: '', price: '', showPrice: '', label: '' }]
      }
      if (this.activeName === 'second') {
        result = {
          skuTwoName: '',
          skuTwoList: [{ value: '', key: tools.createUniqueString() }],
          ...result
        }
      }
      return result
    },
    onCategorySel(data) {
      console.log('-change-cascader-', data)
    },
    // 商品轮播图删除回调
    handleBannerImgDelete(index) {
      console.log('-banner-del-index-', index)
      this.setDelPicIds(index)
    },
    handleBannerImgSuccess(data) {
      console.log('-banner-success-', data)
      this.picsData.addBannerPics.push(data)
    },
    // 商品详情图删除回调
    handleDetailImgDelete(index) {
      console.log('-detail-del-index-', index)
      this.setDelPicIds(index, 2)
    },
    handleDetailImgSuccess(data) {
      console.log('-detail-success-', data)
      this.picsData.addDetailPics.push(data)
    },
    setDelPicIds(index, type = 1) {
      if (this.type === 'add') return
      if (type === 1) {
        this.picsData.delBannerPicIds.push(this.formData.picIds[index])
        this.formData.picIds.splice(index, 1)
        // console.log(this.delBannerPicIds)
      } else {
        this.picsData.delDetailPicIds.push(this.formData.detailPicIds[index])
        this.formData.detailPicIds.splice(index, 1)
        // console.log(this.delDetailPicIds)
      }
    },
    handleClosed() {
      console.log('-closed-')
      this.activeName = ''
      this.handleReset()
      this.$refs.skuOneRef.handleReset()
      this.$refs.skuTwoRef.handleReset()
    },

    onUploadGoods() {
      console.log('-save-')
      // let elRef = this.activeName === 'first' ? 'skuOneRef' : 'skuTwoRef'
      // this.$refs[elRef].handleValideFunc(() => {
      //   console.log('验证成功', this.activeName)
      //   this.reqFunc()
      // })
      this.$refs.formRef.validate(valid => {
        if (valid) {
          let elRef = this.activeName === 'first' ? 'skuOneRef' : 'skuTwoRef'
          this.$refs[elRef].handleValideFunc(() => {
            console.log('验证成功', this.activeName)
            this.reqFunc()
          })
        } else {
          return false
        }
      })
    },
    reqFunc() {
      console.log('-type-', this.type)
      const params = { ...this.setFormParams(), ...this.setPicsParams(), ...this.setSkuParams() }
      console.log('-params-', params)
      addOrEditGoods(params, this.type).then(res => {
        console.log('-res-', res)
        this.$message({
          message: '操作成功！',
          type: 'success'
        })
        this.dialogVisible = false
        this.$emit('success')
      })
    },
    // 设置除了图片和sku相关的其它参数
    setFormParams() {
      // TODO: 注意 categoryId为一个数组，取数组最后一个值作为参数传给后台 (后台接口要求：只传最后一级的类别ID)
      let { productName, categoryId, description, note, productId } = this.formData
      categoryId = tools.getDataType(categoryId) === 'array' ? categoryId[categoryId.length - 1] : categoryId
      note = note || '7天无理由换货'
      // console.log('-formdata-', this.formData)
      return {
        productName,
        description,
        note,
        productId,
        categoryId
      }
    },
    // 设置图片相关参数
    setPicsParams() {
      const { addBannerPics, addDetailPics, delBannerPicIds, delDetailPicIds } = this.picsData
      let result = {}
      if (this.type === 'add') {
        result = {
          pics: addBannerPics,
          detailPics: addDetailPics
        }
      } else {
        result = {
          pics: addBannerPics,
          detailPics: addDetailPics,
          delPicIds: delBannerPicIds,
          delDetailPicIds: delDetailPicIds
        }
      }
      return result
    },
    // 设置sku相关参数
    setSkuParams() {
      const { skuOneName, skuOneList, skuTwoName, skuTwoList, skuDetailList } = this.skuTabData
      return {
        specOne: skuOneName,
        specOneList: this.setSkuList(skuOneList),
        specTwo: skuTwoName,
        specTwoList: this.setSkuList(skuTwoList),
        detailList: this.setSkuDetailList(skuDetailList)
      }
    },
    // isStock = true 字符串类型的数字转化成 number类型
    setSkuList(list, isStock = false) {
      if (!list) return
      let result = []
      list.map(val => {
        if (isStock) {
          val.value = +val.value
        }
        result.push(val.value)
      })
      return result
    },
    // 设置detailList
    setSkuDetailList(list) {
      let result = []
      list.map((val, index) => {
        result.push({ stock: +val.stock, price: +val.price, showPrice: +val.showPrice })
      })
      // console.log('-sku-detail-list-', result)
      return result
    },
    // 重置
    handleReset() {
      this.$refs.formRef.resetFields()
    }
  },
  components: { imgUpload, skuOneItem, skuTwoItem }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类

.skuItem {
  display: inline-block;
}

/deep/ .el-dialog {
  margin-bottom: 40px;

  .el-dialog__body {
    padding: 30px 60px 30px 80px;
  }
}

.el-input {
  width: 220px;
}
</style>
