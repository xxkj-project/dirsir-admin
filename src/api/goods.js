/*
 * @Author: wangshengxian
 * @Date: 2020-10-30 10:28:39
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-12-07 14:46:11
 * @Desc: 商品管理 -- api
 */
import request from '@/utils/request'
import Qs from 'qs'

/**
 * 商品列表
 */
export function getGoodsList(data) {
  return request({
    url: '/product/list',
    method: 'get',
    data
  })
}

/**
 * 商品上架/下架
 */
export function operateGoods(data) {
  return request({
    url: '/product/status' + '?' + Qs.stringify(data),
    method: 'post',
    data
  })
}

const goodsApiUrl = {
  add: '/product/add',
  edit: '/product/update'
}
/**
 * 添加/编辑商品
 * @param {string} type 类型(add/edit)
 */
export function addOrEditGoods(data, type) {
  return request({
    url: goodsApiUrl[type],
    method: 'post',
    data
  })
}

/**
 * 删除商品
 * @param {object} data {id: 10001}
 */
export function delGoods(data) {
  return request({
    url: `/product/remove?${Qs.stringify(data)}`,
    method: 'post',
    data: {}
  })
}

/**
 * 获取商品所有类别列表
 */
export function getTotalCategoryList(data) {
  return request({
    url: '/product/categoryList',
    method: 'get',
    data
  })
}

/**
 * 根据父级id获取类别列表
 */
export function getCategoryList(data) {
  return request({
    url: '/product/categoryListByParentId',
    method: 'get',
    data
  })
}

/**
 * 新增商品类别
 */
export function addCategory(data) {
  return request({
    url: `/product/categoryAdd?${Qs.stringify(data)}`,
    method: 'post',
    data
  })
}

/**
 * 更新商品类别
 */
export function updateCategory(data) {
  return request({
    url: `/product/categoryUpdate?${Qs.stringify(data)}`,
    method: 'post',
    data
  })
}

/**
 * 删除商品类别
 */
export function delCategory(data) {
  return request({
    url: `/product/categoryRemove?${Qs.stringify(data)}`,
    method: 'post',
    data
  })
}

/**
 * 商品详情(商品列表 - 编辑商品 - 获取规格和库存)
 */
export function getGoodsDetails(data) {
  return request({
    url: '/product/detail',
    method: 'get',
    data
  })
}

/**
 * 商品推荐/取消推荐
 */
export function updateGoodsRecommend(data) {
  return request({
    url: `/product/recommend?${Qs.stringify(data)}`,
    method: 'post',
    data
  })
}
