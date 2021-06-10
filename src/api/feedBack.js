/*
 * @Author: wangshengxian
 * @Date: 2020-11-01 16:40:58
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-11-02 10:20:22
 * @Desc: 反馈管理 - api
 */
import request from '@/utils/request'
import Qs from 'qs'

/**
 * 反馈列表
 */
export function getFeedBackList(data) {
  return request({
    url: '/cmsFeedback/list',
    method: 'get',
    data
  })
}

/**
 * 客服回复
 */
export function kefuAnswer(data) {
  return request({
    url: '/cmsFeedback/answer' + '?' + Qs.stringify(data),
    method: 'post',
    data
  })
}
