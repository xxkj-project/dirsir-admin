/*
 * @Author: wangshengxian
 * @Date: 2020-11-01 16:35:36
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-12-18 15:16:12
 * @Desc: 支付管理 - api
 */
import request from '@/utils/request'
import Qs from 'qs'

/**
 * 获取支付账号列表
 */
export function getPayAccountList(data) {
  return request({
    url: '/payAccount/list',
    method: 'get',
    data
  })
}

const payApiUrl = {
  // 新增
  add: '/payAccount/add',
  // 编辑
  edit: '/payAccount/update'
}

/**
 * 新增/编辑支付账号
 * @param {object} data { account: "账号"",id: 0,mobile: "手机号",name: "昵称",pic: "二维码图片"}
 */
export function addOrEditPayAccount(data, type) {
  return request({
    url: payApiUrl[type],
    method: 'post',
    data
  })
}

/**
 * 删除支付账号
 * @param {object} data {id: 0}
 */
export function delPayAccount(data) {
  return request({
    url: `/payAccount/remove?${Qs.stringify(data)}`,
    method: 'post',
    data
  })
}

/**
 * 支付完成
 * @param {object} data {id: 订单id}
 */
export function payFinish(data) {
  return request({
    url: `/payAccount/finish?${Qs.stringify(data)}`,
    method: 'post',
    data
  })
}
