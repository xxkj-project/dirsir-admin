/*
 * @Author: wangshengxian
 * @Date: 2020-11-01 16:35:36
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-12-25 16:57:22
 * @Desc: 代理管理 - api
 */
import request from '@/utils/request'
import Qs from 'qs'

/**
 * 获取代理列表
 */
export function getAgentList(data) {
  return request({
    url: '/cmsAgent/list',
    method: 'get',
    data
  })
}

const agentApi = {
  list: '/cmsAgent/list',
  add: '/cmsAgent/add',
  edit: '/cmsAgent/update'
}

/**
 * 新增/编辑代理
 */
export function addOrEditAgent(data, type) {
  return request({
    url: agentApi[type],
    method: 'post',
    data
  })
}

/**
 * 结算业绩
 */
export function settlement(data) {
  return request({
    url: `/cmsAgent/settlement?${Qs.stringify(data)}`,
    method: 'post',
    data
  })
}
