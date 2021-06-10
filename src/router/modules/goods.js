/*
 * @Author: wangshengxian
 * @Date: 2020-08-17 16:11:33
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-12-01 18:10:39
 * @Desc: 商品管理路由模块
 */
import Layout from '@/views/layout'

// 商品列表
const GoodsList = () => import(/* webpackChunkName: 'goodsList' */ '@/views/goods/goodsList')
// 分类列表
const CategoryList = () => import(/* webpackChunkName: 'categoryList' */ '@/views/goods/category')
// 二级分类列表
const SecondCategory = () => import(/* webpackChunkName: 'secondCategory' */ '@/views/goods/category/secondCategory')

const goodsRouter = {
  path: '/goods',
  name: 'Goods',
  component: Layout,
  redirect: '/goods/goodsList',
  alwaysShow: true,
  meta: {
    title: '商品管理',
    icon: 'goods-1'
  },
  children: [
    {
      path: 'goodsList',
      name: 'GoodsList',
      component: GoodsList,
      meta: {
        title: '商品列表',
        icon: 'menu'
      }
    },
    {
      path: 'categoryList',
      name: 'CategoryList',
      component: CategoryList,
      meta: {
        title: '类别列表',
        icon: 'menu'
      }
    },
    {
      path: 'secondCategory',
      name: 'SecondCategory',
      component: SecondCategory,
      hidden: true, // 菜单栏隐藏
      meta: {
        title: '二级类别列表',
        icon: 'menu'
        // breadcrumb: false // 不显示在面包屑中
      }
    }
  ]
}

export default goodsRouter
