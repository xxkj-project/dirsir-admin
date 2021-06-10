/*
 * @Author: wangshengxian
 * @Date: 2020-08-17 15:34:14
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-12-18 15:20:48
 * @Desc: 登录 - api
 */
import request from '@/utils/request'

/**
 * 登录
 * @param {object} data {account: '账号',pwd: '密码'}
 */
export function login(data) {
  return request({
    url: '/cmsUser/login',
    method: 'post',
    data
  })
}

/**
 * 退出
 */
export function logout() {
  return request({
    url: '/cmsUser/logout',
    method: 'post'
  })
}

/**
 * 修改密码
 * @param data {id: 0,newPwd: '新密码', oldPwd: '旧密码'}
 */
export function editPass(data) {
  return request({
    url: '/cmsUser/modify',
    method: 'post',
    data
  })
}
