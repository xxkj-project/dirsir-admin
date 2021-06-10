/*
 * @Author: wangshengxian
 * @Date: 2020-08-26 14:17:36
 * @LastEditors: wangshengxian
 * @LastEditTime: 2021-01-10 21:15:16
 * @Desc: 公共请求api, 例如导出excel, 上传图片/视频
 */
import request from '@/utils/request'
import Qs from 'qs'
import tools from '@/utils/tools'

// serverUrl
const baseUrl = process.env.VUE_APP_SERVER_URL

const root = '/cms'
/**
 * 导出excel地址url集合
 */
const Excel = {
  // 商品列表导出
  goods: root + '/product/export',
  // 订单导出
  order: root + '/orderItem/export',
  // 代理导出订单
  orderAgent: root + '/orderItem/exportForAgent'
}

/**
 * 方法一：导出excel，全局通用 （注意：后台接口不要验证key）
 * @param {string} type 导出excel的类别
 * @param {object} params 参数对象
 * @param {string} method 请求方式，默认为 post
 */
export function exportExcel(type, params, method = 'post') {
  var url = `${baseUrl}${Excel[type]}`
  console.log('-url-', url)
  var form = document.createElement('form')
  form.style.display = 'none'
  form.action = url
  form.method = method
  form.enctype = 'multipart/form-data'
  document.body.appendChild(form)
  for (var key in params) {
    var input = document.createElement('input')
    input.type = 'hidden'
    input.name = key
    input.value = params[key]
    form.appendChild(input)
  }
  form.submit()
  form.remove()
}

/**
 * 方法二：导出excel，全局通用
 * @param {string} type 导出excel的类别
 * @param {object} params 参数对象
 * @param {string} fileName 导出表格的文件名，可选默认为空
 */
export function exportExcelTwo(type, params, fileName = '') {
  console.log('-type-', type, '-params-', params, '-file-name-', fileName)
  if (baseUrl) {
    let url = `${baseUrl}${Excel[`${type}`]}?${Qs.stringify(params)}`
    console.log('-url-', url)
    tools.downloadFile(url, fileName)
    // window.location.href = url
  }
}

/**
 * 上传图片/视频
 */
export function uploadImgOrVideo(data) {
  return request({
    url: '/product/uploadPhotos',
    method: 'post',
    data
  })
}
