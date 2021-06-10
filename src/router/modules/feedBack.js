/*
 * @Author: wangshengxian
 * @Date: 2020-08-17 16:11:33
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-12-03 13:07:56
 * @Desc: 用户反馈路由模块
 */
import Layout from '@/views/layout'

// 用户反馈列表
const FeedBackList = () => import(/* webpackChunkName: 'feedBackList' */ '@/views/feedBack/feedBackList')

const feedBackRouter = {
  path: '/feedBack',
  name: 'FeedBack',
  component: Layout,
  redirect: '/feedBack/feedBackList',
  alwaysShow: true,
  meta: {
    title: '用户反馈',
    icon: 'feedback-1'
  },
  children: [
    {
      path: 'feedBackList',
      name: 'FeedBackList',
      component: FeedBackList,
      meta: {
        title: '反馈列表',
        icon: 'menu'
      }
    }
  ]
}

export default feedBackRouter
