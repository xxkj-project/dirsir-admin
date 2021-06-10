/*
 * @Author: wangshengxian
 * @Date: 2020-08-17 16:11:33
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-12-01 18:05:15
 * @Desc: 支付管理路由模块
 */
import Layout from '@/views/layout'

// 直播列表
const PayList = () => import(/* webpackChunkName: 'payList' */ '@/views/pay/payList')

const payRouter = {
  path: '/pay',
  name: 'Pay',
  component: Layout,
  redirect: '/pay/payList',
  alwaysShow: true,
  meta: {
    title: '支付管理',
    icon: 'pay'
  },
  children: [
    {
      path: 'payList',
      name: 'PayList',
      component: PayList,
      meta: {
        title: '支付账号列表',
        icon: 'menu'
      }
    }
  ]
}

export default payRouter
