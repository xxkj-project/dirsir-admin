/*
 * @Author: wangshengxian
 * @Date: 2020-08-17 16:11:33
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-12-01 18:18:55
 * @Desc: 代理管理路由模块
 */
import Layout from '@/views/layout'

const AgentList = () => import(/* webpackChunkName: 'agentList' */ '@/views/agent/agentList')

const NextAgentList = () => import(/* webpackChunkName: 'nextAgentList' */ '@/views/agent/agentList/nextAgentList')

const agentRouter = {
  path: '/agent',
  name: 'agent',
  component: Layout,
  redirect: '/agent/agentSet',
  alwaysShow: true,
  meta: {
    title: '代理管理',
    icon: 'agent-1'
  },
  children: [
    {
      path: 'agentList',
      name: 'agentList',
      component: AgentList,
      meta: {
        title: '代理人列表',
        icon: 'menu'
      }
    },
    {
      path: 'nextAgentList',
      name: 'NextAgentList',
      component: NextAgentList,
      hidden: true, // 菜单栏隐藏
      meta: {
        title: '二级代理人列表',
        icon: 'menu'
      }
    }
  ]
}

export default agentRouter
