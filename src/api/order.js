/*
 * @Author: wangshengxian
 * @Date: 2020-11-01 16:35:36
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-11-02 11:35:21
 * @Desc: 订单管理 - api
 */
import request from '@/utils/request'
import Qs from 'qs'

/**
 * 订单列表
 */
export function getOrderList(data) {
  return request({
    url: '/orderItem/list',
    method: 'get',
    data
  })
}

/**
 * 更新订单状态
 */
export function updateOrderStatus(data) {
  return request({
    url: '/orderItem/updateStatus' + '?' + Qs.stringify(data),
    method: 'post',
    data: {}
  })
}
